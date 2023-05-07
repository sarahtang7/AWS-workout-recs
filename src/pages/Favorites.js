import '@aws-amplify/ui-react/styles.css';
import { Auth } from 'aws-amplify';
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';


const pointerIcon = new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    shadowAnchor: [12, 41]
  });


const Favorites = () => {

    const [userEmail, setUserEmail] = useState('');
    const [favorited, setFavorited] = useState([]);

    const [workouts, setWorkouts] = useState([]);

    useEffect(() => {
        async function fetchUserEmail() {
          try {
            const user = await Auth.currentAuthenticatedUser();
            setUserEmail(user.attributes.email);
          } catch (error) {
            console.log(error);
          }
        }
        fetchUserEmail();
    }, []);

    useEffect(() => {
        async function fetchFavorites() {
          try {

            // POST request to get-favorites lambda function
            if (userEmail) {
                const response = await fetch('https://zkeuos9g2a.execute-api.us-east-1.amazonaws.com/v1/favorites', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: userEmail
                    })
                });
            
                const data = await response.json();
                const faves = JSON.parse(data.body).favoriteids;
                setFavorited(faves);
            }
          } catch (error) {
                console.log(error);
            }
        }

        fetchFavorites();
    }, [userEmail]);

    useEffect(() => {
        async function fetchWorkoutInfo() {
            try {
                for (const workoutId of favorited) {
                    const response = await fetch('https://zkeuos9g2a.execute-api.us-east-1.amazonaws.com/v1/favorites', {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            email: userEmail,
                            workout_id: workoutId
                        })
                    });
                
                    const data = await response.json();
                    const workout_info = JSON.parse(data.body).Item;
                    console.log(workout_info)

                    const workout_title = workout_info.title;
                    const latitude = workout_info.lat;
                    const longitude = workout_info.long;
                    const date = workout_info.weekDay;

                    const start = workout_info.start_time;
                    const startTimeString = new Date(`1970-01-01T${start}:00`).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
                    
                    const end = workout_info.end_time;
                    const endTimeString = new Date(`1970-01-01T${end}:00`).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

                    const addrName = workout_info.addrName;
                    const addr = workout_info.addr.split(',')[0];
                    const city = workout_info.city;
                    const state = workout_info.state;
                    const zip = workout_info.zip_code;

                    const type = workout_info.type;
                    const intensity = workout_info.intensity;

                    const id = workout_info.id;

                    const workouts = [workout_title, latitude, longitude, date, startTimeString,
                                        endTimeString, addrName, addr, city, state, zip, type, intensity, id];
                    setWorkouts(prevPutResponses => [...prevPutResponses, workouts]);

                }
            } catch (error) {
                console.log(error);
            }
        }
        if (favorited.length > 0) {
            fetchWorkoutInfo();
        }
    // eslint-disable-next-line
    }, [favorited, userEmail]);

    const handleWorkoutClick = (curr_id) => {
        window.location.href = `/workout/${curr_id}`;
    }


    return (
        <div>

            <h1 style={{ marginBottom: "0px"}}>Favorites</h1>

            <div id='workout-info' style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>

                {workouts.map((workout, index) => (
                    <div key={index} id='curr-workout' style={{ width: '32%', display: 'inline', 
                                                            padding: '5px', margin: '5px', 
                                                            border: '1px solid black', 
                                                            justifyContent: 'center', cursor: 'pointer' }}
                            onClick={() => handleWorkoutClick(workout[13])}>
                        
                        <div style={{ height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <b>{workout[0]}</b>
                        </div>

                        <div id='double-panel' style={{ display: 'flex' }}>

                            <MapContainer center={[workout[1], workout[2]]} zoom={13} style={{ height: '230px', width: '50%', margin: '10px' }}>
                                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                    <Marker position={[workout[1], workout[2]]} icon={pointerIcon}></Marker>
                            </MapContainer>

                            <div style={{ margin: '10px', textAlign: 'left', fontSize: '13px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>

                                <div>{workout[11]}, {workout[12]} intensity</div>

                                <br />

                                <div>every {workout[3]}</div>
                                <div>{workout[4]}-{workout[5]}</div>

                                <br />

                                <div>{workout[6]}</div>
                                <div>{workout[7]}</div>
                                <div>{workout[8]}, {workout[9]}</div>
                                <div>{workout[10]}</div>

                            </div>

                        </div>
                        
                    </div>
                ))}

            </div>

        </div>
    );
}

export default Favorites;
