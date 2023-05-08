import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import './WorkoutDetails.css';

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

function WorkoutDetails() {

  const { id } = useParams();
  const [userEmail, setUserEmail] = useState('');

  const [workout_title, setWorkoutTitle] = useState('');
  const [workout_site, setWorkoutSite] = useState('');
  const [latitude, setWorkoutLatitude] = useState('');
  const [longitude, setWorkoutLongitude] = useState('');
  const [address_name, setAddressName] = useState('');
  const [address, setAddress] = useState('');
  const [location, setLocation] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [workout_type, setWorkoutType] = useState('');
  const [intensity, setIntensity] = useState('');
  const [desc, setDesc] = useState('');
  const [start_time, setStartTime] = useState('');
  const [end_time, setEndTime] = useState('');
  const [weekday, setWeekday] = useState('');

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isButtonDoneDisabled, setIsButtonDoneDisabled] = useState(false);

  const [initFavorited, setInitFavorited] = useState(false);
  const [initCompleted, setInitCompleted] = useState(false);


  useEffect(() => {
    async function fetchUserEmail() {
      try {
        const user = await Auth.currentAuthenticatedUser();
        setUserEmail(user.attributes.email);

        // POST request to getWorkout lambda function
        if (userEmail) {
            const response = await fetch(`https://zkeuos9g2a.execute-api.us-east-1.amazonaws.com/v1/workout/${id}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                email: userEmail,
                workout_id: id
              })
            });
            
            const data = await response.json();
            const workout_info = JSON.parse(data.body).Item;
            console.log(data);

            const is_favorited = JSON.parse(data.body).favorited;
            setInitFavorited(is_favorited);
            const is_completed = JSON.parse(data.body).completed;
            setInitCompleted(is_completed);

            const workout_title = workout_info.title;
            setWorkoutTitle(workout_title);

            const workout_site = workout_info.website;
            setWorkoutSite(workout_site);

            const latitude = workout_info.lat;
            setWorkoutLatitude(latitude);

            const longitude = workout_info.long;
            setWorkoutLongitude(longitude);

            const address_name = workout_info.addrName;
            setAddressName(address_name);

            const address = workout_info.addr ? workout_info.addr : '';
            setAddress(address);

            const location = workout_info.location;
            setLocation(location);

            const city = workout_info.city;
            setCity(city);

            const state = workout_info.state;
            setState(state);

            const zipcode = workout_info.zip_code;
            setZipcode(zipcode);

            const type = workout_info.type;
            setWorkoutType(type.charAt(0).toUpperCase() + type.slice(1));

            const intensity = workout_info.intensity;
            setIntensity(intensity.charAt(0).toUpperCase() + intensity.slice(1));

            const desc = workout_info.description;
            setDesc(desc);

            const start = workout_info.start_time;
            const startTimeString = new Date(`1970-01-01T${start}:00`).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
            setStartTime(startTimeString);

            const end = workout_info.end_time;
            const endTimeString = new Date(`1970-01-01T${end}:00`).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
            setEndTime(endTimeString);

            const weekday = workout_info.weekDay;
            setWeekday(weekday);


          }

      } catch (error) {
        console.log(error);
      }
    }

    fetchUserEmail();
  }, [id, userEmail]);


// implementation for add to favorites
const handleAddFavorite = async () => {

    console.log("Adding to Favorites...");
    setIsButtonDisabled(true);
    setIsFavorite(true);

    // PUT to add-favorites-done
    const response = await fetch('https://zkeuos9g2a.execute-api.us-east-1.amazonaws.com/v1/workout/{workout_id}', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: userEmail,
            workoutid: id,
            done: false,
            favorite: true
        })
    });

    const data = await response.json();
    console.log(data);

};


// implementation for add to completed
const handleAddCompleted = async () => {

    console.log("Adding to Completed...");
    setIsButtonDoneDisabled(true);

    // PUT to add-favorites-done
    const response = await fetch('https://zkeuos9g2a.execute-api.us-east-1.amazonaws.com/v1/workout/{workout_id}', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: userEmail,
            workoutid: id,
            done: true,
            favorite: false
        })
    });

    const data = await response.json();
    console.log(data);
};


  return (

    <div id = 'workout-info'>

        <h1 style={{ marginBottom: "0px"}}>{workout_title}</h1>
        (<a href={workout_site} target="_blank" rel="noreferrer">view more info</a>)

        <div id='double-panel' style={{ display: 'flex', margin: '10px 65px 10px 65px' }}>

            <div style={{ width: '50%', margin: '20px 10px 10px 10px', padding: '10px' }}>

                {/* time information */}
                <div id='time_info' style={{ display: 'flex' }}>
                    <img src='https://reddogpetresort.com/wp-content/uploads/2016/03/clock-icon.png' 
                        alt='clock icon' style={{ height: '25px' }} />

                    <div style={{ marginLeft: '10px', textAlign: 'left' }}>
                        <div><b>{start_time}-{end_time}</b></div>
                        <div>every <b>{weekday}</b></div>
                    </div>
                </div> <br /><br />


                {/* address information */}
                <div id='address_info' style={{ display: 'flex' }}>
                    <img src='https://static.vecteezy.com/system/resources/previews/017/178/337/original/location-map-marker-icon-symbol-on-transparent-background-free-png.png' 
                        alt='location pointer icon' style={{ height: '30px' }} />

                    <div style={{ marginLeft: '5px', textAlign: 'left' }}>
                        <div><b>{address_name}</b></div>
                        <div>{address !== '' ? address : '('+location+')'}</div> 
                        <div>{city}, {state}</div>
                        <div>{zipcode}</div>
                    </div>
                </div> <br /><br />


                {/* workout information */}
                <div id='workout_info' style={{ display: 'flex' }}>
                    <div style={{ marginLeft: '35px', textAlign: 'left' }}>
                        <div><b>Workout Type</b>: {workout_type}</div>
                        <div><b>Workout Intensity</b>: {intensity}</div> <br /><br />
                        <div><b>Description</b>: {desc}</div>
                    </div>
                </div> <br /><br />


                {/* favorite & completed buttons */}
                <button style={{ marginRight: '20px' }} onClick={handleAddFavorite} disabled={isButtonDisabled || initFavorited}>
                    <FontAwesomeIcon icon={faHeart} /> {isFavorite ? 'Added to Favorites' : 'Add to Favorites'}
                </button>

                <button style={{ marginLeft: '20px' }} onClick={handleAddCompleted} disabled={isButtonDoneDisabled || initCompleted}>
                    <FontAwesomeIcon icon={faCheck} /> Completed this Workout
                </button>

            </div>
            
            {latitude && longitude && (
                <MapContainer center={[latitude, longitude]} zoom={13} style={{ height: '610px', width: '50%', margin: '10px' }}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <Marker position={[latitude, longitude]} icon={pointerIcon}>
                        <Popup>{address_name}</Popup>
                    </Marker>
                </MapContainer>
            )}

        </div>

    </div>
    )
};

export default WorkoutDetails;
