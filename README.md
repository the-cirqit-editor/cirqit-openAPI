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

```aiignore
GENERATED_CODE=mock-server
TARGET_PROJECT=../cirqit-backend/openApiFunction
PACKAGE=cloud.cirqit.openapi.generated

# generate the server code with mock answers based on spring
echo "generate API"
rm -rf $GENERATED_CODE
openapi-generator-cli generate -i cirqitOpenApi_v0.0.1.yml -g spring -o $GENERATED_CODE --additional-properties=interfaceOnly=true   --additional-properties=apiPackage=$PACKAGE.api   --additional-properties=modelPackage=$PACKAGE.model  --additional-properties=date="2024-11-04"
# replace the
find . -name "*.java" -exec sed -i 's/, requiredMode = Schema\.RequiredMode\.NOT_REQUIRED)/, required = false)/g' {} +
find . -name "*.java" -exec sed -i 's/, requiredMode = Schema\.RequiredMode\.REQUIRED)/, required = true)/g' {} +
# copy the generated code to the backend
echo "copy API to $TARGET_PROJECT"
rm -rf $TARGET_PROJECT/src/main/java/cloud/cirqit/openapi/generated/*
mv $GENERATED_CODE/src/main/java/cloud/cirqit/openapi/generated/* $TARGET_PROJECT/src/main/java/cloud/cirqit/openapi/generated/
# copy the definition to the backend
cp cirqitOpenApi_v0.0.1.yml $TARGET_PROJECT/definition/cirqitOpenApi_v0.0.1.yml

# Define the message in the README.txt file
readme_content="Note: this yaml definition is a copy of the definition in $(pwd). Do not modify here but only in the source location."
echo "$readme_content" > $TARGET_PROJECT/definition/README.txt
```






# TRIAL AND ERROR
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
