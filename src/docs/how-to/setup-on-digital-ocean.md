---
title: How to setup an Ethereum node on Digital Ocean
---

# How to setup an Ethereum node on Digital Ocean

![](https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/DigitalOcean_logo.svg/150px-DigitalOcean_logo.svg.png)

## Introduction

Digital Ocean (DO) is a cloud computing service and an alternative to AWS, GCP, or Azure. Cloud computing uses remote resources, saving organizations the cost of servers and other equipment. Where applicable, additional documentation will be referenced throughout this tutorial. If you have trouble on a step, then feel free to review the provided [resources](##resources).

## What you'll learn

- Setup and interact with an Ubuntu-LTS instance on DO.
- Setup Core-geth node software on the Ubuntu-LTS instance.
- Run Core-geth to provide the ETC, ETH, or related test networks.

## Step 01 - Create a DO account

1. Click [here](https://m.do.co/c/0ed3a5faf2f6) to create a DO account.

## Setp 02 - Create a new project

1. In the control panel's main menu, under the __Projects__ section, click __+ New Project__ to open the project creation page or use this quick link: https://cloud.digitalocean.com/projects/new? [1]. Eg: "ethereum".

## Step 03 - Create a new Droplet

1. From the __Create__ menu in the top right of the control panel click __Droplets__ or use this quick link: https://cloud.digitalocean.com/droplets/new? [2].
2. Choose an Ubuntu-LTS image and a plan with at least 4 GB RAM.
3. Add storage volume if running _EthClassic_ or _Ethereum_ mainnets.
4. Choose SSH-key authentication.
5. Choose a hostname. eg: "mordor-testnet", "kotti-testnet", "etc-mainnet", "eth-mainnet", or simply something descriptive to the purpose.
6. Choose desired region.
7. Add the droplet to a project. eg: "ethereum".
8. Click __Create__.

## Step 04 - Initial server setup

At this point a fresh Ubuntu-LTS server is created. Before installing Core-geth, some optimizations to connect to the server should be done as well as creating a user.

1. Complete [this](https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-18-04) initial Ubuntu server setup guide [3]. When proper connectivity and user is setup then proceed.
2. Update packages and dependecies
```shell
sudo apt-get update && sudo apt-get upgrade
```

## Step 05 - Install Core-geth

There are multiple options to install and run Core-geth from binary, docker, or building from source [4]. This step will cover installation via release binary.

1. Download _latest_ release for linux
```shell
wget https://github.com/etclabscore/core-geth/releases/download/v1.11.4/core-geth-linux-v1.11.4.zip
```
2. Unzip the arhive content to `/bin/` directory. This will put the executable `geth` binary into the /bin/ directory.
```
sudo unzip core-geth-linux-v1.11.4.zip -d /bin/
```
3. Check installation
```shell
geth version
```

## Step 06 - Run a network

Core-geth is a distribution of the Ethereum Foundation's official Go-Ethereum (Geth) client with more features, such as, running both _EthClassic_ & _Ethereum_ related networks. To view all available usage and commands run `geth --help`.

Available networks flags:

```shell
  --classic                           Ethereum Classic network: pre-configured Ethereum Classic mainnet
  --mordor                            Mordor network: Ethereum Classic cross-client proof-of-work test network
  --social                            Ethereum Social network: pre-configured Ethereum Social mainnet
  --mix                               MIX network: pre-configured MIX mainnet
  --ethersocial                       Ethersocial network: pre-configured Ethersocial mainnet
  --rinkeby                           Rinkeby network: pre-configured proof-of-authority test network
  --kotti                             Kotti network: cross-client proof-of-authority test network
  --goerli                            Görli network: pre-configured proof-of-authority test network
  --rinkeby                           Rinkeby network: pre-configured proof-of-authority test network
  --ropsten                           Ropsten network: pre-configured proof-of-work test network
```

Run `geth --classic` for EthClassic mainnet or `--mordor`, `--kotti` for related testnet. Running `geth <commands>` will begin to sync the blockchain in the current terminal session. To run the process in the background than the foreground simply run geth with `nohup`.  eg: `nohup geth <commands> &`

## Dive deep

- DO Load Balanders: https://www.digitalocean.com/products/load-balancer/
- Do Monitoring: https://www.digitalocean.com/docs/monitoring/
- Go-Ethereum docs: http://geth.ethereum.org/
   
## Sources

1. https://www.digitalocean.com/docs/projects/how-to/create/
2. https://cloud.digitalocean.com/droplets/new?
3. https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-18-04 
4. https://core-geth.org/install