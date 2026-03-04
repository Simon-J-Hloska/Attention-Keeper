import { useState } from "react";
import {useApi} from "../api/useApi.ts";


const LoginPage = () => {
    const api = useApi();
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async () => {
        if (!name) return;

        setLoading(true);
        setError("");

        try {
            await api.post("/user/login", { user_name: name });
            localStorage.setItem("user_name", name);
            window.location.href = "/videos";
        } catch (err) {
            console.error("Login failed:", err);
            setError("Nepodařilo se přihlásit, zkuste to znovu.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Přihlášení</h1>
            <input
                placeholder="Zadej jméno"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            {error && <p>{error}</p>}
            <button onClick={handleLogin} disabled={loading}>
                {loading ? "Probíhá přihlášení..." : "Pokračovat"}
            </button>
        </div>
    );
};

export default LoginPage;