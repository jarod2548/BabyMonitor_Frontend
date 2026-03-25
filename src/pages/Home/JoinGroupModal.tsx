import React from "react";
import type { Group } from "../../contracts/Group";

interface Props {
  groepen: Group[];
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
              key={g.groepId} 
              onClick={() => onSelectGroup(g.groepId)}
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