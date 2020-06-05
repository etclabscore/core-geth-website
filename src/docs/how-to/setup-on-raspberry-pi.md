---
title: How to setup an Ethereum node on Raspberry Pi
---

# How to setup an Ethereum node on Raspberry Pi

<!-- ## Introduction

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

## Step 03 - Initial Server Setup

After completing Step 03 

1. Update & upgrade Ubuntu system & other software.
   
    ```shell
    sudo apt update
    ```

    ```shell
    sudo apt upgrade
    ```
    Install _unzip_

    ```shell
    sudo apt install unzip
    ```
    Setup _go-lang_

    ```shell
    sudo snap install go --classic
    ```
    Install _make_

    ```shell
    sudo apt install make
    ```
    Install _htop_

    ```shell
    sudo apt install htop
    ```

    Install build-essentials

    ```shell
    sudo apt-get install build-essential
    ```

2. Assign a static IP address.

    View IP address

    ```shell
    ip addr show
    ```

    You may see a dynamic IP address (the same IP used to SSH) has been assigned to interface card "__eth0__". To make this IP address static, edit the netplan configuration file "__/etc/netplan/50-cloud-init.yaml__” using _vim_, _nano_, _vi_, or whatever terminal text editor you prefer.

    ```yaml
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

    ```shell
    sudo vim /etc/netplan/50-cloud-init.yaml
    ```

    Vim tip: `i` to enter insert mode to begin editing the text. `Esc` to exit insert mode. `:wq` to save the changes.

    Apply the new netplan

    ```shell
    sudo netplan apply
    ```

    Check the changes were applied

    ```shell
    ip addr show && ip route show
    ```

    Reboot

    ```shell
    sudo reboot
    ```

## Step 04 - Mount HDD/ SSD.

Storing the state of the blockchain requires more sufficient memory resources. Extending memory resources to the Raspberry Pi is quite simple since it has many USB ports to plug in an external HHD/ SSD, RAID, NAS, or whatever storage configuration you prefer.

1. Identify the disk. It will be /dev/<name>. In many cases it's /dev/sda or /dev/sda1, /dev/sda2, etc...

    ```shell
    sudo fdisk -l
    ```
    
    Create a partition for the disk.

    ```shell
    sudo mkfs.ext4 /dev/sda
    ```
2. Mount the disk
   
    ```shell
    sudo mkdir /mnt/ssd
    sudo chown -R ubuntu:ubuntu /mnt/ssd/ # "ubuntu" is the default hostname
    sudo mount /dev/sda /mnt/ssd # mount the disk "dev/sda" to "/mnt/ssd"
    ```

3. Automatically mount disk on startup

    Get the unique ID of the disk (`UUID="<the-unique-id>"`)

    ```shell
    sudo blkid
    ```

    Edit the `/etc/fstab` file, inserting the below example at the end of the file.

    ```shell
    sudo vim /etc/fstab
    ```

    Insert __UUID=b2907e9d-1a37-4f26-8d43-b51ff3e1c66f /mnt/ssd ext4 defaults 0 0__ at the end of the file with _your_ disks UUID.

    Reboot

    ```shell
    sudo reboot
    ```

    Check the disk was mounted

    ```shell
    df -ha /dev/sda
    ```

## Step 05 - Add Swap Space

    Swap is a space on a disk that is used when the amount of physical RAM memory is full. Geth can consume a lot of memory during sync and setting up a Swap helps mitigate out-of-memory errors.

   1. Since the device is Ubuntu-LTS, simply follow this external tutorial on adding Swap space to your Ubuntu: https://www.digitalocean.com/community/tutorials/how-to-add-swap-space-on-ubuntu-20-04 

## Step 05 - Install Core-geth

   1. Build from source
   
   Clone the repo & change directory into the source

   ```shell
   git clone https://github.com/etclabscore/core-geth.git && cd core-geth/
   ```

   Make_ geth

   ```shell
   make geth (this may take a minute)
   ```

   Move the built `geth` binary to the `/bin/` directory

   ```shell
   sudo mv ~/core-geth/build/bin/geth /bin/
   ```

   2. Check installation
   
   ```shell
   geth version
   ```

   View usage and commands

   ```shell
   geth --help
   ```

   Congrats Core-geth is installed!

## Step 06 - Run Core-geth

    By default, geth will store data in `~/.ethereum/geth/` on the microSD card, but you want to store data on the external disk space NOT the SD card.

    The `--datadir <PATH>` tells geth to use a specific directory (your external disk).

    The `--cache <VALUE>` tells geth to use a set amount of RAM in Megabytes. Since the device has 4 GB of RAM, `--cache 256` should mitigate out-of-memory errors, but might not be required if Swap memory is setup.

    The `--syncmode fast` tells geth to synchronise in __fast__ mode. 

   1. Create a data directory on the external disk. It's best practice to name the directory based on the specific network to be run.
   
   Make the data directory

   ```shell
   sudo mkdir /mnt/ssd/ethereum/ # ethereum example

   sudo mkdir /mnt/ssd/classic/ # ethereum classic example
   ```

   Run `geth <commands> <datadirectory>`

   ```shell
   geth --syncmode fast --cache 256 --datadir /mnt/ssd/ethereum # ethereum

   geth --classic --syncmode fast --cache 256 --datadir /mnt/ssd/classic # ethereum classic
   ```

   By default, Geth runs in the foreground of the terminal/ command prompt. To run geth in the background simply use `nohup` in the beginning and `&` at the end of the command. Example:
   
   ```shell
   nohup geth --classic --syncmode fast --cache 256 --datadir /mnt/ssd/classic # ethereum classic &
   ```

   2. Check geth process is running and current resource consumption using `htop`
   
    ```shell
    htop
    ```
    
    `Ctrl` + `Z` to exit htop. -->