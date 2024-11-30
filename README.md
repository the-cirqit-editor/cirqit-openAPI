# cirQit OpenAPI

## Introduction
this is the OpenAPI for https://cirQit.cloud

The API allows to create, read, update and delete the following resources:
- Directories
- Installations
- Attachments
- ...


## GitHub actions
This is a public repository on GitHub. You can find the repository at https://github.com/the-cirqit-editor/cirQit-openAPI
Everybody can read, only cirQit team members can write.

> **INFO:** The repository should be public to allow us to use pages for free.. 

GitHub Actions are used to automatically generate the OpenAPI documentation and to present it as GitHub pages on
https://the-cirqit-editor.github.io/cirQit-openAPI/
The actions: 
* Update Swagger UI: update the swagger library
* pages-build-deployment: action provided by GitHub to build and deploy the pages
  * the pages-build-deployment action runs on every push to the main branch
  * see also https://github.com/the-cirqit-editor/cirqit-openAPI/settings/pages


## Swagger UI
As described above, the Swagger UI is updated and OpenAPI specificatoins are deployed by GitHub actions. 
The Swagger UI is modified and configured.
#### ./index.html
A header to select the version is added to the index.html file.
>     <!-- TODO: add the cirQit bar and logo on the top -->
>    <h3>Select version of OpenAPI <select id="version-dropdown"></select></h3>
### ./dist/swagger-initializer.js
the versions to be displayed in the dropdown are configured like: 
> let configurations = {
> "cirQit-v0.0.3": {
>   url: "cirqitOpenApi_v0.0.3.yml",
> },
> "cirQit-v1.0.0": {
>   url: "cirqitOpenApi_v1.0.0.yml",
> },
> };

> **To be clarified:** are this files overwritten by the GitHub action?



## OpenAPI
The OpenAPI is written in YAML and can be found in the file `cirqitOpenApi_vX.X.X.yml`.

We use https://openapi-generator.tech/ to generate the code for the server.

### cirQit OpenAPI implementation
* generating the code from the OpenAPI for the cirQit backend
* fix and generate the code to the backend project
* run `./generateJavaCode.sh`


# TRIAL AND ERROR (to be  deleted later)
### mock server
```aiignore
# install openapi-generator-cli
npm install @openapitools/openapi-generator-cli -g
# generate the server code with mock answers
openapi-generator-/home/huembi/workspace/cirQit-openAPIcli generate -i cirqitOpenApi_v0.0.1.yml -g spring -o ./mock-server --additional-properties=interfaceOnly=true
# run the server
## before running the mvnv maven wrapper must be installed
mvn -N io.takari:maven:wrapper
## run the server
cd mock-server
./mvnw spring-boot:run

```

openapi-generator-cli generate -i cirqitOpenApi_v0.0.1.yml -g java-wiremock -o ./wiremock-server --additional-properties=interfaceOnly=true

huembi@huembi-Yoga:~/workspace/cirQit-openAPI$ cp -r wiremock-server/src/main ../cirqit-backend/openAPI/src/
