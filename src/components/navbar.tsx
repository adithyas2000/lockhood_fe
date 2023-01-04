import { useEffect } from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import logout from "../functions/logout";

function NavStrip() {
    useEffect(() => {

        const path: string = window.location.href;
        const locArray: Array<string> = path.split('/');
        const loc = locArray[locArray.length - 1];
        console.log(locArray[locArray.length - 1]);

        if (!window.sessionStorage.getItem('email') && loc !== 'login') {
            window.location.href = '/login';

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

                            {/* Employees */}
                            <NavDropdown title="Employees" id="basic-nav-dropdown">
                                <NavDropdown.Item href="/employees/add">Add employees</NavDropdown.Item>
                                <NavDropdown.Item href="/employees/view">View employees</NavDropdown.Item>
                            </NavDropdown>

                            {/* Jobs */}
                            <NavDropdown title="Jobs" id="basic-nav-dropdown">

                                <NavDropdown.Item href="/job/kanban">Kanban Board</NavDropdown.Item>
                                <NavDropdown.Item href="/salesReport">Sales Report</NavDropdown.Item>
                                <NavDropdown.Item href="/orderRequests">Order Requests</NavDropdown.Item>
                            </NavDropdown>

                            {/* Inventory */}
                            <NavDropdown title="Inventory" id="basic-nav-dropdown">
                                <NavDropdown.Item href="/inventory/create">Create Inventory</NavDropdown.Item>
                                <NavDropdown.Item href="/inventory/view">View Inventory</NavDropdown.Item>
                            </NavDropdown>

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