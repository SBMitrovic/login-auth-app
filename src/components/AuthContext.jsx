import React, { createContext, useContext, useEffect, useState } from 'react';

// Simulate API
function fakeLogin(email, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === 'admin@example.com' && password === 'admin') {
        localStorage.setItem('token', 'fake-jwt-token');
        resolve({ email, role: 'admin' });
      } else {
        reject('Invalid credentials');
      }
    }, 500);
  });
}

function fakeGetMe() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const token = localStorage.getItem('token');
      if (token) {
        resolve({ email: 'admin@example.com', role: 'admin' });
      } else {
        reject('Unauthorized');
      }
    }, 300);
  });
}

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    const userData = await fakeLogin(email, password);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  useEffect(() => {
    fakeGetMe()
      .then(userData => setUser(userData))
      .catch(() => setUser(null));
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

