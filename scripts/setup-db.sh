#!/bin/bash
echo "Setting up the MongoDB database..."
mongosh <<EOF
use medicalDB
EOF
