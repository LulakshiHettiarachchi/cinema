import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button } from 'antd';
import {getMovieById} from '../../services/MovieService';
import '../../styles/Movie/MovieDetails.css';

const { Meta } = Card;

const MovieDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const movieData = await getMovieById(id);
                setMovie(movieData);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMovie();
    }, [id]);

    const handleBookNow = () => {
        navigate(`/showtimes/${movie.id}/${movie.name}`);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!movie) {
        return <div>Movie not found</div>;
    }

    return (
        <div className="movie-details-container">
            <Card className="movie-details-card">
                <div className="movie-details-content">
                    <div className="movie-image">
                        <img alt={movie.name} src={`data:image/jpeg;base64,${movie.imageData}`} />
                    </div>
                    <div className="movie-info">
                        <Meta title={movie.name} description={movie.language} className="movie-meta" />
                        <div className="movie-description">
                            <p>{movie.description}</p>
                        </div>
                        <div className="movie-duration">
                            <p><strong>Duration:</strong> {movie.hours}h {movie.minutes}min</p>
                        </div>
                        <div className="movie-release-date">
                            <p><strong>Release Date:</strong> {movie.releaseDate}</p>
                        </div>

                        <Button type="primary" className="booking-button" onClick={handleBookNow}>Book Now</Button>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default MovieDetails;
