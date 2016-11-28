echo "Restoring data..."

if [ -z "$MONGODB_URI" ]; then

    echo "Using MongoDB database at localhost"
    mongorestore --drop ../data/dump/spotipos/

else
    if [[ "$MONGODB_URI" =~ ^(mongodb:\/\/)?(.+):(.+)@(.+):([0-9]+)\/(.+)$ ]]; then

        echo "Using MONGODB database at $MONGODB_URI"
        mongorestore -u ${BASH_REMATCH[2]} -p ${BASH_REMATCH[3]} -h ${BASH_REMATCH[4]} --port ${BASH_REMATCH[5]} -d ${BASH_REMATCH[6]} --drop ../data/dump/${BASH_REMATCH[6]}/

    else
        echo "INVALID MONGODB database URI: $MONGODB_URI"
    fi
fi
