import { useState } from "react";
import { createContext } from "react";


export const ErrorHandlerCreateFormContext = createContext();

export const ErrorHandlerCreateFormProvider = ({children}) => {

    const [errors, setErrors] = useState({});
    const [values, setValues] = useState({
        title: '',
        duration: '',
        destination: '',
        price: '',
        description: '',
        image: ''
    });

    const changeHandler = (e) => {
        setValues(state => ({
            ...state,
            [e.target.name]: e.target.value
        }));
        console.log(errors)
        console.log(values)
    }

    const minLength = (e, bound) => {
        setErrors(state => ({
            ...state,
            [e.target.name]: (values[e.target.name].length < bound)
        }));
    }

    const minMaxLength = (e, minBound, maxBound) => {
        setErrors(state => ({
            ...state,
            [e.target.name]: ((values[e.target.name].length < minBound ||
                values[e.target.name].length > maxBound))
        }));
    }

    const isPositive = (e) => {
        let number = Number(e.target.value);

        setErrors(state => ({
            ...state,
            [e.target.name]: (number < 0)
        }));
    }

    const isCorrectImageUrl = (e) => {
        setErrors(state => ({
            ...state,
            [e.target.name]: (!values[e.target.name].startsWith('http'))
        }));
    }

    return (
        <ErrorHandlerCreateFormContext.Provider value={{
            errors,
            values,
            changeHandler,
            minLength,
            minMaxLength,
            isPositive,
            isCorrectImageUrl
        }}>
            {children}
        </ErrorHandlerCreateFormContext.Provider>
    )


}