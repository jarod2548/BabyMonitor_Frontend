import React from "react";
import type { GroupResponse } from "../../contracts/GroupResponse";

interface Props {
  groepen: GroupResponse[];
  onSelectGroup: (groepId: string) => void;
  onClose: () => void;
}

export const JoinGroupModal: React.FC<Props> = ({ groepen, onSelectGroup, onClose }) => {
  return (
    <div className="overlay">
      <div className="modal-box">
        <h1>Doe mee met een groep</h1>
        <div className="group-list">
          {groepen.map(g => (
            <button 
              key={g.id} 
              onClick={() => onSelectGroup(g.id)}
            >
              {g.naam}
            </button>
          ))}
        </div>
        <button onClick={onClose}>Ga terug</button>
      </div>
    </div>
  );
};