import React, {useEffect, useState} from 'react';
import { Link, useLocation } from "react-router-dom";
import { Card, Container, Row, Tab, Table, Tabs} from "react-bootstrap";
import Header from '../../../components/Header';
import axios from 'axios';

interface appType  {
    id: number;
    appName: string;
};
interface UserType {
    id: number;
    nickname: string;
}
interface reviewType {
    id: number;
    app: appType;
    user: UserType;
    rate: number;
    review: string;
};
interface profitType {
    id: number;
    profitName: string;
    profitDesc: string;
    orderNo: number;
    quizYn: boolean;
}
interface quizType {
    id: number;
    user: UserType;
    quizDate: string;
    quiz: string;
    answer: string;
}

const AppPage = (): JSX.Element => {
    const location = useLocation();
    const appId = location.state.appId;
    const appName = location.state.appName;
    const [average, setAverage] = useState<number>(0);
    const [reviewList, setReviewList] = useState<reviewType[]>([]);
    const [profitList, setProfitList] = useState<profitType[]>([]);
    const [quizList, setQuizList] = useState<quizType[]>([]);
    //const [key, setKey] = useState<string>('home');
    useEffect(() => {
        axios.get("/review/getAverageByAppId",
            {   params: {
                    appId: appId
                }
            }
        )
        .then((r)=>{
            //console.log(r);
            setAverage(r.data);
        })
        .catch((e)=> {
            console.log(e);
        })

        axios.get("/review/get2ReviewList",
            {   params: {
                    appId: appId
                }
            }
        )
        .then((r)=>{
            //console.log(r);
            setReviewList(r.data);
        })
        .catch((e)=> {
            console.log(e);
        })

        axios.get("/profit/getProfitList",
            {   params: {
                    appId: appId
                }
            }
        )
        .then((r)=>{
            //console.log(r);
            setProfitList(r.data);
        })
        .catch((e)=> {
            console.log(e);
        })
    }, []);
    function star(reviewRate: number): string{
        var starStr = "";
        for(let i=0; i<reviewRate; i++){
            starStr += "★";
        }
        for(let i=0; i<5-reviewRate; i++){
            starStr += "☆";
        }
        return starStr;
    }
    function setTab(profitId: any): void{
        axios.get("/quiz/getQuizList",
            {   params: {
                    profitId: profitId
                }
            }
        )
        .then((r)=>{
            //console.log(r);
            setQuizList(r.data);
        })
        .catch((e)=> {
            console.log(e);
        })
    }
    return (
        <>
            <Header/>
            <Container fluid>
                <h2>
                    <img src={"http://localhost:8080/image/logo?appId="+ appId} style={{height: '6rem'}}></img>
                    {' '}{appName}
                </h2>
                <h4>평점: {average} / 평가하기: ☆☆☆☆☆</h4>
                <h6>
                    {reviewList && reviewList.length > 0 ?
                        (<Link to={"/ReviewPage"} state={{appId: appId, appName: appName}}>더 보기</Link>)
                        : ''}
                </h6>
                <Row id={"reviewListCard"}>
                    {reviewList && reviewList.length > 0 ? reviewList.map(review => {
                            return(
                                <div className="col-6" key={review.id}>
                                    <Card style={{ height: '6rem' }}>
                                        <Card.Body>
                                            <Card.Title>{review.user.nickname}{' '}{star(review.rate)}</Card.Title>
                                            <Card.Text>{review.review}</Card.Text>
                                        </Card.Body>
                                    </Card>
                                </div>
                            );
                        })
                        : (<div>첫 번째 리뷰를 남겨주세요!</div>)
                    }
                </Row>
                <div>
                    <Tabs
                        id="controlled-tab-example"
                        //activeKey={key}
                        onSelect={(k) => setTab(k)}
                        className="mb-3"
                    >
                        {profitList && profitList.map(profit => {
                            return(
                                <Tab eventKey={profit.id} 
                                     title={profit.profitName} 
                                     key={profit.id} >
                                    <h6>{profit.profitDesc}</h6>
                                    <Table striped bordered hover>
                                        <tbody>
                                            <tr>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </Tab>
                            );
                        })}
                    </Tabs>
                </div>
            </Container>
        </>
    )
}

export default AppPage;