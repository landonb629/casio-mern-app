import * as pulumi from "@pulumi/pulumi";
import * as azure_native from "@pulumi/azure-native";

//subnets function
export function createSubnets(name: string, addressPrefix: string): string { 
    let subnet = new azure_native.network.Subnet(`subnet-${name}`, { 
        addressPrefix: addressPrefix,
        resourceGroupName: resourceGroup.name,
        subnetName: name,
        virtualNetworkName: virtualNetwork.name
    })
    return `${subnet}`
}



