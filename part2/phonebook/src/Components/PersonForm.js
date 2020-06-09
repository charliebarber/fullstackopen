import React from 'react'

const PersonForm = (props) => {


  return (
    <form>
      <div>
        name: <input onChange={props.onNameChange} value={props.name} />
      </div>
      <div>
        number: <input onChange={props.onNumChange} value={props.num} />
      </div>
      <div>
        <button onClick={props.onSubmit} type="submit">
          add
        </button>
      </div>
    </form>
  );
};

export default PersonForm;
