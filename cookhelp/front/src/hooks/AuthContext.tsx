import React, { createContext, useEffect, useState } from "react";

type AuthContextValue = {
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AuthContext = createContext<AuthContextValue>({
  isLogin: false,
  setIsLogin: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLogin, setIsLogin] = useState<boolean>(
    localStorage.getItem("isLogin") === "True"
  );

  const storageLogin = localStorage.getItem("isLogin");
  // console.log("storageLogin : ", storageLogin);

  useEffect(() => {
    // const storageLogin = localStorage.getItem("isLogin");
    // console.log(storageLogin);
    // console.log(isLogin);
    if (storageLogin === "True") {
      setIsLogin(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isLogin, setIsLogin }}>
      {children}
    </AuthContext.Provider>
  );
};
