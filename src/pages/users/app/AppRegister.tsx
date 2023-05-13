import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from "react-router-dom";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import Image from 'react-bootstrap/Image';
import Header from '../../../components/Header';
import axios from 'axios';

interface Apptech {
    userId: string;
    appName: string;
    appLogoFile: string;
    appLink: string;
    appOS: string;
    appIosLink: string;
    appAndroidLink: string;
    profitArray: Profit[];
}
interface Profit {
    appId: string;
    userId: string;
    profitName: string;
    profitDesc: string;
    orderNo: number;
    quizYn: string;
};

const AppRegister = (): JSX.Element => {
    const location = useLocation();

    function addProfit(): void {
        append({appId: '', userId: '', profitName: '', profitDesc:'', orderNo: 0, quizYn: ''})
    }
    function deleteProfit(index: number): void {
        remove(index);
    }
    const { register, handleSubmit, control, watch} = useForm<Apptech>();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "profitArray"
    })
    const onSubmit: SubmitHandler<Apptech> = data => {
        if(data.appOS == "Android"){
            data.appAndroidLink = data.appLink;
        }else if(data.appOS = "IOS"){
            data.appIosLink = data.appLink;
        }
        axios.post("http://localhost:8080/app/", //app 등록
            data,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Access-Control-Allow-Origin": "*"
                }
            }
        )
        .then((r)=>{
            console.log(r);
            //app 등록 성공시 profit 등록
            var appId0 = r.data.id;
            var profitArray1: Profit[] = data.profitArray;

            profitArray1.map(e => e.appId = appId0);
            profitArray1.map(e => e.userId = "0");
            axios.post("http://localhost:8080/profit/",
                profitArray1,
                { headers: {
                    "Access-Control-Allow-Origin": "*"
                }}
            )
            .then((r)=>{
                console.log(r);
            })
            .catch((e)=> {
                console.log(e);
            })
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
                            <Form.Group controlId="formAppLogoFile">
                                <Form.Label>앱테크 로고</Form.Label>
                                <Form.Control type="file" {...register("appLogoFile", { required: true })}/>
                            </Form.Group>
                        </div>
                        <div className={"col-9"}>
                            <Form.Group className="mb-3" controlId="formAppName">
                                <Form.Label>앱테크 이름</Form.Label>
                            <Form.Control type="text" placeholder="" {...register("appName", { required: true })}/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formIosLink">
                                <Form.Label>앱테크 링크</Form.Label>
                                <Form.Control type="text" placeholder="" {...register("appLink")}/>
                                <div key={`inline-radio`}>
                                    <Form.Check inline type="radio" label="Android" value={"Android"} {...register("appOS", { required: true })}/>
                                    <Form.Check inline type="radio" label="IOS" value={"IOS"}  {...register("appOS", { required: true })}/>
                                </div>
                                <Form.Text className="text-muted">
                                    ios: 앱 메인 페이지에서 아이콘 클릭 후 '링크 복사하기' 클릭 <br/>
                                    android: ~~~
                                </Form.Text>
                            </Form.Group>
                            <Form.Group controlId="formUserId">
                                <Form.Control type="hidden" placeholder="" {...register("userId")} value={"0"}/>
                            </Form.Group>
                            <Button variant="light" onClick={() => addProfit()}>+</Button>{' 수익 방안 추가'}
                        </div>
                    </Row>
                    <div id={"profitList"}>
                        {fields && fields.map((profit, index) => {
                            return(
                                <div key={index}>
                                    <Button variant="light" onClick={() => deleteProfit(index)}>-</Button>
                                    <Form.Group as={Row} className="mb-3" controlId="formProfitName">
                                        <Form.Label column sm={2}>수익방안</Form.Label>
                                        <Col sm={10}>
                                            <Form.Control type="text" placeholder="" {...register(`profitArray.${index}.profitName`, { required: true })}/>
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3" controlId="formProfitDesc">
                                        <Form.Label column sm={2}>설명</Form.Label>
                                        <Col sm={10}>
                                            <Form.Control as="textarea" rows={3} {...register(`profitArray.${index}.profitDesc`, { required: true })}/>
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3" controlId="formQuizYn">
                                        <Form.Label column sm={2}>퀴즈유무</Form.Label>
                                        <Col sm={10}>
                                            <Form.Check type="checkbox" label="" {...register(`profitArray.${index}.quizYn`)}/>
                                        </Col>
                                    </Form.Group>
                                    <Form.Group controlId="formOrderNo">
                                        <Form.Control type="hidden" placeholder="" {...register(`profitArray.${index}.orderNo`)} value={index}/>
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