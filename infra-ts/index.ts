import * as pulumi from "@pulumi/pulumi";
import * as azure_native from "@pulumi/azure-native";
import createSubnets as createSubnets from "./functions.ts"

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






