import * as request from './requester';
import { baseUrl } from '../env';

// const baseUrl = process.env.REACT_APP_BASE_URL;

export const getAll = () =>
    request.get(`${baseUrl}/excursions`);

export const getOne = (excursionId) =>
    request.get(`${baseUrl}/excursions/${excursionId}/details`);

export const getOneToBook = (excursionId) =>
    request.get(`${baseUrl}/excursions/${excursionId}/book`);

export const create = (excursionData) =>
    request.post(`${baseUrl}/excursions/create`, excursionData);

export const edit = (excursionId, excursionData) =>
    request.post(`${baseUrl}/excursions/${excursionId}/edit`, excursionData);

export const remove = (excursionId) =>
    request.get(`${baseUrl}/excursions/${excursionId}/delete`);
