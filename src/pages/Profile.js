import '@aws-amplify/ui-react/styles.css';
import { Auth } from 'aws-amplify';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import './Profile.css';
import { Spinner } from 'react-bootstrap';

const Profile = () => {
  const [userEmail, setUserEmail] = useState('');
  const [fav_workout_types, setFaveTypes] = useState([]);
  const [fitness_goals, setGoals] = useState([]);
  const [intensity, setIntensity] = useState('');
  const [duration, setDuration] = useState('');
  const [time_of_day, setTime] = useState('');

  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await Auth.signOut();
      navigate('/auth');
    } catch (error) {
      console.log('Error signing out:', error);
    }
  };


  useEffect(() => {
    async function fetchUserEmail() {
      try {
        const user = await Auth.currentAuthenticatedUser();
        setUserEmail(user.attributes.email);

        // POST request to getProfile lambda function
        if (userEmail) {
          const response = await fetch('https://zkeuos9g2a.execute-api.us-east-1.amazonaws.com/v1/profile', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: userEmail,
            })
          });

          const data = await response.json();
          const profile_info = JSON.parse(data.body);
          console.log(profile_info);

          const faveTypes = profile_info.fav_workout_type;
          setFaveTypes(prevPutResponses => [...prevPutResponses, faveTypes]);

          const goal = profile_info.fitness_goal;
          setGoals(prevPutResponses => [...prevPutResponses, goal]);

          const intensity = profile_info.intensity;
          setIntensity(intensity);

          const duration = profile_info.max_dist;
          setDuration(duration);

          const time = profile_info.time_of_day;
          const timeString = new Date(`1970-01-01T${time}:00`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          setTime(timeString);

          setLoading(false);

        }

      } catch (error) {
        console.log(error);
      }
    }

    fetchUserEmail();
  }, [userEmail]);


  return (
    <div className="profile-body">
      <div className="profile-container">
        <div className="profile-card">
          <h1 className="profile-header">Your Profile</h1>

          {loading ? (
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : (
            <div>

              <div>
                <b>Email</b>: {userEmail}
              </div>
              <br />
              <div>
                <b>Favorite workout type(s)</b>: {fav_workout_types}
              </div>
              <br />
              <div>
                <b>Fitness goal(s)</b>: {fitness_goals}
              </div>
              <br />
              <div>
                <b>Preferred intensity</b>: {intensity}
              </div>
              <br />
              <div>
                <b>Preferred workout length</b>: {duration} minutes
              </div>
              <br />
              <div>
                <b>Preferred workout time</b>: {time_of_day}
              </div>
              <br />
              <br />
              <button className="profile-button" onClick={handleSignOut}>
                Sign Out
              </button>

            </div>
          )}
          
        </div>
      </div>
    </div>
  );

};

export default Profile;