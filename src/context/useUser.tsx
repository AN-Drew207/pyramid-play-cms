import React, {
  createContext,
  useState,
  useEffect,
  PropsWithChildren,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { configureAxiosHeaders, configureHOST } from "@/api/config";

interface TokenDetails {
  token: string;
  user: User;
}

interface User {
  id: number;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  username: string | null;
  documentId: string | null;
  phoneNumber: string | null;
  balance: number;
  maxBalance: number;
  wager: number;
  currency: string | null;
  country: string | null;
  city: string | null;
  status: string;
  role: string;
  termsAndConditions: boolean;
  isHidden: false;
  createdAt: string;
  updatedAt: string;
  manager: {
    id: string;
    firstName: string;
    lastName: string;
  } | null;
}

export interface AuthContextProps {
  auth: TokenDetails | null | undefined;
  setAuth: (auth: TokenDetails | null) => Promise<void>;
}
// Create a context
const AuthContext = createContext<AuthContextProps>({
  auth: null,
  setAuth: async () => {},
});
const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [auth, setAuthState] = useState<TokenDetails | null | undefined>(
    undefined,
  );

  // Get current auth state from AsyncStorage
  const getAuthState = async () => {
    try {
      configureHOST();
      const authDataString = await AsyncStorage.getItem("auth");
      const authData: TokenDetails | null =
        authDataString !== null
          ? JSON.parse(authDataString, (key, value) => {
              switch (key) {
                case "status":
                case "error_description":
                case "access_token":
                case "refresh_token":
                  return String(value);
                case "error_code":
                case "user_id":
                case "login_logid":
                  return parseInt(value);
                case "accessTokenExpiresAt":
                case "refreshTokenExpiresAt":
                  return new Date(value);
                default:
                  return value;
              }
            })
          : authDataString;
      // Configure axios headers
      if (authData !== null) {
        configureAxiosHeaders(authData.token);
        setAuthState(authData);
      } else {
        setAuthState(null);
        console.log("authData is null");
      }
    } catch (err) {
      console.log("Caught Auth Exception", err);
      setAuthState(null);
    }
  };
  // Update AsyncStorage & context state
  const setAuth = async (auth: TokenDetails | null) => {
    console.log(auth, "auth");
    if (auth === null) {
      await AsyncStorage.removeItem("auth");
      setAuthState(auth);
    } else {
      try {
        await AsyncStorage.setItem("auth", JSON.stringify(auth));
        // Configure axios headers
        if (auth.token) configureAxiosHeaders(auth.token);
        setAuthState(auth);
        console.log("Setting done.");
      } catch (error) {
        console.log("Caught Auth Exception", error);
      }
    }
  };

  useEffect(() => {
    getAuthState();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
