import { useEffect, useState } from "react";
import {
  Button,
  Segment,
  Grid,
  Table,
  Rating,
  Input,
  TableBody,
} from "semantic-ui-react";
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
  const [titleError, setTitleError] = useState("");
  const [titles, setTitles] = useState([]);
  const [formValid, setFormValid] = useState(false);
  const [error, setError] = useState();
  const navigate = useNavigate();
  const [carService, setCarService] = useState("");
  const [manager, setManager] = useState("");
  const [address, setAddress] = useState("");
  const [foreman, setForeman] = useState("");
  const [ratingState, setRatingState] = useState('');

  const params = useParams();

  useEffect(() => {
    fetch("/api/v1/foremen/" + params.id)
      .then((response) => response.json())
      .then(setForeman);
  }, [params.id]);

  useEffect(() => {
    fetch("/api/v1/carServices/foreman/" + params.id)
      .then((response) => response.json())
      .then(setCarService);
  }, [params.id]);

 
    const handleRate = (e, { rating, maxRating }) => {
      setRatingState({ rating, maxRating });
    };


  return (
    <div>
      <Segment id="segment" color="teal">
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Vardas</Table.HeaderCell>
              <Table.HeaderCell>Pavardė</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>{foreman.name}</Table.Cell>
              <Table.Cell>{foreman.surname}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Specializacija</Table.HeaderCell>
              <Table.HeaderCell>Miestas</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>{foreman.specialization}</Table.Cell>
              <Table.Cell>{foreman.city}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Reitingas</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <TableBody>
            <Table.Cell>{foreman.rating}</Table.Cell>
          </TableBody>
        </Table>
        <Table>
          <Table.Header>
            <Table.Row>
                <Table.HeaderCell>Įvertinti meistrą</Table.HeaderCell> 
 
    <div>
      <Rating maxRating={10} onRate={handleRate} />
      {/* <pre>{JSON.stringify(ratingState, null, 2)}</pre> */}
   </div>
         </Table.Row>
          </Table.Header>
        </Table>
      </Segment>
    </div>
  );
}
