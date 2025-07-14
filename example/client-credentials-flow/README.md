# Examples

## obtain client_secret
The client secret is provided in https://app.cirqit.cloud/#/account 

## OAuth 2.0 Client Credentials flow
```mermaid
sequenceDiagram
    participant Client

    box rgb(15, 77, 146)  cirQit Komponenten
        participant API as cirQit AP I (Resource Server)
    end

    box rgb(184, 115, 51)  AWS Cognito
    participant AppClient
        participant UserPool
        participant ScopeConfig as Resource Server Config
    end

    Client->>AppClient: Token Request (client_id, client_secret)
    AppClient->>UserPool: Validate client credentials
    UserPool->>AppClient: Credentials validated
    AppClient->>ScopeConfig: Lookup authorized scopes
    ScopeConfig->>AppClient: Return configured scopes
    AppClient->>AppClient: Generate JWT token with scopes
    AppClient-->>Client: Access Token (JWT)
    Client->>API: Access Resource (Access Token)
    API->>API: Validate Token & Scopes
    API-->>Client: Resource Response
```

## Erklärung der Komponenten

- **Client**: Die Anwendung, die auf die cirQit API zugreifen möchte
- **AppClient**: Die in Cognito konfigurierte Client-Anwendung
- **UserPool**: Der Benutzerpool, der die Validierung der Client-Credentials durchführt
- **Resource Server Config**: Die Konfiguration innerhalb von Cognito, die die verfügbaren Scopes definiert
- **cirQit API**: Die eigentliche API, die die Ressourcen bereitstellt und das Token validiert
