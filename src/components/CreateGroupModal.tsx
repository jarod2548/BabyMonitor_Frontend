import React, { useState } from "react";
import type { maakGroepRequest } from "../contracts/maakGroepRequest";

interface Props {
  onClose: () => void;
  onCreateGroup: (request: maakGroepRequest) => void;
}

export const CreateGroupModal: React.FC<Props> = ({
  onClose,
  onCreateGroup,
}) => {
  const [naam, setNaam] = useState<string>("");

  const handleCreate = () => {
    if (!naam.trim()) return;

    const request: maakGroepRequest = {
      naam,
    };

    onCreateGroup(request);
  };

  return (
    <div className="overlay">
      <div className="modal-box">
        <h1>Voer een groepsnaam in</h1>

        <input
          type="text"
          placeholder="Groepsnaam"
          value={naam}
          onChange={(e) => setNaam(e.target.value)}
          autoFocus
          required
        />

        <button onClick={handleCreate}>
          Start als leraar
        </button>

        <button onClick={onClose}>
          Ga terug
        </button>
      </div>
    </div>
  );
};