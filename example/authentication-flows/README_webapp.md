# AWS Cognito Authentication Flows

Dieses Diagramm zeigt die vier verschiedenen Authentifizierungsflows, die alle mit AWS Cognito arbeiten, in einer vereinfachten Darstellung. Es verdeutlicht, wie die verschiedenen Flows dieselben Cognito-Ressourcen gemeinsam nutzen.

```mermaid
sequenceDiagram
    %% Teilnehmer definieren
    actor User
    box rgb(15, 77, 146)  cirQit Komponenten
        participant WebApp as cirQit WebApplication
        participant API as cirQit Backend
    end
    
    box rgb(184, 115, 51)  AWS Cognito 
        participant HostedUI as Cognito Hosted UI
        participant AppClient as App Client
        participant PKCE_AppClient as PKCE App Client
        participant UserPool as User Pool
    end
    
    participant IdProvider as Identity Provider (Google, WAGO, ...)

    %% Trennbalken - Username-Password Flow
    Note over User,IdProvider: Username-Password Flow mit AWS Amplify
    
    %% Flow 1: Username-Password mit AWS Amplify
    User->>WebApp: 1. Username + Passwort
    WebApp->>UserPool: 2. Auth.signIn() direkt
    UserPool-->>WebApp: 3. Tokens
    WebApp->>API: 4. API Request mit Token
    API-->>WebApp: Response
    
    %% Trennbalken - OIDC Flow
    Note over User,IdProvider: OIDC Flow mit Google
    
    %% Flow 2: OIDC mit Google
    User->>HostedUI: 1. Login-Request
    HostedUI->>IdProvider: 2. Login mit Google
    IdProvider-->>HostedUI: 3. Auth Code
    HostedUI->>UserPool: 4. User-Info
    HostedUI-->>WebApp: 5. Code
    WebApp->>AppClient: 6. Token Exchange
    AppClient-->>WebApp: 7. Tokens
    WebApp->>API: 8. API Request mit Token
    API-->>WebApp: Response

```

## Hinweise zu den Ressourcen

- **User Pool**: Zentrale Nutzerdatenbank, die von allen Flows gemeinsam genutzt wird
- **App Client**: Wird von OIDC und Client Credentials genutzt
- **PKCE App Client**: Spezieller App Client nur für den PKCE-Flow
- **Identity Provider**: Für föderierte Authentifizierung (z.B. Google) im OIDC-Flow
- **Resource Server Configuration**: Definiert Scopes für Client Credentials
- **Hosted UI**: Anmeldeoberfläche für OIDC und PKCE

## Farblegende

- cirQit Komponenten (WebApp, API, Open API): Dunkelblau
- AWS Cognito Komponenten: AWS-Orange
