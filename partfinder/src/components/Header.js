import React from "react";
import { Navbar, Nav, Carousel, Container } from "react-bootstrap";

// Array of your own carousel image URLs (put images in public/images/)
const carouselImages = [
  "/Media/slide1.jpg",
  "/Media/slide2.jpg",
  "/Media/slide3.jpg",
  "/Media/slide4.jpg",
  "/Media/slide5.jpg",
];

export default function Header() {
  return (
    <header>
      <Navbar variant="dark" expand="lg" className="header-navbar">
        <Container>
          <Navbar.Brand href="#">PartFinder</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#">Home</Nav.Link>
              <Nav.Link href="#">Products</Nav.Link>
              <Nav.Link href="#">Contact</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container fluid className="p-0">
        <Carousel variant="dark" className="header-carousel">
          {carouselImages.map((src, idx) => (
            <Carousel.Item key={idx}>
              <img className="d-block" src={src} alt={`Slide ${idx + 1}`} />
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>
    </header>
  );
}
