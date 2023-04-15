import { createContext, useEffect, useReducer } from "react";

import * as excursionService from '../services/excursionService';

export const ExcursionContext = createContext();

const ACTIONS = {
    ADD_EXCURSIONS: 'add-excursions',
    ADD_EXCURSION: 'add-excursion',
    FETCH_EXCURSION_DETAILS: 'fetch-excursion-details',
    EDIT_EXCURSION: 'edit-excursion',
    ADD_COMMENT: 'add-comment',
    REMOVE_EXCURSION: 'remove-excursion'
}

const excursionReducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.ADD_EXCURSIONS:
            return action.payload.map(x => ({ ...x, comments: [] }));
        case ACTIONS.ADD_EXCURSION:
            return [...state, action.payload];
        case ACTIONS.FETCH_EXCURSION_DETAILS:
        case ACTIONS.EDIT_EXCURSION:
            return state.map(x => x._id === action.excursionId ? action.payload : x);
        case ACTIONS.ADD_COMMENT:
            return state.map(x => x._id === action.excursionId ? { ...x, comments: [...x.comments, action.payload] } : x);
        case ACTIONS.REMOVE_EXCURSION:
            return state.filter(x => x._id !== action.excursionId);
        default:
            return state;
    }
};

export const ExcursionProvider = ({ children }) => {
    const [excursions, dispatch] = useReducer(excursionReducer, []);

    useEffect(() => {
        excursionService.getAll()
            .then(excursions => {
                const action = {
                    type: ACTIONS.ADD_EXCURSIONS,
                    payload: excursions
                };
                dispatch(action);
            });
    }, []);

    const selectExcursion = (excursionId) => {
        return excursions.find(x => x._id === excursionId) || {};
    }

    const excursionAdd = (excursionData) => {
        dispatch({ type: ACTIONS.ADD_EXCURSION, payload: excursionData });
    }

    const fetchExcursionDetails = (excursionId, excursionDetails) => {
        dispatch({
            type: ACTIONS.FETCH_EXCURSION_DETAILS,
            payload: excursionDetails,
            excursionId
        });
    }

    const excursionEdit = (excursionId, excursionData) => {
        dispatch({
            type: ACTIONS.EDIT_EXCURSION,
            payload: excursionData,
            excursionId
        });
    }

    const addComment = (excursionId, comment) => {
        dispatch({
            type: ACTIONS.ADD_COMMENT,
            payload: comment,
            excursionId
        });
    }

    const excursionRemove = (excursionId) => {
        dispatch({ type: ACTIONS.REMOVE_EXCURSION, excursionId });
    }

    return (
        <ExcursionContext.Provider value={{
            excursions,
            excursionAdd,
            excursionEdit,
            excursionRemove,
            fetchExcursionDetails,
            selectExcursion,
            addComment,
        }}>
            {children}
        </ExcursionContext.Provider>
    );
}
