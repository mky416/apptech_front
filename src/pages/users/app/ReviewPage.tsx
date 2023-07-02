import React, {useEffect, useRef, useState} from 'react';
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Container, Row, Card, Button } from 'react-bootstrap';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

import Header from "../../../components/Header";

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

const ReviewPage = (): JSX.Element => {
    const location = useLocation();
    const appId = location.state.appId;
    const appName = location.state.appName;
    const [reviewList, setReviewList] = useState<reviewType[]>([]);
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
    useEffect(() => {
        axios.get("/review/getReviewList",
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
    }, []);

    return (
        <>
            <Header/>
            <Container fluid>
                <Row id={"reviewListCard"}>
                    {reviewList && reviewList.length > 0 ? reviewList.map(review => {
                            return(
                                <div className="col-sm-12 col-md-6" key={review.id}>
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
            </Container>
        </>
    )
}

export default ReviewPage;