# PKCE authentication flow test app

This is a simple test app to demonstrate the PKCE authentication flow with the cirQit AWS Authentication Server.
The PKCE flow is an extension of the OAuth 2.0 Authorization Code flow, which adds an additional layer of security by using a code challenge and code verifier.

## PKCE workflow
``` mermaid
sequenceDiagram
    participant User
    participant Client
    participant cirQit_APP
    box AWS Cognito
        participant CognitoHostedUI
        participant AppClient
        participant UserPool
        participant IdProvider
    end
    participant cirQit_openAPI

    User->>Client: Initiate Authentication Request
    Client->>Client: Generate code verifier and challenge
    Client->>CognitoHostedUI: Authentication Request (code_challenge)
    CognitoHostedUI->>AppClient: Forward auth request
    AppClient->>UserPool: Verify request parameters
    CognitoHostedUI-->>User: Redirect to login/authorization prompt
    User->>CognitoHostedUI: Authenticate
    CognitoHostedUI->>UserPool: Validate credentials
    UserPool->>IdProvider: Verify identity (if external provider)
    IdProvider-->>UserPool: Identity confirmed
    UserPool-->>AppClient: Authentication successful
    CognitoHostedUI-->>cirQit_APP: redirect with Authentication Code (code)
    cirQit_APP->>Client: redirect with Authentication Code (code)
    Client->>AppClient: Token Request (code, code_verifier)
    AppClient->>UserPool: Verify code and code_verifier
    UserPool->>UserPool: Generate tokens
    UserPool-->>AppClient: JWT tokens created
    AppClient-->>Client: Access Token (JWT AccessToken)
    Client->>cirQit_openAPI: Access Resource (JWT AccessToken)
    cirQit_openAPI-->>Client: Resource

```


## run the example app on your local machine

The PKCE flow is based on a redirect to the browser from the Authentication Server. 
To allow a POC of this flow, a simple express server is used to handle the redirect and finally obtain the JWT authentication token from AWS.

### configure
* adjust cirQit settings in index.html
* adjust the targetApp URL to your application in the index.html
```aiignore
        const customerInfo = {
            timeout: 3000, // timeout in milliseconds to wait befor the cirQit redirect page is redirecting to the targetAPP URL 
            targetApp: "http://localhost:3000/authentication.html", // your target app URL to recieve the JWT token
        };
```

### run the express server on your local machine
* run `npm install` to install the dependencies
* run `npm start` to start the app

==> server listens on localhost:3000



### more info
* https://dev.to/jinlianwang/user-authentication-through-authorization-code-grant-type-using-aws-cognito-1f93