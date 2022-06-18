#!/bin/bash
cd "$(dirname "$0")"

cp -R ../backend/proto ../backend/api-gateway
cp -R ../backend/proto ../backend/auth-svc
cp -R ../backend/proto ../backend/movies-svc