import React, { useRef } from 'react';

const CollaborationPane = ({ inviteCollaborator, collaborators }) => {
  const emailInputRef = useRef(null);

  const handleInvite = () => {
    if (emailInputRef.current) {
      inviteCollaborator(emailInputRef.current.value);
      emailInputRef.current.value = '';
    }
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <div className="mb-4 flex">
        <input
          type="email"
          placeholder="Collaborator's email"
          ref={emailInputRef}
          className="flex-grow mr-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleInvite}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Invite Collaborator
        </button>
      </div>
      <div className="collaborators-list">
        <h3 className="text-lg font-semibold mb-2">Current Collaborators:</h3>
        <ul className="list-disc pl-5">
          {collaborators.map((collaborator, index) => (
            <li key={index} className="mb-1">{collaborator}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CollaborationPane;