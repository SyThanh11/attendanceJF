#!/bin/bash

# Wait for the PostgreSQL database to start
wait-for-it -t 60 db:5432 -- echo "PostgreSQL is up"

# Start the Golang application
exec "$@"
