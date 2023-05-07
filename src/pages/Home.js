import '@aws-amplify/ui-react/styles.css';
import Recommendations from '../components/recommendations/Recommendations';

const Home = () => {

    return (
        <div>
            <h1 style={{ marginTop: '5px' }}>Welcome to the Home Page</h1>
            <Recommendations/>
        </div>
    );
}

export default Home;