import { createContext, useContext, useState, useEffect } from "react";
import { fetchdata } from "../fetchData/fetchdata.js";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetchdata("/api/check-auth");
                if (response.status === 200) {
                    setIsAuthenticated(true);
                }
            } catch (error) {
                console.error("Error during authorization check:", error);
            }
        };
        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
}
