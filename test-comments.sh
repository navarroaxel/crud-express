ENDPOINT=http://localhost:3000/api
CONTENT_TYPE="Content-Type: application/json"


echo "***** POST Article first *****"

ID=$(curl --silent --request POST $ENDPOINT/articles --header "$CONTENT_TYPE" \
  --data '{"article":{"author":"Jane","title":"A new post","body":"Exclusive data!"}}' | \
  jq --raw-output '._id')

curl --silent $ENDPOINT/articles | jq

echo "***** POST *****"

COMMENT_ID=$(curl --silent --request POST $ENDPOINT/comments --header "$CONTENT_TYPE" \
  --data '{"comment":{"author":"Some Author", "body":"Comment body", "article":"'$ID'"}}' | \
  jq --raw-output '._id')

curl --silent $ENDPOINT/comments?article=$ID | jq

echo "***** PUT $ENDPOINT/comments?article=$ID *****"

curl --silent --request PUT $ENDPOINT/comments/$COMMENT_ID --header "$CONTENT_TYPE" \
  --data '{"comment":{"body":"Comment body but edited"}}' | jq

curl --silent $ENDPOINT/comments?article=$ID | jq

echo "***** DELETE $ENDPOINT/comments/$COMMENT_ID *****"

curl --silent --request DELETE $ENDPOINT/comments/$COMMENT_ID | jq

echo "***** GET Comment $ENDPOINT/comments/$COMMENT_ID *****"

curl --silent $ENDPOINT/comments?article=$ID | jq