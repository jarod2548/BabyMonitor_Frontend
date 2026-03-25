import React, { useState } from "react";

interface Props {
  onClose: () => void;
  onCreateGroup: (groepNaam : string) => void;
}

export const CreateGroupModal: React.FC<Props> = ({ onClose, onCreateGroup }) => {
    const [groepNaam, setGroepNaam] = useState(""); // track input value

    const handleCreate = () => {
        if (groepNaam.trim() === "") return; // simple validation
        onCreateGroup(groepNaam); // pass input to parent
    };
    
  return (
    <div className="overlay">
      <div className="modal-box">
        <h1>Voer een groeps naam in</h1>
        <input type="text" placeholder="groepnaam" value={groepNaam}
          onChange={e => setGroepNaam(e.target.value)} autoFocus required />
        <button onClick={handleCreate}>Start als leraar</button>
        <button onClick={onClose}>Ga terug</button>
      </div>
    </div>
  );
};