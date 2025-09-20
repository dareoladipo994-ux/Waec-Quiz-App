#!/bin/bash

# This script sets up the database for the WAEC Quiz Platform

# Exit immediately if a command exits with a non-zero status
set -e

# Load environment variables from .env file
if [ -f .env ]; then
    export $(cat .env | xargs)
fi

# Check if the database is already set up
if [ "$(docker ps -q -f name=waec-quiz-platform_db)" ]; then
    echo "Database is already running."
else
    echo "Starting the database..."
    docker-compose up -d db
    sleep 5 # Wait for the database to start
fi

# Run database migrations
echo "Running database migrations..."
docker-compose exec api npm run migrate

# Seed the database with initial data
echo "Seeding the database..."
docker-compose exec api npm run seed

echo "Database setup complete."