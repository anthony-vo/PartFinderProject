import React, { useContext, useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  CardBody,
  CardFooter,
  Card,
  Button,
} from "react-bootstrap";
import { FilterProvider, Context } from "./Context";
import Dropdown from "./components/Dropdown";
import PartList from "./components/PartList";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { FaSearch } from "react-icons/fa";

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

function SearchContent() {
  const { state } = useContext(Context);
  const [results, setShowResults] = useState(false);

  useEffect(() => {
    setShowResults(false);
  }, [state.make, state.model, state.type]);

  return (
    <Card className="search-panel bg-light rounded shadow-sm mb-4">
      <CardBody>
        <CascadingFilter />
        {results && (
          <div className="part-list mt-4">
            <PartList />
          </div>
        )}
      </CardBody>

      <CardFooter className="d-flex justify-content-end bg-white">
        <Button className="btn-custom" onClick={() => setShowResults(true)}>
          <FaSearch width={20} height={20} className="me-2" />
          Search
        </Button>
      </CardFooter>
    </Card>
  );
}

function App() {
  return (
    <div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
      <Header />
      <main className="flex-grow-1">
        <Container fluid className="text-center mb-4 display-5">
          <h1 className="page-title text-center mb-4 display-5">
            Your Trusted Car Parts Wholesaler
          </h1>
          <FilterProvider>
            <SearchContent />
          </FilterProvider>
        </Container>
      </main>
      <Footer />
    </div>
  );
}

export default App;
