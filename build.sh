#!/bin/bash 

TAG=$1
echo 'logging into container registry'
az acr login --name casinomernregistry

if [ $? -eq 0 ]; then
  echo 'successful'
else 
  echo 'failed to login to registry'
fi 

echo 'building frontend app'
cd ./frontend 
docker build -t casinomernregistry.azurecr.io/frontend:$TAG -f Dockerfile.prod . 
docker push casinomernregistry.azurecr.io/frontend:$TAG 

if [ $? -eq 0 ]; then 
  echo 'pushed frontend successfully'
else 
  echo 'error pushing frontend'
fi 

cd ../backend
docker build -t casinomernregistry.azurecr.io/backend:$TAG -f Dockerfile.prod . 
docker push casinomernregistry.azurecr.io/backend:$TAG 

if [ $? -eq 0 ]; then
  echo 'pushed backend successfully '
else
  echo 'error pushing backend'
fi


