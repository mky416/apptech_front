import React, { useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

import Header from "../../../components/Header";
const Main = (): JSX.Element => {
    const [a, setA] = useState<number>(0);//useState 사용 샘플
    const onIncrease = () => setA(a + 1 );
    return (
        <div>
            <Header/>
            <button onClick={onIncrease}>{a}</button>
            <Container fluid>
                <Row>
                    <Col className="mb-3">
                        <Card>
                            <Card.Body>신한 쏠(SOL) 로고</Card.Body>
                        </Card>
                    </Col>
                    <Col className="mb-3">
                        <Card>
                            <Card.Body>캐시워크 로고</Card.Body>
                        </Card>
                    </Col>
                    <Col className="mb-3">
                        <Card>
                            <Card.Body>토스 로고</Card.Body>
                        </Card>
                    </Col>
                    <Col className="mb-3">
                        <Card>
                            <Card.Body>허니스크린 로고</Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col className="mb-3">
                        <Card>
                            <Card.Body>신한 쏠(SOL) 로고</Card.Body>
                        </Card>
                    </Col>
                    <Col className="mb-3">
                        <Card>
                            <Card.Body>캐시워크 로고</Card.Body>
                        </Card>
                    </Col>
                    <Col className="mb-3">
                        <Card>
                            <Card.Body>토스 로고</Card.Body>
                        </Card>
                    </Col>
                    <Col className="mb-3">
                        <Card>
                            <Card.Body>허니스크린 로고</Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Main;