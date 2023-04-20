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

const StyledContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(4),
}));

const StyledFormControl = styled(FormControl)({
  width: "100%",
});

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const WorkoutPreferencesForm = () => {
  const [fitnessGoals, setFitnessGoals] = useState([]);
  const [workoutTypes, setWorkoutTypes] = useState([]);
  const [fitnessLevel, setFitnessLevel] = useState("");
  const [intensityLevel, setIntensityLevel] = useState("");
  const [workoutTime, setWorkoutTime] = useState("");
  const [workoutDuration, setWorkoutDuration] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    alert("Thank You!");
    window.location.href = '/home';
    // TODO: handle form submission
  };

  const handleFitnessGoalChange = (event) => {
    setFitnessGoals(event.target.value);
  };

  const handleWorkoutTypeChange = (event) => {
    setWorkoutTypes(event.target.value);
  };

  return (
    <StyledContainer maxWidth="sm">
      <CssBaseline />
      <Typography component="h1" variant="h4">
        The Workout Quiz
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
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
  );
};

export default WorkoutPreferencesForm;
