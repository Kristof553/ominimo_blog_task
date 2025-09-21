import {Container, Nav, Navbar, NavbarBrand, NavItem, NavLink} from "reactstrap";
import PostContainer from "./PostContainer.jsx";
import {useNavigate} from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import {useState} from "react";
import NewPostModal from "./NewPostModal.jsx";

export default function LandingPage(){

    const [toggleNewPostModal, setToggleNewPostModal] = useState(false)

    const navigate = useNavigate();
    const token = Cookies.get("XSRF-TOKEN");

    const toggle = () => {
        setToggleNewPostModal(!toggleNewPostModal)
    }
    const handleLogout = async (e) => {
        e.preventDefault()
        try {
            await axios.post(
                "http://localhost:8000/logout",
                {},
                {
                    withCredentials: true,
                    headers: {
                        "X-XSRF-TOKEN": token,
                    },
                }
            );
            console.log("Logged out");
            navigate("/login");
        } catch (err) {
            console.error("Logout error:", err.response?.data || err.message);
        }
    };

    return (
        <Container>
            <Navbar className="bg-dark-subtle sticky-top" expand="md">
                <NavbarBrand href="/landing-page">
                    Ominimo Blog
                </NavbarBrand>
                <Nav className="ml-auto" navbar>
                    <NavLink  href="/register">
                        Új felhasználó
                    </NavLink>
                    <NavLink onClick={toggle} href="#">
                        Új Bejegyzés
                    </NavLink>
                    <NavLink onClick={handleLogout} href="#">
                        Kijelentkezés
                    </NavLink>
                </Nav>
            </Navbar>
            <PostContainer/>
            <NewPostModal
                toggleNewPostModal={toggleNewPostModal}
                toggle={toggle}
            />
        </Container>
    );
}