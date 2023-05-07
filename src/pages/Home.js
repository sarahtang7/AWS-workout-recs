import '@aws-amplify/ui-react/styles.css';
import Recommendations from '../components/recommendations/Recommendations';

const Home = () => {

    return (
        <div>
            <h1>Hello, welcome to Get Fit!</h1>
            <Recommendations/>
        </div>
    );
}

export default Home;