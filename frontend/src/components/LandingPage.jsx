import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function LandingPage(){
    const navigate = useNavigate();
    const token = Cookies.get("XSRF-TOKEN");

    const handleLogout = async () => {
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
        <div>
            <h1>Welcome to the Dashboard!</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}