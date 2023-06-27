import { useState, useEffect } from "react";
import { Button, Form, Card, Grid, Table, Modal, Input, Segment, Divider, Icon } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import '../index.css';

export function ForemenList() {
  const params = useParams();
  const [meals, setMeals] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [open, setOpen] = useState(false);
  const [cartOrderMealQuantity, setOrderMealQuantity] = useState(0);
  const [cartQuantityError, setCartQuantityError] = ('');
  const [formValid, setFormValid] = useState(false)
  const [order, setOrder] = useState([]);
  const [orderId, setOrderId] = useState('');
  const [mealId, setMealId] = useState('');
  const [cartQuantity, setCartQuantity] = useState('');
  const [foremen, setForemen] = useState([]);


  useEffect(() => {
    fetch(`/api/v1/foremen`)
      .then((response) => response.json())
      .then(setForemen);
  }, []);

//   const toRate = () => {
//     fetch(`api/v1/orders/addMealInOrder/${orderId}/${orderQuantity}`, {
//     method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         mealId,
//         title,
//         description,
//         quantity
//       }),
//     }).then(applyResult);
//   };

  const applyResult = (result) => {
    if (result.ok) {
    //   clear();
    } else {
      window.alert("Nepavyko sukurt: " + result.status);
    }
  };


  return (
    <div>   
      <Segment id="segment" color="pink">  
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
                <Table.Cell>
                <Button
                          as={NavLink}
                          exact
                          to={"/menus/list/view/" + meal.id}
                          basic
                          compact
                          icon="eye"
                          title="Peržiūrėti"
                        ></Button></Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Segment>
      {/* <Button as={NavLink} exact to='/menuList'>Atgal</Button>       */}
    </div>
  );
}
