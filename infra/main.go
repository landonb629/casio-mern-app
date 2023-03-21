package main

import (
	"github.com/pulumi/pulumi-azure/sdk/v5/go/azure/core"
	"github.com/pulumi/pulumi-azure/sdk/v5/go/azure/network"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
	
)

func main() {
	vnet_cidr := "10.100.0.0/16"
	pulumi.Run(func(ctx *pulumi.Context) error {
		// resource group
		casinoRG, err := core.NewResourceGroup(ctx, "casinorg", &core.ResourceGroupArgs{
			Location: pulumi.String("East US"),

		})
		if err != nil { 
			return err
		}
		// virtual network 
		_, err = network.NewVirtualNetwork(ctx, "casino-virtual-network", &network.VirtualNetworkArgs{ 
			Location: casinoRG.Location, 
			ResourceGroupName: casinoRG.Name, 
			AddressSpaces: pulumi.StringArray{ 
				pulumi.String(vnet_cidr),
			},
		})
		if err != nil { 
			return err
		}
		return nil
		
	})
}
