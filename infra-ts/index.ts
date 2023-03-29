import * as pulumi from "@pulumi/pulumi";
import * as azure_native from "@pulumi/azure-native";


//resource variables
const rgOptions = { 
    location: "eastus",
    resourceGroupName: "casino-mern-app"
}

const network = { 
    name: "testing-virtualnetwork",
    location: "eastus",
    resourceGroup: rgOptions.resourceGroupName,
    addressSpace: { 
        addressPrefixes: ["10.100.0.0/16"]
    }
}

// resource group
const resourceGroup = new azure_native.resources.ResourceGroup(rgOptions.resourceGroupName, rgOptions)

// virtual network 
const virtualNetwork = new azure_native.network.VirtualNetwork(network.name, {
    resourceGroupName: network.resourceGroup,
    location: network.location,
    virtualNetworkName: network.name,
    addressSpace: { 
        addressPrefixes: [network.addressSpace.addressPrefixes[0]]
    }
})

//subnets 
const appGatewaySubnet = createSubnets("appGatewaySubnet", "10.100.1.0/24")
const frontendSubnet = createSubnets("frontendSubnet", "10.100.2.0/24")
const apiSubnet = createSubnets("apiSubnet", "10.100.3.0/24")

//private DNS zone 
const privateDnsZone = new azure_native.network.PrivateZone("lbabay.com", { 
    location: "Global",
    privateZoneName: "lbabay.com",
    resourceGroupName: resourceGroup.name
})


//ACR registry 
const privateRegistry = new azure_native.containerregistry.Registry("casinomern", { 
    adminUserEnabled: true, 
    location: rgOptions.location, 
    registryName: "casinomern", 
    resourceGroupName: resourceGroup.name,
    sku: { 
        name: "Standard"
    }
})

//azure app service plan 
const appServicePlan = new azure_native.web.AppServicePlan("asp", { 
    resourceGroupName: resourceGroup.name, 
    kind: "App",
    sku: { 
        name: "B1",
        tier: "Basic"
    }
})





// fuctions 

function createSubnets(name: string, addressPrefix: string): string { 
    let subnet = new azure_native.network.Subnet(`subnet-${name}`, { 
        addressPrefix: addressPrefix,
        resourceGroupName: resourceGroup.name,
        subnetName: name,
        virtualNetworkName: virtualNetwork.name
    })
    return `${subnet}`
}






