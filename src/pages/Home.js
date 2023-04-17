//import { Authenticator } from "@aws-amplify/ui-react";
import '@aws-amplify/ui-react/styles.css';
import { withAuthenticator } from "@aws-amplify/ui-react";


const Home = ({ signOut }) => {
    return (
        <div>
            <h1>Hello, welcome to Get Fit!</h1>
            <button onClick={signOut}>Sign Out</button>
        </div>
    );
}

//export default Home;
export default withAuthenticator(Home, {
    includeGreetings: true,
    signUpConfig: { hiddenDefaults: ['phone_number'] },
    redirect: '/home'
  });