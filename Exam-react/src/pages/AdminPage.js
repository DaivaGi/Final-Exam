import React, { Component } from 'react'
import { Grid, Menu, Segment } from 'semantic-ui-react'
import { FoodMenu } from '../components/menu';
import  {AdminMenu}  from '../components/adminmenu';


export function AdminPage(){



  return (
   <div>
    <AdminMenu />
   </div>
    );

}