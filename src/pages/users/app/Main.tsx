import React, {useEffect, useRef, useState} from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import { Container, Row, Card, Button } from 'react-bootstrap';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

import Header from "../../../components/Header";

interface appType  {
    id: number;
    appName: string;
    appLogoFile: string;
    appIosLink: string;
    appAndroidLink: string;
    adminStatus: string;
};

const Main = (): JSX.Element => {

    const [radioValue, setRadioValue] = useState<string>("AppName");
    const [appList, setAppList] = useState<appType[]>([]);
    const [isLast, setIsLast] = useState<boolean>(false);
    const page = useRef<number>(0);
    const boxRef = useRef<HTMLDivElement>(null);

    function getAppList(): void {
        axios.get("/app/list",
            {   params: {
                    orderBy: radioValue,
                    limit: 12,
                    page: page.current
                }
            }
        )
        .then((r)=>{
            setAppList((prevData) => [...prevData, ...r.data.content]);
            setIsLast(r.data.last);
            if(r.data.number < r.data.totalPages){
                page.current += 1;
            }
        })
        .catch((e)=> {
            console.log(e);
        })
    }
    useEffect(() => {
        if(!boxRef.current || isLast) return;
        const io = new IntersectionObserver((entries, observer)=> {
            if(entries[0].isIntersecting) {
                getAppList();
            }
        });
        io.observe(boxRef.current);
        return () => {
            io.disconnect();
        }
    }, [getAppList, isLast]);
    return (
        <>
            <Header/>
            <Container fluid>
                <div>
                    <ButtonGroup>
                        <ToggleButton key='1' type="radio" variant="outline-success" name="radio" value="AppName"
                                      checked = {radioValue === 'AppName'}
                                      onClick={(e) => {
                                          page.current = 0;
                                          setRadioValue('AppName');
                                          setAppList([]);
                                          getAppList();}
                                      }
                        >이름순</ToggleButton>
                        <ToggleButton key='2' type="radio" variant="outline-success" name="radio" value= "CreatedAt"
                                      checked = {radioValue === 'CreatedAt'}
                                      onClick={(e) => {
                                          page.current = 0;
                                          setRadioValue('CreatedAt');
                                          setAppList([]);
                                          getAppList();}
                                      }
                        >등록순</ToggleButton>
                    </ButtonGroup>
                    <Button variant="success" href={'/AppRegister'} className={"float-end"}>등록</Button>{' '}
                </div>
                <Row id={"appListCard"}>
                    {appList && appList.map(app => {
                        return(
                            <div className="col-lg-2 col-md-3" key={radioValue+ " "+app.id}>
                                <Link to={"/AppPage"} state={{appId: app.id, appName: app.appName}}>
                                    <Card>
                                        <Card.Body>
                                            <Card.Title>{app.appName}</Card.Title>
                                            <Card.Img src={"http://localhost:8080/image/logo?appId="+ app.id} />
                                        </Card.Body>
                                    </Card>
                                </Link>
                            </div>
                        );
                    })}
                </Row>
                <div ref={boxRef} style={{height: '1rem'}}></div>
            </Container>
        </>
    )
}

export default Main;