#!/bin/sh
set -e
mkdir -p /data
npx prisma db push
exec npm start
