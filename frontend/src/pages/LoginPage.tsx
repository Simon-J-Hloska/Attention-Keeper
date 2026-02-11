import {useState} from "react";

const LoginPage = () => {
    const [name, setName] = useState("");

    const handleLogin = () => {
        if (!name) return;
        localStorage.setItem("user_name", name);
        window.location.href = "/videos";
    };

    return (
        <div>
            <h1>Přihlášení</h1>
            <input
                placeholder="Zadej jméno"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <button onClick={handleLogin}>Pokračovat</button>
        </div>
    );
};
