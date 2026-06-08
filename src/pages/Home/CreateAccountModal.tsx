import React, { useState } from "react";
import type { RegisterDTO } from "../../contracts/Account/RegisterDTO";

interface Props {
    onClose: () => void;
    onCreateGroup: (account: RegisterDTO) => void | Promise<void>;
}

export const CreateAccountModal: React.FC<Props> = ({
    onClose,
    onCreateGroup,
}) => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleCreate = async () => {
        if (username.trim() === "") return;
        if (email.trim() === "") return;
        if (password.trim() === "") return;

        await onCreateGroup({
            username,
            email,
            password,
        });

        onClose(); // close after creating
    };

    return (
        <div className="overlay">
            <div className="modal-box create-account-modal">
                <div className="modal-header-row">
                    <h2 className="modal-title">Create Account</h2>
                </div>

                <input
                    type="text"
                    placeholder="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    autoFocus
                    required
                />

                <input
                    type="email"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <div className="modal-actions">
                    <button onClick={handleCreate}>Create account</button>

                    <button onClick={onClose}>Ga terug</button>
                </div>
            </div>
        </div>
    );
};;;
