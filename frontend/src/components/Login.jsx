import { useState } from "react";
import {Form, FormGroup, Label, Input, Button, FormFeedback, Container, Row, Col} from 'reactstrap'
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isFailedLogin, setIsFailedLogin] = useState(false)
    const [isValidLogin, setIsValidLogin] = useState(false)
    const navigate = useNavigate();

    const token = Cookies.get("XSRF-TOKEN");

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            await axios.get("http://localhost:8000/sanctum/csrf-cookie", {
                withCredentials: true,
            });
            await axios.post("http://localhost:8000/login", {
                    email,
                    password,
                },
                {
                    withCredentials: true,
                    headers: {
                        "X-XSRF-TOKEN": token,
                    },
                }
            );
            setIsFailedLogin(false)
            setIsValidLogin(true)
            navigate("/landing-page")
        } catch (err) {
            console.error("Login error:", err.response?.data || err.message);
            handleError()
        }
    };

    const handleError = () => {
        setIsFailedLogin(true)
        setIsValidLogin(false)
    }

    return (
    <div>
        <Container>
            <Row>
                <Col md/>
                <Col md className="d-flex flex-column justify-content-center align-items-center mt-5">
                    <h4>Ominimo Blog</h4>
                </Col>
                <Col md/>
            </Row>
            <Row>
                <Col md/>
                <Col md className="mt-5">
                    <Form className="border rounded-3 p-3" onSubmit={handleLogin}>
                        <FormGroup>
                            <Label for="email">
                                Email-cím:
                            </Label>
                            <Input
                                type="text"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                invalid={isFailedLogin}
                                valid={isValidLogin}
                            />
                        </FormGroup>
                        <FormGroup id='passwordFormGroup'>
                            <Label for="password">
                                Jelszó:
                            </Label>
                            <Input
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                invalid={isFailedLogin}
                                valid={isValidLogin}
                            />
                        </FormGroup>
                        <Button
                            color="primary"
                            type='submit'
                        >
                            Bejelentkezés
                        </Button>
                    </Form>
                </Col>
                <Col md/>
            </Row>
        </Container>
    </div>
    );
}
