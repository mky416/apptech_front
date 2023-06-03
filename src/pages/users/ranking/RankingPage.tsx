import React from 'react';
import {useNavigate} from "react-router-dom";
import {Button, Container, Row} from "react-bootstrap";
import Header from '../../../components/Header';


const RankingPage = (): JSX.Element => {
    let navigate = useNavigate();

    const handleClick = () => navigate("/RankingPage/Profit")

    return (
        <>
            <Header/>
            <Container fluid>
                <Row>
                    <div className="col-2">
                    </div>
                    <div className="col-9"></div>
                    <div className="col-1">
                        <Button
                            variant="success"
                            style={{width: '100%'}}
                            onClick = {handleClick}
                        >등록</Button>
                    </div>
                </Row>
                <Row>
                    랭킹화면
                </Row>
            </Container>
        </>
    )
}

export default RankingPage;