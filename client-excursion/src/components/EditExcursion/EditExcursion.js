import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import * as excursionService from '../../services/excursionService';
import { ExcursionContext } from "../../contexts/ExcursionContext";
import './EditExcursion.css';

const EditExcursion = () => {
    const [currentExcursion, setCurrentExcursion] = useState({});
    const { excursionEdit } = useContext(ExcursionContext);
    const { excursionId } = useParams();
    const navigate = useNavigate();

    const [errors, setErrors] = useState({});
    const [values, setValues] = useState({
        title: '',
        duration: '',
        destination: '',
        price: '',
        description: '',
        image: ''
    });

    useEffect(() => {
        excursionService.getOne(excursionId)
            .then(excursionData => {
                setCurrentExcursion(excursionData);
            });
    }, []);

    const changeHandler = (e) => {
        setValues(state => ({
            ...state,
            [e.target.name]: e.target.value
        }));
        console.log(errors)
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

    const onSubmit = (e) => {
        e.preventDefault();
        const excursionData = Object.fromEntries(new FormData(e.target));
        excursionService.edit(excursionId, excursionData)
            .then(result => {
                // if (result.error) {
                //     setError(result.error)
                //     return;
                // }
                excursionEdit(excursionId, result);
                navigate(`/catalog/${excursionId}`, { replace: true });
            });
    };

    const isFormValid = !Object.values(errors).some(x => x);


    return (
        <>
            {/* {error && <ErrorHandler error={error}/>} */}

            <section id="editPage">
                <form id='editForm' onSubmit={onSubmit}>
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        // value={values.title}
                        defaultValue={currentExcursion.title}
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
                        defaultValue={currentExcursion.duration}
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
                        defaultValue={currentExcursion.destination}
                        onChange={changeHandler}
                        onBlur={(e) => minLength(e, 3)}
                    />
                    {errors.destination &&
                        <p className="create-error">Destination should be at least 3 characters long! </p>
                    }

                    <label htmlFor="price">Price:</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        defaultValue={currentExcursion.price}
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
                        defaultValue={currentExcursion.description}
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
                        defaultValue={currentExcursion.image}
                        onChange={changeHandler}
                        onBlur={isCorrectImageUrl}
                    />
                    {errors.image &&
                        <p className="create-error">The image url should start with 'http'</p>
                    }

                    <input type="submit" className={!isFormValid ? 'submitButton' : ''} disabled={!isFormValid} defaultValue="Edit Excursion Offer" />
                </form>
            </section>
        </>
    )
}

export default EditExcursion;