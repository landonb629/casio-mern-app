import * as pulumi from "@pulumi/pulumi";
import * as azure_native from "@pulumi/azure-native";

// Create an Azure Resource Group
const rgName = "testingResourceGroups"

const rgOptions = { 
    location: "eastus",
    resourceGroupName: rgName
}

const network = { 
    name: "testing-virtualnetwork",
    location: "eastus",
    resourceGroup: rgName,
    addressSpace: { 
        addressPrefixes: ["10.100.1.0/24"]
    }

}
const resourceGroup = new azure_native.resources.ResourceGroup(rgName, rgOptions)

const virtualNetwork = new azure_native.network.VirtualNetwork(network.name, {
    resourceGroupName: network.resourceGroup,
    location: network.location,
    virtualNetworkName: network.name,
    addressSpace: { 
        addressPrefixes: [network.addressSpace.addressPrefixes[0]]
    }
})





