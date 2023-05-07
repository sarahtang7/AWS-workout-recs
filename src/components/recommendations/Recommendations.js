import './Recommendations.css';
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Auth } from 'aws-amplify';


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


const Recommendations = () => {
    const [workouts, setWorkouts] = useState([]);
    const [workout_info, setWorkoutInfo] = useState([]);
    const [selectedWorkout, setSelectedWorkout] = useState(null);
    const workoutRefs = useRef([]);
    const mapRef = useRef(null);
    const [isToggleOn, setIsToggleOn] = useState(false);
    const [userEmail, setUserEmail] = useState('');

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

    function buildWorkout(workout) {
        const handleWorkoutClick = (curr_id) => {
            window.location.href = `/workout/${curr_id}`;
        }

        const handleZoom = (lat, long) => {
            if (mapRef.current) {
                mapRef.current.flyTo([lat, long], 15);
            }
        }

        const handleInitMap = () => {
            if (mapRef.current) {
                mapRef.current.flyTo([40.7831, -73.9712], 10)
            }
        }

        const handleToggleClick = (lat, long, id) => {
            if (isToggleOn === false) {
                setSelectedWorkout(id);
                handleZoom(lat, long);
                setIsToggleOn(!isToggleOn);
            }
            else if (id === selectedWorkout) {
                const div = document.getElementById(id);
                if (div) {
                    div.style.backgroundColor = "white";
                }
                handleInitMap();
                setIsToggleOn(!isToggleOn);
            }
            else if (id !== selectedWorkout & isToggleOn === true) {
                setSelectedWorkout(id);
                handleZoom(lat, long);
                setIsToggleOn(true);
            }
            
        };

        const workoutClass = selectedWorkout === workout.id ? 'indiv-workout selected' : 'indiv-workout';
        const workoutRef = workoutRefs.current[workout.id] ??= React.createRef();
    
        return (
            <div ref={workoutRef} id={workout.id} className={workoutClass}
                onClick={() => handleToggleClick(workout.lat, workout.long, workout.id)}>

                <div style={{width: '100%', fontSize: '14px'}}>
                    <h3 style={{marginTop: '0px'}}><b>{workout.title}</b></h3> 
                    
                    <div style={{ display: 'flex' }}>
                        <div class="left" style={{width: '70%', textAlign: 'left', paddingLeft: '15px',}}>
                            <div><b>{workout.type}</b>, <b>{workout.intensity}</b> intensity</div>
                            <div>every <b>{workout.weekDay}</b>, <b>{new Date(`1970-01-01T${workout.start_time}:00`).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}-{new Date(`1970-01-01T${workout.end_time}:00`).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</b></div>
                            <hr class="h-line" />
                            <div>{workout.description.split(' ').slice(0, 20).join(' ')}...</div>
                        </div>
    
                        <div class="right" style={{width: '30%', }}>
                            <div><b>{workout.addrName}</b></div>
                            <div>{workout.addr.split(',')[0]}</div>
                            <div>{workout.city}, {workout.state}</div>
                            {workout.zip_code.length === 5 && (
                                <div>{workout.zip_code}</div>
                            )}

                            <button class='workout-info-button' onClick={() => handleWorkoutClick(workout.id)}>See workout information</button>
                        </div>
                    </div>
                    
                </div>
                
            </div>
            
            
        );
    }

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.post('https://zkeuos9g2a.execute-api.us-east-1.amazonaws.com/v1/home', {
                //"email": "mns2168@columbia.edu"
                "email": userEmail
            });
            const rawData = JSON.parse(response.data.body);
            const workouts = rawData.map(item => item[0]);

            // eslint-disable-next-line
            rawData.map((item) => {
                const lat = item[0].lat;
                const long = item[0].long;
                const title = item[0].title;
                const id = item[0].id;

                const compiled = [lat, long, title, id];

                setWorkoutInfo(prevPutResponses => [...prevPutResponses, compiled]);
            });

            setWorkouts(workouts);
            //console.log(rawData);
        };

        fetchData();
    }, [userEmail]);

    function handleSelected(curr_id) {
        setSelectedWorkout(curr_id)
    }

    if (selectedWorkout != null) {
        const curr = document.getElementById(selectedWorkout);
        curr.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
    }
    

    return (
        <div>
            <h2 style={{ marginTop: '-20px' }}>Here are some recommended workouts for you!</h2>

            <div style={{ height: '630px', margin: '10px', display: 'flex'}}>
                
                <div style={{ width: '40%', overflow: 'auto', paddingRight: '10px', marginTop: '-10px'}}>
                    {workouts.map((workout) => {
                        return (
                            buildWorkout(workout, setSelectedWorkout)
                        );
                    })}
                </div>

                <MapContainer id="map" center={[40.7831, -73.9712]} zoom={10} style={{ height: '100%', width: '60%' }} ref={mapRef}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    
                    {workout_info.map((workout, index) => {
                        return (
                            <Marker position={[workout[0], workout[1]]} icon={pointerIcon}
                                    eventHandlers={{
                                        click: () => handleSelected(workout[3])
                                    }}
                            >
                                <Tooltip>{workout[2]}</Tooltip>
                            </Marker>
                        );
                    })}
                </MapContainer>

            </div>

        </div>
    );
}

export default Recommendations;
