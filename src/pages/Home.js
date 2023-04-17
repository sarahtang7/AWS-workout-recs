import '@aws-amplify/ui-react/styles.css';
import { withAuthenticator } from "@aws-amplify/ui-react";
import { useNavigate } from 'react-router-dom';

const Home = ({ signOut }) => {
    const navigate = useNavigate();

    const handleSignOut = () => {
        signOut();
        navigate('/');
    };

    return (
        <div>
            <h1>Hello, welcome to Get Fit!</h1>
            <button onClick={handleSignOut}>Sign Out</button>
        </div>
    );
}

export default withAuthenticator(Home, {
    includeGreetings: true,
    signUpConfig: { hiddenDefaults: ['phone_number'] },
    redirect: '/'
});