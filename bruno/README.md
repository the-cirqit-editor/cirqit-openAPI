# import OpenAPI to Bruno

 ## import collection of OpenAPIs to Bruno
* import Collection
* OpenAPI v3 File


## configure authentication
### get token
#### create the body 
```aiignore
body:json {
    {
    "jwtRefreshToken": "eyJhb....",
    "clientId": "ElektroForm Solar",
    "scope": "cirqit/read cirqit/write"
    }
}

```

#### store the token as environment variable
```aiignore 
tests {
    console.log("execute tests "+res.getBody())
    // Set the token as a variable
    bru.setEnvVar("jwtToken", res.getBody());
    console.log("jwt token set "+bru.getEnvVar("jwtToken") )
}
```

### set the token to the header
* cirQit OpenAPI -> Settings
* add Header:
    * key: Authorization
    * value: Bearer {{jwtToken}}
