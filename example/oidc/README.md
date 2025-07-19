# OIDC authentication flow

``` mermaid
sequenceDiagram
    participant B as Browser
    box rgb(15, 77, 146)  cirQit Komponenten
        participant A as Deine App
    end 

    box rgb(184, 115, 51)  AWS Cognito 
        participant CUI as CognitoHostedUI
        participant AC as AppClient
        participant UP as UserPool
        participant FIC as FederatedIdentityConnector
    end
    participant G as Google
    
        Note over B: 1. State Token erstellen
        B->>B: crypto.randomUUID() + sessionStorage
        
        Note over B,CUI: 2. Redirect zu Cognito
        B->>CUI: GET /login?state=token&client_id=...
        CUI->>AC: Validiere client_id und Parameter
        
        Note over CUI,B: 3. Cognito zeigt Login-Seite
        CUI->>B: 200 OK (Login Page mit Google Button)
        
        Note over B,FIC: 4. User klickt "Login with Google"
        B->>CUI: POST /oauth2/authorize (Google selected)
        CUI->>FIC: Initiiere Federated Login
        FIC->>G: 302 Redirect zu Google OAuth
        
        Note over G,B: 5. Google Authorization
        G->>B: 200 OK (Google Login Form)
        B->>G: POST /oauth/authorize (credentials)
        
        Note over G,FIC: 6. Google redirect zurück zu Cognito
        G->>FIC: 302 Redirect mit Auth Code
        
        Note over FIC,G: 7. Cognito tauscht Code mit Google
        FIC->>G: POST /token (code exchange)
        G->>FIC: 200 OK (access_token, id_token)
        
        Note over FIC,G: 8. Cognito holt User Info
        FIC->>G: GET /userinfo (Bearer token)
        G->>FIC: 200 OK (user profile data)
        
        Note over FIC,UP: 9. Cognito erstellt/aktualisiert User
        FIC->>UP: Create/Update User Pool User
        UP->>CUI: Notify completion and provide auth code
        
        Note over CUI,B: 10. Cognito redirect zurück zu Browser
        CUI->>B: 302 Redirect mit Code + original State
        
        Note over B,A: 11. Browser ruft Callback-URL auf
        B->>A: GET /callback?code=...&state=...
        
        Note over A: 12. State Validierung
        A->>A: Validate state token (sessionStorage)
        
        Note over A,AC: 13. Token Exchange
        A->>AC: POST /oauth2/token (code exchange)
        AC->>UP: Validiere Code und generiere Tokens
        UP->>AC: JWT Tokens erstellt
        AC->>A: 200 OK (access_token, id_token, refresh_token)
        
        Note over A,B: 14. Finale Antwort
        A->>B: 302 Redirect + Set-Cookie (jwt=id-token)
        
        Note over B: User ist eingeloggt
        B->>B: sessionStorage.removeItem('oidc_state')
```

