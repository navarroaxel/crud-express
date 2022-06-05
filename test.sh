ENDPOINT=http://localhost:3000/api/articles
CONTENT_TYPE="Content-Type: application/json"

curl --silent $ENDPOINT | jq

echo "***** POST *****"

ID=$(curl --silent --request POST $ENDPOINT --header "$CONTENT_TYPE" \
  --data '{"article":{"author":"Jane","title":"A new post","body":"Exclusive data!"}}' | \
  jq --raw-output '.id')

curl --silent $ENDPOINT | jq

echo "***** PUT $ENDPOINT/$ID *****"

curl --silent --request PUT $ENDPOINT/$ID --header "$CONTENT_TYPE" \
  --data '{"article":{"body":"Exclusive information!"}}' | jq

curl --silent $ENDPOINT | jq

echo "***** DELETE $ENDPOINT/$ID *****"

curl --silent --request DELETE $ENDPOINT/$ID

curl --silent $ENDPOINT | jq
