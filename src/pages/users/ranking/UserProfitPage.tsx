import React from 'react';
import {Button, Col, Container, Form, Nav, Navbar, NavDropdown, Row} from "react-bootstrap";

const UserProfitPage = (): JSX.Element => {
    return (
        <Container fluid>
            <Form>
                <Form.Group as={Row} className="mb-3" controlId="formUserName">
                    <Form.Label column sm="2">
                        사용자 명
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control plaintext readOnly defaultValue="닉네임" />
                    </Col>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>앱 테크 명</Form.Label>
                    <Form.Control type="text" placeholder="Enter 앱 테크 이름" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formProfit">
                    <Form.Label>수익</Form.Label>
                    <Form.Control type="email" placeholder="Enter 수익입력" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formDate">
                    <Form.Label>날짜</Form.Label>
                    <Form.Control type="email" placeholder="Enter 날짜 입력" />
                </Form.Group>
                <Form.Group controlId="formFileMultiple" className="mb-3">
                    <Form.Label>수익 캡쳐 화면 첨부</Form.Label>
                    <Form.Control type="file"/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    등록
                </Button>
            </Form>
        </Container>
    )
}

export default UserProfitPage;