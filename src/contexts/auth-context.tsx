import React, {
  createContext,
  useContext,
  PropsWithChildren,
  ReactNode,
} from "react";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../config/firebase";
import { IAuth } from "../types/auth";
import { useNavigate } from "react-router-dom";
import { useProfileContext } from "./profile-context";

interface AuthContextProps {
  children: ReactNode;
}

interface IAuthContext {
  register: (
    email: IAuth["email"],
    username: IAuth["username"],
    password: IAuth["password"],
    toggleWrongCredentialsModalState: () => void
  ) => Promise<void>;
  login: (
    email: IAuth["email"],
    password: IAuth["password"],
    toggleWrongCredentialsModalState: () => void
  ) => Promise<void>;
  logout: () => Promise<void>;
  forgotPassword: (
    email: IAuth["email"],
    toggleForgotPasswordModalState: () => void
  ) => void;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export function AuthProvider({
  children,
}: PropsWithChildren<AuthContextProps>) {
  const navigate = useNavigate();
  const { updateUserProfile } = useProfileContext();

  const register = async (
    email: IAuth["email"],
    username: IAuth["username"],
    password: IAuth["password"],
    toggleWrongCredentialsModalState: () => void
  ) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password).then(
        async (userInfo) => {
          const { user } = userInfo;
          await updateUserProfile(user, { username });
          navigate("/");
        }
      );
    } catch (error) {
      toggleWrongCredentialsModalState();
      console.error((error as Error).message);
    }
  };

  const login = async (
    email: IAuth["email"],
    password: IAuth["password"],
    toggleWrongCredentialsModalState: () => void
  ) => {
    try {
      await signInWithEmailAndPassword(auth, email, password).then(() => {
        navigate("/");
      });
    } catch (error) {
      toggleWrongCredentialsModalState();
      console.error((error as Error).message);
    }
  };

  const logout = async () => {
    await signOut(auth);
    navigate("/auth");
  };

  const forgotPassword = (
    email: IAuth["email"],
    toggleForgotPasswordModalState: () => void
  ) => {
    return sendPasswordResetEmail(auth, email)
      .then(() => {
        toggleForgotPasswordModalState();
      })
      .catch((error) => {
        console.error((error as Error).message);
      });
  };

  return (
    <AuthContext.Provider
      value={{
        register,
        login,
        forgotPassword,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);
