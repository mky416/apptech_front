import React, {useEffect, useState} from 'react';
import { Link, useLocation } from "react-router-dom";
import { Card, Container, Row, Tab, Table, Tabs, Button, Form, Modal} from "react-bootstrap";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import Header from '../../../components/Header';
import axios from 'axios';
import AppPageQuizTab from './AppPageQuizTab'

interface reviewType {
    id: number;
    appId: number;
    nickname: string;
    userId: number;
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

const AppPage = (): JSX.Element => {
    const location = useLocation();
    const appId = location.state.appId;
    const appName = location.state.appName;
    const userId = 0;
    const [average, setAverage] = useState<number>(0);
    const [myReviewRate, setMyReviewRate] = useState<number>(0);
    const [reviewList, setReviewList] = useState<reviewType[]>([]);
    const [profitList, setProfitList] = useState<profitType[]>([]);

    const [reviewModalshow, setReviewModalShow] = useState(false);

    const modalClose = () => setReviewModalShow(false);
    const modalShow = () => setReviewModalShow(true);

    useEffect(() => {
        getReview();

        axios.get("/profit/getProfitList",
            {   params: {
                    appId: appId
                }
            }
        )
        .then((r)=>{
            setProfitList(r.data);
        })
        .catch((e)=> {
            console.log(e);
        })
    }, []);
    function openReviewPopup(star: number):void{
        setMyReviewRate(star);
        modalShow();
    }
    const { register, handleSubmit, control, watch} = useForm<reviewType>();
    const onSubmit: SubmitHandler<reviewType> = data => {
        console.log(data);
        axios.post("http://localhost:8080/review/" + data.appId + "/rate", //app 등록
            data,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                }
            }
        )
        .then((r)=>{
            console.log(r);
            modalClose();
            getReview();
        })
        .catch((e)=> {
            console.log(e);
            modalClose();
            getReview();
        })
    }
    function getReview(): void{
        axios.get("/review/" + appId + "/rate")
        .then((r)=>{
            setAverage(r.data);
        })
        .catch((e)=> {
            console.log(e);
        });
        axios.get("/review/getRateByAppIdAndUserId",
            {   params: {
                    appId: appId,
                    userId: userId
                }
            }
        )
        .then((r)=>{
            console.log(r);
            setMyReviewRate(r.data);
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
            console.log(r);
            setReviewList(r.data);
        })
        .catch((e)=> {
            console.log(e);
        });
    }
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
    return (
        <>
            <Header/>
            <Container fluid>
                <h2>
                    <img src={"http://localhost:8080/image/logo?appId="+ appId} style={{height: '6rem'}}></img>
                    {' '}{appName}
                </h2>
                <h4>평점: {average} / 평가하기:
                    <span onClick={(e) => {openReviewPopup(1);}}>{myReviewRate >= 1 ? '★': '☆'}</span>
                    <span onClick={(e) => {openReviewPopup(2);}}>{myReviewRate >= 2 ? '★': '☆'}</span>
                    <span onClick={(e) => {openReviewPopup(3);}}>{myReviewRate >= 3 ? '★': '☆'}</span>
                    <span onClick={(e) => {openReviewPopup(4);}}>{myReviewRate >= 4 ? '★': '☆'}</span>
                    <span onClick={(e) => {openReviewPopup(5);}}>{myReviewRate >= 5 ? '★': '☆'}</span>
                </h4>

                <Row id={"reviewListCard"}>
                    {reviewList && reviewList.length > 0 ? reviewList.map(review => {
                            return(
                                <div className="col-6" key={review.id}>
                                    <Card style={{ height: '6rem' }}>
                                        <Card.Body>
                                            <Card.Title>{review.nickname}{' '}{star(review.rate)}</Card.Title>
                                            <Card.Text>{review.review}</Card.Text>
                                        </Card.Body>
                                    </Card>
                                </div>
                            );
                        })
                        : (<div>첫 번째 리뷰를 남겨주세요!</div>)
                    }
                </Row>
                <h6>
                    {reviewList && reviewList.length > 0 ?
                        (<Link to={"/ReviewPage"} state={{appId: appId, appName: appName}}>더 보기</Link>)
                        : ''}
                </h6>
                <div>
                    <Tabs
                        id="controlled-tab-example"
                        //activeKey={key}
                        //onSelect={(k) => setTab(k)}
                        className="mb-3"
                    >
                        {profitList && profitList.filter((profit) => profit.quizYn == true) //퀴즈 있음
                            .map(profit => {
                                return(
                                    <Tab eventKey={profit.id}
                                         title={profit.profitName}
                                         key={profit.id} >
                                        <h6>{profit.profitDesc}</h6>
                                        <AppPageQuizTab profitId={profit.id}/>
                                    </Tab>
                                );
                        })}
                        {profitList && profitList.filter((profit) => profit.quizYn == false) //퀴즈 없음
                            .map(profit => {
                                return(
                                    <Tab eventKey={profit.id}
                                         title={profit.profitName}
                                         key={profit.id} >
                                        <h6>{profit.profitDesc}</h6>
                                    </Tab>
                                );
                            })}
                    </Tabs>
                </div>
            </Container>

            <Modal show={reviewModalshow} onHide={modalClose}>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Modal.Header closeButton>
                        <Modal.Title>{star(myReviewRate)}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                            <Form.Group className="mb-3" controlId="formReviewText">
                                <Form.Label>평가를 남겨주세요</Form.Label>
                                <Form.Control as="textarea" rows={3} placeholder="" {...register("review")}/>
                            </Form.Group>
                            <Form.Group controlId="formReviewRate">
                                <Form.Control type="hidden" placeholder="" {...register("rate")} value={myReviewRate}/>
                            </Form.Group>
                            <Form.Group controlId="formUserId">
                                <Form.Control type="hidden" placeholder="" {...register("userId")} value={"0"}/>
                            </Form.Group>
                            <Form.Group controlId="formAppId">
                                <Form.Control type="hidden" placeholder="" {...register("appId")} value={appId}/>
                            </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={modalClose}>
                            닫기
                        </Button>
                        <Button variant="primary" type="submit" >
                            평가하기
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}

export default AppPage;