// index.js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "react-oidc-context";

const cognitoAuthConfig = {
    authority: "https://cognito-idp.eu-central-1.amazonaws.com/eu-central-1_URSR8f3hq",
    client_id: "57mp30e89p3q876aea8rnhqs46",
    redirect_uri: "file:///home/huembi/workspace/cirqit-openAPI/example/pkce-git.html",
    response_type: "code",
    scope: "email openid",
};

const root = ReactDOM.createRoot(document.getElementById("root"));

// wrap the application with AuthProvider
root.render(
    <React.StrictMode>
        <AuthProvider {...cognitoAuthConfig}>
            <App />
        </AuthProvider>
    </React.StrictMode>
);