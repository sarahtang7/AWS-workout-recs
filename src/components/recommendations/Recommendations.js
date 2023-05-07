import '@aws-amplify/ui-react/styles.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function buildWorkout(workout) {
    return (
        <div key={workout.title}>
            <h2>{workout.title}</h2>
            <p>Intensity: {workout.intensity}</p>
            <p>Type: {workout.type}</p>
            <p>Location: {workout.location}</p>
            <p>Address: {workout.addr}</p>
            <p>Start Time: {workout.start_time}</p>
            <p>End Time: {workout.end_time}</p>
            <p>Description: {workout.description}</p>
            <p>Website: <a href={workout.website}>{workout.website}</a></p>
            <hr />
        </div>
    );
}

const Recommendations = () => {
    const [workouts, setWorkouts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.post('https://sk73xttyuh.execute-api.us-east-1.amazonaws.com/default/getWorkoutRecommendations', {
                "email": "mns2168@columbia.edu"
            });
            const rawData = JSON.parse(response.data.body);
            const workouts = rawData.map(item => item[0]);
            setWorkouts(workouts);
            console.log(workouts);
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>Recommended Workouts for you!</h1>
            <br />
            {workouts.map((workout, index) => {
                return (
                    buildWorkout(workout)
                );
            })}
        </div>
    );
}

export default Recommendations;
