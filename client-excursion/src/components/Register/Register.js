import { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Register.css';

import * as authService from '../../services/authService';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const { userLogin } = useContext(AuthContext);
    const navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const email = formData.get('email');
        const username = formData.get('username');
        const password = formData.get('password');

        authService.register(email, username, password)
            .then(authData => {
                userLogin(authData);
                navigate('/catalog');
            });
    }

    return (
        <section id="registerPage">
            <form id='registerForm' onSubmit={onSubmit}>
                <label htmlFor="email">Email:</label>
                <input type="text" id="email" name="email" placeholder="Email" />
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" placeholder="Enter your Username" />
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" placeholder="Password" />
                <input type="submit" className="register" value="Register" />
                <span style={{color:'white'}}>Already have an account? <Link to={`/login`} style={{textDecoration:'underline'}}>Login</Link></span>
            </form>
        </section>
    );
};

export default Register;

