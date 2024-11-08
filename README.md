# cirQit OpenAPI

## Introduction
this is the OpenAPI for https://cirQit.cloud

The API allows to create, read, update and delete the following resources:
- Directories
- Installations
- Attachments
- ...


## GitHub
This is a public repository on GitHub. You can find the repository at https://github.com/the-cirqit-editor/cirQit-openAPI
Everybody can read, only cirQit team members can write.

GitHub Actions are used to automatically generate the OpenAPI documentation and to present it as GitHub pages on
https://the-cirqit-editor.github.io/cirQit-openAPI/

## OpenAPI
The OpenAPI is written in YAML and can be found in the file `cirqitOpenApi_vX.X.X.yml`.

We use https://openapi-generator.tech/ to generate the code for the server.

### cirQit OpenAPI implementation
* generating the code from the OpenAPI for the cirQit backend
* fix and generate the code to the backend project
* run generateJavaCode.sh



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
