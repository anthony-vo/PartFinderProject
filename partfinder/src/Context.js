import React, { createContext, useReducer, useEffect } from "react";
import * as api from "./api/Wrappers";

const initialState = {
  make: "",
  model: "",
  type: "",
  makes: [],
  models: [],
  types: [],
  parts: [],
  loading: { makes: false, models: false, types: false, parts: false },
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_LOAD":
      return {
        ...state,
        loading: { ...state.loading, [action.key]: action.value },
      };
    case "SET_DATA":
      return { ...state, [action.key]: action.payload };
    case "UPDATE_FILTER":
      // When the user picks a new make/model/type, update that
      // and clear any downstream selections & lists.
      return {
        ...state,
        [action.field]: action.value,
        // If they changed "make", wipe model, type, and those lists:
        ...(action.field === "make"
          ? { model: "", type: "", models: [], types: [], parts: [] }
          : // If they only changed "model", wipe type & parts:
          action.field === "model"
          ? { type: "", types: [], parts: [] }
          : {}),
      };
    default:
      return state;
  }
}

export const Context = createContext();

export function FilterProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Load makes
  useEffect(() => {
    dispatch({ type: "SET_LOAD", key: "makes", value: true });
    api
      .fetchMakes()
      .then((data) =>
        dispatch({ type: "SET_DATA", key: "makes", payload: data })
      )
      .finally(() =>
        dispatch({ type: "SET_LOAD", key: "makes", value: false })
      );
  }, []);

  // Load models when make changes
  useEffect(() => {
    if (!state.make) return;
    dispatch({ type: "SET_LOAD", key: "models", value: true });
    api
      .fetchModels(state.make)
      .then((data) =>
        dispatch({ type: "SET_DATA", key: "models", payload: data })
      )
      .finally(() =>
        dispatch({ type: "SET_LOAD", key: "models", value: false })
      );
  }, [state.make]);

  // Load types when model changes
  useEffect(() => {
    if (!state.model) return;
    dispatch({ type: "SET_LOAD", key: "types", value: true });
    api
      .fetchTypes(state.make, state.model)
      .then((data) =>
        dispatch({ type: "SET_DATA", key: "types", payload: data })
      )
      .finally(() =>
        dispatch({ type: "SET_LOAD", key: "types", value: false })
      );
  }, [state.model]);

  // Load parts when type changes
  useEffect(() => {
    if (!state.type) return;
    dispatch({ type: "SET_LOAD", key: "parts", value: true });
    api
      .fetchParts(state.make, state.model, state.type)
      .then((data) =>
        dispatch({ type: "SET_DATA", key: "parts", payload: data })
      )
      .finally(() =>
        dispatch({ type: "SET_LOAD", key: "parts", value: false })
      );
  }, [state.type]);

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
}
