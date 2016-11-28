echo "Dumping data..."

if [ -z "$MONGODB_URI" ]; then

    echo "Using MongoDB database at localhost"
    mongodump -d spotipos -o ../data/dump/

else
    if [[ "$MONGODB_URI" =~ ^(mongodb:\/\/)?(.+):(.+)@(.+):([0-9]+)\/(.+)$ ]]; then

        echo "Using MONGODB database at $MONGODB_URI"
        mongodump -u ${BASH_REMATCH[2]} -p ${BASH_REMATCH[3]} -h ${BASH_REMATCH[4]} --port ${BASH_REMATCH[5]} -d ${BASH_REMATCH[6]} -o ../data/dump/

    else
        echo "INVALID MONGODB database URI: $MONGODB_URI"
    fi
fi
