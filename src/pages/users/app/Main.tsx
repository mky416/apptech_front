import React, {useEffect, useState} from 'react';
import axios from "axios";
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

import Header from "../../../components/Header";

type appType =  {
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
    function getAppList(): void {
        axios.get("/app/list",
                {params: {orderBy: radioValue}}
            )
            .then((r)=>{
                setAppList(r.data);
            })
            .catch((e)=> {
                console.log(e);
            })
    }
    useEffect(() => {
        getAppList();
    }, []);
    return (
        <div>
            <Header/>
            <Container fluid>
                <Row>
                    <div className="col-2">
                        <ButtonGroup>
                            <ToggleButton key='1' type="radio" variant="outline-success" name="radio" value="AppName"
                                          checked = {radioValue == 'AppName'}
                                          onClick={(e) => {
                                              setRadioValue('AppName');
                                              getAppList();}
                                          }
                            >이름순</ToggleButton>
                            <ToggleButton key='2' type="radio" variant="outline-success" name="radio" value= "CreatedAt"
                                          checked = {radioValue == 'CreatedAt'}
                                          onClick={(e) => {
                                                setRadioValue('CreatedAt');
                                                getAppList();}
                                            }
                            >등록순</ToggleButton>
                        </ButtonGroup>
                    </div>
                    <div className="col-9"></div>
                    <div className="col-1">
                        <Button variant="success" style={{width: '100%'}}>등록</Button>{' '}
                    </div>
                </Row>
                <Row>
                    {appList && appList.map(app => {
                        return(
                            <div className="col-3">
                                <Card style={{ height: '12rem' }}>
                                    <Card.Body>{app.appName}</Card.Body>
                                </Card>
                            </div>
                        );
                    })}
                </Row>
            </Container>
        </div>
    )
}

export default Main;