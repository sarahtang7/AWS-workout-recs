import './Recommendations.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function buildWorkout(workout) {
    const handleButtonClick = () => {
        window.open(workout.website, '_blank', 'noreferrer');
    };

    return (
        <div key={workout.title} className="workout-card">
            <h2>{workout.title}</h2>
            <div className="workout-info">
                <p>Intensity: {workout.intensity}</p>
                <p>Type: {workout.type}</p>
                <p>Location: {workout.location}</p>
                <p>Address: {workout.addr}</p>
                <p>Start Time: {workout.start_time}</p>
                <p>End Time: {workout.end_time}</p>
            </div>
            <details className="workout-details">
                <summary>Description</summary>
                <p>{workout.description}</p>
            </details>
            <button className="website-button" onClick={handleButtonClick}>
                Visit Website
            </button>
        </div>
    );
}

const Recommendations = () => {
    const [workouts, setWorkouts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.post('https://sk73xttyuh.execute-api.us-east-1.amazonaws.com/default/getWorkoutRecommendations', {
                "email": "sarahtang07@gmail.com"
            });
            const rawData = JSON.parse(response.data.body);
            const workouts = rawData.map(item => item[0]);
            setWorkouts(workouts);
            console.log(workouts);
        };

        fetchData();
    }, []);

    return (
        <div className="recommendations-container">
            <h1>Recommended Workouts for you!</h1>
            <div className="workout-grid">
                {workouts.map((workout, index) => {
                    return (
                        buildWorkout(workout)
                    );
                })}
            </div>
        </div>
    );
}

export default Recommendations;
