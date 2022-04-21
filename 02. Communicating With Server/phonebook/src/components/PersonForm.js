import React from "react";

const PersonForm = (props) => {
    return (
        <form onSubmit={props.submitHandler}>
            <div>
                <div>Name: <input value={props.newNameVal} onChange={props.nameChangeHandler} /></div>
                <div>Number: <input value={props.newNumVal} onChange={props.numChangeHandler} /></div>
            </div>
            <div>
                <button type="submit">Add</button>
            </div>
        </form>
    );
};

export default PersonForm;