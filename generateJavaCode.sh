#!/bin/bash

GENERATED_CODE=mock-server
TARGET_PROJECT=../cirqit-backend/openApiFunction
TARGET_DIR_GENERATED=src/main/java/cloud/cirqit/openapi/generated
TARGET_DIR_RESOURCES=src/main/resources
PACKAGE=cloud.cirqit.openapi.generated
OAS_FILE=cirqitOpenApi_v0.0.2.yml

# generate the server code with mock answers based on spring
echo "generate API"
rm -rf $GENERATED_CODE
openapi-generator-cli generate \
    -i openAPI/$OAS_FILE \
    -g spring \
    -o $GENERATED_CODE \
    --additional-properties=interfaceOnly=true,apiPackage=$PACKAGE.api,modelPackage=$PACKAGE.model,date="2024-11-04T00:00:00.00000+01:00[Europe/Berlin]" \

# replace the
find . -name "*.java" -exec sed -i 's/, requiredMode = Schema\.RequiredMode\.NOT_REQUIRED)/, required = false)/g' {} +
find . -name "*.java" -exec sed -i 's/, requiredMode = Schema\.RequiredMode\.REQUIRED)/, required = true)/g' {} +


# streamlin the @Generated annotation with "cirqit-openAPI/cirqitOpenApi_vX.Y.Z.yml" and date YYYY-MM-DD
CURRENT_DATE=$(date +"%Y-%m-%d")
find . -name "*.java" -exec sed -i "s|^@Generated.*|@Generated(value = \"cirqit-openAPI/$OAS_FILE\", date = \"$CURRENT_DATE\")|g" {} +

# copy the generated code to the backend
echo "copy API to $TARGET_PROJECT"
rm -rf $TARGET_PROJECT/src/main/java/cloud/cirqit/openapi/generated/*
mv $GENERATED_CODE/src/main/java/cloud/cirqit/openapi/generated/* $TARGET_PROJECT/$TARGET_DIR_GENERATED
# copy the definition to the backend
rm -f $TARGET_PROJECT/$TARGET_DIR_RESOURCES/cirqitOpenApi_v*
cp openAPI/$OAS_FILE $TARGET_PROJECT/$TARGET_DIR_RESOURCES/

# transform the yaml to json and copy it to the backend
which yq > /dev/null
if [ $? -ne 0 ]; then
  echo "yq is not installed. Please install it with 'brew install yq' or 'pip install yq' or 'sudo apt-get install yq'"
  exit 1
fi
cat openAPI/$OAS_FILE | yq > $TARGET_PROJECT/$TARGET_DIR_RESOURCES/$(basename $OAS_FILE .yml).json


# Define the message in the README.txt file
readme_content="Note: this yaml definition is a copy of the definition in $(pwd). Do not modify here but only in the source location."
echo "$readme_content" > $TARGET_PROJECT/$TARGET_DIR_RESOURCES/README.txt

# cleanup
rm -rf $GENERATED_CODE
echo
echo "code generated and copied to $TARGET_PROJECT"
