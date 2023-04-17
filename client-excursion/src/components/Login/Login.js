import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Login.css';

import { AuthContext } from "../../contexts/AuthContext";
import * as authService from '../../services/authService';

const Login = () => {
    const { userLogin } = useContext(AuthContext);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();
        const { email, password } = Object.fromEntries(new FormData(e.target));
        authService.login(email, password)
            .then(authData => {
                if (authData.error) {
                    setError('Wrong email or password')
                    return;
                }
                userLogin(authData);
                navigate('/');
            })
            .catch(() => {
                navigate('/login');
            })
    }

    return (
        <section id="loginPage">
            <form id='loginForm' onSubmit={onSubmit}>
                <label htmlFor="email">Email:</label>
                <input type="text" id="email" name="email" placeholder="Email" />
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" placeholder="Password" />
                {error &&
                    <p className="create-error">{error}</p>
                }
                <input type="submit" className="register" value="Login" />
                <span style={{ color: 'white' }}>Don't have an account? <Link to={'/register'} style={{ textDecoration: 'underline' }}>Sign up</Link></span>
            </form>
        </section>
    )
}

export default Login;