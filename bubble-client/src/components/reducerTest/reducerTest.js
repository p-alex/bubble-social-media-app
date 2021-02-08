import React, { useState, useReducer, useContext, createContext } from "react";
import Todo from "./Todo";

export const ListContext = createContext();
export const ACTIONS = {
  ADD_TODO: "addTodo",
  DELETE_TODO: "deleteTodo",
  COMPLETE_TODO: "completeTodo",
};

function reducer(todos, action) {
  switch (action.type) {
    case ACTIONS.ADD_TODO:
      return [
        ...todos,
        { name: action.payload.name, id: Date.now(), complete: false },
      ];
    case ACTIONS.DELETE_TODO:
      return todos.filter((todo) => todo.id !== action.payload.id);
    case ACTIONS.COMPLETE_TODO:
      return todos.map((todo) => {
        if (todo.id === action.payload.id) {
          return { ...todo, complete: !todo.complete };
        }
        return todo;
      });
    default:
      return todos;
  }
}

const ReducerTest = (props) => {
  const [todos, dispatch] = useReducer(reducer, []);
  const [name, setName] = useState("");
  function handleSubmit(e, name) {
    e.preventDefault();
    dispatch({ type: ACTIONS.ADD_TODO, payload: { name: name } });
    setName("");
  }
  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e, name)}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </form>
      {todos.map((todo) => {
        return (
          <>
            <ListContext.Provider value={{ name: "alex" }}>
              <Todo
                text={todo.name}
                dispatch={dispatch}
                id={todo.id}
                complete={todo.complete}
              />
            </ListContext.Provider>
          </>
        );
      })}
    </div>
  );
};

export default ReducerTest;
