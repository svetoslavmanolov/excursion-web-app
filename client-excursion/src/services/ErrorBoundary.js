import React from "react";
import ErrorHandler from "../components/ErrorHandler/ErrorHandler";


// class ErrorBoundary extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = { hasError: false };
//     }

//     componentDidCatch(error, errorInfo) {
//         console.log(error, errorInfo);
//         this.setState({ hasError: true });
//     }

//     render() {
//         if (this.state.hasError) {
//             return <h1>Something went wrong.</h1>;
//         }

//         return this.props.children;
//     }
// }

// export default ErrorBoundary;



class ErrorBoundary extends React.Component {
    state = { hasError: false }

    static getDerivedStateFromError(error) {
        return { hasError: true }
    }

    componentDidCatch(error, info) {
        console.log(error, info);
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback
            // return <ErrorHandler error />
        }
        return this.props.children
    }
}
export default ErrorBoundary;
