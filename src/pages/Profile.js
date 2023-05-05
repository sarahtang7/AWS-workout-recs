import '@aws-amplify/ui-react/styles.css';
import { Auth } from 'aws-amplify';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const navigate = useNavigate();

    const handleSignOut = async () => {
        try {
            await Auth.signOut();
            navigate('/auth');
        } catch (error) {
            console.log('Error signing out:', error);
        }
    };

    return (
        <div>
            <h1>This is the Profile Page</h1>
            <button onClick={handleSignOut}>Sign Out</button>
        </div>
    );
}

export default Profile;