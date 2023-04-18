import React, {useEffect, useState} from 'react';
import { useLocation } from "react-router-dom";
import { Card, Container, Row, Tab, Tabs} from "react-bootstrap";
import Header from '../../../components/Header';
import axios from 'axios';

interface reviewType  {
    id: number;
    appId: number;
    userId: number;
    rate: number;
    review: string;
};

const AppPage = (): JSX.Element => {
    const location = useLocation();
    const appId = location.state.appId;
    const appName = location.state.appName;
    const [reviewList, setReviewList] = useState<reviewType[]>([]);
    //const [key, setKey] = useState<string>('home');
    useEffect(() => {
        axios.get("/review/get2ReviewList",
            {   params: {
                    appId: appId
                }
            }
        )
            .then((r)=>{
                setReviewList(r.data);
            })
            .catch((e)=> {
                console.log(e);
            })
    }, []);
    return (
        <div>
            <Header/>
            <Container fluid>
                <h1>{appName}</h1>
                <Row id={"reviewListCard"}>
                    {reviewList && reviewList.length > 0 ? reviewList.map(review => {
                            return(
                                <div className="col-6" key={review.id}>
                                    <Card style={{ height: '6rem' }}>
                                        <Card.Body>
                                            <Card.Title>별점 : {review.rate}</Card.Title>
                                            <Card.Text>{review.review}</Card.Text>
                                        </Card.Body>
                                    </Card>
                                </div>
                            );
                        })
                        : (<div>첫 번째 리뷰를 남겨주세요!</div>)
                    }
                </Row>
                <Row>
                    <Tabs
                        id="controlled-tab-example"
                        //activeKey={key}
                        //onSelect={(k) => setKey(k)}
                        className="mb-3"
                    >
                        <Tab eventKey="home" title="Home">
                            <div>abcde</div>
                        </Tab>
                        <Tab eventKey="profile" title="Profile">
                            <div>abcde33</div>
                        </Tab>
                        <Tab eventKey="contact" title="Contact">
                            <div>abcde33</div>
                        </Tab>
                    </Tabs>
                </Row>
            </Container>
        </div>
    )
}

export default AppPage;