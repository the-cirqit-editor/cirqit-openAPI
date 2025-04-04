# PKCE authentication flow test app

This is a simple test app to demonstrate the PKCE authentication flow with the cirQit AWS Authentication Server.
The PKCE flow is an extension of the OAuth 2.0 Authorization Code flow, which adds an additional layer of security by using a code challenge and code verifier.

## PKCE workflow
``` mermaid
sequenceDiagram
    participant User
    participant Client
    participant cirQit_APP
    participant AWSAuthentication
    participant cirQit_openAPI

    User->>Client: Initiate Authentication Request
    Client->>Client: Generate code verifier and challenge
    Client->>AWSAuthentication: Authentication Request (code_challenge)
    AWSAuthentication-->>User: Redirect to login/authorization prompt
    User->>AWSAuthentication: Authenticate
    AWSAuthentication-->>cirQit_APP: redirect with Authentication Code (code)
    cirQit_APP->>Client: redirect with Authentication Code (code)
    Client ->>AWSAuthentication: Token Request (code, code_verifier)
    AWSAuthentication-->>Client: Access Token (JWT AccessToken)
    Client->>cirQit_openAPI: Access Resource (JWT AccessToken)
    cirQit_openAPI-->>Client: Resource

```


## run the example app on your local machine
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