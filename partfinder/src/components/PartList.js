import React from "react";
import { ListGroup, Spinner } from "react-bootstrap";
import { Context } from "../Context";

export default function PartList() {
  const { state } = React.useContext(Context);

  if (state.loading.parts) {
    return <Spinner animation="border" />;
  }
  if (!state.parts.length) {
    return <p>No parts found. Complete all filters above.</p>;
  }

  return (
    <ListGroup>
      {state.parts.map((p) => (
        <ListGroup.Item key={p}>{p}</ListGroup.Item>
      ))}
    </ListGroup>
  );
}
