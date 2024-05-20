/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const textContext = createContext();

export default function TextContextProvider(props) {
  const [texts, setTexts] = useState([]);

  return (
    <textContext.Provider value={{ texts, setTexts }}>
      {props.children}
    </textContext.Provider>
  );
}

