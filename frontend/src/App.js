// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { AuthProvider } from './context/AuthContext';
// import Layout from '../src/pages/Layout';
// import Home from './pages/Home';
// import Login from './pages/Login';
// import Signup from './pages/Signup';
// import ProtectedRoute from './components/ProtectedRoute';
// import ForgotPassword from "./pages/ForgotPassword";
// import ResetPassword from "./pages/ResetPassword";
// import UserProfile from "./pages/UserProfile";
// import "./App.css";
// import MovieDetails from "./components/Movie/Moviedetails";
// import ShowTimes from "./pages/ShowTimes";
// import SeatMap from "./pages/SeatMap";
// import BookingData from "./pages/BookingData";
//
// function App() {
//     return (
//         <AuthProvider>
//             <Router>
//                 <Routes>
//                     <Route path="/" element={<Layout />}>
//                         <Route index element={<Home />} />
//                         <Route path="/login" element={<Login />} />
//                         <Route path="/forgot" element={<ForgotPassword />} />
//                         <Route path="/reset-password" element={<ResetPassword />} />
//                         <Route path="/signup" element={<Signup />} />
//                         <Route path="/user/profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
//                         <Route path="/movies/:id" element={<MovieDetails />} />
//                         <Route path="/showtimes/:id/:name" element={<ShowTimes/>}/>
//                         <Route path="/seatmap/:id/:name/:time" element={<SeatMap/>} />
//                         <Route path="/booking-data" element={<BookingData/>} />
//
//                     </Route>
//                 </Routes>
//             </Router>
//         </AuthProvider>
//     );
// }
//
// export default App;
// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { BookingProvider } from './context/BookingContext';
import Layout from './pages/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProtectedRoute from './components/ProtectedRoute';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import UserProfile from './pages/UserProfile';
import MovieDetails from './components/Movie/Moviedetails';
import ShowTimes from './pages/ShowTimes';
import SeatMap from './pages/SeatMap';
import BookingData from './pages/BookingData';
import './App.css';
import Payment from "./pages/Payment";
import EmailVerification from "./pages/EmailVerification";

function App() {
    return (
        <AuthProvider>
            <BookingProvider>
                <Router>
                    <Routes>
                        <Route path="/" element={<Layout />}>
                            <Route index element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/forgot" element={<ForgotPassword />} />
                            <Route path="/reset-password" element={<ResetPassword />} />
                            <Route path="/signup" element={<Signup />} />
                            <Route path="/verify-email" element={<EmailVerification />} />
                            <Route path="/user/profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
                            <Route path="/movies/:id" element={<MovieDetails />} />
                            <Route path="/showtimes/:id/:name" element={<ShowTimes />} />
                            <Route path="/seatmap/:id/:name/:time" element={<SeatMap />} />
                            <Route path="/booking-data" element={<ProtectedRoute><BookingData /></ProtectedRoute>}  />
                            <Route path="/payment" element={<ProtectedRoute><Payment /></ProtectedRoute>} />

                        </Route>
                    </Routes>
                </Router>
            </BookingProvider>
        </AuthProvider>
    );
}

export default App;
