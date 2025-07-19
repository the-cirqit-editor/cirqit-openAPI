# AWS Cognito Authentication Flows for the OpenAPI 

Dieses Diagramm zeigt die verschiedenen Authentifizierungsflows, die alle mit AWS Cognito arbeiten, in einer vereinfachten Darstellung. Es verdeutlicht, wie die verschiedenen Flows dieselben Cognito-Ressourcen gemeinsam nutzen.

```mermaid
sequenceDiagram
    %% Teilnehmer definieren
    actor User
    box rgb(15, 77, 146)  cirQit Komponenten
        participant WebApp as cirQit WebApplication
        participant OpenAPI as cirQit Open API
    end
    
    box rgb(184, 115, 51)  AWS Cognito 
        participant HostedUI as Cognito Hosted UI
        participant AppClient as App Client
        participant PKCE_AppClient as PKCE App Client
        participant UserPool as User Pool
        participant ScopeConfig as Resource Server Config
    end
    
    %% Trennbalken - Client Credentials Flow
    Note over User,ScopeConfig: Client Credentials Flow
    
    %% Flow 3: Client Credentials (mit derselben WebApp)
    WebApp->>AppClient: 1. client_id + client_secret
    AppClient->>UserPool: 2. Validieren
    AppClient->>ScopeConfig: 3. Scope-Info
    ScopeConfig-->>AppClient: Konfigurierte Scopes
    AppClient-->>WebApp: 4. Token
    WebApp->>OpenAPI: 5. API Request mit Token
    OpenAPI-->>WebApp: Response
    
    %% Trennbalken - PKCE Flow
    Note over User,ScopeConfig: PKCE Flow
    
    %% Flow 4: PKCE
    User->>PKCE_AppClient: 1. Auth mit Code Challenge
    PKCE_AppClient->>HostedUI: 2. Login
    HostedUI->>UserPool: 3. Authentifizieren
    HostedUI-->>WebApp: 4. Code
    WebApp->>PKCE_AppClient: 5. Code + Verifier
    PKCE_AppClient-->>WebApp: 6. Token
    WebApp->>OpenAPI: 7. API Request mit Token
    OpenAPI-->>WebApp: Response
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
