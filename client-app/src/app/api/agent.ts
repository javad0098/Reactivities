import axios, { AxiosError, AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Activity } from './../../Models/activity';
import { store } from './../stors/store';

const sleep = (delay: number) => {
    return new Promise((resolve) =>
        setTimeout(resolve, delay))
}

axios.defaults.baseURL = 'http://localhost:5000/api'

axios.interceptors.response.use(async response => {

        await sleep(1000);
        return response;


}, (error: AxiosError) => {
    const { status } = error.response!;
    const data: any = error.response!.data
    switch (status) {
        case 400:
            if (data.errors) {
                const modelStateErrors = [];
                for (const key in data.errors) {

                    if (data.errors[key]) {
                        modelStateErrors.push(data.errors[key]);
                    }
                }
                throw modelStateErrors.flat();
            }
            else {
                toast.error(data)
            }
            break;
        case 401:
            toast.error('unauthorise')
            break;
        case 404:
            toast.error('not found')
            break;
        case 500:
            store.commonStore.setServerError(data)
            const navigate = useNavigate();

            navigate("/ServerError")
            break;
        default:
            toast.error('some eror')
            break;
    }
    return Promise.reject(error);
})
const responsBody = <T>(response: AxiosResponse<T>) => response.data;

const request = {
    get: <T>(url: string) => axios.get<T>(url).then(responsBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responsBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responsBody),
    del: <T>(url: string) => axios.delete<T>(url).then(responsBody)
}

const Activities = {
    list: () => request.get<Activity[]>('/activities'),
    details: (id: string) => request.get<Activity>(`/activities/${id}`),
    create: (activity: Activity) => request.post<void>('/activities', activity),
    update: (activity: Activity) => request.put<void>(`/activities/${activity.id}`, activity),
    delete: (id: string) => axios.delete<void>(`/activities/${id}`)

}
const agent = {
    Activities
}
export default agent;