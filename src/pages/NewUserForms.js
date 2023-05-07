import React, { useState } from "react";
import {
  Button,
  Container,
  CssBaseline,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
  InputLabel,
  InputAdornment,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useLocation } from 'react-router-dom';

const StyledContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(4),
}));
  
const StyledFormControl = styled(FormControl)({
  width: "100%",
});

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const UserProfileForm = () => {
  const location = useLocation();
  const loc_state = location.state;

  const email = loc_state.email;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState([]);
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("New York");
  const [state, setState] = useState("NY");
  const [zipcode, setZipcode] = useState("");
  const [fitnessGoals, setFitnessGoals] = useState([]);
  const [workoutTypes, setWorkoutTypes] = useState([]);
  const [fitnessLevel, setFitnessLevel] = useState("");
  const [intensityLevel, setIntensityLevel] = useState("");
  const [workoutTime, setWorkoutTime] = useState("");
  const [workoutDuration, setWorkoutDuration] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    // PUT to initialize-user
    const response = fetch('https://zkeuos9g2a.execute-api.us-east-1.amazonaws.com/v1/createprofile', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            fitness_goal: fitnessGoals,
            fav_workout_type: workoutTypes,
            intensity: intensityLevel,
            time_of_day: workoutTime,
            max_dist: workoutDuration
        })
    });

    const data = response;
    console.log("RESPONSE FROM /CREATEPROFILE: " + data);

    window.location.href = '/home';
  };

  const handleFitnessGoalChange = (event) => {
    setFitnessGoals(event.target.value);
  };

  const handleWorkoutTypeChange = (event) => {
    setWorkoutTypes(event.target.value);
  };

  return (
    <StyledContainer>
        <CssBaseline />
        <Typography component="h1" variant="h4"> Create User Profile </Typography>

        <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <br /><TextField id="firstName" label="First Name" variant="outlined"
                                    value={firstName} onChange={(e) => setFirstName(e.target.value)} required
                                    style={{ width: '250px' }}
                    />

                    <TextField id="lastName" label="Last Name" variant="outlined"
                                    value={lastName} onChange={(e) => setLastName(e.target.value)} required
                                    style={{ marginLeft: '20px', width: '250px' }}
                    />
                </Grid>

                <Grid item xs={12}>
                    <InputLabel htmlFor="age">Age:</InputLabel>  
                    <Select id="age" label="Age" variant="outlined" value={age}
                            onChange={(e) => setAge(e.target.value)} required style={{ width: '100px' }} >
                        {[...Array(82)].map((_, index) => (
                        <MenuItem key={index} value={index + 18}>
                            {index + 18}
                        </MenuItem>
                        ))}
                    </Select>
                </Grid>

                <Grid item xs={12}>
                    <br /><TextField id="streetAddress" label="Street Address" variant="outlined"
                                    value={streetAddress} onChange={(e) => setStreetAddress(e.target.value)} required
                                    style={{ width: '550px' }}
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField id="city" label="City" variant="outlined"
                                    value={city} onChange={(e) => setCity(e.target.value)} required
                                    style={{ width: '300px' }}
                    />

                    <TextField id="state" label="State" variant="outlined"
                                    value={state} onChange={(e) => setState(e.target.value)} required
                                    style={{ marginLeft: '50px', width: '200px' }}
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField id="zipcode" label="Zipcode" variant="outlined"
                                    value={zipcode} onChange={(e) => setZipcode(e.target.value)} required
                                    style={{ width: '200px' }}
                    />
                </Grid>

                <Grid item xs={12}>
                    <StyledFormControl variant="outlined">
                    <InputLabel htmlFor="fitness-goals">
                        What are your fitness goals?
                    </InputLabel>
                    <Select
                        label="What are your fitness goals?"
                        multiple
                        value={fitnessGoals}
                        onChange={handleFitnessGoalChange}
                        inputProps={{
                        id: "fitness-goals",
                        }}
                    >
                        <MenuItem value="Weight Loss">Weight Loss</MenuItem>
                        <MenuItem value="Cardiovascular Health">
                        Cardiovascular Health
                        </MenuItem>
                        <MenuItem value="Muscle Gain">Muscle Gain</MenuItem>
                        <MenuItem value="Overall Fitness">Overall Fitness</MenuItem>
                    </Select>
                    </StyledFormControl>
                </Grid>

                <Grid item xs={12}>
                    <StyledFormControl variant="outlined">
                    <InputLabel htmlFor="workout-types">
                        What types of workout do you enjoy?
                    </InputLabel>
                    <Select
                        label="What types of workout do you enjoy?"
                        multiple
                        value={workoutTypes}
                        onChange={handleWorkoutTypeChange}
                        inputProps={{
                        id: "workout-types",
                        }}
                    >
                        <MenuItem value="yoga">Yoga</MenuItem>
                        <MenuItem value="pilates">Pilates</MenuItem>
                        <MenuItem value="running">Running</MenuItem>
                        <MenuItem value="weightlifting">Weightlifting</MenuItem>
                        <MenuItem value="cycling">Cycling</MenuItem>
                        <MenuItem value="swimming">Swimming</MenuItem>
                    </Select>
                    </StyledFormControl>
                </Grid>

                <Grid item xs={12}>
                    <FormControl component="fieldset">
                    <FormLabel component="legend">
                        What is your current fitness level?
                    </FormLabel>
                    <RadioGroup
                        row
                        value={fitnessLevel}
                        onChange={(e) => setFitnessLevel(e.target.value)}
                    >
                        <FormControlLabel
                        value="beginner"
                        control={<Radio />}
                        label="Beginner"
                        />
                        <FormControlLabel
                        value="intermediate"
                        control={<Radio />}
                        label="Intermediate"
                        />
                        <FormControlLabel
                        value="advanced"
                        control={<Radio />}
                        label="Advanced"
                        />
                    </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl component="fieldset">
                    <FormLabel component="legend">
                        What is your preferred intensity level?
                    </FormLabel>
                    <RadioGroup
                        row
                        value={intensityLevel}
                        onChange={(e) => setIntensityLevel(e.target.value)}
                    >
                        <FormControlLabel value="low" control={<Radio />} label="Low" />
                        <FormControlLabel
                        value="medium"
                        control={<Radio />}
                        label="Medium"
                        />
                        <FormControlLabel
                        value="high"
                        control={<Radio />}
                        label="High"
                        />
                    </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <TextField
                    label="Preferred workout time"
                    type="time"
                    value={workoutTime}
                    onChange={(e) => setWorkoutTime(e.target.value)}
                    fullWidth
                    variant="outlined"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                    label="Preferred workout duration"
                    type="number"
                    value={workoutDuration}
                    onChange={(e) => setWorkoutDuration(e.target.value)}
                    fullWidth
                    variant="outlined"
                    InputProps={{
                        endAdornment: (
                        <InputAdornment position="end">min</InputAdornment>
                        ),
                    }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <StyledButton
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    >
                    Submit
                    </StyledButton>
                </Grid>
            </Grid>
        </form>
    </StyledContainer>
  )
};

export default UserProfileForm;