# cirQit OpenAPI

## Introduction
this is the OpenAPI for https://cirQit.cloud

The API allows to create, read, update and delete the following resources:
- Directories
- Installations
- Attachments
- Schema.pdf


## OpenAPI
The OpenAPI is written in YAML and can be found in the file `cirqitOpenApi_vX.X.X.yml`.
It is deployed to GitHub pages and can be found at https://the-cirqit-editor.github.io/cirqit-openAPI/


## Examples

### use the API 
Find a simple HTML /  Javascript page which shows the usage of the API in the example/api-usage directory.
It is not a full example, but it shows most of the features in the API.  
:link: [example app sources](./example/api-usage/index.html)   
:link: [example app live](https://the-cirqit-editor.github.io/cirqit-openAPI/example/api-usage/index.html)

### Authentication with PKCE
If you are using the cirQit API from a web application, you can use the PKCE authentication flow. 
This is useful if the user is communicating with the cirQit API directly from the browser. 
Using the PKCE flow, he can authorize himself with the cirQit username and password.  
:link: [pkce-authentication-flow](./example/pkce-authentication-flow)


### Authentication with client-credentials
The authentication for the cirQit API can be done with client-credentials. The client secret is obtained from the cirQit Application in the account section.
The client-credentials flow is used for server-to-server communication. No user interaction is needed.
Find more information In the example/client-credentials-flow directory.  
:link: [client-credentials-flow](./example/client-credentials-flow)


### iFrame example
It is possible to use the cirQit Application in an iFrame.   
Please be aware that the iFrame technology comes with some security restrictions and technical limitations.   
You will need to contact us to allow your domain to be used in an iFrame. 
For the example page, we have allowed the domain `https://the-cirqit-editor.github.io` in the cirQit backend. If you try without registering your URL, you will get a "https://app.cirqit.cloud refused to connect."

## Bruno
Bruno is a REST client to test the API. In the bruno directory, you can find a collection of all the API calls.
