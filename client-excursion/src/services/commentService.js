import * as request from './requester';
import { baseUrl } from '../env';

// const baseUrl = process.env.REACT_APP_BASE_URL;
// const baseUrl = 'http://localhost:3005';

export const create = (excursionId, comment) =>
    request.post(`${baseUrl}/comments/create`, { excursionId, text: comment });

export const getCommentsByExcursionId = (excursionId) =>
    request.get(`${baseUrl}/comments/${excursionId}`);
