import React, {useEffect, useState} from 'react';
import { Link, useLocation } from "react-router-dom";
import { Button, Table, Form, Row } from "react-bootstrap";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import Header from '../../../components/Header';
import axios from 'axios';

interface quizType {
    id: number;
    appProfitId:number;
    userId: number;
    userName: string;
    quiz: string;
    answer: string;
    yesCnt: number;
    noCnt: number;
}

const AppPageQuizTab = (props: any): JSX.Element => {
    const appProfitId = props.profitId;
    const userId = 0;

    const [radioValue, setRadioValue] = useState<string>("Accuracy");
    const [quizList, setQuizList] = useState<quizType[]>([]);
    const [profitFavorite, setProfitFavorite] = useState<boolean>(false);
    
    const today = new Date();
    const todayStr = today.getFullYear() +'년 ' + (today.getMonth()+1) + '월 ' + today.getDate() +'일 퀴즈';

    const { register, handleSubmit, control, watch} = useForm<quizType>();

    useEffect(() => {
        getQuizList();
        getProfitFavorite();
    }, []);
    const onSubmit: SubmitHandler<quizType> = data => {
        axios.post("http://localhost:8080/quiz/",
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
            getQuizList();
        })
        .catch((e)=> {
            console.log(e);
        })
    };
    function getQuizList():void{
        axios.get("/quiz/getQuizList",
            {   params: {
                    orderBy: radioValue,
                    profitId: appProfitId,
                    date: today.getFullYear() + ("0" + (1 + today.getMonth())).slice(-2) + ("0" + today.getDate()).slice(-2)
                }
            }
        )
        .then((r)=>{
            console.log(r);
            setQuizList(r.data);
        })
        .catch((e)=> {
            console.log(e);
        })
    }
    function clickCorrect(appProfitQuizId: number):void{
        axios.post("http://localhost:8080/quizcorrect/",
            {
                appProfitQuizId: appProfitQuizId,
                userId: userId,
                correctStatus: 'YES'
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                }
            }
        )
        .then((r)=>{
            console.log(r);
            getQuizList();
        })
        .catch((e)=> {
            console.log(e);
        })
    }
    function clickInCorrect(appProfitQuizId: number): void{
        axios.post("http://localhost:8080/quizcorrect/",
            {
                appProfitQuizId: appProfitQuizId,
                userId: userId,
                correctStatus: 'NO'
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                }
            }
        )
        .then((r)=>{
            console.log(r);
            getQuizList();
        })
        .catch((e)=> {
            console.log(e);
        })
    }

    function getProfitFavorite(): void{
        axios.get("/profitFavorite/getProfitFavorite",
            {   params: {
                    appProfitId: appProfitId,
                    userId: userId
                }
            }
        )
        .then((r)=>{
            console.log(r);
            setProfitFavorite(r.data);
        })
        .catch((e)=> {
            console.log(e);
        });
    }
    function clickProfitFavorite(profitFavorite0: boolean): void{
        if(profitFavorite0){
            axios.delete("http://localhost:8080/profitFavorite/deleteProfitFavoriteByProfitIdAndUserId/"
                + appProfitId + "/" + userId
            )
            .then((r)=>{
                console.log(r);
                getProfitFavorite();
            })
            .catch((e)=> {
                console.log(e);
            })
        }else{
            axios.post("http://localhost:8080/profitFavorite/",
                {
                    profitId: appProfitId,
                    userId: userId
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*"
                    }
                }
            )
            .then((r)=>{
                console.log(r);
                getProfitFavorite();
            })
            .catch((e)=> {
                console.log(e);
            })
        }
    }
    return (
        <>
            <h5>{todayStr}
                <span onClick={(e) => {clickProfitFavorite(profitFavorite);}}>{profitFavorite ? '♥': '♡'}</span>
            </h5>
            <ButtonGroup>
                <ToggleButton key='1' type="radio" variant="outline-success" name="radio" value="Accuracy"
                              checked = {radioValue === 'Accuracy'}
                              onClick={(e) => {
                                  setRadioValue('Accuracy');}
                              }
                >정확도순</ToggleButton>
                <ToggleButton key='2' type="radio" variant="outline-success" name="radio" value= "CreatedAt"
                              checked = {radioValue === 'CreatedAt'}
                              onClick={(e) => {
                                  setRadioValue('CreatedAt');}
                              }
                >등록순</ToggleButton>
            </ButtonGroup>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>등록자</th>
                        <th>문제</th>
                        <th>답</th>
                        <th>정확도</th>
                    </tr>
                </thead>
                <tbody>
                    {quizList && quizList.map(quiz => {
                        return(
                            <tr>
                                <td>1</td>
                                <td>{quiz.userName}</td>
                                <td>{quiz.quiz}</td>
                                <td>{quiz.answer}</td>
                                <td><span onClick={(e) => {clickCorrect(quiz.id);}}>맞아요</span> {quiz.yesCnt}
                                    <span onClick={(e) => {clickInCorrect(quiz.id);}}> 틀려요</span> {quiz.noCnt}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                    <div className={"col-5"}>
                        <Form.Group controlId="formQuiz">
                            <Form.Control type="text" placeholder="문제를 입력해주세요" {...register("quiz", { required: true })}/>
                        </Form.Group>
                    </div>
                    <div className={"col-5"}>
                        <Form.Group controlId="formAnswer">
                            <Form.Control type="text" placeholder="답을 입력해주세요" {...register("answer", { required: true })}/>
                        </Form.Group>
                    </div>
                    <Form.Group controlId="formAppProfitId">
                        <Form.Control type="hidden" placeholder="" {...register("appProfitId")} value={appProfitId}/>
                    </Form.Group>
                    <Form.Group controlId="formUserId">
                        <Form.Control type="hidden" placeholder="" {...register("userId")} value={"0"}/>
                    </Form.Group>
                    <Form.Group controlId="formYesCnt">
                        <Form.Control type="hidden" placeholder="" {...register("yesCnt")} value={"0"}/>
                    </Form.Group>
                    <Form.Group controlId="formNoCnt">
                        <Form.Control type="hidden" placeholder="" {...register("noCnt")} value={"0"}/>
                    </Form.Group>
                    <div className={"col-2"}>
                        <Button variant="success" type="submit">Submit</Button>

                    </div>
                </Row>
            </Form>
        </>
    )
}

export default AppPageQuizTab;