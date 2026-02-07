import { createContext, useContext, useEffect, useState } from "react";
import { User } from "../types/User";
import usersData from "../data/Users.json";
import { getFromStorage, saveToStorage } from "../utils/storage";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<void>;
}

interface UserJson {
  Id: number;
  Name: string;
  Email: string;
  Password: string;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Para efectos practicos, se realizan las validaciones de login/registro contra un JSON local.
// El backend real se encuentra en el repositorio del proyecto
// const API_URL = "http://localhost:5297/api/auth";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  // Cada que iniciamos la app vamos a verificar si hay un usuario autenticado
  useEffect(() => {
    const storedUser = localStorage.getItem("authUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Funciones propias del contexto de autenticación: login, register y logout
  const login = async (email: string, password: string) => {
    // BACKEND (deshabilitado)
    /*
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  */

    // MOCK LOCAL (JSON)
    const users = getFromStorage<UserJson[]>("users", usersData as UserJson[]);

    const foundUser = users.find(
      (u) => u.Email === email && u.Password === password,
    );

    if (!foundUser) {
      throw new Error("Credenciales inválidas");
    }

    const authUser: User = {
      id: foundUser.Id,
      name: foundUser.Name,
      email: foundUser.Email,
    };

    saveToStorage("authUser", authUser);
    setUser(authUser);
  };

  const register = async (name: string, email: string, password: string) => {
    // BACKEND (deshabilitado)
    /*
  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });
  */

    // MOCK
    const users = getFromStorage<UserJson[]>("users", usersData as UserJson[]);

    if (users.some((u) => u.Email === email)) {
      throw new Error("El correo ya está registrado");
    }

    const newUser: UserJson = {
      Id: Date.now(),
      Name: name,
      Email: email,
      Password: password,
    };

    const updatedUsers = [...users, newUser];
    saveToStorage("users", updatedUsers);

    const authUser: User = {
      id: newUser.Id,
      name: newUser.Name,
      email: newUser.Email,
    };

    saveToStorage("authUser", authUser);
    setUser(authUser);
  };

  const logout = () => {
    localStorage.removeItem("authUser");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
