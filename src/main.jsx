import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import AuthProvider from "./providers/AuthProvider.jsx";
import ProfileProvider from "./providers/ProfileProvider.jsx";
import BlogProvider from "./providers/BlogProvider.jsx";
import { DeleteProvider } from "./providers/DeleteProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <AuthProvider>
            <ProfileProvider>
                <BlogProvider>
                    <Router>
                        <DeleteProvider>
                            <App />
                        </DeleteProvider>
                    </Router>
                </BlogProvider>
            </ProfileProvider>
        </AuthProvider>
    </React.StrictMode>
);
