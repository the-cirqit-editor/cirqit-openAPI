# Username-Password Authentication Flow mit AWS Amplify

Dieser Flow zeigt die direkte Authentifizierung mit Benutzername und Passwort unter Verwendung von AWS Amplify und Cognito.

## Username-Password Authentication Flow
```mermaid
sequenceDiagram
    actor User

    box rgb(15, 77, 146)  cirQit Komponenten
        participant Client as Client/App (mit AWS Amplify)
        participant API as cirQit-Backend API
    end

    box rgb(184, 115, 51)  AWS Cognito
    participant AppClient
        participant UserPool
        participant AuthFlow as SRP Auth Flow
    end

    User->>Client: Nutzer gibt Username und Passwort ein
    Client->>AppClient: Auth.signIn(username, password)
    AppClient->>AuthFlow: Initiiert SRP (Secure Remote Password) Flow
    AuthFlow->>UserPool: Verifikation der Anmeldedaten
    UserPool->>AuthFlow: Challenge und Salt zurückgeben
    AuthFlow->>Client: Challenge übermitteln
    Client->>Client: SRP Berechnung (Client-Proof)
    Client->>AuthFlow: Antwort auf Challenge (SRP-Proof)
    AuthFlow->>UserPool: SRP-Proof verifizieren

    Note over Client, AuthFlow: Authentifizierung erfolgreich
        UserPool->>UserPool: Generiert JWT Tokens
        UserPool->>AppClient: Tokens übermitteln
        AppClient->>Client: Tokens (idToken, accessToken, refreshToken)
        Client->>Client: Speichert Tokens lokal

    Note over Client, AuthFlow: Authentifizierung fehlgeschlagen
        UserPool->>AppClient: Authentifizierungsfehler
        AppClient->>Client: Auth Error (Ungültige Anmeldedaten)
    
    Note over Client, AuthFlow: Spätere API-Anfrage (nur nach erfolgreicher Authentifizierung)
    Client->>API: API-Anfrage mit accessToken
    API->>API: Validiere Token und Berechtigungen
    API->>Client: API Response
    
    Note over Client, AuthFlow: Automatische Token-Erneuerung (bei Bedarf)
    Client->>AppClient: Auth.currentSession() (bei Token-Ablauf)
    AppClient->>UserPool: refreshToken verwenden
    UserPool->>AppClient: Neue Tokens
    AppClient->>Client: Aktualisierte Tokens
```


## Besonderheiten des SRP-Protokolls

Der Username-Password Flow in AWS Cognito verwendet das Secure Remote Password (SRP) Protokoll, um die Anmeldedaten sicher zu übertragen:

1. Das Passwort wird niemals als Klartext übertragen
2. Eine Challenge-Response-Mechanik schützt vor Replay-Attacken
3. Sowohl Client als auch Server authentifizieren sich gegenseitig

AWS Amplify implementiert das SRP-Protokoll automatisch, sodass du dich nicht um die kryptografischen Details kümmern musst.
