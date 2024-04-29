import React, { useState, useEffect, useContext } from "react";

// AuthContext tworzy nowy context object z domyslna wartoscia null
const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

// Provider is a component that wraps our application and
// provides context to all of its children
export function AuthProvider(props) {
  const [authUser, setAuthUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const value = {
    authUser,
    setAuthUser,
    isLoggedIn,
    setIsLoggedIn,
  };
  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
}
