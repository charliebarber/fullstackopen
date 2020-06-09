import React from "react";

const Numbers = ({ numbers }) => {
  return (
    <div>
      <h2>Numbers</h2>
      <div>
        {numbers.map((number) => (
          <Number key={number.name} details={number} />
        ))}
      </div>
    </div>
  );
};

const Number = ({ details }) => {
  return (
    <p>
      {details.name} : {details.number}
    </p>
  );
};

export default Numbers;