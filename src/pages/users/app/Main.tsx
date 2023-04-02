import React, {useEffect, useState} from 'react';
import axios from "axios";
import { Container, Row, Col, Card } from 'react-bootstrap';

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
    const [appList, setAppList] = useState<appType[]>([]);//useState 사용 샘플
    function getAppList(): void {
        axios.get("/app/list")
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
                    {appList && appList.map(app => {
                        //console.log(app);
                        return(<Col xs lg={"3"} key={app.id}>
                            <Card>
                                <Card.Body>{app.appName}</Card.Body>
                            </Card>
                        </Col>);
                    })}
                </Row>
            </Container>
        </div>
    )
}

export default Main;