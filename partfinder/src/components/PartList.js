import React, { useState, useEffect } from "react";
import { ListGroup, Spinner, Table } from "react-bootstrap";
import { Context } from "../Context";
import * as api from "../api/Wrappers";

export default function PartList() {
  const { state } = React.useContext(Context);

  const [modelTypes, setModelTypes] = useState([]);

  useEffect(() => {
    if (state.make && !state.model) {
      // for each model, fetch its types
      Promise.all(
        state.models.map((m) =>
          api.fetchTypes(state.make, m).then((types) => ({ model: m, types }))
        )
      ).then(setModelTypes);
    }
  }, [state.make, state.model, state.models]);
  let error = "";

  if (state.loading.parts) {
    return <Spinner animation="border" />;
  }
  if (!state.make) {
    return (
      <ListGroup>
        {state.makes.map((p) => (
          <ListGroup.Item key={p}>{p}</ListGroup.Item>
        ))}
      </ListGroup>
    );
  } else if (!state.model) {
    // error = "Please select the model.";
    return (
      // <ListGroup>
      //   {state.models.map((p) => (
      //     <ListGroup.Item key={p}>{p}</ListGroup.Item>
      //   ))}
      // </ListGroup>
      <Table striped bordered hover size="sm" className="mt-3">
        <thead>
          <tr>
            <th>Model</th>
            <th>Available Types</th>
          </tr>
        </thead>
        <tbody>
          {modelTypes.map(({ model, types }) => (
            <tr key={model}>
              <td>{model}</td>
              <td>{types.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  } else if (!state.type) {
    return (
      <ListGroup>
        {state.types.map((p) => (
          <ListGroup.Item key={p}>{p}</ListGroup.Item>
        ))}
      </ListGroup>
    );
  } else if (!state.parts.length) {
    error = "No parts found for the combination.";
  }

  if (error) {
    return <p className="text-center text-muted">{error}</p>;
  }

  return (
    <ListGroup>
      {state.parts.map((p) => (
        <ListGroup.Item key={p}>{p}</ListGroup.Item>
      ))}
    </ListGroup>
  );
}
