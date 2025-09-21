import { useState } from 'react';
import Navbar from "../components/Navbar";
import TokenForm from "../components/TokenForm";
import SongTable from "../components/SongTable";

const Home = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState('');

    const handleAuthenticated = (token) => {
        setToken(token);
        setIsAuthenticated(true);
    };

    return (
        <>
            <Navbar />
            {isAuthenticated ? (
                <SongTable token={token} />
            ) : (
                <TokenForm onAuthenticated={handleAuthenticated} />
            )}
        </>
    );
};

export default Home;