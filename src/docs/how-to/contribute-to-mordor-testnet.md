---
title: How to contribute to Mordor Testnet
---

# How to contribute to Mordor Testnet

![mordor-banner](https://github.com/stevanlohja/ETC_Gifs/raw/master/mordor_testnet/mordor_logo.png?raw=true)

Mordor is a PoW Ethereum Classic testnet. A testnet allows developers to perform specific tests. Developers may want to test protocol changes, test a smart contract, or interact with the network in anyway that does not require real EthClassic (ETC)—just don’t test on mainnet, mainnet is for production.

## Summary:

- Install Core-geth https://core-geth.org/install
- Create an account on `--mordor`
- Run `--mordor` with `--mine` enabled

## Install Core-geth

- https://core-geth.org/install

Running `geth --help` will show a plentiful amount of usage and commands. Under `ETHEREUM OPTIONS:` you’ll see all the Ethereum Classic, Ethereum, and related testnet flags. We need to use the `--mordor` flag when we rungeth.

## Create an account on Mordor

Mordor is a PoW testnet, so we can make an account to mine and receive testnet-ETC. Creating a new account in geth will create a public/private key pair and you’ll be prompted to create a password for that account.

```shell
geth --mordor account new
```

## List the account(s)

```shell
geth --mordor account list
```

You’ll notice listing the account will print the keystore file location. For example: `keystore:///home/USER/.ethereum/mordor/keystore/UTC...`

## Run Mordor with Mining Enable

Now, we can run `geth`, but that would not be meaninful. We need to tell geth to run Mordor, mine testnet-ETC, and of course we'll add some optional connectivity commands/ flags.

Run mordor testnet with mining and rpc enabled. We want to enable mining to mine testnet ETC and enable RPC to access our node.

```shell
geth --mordor --miner.extradata "stev" --mine --minerthreads=1 --etherbase 0x11039699406158d152b5ca1b69d31dd20aae9379 --rpc --rpcport "8545" --port "30303" --rpccorsdomain "*" --nat "any" --rpcapi eth,web3,personal,net
```

This command will initialize `geth` to run a `--mordor` node. We'll provide a short string identifying our miner (or pool) on the network  `--miner.extradata "NAME"`, enable `--mine` and configure the nuumber of CPU threads we want mining `--minerthreads=1`. Now, we'll specify the mining address `--etherbase 0x11039699406158d152b5ca1b69d31dd20aae9379`. Geth will send mining rewards to the default account (Account #0) if `--etherbase` is not defined. Finally, we can add to optional connectivity `--rpc --rpcport "8545" --port "30303" --rpccorsdomain "*" --nat "any" --rpcapi eth,web3,personal,net`. By enabling RPC we can communicate with our node with other tools and services.

## Check Mordor Balance on Expedition.dev

So, you’re running a Mordor node and mining testnet ETC. Woohoo! An easy way to double check you’re actually growing a Mordor testnet balance is on Expedition.dev https://expedition.dev/?network=mordor. Just search the account address you created earlier.

### Connect your node to Expedition.dev

If you enabled RPC connectivity to your node. You can have Expedition connect directly with your node. This has plenty of benefits for a development enviorment. However, you can use it to determine immeditate node information such as; current block height, chainID, mining stats, etc...

Simply pass your node's RPC endpoint `?rpcUrl=http://localhost:8545` in the url like so:

```shell
https://expedition.dev/?rpcUrl=http://localhost:8545
```

## Add your Mordor Account to a Wallet?

You can use your keystore file to import your wallet into a wallet application such as MetaMask. In MetaMask
- Select `localhost:8545` under network selection. This will connect the wallet to your local Mordor node.
- Under your account profile select _import account_ > _select type (JSON)_ > _upload_ your keystore file. You may need to enter the account password.

## Tip (optional)

One way to avoid typing or copy and pasting this

```shell
geth --mordor --rpc --rpcaddr "localhost" --rpcport 8545 --mine --minerthreads 1
```

is creating a shell script file. `touch start-mordor.sh` to create the file `&& echo “the contents”` into the shell script file `&& chmod +x filename.sh` to add executible permissions.

```shell
touch start-mordor.sh && echo "geth --mordor --miner.extradata "stev" --mine --minerthreads=1 --etherbase 0x11039699406158d152b5ca1b69d31dd20aae9379 --rpc --rpcport "8545" --port "30303" --rpccorsdomain "*" --nat "any" --rpcapi eth,web3,personal,net" >start-mordor.sh && chmod +x start-mordor.sh
```

Run it 

```shell
./start-mordor.sh
```

Stop it

`Ctrl + C`

## More Mordor Resources

- Chat Core-geth on Gitter https://gitter.im/core-geth/community
- Mordor block explorer: https://expedition.dev/?network=mordor
- Mordor faucet: http://mordor.canhaz.net/, http://mordor.etherdrip.net
- Free end-point: https://www.ethercluster.com/mordor