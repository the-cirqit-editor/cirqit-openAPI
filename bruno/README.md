# import OpenAPI to Bruno
## Bruno, the new Rester or Postman or Insomnia
https://docs.usebruno.com/introduction/what-is-bruno


 ## import collection of OpenAPIs to Bruno
* import Collection
* OpenAPI v3 File

### replace collection.bru
Add this configuration to the collection.bru file to import the OpenAPI specification.
```aiignore
auth {
  mode: bearer
}

auth:bearer {
  token: {{jwtToken}}
}
```

### inherit the authentication from the parent
replace all   "auth: none" with "auth: inherit" in the imported files. 
Use your IDEs search and replace feature to do this.



## configure authentication
### PKCE - get authentication token with username and password
run the PKCE example app to get the authentication token.
store it as {{jwtToken}} in the environment variables of Bruno.

### OAuth2 - get authentication token with clientID and secret
#### create the body 
Get the token and client ID from the cirQit App - Settings - API Access
```aiignore
body:json {
    {
    "client_secret": "eyJhb....",
    "client_id": "cirQit-user-name",
    "scope": "cirqit/read cirqit/write"
    }
}
```

#### store the token as environment variable
(see store-auth-token-with-tests.png)

```aiignore 
tests {
    # Set the token as a variable
    bru.setEnvVar("jwtToken", res.getBody().access_token);
}
```



