import React, { createContext, useState } from "react";

type TapContextValue = {
  tapItem: number;
  setTapItem: React.Dispatch<React.SetStateAction<number>>;
};

export const TapContext = createContext<TapContextValue>({
  tapItem: 0,
  setTapItem: () => {},
});

export const TapProvider = ({ children }: { children: React.ReactNode }) => {
  const [tapItem, setTapItem] = useState<number>(0);

  return (
    <TapContext.Provider value={{ tapItem, setTapItem }}>
      {children}
    </TapContext.Provider>
  );
};
