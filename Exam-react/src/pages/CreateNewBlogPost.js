import { useEffect, useState } from "react";
import { useHref, NavLink, useNavigate } from "react-router-dom";
import { Button, Form, Card, Grid, Input,  Segment, Divider} from 'semantic-ui-react';

export function CreateNewBlogPost() {
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState("");
  const [titles, setTitles] = useState([]);
  const [formValid, setFormValid] = useState(false)
  const [manager, setManager] = useState('');
  const [address, setAddress] = useState('');
  const navigate = useNavigate();


  const listUrl = useHref("/");

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

  const clear = () => {
    setTitle("");
    setAddress("");
    setManager("");
  };

  const applyResult = (result) => {
    if (result.ok) {
      clear();
      navigate('/menus/list');
    } else {
      window.alert("Nepavyko sukurt: " + result.status);
    }
  };

  const createCarServise = () => {
    fetch("/api/v1/carServices", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        address,
        manager
      }),
    }).then(applyResult);
  };

  return (
    <Grid centered columns={3}>
    <Grid.Column centered>
      <h2>Pridėti servisą</h2>
    <Segment inverted color='grey'>
          <Form inverted  color='grey'>
          {titleError && <div style={{ color: "red" }}>{titleError}</div>}
             
              <Form.Field>
                <label>Serviso pavadinimas</label>
              </Form.Field>
              <Form.Field>
              <Input 
              class="ui fluid input"           
                type="text"
                id="title"
                value={title}
                onChange={(e) => titleHandler(e)}
              />              
              </Form.Field>

              <Form.Field>
                <label>Adresas</label>
              </Form.Field>

              <Form.Field>
              <Input 
              class="ui fluid input"           
                type="text"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />              
              </Form.Field>
              
              <Form.Field>
                <label>Vadovas</label>
              </Form.Field>

              <Form.Field>
              <Input 
              class="ui fluid input"           
                type="text"
                id="manager"
                value={manager}
                onChange={(e) => setManager(e.target.value)}
              />              
              </Form.Field>

              <Divider hidden/>
            
            {/* <Form.Group className="mb-3">
            <Form.Field>
              <label>Tekstas</label>
              <input
                as="textarea"
                rows={3}
                id="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              </Form.Field>
            </Form.Group> */}
            <Button color='teal' disabled={titleError} onClick={createCarServise}>
              Paskelbti
            </Button>
            <Button  as={NavLink} exact to='/menus/list'>
              Atšaukti 
            </Button>
          </Form>
          </Segment>
  </Grid.Column>   
  </Grid>
  );
}
