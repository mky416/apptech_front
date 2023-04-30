import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from "react-router-dom";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useForm, SubmitHandler } from "react-hook-form";
import Image from 'react-bootstrap/Image';
import Header from '../../../components/Header';
import axios from 'axios';

interface Apptech {
    userId: string;
    appName: string;
    appLogoFile: string;
    appIosLink: string;
    appAndroidLink: string;
    Profits: Profit[];
}
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
    const { register, handleSubmit } = useForm<Apptech>();
    const onSubmit: SubmitHandler<Apptech> = data => {
        console.log(data);
        axios.post("http://localhost:8080/app", {
            userId: 0,
            appName: data.appName,
            appLogoFile: data.appLogoFile,
            appIosLink: data.appIosLink
        })
        .then((r)=>{
            console.log(r);
        })
        .catch((e)=> {
            console.log(e);
        })
    };
    return (
        <>
            <Header/>
            <Container fluid>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Row>
                        <div className={"col-3"}>
                            <Image src={"/"}></Image>
                            <Form.Group controlId="formAppLogoFile">
                                <Form.Label>앱테크 로고</Form.Label>
                                <Form.Control type="file" {...register("appLogoFile")}/>
                            </Form.Group>
                        </div>
                        <div className={"col-9"}>
                            <Form.Group className="mb-3" controlId="formAppName">
                                <Form.Label>앱테크 이름</Form.Label>
                                <Form.Control type="text" placeholder="" {...register("appName", { required: true })}/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formIosLink">
                                <Form.Label>앱테크 링크</Form.Label>
                                <Form.Control type="text" placeholder="" {...register("appIosLink")}/>
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
                            const orderNo = profit.orderNo;
                            return(
                                <div key={orderNo}>
                                    <Button variant="light" onClick={() => deleteProfit(orderNo)}>-</Button>
                                    <Form.Group as={Row} className="mb-3" controlId="formProfitName">
                                        <Form.Label column sm={2}>수익방안</Form.Label>
                                        <Col sm={10}>
                                            <Form.Control type="text" placeholder="" {...register(`Profits.${orderNo}.profitName`, { required: true })}/>
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3" controlId="formProfitDesc">
                                        <Form.Label column sm={2}>설명</Form.Label>
                                        <Col sm={10}>
                                            <Form.Control as="textarea" rows={3} {...register(`Profits.${orderNo}.profitDesc`, { required: true })}/>
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3" controlId="formQuizYn">
                                        <Form.Label column sm={2}>퀴즈유무</Form.Label>
                                        <Col sm={10}>
                                            <Form.Check type="checkbox" label="" {...register(`Profits.${orderNo}.quizYn`)}/>
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