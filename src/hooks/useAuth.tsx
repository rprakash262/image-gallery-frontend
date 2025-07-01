import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { User } from "../types";

interface AuthContextType {
  user: User | null;
  login: (user: User, accessToken: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const imageGallery = localStorage.getItem("image-gallery");

    if (imageGallery) {
      const { user } = JSON.parse(imageGallery);
      setUser(user);
    }
  }, []);

  const login = (user: User, accessToken: string) => {
    setUser(user);
    const imageGallery = {
      user,
      accessToken,
    };

    localStorage.setItem("image-gallery", JSON.stringify(imageGallery));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("image-gallery");
  };

  const value = {
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const user = useContext(AuthContext);

  if (!user) {
    throw new Error("useAuth must be used inside auth context provider.");
  }

  return user;
};
