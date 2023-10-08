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
    userId: number;
    userName: string;
    quiz: string;
    answer: string;
    yesCnt: number;
    noCnt: number;
}

const AppPageQuizTab = (props: any): JSX.Element => {
    const profitId = props.profitId;

    const [radioValue, setRadioValue] = useState<string>("Accuracy");
    const [quizList, setQuizList] = useState<quizType[]>([]);
    
    const today = new Date();
    const todayStr = today.getFullYear() +'년 ' + (today.getMonth()+1) + '월 ' + today.getDate() +'일 퀴즈';

    const { register, handleSubmit, control, watch} = useForm<quizType>();

    useEffect(() => {
        axios.get("/quiz/getQuizList",
            {   params: {
                    profitId: profitId,
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
    }, []);
    const onSubmit: SubmitHandler<quizType> = data => {
        alert(data);
    };
    return (
        <>
            <h5>{todayStr}</h5>
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
                                <td>맞아요 {quiz.yesCnt} 틀려요 {quiz.noCnt}</td>
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
                    <div className={"col-2"}>
                        <Button variant="success" type="submit">Submit</Button>

                    </div>
                </Row>
            </Form>
        </>
    )
}

export default AppPageQuizTab;