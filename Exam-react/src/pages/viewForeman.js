import { useEffect, useState } from "react";
import { Button, Segment, Grid, Table, Input, TableBody } from "semantic-ui-react";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import { AdminMenu } from "../components/adminmenu";
import { MealsPart } from "../components/MealPart";

const JSON_HEADERS = {
    "Content-Type": "application/json",
  };

export function ViewForeman() {
  const [menu, setMenu] = useState({});
  const [updateTitle, setUpdateTitle] = useState(false);
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState('');
  const [titles, setTitles] = useState([]);
  const [formValid, setFormValid] = useState(false);
  const [error, setError] = useState();
  const navigate = useNavigate();
  const [carService, setCarService] =  useState('');
  const [manager, setManager] = useState('');
  const [address, setAddress] = useState('');

  const params = useParams();

  useEffect(() => {
    fetch("/api/v1/carServices/" + params.id)
      .then((response) => response.json())
      .then(setCarService);
  }, [params.id, updateTitle]);

  useEffect(() => {
    if (titleError) {
      setFormValid(false)
    } else {
      setFormValid(true)
    }
  }, [titleError])

  const titleHandler = (e) => {
    setTitle(e.target.value);
    if (e.target.value.length < 2 || e.target.value.length > 100) {
      setTitleError("Įveskite nuo 2 iki 100 simbolių!");
      document.getElementById("title").style.borderColor = "red";
      if (!e.target.value) {
        setTitleError("Negali būti tuščias!");
      }
    } else {
      setTitleError("");
      document.getElementById("title").style.borderColor = "#c7c5c5";
    }
    if (titles.includes(e.target.value)) {
      setTitleError("Servisas su šiuo pavadinimu jau sukurtas!");
    }
  };

  useEffect(() => {
    fetch("/api/v1/carServices")
      .then((response) => response.json())
      .then((jsonResponse) => {
        const allTitles = jsonResponse.map((res) => res.title);
        setTitles(allTitles);
      });
  }, []);

  const updateCarService = () => {
    fetch("/api/v1/carServices/update/" + params.id, {
      method: "PUT",
      headers: JSON_HEADERS,
      body: JSON.stringify({
        title,
        manager,
        address        
      }),
    })
      .then((result) => {
        if (!result.ok) {
          setError("Update failed");
        } else {
          setError();
        }
      })
      .then(setUpdateTitle(false))
      .then(setTitle(''));
  };

  const exitUpdate = () => {
    setUpdateTitle(false);
    setTitle('');
  }

  return (
    <div>
      <Grid columns={2}>
        <Grid.Column width={3} id="main">
          <AdminMenu active='menu' />
        </Grid.Column>
        <Grid.Column textAlign="left" verticalAlign="top" width={13}>
          <Segment id="segment" color="teal">
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Pavadinimas</Table.HeaderCell>
                  <Table.HeaderCell>Vadybininkas</Table.HeaderCell>
                </Table.Row>
                </Table.Header>
              <Table.Body>
                    <Table.Row>                   
                    {!updateTitle && ( 
                      <Table.Cell><Button
                          basic
                          compact
                          title="Redaguoti"
                          icon="pencil alternate"                          
                          onClick={() => setUpdateTitle(true)}                          
                        ></Button > {carService.title}</Table.Cell>)}
                       {updateTitle && (<Table.Cell>
                        {titleError && <div style={{ color: "red" }}>{titleError}</div>}
                        <Button
                          basic
                          compact
                          title="Patvirtinti"
                          icon="check"
                          onClick={updateCarService}                          
                        ></Button>
                        <Button
                          basic
                          compact
                          title="Atšaukti"
                          icon="x icon"
                          onClick={exitUpdate}                          
                        ></Button><Input type='text' placeholder={carService.title} id="title"
                        value={title}
                        onChange={(e) => titleHandler(e)}></Input></Table.Cell>)}
                      <Table.Cell>{carService.title}</Table.Cell>
                      </Table.Row>
                      </Table.Body>
                      </Table>
                      <Table>
                      <Table.Header>
                      <Table.Row>                        
                  <Table.HeaderCell>Adresas</Table.HeaderCell>
                  </Table.Row>
              </Table.Header>
              <TableBody>
                <Table.Cell>{carService.address}</Table.Cell>
              </TableBody>
            </Table>
          </Segment>
          <MealsPart />
        </Grid.Column>
      </Grid>
    </div>
  );
}
