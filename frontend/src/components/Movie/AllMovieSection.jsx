
import React, { useState } from 'react';
import { Row, Col, Card, Pagination } from 'antd';
import '../../styles/Movie/AllMovieSection.css';
import {useNavigate} from "react-router-dom";

const { Meta } = Card;
const itemsPerPage = 8; // 5 cards per row * 2 rows = 10 cards per page

const AllMovieSection = ({ movies }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleCardClick = (id) => {
        navigate(`/movies/${id}`);
    };
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentMovies = movies.slice(startIndex, endIndex);

    // Define the number of columns based on screen size
    const colSize = {
        xs: 24, // Extra small devices (phones)
        sm: 12, // Small devices (tablets)
        md: 8,  // Medium devices (desktops, large tablets)
        lg: 6,  // Large devices (desktops)
    };

    return (
        <div className='all-movie-main-container'>
            <div className='all-movie-title'>
                Movies
            </div>
            <div className='all-movie-bar'>
                <Row gutter={[16, 16]}>
                    {currentMovies.map((movie, index) => (
                        <Col key={index} {...colSize}>
                            <Card
                                className="movie-card"
                                hoverable
                                cover={<img alt={movie.name} src={`data:image/jpeg;base64,${movie.imageData}`}  />}

                                // cover={<img alt={movie.name} src={movie.img} />}
                                onClick={() => handleCardClick(movie.id)}
                            >
                                <Meta title={movie.name} description={movie.language} />
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
            <div className='pagination-container'>
                <Pagination
                    current={currentPage}
                    pageSize={itemsPerPage}
                    total={movies.length}
                    onChange={handlePageChange}
                />
            </div>
        </div>
    );
};

export default AllMovieSection;

