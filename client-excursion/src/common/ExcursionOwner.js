import { useContext } from "react";
import { Navigate, Outlet, useParams } from "react-router-dom"
import { ExcursionContext } from "../contexts/ExcursionContext";
import { AuthContext } from "../contexts/AuthContext";



const ExcursionOwner = ({children}) => {
    const {selectExcursion, excursions} = useContext(ExcursionContext);
    const {user} = useContext(AuthContext);
    const {excursionId} = useParams();

    const currentExcursion = selectExcursion(excursionId);

    // console.log(selectExcursion)
    // console.log(currentExcursion)
    // console.log(excursions)

    // console.log(user)
    // console.log(excursionId)


    if(user._id !== currentExcursion.owner._id) {
        return <Navigate to='/' replace/>
    }

    return children ? children : <Outlet />;
}

export default ExcursionOwner;