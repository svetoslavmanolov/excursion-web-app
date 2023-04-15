import { useContext } from "react";
import { Navigate, Outlet, useParams } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { ExcursionContext } from "../contexts/ExcursionContext";

const PrivateRoute = ({children}) => {

    const { excursionId } = useParams();
    const { selectExcursion } = useContext(ExcursionContext);
    const currentExcursion = selectExcursion(excursionId);
    const { user } = useContext(AuthContext);

    if (user._id !== currentExcursion.owner._id) {
        return <Navigate to='/' replace />
    }

    return children ? children : <Outlet />
}

export default PrivateRoute;