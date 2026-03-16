import { useState, useEffect } from "react";
import { useApi } from "../api/useApi.ts";

const LoginPage = () => {
    const api = useApi();

    const [name, setName] = useState("");
    const [storedUser, setStoredUser] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const existingUser = localStorage.getItem("user_name");
        if (existingUser) {
            setStoredUser(existingUser);
        }
    }, []);

    const handleLogin = async () => {
        if (!name.trim()) return;

        setLoading(true);
        setError("");

        try {
            await api.post("/user/login", { user_name: name });

            localStorage.setItem("user_name", name);
            setStoredUser(name);
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

            {storedUser ? (
                <div>
                    <p>Jste přihlášen jako: <strong>{storedUser}</strong></p>
                </div>
            ) : (
                <>
                    <input
                        placeholder="Zadej jméno"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    {error && <p style={{ color: "red" }}>{error}</p>}

                    <button onClick={handleLogin} disabled={loading}>
                        {loading ? "Probíhá přihlášení..." : "Pokračovat"}
                    </button>
                </>
            )}
        </div>
    );
};

export default LoginPage;