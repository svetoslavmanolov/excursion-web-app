import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

const Header = () => {
    const { user } = useContext(AuthContext);
    return (
        <header>
            <nav>
                <ul>
                    {/* <!--For all users--> */}
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/catalog">Catalog</Link></li>

                    {user
                        ?
                        <>
                            <li><Link to="/create">Create</Link></li>
                            <li><Link to="/search">Search</Link></li>
                            <li><Link to="/logout">Logout</Link></li>
                            <p style={{
                                display: 'inline',
                                fontWeight: 'bold',
                                color: 'white',
                                fontSize: '20px'
                            }}>Hello, {user.username}!</p>
                        </>
                        :
                        <>
                            <li><Link to="/login">Login</Link></li>
                            <li><Link to="/register">Register</Link></li>
                        </>
                    }
                </ul>
            </nav>
        </header >
    )
};

export default Header;