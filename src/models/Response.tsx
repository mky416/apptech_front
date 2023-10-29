import { AxiosError } from "axios";

export interface ApptechError {
    code: string;
    message: string ;
}

export interface ApptechResponse<T> {
    response?: T;
    error?: ApptechError | null
}

export type FetchError = AxiosError;