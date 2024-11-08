#!/bin/bash

GENERATED_CODE=mock-server
TARGET_PROJECT=../cirqit-backend/openApiFunction
PACKAGE=cloud.cirqit.openapi.generated
OAS_VERSION=cirqitOpenApi_v0.0.1.yml

# generate the server code with mock answers based on spring
echo "generate API"
rm -rf $GENERATED_CODE
openapi-generator-cli generate -i $OAS_VERSION -g spring -o $GENERATED_CODE --additional-properties=interfaceOnly=true,apiPackage=$PACKAGE.api,modelPackage=$PACKAGE.model,date="2024-11-04T00:00:00.00000+01:00[Europe/Berlin]"
# replace the
find . -name "*.java" -exec sed -i 's/, requiredMode = Schema\.RequiredMode\.NOT_REQUIRED)/, required = false)/g' {} +
find . -name "*.java" -exec sed -i 's/, requiredMode = Schema\.RequiredMode\.REQUIRED)/, required = true)/g' {} +


# streamlin the @Generated annotation with "cirqit-openAPI/cirqitOpenApi_vX.Y.Z.yml" and date YYYY-MM-DD
CURRENT_DATE=$(date +"%Y-%m-%d")
find . -name "*.java" -exec sed -i "s|^@Generated.*|@Generated(value = \"cirqit-openAPI/$OAS_VERSION\", date = \"$CURRENT_DATE\")|g" {} +

# copy the generated code to the backend
echo "copy API to $TARGET_PROJECT"
rm -rf $TARGET_PROJECT/src/main/java/cloud/cirqit/openapi/generated/*
mv $GENERATED_CODE/src/main/java/cloud/cirqit/openapi/generated/* $TARGET_PROJECT/src/main/java/cloud/cirqit/openapi/generated/
# copy the definition to the backend
cp cirqitOpenApi_v0.0.1.yml $TARGET_PROJECT/definition/cirqitOpenApi_v0.0.1.yml

# Define the message in the README.txt file
readme_content="Note: this yaml definition is a copy of the definition in $(pwd). Do not modify here but only in the source location."
echo "$readme_content" > $TARGET_PROJECT/definition/README.txt