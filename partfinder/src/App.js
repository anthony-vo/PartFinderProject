import React, { useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FilterProvider, Context } from "./Context";
import Dropdown from "./components/Dropdown";
import PartList from "./components/PartList";

function CascadingFilter() {
  const { state, dispatch } = useContext(Context);
  return (
    <Row className="g-3">
      <Col xs={12} md={4}>
        <Dropdown
          label="Make"
          options={state.makes}
          value={state.make}
          onChange={(value) =>
            dispatch({ type: "UPDATE_FILTER", field: "make", value })
          }
          loading={state.loading.makes}
        />
      </Col>
      <Col xs={12} md={4}>
        <Dropdown
          label="Model"
          options={state.models}
          value={state.model}
          onChange={(value) =>
            dispatch({ type: "UPDATE_FILTER", field: "model", value })
          }
          loading={state.loading.models}
        />
      </Col>
      <Col xs={12} md={4}>
        <Dropdown
          label="Type"
          options={state.types}
          value={state.type}
          onChange={(value) =>
            dispatch({ type: "UPDATE_FILTER", field: "type", value })
          }
          loading={state.loading.types}
        />
      </Col>
    </Row>
  );
}

function App() {
  return (
    <FilterProvider>
      <Container fluid className="p-4">
        <h1 className="mb-4">Part Finder</h1>
        <CascadingFilter />
        <hr />
        <PartList />
      </Container>
    </FilterProvider>
  );
}

export default App;
