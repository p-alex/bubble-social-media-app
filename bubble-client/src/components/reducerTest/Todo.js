import React, { useContext } from "react";
import { ListContext } from "../reducerTest/reducerTest";
import { ACTIONS } from "./reducerTest";
export default function Todo(props) {
  const listContext = useContext(ListContext);
  return (
    <div>
      <p>{listContext.name}</p>
      <p style={props.complete ? { color: "silver" } : { color: "black" }}>
        {props.text}
      </p>
      <button
        onClick={() =>
          props.dispatch({
            type: ACTIONS.DELETE_TODO,
            payload: { id: props.id },
          })
        }
      >
        Delete
      </button>
      <button
        onClick={() =>
          props.dispatch({
            type: ACTIONS.COMPLETE_TODO,
            payload: { id: props.id },
          })
        }
      >
        Complete
      </button>
    </div>
  );
}
