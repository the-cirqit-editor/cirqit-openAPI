# execute test requests
This template is based on https://aws.amazon.com/de/blogs/opensource/create-restful-apis-on-aws-with-openapi-specification-with-no-coding/

It works by doing the GET requests in the browser:
https://zit9ic33zh.execute-api.eu-central-1.amazonaws.com/dev/equipment

```aiignore
curl -i -X 'GET' \
'https://zit9ic33zh.execute-api.eu-central-1.amazonaws.com/dev/equipment' \
-H 'accept: */*' \
-H 'Content-Type: application/json' 

```

For Post, use curl
```aiignore
curl -i -X 'POST' \
'https://zit9ic33zh.execute-api.eu-central-1.amazonaws.com/dev/equipment' \
-H 'accept: */*' \
-H 'Content-Type: application/json' \
-d '{
"id": "2",
"name": "golf ball",
"condition": "new",
"price": 0.20
}'

```

