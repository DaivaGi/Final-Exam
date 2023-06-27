import React, { Component } from 'react'
import { Grid, Menu, Icon } from 'semantic-ui-react'
import { NavLink } from "react-router-dom";
import { Link, Navigate, useNavigate } from "react-router-dom";
import {useContext, useState, useEffect } from "react";
import AuthContext from "../AuthContext";

export function AdminMenu(){
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
    <div>
    <Grid columns={1}>
      <Grid.Column>
        <Menu fluid vertical tabular id="main" className="ui centered grid">
          <Menu.Item
            name="carService"
            content="Servisai"
            icon="wrench"
            as={NavLink}
            exact
            to="/menus/list"
            
          />
          <Menu.Item
            name='foremen'
            icon="users"
            content='Meistrai'
            as={NavLink}
            exact
            to="/foremen/list"            
          />
          <Menu.Item
            name='logout'
            content='išeiti'
            icon='window close outline'
            onClick={logoutHandler}

          />
          
        </Menu>
      </Grid.Column>      
    </Grid>
    </div>

    );

}