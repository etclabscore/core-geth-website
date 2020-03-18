---
title: install
---

# Install Core-geth

There's a variety of options to install Core-geth. Choose your destiny!

## Binary

If you just want to download and run geth or any of the other tools here, this is the quickest and simplest way. Binary archives are published at https://github.com/etclabscore/core-geth/releases.

- Find & download latest [release](https://github.com/etclabscore/core-geth/releases) for your operating system
- Download it, (check the SHA sum).
- Unarchive it, and run!

Linux

```shell
wget https://github.com/etclabscore/core-geth/releases/download/v1.11.1/core-geth-linux.zip # download binary release
sudo unzip core-geth-linux.zip -d /bin/ # unzip and select destination
geth --help # check install, view usage & commands
```

## Docker

Docker is one of the easiest ways to install Core-geth on your machine. Docker images are automatically [published on Docker Hub](https://hub.docker.com/r/etclabscore/core-geth/tags). All runnable examples below are for images limited to `geth`. For images including the full suite of tools available from this source, use the Docker Hub tag prefix `alltools.`, like `etclabscore/core-geth:alltools.latest`, or the associated Docker file directly `./Dockerfile.alltools`.

- Docker pull the latest image. 
- Docker run the image with desired arguments.
- Optionally, you can build the docker from source.

```shell
docker pull etclabscore/core-geth:latest # pull latest image
```

Alternatively, you can pull an image based on the version tag of the "docker image":

```shell
docker pull etclabscore/core-geth:version-1.11.1 # pull image based on specific <tag>
```

or build from image from source:

```shell
git clone https://github.com/etclabscore/core-geth.git
cd core-geth
docker build -t=core-geth .
```

Or with all tools:

```shell
docker build -t core-geth-alltools -f Dockerfile.alltools .
```

Finally, run the Core-geth image with `Docker run` and desired arguments:

```shell
docker run -d \
    --name core-geth \
    -v $LOCAL_DATADIR:/root \
    -p 30303:30303 \
    -p 8545:8545 \
    etclabscore/core-geth \
    --classic \
    --rpc --rpcport 8545
```

This will start `geth` in fast-sync mode with a DB memory allowance of 1GB just as the
above command does.  It will also create a persistent volume in your `$LOCAL_DATADIR` for
saving your blockchain, as well as map the default devp2p and JSON-RPC API ports.

Do not forget `--rpcaddr 0.0.0.0`, if you want to access RPC from other containers
and/or hosts. By default, `geth` binds to the local interface and RPC endpoints is not
accessible from the outside.

## Build from Source

- Make sure your system has __Go__ installed. Version 1.13+ is recommended. https://golang.org/doc/install
- Make sure your system has a C compiler installed. For example, with Linux Ubuntu:

```shell
sudo apt-get install -y build-essential
```

Once the dependencies are installed, it's time to clone and build the source:

```shell
git clone https://github.com/etclabscore/core-geth.git
cd core-geth
make all
./build/bin/geth --help
```