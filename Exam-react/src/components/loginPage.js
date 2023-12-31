import React, { useState, useContext } from 'react';
import { useHref, useNavigate } from "react-router-dom";
import AuthContext from '../AuthContext';
import { Button, Form, Grid, Icon, Input, Segment, Select } from "semantic-ui-react";



export function LoginPage(){
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [user, setUser] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();


  const [state, setState] = useState({
    username: '',
    password: '',
    loading: false
})



  const listUrl = useHref('/menus/list');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    if(!appState.isAuthenticated){
    setAppState({ type: "LOADING", value: true })
    event.preventDefault();

    const credentials = {
      username: username,
      password: password
    };

    fetch('api/v1/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Accept': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(applyResult) 
      .catch((error) => {
        setError('An error occurred. Please try again later.');
      })
    }
    else{
        alert("Jau prisijungta");
            // setAppState({ type: "AUTHENTICATED", value: true })
    }
  };

  const applyResult = (result) => {
    const clear = () => {
        clearForm();
    }  
        if (result.ok) {
           setAppState({type: "LOGIN", value: true })
           navigate('/menus/list');                   
        } else {
          setError('Login failed. Please try again.');
        } 
  }
  const clearForm = () => {
    setState({
        ...state, user: '',
        password: null,
    })
}

const { appState, setAppState } = useContext(AuthContext)



  return (
    <Grid centered columns={2}>
    <Grid.Column>
      <h2>Prisijungimas</h2>
    <Segment color='grey' inverted>
    <Form color='grey' inverted>
      <Form.Group widths='equal'>
        <Form.Field>
        <label>Vartotojo vardas</label>
        <input type="text" name="username" placeholder='Vartotojo vardas' value={username} onChange={handleUsernameChange}/>
        </Form.Field>
        <Form.Field>
        <label>Slaptažodis</label>
        <input type="password" name="password" placeholder='Slaptažodis' value={password} onChange={handlePasswordChange}/>
        </Form.Field>
      </Form.Group>
      <Button type='submit' color='pink' onClick={handleSubmit}>Patvirtinti</Button>
    </Form>
  </Segment>
  </Grid.Column>   
  </Grid> 
  );
};
