import axios from 'axios';
import { ProfitFormData } from '../../components/ranking/UserProfitForm';
import { ApptechResponse } from '../../models/Response';
import { UserProfit } from '../../models/UserProfit';
import apiWrapper from '../helper/apiWrapper';

/**
 * 상세 조회
 * @param userProfitId
 */
export const getUserProfit = (
    userProfitId: number
): Promise<ApptechResponse<UserProfit>> =>
    apiWrapper(
        () => getAxios().get(`/userProfit/${userProfitId}`),
    );

/**
 * 등록
 * @param userProfitId
 */
export const setUserProfit = async (data:ProfitFormData) =>
    apiWrapper(
        () => getAxios().post(`/userProfit`, data)
    );

/**
 * 수정
 * @param userProfitId
 * @param data
 */
export const modifyUserProfit = async (userProfitId:number, data: ProfitFormData) => {
    apiWrapper(
        () => getAxios().put(`/userProfit/${userProfitId}`,data)
    );
}

export const getAxios = () => axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_HOST}`,
    timeout: 600000,
    withCredentials: true,
});
