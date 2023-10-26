"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";

export default function NavBar(){

    const pathname = usePathname();
    

    return(
        <Navbar bg="primary" variant="dark" sticky="top" expand="md" collapseOnSelect>
            <Container>
                <Navbar.Brand as={Link} href="/">
                        NextJS 13.4 Image Gallery
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="main_navbar"/>
                <Navbar.Collapse id="main_navbar">
                    <Nav>
                        <Nav.Link as={Link} href="/hello" active={pathname==="/hello"}>Hello</Nav.Link>
                        <Nav.Link as={Link} href="/static" active={pathname==="/static"}>Static</Nav.Link>
                        <Nav.Link as={Link} href="/dynamic" active={pathname==="/dynamic"}>Dynamic</Nav.Link>
                        <Nav.Link as={Link} href="/isr" active={pathname==="/isr"}>ISR</Nav.Link>
                        <NavDropdown title="Topics" id="topics-dropdown">
                            <NavDropdown.Item as={Link} href="/topics/health" active={pathname==="/topics/health"}>Health</NavDropdown.Item>
                            <NavDropdown.Item as={Link} href="/topics/fitness" active={pathname==="/topics/fitness"}>Fitness</NavDropdown.Item>
                            <NavDropdown.Item as={Link} href="/topics/coding" active={pathname==="/topics/coding"}>Coding</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link as={Link} href="/seach" active={pathname==="/seach"}>Seach</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}