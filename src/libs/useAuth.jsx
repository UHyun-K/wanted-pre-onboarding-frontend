import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import { Navigate, Outlet } from "react-router-dom";

//token을 얻어와서  상속없이 자식에게 넘겨주기
export const AuthContext = createContext(
    //1.Provider 사용하지 않았을 때 적용될 초기 값  createContext(초기 값 )
    {
        accessToken: null,
        setAccessToken: () => {},
    }
);
export function AuthProvider({ children }) {
    const gotToken = localStorage.getItem("loginToken");
    const [accessToken, setAccessToken] = useState(gotToken || null);
    useEffect(() => {
        setAccessToken(gotToken);
    }, [gotToken]);
    const value = useMemo(() => {
        return { accessToken, setAccessToken };
    }, [accessToken, setAccessToken]);

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}
export function useAuth() {
    const authCont = useContext(AuthContext);
    return authCont;
}
export function PrivateRoute() {
    const { accessToken } = useContext(AuthContext);
    return accessToken ? <Outlet /> : <Navigate to="/signup" />;
}
export function LoggedInRoute() {
    const { accessToken } = useContext(AuthContext);
    return accessToken ? <Navigate to="/todo" /> : <Outlet />;
}
