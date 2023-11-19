import axios from 'axios';
import { ApptechError } from '../../models/Response';

interface responseData{
    data?: any,
    error?: ApptechError | null | undefined
}

export const apiWrapper = async (call: Function) => {

    let result:responseData = { data: null, error: null };

    try {
        // API
        const response = await call();
        if (axios.isAxiosError(response)) {
            result.error = {
                code: `API_ERROR_${response?.code}`,
                message: response.message,
            };
        } else {
            if (response?.data) {
                if (response.data.result === 'SUCCESS') {
                    result.data = response.data.data;
                } else {
                    result.error = response.data.error ?? {
                        code: `API_ERROR_${response.status}`,
                        message: response.statusText ?? 'NOT_FOUND_RESPONSE_ERROR',
                    };
                }
            } else {
                result.error = {
                    code: `API_ERROR_${response?.code}`,
                    message: response?.message,
                };
            }
        }
    } catch (error: any) {
        result.error = {
            code: 'API_ERROR',
            message: error.message,
        };
    }

    if (result.error) {
        console.debug('>>> ERROR api : ', result.error);
    }

    return result;
};

export default apiWrapper;
