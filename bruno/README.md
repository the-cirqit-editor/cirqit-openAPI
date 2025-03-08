# import OpenAPI to Bruno

 ## import collection of OpenAPIs to Bruno
* import Collection
* OpenAPI v3 File

NOTE: OpenAPI allows to define recursive components. But Bruno does not support recursions. Therefore,
the Directory-Children parameter needs to be deleted to import it.

```aiignore
        children:
           type: array
           readOnly: true
           description: the children directories in this directory
           items:
                $ref: '#/components/schemas/Directory'
```

## configure authentication
### OAuth2 - get authentication token with clientID and secret
#### create the body 
Get the token and client ID from the cirQit App - Settings - API Access
```aiignore
body:json {
    {
    "client_secret": "eyJhb....",
    "client_id": "ElektroForm Solar",
    "scope": "cirqit/read cirqit/write"
    }
}

```

#### store the token as environment variable
(see store-auth-token-with-tests.png)

```aiignore 
tests {
    // Set the token as a variable
    bru.setEnvVar("jwtToken", res.getBody().access_token);
}
```

### set the token to the header
(see use-auth-token-in-all-requests.png)

* cirQit OpenAPI -> Settings
* add Header:
    * key: Authorization
    * value: Bearer {{jwtToken}}


==> does not work today, set the ey... token in the value of the Authorization header
* set Auth  -> inherit in the request