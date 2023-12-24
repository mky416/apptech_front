import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {Button, Container, Table, Row} from "react-bootstrap";
import axios from 'axios';
import Header from '../../../components/Header';

interface Apptech {
    id: number;
    userId: string;
    appName: string;
}
interface Profit {
    id: number;
    app: Apptech;
    userId: string;
    profitName: string;
    profitDesc: string;
    orderNo: number;
    quizYn: boolean;
};
interface ProfitFavorite {
    id: number;
    profit: Profit;
    quizArray?: quizType[];
}

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

const FavoritePage = (): JSX.Element => {
    const userId = 0;

    const [profitFavoriteList, setProfitFavoriteList] = useState<ProfitFavorite[]>([]);
    const [updatedProfitFavoriteList, setUpdatedProfitFavoriteList] = useState<ProfitFavorite[]>([]);
    const [quizArray, setQuizArray] = useState<quizType[]>([]);
    const [mapIndex, setMapIndex] = useState<number>(-1);
    const today = new Date();
    const todayStr = today.getFullYear() +'년 ' + (today.getMonth()+1) + '월 ' + today.getDate() +'일 퀴즈';

    useEffect(() => {
        getProfitFavoriteList();
    }, []);
    useEffect(() => { //즐겨찾기 목록이 업데이트 된 후 quiz 목록 업데이트
        getQuizArray();
        setUpdatedProfitFavoriteList(profitFavoriteList);
    }, [profitFavoriteList]);
    useEffect(() => { // mapIdx이 업데이트 된 후
        mapQuizList();
    }, [mapIndex]);

    function getProfitFavoriteList():void{
        axios.get("/profitFavorite/getProfitFavoriteList",
            {   params: {
                    userId: userId
                }
            }
        )
        .then((r)=>{
            console.log(r);
            setProfitFavoriteList(r.data);
        })
        .catch((e)=> {
            console.log(e);
        });
    }
    function getQuizArray():void{
        profitFavoriteList.map((profitFavorite, index) => {
            axios.get("/quiz/getQuizList",
                {   params: {
                        profitId: profitFavorite.profit.id,
                        date: today.getFullYear() + ("0" + (1 + today.getMonth())).slice(-2) + ("0" + today.getDate()).slice(-2)
                    }
                }
            )
            .then((s)=>{
                console.log(s);
                setQuizArray(s.data);
                setMapIndex(index);
            })
            .catch((e)=> {
                console.log(e);
            })
        })
    }
    function mapQuizList(): void{
        var updatedProfitFavorite : ProfitFavorite = {
            ...profitFavoriteList[mapIndex],
            quizArray: quizArray
        };

        const updatedProfitFavoriteList2 = [...updatedProfitFavoriteList];
        updatedProfitFavoriteList2[mapIndex] = updatedProfitFavorite;
        setUpdatedProfitFavoriteList(updatedProfitFavoriteList2);
    }
    function deleteProfitFavoriteById(profitFavoriteId: number):void{
        axios.delete("http://localhost:8080/profitFavorite/deleteProfitFavoriteById/" + profitFavoriteId)
        .then((r)=>{
            console.log(r);
            setMapIndex(-1);
            getProfitFavoriteList();
        })
        .catch((e)=> {
            console.log(e);
        })
    }
    return (
        <>
            <Header/>
            <Container fluid>
                <Row>마이페이지 {'>'} 퀴즈 모아보기</Row>
                <br/>
                <Row>
                    <div className={"col-12"}>
                        {updatedProfitFavoriteList && updatedProfitFavoriteList.length > 0 ?
                            updatedProfitFavoriteList
                            .map((profitFavorite, index) => {
                            return(
                                <div key={profitFavorite.id}>
                                    <h3>
                                        {profitFavorite.profit.app.appName} {'>'} {profitFavorite.profit.profitName}
                                        <span onClick={(e) => {deleteProfitFavoriteById(profitFavorite.id);}}>♥</span>
                                    </h3>

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
                                            {profitFavorite.quizArray && profitFavorite.quizArray.map(quiz => {
                                                return(
                                                    <tr>
                                                        <td>1</td>
                                                        <td>{quiz.userName}</td>
                                                        <td>{quiz.quiz}</td>
                                                        <td>{quiz.answer}</td>
                                                        <td>좋아요 {quiz.yesCnt} 싫어요 {quiz.noCnt}</td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </Table>
                                </div>
                            );
                        })
                            : (<div>즐겨찾기를 등록해주세요</div>)
                        }

                    </div>
                </Row>
            </Container>
        </>
    )
}

export default FavoritePage;