import { createContext, useContext, useState } from "react";

const AIRulesContext = createContext();

export const AIRulesProvider = ({ children }) => {
  const [aiRules, setAiRules] = useState({});

  return (
    <AIRulesContext.Provider value={{ aiRules, setAiRules }}>
      {children}
    </AIRulesContext.Provider>
  );
};

export const useAIRules = () => useContext(AIRulesContext);

