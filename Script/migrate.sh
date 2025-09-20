#!/bin/bash

# This script is used to run database migrations for the WAEC Quiz Platform.

set -e

# Navigate to the API directory
cd apps/api

# Run the Prisma migrations
npx prisma migrate deploy

echo "Database migrations completed successfully."