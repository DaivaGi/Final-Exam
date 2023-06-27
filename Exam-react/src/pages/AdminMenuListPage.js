import { Grid, Menu, Segment, Button, Icon, Table, Divider, Confirm } from 'semantic-ui-react'
import { AdminMenu } from '../components/adminmenu'
import { NavLink } from "react-router-dom";
import React, { useEffect, useState } from "react";




export function AdminMenuListPage(){

    const [carServices, setCarServices] = useState([]);

  const fetchCarServices = async () => {
    fetch("/api/v1/carServices")
      .then((response) => response.json())
      .then((jsonResponse) => setCarServices(jsonResponse));
  };

  useEffect(() => {
    fetchCarServices();
  }, []);

  const removeCarServices = (id) => {
    fetch("/api/v1/carServices/delete/" + id, {
      method: "DELETE",
    })
      .then(fetchCarServices)
      .then(setOpen(false));
  };

  const [open, setOpen] = useState(false);

    return(
        <div>
            <Grid columns={2} >
      <Grid.Column width={3} id='main'>
           <AdminMenu active='menu'/> 
           </Grid.Column>
           <Grid.Column textAlign="left" verticalAlign="top" width={13}>
          <Segment id="segment" color="teal">
          <Button                
                title="Pridėti servisą"              
                color='teal'
                labelPosition="left"
                icon
                as={NavLink}
                exact
                to="/menus/create"
              ><Icon name="plus" />
                Naujas servisas
              </Button>

              <Divider horizontal hidden></Divider>

              <Table selectable>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Pavadinimas</Table.HeaderCell>
                    <Table.HeaderCell>Adresas</Table.HeaderCell>
                    <Table.HeaderCell>Vadovas</Table.HeaderCell>
                    <Table.HeaderCell>Veiksmai</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {carServices.map((menu) => (
                    <Table.Row key={menu.id}>
                      <Table.Cell>{menu.title}</Table.Cell>                     
                      <Table.Cell>{menu.address}</Table.Cell>
                      <Table.Cell>{menu.manager}</Table.Cell>
                      <Table.Cell collapsing>
                        <Button
                          as={NavLink}
                          exact
                          to={"/menus/list/view/" + menu.id}
                          basic
                          compact
                          icon="eye"
                          title="Peržiūrėti"
                        ></Button>
                        <Button
                          id="icocolor"
                          basic
                          compact
                          title="Ištrinti"
                          icon="trash alternate outline"
                          onClick={() => setOpen(menu.id)}
                        ></Button>

                        <Confirm
                          open={open}
                          header="Dėmesio!"
                          content="Ar tikrai norite ištrinti?"
                          cancelButton="Grįžti atgal"
                          confirmButton="Taip"
                          onCancel={() => setOpen(false)}
                          onConfirm={() => removeCarServices(open)}
                          size="small"
                        />
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>

          </Segment>
          </Grid.Column>
           </Grid>

        </div>
    )
}