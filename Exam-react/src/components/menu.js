import { React, useContext, useState, useEffect } from "react";
import {Container, Segment, Menu, Button} from 'semantic-ui-react';
import { Link, Navigate, useNavigate } from "react-router-dom";
import car from "../images/car.png";
import AuthContext from "../AuthContext";
import { NavLink } from 'react-router-dom';

export function FoodMenu() {
  const { appState, setAppState } = useContext(AuthContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  const logoutHandler = async () => {
    fetch("/logout", {
      method: "POST",
    }).then((response) => {
      setAppState({ type: "LOGOUT" });
      navigate("/", { replace: true });
    });
  };

  return (
    <Segment color='grey' inverted>
        <Menu color='grey' inverted secondary>
        <Menu.Item >        
       <img alt="logo" src={car} />        
        </Menu.Item>       
          <Menu.Item
          as={NavLink}
          exact
          to='/'
          name='home'
          content = 'SUPER-AUTO'
          />
          <Menu.Item
          as={NavLink}
          exact
          to='/serviceList'
            name='menu'
            content = 'Servisų sąrašas'
          />
          <Menu.Item
          as={NavLink}
          exact
          to='/foremenList'
            name='orders'
            content = 'Meistrų sąrašas'
          />
          {appState.isAuthenticated && (
          <Menu.Item
          as={NavLink}
          exact
          to='/menus/list'
            name='admin'
            content = "Administravimas"
          />)}      
          {!appState.isAuthenticated && (
        <Menu.Item position='right'
        as={NavLink}
        exact
        to='/login'
          name='login'
          content = 'Prisijungti'
        />)}
        {appState.isAuthenticated && (
        <Menu.Item position='right'
        as={Button}
        onClick={logoutHandler}
          name='logout'
          content = 'Išeiti'
        />)}
        </Menu>
      </Segment>
    
  );
}
