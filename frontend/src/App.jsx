import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx";
import LandingPage from "./components/LandingPage.jsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/landing-page" element={<LandingPage />} />
            </Routes>
        </Router>
    );
}

export default App;
