import React, { useState, useEffect } from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import TopMovieBar from '../components/Movie/TopMovieBar';
import AllMovieSection from '../components/Movie/AllMovieSection';
import CustomFooter from '../components/Footer';
import { getMovies } from '../services/MovieService';

const Layout = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation();

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const moviesData = await getMovies();
                setMovies(moviesData);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch movies:', error);
                setError(error);
                setLoading(false);
            }
        };

        fetchMovies();
    }, []);

    const handleSearch = (value) => {
        setSearchQuery(value);
    };

    useEffect(() => {
        // Reset search query on every route change
        setSearchQuery('');
    }, [location]);

    const filteredMovies = searchQuery
        ? movies.filter(movie => movie.name.toLowerCase().includes(searchQuery.toLowerCase()))
        : movies;

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading movies. Please try again later.</div>;
    }

    return (
        <div className="app-container">
            <Navbar onSearch={handleSearch} />
            <div className="content-wrap">
                <Outlet />
            </div>
            {!searchQuery && <TopMovieBar />}
            {filteredMovies.length > 0 ? (
                <AllMovieSection movies={filteredMovies} />
            ) : (
                <div className='no-results'>
                    No results found
                </div>
            )}
            <CustomFooter className='footer' />
        </div>
    );
};

export default Layout;
