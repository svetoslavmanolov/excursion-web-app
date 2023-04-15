import { useContext, useEffect, useState } from "react";
import { Navigate, Outlet, useParams } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { ExcursionContext } from "../contexts/ExcursionContext";
import * as excursionService from '../services/excursionService';

const PrivateRoute = ({children}) => {

    const { excursionId } = useParams();
    const { selectExcursion } = useContext(ExcursionContext);
    const currentExcursion = selectExcursion(excursionId);
    const { user } = useContext(AuthContext);
    // const [excursion, setExcursion] = useState({});


    

    // useEffect(() => {
    //     (async () => {
    //         const excursion = await excursionService.getOne(excursionId);
    //         console.log(excursion)
    //         // setExcursion(excursion => excursion);
    //     })();
    // })

    // console.log(currentExcursion)
    // console.log(user._id)
    // console.log(excursionId)

    if (user._id != currentExcursion.owner._id) {
        return <Navigate to='/' replace />
    }

    return children ? children : <Outlet />
    // return children;
}

export default PrivateRoute;