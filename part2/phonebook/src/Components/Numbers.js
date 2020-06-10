import React from "react";

const Numbers = ({ numbers, handleDeleteOf }) => {
  return (
    <div>
      <h2>Numbers</h2>
      <div>
        {numbers.map((number) => (
          <Number key={number.id} details={number} handleDelete={() => handleDeleteOf(number)}/>
        ))}
      </div>
    </div>
  );
};

const Number = ({ details, handleDelete }) => {
  return (
    <div>
      {details.name} : {details.number} <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default Numbers;