import React from 'react';
import { useForm } from 'react-hook-form';
import {Button, Col, Container, Form, Nav, Navbar, NavDropdown, Row} from "react-bootstrap";
import * as formik from 'formik';
import * as yup from 'yup';

const { Formik } = formik;

export interface ProfitFormData{
    userId: number;
    appId: number;
    profitDate: number;
    profit: number;
    profitImageFile: FileList|null
}

const schema = yup.object().shape({
    profitDate: yup
        .number()
        .min(1, '##ranking:schema.profitDate.min'),
    profit: yup
        .number()
        .min(1, '##ranking:schema.profit.min'),
    profitImageFile: yup.mixed().required()
});

interface UserProfitFormProps {
    onSubmit: (data: ProfitFormData) => void;
    profitData: ProfitFormData;
}

interface RegisterFormData {
    editMode: false;
}

interface EditFormData {
    editMode: true;
}

const UserProfitForm = (
    props: UserProfitFormProps & (RegisterFormData | EditFormData),
) =>{
    const {onSubmit, profitData, editMode} = props
    
    return (
        <Formik
            validationSchema={schema}
            onSubmit={console.log}
            initialValues={{
                userId: 1,
                username: 'tester',
                appId: 1,
                appName: '토스',
                profitDate: '',
                profit: 0,
                profitImageFile: null
            }}
        >
            {({
                  handleSubmit,
                  handleChange,
                  values,
                  isValid,
                  errors,
              }) => (
                <Form noValidate onSubmit={handleSubmit}>
                    <Form.Group as={Row} className="mt-3 mb-3" controlId="formUserName">
                        <Form.Label column sm={2}>
                            사용자명
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control type="text" name="username" value={values.username} placeholder="username" readOnly/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="formAppName">
                        <Form.Label column sm={2}>
                            앱태크명
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Select
                                name="appName"
                                onChange={handleChange}
                                defaultValue="토스">
                                <option>토스</option>
                                <option>신한</option>
                            </Form.Select>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="formProfit">
                        <Form.Label column sm={2}>
                            수익
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control
                                type="number"
                                name="profit"
                                onChange={handleChange}
                                placeholder="profit" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="formProfitDate">
                        <Form.Label column sm={2}>
                            날짜
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control
                                type="date"
                                name="profitDate"
                                onChange={handleChange}
                                placeholder="profitDate" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="formFile">
                        <Form.Label column sm={2}>
                            수익캡쳐화면
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control
                                type="file"
                                required
                                name="profitImageFile"
                                onChange={handleChange}
                                isInvalid={!!errors.profitImageFile}
                            />
                            <Form.Control.Feedback type="invalid" tooltip>
                                {errors.username}
                            </Form.Control.Feedback>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Col sm={{ span: 10, offset: 2 }}>
                            <Button type="submit">등록</Button>
                        </Col>
                    </Form.Group>
                </Form>
            )}
        </Formik>
    )
}

export default UserProfitForm;
