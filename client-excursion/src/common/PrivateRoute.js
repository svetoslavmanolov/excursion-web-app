import { useContext } from "react";
import { Navigate, Outlet, useParams } from "react-router-dom"
import { ExcursionContext } from "../contexts/ExcursionContext";
import { AuthContext } from "../contexts/AuthContext";

const PrivateRoute = ({children}) => {
    const {selectExcursion} = useContext(ExcursionContext);
    const {user} = useContext(AuthContext);
    const {excursionId} = useParams();

    const currentExcursion = selectExcursion(excursionId);

    if(user?._id !== currentExcursion?.owner?._id) {
        return <Navigate to='/' replace/>
    }

    return children ? children : <Outlet />;
}

export default PrivateRoute;