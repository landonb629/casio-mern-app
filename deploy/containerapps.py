from azure.identity import DefaultAzureCredential
from azure.mgmt.appcontainers import ContainerAppsAPIClient 
import os

managed_env_config = { 
    "location": "East US",
    "vnetConfiguration": { 
        "infrastructureSubnetId": "",
        "internal": "false",
        
    }
}
container_app_config = { 
    "location": "East US",
    "properties": {
        "configuration": {
            "ingress": {
                "external": "true",
                "targetPort": 80,
                "allowInsecure": "false",
            }
        },
    "environmentId": "",
    "template": {
        "containers": [ 
            {
                "image": "casinomernregistry.azurecr.io/backend:postfix",
                "name": "casinoapi"
            }
        ]
    },
    "scale": { 
        "maxReplicas": 5,
        "minReplicas": 1
    },
  },
}

sub_id = os.getenv("AZ_SUB_ID")

if sub_id == 'None': 
    print('no subscription id found')

client = ContainerAppsAPIClient(credential=DefaultAzureCredential(), subscription_id=sub_id)

client.managed_environments.begin_create_or_update(
    resource_group_name="testing-py-sdk",
    environment_name="test-env",
    
)

client.container_apps.begin_create_or_update(
    resource_group_name="testing-py-sdk",
    container_app_name="testing-py-app",
    container_app_envelope=container_app_config
)