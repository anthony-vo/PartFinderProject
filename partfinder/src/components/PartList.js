import React from "react";
import { ListGroup, Spinner } from "react-bootstrap";
import { Context } from "../Context";

export default function PartList() {
  const { state } = React.useContext(Context);

  let error = "";

  if (state.loading.parts) {
    return <Spinner animation="border" />;
  }
  if (!state.make) {
    error = "Please select the make.";
  } else if (!state.model) {
    error = "Please select the model.";
  } else if (!state.type) {
    error = "Please select the type.";
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
