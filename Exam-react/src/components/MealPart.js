import { useState, useEffect } from "react";
import { Button, Form, Card, Table, Modal, Input, Segment, Divider, Icon } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";

export function MealsPart() {
  const params = useParams();
  const [meals, setMeals] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [open, setOpen] = useState(false);
  const [name, setName ] = useState('');
  const [surname, setSurname] = useState('');
  const [specialization, setSpecialization] = useState ('');
  const [city, setCity] = useState('');
  const [ foremen, setForemen] = useState([]);


  useEffect(() => {
    fetch(`/api/v1/foremen/all/${params.id}`)
      .then((response) => response.json())
      .then(setForemen);
  }, [params.id, isActive]);

  const clear = () => {
    setName("");
    setSurname("");
    setSpecialization("");
    setCity('');
  };

  const fetchForemen = () => {
    fetch(`/api/v1/foremen/all/${params.id}`)
      .then((response) => response.json())
      .then(setForemen);
  };

  const applyResult = (result) => {
    if (result.ok) {
      clear();
    } else {
      window.alert("Nepavyko sukurti: " + result.status);
    }
  };

  const removeForeman = (id) => {
    fetch("/api/v1/foremen/delete/" + id, {
      method: "DELETE",
    })
      .then(fetchForemen)
      .then(setOpen(false));
  };

  const createForemen = () => {
    fetch(`/api/v1/foremen/${params.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        quantity,
      }),
    })
      .then(applyResult)
      .then(setIsActive(true));
  };

  const saveModal = () => {    
    setOpen(false);
    createForemen();
    clear();
    fetchForemen();
  }

  const exitModal = () => {
    setOpen(false);
    clear();
  }


  return (
    <div>
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
          }
        >
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
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
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
            {foremen.map((meal) => (
              <Table.Row key={meal.id}>
                <Table.Cell>{meal.name}</Table.Cell>
                <Table.Cell>{meal.surname}</Table.Cell>
                <Table.Cell>{meal.specialization}</Table.Cell>
                <Table.Cell>{meal.city}</Table.Cell>
                <Table.Cell>{meal.rating}</Table.Cell>
                <Table.Cell collapsing>
                  <Button
                    href={"#/menus/view/" + meal.id}
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
                    onClick={() => removeForeman(meal.id)}
                  ></Button>

                  {/* <Confirm
                          open={open}
                          header="Dėmesio!"
                          content="Ar tikrai norite ištrinti?"
                          cancelButton="Grįžti atgal"
                          confirmButton="Taip"
                          onCancel={() => setOpen(false)}
                          onConfirm={() => removeMenu(open)}
                          size="small"
                        /> */}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Segment>
      <Button as={NavLink} exact to='/menus/list'>Atgal</Button>
    </div>
  );
}
