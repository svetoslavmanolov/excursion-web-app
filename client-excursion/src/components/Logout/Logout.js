import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom"

import { AuthContext } from "../../contexts/AuthContext";
import * as authService from '../../services/authService';

const Logout = () => {
    const navigate = useNavigate();
    const { user, userLogout } = useContext(AuthContext);
    const userId = user._id;

    useEffect(() => {
        authService.logout(userId)
        userLogout();
        navigate('/', { replace: true });
    });
}

export default Logout;