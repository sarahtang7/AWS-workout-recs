import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import { useNavigate } from 'react-router-dom';
import { withAuthenticator, Authenticator } from '@aws-amplify/ui-react';

const MyCustomSignUp = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [address, setAddress] = useState('');
  const navigate = useNavigate();

  const updateCustomAttributes = async () => {
    const user = await Auth.currentAuthenticatedUser();
    await Auth.updateUserAttributes(user, {
      'custom:name': name,
      'custom:Age': age,
      'custom:address': address
    });
    navigate('/quiz');
  };

  return (
    <Authenticator>
      <div slot="sign-up">
        <h2>Please enter the following information:</h2>
        <div className="amplify-form-section amplify-section">
          <div className="amplify-form-body">
            <div className="amplify-form-row">
              <label className="amplify-input-label" htmlFor="name">
                Name:
              </label>
              <input
                className="amplify-form-input"
                key="name"
                name="custom:name"
                placeholder="Name"
                type="String"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <br></br><br></br>
            <div className="amplify-form-row">
              <label className="amplify-input-label" htmlFor="age">
                Age:
              </label>
              <input
                className="amplify-form-input"
                key="age"
                name="custom:Age"
                placeholder="Age"
                type="Number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
              />
            </div>
            <br></br><br></br>
            <div className="amplify-form-row">
              <label className="amplify-input-label" htmlFor="address">
                Address:
              </label>
              <input
                className="amplify-form-input"
                key="address"
                name="custom:address"
                placeholder="Address"
                type="String"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
            <br></br><br></br>
            <button onClick={updateCustomAttributes}>Next: User Workout Preferences</button>
          </div>
        </div>
      </div>
    </Authenticator>
  );
};

export default withAuthenticator(MyCustomSignUp);