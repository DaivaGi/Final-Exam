import { Grid, Menu, Segment, Button, Icon, Table, Divider, Confirm } from 'semantic-ui-react'
import React, { useEffect, useState } from "react";

export function ServiceList(){
    
    const [carServices, setCarServices] = useState([]);

    const fetchCarServices = async () => {
      fetch("/api/v1/carServices")
        .then((response) => response.json())
        .then((jsonResponse) => setCarServices(jsonResponse));
    };

    const onRowClick = (id) => {
       window.location="#/viewM/" + id
      }
  
    useEffect(() => {
      fetchCarServices();
    }, []);

    return(        
            <div>  
                <h3>Rinktis servisą:</h3>          
          <Segment id="segment" color="teal">    

              <Table selectable>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Pavadinimas</Table.HeaderCell>
                    <Table.HeaderCell>Vadovas</Table.HeaderCell>
                    <Table.HeaderCell>Adresas</Table.HeaderCell>                    
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {carServices.map((servise) => (
                    <Table.Row key={servise.id} onClick={() => onRowClick(servise.id)}>
                      <Table.Cell>{servise.title}</Table.Cell> 
                      <Table.Cell>{servise.manager}</Table.Cell>                     
                      <Table.Cell>{servise.address}</Table.Cell> 
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>

          </Segment>
        </div>
    )

}
