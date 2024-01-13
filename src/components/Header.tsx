import React from "react";
import {Button, Container, Form, Nav, Navbar, NavDropdown} from "react-bootstrap";

export default function Header() {
    return (
        <Navbar bg="light" expand="lg">
            <Container fluid>
                <Navbar.Brand href="/">앱테크 정보 공유 플랫폼 이름</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link href="/">목록</Nav.Link>
                        <Nav.Link href="/RankingPage">랭킹</Nav.Link>
                        <NavDropdown title="마이페이지" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">회원 정보</NavDropdown.Item>
                            <NavDropdown.Item href="/Favorite">퀴즈 모아보기</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button variant="outline-success">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
