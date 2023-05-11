# casio-mern-app

# Project motivations 
I wanted to try this project to continue building off the skills I have learned while exploring web development. I intend to use this project as a test application when running kubernetes, and container technologies from azure and AWS.

The motivation behind this project came from reading a reddit post. This post talked about doing a software engineering interview where this individual was asked to create a full stack casino application that allowed users to authenticate, deposit/withdraw from their accounts, and play the games.

# Application features

- /api/v1/auth -> user can register and login to their account
- /api/v1/transaction -> user can deposit, withdrawl, and check their transaction history
- /api/v1/games -> list all games, play a single game, create a game 

# Architecture / Tech Stack 

I plan on hosting this application on Azure app services for the frontend, and the backend will be on Azure container apps.

Tech stack: 
- Azure container apps 
- Azure app services
- Github Actions 
- CosmosDB
- Terraform 


# Information on Azure container apps

### Networking 
Container apps run in the context of an environment (Container apps environment). By default your app environment is going to create a virutal network that is managed by microsofts tenant, so it's inaccessible. 

By leveraging the custom vnet option, you get the following features:
- app gateway integration 
- network security groups
- communicating with private endpoint enabled resources 

Private vs Public:
- external: environment is deployed as an external resource, routable by the internet, and publicly exposed 
- internal: environment has no public endpoint, the endpoint is mapped to an internal azure load balancer IP address

Custom vnet considerations 
- provide a dedicated subnet to azure container apps 
- subnet range is assigned from the azure container environment

Ingress configuration
- Accessibility level:
    - sets whether your app is public or private 
    - env variable (CONTAINER_APP_ENV_DNS_SUFFIX) used for resolving FQDN suffix for the environment, apps communicating within the same environment are able to use the app name 
- Traffic split rules: 
    - allows you to split the traffic between multiple revisions of your application


DNS 

resolving internal DNS names 
- custom domains: 
    - create an azure private DNS zone that resolves the apex domain to the static IP address of the container apps environment

NOTE: you can find the static IP address of the container apps environment with the following command 
``` az containerapp env list ```

## Communication from the frontend to the backend 
In order for the fronted and backend to talk to either other, a private DNS zone must be configured for the container apps.

The nginx configuration is what facilitates the communication between the frontend and the backend. the package.json uses the "proxy" option when developing locally, so when we are writing code, we only specify the path for the API request. ex: 

```
const fetch = async () => { 
    try { 
        const fetchRequest = await fetch("/api/v1/auth/register", options)
    } catch(error) { 
        console.log(error)
    }
}
```

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
