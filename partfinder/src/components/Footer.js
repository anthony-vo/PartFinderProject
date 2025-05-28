import React from "react";
import { Container } from "react-bootstrap";

export default function Footer() {
  return (
    <footer className="bg-dark text-white py-3 mt-auto">
      <Container className="text-center">
        © {new Date().getFullYear()} PartFinder, Inc.
      </Container>
    </footer>
  );
}
