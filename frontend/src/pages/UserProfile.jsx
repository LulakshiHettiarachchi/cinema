import 'react-international-phone/style.css';
import 'react-phone-input-2/lib/style.css';
import '../styles/UserProfile.css';
import UserBookingHistory from "../components/UserBookingHistory";
import UserProfileCard from "../components/UserProfileCard";

const UserProfile = () => {
    return (
        <div className="profile-main-container">
            <div className="profile-main-container-card">
                <UserProfileCard/>
            </div>
        </div>

    );
};

export default UserProfile;

