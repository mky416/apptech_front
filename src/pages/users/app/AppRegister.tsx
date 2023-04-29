import React, {useEffect, useRef, useState} from 'react';
import { useLocation } from "react-router-dom";
import {Button, Card, Col, Container, Form, Row, Tab, Tabs} from "react-bootstrap";
import Image from 'react-bootstrap/Image';
import Header from '../../../components/Header';
import axios from 'axios';

interface Profit {
    userId: string;
    profitName: string;
    profitDesc: string;
    orderNo: number;
    quizYn: string;
};

const AppRegister = (): JSX.Element => {
    const location = useLocation();
    const profitList0 = [{userId: '', profitName: '', profitDesc:'', orderNo: 1, quizYn: ''}];
    const [profitList, setProfitList] = useState<Profit[]>(profitList0);
    const profitCnt = useRef<number>(1);

    function addProfit(): void {
        profitCnt.current += 1;
        const newProfit = {userId: '', profitName: '', profitDesc:'', orderNo: profitCnt.current, quizYn: ''};
        setProfitList((current) => [...current, newProfit]);
    }
    function deleteProfit(orderNo: number): void {
        setProfitList(profitList.filter(profit => profit.orderNo !== orderNo));
    }
    useEffect(() => {

    }, []);
    return (
        <>
            <Header/>
            <Container fluid>
                <Form>
                    <Row>
                        <div className={"col-3"}>
                            <Image src={"/"}></Image>
                            <Form.Group controlId="formApptechLogo">
                                <Form.Label>앱테크 로고</Form.Label>
                                <Form.Control type="file"/>
                            </Form.Group>
                        </div>
                        <div className={"col-9"}>
                            <Form.Group className="mb-3" controlId="formApptechName">
                                <Form.Label>앱테크 이름</Form.Label>
                                <Form.Control type="text" placeholder="" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formApptechLink">
                                <Form.Label>앱테크 링크</Form.Label>
                                <Form.Control type="text" placeholder="" />
                                <Form.Text className="text-muted">
                                    ios: 앱 메인 페이지에서 아이콘 클릭 후 '링크 복사하기' 클릭 <br/>
                                    android: ~~~
                                </Form.Text>
                            </Form.Group>
                            <Button variant="light" onClick={() => addProfit()}>+</Button>{' 수익 방안 추가'}
                        </div>
                    </Row>
                    <div id={"profitList"}>
                        {profitList && profitList.map(profit => {
                            return(
                                <div key={profit.orderNo}>
                                    <Button variant="light" onClick={() => deleteProfit(profit.orderNo)}>-</Button>
                                    <Form.Group as={Row} className="mb-3" controlId="formProfit">
                                        <Form.Label column sm={2}>수익방안</Form.Label>
                                        <Col sm={10}>
                                            <Form.Control type="text" placeholder="" />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3" controlId="formDesc">
                                        <Form.Label column sm={2}>설명</Form.Label>
                                        <Col sm={10}>
                                            <Form.Control as="textarea" rows={3} />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3" controlId="formQuizYN">
                                        <Form.Label column sm={2}>퀴즈유무</Form.Label>
                                        <Col sm={10}>
                                            <Form.Check type="checkbox" label="" />
                                        </Col>
                                    </Form.Group>
                                </div>
                            );
                        })}
                    </div>
                    <Button variant="primary" type="submit">Submit</Button>
                </Form>
            </Container>
        </>
    )
}

export default AppRegister;