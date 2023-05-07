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
      
      if (user) {
        const response = await fetch('https://zkeuos9g2a.execute-api.us-east-1.amazonaws.com/v1/auth', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: email
          })
        });
        
        const data = await response.json();
        console.log(data);
        const signUp = JSON.parse(data.body).newUser
        console.log("sign up: " + signUp);
        
        if (signUp) {
          navigate('/createprofile', { state: { email } });
        } else {
          navigate('/home');
        }
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