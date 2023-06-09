import { useState, useEffect } from 'react';
import '@aws-amplify/ui-react/styles.css';
import '../components/recommendations/Recommendations.css';
import { useLocation } from 'react-router-dom';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Spinner } from 'react-bootstrap';

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

const Search = () => {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const searchParam = searchParams.get('query');
    console.log({searchParam});

    const [searchResults, setSearchResults] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log("IN EFFECT");

        fetch(`https://zkeuos9g2a.execute-api.us-east-1.amazonaws.com/v1/search?query=${searchParam}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
        })
        .then(response => response.json())
        .then(data => {
            console.log("DATA: " + JSON.stringify(data));
            setSearchResults(data.workouts);
            setLoading(false);
        })
        .catch(error => {
            console.error(error);
            setLoading(false);
            const div_no_results = document.getElementById('no-results');
            div_no_results.style.display = "block";
        });

    // eslint-disable-next-line
    }, []);

    console.log("searchResults: " + searchResults);

    const handleWorkoutClick = (id) => {
        const workoutPath = `/workout/${id}`;
        window.location.assign(workoutPath);
    };

    return (
        <div>

            <h1>Showing search results for "<b>{searchParam}</b>"</h1>

            {loading ? (
            <Spinner style={{ marginTop: '10px' }} animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
            ) : (
            <div>

                <h2 id='no-results' style={{ display: 'none' }}>No results found.</h2>
                    
                <div id='workout-info' style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>

                    {searchResults.map((workout, index) => (
                        <div key={index} id='curr-workout' class='workout-card' style={{ width: '32%', display: 'inline', 
                                                            padding: '5px', margin: '5px', 
                                                            border: '1px solid black', 
                                                            justifyContent: 'center', cursor: 'pointer' }}
                            onClick={() => handleWorkoutClick(workout['id'])}
                            >
                        
                            <div style={{ height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <b>{workout['title']}</b>
                            </div>

                            <div id='double-panel' style={{ display: 'flex' }}>

                                <MapContainer center={[workout['lat'], workout['long']]} zoom={13} style={{ height: '230px', width: '50%', margin: '10px' }}>
                                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                        <Marker position={[workout['lat'], workout['long']]} icon={pointerIcon}></Marker>
                                </MapContainer>

                                <div style={{ margin: '10px', textAlign: 'left', fontSize: '13px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>

                                    <div>{workout['type']}, {workout['intensity']} intensity</div>

                                    <br />

                                    <div>every {workout['weekDay']}</div>
                                    <div>{workout['start_time']}-{workout['end_time']}</div>

                                    <br />

                                    <div>{workout['addrName']}</div>
                                    <div>{workout['addr'].split(',')[0]}</div>
                                    <div>{workout['city']}, {workout['state']}</div>
                                    {workout['zip_code'].length === 5 && (
                                        <div>{workout['zip_code']}</div>
                                    )}

                                </div>

                            </div>
                        
                        </div>
                    ))}
                </div>

            </div>
            )}
        </div>
    );
}

export default Search;
