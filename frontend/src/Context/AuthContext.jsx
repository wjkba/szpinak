import React, { useState, useContext } from "react";
import PropTypes from "prop-types";

// AuthContext tworzy nowy context object z domyslna wartoscia null
const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

// Provider is a component that wraps our application and
// provides context to all of its children
export function AuthProvider({ children }) {
  const [authUser, setAuthUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const value = {
    authUser,
    setAuthUser,
    isLoggedIn,
    setIsLoggedIn,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
