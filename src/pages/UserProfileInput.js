import React, { useState } from "react";
import {
  Button,
  Container,
  CssBaseline,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
  InputLabel
} from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(4),
}));

const UserProfileForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState([]);
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("New York");
  const [state, setState] = useState("NY");
  const [zipcode, setZipcode] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    window.location.href = '/quiz';
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
                    <Button type="submit" variant="contained" color="primary">
                        Create
                    </Button>
                </Grid>
            </Grid>
        </form>
    </StyledContainer>
  )
};

export default UserProfileForm;