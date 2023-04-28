import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';

const MyCustomSignUp = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const user = await Auth.currentAuthenticatedUser();
      const email = user.attributes.email;
      alert(email);
      if (user) { // if email not in database, navigate to createprofile. else navigate to home
        navigate('/home');
      }
    };
    checkUser();
  }, [navigate]);

  return null;
};

const handleSignUp = () => {
  alert("in handle sign up");
  window.location.href = '/createprofile';
}

export default withAuthenticator(MyCustomSignUp, { signUpConfig: { hiddenDefaults: ['phone_number'] }, onSignUp: handleSignUp });