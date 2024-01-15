import React, {useEffect, useRef, useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import { Container, Form, Button } from 'react-bootstrap';
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";

import Header from "../../../components/Header";

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../modules';
import { login, logout } from '../../../modules/loginstatus';
import LoginStatus from '../../../components/LoginStatus';

interface Login {
    username: string;
    password: string;
}
const LoginPage = (): JSX.Element => {
    const loginStatus = useSelector((state: RootState) => state.loginstatus.loginStatus);
    const dispatch = useDispatch(); // 디스패치 함수를 가져옵니다
    const navigate = useNavigate();
    const onlogin = (id:number) => {
        dispatch(login());
    };

    const onlogout = () => {
        dispatch(logout());
    };

    const {register, handleSubmit, control, watch} = useForm<Login>();

    const onSubmit: SubmitHandler<Login> = data => {
        axios.get("/user/getUserYn",
            {
                params: {
                    username: data.username,
                    password: data.password
                }
            }
        )
        .then((r) => {
            console.log(r.data);
            if(r.data){ //로그인 성공
                onlogin(r.data);
                navigate("/");
            }else{
                alert("로그인 실패");
            }
        })
    }

    return (
        <>
            <Header/>
            <Container fluid>
                <h1>로그인</h1>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Id</Form.Label>
                        <Form.Control type="text" placeholder="Enter id" {...register("username", { required: true })}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" {...register("password", { required: true })}/>
                    </Form.Group>
                    <Button variant="outline-success" type="submit">
                        Submit
                    </Button>
                </Form>
            </Container>
        </>
    )
}

export default LoginPage;