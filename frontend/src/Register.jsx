import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

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
                    name,
                    email,
                    password,
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
        <div>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <button onClick={handleRegister}>Register</button>
        </div>
    );
}

