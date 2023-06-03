import React, {useState} from 'react';
import Header from '../../../components/Header';
import UserProfitForm, {ProfitFormData} from '../../../components/ranking/UserProfitForm'
import {Container, Row} from "react-bootstrap";

const initialProfitData = {
    userId: 0,
    appId: 0,
    profitDate: 20220301,
    profit: 0,
    profitImageFile: null
}

const UserProfitPage = (): JSX.Element => {
    const [profitData, setProfitData] = useState<ProfitFormData>(initialProfitData);

    const onSubmit = async (submitData: ProfitFormData) => {
        const addForm = new FormData();
    };

    return (
        <>
            <Header/>
            <Container fluid>
                <Row className="m-4">
                    <UserProfitForm onSubmit={onSubmit} editMode={true} profitData ={profitData} />
                </Row>
            </Container>
        </>
    )
}

export default UserProfitPage;
