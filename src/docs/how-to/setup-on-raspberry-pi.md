---
title: How to setup an Ethereum node on Raspberry Pi
---

# How to setup an Ethereum node on Raspberry Pi

![](https://duckduckgo.com/i/0c1be8ce.png)

## Introduction

Raspberry Pi is a small single board computer that can be used to run a local Ethereum node. While many users operate nodes with cloud service providers, this can be expensive overtime, especially for full nodes of the mainnet, but Raspberry Pi has a low barrier to entry to get started with a local node setup. Raspberry Pi, and other single board computers, consume far less energy than a tradtional server or desktop machine and a Raspberry Pi's storage can be expanded through external hard drive solutions; NAS, RAID, and other external storage.

## What you'll learn

- Setup a Rasberry Pi 4 Model B with Ubuntu-LTS & Core-geth
- Run Core-geth to provide the ETC, ETH, or related test networks.

## Step 01 - Requirements

- __Computer__: A computer to setup your microSD card and remotely access the Raspberry Pi.
- __Internet__: An internet connection to provide internet via Wifi or Etherent cable (recommend) to the Raspberry Pi.
  - Ethernet cable (optional/ recommended) : To connect the Raspberry Pi to internet.
- __Raspberry Pi 4 Model B / 4 GB RAM__: Core-geth requires a minimum of 4 GB of RAM. On full size servers, you can get away with 2 GB RAM with additional Swap memory, but at least 4 GB is recommended.
  - __USB-C 5.1V 3A Power Supply__: To supply the Pi with power.
  - __Micro SD Card \>= 16 GB__: The SD Card stores the operating system ready to use in the Raspberry Pi device.
    - __External HDD/ SSD (optional/ required for mainnet)__: A much larger microSD card can work for testnets, but mainnet requires hundreds of GB to TB and the state of the blockchain continues to grow. Ethereum full node sizes are significantly smaller https://etherscan.io/chartsync/chaindefault than Ethereum archival node https://etherscan.io/chartsync/chainarchive. Ethereum Classic is significantly smaller than Ethereum.

## Step 02 - Install Ubuntu on your Raspberry Pi

1. Complete the [How to install Ubuntu on your Raspberry Pi](https://ubuntu.com/tutorials/how-to-install-ubuntu-on-your-raspberry-pi) guide.

If you're having trouble determining the Raspberry Pi's IP address to SSH into it, then try using `nmap` as explained [here](https://www.raspberrypi.org/documentation/remote-access/ip-address.md).

![](https://user-images.githubusercontent.com/10556209/84100324-3de68d00-a9d1-11ea-9c51-df991048c613.gif)


## Step 03 - Initial Server Setup

After completing Step 02, you should be able to remotely access the Raspberry Pi. Let's just call in an Ubuntu server for now. At this point the Ubuntu server is still fresh and requires some optimizations and software.

### 1. Update & upgrade Ubuntu system & other software.

![updatesystem deps](https://user-images.githubusercontent.com/10556209/84285511-2c050700-ab03-11ea-979c-51d1b0043943.gif)

Update the operating system
```
sudo apt-get update && sudo apt-get upgrade
```

Install _unzip_
```
sudo apt install unzip
```

Setup _go-lang_
```
sudo snap install go --classic
```

Install _make_
```
sudo apt install make
```

Install _htop_
```
sudo apt install htop
```

Install build-essentials
```
sudo apt-get install build-essential
```

### 2. Assign a static IP address.

![edit-netplan](https://user-images.githubusercontent.com/10556209/84286654-99fdfe00-ab04-11ea-92c7-1e4ba9ca077e.gif)

View IP address
```
ip addr show
```

You may see a dynamic IP address (the same IP used to SSH) has been assigned to interface card "__eth0__". To make this IP address static, edit the netplan configuration file "__/etc/netplan/50-cloud-init.yaml__” using _vim_, _nano_, _vi_, or whatever terminal text editor you prefer.

```
network:
        ethernets:
            eth0:
                addresses: [192.168.1.144/24]
                gateway4: 192.168.1.1
                nameservers:
                    addresses: [4.2.2.2, 8.8.8.8]
        version: 2
```  
    
Using _your_ IP address and the example yaml file above. Edit __/etc/netplan/50-cloud-init.yaml__ in _vim_
```    
sudo vim /etc/netplan/50-cloud-init.yaml
```

Vim tip: `i` to enter insert mode to begin editing the text. `Esc` to exit insert mode. `:wq` to save the changes.

Apply the new netplan
```
sudo netplan apply
```

Check the changes were applied
```
ip addr show && ip route show
```

Reboot
```
sudo reboot
```

## Step 04 - Mount HDD/ SSD.

Storing the state of the blockchain requires more sufficient memory resources. Extending memory resources to the Raspberry Pi is quite simple since it has many USB ports to plug in an external HHD/ SSD, RAID, NAS, or whatever storage configuration you prefer.

### 1. Identify the disk & Mount the disk 

It will be "/dev/sda". In many cases it's "/dev/sda" or "/dev/sda1", "/dev/sda2", etc...

List available disks

```
sudo fdisk -l
```
    
Create a partition for the disk.

```
sudo mkfs.ext4 /dev/sda
```

Mount the disk

```   
sudo mkdir /mnt/ssd

sudo chown -R ubuntu:ubuntu /mnt/ssd/ # "ubuntu" is the default hostname

sudo mount /dev/sda /mnt/ssd # mount the disk "dev/sda" to "/mnt/ssd"
```   

### 2. Automatically mount disk on startup

Get the unique ID of the disk (`UUID="<the-unique-id>"`)

```
sudo blkid
```

Edit the `/etc/fstab` file, inserting the below example at the end of the file.

```
sudo vim /etc/fstab
```

Insert "`UID=b2907e9d-1a37-4f26-8d43-b51ff3e1c66f /mnt/ssd ext4 defaults 0 0`" at the end of the file with _your_ disks UUID.

Reboot

```
sudo reboot
```

Check the disk was mounted

```
df -ha /dev/sda
```

## Step 05 - Add Swap Space

    Swap is a space on a disk that is used when the amount of physical RAM memory is full. Geth can consume a lot of memory during sync and setting up a Swap helps mitigate out-of-memory errors.

   1. Since the device is Ubuntu-LTS, simply follow this external tutorial on adding Swap space to your Ubuntu: https://www.digitalocean.com/community/tutorials/how-to-add-swap-space-on-ubuntu-20-04 

## Step 05 - Install Core-geth

### 1. Build from source

![installgeth](https://user-images.githubusercontent.com/10556209/84288443-d16daa00-ab06-11ea-9da7-42ee808ff9d7.gif)
   
Clone the repo & change directory into the source

```
git clone https://github.com/etclabscore/core-geth.git && cd core-geth/
```

Make_ geth

```
make geth (this may take a minute)
```

Move the built `geth` binary to the `/bin/` directory

```
sudo mv ~/core-geth/build/bin/geth /bin/
```

### 2. Check installation
   
```
geth version
```

View usage and commands

```
geth --help
```

Congrats Core-geth is installed!

## Step 06 - Run Core-geth

By default, geth will store data in `~/.ethereum/geth/` on the microSD card, but you want to store data on the external disk space NOT the SD card.

The `--datadir <PATH>` tells geth to use a specific directory (your external disk).

The `--cache <VALUE>` tells geth to use a set amount of RAM in Megabytes. Since the device has 4 GB of RAM, `--cache 256` should mitigate out-of-memory errors, but might not be required if Swap memory is setup.

The `--syncmode fast` tells geth to synchronise in __fast__ mode. 

### 1. Create a data directory on the external disk. 

It's best practice to name the directory based on the specific network to be run.
   
Make the data directory

```
sudo mkdir /mnt/ssd/ethereum/ # ethereum example

sudo mkdir /mnt/ssd/classic/ # ethereum classic example
```

### 2. Run `geth <commands> <datadirectory>`

```
geth --syncmode fast --cache 256 --datadir /mnt/ssd/ethereum # ethereum

geth --classic --syncmode fast --cache 256 --datadir /mnt/ssd/classic # ethereum classic
```

By default, Geth runs in the foreground of the terminal/ command prompt. To run geth in the background simply use `nohup` in the beginning and `&` at the end of the command. Example:
   
```
nohup geth --classic --syncmode fast --cache 256 --datadir /mnt/ssd/classic # ethereum classic &
```

Check geth process is running and current resource consumption using `htop`
   
```
htop
```
    
`Ctrl` + `Z` to exit htop.

# Some tips

#### View syncing status using Geth Console

![view-sync-status](https://user-images.githubusercontent.com/10556209/84289898-a97f4600-ab08-11ea-97f9-7216206958a3.gif)

```
sudo geth attach ipc:/mnt/ssd/classic/geth.ipc

# once entered in the geth console use "eth.syncing" to return current syncing status

> eth.syncing

# type "exit" to exit the geth console
```