# casio-mern-app

# Project motivations 
I wanted to try this project to continue building off the skills I have learned while exploring web development. I intend to use this project as a test application when running kubernetes, and container technologies from azure and AWS.

I got the idea for this application off of a reddit post that someone made about a casino application being a take home project for an interview.

# Application features

- /api/v1/auth -> user can register and login to their account
- /api/v1/transaction -> user can deposit, withdrawl, and check their transaction history
- /api/v1/games -> list all games, play a single game, create a game 

# Architecture / Tech Stack 

I plan on hosting this application on Azure container instances. Azure container instances is not a supported backend for a load balancer, so I am going to use an envoy container.

Tech stack: 
- Azure container instances
- Github Actions 
- CosmosDB
- Terraform 


# Azure container apps and Azure app service 

Azure container apps 
- full managed PaaS service for running microservices and container apps

Some of the common use cases are: 
    - backend APIs 
    - background processes 
    - microservices 

Azure app service 



## building the local dev environment 

building production image 

environment variables expected: 
- PASSENGER_APP_ENV
- DB_HOST
- DB_PORT
- DB_USERNAME
- DB_PASSWORD
```
docker build -f Dockerfile.prod -t casino-backend:v1.0 .
```
