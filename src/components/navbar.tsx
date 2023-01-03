import { useEffect } from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import logout from "../functions/logout";

function NavStrip() {
    useEffect(() => {

        const path: string = window.location.href;
        const locArray: Array<string> = path.split('/');
        const loc=locArray[locArray.length - 1];
        console.log(locArray[locArray.length - 1]);

        if (!window.sessionStorage.getItem('email') && loc !== 'login') {
            window.location.href='/login';

        }
    })
    return (
        <Navbar expand="lg" className="second-color" id="mainNav">
            <Container>
                <Navbar.Brand href="/">Lock Hood</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    {window.sessionStorage.getItem('email') ?
                        <Nav className="me-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/kanban">Kanban Board</Nav.Link>
                            <Nav.Link href="/salesReport">Sales Report</Nav.Link>
                            <Nav.Link href="/orderRequests">Order Requests</Nav.Link>
                            <Nav.Link href="/employees/add">Add employees</Nav.Link>

                        </Nav> : ""}
                    <Nav>
                        {window.sessionStorage.getItem('email') ?
                            <NavDropdown title={`${window.sessionStorage.getItem('email')}`} id="basic-nav-dropdown">
                                <NavDropdown.Item onClick={() => { logout(); window.location.reload(); }}>Logout</NavDropdown.Item>

                            </NavDropdown> : <Nav.Link href="/login">Login</Nav.Link>}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavStrip;