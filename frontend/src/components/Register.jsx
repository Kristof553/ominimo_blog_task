import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {
    Button,
    Col,
    Container,
    Form,
    FormGroup,
    Input,
    Label,
    Nav,
    Navbar,
    NavbarBrand,
    NavLink,
    Row
} from "reactstrap";

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("admin");

    const token = Cookies.get("XSRF-TOKEN");

    const handleRegister = async () => {
        try {
            await axios.get("http://localhost:8000/sanctum/csrf-cookie", {
                withCredentials: true,
            });

            const res = await axios.post(
                "http://localhost:8000/register",
                {
                    name: name,
                    email: email,
                    password: password,
                    password_confirmation: password,
                },
                {
                    withCredentials: true,
                    headers: {
                        "X-XSRF-TOKEN": token,
                    },
                }
            );

            console.log("Registered");
        } catch (err) {
            console.error("Error", err.response?.data || err.message);
        }
    };

    return (
        <Container>
            <Navbar className="bg-dark-subtle sticky-top" expand="md">
                <NavbarBrand href="/landing-page">
                    Ominimo Blog
                </NavbarBrand>
            </Navbar>
            <Form className="mt-2">
                <Row>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="email">
                                Email
                            </Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="password">
                                Jelszó
                            </Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <FormGroup>
                    <Label for="name">
                        Név
                    </Label>
                    <Input
                        id="name"
                        name="name"
                        onChange={(e) => setName(e.target.value)}
                    />
                </FormGroup>
                <Button
                    onClick={handleRegister}
                    color="primary"
                >
                    Regisztráció
                </Button>
            </Form>
        </Container>
    );
}

