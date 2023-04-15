import { RouterProvider } from "react-router-dom";
import router from "./Routes/Router";
import { AuthProvider } from "./libs/useAuth";
function App() {
    return (
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    );
}

export default App;
