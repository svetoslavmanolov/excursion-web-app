import { useState } from "react"


const ErrorHandler = ({error}) => {
    // const [errorMessage, setErrorMessage] = useState(error);

    // const handleClick = () => {
    //     setErrorMessage('Example error message!');
    // }

    // setErrorMessage('Example error message!');

    return (
        <div className="errorContainer">
            <p>{error}</p>
        </div>
    )
}

export default ErrorHandler;


{/* <div>
    <button onClick={handleClick}>Show error message</button>
    {errorMessage && <div>{errorMessage}</div>}
</div> */}