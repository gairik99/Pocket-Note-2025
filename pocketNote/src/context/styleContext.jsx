import { createContext, useState, useContext } from "react";

const StyleContext = createContext();

const StyleProvider = ({ children }) => {
  const [style, setStyle] = useState(false);
  return (
    <StyleContext.Provider value={{ style, setStyle }}>
      {children}
    </StyleContext.Provider>
  );
};

const useStyle = () => useContext(StyleContext);

export { StyleProvider, useStyle };
