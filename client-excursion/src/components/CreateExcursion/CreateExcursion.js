import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateExcursion.css';

import { ExcursionContext } from '../../contexts/ExcursionContext';
// import { ErrorHandlerCreateFormContext } from '../../contexts/ErrorHandlerCreateFormContext';
import * as excursionService from '../../services/excursionService';
import ErrorHandler from '../ErrorHandler/ErrorHandler';


const CreateExcursion = () => {
    const { excursionAdd } = useContext(ExcursionContext);
    // const { errors,
    //     values,
    //     changeHandler,
    //     minLength,
    //     minMaxLength,
    //     isPositive,
    //     isCorrectImageUrl } = useContext(ErrorHandlerCreateFormContext);
    const navigate = useNavigate();
    // const [error, setError] = useState('');

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
        // console.log(errors)
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

    const onSubmit = async (e) => {
        e.preventDefault();
        const excursionData = Object.fromEntries(new FormData(e.target));

        excursionService.create(excursionData)
            .then(result => {
                // console.log(result)

                // if (result.error) {
                //     setError(result.error)
                //     return;
                // }
                excursionAdd(result)
                navigate('/catalog');
            });
    }

    // const isFormValid = !(Object.values(errors).some(x => x) && !Object.keys(errors).length === 0);
    const isFormValid = !Object.values(errors).some(x => x) && Object.keys(errors).length == 6

    return (
        <>
            {/* {error ? <ErrorHandler error={error} /> : ''} */}

            <section id="createPage">
                <form id='createForm' onSubmit={onSubmit}>
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Title..."
                        value={values.title}
                        onChange={changeHandler}
                        onBlur={(e) => minLength(e, 5)}
                    />
                    {errors.title &&
                        <p className="create-error">Title should be at least 5 characters long! </p>
                    }

                    <label htmlFor="duration">Duration:</label>
                    <input
                        type="text"
                        id="duration"
                        name="duration"
                        placeholder="Duration..."
                        value={values.duration}
                        onChange={changeHandler}
                        onBlur={(e) => minLength(e, 3)}
                    />
                    {errors.duration &&
                        <p className="create-error">Duration should be at least 3 characters long! </p>
                    }

                    <label htmlFor="destination">Destination:</label>
                    <input
                        type="text"
                        id="destination"
                        name="destination"
                        placeholder="Destination..."
                        value={values.destination}
                        onChange={changeHandler}
                        onBlur={(e) => minLength(e, 3)}
                    />
                    {errors.destination &&
                        <p className="create-error">Destination should be at least 3 characters long!</p>
                    }

                    <label htmlFor="price">Price:</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        placeholder="Price..."
                        value={values.price}
                        onChange={changeHandler}
                        onBlur={isPositive}
                    />
                    {errors.price &&
                        <p className="create-error">Price should be a positive number!</p>
                    }

                    <label htmlFor="description">Description:</label>
                    <input
                        type="text"
                        id="description"
                        name="description"
                        placeholder="Description..."
                        value={values.description}
                        onChange={changeHandler}
                        onBlur={(e) => minMaxLength(e, 4, 50)}
                    />
                    {errors.description &&
                        <p className="create-error">Description should be between 4 and 50 characters long!</p>
                    }

                    <label htmlFor="image">Image:</label>
                    <input
                        type="text"
                        id="image"
                        name="image"
                        placeholder="Image..."
                        value={values.image}
                        onChange={changeHandler}
                        onBlur={isCorrectImageUrl}
                    />
                    {errors.image &&
                        <p className="create-error">The image url should start with 'http'</p>
                    }

                    <input type="submit" className={!isFormValid ? 'submitButton' : ''} disabled={!isFormValid} value="Create Excursion" />
                </form>
            </section>
        </>
    )

}


export default CreateExcursion;