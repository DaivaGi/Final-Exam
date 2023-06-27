import { useState, useEffect } from "react";
import { Button, Form, Select, Grid, Table, Modal, Input, Segment, Divider, Icon } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import '../index.css';
import { AdminMenu } from "../components/adminmenu";

export function AdminForemenList() {
  const params = useParams();
  const [orders, setOrders] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [open, setOpen] = useState(false);
  const [cartQuantity, setCartQuantity] = useState(0);
  const [cartQuantityError, setCartQuantityError] = ('');
  const [formValid, setFormValid] = useState(false);
  const [foremen, setForemen] = useState([]);
  const [name, setName ] = useState('');
  const [surname, setSurname] = useState('');
  const [specialization, setSpecialization] = useState ('');
  const [city, setCity] = useState('');
  const [rating, setRating] = useState('');
  const [serviceId, setServiceId] = useState('');

  const clear = () => {
    setName("");
    setSurname("");
    setSpecialization("");
    setCity("");
    setRating("");
  };

  const applyResult = (result) => {
    if (result.ok) {
      clear();
    } else {
      window.alert("Nepavyko sukurti: " + result.status);
    }
  };

  useEffect(() => {
    fetch(`/api/v1/foremen`)
      .then((response) => response.json())
      .then(setForemen)

fetchCarServices();
  }, []);

  const fetchForemen = () => {
    fetch(`/api/v1/foremen`)
      .then((response) => response.json())
      .then(setForemen)
  }

  const [carServices, setCarServices] = useState([]);

    const fetchCarServices = async () => {
      fetch("/api/v1/carServices")
      .then((response) => response.json())
      .then((data) =>
        setCarServices(
          data.map((x) => {
            return { key: x.id, text: x.title, value: x.id };
          })
        )
      );
    };

  

  const createForeman = () => {
    fetch(`/api/v1/foremen/${serviceId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        surname,
        specialization,
        city
      }),
    })
      .then(applyResult)
      .then(setIsActive(true));
  };

  const saveModal = () => {    
    setOpen(false);
    createForeman();
    clear();
    fetchForemen();
  }

  const exitModal = () => {
    setOpen(false);
    clear();
  }

  const removeForeman = (id) => {
    fetch("/api/v1/foremen/delete/" + id, {
      method: "DELETE",
    })
      .then(fetchForemen)
      .then(setOpen(false));
  };

  return (
    <div>   
        <Grid columns={2} >
      <Grid.Column width={3} id='main'>
           <AdminMenu active='foremen'/> 
           </Grid.Column>
           <Grid.Column textAlign="left" verticalAlign="top" width={13}>
           <Segment id="segment" color="pink">
        <Modal
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open}
          trigger={
            <Button
              title="Pridėti meistrą"
              color="pink"
              labelPosition="left"
              icon              
            >
              <Icon name="plus" />
              Pridėti Meistrą
            </Button>
          }>
          <Modal.Header>Pridėti naują meistrą</Modal.Header>
          <Modal.Content>
            <Form>              
                <Form.Field>
                  <label>Vardas</label>
                  </Form.Field>
                  <Form.Field>
                    <Input
                    class="ui fluid input"
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />                  
                </Form.Field>              
              
                <Form.Field>
                  <label>Pavarde</label>
                  </Form.Field>
                  <Form.Field>
                    <Input
                    class="ui fluid input"
                      type="text"
                      id="surename"
                      value={surname}
                      onChange={(e) => setSurname(e.target.value)}
                    />
                    </Form.Field>

                  <Form.Field>
                  <label>Specializacija</label>
                  </Form.Field>
                  <Form.Field>
                    <Input
                    class="ui fluid input"
                      type="text"
                      id="specialization"
                      value={specialization}
                      onChange={(e) => setSpecialization(e.target.value)}
                       />                  
                </Form.Field>
             
                <Form.Field>
                  <label>Miestas</label>
                    <Input
                    class="ui fluid input"
                      type="text"
                      id="city"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  
                </Form.Field>
                <Form.Field>
                <label>Servisas</label>
                <Select options={carServices} placeholder='Servisas' onClose={() => console.log(serviceId)} onChange={(e, data) => setServiceId(data.value)} />

              </Form.Field>
             

            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button color="grey" onClick={exitModal}>
              Atšaukti
            </Button>
            <Button
              content="Patvirtinti"
              labelPosition="right"
              icon="checkmark"
              onClick={saveModal}
              color='teal'
            />
          </Modal.Actions>
        </Modal>


              <Divider horizontal hidden></Divider>

        <Table selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Vardas</Table.HeaderCell>              
              <Table.HeaderCell>Pavardė</Table.HeaderCell>
              <Table.HeaderCell>Specializacija</Table.HeaderCell>
              <Table.HeaderCell>Miestas</Table.HeaderCell>
              <Table.HeaderCell>Reitingas</Table.HeaderCell>
              <Table.HeaderCell>Veiksmai</Table.HeaderCell>
                          
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {foremen.map((foreman) => (
              <Table.Row key={foreman.id}>
                <Table.Cell>{foreman.name}</Table.Cell>
                <Table.Cell>{foreman.surname}</Table.Cell>
                <Table.Cell>{foreman.specialization}</Table.Cell>
                <Table.Cell>{foreman.city}</Table.Cell>
                <Table.Cell></Table.Cell>                               
                <Table.Cell>                     
                <Button
                    href={"#/menus/view/" + foreman.id}
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
                    onClick={() => removeForeman(foreman.id)}
                  ></Button>
                         </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Segment>
      </Grid.Column>
      </Grid>
    </div>
  );
}