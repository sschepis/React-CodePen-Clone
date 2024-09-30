import React from 'react';

const PenCard = ({ title, description, onClick }) => (
  <div className="bg-white shadow-md rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow duration-300" onClick={onClick}>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const MyPens = ({ pens, onPenClick, onCreateNewPen, onLogout }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">My Pens</h2>
        <div>
          <button
            onClick={onCreateNewPen}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mr-2"
          >
            Create New Pen
          </button>
          <button
            onClick={onLogout}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          >
            Logout
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pens.map((pen) => (
          <PenCard
            key={pen.id}
            title={pen.title}
            description={pen.description}
            onClick={() => onPenClick(pen.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default MyPens;