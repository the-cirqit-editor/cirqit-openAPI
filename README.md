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



## OpenAPI
The OpenAPI is written in YAML and can be found in the file `cirqitOpenApi_vX.X.X.yml`.

### validate the OpenAPI
NOTE: some validators struggle with the circular reference of the Directory Tree, just ignore it.

To align to the OpenAPI specification, the OpenAPI file can be validated:
* https://oas-validation.com/process_file
* https://github.com/python-openapi/openapi-spec-validator
```aiignore
pip install openapi-spec-validator
openapi-spec-validator openAPI/cirqitOpenApi_v0.0.1.yml
```

OWASP validate 
```aiignore
spectral lint openAPI/cirqitOpenApi_v0.0.2.yml --ruleset .spectral.yaml
```

### generate cirQit OpenAPI implementation
We use https://openapi-generator.tech/ to generate the code for the server.
* generating the code from the OpenAPI for the cirQit backend
* fix and generate the code to the backend project
* run `./generateJavaCode.sh`

### test openAPI with Cats
With cats, the OpenAPI can be tested with real requests. 
It gives a lot of warnings, e.g. because AWS Cloudfront responds with 403 if the method is not supported (should be 405)

As these checks are not configurable, it might be better to clone the project and adjust it in the Java code. 

```
  java -jar cats-runner.jar \
     --contract=cirqitOpenApi_v0.0.1.yml \
     -H "Authorization=Bearer eyJhb... \
     --server=https://api-dev.cirqit.cloud
 
  [][] ▶ Starting cats-13.0.1-SNAPSHOT, build time 2025-01-07T17:12:03Z UTC, platform Linux-6.8.0-51-generic-amd64
  [][] ⚙ OpenAPI specs: cirqitOpenApi_v0.0.1.yml
  [][] ⚙ API base url: https://api-dev.cirqit.cloud
  [][] ⚙ Reporting path: cats-report 
  ...
```