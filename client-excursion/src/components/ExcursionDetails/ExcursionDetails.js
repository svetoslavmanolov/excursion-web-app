import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"
import './ExcursionDetails.css';

import { AuthContext } from "../../contexts/AuthContext";
import { ExcursionContext } from "../../contexts/ExcursionContext";

import * as excursionService from '../../services/excursionService';
import * as commentService from '../../services/commentService';

const ExcursionDetails = () => {
    const navigate = useNavigate();
    const { addComment, fetchExcursionDetails, selectExcursion, excursionRemove } = useContext(ExcursionContext);
    const { user } = useContext(AuthContext);
    const { excursionId } = useParams();

    const [isBooked, setIsBooked] = useState(Boolean);
    const [bookedUsers, setBookedUsers] = useState([]);
    const [error, setError] = useState('');

    const currentExcursion = selectExcursion(excursionId);

    useEffect(() => {
        const effectFunc = async () => {
            const excursionDetails = await excursionService.getOne(excursionId);
            const excursionComments = await commentService.getCommentsByExcursionId(excursionId);
            fetchExcursionDetails(excursionId, { ...excursionDetails, comments: excursionComments.map(x => x) });
            setIsBooked(excursionDetails.listOfUsersBooked.some(x => x._id === user?._id));
            setBookedUsers(excursionDetails.listOfUsersBooked.map(x => x.username));
        }
        effectFunc();
    }, [isBooked]);

    const isOwner = currentExcursion.owner._id === user?._id;

    const excursionDeleteHandler = () => {
        const confirmation = window.confirm('Are you sure you want to delete this excursion?');

        if (confirmation) {
            excursionService.remove(excursionId)
                .then(() => {
                    excursionRemove(excursionId);
                    navigate('/catalog');
                });
        };
    };

    const excursionBookHandler = () => {
        excursionService.getOneToBook(excursionId)
            .then(result => {
                if (result.error) {
                    setError(result.error)
                    return;
                }
            })
        setIsBooked(isBooked => !isBooked)
    }

    const addCommentHandler = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const comment = formData.get('comment');
        if (comment !== '') {
            commentService.create(excursionId, comment)
                .then(result => {
                    addComment(excursionId, result);
                });
        }
    };

    return (
        <section id="detailsPage">
            <div id="detailsInfo">
                <h1>EXCURSION NAME: {currentExcursion.title}</h1>
                <div className="info">
                    <div><img src={currentExcursion.image} alt='excursionImage' /></div>
                    <div className="info-text">
                        <h3><span style={{ textDecoration: 'underline' }}>DURATION:</span> {currentExcursion.duration}</h3>
                        <h3><span style={{ textDecoration: 'underline' }}>DESTINATION:</span> {currentExcursion.destination}</h3>
                        <h3><span style={{ textDecoration: 'underline' }}>DESCRIPTION:</span> {currentExcursion.description}</h3>
                        <h3><span style={{ textDecoration: 'underline' }}>CREATOR:</span> {currentExcursion.creatorName}</h3>
                        <br />
                        <h3><span style={{ textDecoration: 'underline' }}>PEOPLE WHO HAVE BOOKED THIS PLACE:</span> <br />
                            <span style={{ fontStyle: 'italic' }}>{bookedUsers.join(', ')}</span></h3>
                        <h2><span style={{ textDecoration: 'underline' }}>PRICE:</span> ${currentExcursion.price}</h2>
                    </div>
                </div>
                <div className="buttons">
                    {user && isOwner &&
                        <>
                            <Link to={`/excursions/${excursionId}/edit`} style={{ margin: '10px' }} className="edit-btn">Edit Excursion</Link>
                            <Link to={'/catalog'} onClick={excursionDeleteHandler} style={{ margin: '10px' }} className="delete-btn">Delete Excursion</Link>
                        </>}
                    {user && isBooked && !isOwner && <p> <span className="buy">Thank you for your booking!</span></p>}
                    {user && !isBooked && !isOwner && <Link to='' onClick={excursionBookHandler} className="buy-btn">Book it!</Link>}
                    {!user && <Link to={'/login'}>Log in to book this excursion!</Link>}
                    <div className="info-section">
                        <div className="details-comments">
                            <h2 style={{ textAlign: 'start', paddingLeft: '60px', paddingTop: '10px' }}>Comments:</h2>
                            <ul>
                                {currentExcursion.comments?.map(x =>
                                    <li key={x._id} className="comment">
                                        <span>User: <span style={{ fontWeight: 'bold' }}>{`${x.creator}`}</span></span> <br />
                                        <span>Comment: <span style={{ fontWeight: 'bold' }}>{`${x.text}`}</span></span>
                                    </li>
                                )}

                            </ul>
                        </div>
                        {currentExcursion.comments.length === 0 &&
                            <p>No comments yet</p>
                        }
                    </div>

                    <article className="create-comment">
                        <form className="form" onSubmit={addCommentHandler}>
                            <textarea
                                name="comment"
                                placeholder="Add your comment here..."
                            />

                            <input
                                className="btn submit"
                                type="submit"
                                value="Add comment"
                            />
                        </form>
                    </article>
                </div>
            </div>
        </section >

    )
}

export default ExcursionDetails;
