#!/bin/bash

# Run Prisma migrations
npx prisma migrate dev

# Start the application
node dist/server.js
