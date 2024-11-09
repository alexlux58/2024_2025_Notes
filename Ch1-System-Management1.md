### Question 1

Which command is used to load a module and its dependencies automatically?

- A. `modprobe`
- B. `insmod`
- C. `lsmod`
- D. `rmmod`

<details>
<summary style="color: red;">Answer</summary>

A. `modprobe`. The `modprobe` command is used to load a module along with its dependencies automatically.

**Explanation:**
`modprobe` is more advanced than `insmod` because it loads not just the module, but also any other modules it depends on, ensuring all required components are active. `lsmod` lists the currently loaded modules, and `rmmod` is used to remove a module.

**Domain:**
System Management

</details>

---

### Question 2

Which option given at boot time within the GRUB2 boot entry configuration will boot the system into single-user mode?

- A. `single-user`
- B. `su`
- C. `single`
- D. `root`

<details>
<summary style="color: red;">Answer</summary>

C. `single`. Adding the `single` option to the kernel line in GRUB2 boots the system into single-user mode.

**Explanation:**
Single-user mode is a minimal mode primarily used for maintenance tasks. It boots the system with only the essential services and does not start the networking services. The `single` option is used to boot the system into single-user mode. The `su` command is used to switch to another user account, and the `root` option is not a valid option for booting into single-user mode.

**Domain:**
System Management

</details>

---

### Question 3

What is the command to display the default target on a computer running systemd?

- A. `systemctl get-default`
- B. `update-rc.d defaults`
- C. `systemctl defaults`
- D. `systemctl runlevel`

<details>
<summary style="color: red;">Answer</summary>

A. `systemctl get-default`. The `systemctl get-default` command displays the default target (runlevel) of a system running systemd.

**Explanation:**
The `systemctl get-default` command is used in a systemd-based system to determine which target (the systemd equivalent of runlevels) is set to boot by default. The `update-rc.d defaults` command is used to enable or disable services in the System V init system. The `systemctl defaults` and `systemctl runlevel` commands are not valid commands.

**Domain:**
System Management

</details>

---

### Question 4

Which command is used to obtain a list of USB devices?

- A. `lsusb`
- B. `usblist`
- C. `usbdevices`
- D. `usbinfo`

<details>
<summary style="color: red;">Answer</summary>

A. `lsusb`. The `lsusb` command is used to obtain a list of USB devices.

**Explanation:**
The `lsusb` command lists USB devices connected to the system. The `usblist`, `usbdevices`, and `usbinfo` commands are not valid commands.

**Domain:**
System Management

</details>

---

### Question 5

Which command can be used to obtain a list of currently loaded kernel modules?

- A. `lsmod`
- B. `modlist`
- C. `insmod`
- D. `ls--modules`

<details>
<summary style="color: red;">Answer</summary>

A. `lsmod`. The `lsmod` command is used to obtain a list of currently loaded kernel modules.

**Explanation:**
The `lsmod` command lists the currently loaded kernel modules. The `modlist`, `insmod`, and `ls--modules` commands are not valid commands. The `insmod` command is used to load a module into the kernel.

**Domain:**
System Management

</details>

---

### Question 6

When running with a Unified Extensible Firmware Interface (UEFI) system, to which partition will the EFI system partition typically be mounted?

- A. `/boot`
- B. `/efi`
- C. `/boot/efi`
- D. `/boot/efi/system`

<details>
<summary style="color: red;">Answer</summary>

C. `/boot/efi`. The EFI system partition is typically mounted to `/boot/efi` when running with a UEFI system.

**Explanation:**
The EFI system partition is a partition on a data storage device that is used by machines that adhere to the UEFI specification. The EFI system partition is typically mounted to `/boot/efi` when running with a UEFI system. The `/boot`, `/efi`, and `/boot/efi/system` directories are not typically used for the EFI system partition. The `/boot` directory is used for the boot partition, and the `/efi` directory is not a standard directory for the EFI system partition. The `/boot/efi/system` directory is not a standard directory for the EFI system partition.

**Domain:**
System Management

</details>

---

### Question 7

Assuming that a USB disk contains a single partition and is made available on /dev/sdb, which command mounts the disk in /media/usb?

- A. `mount /dev/sdb /media/usb`
- B. `mount /dev/sdb1 /media/usb`
- C. `mount /media/usb /dev/sdb`
- D. `mount /media/usb /dev/sdb1`

<details>
<summary style="color: red;">Answer</summary>

B. `mount /dev/sdb1 /media/usb`. The `mount /dev/sdb1 /media/usb` command mounts the disk in `/media/usb`.

**Explanation:**
The `mount /dev/sdb1 /media/usb` command mounts the disk in `/media/usb`. The `mount /dev/sdb /media/usb` command is incorrect because it does not specify the partition number and drive partitions begin at number 1, making the first partition number 1. The `mount /media/usb /dev/sdb` and `mount /media/usb /dev/sdb1` commands are incorrect because the source and destination are reversed. The source should be the device file, and the destination should be the mount point. The correct command is `mount /dev/sdb1 /media/usb`.

**Domain:**
System Management

</details>

---

### Question 8

What is one reason a device driver does not appear in the output of lsmod, even though the device is loaded and working properly?

- A. The use of systemd means drivers are not required for most devices.
- B. The user of an initrd.img means support is enabled by default.
- C. The system does not not need a driver for the device.
- D. Support for the device has been compiled into the kernel.

<details>
<summary style="color: red;">Answer</summary>

D. Support for the device has been compiled into the kernel. One reason a device driver does not appear in the output of `lsmod`, even though the device is loaded and working properly, is that support for the device has been compiled into the kernel.

**Explanation:**
When a device driver is compiled into the kernel, it is not loaded as a module and does not appear in the output of `lsmod`. The use of systemd, the use of an `initrd.img`, and the system not needing a driver for the device are not reasons a device driver does not appear in the output of `lsmod`. The use of systemd does not mean drivers are not required for most devices. The use of an `initrd.img` does not mean support is enabled by default. The system needing a driver for the device is not a reason a device driver does not appear in the output of `lsmod`. The correct reason is that support for the device has been compiled into the kernel.

**Domain:**
System Management

</details>

---

### Question 9

Which option to rmmod will cause the module to wait until it's no longer in use to unload the module?

- A. `-test`
- B. `-b`
- C. `-w`
- D. `unload`

<details>
<summary style="color: red;">Answer</summary>

C. `-w`. The `-w` option to `rmmod` will cause the module to wait until it is no longer in use to unload the module.

**Explanation:**
The `-w` option to `rmmod` will cause the module to wait until it is no longer in use to unload the module. The `-test`, `-b`, and `unload` options are not valid options for `rmmod`.

**Domain:**
System Management

</details>

---

### Question 10

Which command will output a new GRUB configuration file and send the output to the correct location for booting?

- A. `update-grub`
- B. `update-grub boot > /boot/grub.cfg`
- C. `grub-rc.d`
- D. `grub-boot`

<details>
<summary style="color: red;">Answer</summary>

A. `update-grub`. The `update-grub` command will output a new GRUB configuration file and send the output to the correct location for booting.

**Explanation:**
The `update-grub` command will output a new GRUB configuration file and send the output to the correct location for booting. `update-grub` is an alias or shortcut for the `grub-mkconfig -o /boot/grub/grub.cfg` command. The `update-grub boot > /boot/grub.cfg`, `grub-rc.d`, and `grub-boot` commands are not valid commands.

**Domain:**
System Management

</details>

---

### Question 11

What is the maximum member of primary partitions available on MBR partitioning sysytem?

- A. Two
- B. Four
- C. One
- D. Five

<details>
<summary style="color: red;">Answer</summary>

B. `Four`. MBR-based disks can be partitioned with up to four primary partitions, one of which can be further partitioned or extended into logical partitions.

**Explanation:**
MBR-based disks can be partitioned with up to four primary partitions, one of which can be further partitioned or extended into logical partitions. The other options are incorrect.

**Domain:**
System Management

</details>

---

### Question 12

When working with disk partitions through a tool like fdisk, you see the type 0x82. Which type of partition is this?

- A. Linux swap
- B. Linux filesystem
- C. Windows filesystem
- D. EFI system partition

<details>
<summary style="color: red;">Answer</summary>

A. `Linux swap`. The type 0x82 is used to identify a Linux swap partition. While 0x83 is used for Linux Filesystem. NTFS (0x07) and FAT32 (0.0c) are used for Windows filesystem and 0xEF is used for EFI system partition.

**Explanation:**
The type 0x82 is used to identify a Linux swap partition. The other options are incorrect.

**Domain:**
System Management

</details>

---

### Question 13

Which file should you edit when using GRUB2 in order to define or set options like the timeout?

- A. `/etc/grub.conf`
- B. `/boot/grub/grub.cfg`
- C. `/etc/default/grub`
- D. `/boot/grub/grub.conf`

<details>
<summary style="color: red;">Answer</summary>

C. `/etc/default/grub`. When using GRUB2, you should edit the `/etc/default/grub` file to define or set options like the timeout.

**Explanation:**
The `/etc/grub.conf`, `/boot/grub/grub.cfg`, and `/boot/grub/grub.conf` files are not used to define or set options like the timeout. The `/etc/grub.conf` file is used in GRUB Legacy, not GRUB2. The `/boot/grub/grub.cfg` file is the GRUB2 configuration file, but it is generated by the `grub-mkconfig` command and should not be edited directly. The `/boot/grub/grub.conf` file is not used in GRUB2. The correct file to edit when using GRUB2 to define or set options like the timeout is `/etc/default/grub`.

**Domain:**
System Management

</details>

---

### Question 14

Which option for the grub2-mkconfig command sends output to a file instead of STDOUT?

- A. `-stdout`
- B. `-o`
- C. `--fileout`
- D. `-f`

<details>
<summary style="color: red;">Answer</summary>

B. `-o`. The `-o` option for the `grub2-mkconfig` command sends output to a file instead of STDOUT.

**Explanation:**
The `-o` option for the `grub2-mkconfig` command sends output to a file instead of STDOUT. The `-stdout`, `--fileout`, and `-f` options are not valid options for the `grub2-mkconfig` command.

**Domain:**
System Management

</details>

---

### Question 15

Of the following choices, which size would be most appropriate for the /boot partition of a Linux system?

- A. At least 1 GB
- B. At least 512 MB
- C. Between 100 MB and 200 MB
- D. /boot should not be partitioned separately

<details>
<summary style="color: red;">Answer</summary>

A. The recommended /boot partition size has increased and it is now recommended to have at least 1 GB of space for the /boot partition.

**Explanation:**
The recommended /boot partition size has increased over time. It is now recommended to have at least 1 GB of space for the /boot partition. The other options are not recommended sizes for the /boot partition. The /boot partition should be large enough to accommodate the kernel and initrd files, as well as any other files that may be needed during the boot process.

**Domain:**
System Management

</details>

---

### Question 16

Which of the following commands initialize a physical disk partition for use with LVM?

- A. `pvcreate`
- B. `vgcreate`
- C. `lvcreate`
- D. `pvdisplay`

<details>
<summary style="color: red;">Answer</summary>

A. `pvcreate`. The `pvcreate` command initializes a physical disk partition for use with LVM.

**Explanation:**
The `vgcreate` command creates a volume group, the `lvcreate` command creates a logical volume, and the `pvdisplay` command displays information about physical volumes. The `pvcreate` command initializes a physical disk partition for use with LVM.

**Domain:**
System Management

</details>

---

### Question 17

Which of the following commands installs GRUB into the MBR of the second SATA disk?

- A. `grub2-config /dev/sda`
- B. `grub2-install /dev/sdb`
- C. `grub-install /dev/sdb1`
- D. `grub-config /dev/sda1`

<details>
<summary style="color: red;">Answer</summary>

B. `grub2-install /dev/sdb`. The `grub2-install /dev/sdb` command installs GRUB into the MBR of the second SATA disk.

**Explanation:**
The `grub2-config /dev/sda`, `grub-install /dev/sdb1`, and `grub-config /dev/sda1` commands are incorrect. The `grub2-install /dev/sdb` command installs GRUB into the MBR of the second SATA disk.

**Domain:**
System Management

</details>

---

### Question 18

Which command is used to create a logical volume with LVM?

A. `lvcreate`
B. `pvcreate`
C. `vgcreate`
D. `lvdisplay`

<details>
<summary style="color: red;">Answer</summary>

A. `lvcreate`. The `lvcreate` command is used to create a logical volume with LVM.

**Explanation:**
The `pvcreate` command initializes a physical disk partition for use with LVM, the `vgcreate` command creates a volume group, and the `lvdisplay` command displays information about logical volumes. The `lvcreate` command is used to create a logical volume with LVM.

**Domain:**
System Management

</details>

---

### Question 19

What is the logical order for creation of an LVM logical volume?

A. Physical volume creation, volume group creation, logical volume creation
B. Volume group creation, physical volume creation, logical volume creation
C. Logical volume creation, volume group creation, physical volume creation
D. Volume group creation, logical volume creation, physical volume creation

<details>
<summary style="color: red;">Answer</summary>

A. Physical volume creation, volume group creation, logical volume creation.

**Explanation:**
The logical order for creation of an LVM logical volume is physical volume creation, volume group creation, and logical volume creation.

**Domain:**
System Management

</details>

---

### Question 20

Which command should be run after making a change to the /etc/default/grub file?

A. `grub`
B. `grub-mkconfig`
C. `grub-inst`
D. `reboot`

<details>
<summary style="color: red;">Answer</summary>

B. `grub-mkconfig`. The `grub-mkconfig` command should be run after making a change to the `/etc/default/grub` file.

**Explanation:**
The `grub` command is not a valid command, the `grub-mkconfig` command generates a new GRUB configuration file based on the changes made to the `/etc/default/grub` file. The `grub-inst` command is not a valid command, and the `reboot` command is used to reboot the system.

**Domain:**
System Management

</details>

---

### Question 21

Which command is used to change details of a logical volume?

A. `lvchange`
B. `lvmodify`
C. `lvupdate`
D. `lvmscan`

<details>
<summary style="color: red;">Answer</summary>

A. `lvchange`. The `lvchange` command is used to change details of a logical volume, including whether that volume appears to be available.

**Explanation:**
The `lvmodify`, `lvupdate`, and `lvmscan` commands are not valid commands. The `lvchange` command is used to change details of a logical volume. For example, you can use the `lvchange -a y` command to activate a logical volume. The `lvchange` command can be used to change various attributes of a logical volume. The `lvmodify`, `lvupdate`, and `lvmscan` commands are not valid commands.

**Domain:**
System Management

</details>

---

### Question 22

A hard drive is reported as hd(0,0) by the GRUB Legacy configuration file. To which of the following disks and partitions does this correspond?

A. /dev/hdb2
B. /dev/hda0
C. /dev/disk1
D. /dev/sda1

<details>
<summary style="color: red;">Answer</summary>

B. `/dev/sda1`, GRUB Legacy begins counting at 0 and separates the disk letter and partition with a comma, therefore making 0,0 the first partition on the first disk. Options A and C are not the first disk on the system, and option B contains a nonexistent partition.

**Explanation:**
GRUB Legacy begins counting at 0 and separates the disk letter and partition with a comma, therefore making 0,0 the first partition on the first disk. Options A and C are not the first disk on the system, and option B contains a nonexistent partition. The correct answer is `/dev/sda1`. The other options are incorrect.

**Domain:**
System Management

</details>

---

### Question 23

Which of the following commands installs GRUB into the master boot record (MBR) of the first SATA disk?

A. `grub2-install /dev/sda`
B. `grub-install /dev/sda`
C. `grub-install /dev/sda1`
D. `grub2-install /dev/sda1`

<details>
<summary style="color: red;">Answer</summary>

A. `grub2-install /dev/sda`. The `grub2-install /dev/sda` command installs GRUB into the master boot record (MBR) of the first SATA disk.

**Explanation:**
The `grub-install /dev/sda`, `grub-install /dev/sda1`, and `grub2-install /dev/sda1` commands are incorrect. The `grub2-install /dev/sda` command installs GRUB into the master boot record (MBR) of the first SATA disk. The `grub-install /dev/sda` command is used in GRUB Legacy, not GRUB2. The `grub-install /dev/sda1` command installs GRUB into the first partition of the first disk, not the MBR. The `grub2-install /dev/sda1` command installs GRUB into the first partition of the first disk, not the MBR. The correct command is `grub2-install /dev/sda`. The other options are incorrect.

**Domain:**
System Management

</details>

---

### Question 24

Which option given to a yum command will install a given package?

A. `install`
B. `get`
C. `download`
D. `update`

<details>
<summary style="color: red;">Answer</summary>

A. `install`. The `install` option given to a `yum` command will install a given package.

**Explanation:**
The `install` option given to a `yum` command will install a given package. The `get`, `download`, and `update` options are not valid options for installing a package with `yum`. The `get` option is used to download a package without installing it, the `download` option is used to download a package without installing it, and the `update` option is used to update installed packages. The correct option is `install`. The other options are incorrect.

**Domain:**
System Management

</details>

---

### Question 25

After a new hard drive is inserted into the system, what is the correct order to make the drive ready for use within Linux?

A. Use fdisk to create partitions, and then mount the partitions.
B. Mount the partitions.
C. Use fdisk to create partitions, and then mount -a to mount all the newly created partitions.
D. Use fdisk to create partitions, and then format the partitions using a command such as mkfs, and then mount the partitions.

<details>
<summary style="color: red;">Answer</summary>

D. Use fdisk to create partitions, and then format the partitions using a command such as mkfs, and then mount the partitions.

**Explanation:**
The first step is to use fdisk to create one or more partitions. Then format the partitions, and then mount the partitions for use. Various filesystem types can be created with mkfs and its subcommands. These filesystem types include ext3, ext4, xfs, and ntfs. The other options are incorrect.

**Domain:**
System Management

</details>

---

### Question 26

When working with an rpm package file and using rpm2cpio, by default the output is sent to which location?

A. STDOUT
B. The file cpio.out
C. The file a.out
D. The file /tmp/cpi.out

<details>
<summary style="color: red;">Answer</summary>

A. STDOUT. When working with an rpm package file and using rpm2cpio, by default the output is sent to STDOUT.

**Explanation:**
rpm2cpio sends its output to STDOUT by default, and therefore that output needs to be redirected to a file in most cases. The other options are incorrect.

**Domain:**
System Management

</details>

---

### Question 27

Which of the following describes a primary difference between ext2 and ext3 filesystems?

A. ext3 was primarily a bug-fix update to ext2.
B. ext3 includes journaling for the filesystem, while ext2 is not.
C. ext3 completely changed the tools needed for management of the disks.
D. ext3 has no significant differences.

<details>
<summary style="color: red;">Answer</summary>

B. ext3 includes journaling for the filesystem, while ext2 is not.

**Explanation:**
The addition of journaling in ext3 increased filesystem reliability and performance. The other options are incorrect.

**Domain:**
System Management

</details>

---

### Question 28

According to the Filesystem Hierarchy Standard (FHS), what is the correct location for add-on application software packages?

A. /opt
B. /tmp
C. /var
D. /etc

<details>
<summary style="color: red;">Answer</summary>

A. `/opt`. According to the Filesystem Hierarchy Standard (FHS), the correct location for add-on application software packages is `/opt`.

**Explanation:**
The `/opt` directory is used to store add-on application software packages. The `/tmp` directory is used for temporary files, the `/var` directory is used for variable data files, and the `/etc` directory is used for configuration files. The correct location for add-on application software packages is `/opt`. Because each path begins with a /, the paths are absolute paths. The other options are incorrect.

**Domain:**
System Management

</details>

---

### Question 29

Which option to the mount command will mount all filesystems that are currently available in /etc/fstab?

A. -a
B. -r
C. -f
D. -m

<details>
<summary style="color: red;">Answer</summary>

A. `-a`. The `-a` option to the `mount` command will mount all filesystems that are currently available in `/etc/fstab`.

**Explanation:**

The `-a` option mounts all filesystems in /etc/fstab that are currently available. Of the otehr otptions listed, only the -f option is available, and it is a shortcut to the "fake" option, which does not do anything except perform a dry run of the mount.

**Domain:**
System Management

</details>

---

### Question 30

Which option of the systemctl command will change a service so that it runs on the next boot of the system?

A. enable
B. start
C. startonboot
C. loadonboot

<details>
<summary style="color: red;">Answer</summary>

A. `enable`. The `enable` option of the `systemctl` command will change a service so that it runs on the next boot of the system.

**Explanation:**
The `enable` option is used to enable a service to start automatically at boot time. The `start` option starts the service immediately but does not enable it for future boots. The `startonboot` and `loadonboot` options are not valid options for the `systemctl` command.

**Domain:**
System Management

</details>

---

### Question 31

Which option to xfs_metadump displays a progress indicator?

A. -p
B. -v
C. -g
D. -m

<details>
<summary style="color: red;">Answer</summary>

C. `-g`. The `-g` option to `xfs_metadump` displays a progress indicator.

**Explanation:**
The `-g` option provides a progress indicator while the command is running. The `-p`, `-v`, and `-m` options do not provide a progress indicator. The `-p` option is used to specify the output format, the `-v` option is used for verbose output, and the `-m` option is used to specify the metadata format.

**Domain:**
System Management

</details>

---

### Question 32

The system is running out of disk space within the home directory partition, and quotas have not been enabled. Which command can you use to determine the directories that might contain large files?

A. du
B. df
C. ls
D. locate

<details>
<summary style="color: red;">Answer</summary>

A. `du`. The `du` command will report on disk usage for the specified directory and its subdirectories, allowing you to identify directories that might contain large files.

**Explanation:**
The `du` command is used to estimate file space usage. The `df` command reports on filesystem disk space usage, but it does not provide information about individual directories. The `ls` command lists files and directories, and the `locate` command finds files by name but does not provide disk usage information. The correct command to determine which directories might contain large files is `du`.

**Domain:**
System Management

</details>

---

### Question 33

Which file contains information about the filesystems to mount, their partitions, and the options that should be used to mount them?

A. /etc/fstab
B. /etc/mounts
C. systemd.mount
D. /etc/filesystems

<details>
<summary style="color: red;">Answer</summary>

A. `/etc/fstab`. The `/etc/fstab` file contains information about the filesystems to mount, their partitions, and the options that should be used to mount them.

**Explanation:**
The `/etc/fstab` file is used by the system to determine which filesystems to mount at boot time and how to mount them. The `/etc/mounts` file does not exist, `systemd.mount` is not a standard file, and `/etc/filesystems` is not the correct file for this purpose. The correct file is `/etc/fstab`.

**Domain:**
System Management

</details>

---

### Question 34

According to the FHS ( Filesystem Hierarchy Standard), what is the proper mount point for removable media?

A. /etc
B. /srv
C. /tmp
D. /media

<details>
<summary style="color: red;">Answer</summary>

D. `/media`. According to the Filesystem Hierarchy Standard (FHS), the proper mount point for removable media is `/media`.

**Explanation:**
The `/media` directory is used for mounting removable media such as USB drives and CD-ROMs. The `/etc` directory is used for configuration files, the `/srv` directory is used for service data, and the `/tmp` directory is used for temporary files. The correct mount point for removable media is `/media`.

**Domain:**
System Management

</details>

---

### Question 35

How many SCSI devices are supported per bus?

A. 7 to 15
B. 2 to 4
C. 12
D. 4

<details>
<summary style="color: red;">Answer</summary>

A. `7 to 15`. The SCSI standard supports 7 to 15 devices per bus, depending on the SCSI protocol being used. The lsscsi command displays device information.

**Explanation:**
The SCSI standard allows for a maximum of 8 devices on a bus, including the host adapter, which means that 7 to 15 devices can be connected to a single SCSI bus. The other options are incorrect.

**Domain:**
System Management

</details>

---

### Question 36

Which option to umount will cause the command to attempt to remount the filesystem in read-only mode if the unmounting process fails?

A. -o
B. -r
C. -f
D. -v

<details>
<summary style="color: red;">Answer</summary>

B. `-r`. The `-r` option to `umount` will cause the command to attempt to remount the filesystem in read-only mode if the unmounting process fails.

**Explanation:**
The `-r` option is used to remount the filesystem in read-only mode if the unmounting process fails. The `-o` option does not exist, the `-f` option forces the unmounting of a filesystem, and the `-v` option provides verbose output. The correct option is `-r`.

**Domain:**
System Management

</details>

---

### Question 37

Which of the following represents the correct format for the /etc/fstab file?

A. \<directory>\<device>\<type>\<options>
B. \<device>\<type>\<options>
C. \<device>\<directory>\<type>\<options>\<dump>\<fsck>
D. \<mountpoint>\<device>\<type>\<options>

<details>
<summary style="color: red;">Answer</summary>

C. `<device><directory><type><options><dump><fsck>`. The correct format for the `/etc/fstab` file is `<device><directory><type><options><dump><fsck>`.

**Explanation:**
The `/etc/fstab` file contains information about filesystems and their mount points, and the correct format includes the device, mount point (directory), filesystem type, mount options, dump, and fsck options. The other options do not represent the correct format for the `/etc/fstab` file.

**Domain:**
System Management

</details>

---

### Question 38

Which of the following commands is used to identify the UUID for partitions?

A. blkid
B. partprobe
C. find
D. cat

<details>
<summary style="color: red;">Answer</summary>

A. `blkid`. The `blkid` command is used to identify the UUID for partitions.

**Explanation:**
The `blkid` command will show partitions UUIDs. You can also get this information with the lsblk -no +UUID \<partition> command. The partprobe command is used to update the partition table at the kernel level. The other commands shown in this question do not accomplish the required task. The correct command is `blkid`.

**Domain:**
System Management

</details>

---

### Question 39

The xfs_info command is functionally equivalent to which command and option?

A. xfs_db -r
B. xfs_repair -n
C. xfs_check
D. xfs_growfs -n

<details>
<summary style="color: red;">Answer</summary>

D. `xfs_growfs -n`. The `xfs_info` command is functionally equivalent to the `xfs_growfs -n` command.

**Explanation:**
The `xfs_info` command provides information about an XFS filesystem, and the `xfs_growfs -n` command also provides information about the filesystem without making any changes. The other options do not provide the same functionality as `xfs_info`. The correct answer is `xfs_growfs -n`.

**Domain:**
System Management

</details>

---

### Question 40

Which of the following commands will create a btrfs filesystem on the first SATA drive?

A. mkfs /dev/sda1
B. mkfs.btrfs /dev/sda
C. mkfs.btr2fs /dev/sda1
D. mkfs -b /dev/sda

<details>
<summary style="color: red;">Answer</summary>

B. `mkfs.btrfs /dev/sda`. The `mkfs.btrfs /dev/sda` command will create a btrfs filesystem on the first SATA drive (block storage) and does not require the drvie to be partitioned.

**Explanation:**
The `mkfs.btrfs` command is specifically designed to create a btrfs filesystem. The other options are incorrect because they either use the wrong command or specify the wrong device. The correct command is `mkfs.btrfs /dev/sda`.

**Domain:**
System Management

</details>

---

### Question 41

Which command and option can be used to determine whether a give service is currently loaded?

A. systemctl --ls
B. telinit
C. systemctl status
D. sysctl -a

<details>
<summary style="color: red;">Answer</summary>

C. `systemctl status`. The `systemctl status` command can be used to determine whether a given service is currently loaded.

**Explanation:**
Out of the options given, systemctl status command and option are the most appropriate. The telinit and sysctl commands are not used for this purpose. Likewise, the --ls option is not valid for systemctl.

**Domain:**
System Management

</details>

---

### Question 42

Which command can be used to change the partitioning shceme for a disk, such as to change the size of existing partitions without deleting them?

A. resize2fs
B. parted
C. mkfs
D. rfdisk

<details>
<summary style="color: red;">Answer</summary>

B. `parted`. The `parted` command can be used to change the partitioning scheme for a disk, such as to change the size of existing partitions without deleting them.

**Explanation:**
The parted command can be used to resize partitions in such a way. The mkfs command is not used for this purpose. Likewise, the --ls option is not valid for systemctl. The resize2fs command is used to resize filesystems, not partitions, and the rfdisk command does not exist. The correct command is `parted`.

**Domain:**
System Management

</details>

---

### Question 43

Which of the following commands will mount a USB device at /dev/sdb1 into the /mnt/usb directory, assuming a VFAT filesystem for the USB drive?

A. mount -t vfat /dev/sdb1 /mnt
B. usbmount /dev/sdb1 /mnt/usb
C. mount -t vfat /dev/sdb1 /mnt/usb
D. mount -t usb /dev/sdb1 /mnt/usb

<details>
<summary style="color: red;">Answer</summary>

C. `mount -t vfat /dev/sdb1 /mnt/usb`. The `mount -t vfat /dev/sdb1 /mnt/usb` command will mount a USB device at `/dev/sdb1` into the `/mnt/usb` directory, assuming a VFAT filesystem for the USB drive.

**Explanation:**
The VFAT filesystem is know as vfat to the mount command, and the other elements of the mount command are standard. The other options are incorrect because they either specify the wrong filesystem type or the wrong mount point. The correct command is `mount -t vfat /dev/sdb1 /mnt/usb`.

**Domain:**
System Management

</details>

---

### Question 44

Which option within gdisk will change the partition name?

A. c
B. n
C. b
D. v

<details>
<summary style="color: red;">Answer</summary>

A. `c`. The `c` option within `gdisk` will change the partition name.

**Explanation:**
The c option in gdisk is used to change the partition name. The n option creates a new partition, the v option verifies the disk, and the b option creates a backup of GUID Partition Table (GPT) data to a file.

**Domain:**
System Management

</details>

---

### Question 45

Which command on a systemd-controlled system would place the system into single-user mode?

A. systemctl stop
B. systemctl isolate rescue.target
C. syetemctl single-user
D. systemctl runlevel one

<details>
<summary style="color: red;">Answer</summary>

B. `systemctl isolate rescue.target`. The `systemctl isolate rescue.target` command would place the system into single-user mode.

**Explanation:**
The isolate option is used to move the sytem into the target specified, thereby making option B the correct one. The stop option stops a service. The other otption stops a service. The other otptions do not exist.

**Domain:**
System Management

</details>

---

### Question 46

Which option to fsck can be used to check all filesystems listed in /etc/fstab while excluding the root partition?

A. -NR
B. -AR
C. -X
D. -C

<details>
<summary style="color: red;">Answer</summary>

B. `-AR`. The `-AR` option to `fsck` can be used to check all filesystems listed in `/etc/fstab` while excluding the root partition.

**Explanation:**
The `-A` option tells `fsck` to check all filesystems listed in `/etc/fstab`, and the `-R` option tells it to skip the root filesystem. The other options do not provide the same functionality. The correct option is `-AR`.

**Domain:**
System Management

</details>

---

### Question 47

Which option in /etc/fstab sets the order in which the device is checked at boot time?

A. options
B. dump
C. fsck
D. checkorder

<details>
<summary style="color: red;">Answer</summary>

C. `fsck`. The `fsck` option in `/etc/fstab` sets the order in which the device is checked at boot time.

**Explanation:**
The fsck option, which is represented as a number in the /etc/fstab file, determines the order in which filesystems are checked at boot time. The dump option is used to determine if the filesystem should be dumped, the options field is used for mount options, and the checkorder option does not exist. The correct option is `fsck`.

**Domain:**
System Management

</details>

---

### Question 48

Which file is used to indicate the local time zone on a Linux server?

A. /etc/timez
B. /etc/timezoneconfig
C. /etc/timezone
D. /etc/localtz

<details>
<summary style="color: red;">Answer</summary>

C. `/etc/timezone`. The `/etc/timezone` file is used to indicate the local time zone on a Linux server.

**Explanation:**
The file /etc/timezone is used to indicate the local time zone. The other files listed as options do not exist.

**Domain:**
System Management

</details>

---

### Question 49

Within which directory will you find files related to the time zone for various regions?

A. /etc/timezoneinfo
B. /etc/zoneinfo
C. /var/zoneinfo
D. /usr/share/zoneinfo

<details>
<summary style="color: red;">Answer</summary>

D. `/usr/share/zoneinfo`. The `/usr/share/zoneinfo` directory contains files related to the time zone for various regions.

**Explanation:**
Within the /usr/share/zoneinfo hierarchy, you will find information on the various regions and time zones availble. The files within this hierarchy can by symlinked to /etc/localtime.

**Domain:**
System Management

</details>

---

### Question 50

Which option best describes the following, gathered with the ls -la command?

lrwxrwxrwx. 1 root root 35 Jul 8 2014 .fetchmailrc -> .configs/fetchmail/.fetchmailrc

A. It is a file called .fetchmailrc that is a symbolic link to the file .configs/fetchmail/.fetchmailrc.
B. It is a file called .configs/fetchmail/.fetchmailrc that is owned by lrwxrwxrwx.
C. It is a directory called .fetchmailrc that is owned by user Jul.
D. It is a local directory called .configs/fetchmail.

<details>
<summary style="color: red;">Answer</summary>

A. `It is a file called .fetchmailrc that is a symbolic link to the file .configs/fetchmail/.fetchmailrc.`

**Explanation:**
The output indicates that `.fetchmailrc` is a symbolic link (indicated by the `l` at the beginning of the permissions string) pointing to `.configs/fetchmail/.fetchmailrc`. The other options do not accurately describe the output. The correct answer is A.

**Domain:**
System Management

</details>

---

### Question 51

Which environment variable controls the format of dates and times, such as a 12-hour or 24-hour formatted clock?

A. LOCALE_DATE
B. DATE_FORMAT
C. LC_TIME
D. LC_DATE

<details>
<summary style="color: red;">Answer</summary>

C. `LC_TIME`. The `LC_TIME` environment variable controls the format of dates and times, such as a 12-hour or 24-hour formatted clock.

**Explanation:**
The LC_TIME environment variable is used to control the display and behavior of the date and time and can be changed to a different locale in order to achieve the desired display and behavior of date and time formatting. The other options shown for this question do not exist.

**Domain:**
System Management

</details>

---

### Question 52

Which of the following encondings provides a multibyte representation of characters?

A. ISO-8859
B. UTF-8
C. ISO-L
D. UFTMulti

<details>
<summary style="color: red;">Answer</summary>

B. `UTF-8`. The `UTF-8` encoding provides a multibyte representation of characters.

**Explanation:**
UTF-8 provides multibyte character encoding and is generally accepted as the standard for encoding moving forward. ISO-8859 is a single-byte encoding scheme, and the other options do not exist. The correct answer is `UTF-8`.

**Domain:**
System Management

</details>

---

### Question 53

Which command can be used to view the available time zones on a system?

A. tzd
B. /etc/locale
C. timedatectl
D. tzsel

<details>
<summary style="color: red;">Answer</summary>

C. `timedatectl`. The `timedatectl` command can be used to view the available time zones on a system.

**Explanation:**
The timedatectl command includes a list-timezones subcommand to show known time zones. The tzsel command does not exist, but there is a similar command called tzselect that will, by default, display a step-by-step menu to select a time zone. The eventual output will include a region/time-zone line, such as America/Chicago, as output.

**Domain:**
System Management

</details>

---

### Question 54

Which option to lspci is used to display both numeric codes and device names?

A. -numdev
B. -n
C. -nn
D. -devnum

<details>
<summary style="color: red;">Answer</summary>

C. `-nn`. The `-nn` option to `lspci` is used to display both numeric codes and device names.

**Explanation:**
The `-nn` option displays both numbers and device names, thus making option C correct. The -n option (option B) displays only numbers. The other two options do not exist.

**Domain:**
System Management

</details>

---

### Question 55

Which of the follwing values for the LANG variable will configure the system to bypass locale translations where possible?

A. LANG=COMPAT
B. LANG=NONE
C. LANG=C
d. LANG=END

<details>
<summary style="color: red;">Answer</summary>

C. `LANG=C`. The `LANG=C` value for the `LANG` variable will configure the system to bypass locale translations where possible.

**Explanation:**
Setting LANG=C is an alias for POSIX compatibility and will cause programs to bypass locale translations. The other options shown for LANG are not valid.

**Domain:**
System Management

</details>

---

### Question 56

If you need to temporarily reconfigure all locale variables and settings for a given session, which environment variable can be used?

A. LC_LIST
B. LC_GLOBAL
C. LC_ALL
D. ALL_LOCALE

<details>
<summary style="color: red;">Answer</summary>

C. `LC_ALL`. The `LC_ALL` environment variable can be used to temporarily reconfigure all locale variables and settings for a given session.

**Explanation:**
The LC_ALL variable can be used to set environment variables such as the locale and will override others. This can be used when there is a need for a temprary change. The other variables listed here are not used for this purpose and are not created by default.

**Domain:**
System Management

</details>

---

### Question 57

Which of the following commands will set the systemwide time zone to 'America/Los_Angeles'?

A. ln -sf /usr/share/zoneinfo/America/Los_Angeles /etc/localtime
B. ln -sf America/Los_Angeles; /etc/localtime
C. ln -sd /etc/localtime /usr/share/timezone/America/Los_Angeles
D. ln -sf /etc/localtime /usr/share/zoneinfo/America/Los_Angeles

<details>
<summary style="color: red;">Answer</summary>

A. `ln -sf /usr/share/zoneinfo/America/Los_Angeles /etc/localtime`. The `ln -sf /usr/share/zoneinfo/America/Los_Angeles /etc/localtime` command will set the systemwide time zone to 'America/Los_Angeles'.

**Explanation:**
The ln command is used for this purpose, and the -s option creates a symbolic link, while -f forces or overwrites the destination. The other options and order of commands are not valid.

**Domain:**
System Management

</details>

---

### Question 58

Which locale-related variable is used for currency-related localization?

A. LC_MONE
B. LC_CURRENCY
C. LC_MONETARY
D. LC_CURR

<details>
<summary style="color: red;">Answer</summary>

C. `LC_MONETARY`. The `LC_MONETARY` variable is used for currency-related localization.

**Explanation:**
The LC_MONETARY variable is specifically used for currency formatting and localization. The other options do not exist or are not standard locale variables.

**Domain:**
System Management

</details>

---

### Question 59

Which command is used to query and work with the hardware clock on the system?

A. hwc
B. ntpdate
C. systime
D. hwclock

<details>
<summary style="color: red;">Answer</summary>

D. `hwclock`. The `hwclock` command is used to query and work with the hardware clock on the system.

**Explanation:**
The hwclock command is used to both query and set the hardware clock, such as the one maintained by the system firmware or Basic Input/Output System (BIOS). The ntpdate command is used to synchronize the system clock with a remote NTP server, while the other options do not exist.

**Domain:**
System Management

</details>

---

### Question 60

Which option to the date command can be used to set the date and time?

A. date -f
B. date -t
C. date -s
D. date --change

<details>
<summary style="color: red;">Answer</summary>

C. `date -s`. The `date -s` option can be used to set the date and time.

**Explanation:**
The -s option sets the date and time as specified within the command. If there is another means to automatically set the date, it may override the change. For example, if ntpd or chrony is running, one of those processes may alter the date even after it has been set with date -s. The other options do not exist or are not valid for this purpose.

**Domain:**
System Management

</details>

---

### Question 61

Which function of the hwlcok command will set the hardware or BIOS clock to the crrent system time?

A. -w
B. -s
C. -a
D. -m

<details>
<summary style="color: red;">Answer</summary>

A. `-w`. The `-w` option of the `hwclock` command will set the hardware or BIOS clock to the current system time.

**Explanation:**
The -w option sets the hardware clock to the current system time. The -s option does the oppostie, setting the system time to the hardware clock. There is no -a or -m function for hwclock. The correct option is `-w`.

**Domain:**
System Management

</details>

---

### Question 62

Which of the following commands sets the hardware or BIOS clock to UTC based on the current system time?

A. hwclock --systohc --utc
B. hwclock --systohc --localtime
hwclock --systohc
D. hwclock --systoutc

<details>
<summary style="color: red;">Answer</summary>

A. `hwclock --systohc --utc`. The `hwclock --systohc --utc` command sets the hardware or BIOS clock to UTC based on the current system time.

**Explanation:**
--systohc will set the hardware clock according to the current system time. The use of --utc is required in order to ensure that the time is set to UTC. If --utc is omitted, the time will default to whatever was used last time the command was run, which could be UTC but might be local time instead. Therefore, the best option is A.

**Domain:**
System Management

</details>

---

### Question 63

Which of the following commands shows the current default route without preforming DNS lookups on the IP address(es) involved?

A. netstat -rn
B. route -n
C. netstat -r
D. netstat -f

<details>
<summary style="color: red;">Answer</summary>

A. `netstat -rn`. The `netstat -rn` command shows the current default route without performing DNS lookups on the IP address(es) involved.

**Explanation:**
The netstat command can be used for this purpose, and the -r option displays the current routes. The addition of -n prevents DNS lookups, which can help with performance. The other options do not exist or are not valid for this purpose.

**Domain:**
System Management

</details>

---

### Question 64

A Serial ATA (SATA) disk will use which of the following identifiers?

A. /dev/hdX
B. /dev/sataX
C. /dev/sdX
D. /disk/sataX

<details>
<summary style="color: red;">Answer</summary>

C. `/dev/sdX`. A Serial ATA (SATA) disk will use the `/dev/sdX` identifier.

**Explanation:**
SATA disks are addressed as /dev/sdX, just like a SCSI disk, /dev/hdX is a traditional ATA disk. The other options do not exist.

**Domain:**
System Management

</details>

### Question 65

Which of the following commands adds a default gateway of 192.168.1.1 for interface eth0?

A. route add default gateway 192.168.1.1 eth0
B. eth0 --dg 192.168.1.1
C. route add default gw 192.168.1.1 eth0
D. route define eth0 192.168.1.1

<details>
<summary style="color: red;">Answer</summary>

C. `route add default gw 192.168.1.1 eth0`.

**Explanation:**
The route command is used for this purpose, and adding a route is done with the add option. The default gateway is added using the default gw keywords followed by the IP address of the gateway and the adapter. The other options do not exist or are not valid for this purpose.

**Domain:**
System Management

</details>

---

### Question 66

Which option for the host command will query for the authoritative name servers for a given domain?

A. -t ns
B. -t all
C. -named
D. -ns

<details>
<summary style="color: red;">Answer</summary>

A. `-t ns`. The `-t ns` option for the `host` command will query for the authoritative name servers for a given domain.

**Explanation:**
The host command enables changing of the query type with the -t option. Using ns as the type will query for the name servers for a given domain. There is no all type, and the other options are also invalid.

**Domain:**
System Management

</details>

---

### Question 67

Which option for the ping command enables you to choose the interface from which the ICMP packets will be granted?

A. -i
B. -I
C. -t
D. -a

<details>
<summary style="color: red;">Answer</summary>

B. `-I`. The `-I` option for the `ping` command enables you to choose the interface from which the ICMP packets will be granted.

**Explanation:**
The -I option enables the choice of interface. A lowercase -i option sets the interval, while -a indicates an audible ping. Finally, -t enables a TTL-based ping only.

**Domain:**
System Management

</details>

---

### Question 68

Which of the following commands queries for the mail servers for the domain example.com?

A. dig example.com mx
B. dig example.com
C. host -t smtp example.com
D. dig example.com smtp

<details>
<summary style="color: red;">Answer</summary>

A. `dig example.com mx`. The `dig example.com mx` command queries for the mail servers for the domain example.com.

**Explanation:**
The host or dig command can be used for this purpose by setting the type to mx. The mx type will query for the mail exchanger for the given domain. There is no smtp type. The other options do not exist or are not valid for this purpose.

**Domain:**
System Management

</details>

---

### Question 69

Which of the following addresses represents the localhost in IPv6, such as you might find in /etc/hosts?

A. 0:1
B. ::1
C. 127:0:1
D. :127:0:0:1

<details>
<summary style="color: red;">Answer</summary>

B. `::1`. The `::1` address represents the localhost in IPv6.

**Explanation:**
The localhost address for IPv6 can be written as ::1. Addresses shown like 127 represent the IPv4 localhost range but are not written properly for IPv4 or IPv6. The other options do not exist.

**Domain:**
System Management

</details>

---

### Question 70

Which command can be used to listen for netlink messages on a network?

A. ip monitor
B. netlink -a
C. ip netlink
D. route

<details>
<summary style="color: red;">Answer</summary>

A. `ip monitor`. The `ip monitor` command can be used to listen for netlink messages on a network.

**Explanation:**
The ip command with the monitor option/subcommand will display netlink messages as they arrive. There is no netlink subcommand for ip, and the route command will not work for this purpose. The other options do not exist.

**Domain:**
System Management

</details>

---

### Question 71

Which of the following configuration lines in /etc/nsswitch.conf causes a lookup for a group information to first use local files and then use LDAP?

A. group: files ldap
B. lookup: group [local ldap]
C. group: [local ldap]
D. group: localfiles ldap

<details>
<summary style="color: red;">Answer</summary>

A. `group: files ldap`. The `group: files ldap` configuration line in `/etc/nsswitch.conf` causes a lookup for group information to first use local files and then use LDAP.

**Explanation:**
The syntax is database: <databasename> with additional database names separated by spaces, as shown in the correct option for this question. The other options do not exist or are not valid for this purpose.

**Domain:**
System Management

</details>

---

### Question 72

Which of the following dig commands sends the query for example.com directly to the server at 192.168.2.5 rather than to a locally configured resolver?

A. dig example.com @192.168.2.5
B. dig -t 192.168.2.5 example.com
C. dig -s 192.168.2.5 example.com
D. dig server=192.168.2.5 example.com

<details>
<summary style="color: red;">Answer</summary>

A. `dig example.com @192.168.2.5`

**Explanation:**
The @ symbol is used to indicate a server to which the query will be sent directly. This can be quiute useful for troubleshooting resolution problems by sending the query directly to an authoratative name server for the domain. Of the other options, -t setts the type, and the other options are not valid.

**Domain:**
System Management

</details>

---

### Question 73

Which of the following commands will enumerate the hosts database?

A. getent hosts
B. gethosts
C. nslookup
D. host

<details>
<summary style="color: red;">Answer</summary>

A. `getent hosts`. The `getent hosts` command will enumerate the hosts database.

**Explanation:**
The getent command is used for working with NSS databases, and getent hosts will display the available hosts using the databases configured in /etc/nsswitch.conf. The other options do not exist or are not valid for this purpose.

**Domain:**
System Management

</details>

---

### Question 74

Which of the following configuration lines will set the DNS server to 192.168.1.4 using /etc/resolv.conf?

A. dns 192.168.1.4
B. dns-server 192.168.1.4
C. nameserver 192.168.1.4
D. name-server 192.168.1.4

<details>
<summary style="color: red;">Answer</summary>

C. `nameserver 192.168.1.4` will set the DNS server to 192.168.1.4 using /etc/resolv.conf.

**Explanation:**
The configuration option is nameserver, and the value for the option is the IP address of the desired name server. Serveral options affect how name resolution is performed, such as the number of attempts and timeout. See resolv.conf(5) for more information. The other options do not exist or are not valid for this purpose.

**Domain:**
System Management

</details>

---

### Question 75

Which of the follwoing commands adds a route to the server for the network 192.168.51.0/24 through its gateway 192.168.22.1?

A. route add -net 192.168.51.0 netmask 255.255.255.0 gw 192.168.22.1
B. route add -net 192.168.51/24 gw 192.168.22.51
C. route -net 192.168.51.0/24 192.168.22.1
D. route add 192.168.51.1 -n 192.168.22.0//255.255.255.0

<details>
<summary style="color: red;">Answer</summary>

A. `route add -net 192.168.51.0 netmask 255.255.255.0 gw 192.168.22.1` will add a route to the server for the network.

**Explanation:**
The route command can be used for this purpose, and the syntax includes the network range, denoted with the -net option, followed by the word netmask and the masked bits, followed by the letters gw and the IP address of the gateway. The other options shown are invalid for a variety of reasons, including missing keywords and options and order.

**Domain:**
System Management

</details>

---

### Question 76

Which of the following commands shows network services or sockets that are currently listening along with sockets that are not listening?

A. netstat -a
B. netlink -a
C. sockets -f
D. opensock -l

<details>
<summary style="color: red;">Answer</summary>

A. `netstat -a` shows network services or sockets that are currently listening along with sockets that are not listening.

**Explanation:**
The netstat command is used for this purpose, and the -a option displays all sockets, listening and non-listening. Note that it's frequently helpful to add the -n option, or combine options as in netstat -an, in order to prevent name lookup. Doing so can significantly improve performance of the command.

**Domain:**
System Management

</details>

---

### Question 77

When partitioning a disk for a mail server running Postfix, which partition/ mounted directory should be the largest in order to allow for mail storage?

A. /etc
B. /usr/bin
C. /mail
D. /var

<details>
<summary style="color: red;">Answer</summary>

D. `/var`. When partitioning a disk for a mail server running Postfix, the `/var` partition/mounted directory should be the largest in order to allow for mail storage.

**Explanation:**
The partition containing /var should be the largest for a mail server because mail spools are stored within this hierarchy. The /etc/ hierarchy is usually small, as is /usr/bin. The /mail directory does not exist by default.

**Domain:**
System Management

</details>

---

### Question 78

Which of the following commands will change the default gateway to 192.168.1.1 using eth0?

A. ip route default gw 192.168.1.1
B. ip route change default via 192.168.1.1 dev eth0
C. ip route default gw update 192.168.1.1
D. ip route update default 192.168.1.1 eth0

<details>
<summary style="color: red;">Answer</summary>

A. `ip route change default via 192.168.1.1 dev eth0` will change the default gateway to 192.168.1.1 using eth0.

**Explanation:**
The ip route command can be used for this purpose, and its syntax uses a change command and the via keyword. The same operation could be completed with the route command but would require deleting the existing gateway first and then re-adding a new default gateway. The other options do not exist or are not valid for this purpose.

**Domain:**
System Management

</details>

---

### Question 79

Which of the following commands displays the Start of Authority information for the domain example.com?

A. dig example.com soa
B. dig example.com authority
C. dig example.com -auth
D. dig -t auth example.com

<details>
<summary style="color: red;">Answer</summary>

A. `dig example.com soa` displays the Start of Authority information for the domain example.com.

**Explanation:**
The soa type is used to query for Start of Authority records for a domain. Note that in many cases, dig will attempt to lookup the domain within a given command and may not appear to have had an error. For example, when running option D(dig -t auth example.com), you will receive information about example.com, and there will be a line in the output saying that dig has ignored the invalid type of auth.

**Domain:**
System Management

</details>

---

### Question 80

Assume that you want to enable local client services to go to hosts on the network without needing to fully qualify the name by adding the domain for either example.com or example.org. Which option in /etc/resolv.conf will proivde this functionality?

A. search
B. domain
C. local-domain
D. local-order

<details>
<summary style="color: red;">Answer</summary>

A. `search`. The `search` option in `/etc/resolv.conf` will provide this functionality.

**Explanation:**
The search option is used for this purpose and can be proivded with multiple domain names, each separated by a space or tab. The domain option is valid within /etc/resolv.conf but does not allow for multiple domain names. The other options do not exist.

**Domain:**
System Management

</details>

---

### Question 81

Which of the following commands prevents traffic from reaching the host 192.168.1.3?

A. route add -host 192.168.1.3 reject
B. route -nullroute 192.168.1.3
C. route add -null 192.168.1.3
D. route add -block 192.168.1.3

<details>
<summary style="color: red;">Answer</summary>

A. `route add -host 192.168.1.3 reject` prevents traffic from reaching the host.

**Explanation:**
The route commnad can be used for this purpose, and in the scenario described, a reject destination is used for the route. The other options shown are invalid because they use invalid options to the route command.

**Domain:**
System Management

</details>

---

### Question 82

Which of the following commands will emulate the ping command in Microsoft Windows, where the ping is sent for four packets and then the command stops?

A. ping -c 4
B. ping -n 4
C. ping -t 4
D. ping -s 4

<details>
<summary style="color: red;">Answer</summary>

A. `ping -c 4` will emulate the ping command in Microsoft Windows.

**Explanation:**
The -c option provides the count of the number of pings to send. The -n option specifies numeric output only while -p specifies the pattern to use for the packet content. Finally, the -t option sets the TTL.

**Domain:**
System Management

</details>

---

### Question 83

You need to prevent local clients from going to a certain host, www.example.com, and instead redirect them to localhost. Which of the following is a method to override DNS lookup for this host?

A. Add a firewall entry for the IP address of www.example.com to prevent traffic from passing through it.
B. Delete www.example.com from the route table using the route command.
C. Add a null route to prevent access to the IP address for www.example.com.
D. Add an entry for www.example.com in /etc/hosts to point to 127.0.0.1.

<details>
<summary style="color: red;">Answer</summary>

D. Add an entry for www.example.com in /etc/hosts to point to 127.0.0.1.

**Explanation:**
The best option for this question is to add an entry for the host in /etc/hosts. Doing so will always cause DNS queries to resolve to 127.0.0.1. The other options are not as robust because they rely on www.example.com always having the same IP address, or the solutions require additional maintenance to constantly add new IP addresses if www.example.com IP address changes.

**Domain:**
System Management

</details>

---

### Question 84

Which of the following commands should be executed after running ip route change?

A. ip route flush cache
B. ip route reload
C. ip route cache reload
D. ip route restart

<details>
<summary style="color: red;">Answer</summary>

A. `ip route flush cache` should be executed after running ip route change.

**Explanation:**
The ip route flush cache command will clear the routing cache, which is necessary after changing the routing table. The other options do not exist or are not valid for this purpose.

**Domain:**
System Management

</details>

---

### Question 85

Which option should be used to send a DNS query for an SPF record with dig?

A. -t txt
B. -t spf
C. -t mx
D. -t mailspf

<details>
<summary style="color: red;">Answer</summary>

A. `-t txt` should be used to send a DNS query for an SPF record with dig.

**Explanation:**
SPF records are stored in the txt record type in DNS, thereby making -t txt the correct option for this.
Of the other answers, only -t mx is valid, it returns the mail exchangers for the given domain. The other options do not exist.

**Domain:**
System Management

</details>

---

### Question 86

When you're viewing the available routes using the route command, one route contains flags UG while the others contain U. What does the letter G signify in the route table?

A. The G signifies that the route is good.
B. The G signifies that the route is unavailable.
C. The G signifies that this is a gateway.
D. The G signifies that the route is an aggregate.

<details>
<summary style="color: red;">Answer</summary>

C. The G signifies that this is a gateway.

**Explanation:**
The G flag in the route table signifies that the route is a gateway. The U flag signifies that the route is up and available. The other options are not valid.

**Domain:**
System Management

</details>

---

### Question 87

Which of the following commands requests a zone transfer of example.org from the server at 192.168.1.4?

A. dig example.org @192.168.1.4 axfr
B. dig example.org @192.168.1.4
C. dig example.org @192.168.1.4 xfer
D. dig example.org #192.168.1.4 xfer

<details>
<summary style="color: red;">Answer</summary>

A. `dig example.org @192.168.1.4 axfr` requests a zone transfer of example.org from the server at 192.168.1.4 using the dig command.

**Explanation:**
The axfr type is a zone transfer, and the @ symbol signifies the server to which the query will be sent. There is no xfer type, and option B is just a normal query for the domain sent to the specified server. The other options do not exist.

**Domain:**
System Management

</details>

---

### Question 88

Which yum option displays the dependencies for the package specified?

A. list
B. deplist
C. dependencies
D. listdeps

<details>
<summary style="color: red;">Answer</summary>

B. `deplist` displays the dependencies for the package specified.

**Explanation:**
The deplist option displays the dependencies for the given package. The list option displays information about a specific package, while the other two options are not valid.

**Domain:**
System Management

</details>

---

### Question 89

Which of the following commands can be used to display the current disk utilization?

A. df
B. du
C. diskutil
D. diskusage

<details>
<summary style="color: red;">Answer</summary>

A. `df` can be used to display the current disk utilization.

**Explanation:**
The df command displays information on disk usage and can help with planning disk utilization over time. For example, if you note that disk utilization is increasing significantly, preparations can be made to bring more disks online or even to change the log rotation schedule such that logs are rotated faster, thereby freeing up space. The du command displays disk usage for a specific directory or file, while the other options do not exist.

**Domain:**
System Management

</details>

---

### Question 90

You are working with a legacy centOS 5 system and need to re-create the initial RAM disk. Which of the following commands is used for this purpose?

A. mkinitrd
B. mkramdisk
C. mkdisk --init
D. mkfs.init

<details>
<summary style="color: red;">Answer</summary>

A. `mkinitrd` is used to re-create the initial RAM disk.

**Explanation:**
The mkinitrd command is used on older systems to create the initial RAM disk. The initial RAM disk is used to load (some might say preload) essential modules for things like disks and other vital components needed for booting. The other options do not exist.

**Domain:**
System Management

</details>

---

### Question 91

Which of the following commands is used to display the currently loaded modules on a running system?

A. ls -mod
B. lsmod
C. tree
D. mod --list

<details>
<summary style="color: red;">Answer</summary>

B. `lsmod` is used to display the currently loaded modules on a running system.

**Explanation:**
The lsmod command is used to display currently loaded modules. This is useful for scenarios where you are migrating from the stock or distribution-provided kernel to a custom kernel and need to know which modules to compile into the new kernel. Of the other commands, the tree command is valid but not for the scenario provided. The other options do not exist.

**Domain:**
System Management

</details>

---

### Question 92

Which of the following commands creates a list of modules and their dependencies?

A. lsmod
B. depmod
C. modlist
D. listmod

<details>
<summary style="color: red;">Answer</summary>

B. `depmod` creates a list of modules and their dependencies.

**Explanation:**
The depmod command is used to create a list of modules. The list is kept in a file called modules.dep, the location of which is dependent on the distribution of Linux in use.

**Domain:**
System Management

</details>

---

### Question 93

Which option to systctl displays all values and their current settings?

A. -a
B. -b
C. -d
D. -c

<details>
<summary style="color: red;">Answer</summary>

A. `-a` displays all values and their current settings.

**Explanation:**
The -a option displays all values and their current settings for sysctl. The -b option is binary and displays values without any newlines. The -d option is an alias for -h, which is help display. There is no -c option. The sysctl options can also be found in /etc/sysctl.conf.

**Domain:**
System Management

</details>

---

### Question 94

Which of the following commands installs a kernel module, including dependencies?

A. lsmod
B. modprobe
C. modinst
D. instmod

<details>
<summary style="color: red;">Answer</summary>

B. `modprobe` installs a kernel module, including dependencies.

**Explanation:**
The modprobe command examines dependencies for a given module and loads both the dependencies and the requested module. This is useful when you are working with a module that has dependencies that are not yet loaded. The lsmod command displays currently loaded modules, while the other options do not exist.

**Domain:**
System Management

</details>

---

### Question 95

Which command is used to determine the modules on which another module depends?

A. modinfo
B. modprobe
C. modlist
D. tracemod

<details>
<summary style="color: red;">Answer</summary>

A. `modinfo` is used to determine the modules on which another module depends.

**Explanation:**
The modinfo command provides information on a given kernel module. You can use modinfo to find out the parameters needed for a given module and the modules on which it depends, among other information. The modprobe command is used to load a module. There is no tracemod or modlist commnad.

**Domain:**
System Management

</details>

---

### Question 96

Which of the following commands inserts a module into the running kernel but does not resolve dependencies?

A. lsmod
B. modprobe
C. insmod
D. modins

<details>
<summary style="color: red;">Answer</summary>

C. `insmod` inserts a module into the running kernel but does not resolve dependencies.

**Explanation:**
The insmod command inserts a module into the running kernel. It does not, however, attempt to resolve dependenices but rather outputs an error if there are dependent modules or kernel symbols that are not available. The lsmod command displays currently loaded modules, while the other options do not exist.

**Domain:**
System Management

</details>

---

### Question 97

Which option to modprobe will remove a module and attempt to remove any unused modules on which it depends?

A. -v
B. -r
C. -d
D. -f

<details>
<summary style="color: red;">Answer</summary>

B. `-r` will remove a module and attempt to remove any unused modules on which it depends.

**Explanation:**
The -r option removes the named kernel modules and attempts to remove any modules on which the named module depends, where possible. The -d option sets the root directory for modules, while -v is verbose and -f forces the module to load.

**Domain:**
System Management

</details>

---

### Question 98

Whithin which of the following directories will you find blacklist information for modules loaded with modprobe?

A. /etc/blacklist
B. /etc/modprobe.d
C. /etc/blacklist.d
D. /etc/modules.d

<details>
<summary style="color: red;">Answer</summary>

B. `/etc/modprobe.d` contains blacklist information for modules loaded with modprobe.

**Explanation:**
The /etc/modprobe.d directory is used for storing configuration information related to modules such as that used for blacklisting purposes and also for other configuration information such as udev and module options. The other options do not exist.

**Domain:**
System Management

</details>

---

### Question 99

When working with a CentOS 6 system, which command is used to create the intial RAM disk?

A. mkinitrd
B. mkramdisk
C. mkdisk --init
D. dracut

<details>
<summary style="color: red;">Answer</summary>

D. `dracut` is used to create the initial RAM disk on a CentOS 6 system.

**Explanation:**
The dracut command is used to create the initial RAM disk for newer sysyems and has replaced the legacy mkinitrd command used for the same purpose.

**Domain:**
System Management

</details>

---

### Question 100

If you'd like a value set with the sysctl command to take effect on boot, within which file should you place the variable and its value?

A. /etc/sysctl.conf
B. /etc/sysctl.d
C. /etc/sysctl.vars
D. /etc/sysctl

<details>
<summary style="color: red;">Answer</summary>

A. `/etc/sysctl.conf` is where you should place the variable and its value if you'd like it to take effect on boot.

**Explanation:**
Variables and values placed int /etc/sysctl.conf will be read and applied at boot time. The other options do not exist.

**Domain:**
System Management

</details>

---

### Question 101

Which of the following options to modprobe will show the dependencies for a module?

A. --show-deps
B. --show-depends
C. --deps
D. --list-depends

<details>
<summary style="color: red;">Answer</summary>

B. `--show-depends` will show the dependencies for a module.

**Explanation:**
The --show-depends option displays the dependencies for a given module. The other options are not valid for the modprobe command.

**Domain:**
System Management

</details>

---

### Question 102

Which options for the rpm command will display verbose output for an installation along with progress of the installation?

A. -v
B. -wvh
C. -ivh
D. --avh

<details>
<summary style="color: red;">Answer</summary>

C. `-ivh` will display verbose output for an installation along with progress of the installation.

**Explanation:**
The -ivh options will install a file using rpm, displaying both verbose output and hash marks for progress. The other options presented do not exist or do not accomplish the specified task.

**Domain:**
System Management

</details>

---

### Question 103

When working with UEFI, which of the following commands changes the boot order for the next boot?

A. efibootmgr -c
B. efibootmgr -b -B
C. efibootmgr -o
D. efibootmgr -n

<details>
<summary style="color: red;">Answer</summary>

D. `efibootmgr -n` changes the boot order for the next boot when working with UEFI.

**Explanation:**
The -n option changes the boot order for the next boot only and boots from the specified partition. The -b along with -B modifies and then deletes the option. The -o option sets the boot order. The -c option creates a boot number. The other options do not exist.

**Domain:**
System Management

</details>

---

### Question 104

Which bootloader can be used to boot from ISO with ISO9660 CD-ROMs?

A. ISOLINUX
B. EFIBOOT
C. ISOFS
D. BOOTISO

<details>
<summary style="color: red;">Answer</summary>

A. `ISOLINUX` can be used to boot from ISO with ISO9660 CD-ROMs.

**Explanation:**
ISOLINUX proivdes a means by which CD-ROMs formatted as ISO 9660 can be booted. It's very common to have live CDs or rescue/recovery CDs that use ISOLINUX for boot. The other bootloaders are not valid for this purpose or don't exist. For example, EFIBOOT is a command used to manage UEFI boot entries. ISOFS is a filesystem type, and BOOTISO does not exist.

**Domain:**
System Management

</details>

---

### Question 105

When using UEFI, which of the following files can be used as a bootloader?

A. shim.uefi
B. shim.efi
C. shim.fx
D. efi.shim

<details>
<summary style="color: red;">Answer</summary>

B. `shim.efi` can be used as a bootloader when using UEFI.

**Explanation:**
Due to the decidedly insecure decisions made with the design of Microsoft's UEFI, a shim is often needed to enable Linux to boot on a system with UEFI. The file shim.efi can be used as an initial bootloader for this purpose. The other options do not exist.

**Domain:**
System Management

</details>

---

### Question 106

Which of the following commands, executed from within the UEFI shell, controls the boot configuration?

A. bootcfg
B. bcfg
C. grub-install
D. grcfg

<details>
<summary style="color: red;">Answer</summary>

B. `bcfg` controls the boot configuration when executed from within the UEFI shell.

**Explanation:**
The bcfg command within the UEFI shell is used to configure bootloaders on a UEFI-based system. The command can accept various paramters to configure how the bootloader and kernel will load on a boot. Of the other commands shown, grub-install is valid but not within the UEFI shell, and the other options do not exist.

**Domain:**
System Management

</details>

---

### Question 107

Which of the following can be identified as an initial sector on a disk that stores information about the disk partitioning and opertating system locaiton?

A. Minimal boot record (MBR)
B. Master boot record (MBR)
C. Init sector
D. Master partition table (MPT)

<details>
<summary style="color: red;">Answer</summary>

B. `Master boot record (MBR)` can be identified as an initial sector on a disk that stores information about the disk partitioning and operating system location.

**Explanation:**
The master boot record, or MBR, is the first sector on a disk and contains information about the structure of the disk. If the MBR becomes corrupt, all data on the disk may be lost. The other options shown for this question are not valid.

**Domain:**
System Management

</details>

---

### Question 108

When using PXE boot, which file must exist within /tftpboot on the TFTP server for the system that will use PXELINUX for its bootloader?

A. pxelinux.tftp
B. pxelinux.boot
C. pxelinux.conf
D. pxelinux.0

<details>
<summary style="color: red;">Answer</summary>

D. `pxelinux.0` must exist within /tftpboot on the TFTP server for the system that will use PXELINUX for its bootloader.

**Explanation:**
The file pxelinux.0 must exist within /tftpboot on the TFTP server in order for a system to use PXELINUX for booting. The other files are not valid or necessary for PXELINUX. Once booted, PXE boot can boot using an NFS-mounted filesystem where the filesystem is physically hosted on a different computer. This is useful for diskless systems or for systems that need to boot from a network location. PXE boot is also used for automated installations of operating systems. PXELINUX is a bootloader that can be used with PXE boot. The bootloader is loaded by the PXE firmware and then loads the kernel and initrd from the TFTP server. The bootloader can also be used to load a configuration file that specifies the kernel and initrd to load.

**Domain:**
System Management

</details>

---

### Question 109

Which option to grup-install will place the GRUB images into an alternate directory?

A. --boot-dir
B. -b
C. -boot
D. --boot-directory

<details>
<summary style="color: red;">Answer</summary>

A. `--boot-directory` will place the GRUB images into an alternate directory.

**Explanation:**
The --boot-directory option enables you to specify an alternate location for GRUB images rather than the default /boot. The other options shown for this question are not valid.

**Domain:**
System Management

</details>

---

### Question 110

When using a shim for booting a UEFI-based system, which of the following files is loaded after shim.efi?

A. grubx64.cfg
B. grub.cong
C. grubx64.efi
D. efi.boot

<details>
<summary style="color: red;">Answer</summary>

C. `grubx64.efi` is loaded after shim.efi when using a shim for booting a UEFI-based system.

**Explanation:**
The shim.efi bootloader loads another bootloader, which is grubx64.efi by default. The other options are not valid filenames for the purpose described.

**Domain:**
System Management

</details>

---

### Question 111

Part of the EXT tools, which option to the mke2fs command sets the type of filesystem to be created?

A. -f
B. -a
C. -t
D. -e

<details>
<summary style="color: red;">Answer</summary>

C. `-t` sets the type of filesystem to be created when using the mke2fs command.

**Explanation:**
The -t option sets the filesystem type as ext2, ext3, or ext4. The mke2fs command is typically symlinked from /sbin/mkfs.ext2, /sbin/mkfs.ext3, and /sbin/mkfs.ext4. The -f option forces mke2fs to create a filesystem. The other options shown for this question are not valid.

**Domain:**
System Management

</details>

---

### Question 112

Which file is used to store a list of encrypted devices that are to be mounted at boot?

A. /etc/crypttab
B. /etc/encryp
C. /etc/encfs
D. /etc/encdev

<details>
<summary style="color: red;">Answer</summary>

A. `/etc/crypttab` is used to store a list of encrypted devices that are to be mounted at boot.

**Explanation:**
The /etc/crypttab file contains the filesystems and devices that are encrypted such as those with Linux Unified Key Setup (LUKS). The other file locations do not exist by default and are not related to this question.

**Domain:**
System Management

</details>

---

### Question 113

Which command will search for a package named zsh on a Debian system?

A. apt-get search zsh
B. apt-cache search zsh
C. apt-cache locate zsh
D. apt-get locate zsh

<details>
<summary style="color: red;">Answer</summary>

B. `apt-cache search zsh` will search for a package named zsh on a Debian system.

**Explanation:**
The apt-cache command is used to work with the package cache, and the search option is used to search the cache for the supplied argument, in this case zsh. The apt-get command is used to work with packages themselves, while the apt-search command does not exist. The apt.conf file, found either in /etc/apt/ or /etc/, contains several options for how apt behaves. The other options shown for this question are not valid.

**Domain:**
System Management

</details>

---

### Question 114

Whithin which directory will you find the repositories used by yum?

A. /etc/yum.conf
B. /etc/repos
C. /etc/yum.conf.d
D. /etc/yum.repos.d

<details>
<summary style="color: red;">Answer</summary>

D. `/etc/yum.repos.d` is where you will find the repositories used by yum.

**Explanation:**
Configuration files related to the repositories for yum are located in /etc/yum.repos.d. Of the other options, /etc/yum.conf is a file and not a directory, and the other directories do not exist. The /etc/yum.conf file contains configuration information for yum, including the location of the repositories. The /etc/yum.conf.d directory does not exist.

**Domain:**
System Management

</details>

---

### Question 115

You are performing an xfsrestore. The xfsdump was executed with a block size of 4M. Which option do you need to invoke on xfsrestore in order for it to successfully use this dump?

A. -b 4M
B. -g 1M
C. -i 1M
D. -k 1028K

<details>
<summary style="color: red;">Answer</summary>

A. `-b 4M` is the option you need to invoke on xfsrestore in order for it to successfully use this dump.

**Explanation:**
The block size for import or restore must match the block size used on export or dump. Block size used on export or dump. Block size is specified with the -b option, thus making option A correct. The other options are not valid for xfsrestore.

**Domain:**
System Management

</details>

---

### Question 116

You see the word defaults within /etc/fstab. Which options are encompassed within the defaults?

A. ro, exec, auto
B. rw, suid, dev, exec, auto, nouser, async
C. rw, exec, auto, nouser, async
D. rw, exec, nouser, async, noauto, suid

<details>
<summary style="color: red;">Answer</summary>

B. `rw, suid, dev, exec, auto, nouser, async` are encompassed within the defaults when you see the word defaults within /etc/fstab.

**Explanation:**
A filesystem with the word defaults for its mount options will be mounted read-write(rw), with setuid(suid) and device(dev) permissions enabled, with the ability to execute(exec) files, mounted automatically(auto), without requiring a user(nouser) to mount it, and with asynchronous(async) I/O enabled. The other options are not valid for the defaults option in /etc/fstab. The /etc/fstab file contains information about filesystems and how they should be mounted. The file is read by the mount command when the system boots. The file contains information about the filesystem, the mount point, the filesystem type, and the mount options. The mount options are separated by commas.

**Domain:**
System Management

</details>

---

### Question 117

Which of the following options to xfsdump sets the maximum size for files to be included in the dump?

A. -p
B. -s
C. -z
D. -b

<details>
<summary style="color: red;">Answer</summary>

B. `-z` sets the maximum size for files to be included in the dump when using xfsdump.

**Explanation:**
The -z option sets the maximum size for files to be included in the dump. The -b option sets the block size but is not related to what is being asked for in thsi scenario. The -s option sets the path for inclusion in the dump, and -p sets the interval for progress indicators. The xfsdump command is used to create a backup of an XFS filesystem. The xfsrestore command is used to restore the backup.

**Domain:**
System Management

</details>

---

### Question 118

Which partition type is used to indicate a software RAID array, such as an array built with mdadm?

A. Oxmd
B. -x-
C. 0xRD
D. 0xFD

<details>
<summary style="color: red;">Answer</summary>

D. `0xFD` is used to indicate a software RAID array, such as an array built with mdadm.

**Explanation:**
A partition type of 0xFD is used for software RAID arrays. This can be set or viewed using a tool such as fdisk. The other options shown are not valid partition types.

**Domain:**
System Management

</details>

---

### Question 119

When working with World Wide Identifiers (WWIDs), within which directory on a Red Hat server will you find symlinks to the current /dev/sd device names?

A. /dev/disk/wwid
B. /dev/wwid
C. /dev/disk/by-id
D. /dev/sd.wwid

<details>
<summary style="color: red;">Answer</summary>

C. `/dev/disk/by-id` is where you will find symlinks to the current /dev/sd device names when working with World Wide Identifiers (WWIDs) on a Red Hat server.

**Explanation:**
The /dev/disk/by-id directory contains symbolic links to /dev/sd, such as /dev/sda. Because WWIDs can be used to identify a device across systems, they are often used within the context of SANs. The other directories listed as options do not exist.

**Domain:**
System Management

</details>

---

### Question 120

Which of the following commands displays information about a given physical volume in an LVM setup?

A. pvdisp
B. pvlist
C. pvdisplay
D. pvl

<details>
<summary style="color: red;">Answer</summary>

C. `pvdisplay` displays information about a given physical volume in an LVM setup.

**Explanation:**
The pvdisplay command shows information about a given physical volume. You can use pvdisplay to view the device on which the PV is built along with the extent size of the PV. The other commands shown are not valid.

**Domain:**
System Management

</details>

---

### Question 121

When viewing information in /dev/disk/by-path using the commands ls -l, which of the following filenames represents a LUN from Fibre Channel?

A. /dev/fc0
B. pci-0000:1a:00.0-fc-0x500601653ee0025f:0x0000000000000000
C. pci-0000:1a:00.0-scsi-0x500601653ee0025f:0x0000000000000000
D. /dev/fibre0

<details>
<summary style="color: red;">Answer</summary>

B. `pci-0000:1a:00.0-fc-0x500601653ee0025f:0x0000000000000000` represents a LUN from Fibre Channel when viewing information in /dev/disk/by-path using the commands ls -l.

**Explanation:**
Logical unit numbers (LUNs) that contain the characters fc are those found through Fibre Channel. Therein lies the difference between options B and C, where option C contains the letters scsi, which would usually represent a local disk. The other options are not valid.

**Domain:**
System Management

</details>

---

### Question 122

Which of the following commands displays path information for LUNs?

A. luninfo -a
B. ls -lun
C. multipath -l
D. dm-multi

<details>
<summary style="color: red;">Answer</summary>

C. `multipath -l` displays path information for LUNs.

**Explanation:**
The multipath command is used for administration of devices such as LUNs and can be used for finding the path to LUNs for a server, such as in a SAN configuration. Related, the multipathd daemon checks for paths that have failed. The other commands are not valid, with the exception of ls: it is valid, but the option shown is not related to LUNs but rather is a combination of various flags to the ls commmand.

**Domain:**
System Management

</details>

---

### Question 123

Which command is used to remove unused filesystem blocks from thinly provisioned storage?

A. thintrim
B. thtrim
C. fstrim
D. fsclean

<details>
<summary style="color: red;">Answer</summary>

C. `fstrim` is used to remove unused filesystem blocks from thinly provisioned storage.

**Explanation:**
The fstrim command is used to remove blocks that are not in use. The fstrim command is frequently used in a SAN configuration to give back unused storage to the SAN. The fstrim command can also be used with solid-state drives for the same purpose. The other commands shown are not valid.

**Domain:**
System Management

</details>

---

### Question 124

When using tune2fs to set an extended option such as stripe_width, which command-line option is needed to signify that an extended option follows?

A. -extend
B. -E
C. -e
D. -f

<details>
<summary style="color: red;">Answer</summary>

B. `-E` is needed to signify that an extended option follows when using tune2fs to set an extended option such as stripe_width.

**Explanation:**
The -E option signals that an extended option follows, such as stripe_width. The -f option forces an operation but should not be necessary for this solution, and the -e option sets the behavior on error. There is no -extend option.

**Domain:**
System Management

</details>

---

### Question 125

Which option to mdadm () is used to create a new array?

A. --create
B. --start
C. --begin
D. --construct

<details>
<summary style="color: red;">Answer</summary>

A. `--create` is used to create a new array when using mdadm.

**Explanation:**
The --create option enables creation of a RAID array that will use md. The typical argument is the /dev/mdN device along with the level. The other options listed are not valid for mdadm.

**Domain:**
System Management

</details>

---

### Question 126

Information about logical volumes can be found in which of the following?

A. /dev/lvinfo
B. /dev/map
C. /dev/mapper
D. /dev/lvmap

<details>
<summary style="color: red;">Answer</summary>

C. `/dev/mapper` is where information about logical volumes can be found.

**Explanation:**
The /dev/mapper directroy contains information about multipath devices such as logical volumes. The other directories are not valid.

**Domain:**
System Management

</details>

---

### Question 127

Which option to mdadm watches a RAID array for anomalies?

A. --mon
B. --watch
C. --monitor
D. --examine

<details>
<summary style="color: red;">Answer</summary>

C. `--monitor` watches a RAID array for anomalies when using mdadm.

**Explanation:**
The --monitor option is used to actively watch an array for issues such as disk failure. The monitoring can be done as a daemon and run in the background, thereby alerting when there is an issue.

**Domain:**
System Management

</details>

---

### Question 128

When running mdadm in monitor mode, which option within /etc/mdadm.conf sets the destination for email if an issues is discovered?

A. MAILTO
B. MAILADDR
C. MAILFROM
D. MAILDEST

<details>
<summary style="color: red;">Answer</summary>

B. `MAILADDR` sets the destination for email if an issue is discovered when running mdadm in monitor mode.

**Explanation:**
The MAILADDR option sets the destination address for mail about RAID events that are noted by mdadm. when in monitor mode. The other options are not valid.

**Domain:**
System Management

</details>

---

### Question 129

When using the ip command, which protocol family is used as the default if not otherwise specified?

A. tcpip
B. ip
C. inet
D. arp

<details>
<summary style="color: red;">Answer</summary>

C. `inet` is used as the default protocol family when using the ip command.

**Explanation:**
The ip command defaults to the inet family if not otherwise specified with the -f option. The command will attempt to guess the correct family and fall back to inet. The other families listed as options for this commnad are not valid for use with the ip command.

**Domain:**
System Management

</details>

---

### Question 130

Which command is used for setting paramteters such as the essid, channel, and other related options for a wireless device?

A. ifconfig
B. iwconfig
C. wlancfg
D. ifcfg

<details>
<summary style="color: red;">Answer</summary>

B. `iwconfig` is used for setting parameters such as the essid, channel, and other related options for a wireless device.

**Explanation:**
The iwconfig command, which is similar to the ifconfig command, works with an individual wireless interface to set and display parameters. Of the other commands, the ifconfig command is valid but not used for wireless, and ifcfg is intended as a replacement for ifconfig. The other commands are not valid.

**Domain:**
System Management

</details>

---

### Question 131

Which of the following commands shows network sockets and their allocated memory?

A. ss -m
B. mpas
C. mem
D. free

<details>
<summary style="color: red;">Answer</summary>

A. `ss -m` shows network sockets and their allocated memory.

**Explanation:**
The ss command provides many of the same functions as netstat but can show some extended inforamtion, such as memory allocation for a given socket. The free command show memory usage but not by socket, and the other two commands do not exist.

**Domain:**
System Management

</details>

---

### Question 132

Which option to the ss command shows the process IDs assocatied with the socket?

A. -l
B. -a
C. -p
D. -f

<details>
<summary style="color: red;">Answer</summary>

C. `-p` shows the process IDs associated with the socket when using the ss command.

**Explanation:**
The -p option shows the process IDs associated with a given socket within the ss output. The -a option is all sockets, while -l is listening sockets. The -f option is used to specify the protocol family.

**Domain:**
System Management

</details>

---

### Question 133

On a Debian system, within which directory hierarchy will you find configuration information and directories to hold scripts to be run when an interface is brought up or taken down?

A. /etc/netconf
B. /etc/netconfig
C. /etc/net.conf.d
D. /etc/network

<details>
<summary style="color: red;">Answer</summary>

D. `/etc/network` is where you will find configuration information and directories to hold scripts to be run when an interface is brought up or taken down on a Debian system.

**Explanation:**
The /etc/network directory contains information on network interfaces and contains directories that then further contain scripts to be executed when interfaces are brought up or down. The other directories listed do not exist.

**Domain:**
System Management

</details>

---

### Question 134

Which of the following characters are valid for hostnames in /etc/hosts?

A. Alphanumerics, minus, underscore, and dot
B. Alphanumerics, minus, dot
C. Alphanumerics, dot
D. Alphanumerics

<details>
<summary style="color: red;">Answer</summary>

B. Alphanumerics, minus, dot are valid for hostnames in /etc/hosts.

**Explanation:**
Only alphanumerics, minus, and dot are valid for hostnames in /etc/hosts. The underscore is not valid for hostnames in /etc/hosts. The /etc/hosts file is used to map hostnames to IP addresses. The file is read by the system before DNS is consulted. The file is useful for small networks or for systems that are not connected to the internet.

**Domain:**
System Management

</details>

---

### Question 135

Which of the following configuration lines in /etc/resolv.conf enables debugging?

A. debug
B. options debug
C. option debug
D. enable debug

<details>
<summary style="color: red;">Answer</summary>

B. `options debug` enables debugging in /etc/resolv.conf.

**Explanation:**
Options within /etc/resolv.conf are preceded with the options keyword followed by one or more options such as debug. The other options listed are not valid.

**Domain:**
System Management

</details>

---

### Question 136

The system contains an NFS mounted filesystem that has become unreachable. Which option should be passed to umount in order to force the unmounting of the filesystem?

A. -nfs
B. --fake
C. -f
D. -n

<details>
<summary style="color: red;">Answer</summary>

C. `-f` should be passed to umount in order to force the unmounting of the filesystem.

**Explanation:**
The -f option will force the umoint to occur. The --fake option is essentially a dry run in that it won't actually unmount a filesystem. The other two options do not exist.

**Domain:**
System Management

</details>

---

### Question 137

Which of the following commands will send the output of the grub2-mkconfig command to the correct location for booting?

A. grub2-mkconfig --output=/boot/grub2/grub.cfg
B. grub2-mkconfig --file=/boot/grub2.menu
C. grub2-mkconfig --file=/boot/grub.lst
D. grub2-mkconfig --output=/boot/menu.lst

<details>
<summary style="color: red;">Answer</summary>

A. `grub2-mkconfig --output=/boot/grub2/grub.cfg` will send the output of the grub2-mkconfig command to the correct location for booting.

**Explanation:**
The --output option configures the location for output of the command instead of STDOUT. The other options are not valid.

**Domain:**
System Management

</details>

---

### Question 138

Which PXE Linux binary file is required for booting from HTTP or FTP?

A. lpxelinux.0
B. pxelinux.http
C. netpxlinux.0
D. netpxe.0

<details>
<summary style="color: red;">Answer</summary>

A. `lpxelinux.0` is required for booting from HTTP or FTP when using PXE Linux.

**Explanation:**
The file lpxlinux.0 contains the necessary code to support booting from HTTP and FTP. The other options are not valid.

**Domain:**
System Management

</details>

---

### Question 139

The file /etc/grub2.cfg is typically a symbolic link to which file?

A. /boot/grub.conf
B. /boot/grub2/grub.cfg
C. /boot/grub2.conf
D. /etc/sysconfig/grub2.cfg

<details>
<summary style="color: red;">Answer</summary>

B. `/boot/grub2/grub.cfg` is typically a symbolic link to /etc/grub2.cfg.

**Explanation:**
The file /etc/grub2.cfg is usually a symbolic link to /boot/grub2/grub.cfg. The other options are not valid.

**Domain:**
System Management

</details>

---

### Question 140

Which of the following describes a difference between vmlinuz and vmlinux?

A. vmlinuz is used for zOS systems, and vmlinux is used for x86 artchitectures.
B. vmlinuz is used for 64-bit systems, and mvlinux is used for 32-bit systems.
C. vmlinuz is compressed, and vmlinux is not.
D. vmlinuz contains additional binary code for cretain systems.

<details>
<summary style="color: red;">Answer</summary>

C. `vmlinuz is compressed, and vmlinux is not` describes a difference between vmlinuz and vmlinux.

**Explanation:**
The vmlinuz file has been compressed using gzip and therfore consumes less disk space than vmlinux. Both contain the Linux kernel binary format. The other options are not valid.

**Domain:**
System Management

</details>

---

### Question 141

Which of the following is the location in which kernel modules are stored?

A. /usr/modules
B. /modules
C. /usr/lib/modules/{kernel-version}
D. /usr/modules/{kernel-version}

<details>
<summary style="color: red;">Answer</summary>

C. `/usr/lib/modules/{kernel-version}` is the location in which kernel modules are stored.

**Explanation:**
Moduels are stored in /usr/lib/modules/{kernel-version}. The other options are not valid.

**Domain:**
System Management

</details>

---

### Question 142

Which rpm option can be used to verify that no files have been altered since installation?

A. -V
B. -v
C. --verbose
D. --filesum

<details>
<summary style="color: red;">Answer</summary>

A. `-V` can be used with rpm to verify that no files have been altered since installation.

**Explanation:**
The -V or, --verify, option will check the files in a given package against versions (or checksums) in the package database. If no files have been altered, then no output is produced. Note that output may be produced for files that are changed during installation or for otehr reasons. Note also the use of an uppercase V for this option, as opposed to the lowercase v for verbose.

**Domain:**
System Management

</details>

---

### Question 143

Which of the following is not typically used to store shared libraries?

A. /lib
B. /etc/lib
C. /usr/lib
D. /usr/local/lib

<details>
<summary style="color: red;">Answer</summary>

B. `/etc/lib` is not typically used to store shared libraries.

**Explanation:**
The /etc/lib directory is not typically associated with library files and does not typically exist on a Linux system unless manually created. The other options either contain system libraries or are used for user-installed libraries.

**Domain:**
System Management

</details>

---

### Question 144

Which of the following commands updates the package cache for a Debian system?

A. apt-get cache-update
B. apt-cache update
C. apt-get update
D. apt-get upgrade

<details>
<summary style="color: red;">Answer</summary>

C. `apt-get update` updates the package cache for a Debian system.

**Explanation:**
The apt-get update command will cause the package cache to be updated by retrieving the latest package list from the package sources. There is no cache-update option or update option to apt-cache. The updade option is used to update the systems packages, not the cache.

**Domain:**
System Management

</details>

---

### Question 145

You need to update the configuration files for package repositories. Within which directory are details of the current package repositories stored on a Debian system?

A. /etc/apt.list
B. /etc/sources.list
C. /etc/apt/sources.list.d/
D. /etc/apt.d/sources.list

<details>
<summary style="color: red;">Answer</summary>

C. `/etc/apt/sources.list.d/` is where details of the current package repositories are stored on a Debian system.

**Explanation:**
The /etc/apt/sources.list.d/ directory contains repositories for Debian packages. The other file and directory locations do not exist by default.

**Domain:**
System Management

</details>

---

### Question 146

Which of the following commands is used to change the keyboard layout settings?

A. keybrdctl
B. keyctl
C. localectl
D. localemap

<details>
<summary style="color: red;">Answer</summary>

C. `localectl` is used to change the keyboard layout settings.

**Explanation:**
The localectl command is used to view and configure settings such as the keyboard layout for a given locale. The other coammnds listed do not exist.

**Domain:**
System Management

</details>

---

### Question 147

Which of the following directories contains configuration files related to networking?

A. /etc/netdevices/
B. /etc/netcfg/
C. /etc/config/network/
D. /etc/sysconfig/network-scripts/

<details>
<summary style="color: red;">Answer</summary>

D. `/etc/sysconfig/network-scripts/` contains configuration files related to networking.

**Explanation:**
The directory /etc/sysconfig/network-scripts contains files related to network configuration. It is not preferable to edit these files directly any longer but rather to use commands such as nmcli and nmtui through the Network Manager. The other paths do not exist by default.

**Domain:**
System Management

</details>

---

### Question 148

You need to change the label that has been applied to a filesystem. The filesystem is formatted as EXT4. Which EXT tool can be used to change the label?

A. e2lable
B. e4label
C. fslabel.ext4
D. fslabel

<details>
<summary style="color: red;">Answer</summary>

A. `e2label` can be used to change the label of an EXT4 filesystem.

**Explanation:**
The e2label command changes the filesystem label. The other commands do not exist.

**Domain:**

</details>

---

### Question 149

Which command should be used to make changes to the choices made when a Debian package was installed?

A. dpkg-reconfigure
B. dpkg -r
C. dpkg -reconf
D. apt-get reinstall

<details>
<summary style="color: red;">Answer</summary>

A. `dpkg-reconfigure` should be used to make changes to the choices made when a Debian package was installed.

**Explanation:**
The dpkg-reconfigure program will cause an already-installed package to be reconfigured or changed. The -r option for dpkg removes a package, thus making option B incorrect. There is no reconf option for dpkg, and the apt-get command is used to work with packages themselves, not to reconfigure them.

**Domain:**
System Management

</details>

---

### Question 150

Which option for yum performs a search of the package cache?

A. seek
B. query
C. --search
D. search

<details>
<summary style="color: red;">Answer</summary>

D. `search` performs a search of the package cache when using yum.

**Explanation:**
The search option performs a search of various fields such as the package name and description.

**Domain:**
System Management

</details>

---

### Question 151

Assume you need to add a kernel module with a custom command, such as to specify options at load time. Within which file could you add this configuration?

A. /etc/modprobe-cfg
B. /etc/modprobe.conf
C. /etc/modprobe.cf
D. /etc/modprobe.cfg

<details>
<summary style="color: red;">Answer</summary>

B. `/etc/modprobe.conf` is where you could add a configuration for a kernel module with a custom command.

**Explanation:**
The file /etc/modprobe.confg, which is a legacy file and may be removed in a later version of Linux, contains infomration on the configuration of modules on the system. The other files listed do not exist.

**Domain:**
System Management

</details>

---

### Question 152

Which command option for rpm can be used to show the version of the kernel?

A. rpm kernel
B. rpm -q kernel
C. rpm search kernel
D. rpm --list kern

<details>
<summary style="color: red;">Answer</summary>

B. `rpm -q kernel` can be used to show the version of the kernel.

**Explanation:**
The rpm -q kernel command will show the kernel version. You can also use uname -r for the same purpose. The other options are not valid.

**Domain:**
System Management

</details>

---

### Question 153

Which command is used to install a kernel into the /boot directory, using the files from /usr/lib/kernel?

A. kernel-ins
B. ins-kernel
C. install-kernel
D. kernel-install

<details>
<summary style="color: red;">Answer</summary>

D. `kernel-install` is used to install a kernel into the /boot directory, using the files from /usr/lib/kernel.

**Explanation:**
The kernel-install command uses the files found in the /usr/lib/kernel directory to install a kernel and related files into /boot. The otehr commands listed here are not valid.

**Domain:**
System Management

</details>

---

### Question 154

Which option in /etc/yum.conf is used to ensure that the kernel is not updated when the system is updated?

A. exclude=kernel\*
B. exclude-kernel
C. updatekernel=false
D. include-except=kernel

<details>
<summary style="color: red;">Answer</summary>

A. `exclude=kernel*` is used in /etc/yum.conf to ensure that the kernel is not updated when the system is updated.

**Explanation:**
The exclude option can be used to exclude certain packages. The argument accepts wildcards, and therefore excluding all kernel\* updates will create the desired behavior. The other options are not valid.

**Domain:**
System Management

</details>

---

### Question 155

When using fdisk to partition a disk, you have two partitions created for the system but still have leftover space, also called unallocated space, on the drive. What is another name used to refer to unallocated space?

A. Highly available
B. Redundant
C. Raw device
D. Partition forward

<details>
<summary style="color: red;">Answer</summary>

C. `Raw device` is another name used to refer to unallocated space.

**Explanation:**
A raw device is one that has not been partitioned. Raw devices are sometimes used for virtualizaiton and also database scenarios, where the higher-layer software manages the disk. The other options shown are not relevant to this answer. Highly available would only typically refer to a redundant disk or network scenario.

**Domain:**
System Management

</details>

---

### Question 156

Which command searches for and provides information on a given package on a Debian system, including whether the package is currently installed?

A. dpkg -i
B. dpkg -s
C. apt-cache
D. apt-info

<details>
<summary style="color: red;">Answer</summary>

B. `dpkg -s` searches for and provides information on a given package on a Debian system, including whether the package is currently installed.

**Explanation:**
The -s option to dpkg searches for the given packages and provides information about its current status on the system. The apt-cache command is not used for this purpose, and the -i option for dpkg installs a package. The apt-info command does not exist.

**Domain:**
System Management

</details>

---

### Question 157

Which of the following installs a previously downloaded Debian package?

A. dpkg -i <package name>
B. apt-get install <package name>
C. apt-slash <package name>
D. dpkg -U <package name>

<details>
<summary style="color: red;">Answer</summary>

A. `dpkg -i <package name>` installs a previously downloaded Debian package.

**Explanation:**
The -i option to dpkg will install a previously downloaded .deb Debian package. The other commands don't exist, and the -U option for dpkg does not exist.

**Domain:**
System Management

</details>

---

### Question 158

You need to obtain information about a package installed on an OpenSUSE system that uses the zypper command. Which of the following options to the zypper command displays information about the package?

A. inf
B. getInfo
C. info
D. i

<details>
<summary style="color: red;">Answer</summary>

C. `info` displays information about a package installed on an OpenSUSE system that uses the zypper command.

**Explanation:**
The info option to zypper displays information about a package. The other options are not valid.

**Domain:**
System Management

</details>

---

### Question 159

Which type of storage would be the most appropriate format to store a large object as a signle file in a cloud environment?

A. File
B. ext2
C. cifs
D. Blob

<details>
<summary style="color: red;">Answer</summary>

D. `Blob` would be the most appropriate format to store a large object as a single file in a cloud environment.

**Explanation:**
Blob, or Binary Large Object, is a storage format frequently associated with cloud environments. Blob storage enables a single object to be stored as an individual object. The other formats are valid, but none of the other options is the most appropriate for storing a large object as a single file in a cloud environment.

**Domain:**
System Management

</details>

---

### Question 160

You need to find available packages on a Fedora system managed by the dnf package system. Which option to the dnf command looks for a given package?

A. search
B. info
C. find
D. locate

<details>
<summary style="color: red;">Answer</summary>

A. `search` is the option to the dnf command that looks for a given package.

**Explanation:**
The search option looks for packages by the name given on the command line. The path that is searched can be controlled by the configuration file at /etc/dnf/dnf.conf. The other options are not valid for the dnf command.

**Domain:**
System Management

</details>

---

### Question 161

Which of the following real filesystems can be resized using resize2fs?

A. nfs
B. xfs
C. ext3
D. cifs

<details>
<summary style="color: red;">Answer</summary>

C. `ext3` is a real filesystem that can be resized using resize2fs.

**Explanation:**
The ext2, ext3, and ext4 filesystems can be resized using resize2fs. Both NFS and CIFS are network filesysetms and therefore are not relevant to this question. XFS is a real filesystem but is not resized using resize2fs. Instead, the xfs_growfs command is used.

**Domain:**
System Management

</details>

---

### Question 162

Which subcommand to the virsh command is used to connect to the hypervisor?

A. plug
B. hypervisorconnect
C. conhyper
D. connect

<details>
<summary style="color: red;">Answer</summary>

D. `connect` is the subcommand to the virsh command that is used to connect to the hypervisor.

**Explanation:**
The connect subcommand connects to the hypervisor. The other options are not valid.

**Domain:**
System Management

</details>

---

### Question 163

You need to determine if ASCII and Unicode are supported on the system. Which option to the iconv command shows the available character sets on a given system?

A. --showchar
B. --show
C. --list
D. --all

<details>
<summary style="color: red;">Answer</summary>

C. `--list` shows the available character sets on a given system when using the iconv command.

**Explanation:**
The --list option shows the available character sets on the system. Character sets such as ASCII, UTF-8, and UNICODE are displayed if they are supported on the system. The other options are not valid.

**Domain:**
System Management

</details>

---

### Question 164

Which of the following best describes the /dev/ filesystem?

A. The /dev/ filesystem is used for storing device information for connected devices.
B. The /dev/ filesystem is used for configuration files.
C. The /dev/ filesystem is used for development.
D. The /dev/ filesystem is used to list devices for compilation into the kernel.

<details>
<summary style="color: red;">Answer</summary>

A. The /dev/ filesystem is used for storing device information for connected devices.

**Explanation:**
The /dev/ filesystem is used to store information about connected devices, including block and character devices. The /dev/ filesystem also contains special character devices such as /dev/null, /dev/zero and /dev/urandom. The /etc/ filesystem is used for configuration files, and there are no proscribed directories for developemnt or kernel device lists.

**Domain:**
System Management

</details>

---

### Question 165

Which of the following files shows the currently mounted filesystems?

A. /etc/fstab
B. /proc/mounts
C. /fs
D. /root/mounts

<details>
<summary style="color: red;">Answer</summary>

B. `/proc/mounts` shows the currently mounted filesystems.

**Explanation:**
The /proc/mounts file shows the currently mounted filesystems. The /etc/fstab file contains information about filesystems and how they should be mounted. The /fs and /root/mounts files do not exist.

**Domain:**
System Management

</details>

---

### Question 166

When working with a Microsoft Windows-based filesystem, you see that it is mounted as a CIFS mount. What does CIFS stand for?

A. common information file sharing
B. common internet file system
C. cloned internet file sharing
D. created in five seconds

<details>
<summary style="color: red;">Answer</summary>

B. `common internet file system` is what CIFS stands for when working with a Microsoft Windows-based filesystem.

**Explanation:**
CIFS stands for Common Internet File System. CIFS is a network file system that is used to share files and printers over a network. CIFS is a dialect of the Server Message Block (SMB) protocol. The other options are not valid.

**Domain:**
System Management

</details>

---

### Question 167

When using sed for a subsitution operation, which option must be included so that the substitution applies to the entire line rather than just the first occurrence?

A. g
B. a
C. r
D. y

<details>
<summary style="color: red;">Answer</summary>

A. `g` must be included when using sed for a substitution operation so that the substitution applies to the entire line rather than just the first occurrence.

**Explanation:**
The g option is used to apply the substitution globally, meaning that it will apply to all occurrences of the pattern on the line. The other options are not valid. The a option is used to append text, the r option is used to read a file, and the y option is used to translate characters.

**Domain:**
System Management

</details>

---

### Question 168

Which option to the blkid command purges the cache to remove devices that do not exist?

A. -p
B. -a
C. -g
D. -m

<details>
<summary style="color: red;">Answer</summary>

C. `-g` is the option to the blkid command that purges the cache to remove devices that do not exist.

**Explanation:**
The -g option clears the cache to remove devices that do not exist. The -p option bypasses the cache. There are no -a or -m options for blkid.

**Domain:**
System Management

</details>

---

### Question 169

While you can use blkid to obtain the UUIDs for filesystems in order to facilitate storage space monitoring and disk usage, which location on the filesystem also shows this information?

A. /dev/diskybyuuid
B. /dev/uuid
C. /dev/fs/uuid
D. /dev/disk/by-uuid

<details>
<summary style="color: red;">Answer</summary>

D. `/dev/disk/by-uuid` is where you can find the UUIDs for filesystems on the filesystem.

**Explanation:**
The /dev/disk/by-uuid file shows the UUID of the disks on a system. The other locations do not exist.

**Domain:**
System Management

</details>

---

### Question 170

In a scripting scenario, you need to enable legacy locations for things like networking. Which file can be used for storing network configuration?

A. /etc/netdev
B. /etc/networking
C. /etc/sysconfig/network
D. /etc/sysconfig/netdev

<details>
<summary style="color: red;">Answer</summary>

C. `/etc/sysconfig/network` can be used for storing network configuration.

**Explanation:**
The /etc/sysconfig/network file is created by default but is no longer populated on systems like RHEL7. It can be used in place of Network Manager for environments that rely on this location. The otehr optiosn given do not exist.

**Domain:**
System Management

</details>

---

### Question 171

You are attempting to use rmdir to remove a directory, but there are still multiple files and other directories contained within it. Assuming that you're sure you want to remove the directory and all of its contents, what are the command and arguments to do so?

A. rm -f
B. rm -rf
C. rmdir -a
D. rmdir -m

<details>
<summary style="color: red;">Answer</summary>

B. `rm -rf` is the command and arguments to remove a directory and all of its contents.

**Explanation:**
The -rf options to rm will recursively remove contents of a directory, including other directories. The -f option alone will not work in this case because of the additional directroies. The options given for rmdir do not exist. The rmdir command is used to remove empty directories.

**Domain:**
System Management

</details>

---

### Question 172

Which of the following commands will provide the usernames in a sorted list gathered from the /etc/passwd file?

A. cat /etc/passwd | awk -F ':' '{print $1}' | sort
B. sort /etc/passwd | cut
C. echo /etc/passwd
D. cat /etc/passwd | awk '{print $1}' | sort

<details>
<summary style="color: red;">Answer</summary>

A. `cat /etc/passwd | awk -F ':' '{print $1}' | sort` will provide the usernames in a sorted list gathered from the /etc/passwd file.

**Explanation:**
The cat command will display the contents of the file /etc/passwd and then pipe that output to the awk command. The awk command then parses its input, splitting along the specified separator for /etc/passwd, which is a colon (:). The output is then printed and piped to the sort command. The sort command in option B will not work because the cut command requires and argument. Likewise, the echo command in option C will only echo /etc/passwd to STDOUT. The command in option D is close but does not specify the field separator for awk. The -F option is used to specify the field separator. The default field separator is a space. The $1 argument to awk specifies the first field. The sort command will then sort the output. The other options are not valid.

**Domain:**
System Management

</details>

---

### Question 173

What will be the result if the touch command is executed on a file that already exists?

A. The access timestamp of the file will change to the current time when the touch command was executed.
B. The file will be overwritten with a new file.
C. There will be no change to the file.
D. The file will be appended.

<details>
<summary style="color: red;">Answer</summary>

A. The access timestamp of the file will change to the current time when the touch command was executed.

**Explanation:**
The timestamp of the file will change when touch is run on a file that already exists. The other options are not valid.

**Domain:**
System Management

</details>

---

### Question 174

Which option to both mv and cp will cause the command to prompt before overwriting an existing file?

A. -f
B. -Z
C. -r
D. -i

<details>
<summary style="color: red;">Answer</summary>

D. `-i` will cause both mv and cp to prompt before overwriting an existing file.

**Explanation:**
The -i option will prompt before overwriting an existing file. The -f option will force the operation without prompting. The -Z option is not valid for either command, and the -r option is used to copy directories recursively.

**Domain:**
System Management

</details>

---

### Question 175

Which file contains the current list of partitions along with their major and minor numbers and the number of blocks used by each partition?

A. /dev/disk
B. /dev/partitions
C. /proc/disk
D. /proc/partitions

<details>
<summary style="color: red;">Answer</summary>

D. `/proc/partitions` contains the current list of partitions along with their major and minor numbers and the number of blocks used by each partition.

**Explanation:**
The /proc/partitions file contains a list of partitions on the system along with their major and minor numbers and the number of blocks. The /dev/disk/ option is a directory and not a file and is not correct for this question. The other options shown do not exist.

**Domain:**
System Management

</details>

---

### Question 176

Assuming a block storage device used for virtualization of sda, which file can be used to view the number of read I/O request for the device?

A. /proc/sys/sda
B. /proc/sys/sda/stat
C. /sys/block/sda/stat
D. /sys/disk/sda/stat

<details>
<summary style="color: red;">Answer</summary>

C. `/sys/block/sda/stat` can be used to view the number of read I/O requests for a block storage device used for virtualization.

**Explanation:**
The /sys/block/sda/stat file contains information about the number of read I/O requests for the block storage device sda. The /sys/block hirearchy contains information about block devices on the system. The other options do not exist.

**Domain:**
System Management

</details>

---

### Question 177

The current hierarchy on the server contains a directory called /usr/local. You need to create an additional directory below that called /usr/local/test/obtober. Which command will accomplish this?

A. mkdir -p /usr/local/test/october
B. mkdir /usr/local/test/october
C. mkdir -r /usr/local/test/october
D. mkdir -f /usr/local/test/october

<details>
<summary style="color: red;">Answer</summary>

A. `mkdir -p /usr/local/test/october` will create an additional directory below /usr/local called /usr/local/test/october.

**Explanation:**
The -p option will cause mkdir to create additional levels of directories without error. Running mkdir without options will not work in this case. The -r and -f options to mkdir do not exist.

**Domain:**
System Management

</details>

---

### Question 178

What command is used to bring a command to foreground processing after it has been backgrounded with an &?

A. bg
B. fore
C. 4g
D. fg

<details>
<summary style="color: red;">Answer</summary>

D. `fg` is used to bring a command to foreground processing after it has been backgrounded with an &.

**Explanation:**
The fg command is used to bring a command to the foreground after it has been backgrounded with an &. The bg command is used to background a process. The fore and 4g commands do not exist.

**Domain:**
System Management

</details>

---

### Question 179

You are using the Vi editor to change a file, and you need to exit. You receive a notice indicating "No write since last change." Assuming you want to save your work, which of the following commnads will save your work and exit Vi?

A. :wq
B. :q!
C. dd
D. x

<details>
<summary style="color: red;">Answer</summary>

A. `:wq` will save your work and exit Vi.

**Explanation:**
The :wq command will save your work and exit Vi. The :q! command will exit without saving changes. The dd command is used to delete a line, and the x command is used to delete a character.

**Domain:**
System Management

</details>

---

### Question 180

When using a multipath device managed by mulitpathd and found in /dev/disk/by-mulitpath, what is the name given to the identifier for that device that is globally unique?

A. UUID
B. WWID
C. GUID
D. DISKID

<details>
<summary style="color: red;">Answer</summary>

B. `WWID` is the name given to the identifier for a multipath device that is globally unique.

**Explanation:**
The WWID, or World Wide Identifier, is a globally unique identifier for a multipath device. The UUID is a unique identifier for a filesystem. The GUID is a globally unique identifier for a disk. The DISKID is not a valid term.

**Domain:**
System Management

</details>

---

### Question 181

You have attempted to stop a process using its service command and also using the kill command. Which signal can be sent to the process using the kill command in order to force the process to end?

A. -15
B. -f
C. -9
D. -stop

<details>
<summary style="color: red;">Answer</summary>

C. `-9` can be sent to a process using the kill command in order to force the process to end.

**Explanation:**
The -9 option invokes the SIGKILL, whihc will force the process to end. The 15 signal is the default. The -f and -stop options do not exist.

**Domain:**
System Management

</details>

---

### Question 182

When editing with Vi, which command changes into insert mode and opens a new line below the current cursor location?

A. f
B. a
C. o
D. i

<details>
<summary style="color: red;">Answer</summary>

C. `o` changes into insert mode and opens a new line below the current cursor location when using Vi.

**Explanation:**
The o command will open a new line below the current cursor location and change into insert mode. The f command is used to move the cursor to the next occurrence of a character. The a command is used to append text. The i command is used to insert text.

**Domain:**
System Management

</details>

---

### Question 183

While recovering from a kernel panic and using the console, you are having difficulty working with the console due to continual message being displayed on the console itself. Which option to dmesg can be used to disable logging to the console?

A. -o "no logging console"
B. -D
C. -Q
D. -F

<details>
<summary style="color: red;">Answer</summary>

B. `-D` can be used with dmesg to disable logging to the console.

**Explanation:**
The -D option to dmesg will disable logging to the console. The other options are not valid. The -o option is used to specify the output format. The -Q option is not valid, and the -F option is used to specify the output format.

**Domain:**
System Management

</details>

---

### Question 184

Which option to rmmod forces the module to be unloaded?

A. -f
B. -a
C. -w
D. -h

<details>
<summary style="color: red;">Answer</summary>

A. `-f` forces the module to be unloaded when using rmmod.

**Explanation:**
The -f option forces the module to be unloaded. The -a option is not valid. The -w option is not valid, and the -h option is used to display help.

**Domain:**

</details>

---

### Question 185

Which command-line option modifies the behavior of the depmod such that only newer modules are added when comparing modules.dep

A. -A
B. -B
C. -C
D. -D

<details>
<summary style="color: red;">Answer</summary>

A. `-A` modifies the behavior of depmod such that only newer modules are added when comparing modules.dep.

**Explanation:**
The -A option examines modules.dep for newer modules rather than regenerating the file automatically if there are no changes. The -C option changes the configuration file location. The other options are not valid for depmod.

**Domain:**
System Management

</details>

---

### Question 186

Which command prints device and partition information in a tree-like structure, including partition size and current mount status?

A. fsck
B. lsblk
C. blkshow
D. shblk

<details>
<summary style="color: red;">Answer</summary>

B. `lsblk` prints device and partition information in a tree-like structure, including partition size and current mount status.

**Explanation:**
The lsblk command shows device information in a tree-like structure and shows the otehr information specified along with major and minor information and whether the partition is read-only. Of the other options given, fsck is the only command, and it is not used for the purpose described.

**Domain:**
System Management

</details>

---

### Question 187

You need to create a script for use with the parted command. When using the parted command to obtain a list of partitions, which additional option formats the output such that it can be more easily parsed by a script?

A. -p
B. -S
C. -m
D. -v

<details>
<summary style="color: red;">Answer</summary>

C. `-m` is the option to the parted command that formats the output such that it can be more easily parsed by a script.

**Explanation:**
The -m option formats the output of the parted command such that it can be more easily parsed by a script. The -p option is not valid for parted. The -S option is used to specify a script file to be run by parted. The -v option is not valid for parted.

**Domain:**
System Management

</details>

---

### Question 188

Which command is used to create an Ethernet bridge?

A. bridgecon
B. brctl
C. bridgeman
D. BridgeManager

<details>
<summary style="color: red;">Answer</summary>

B. `brctl` is used to create an Ethernet bridge.

**Explanation:**
The brctl command is used to create ethernet bridges and is also used to manage bridges once they are created. The other options are not valid.

**Domain:**
System Management

</details>

---

### Question 189

Which kill signal can be sent in order to restart a process?

A. -HUP
B. -RESTART
C. -9
D. -SIG

<details>
<summary style="color: red;">Answer</summary>

A. `-HUP` can be sent as a kill signal in order to restart a process.

**Explanation:**
Sending -HUP as part of the kill command will restart a process. Of the other options, -9 will kill the process completely. The other two options do not exist as valid means to kill a process.

**Domain:**
System Management

</details>

---

### Question 190

Which command will move all files with a .txt extension to the /tmp directory?

A. mv txt* tmp
B. move *txt /temp
C. mv _.txt /tmp
D. mv _.txt tmp

<details>
<summary style="color: red;">Answer</summary>

C. `mv *.txt /tmp` will move all files with a .txt extension to the /tmp directory.

**Explanation:**
The mv command is used to move files, and \*.txt will look for all files with a .txt extension. Note the fully qualified destination with a / preceding the name tmp.

**Domain:**
System Management

</details>

---

### Question 191

When using nslookup interactively, which of the following commands changes the destination to which queries will be sent?

A. dest
B. server
C. queryhost
D. destination

<details>
<summary style="color: red;">Answer</summary>

B. `server` changes the destination to which queries will be sent when using nslookup interactively.

**Explanation:**
The server command changes the destination for queries sent from nslookup during the session in which it's used. The other options shown are not valid.

**Domain:**
System Management

</details>

---

### Question 192

Another administrator made a change to one of the local scripts stored in /usr/local/bin and used for administrative purposes.
The change was also immediately reflected in the copy of the script in your home directory.
However, when you examine the file with ls, it appears to be a normal file. What is the likely cause of such a scenario?

A. The file was executed after edit.
B. The administrator copied the file to yours.
C. Your file is a hard link to the original.
D. The file has been restored from backup.

<details>
<summary style="color: red;">Answer</summary>

C. The likely cause of the scenario is that your file is a hard link to the original.

**Explanation:**
The file is almost certainly a hard link to the original script. While ls won't show this information, the stat command will show that it is a link and also show the inode to which the file is linked.

**Domain:**
System Management

</details>

---

### Question 193

Which option to ln creates a symlink to another file?

A. -sl
B. -s
C. -l
D. --ln

<details>
<summary style="color: red;">Answer</summary>

B. `-s` creates a symlink to another file when using ln.

**Explanation:**
The -s option to ln creates a symbolic link, or symlink.

**Domain:**
System Management

</details>

---

### Question 194

When using ls -la to obtain a directory listing, you see an object with permissions of lrwxrwxrwx. What type of object is this?

A. It is a directory.
B. It is a symlink.
C. It is a temporary file.
D. It is a local file.

<details>
<summary style="color: red;">Answer</summary>

B. An object with permissions of lrwxrwxrwx is a symlink.

**Explanation:**
The l within the listing indicates a symlink. There is no way to tell if a file or directory is temporary. A directory will display a d instead of an l.

**Domain:**
System Management

</details>

---

### Question 195

On a system using SysVinit as part of the basic boot process, in which directory are startup and shutdown scripts for services stored?

A. /etc/init-d
B. /etc/init
C. /etc/sysV
D. /etc/init.d

<details>
<summary style="color: red;">Answer</summary>

D. Startup and shutdown scripts for services are stored in the /etc/init.d directory on a system using SysVinit.

**Explanation:**
Scripts are stored in /etc/init.d on a system using SysVinit. You may sometimes find these linked from /etc/rc.d/init.d. The other directories listed do not exist.

**Domain:**
System Management

</details>

---

### Question 196

Which option to the cp command will copy directories in a recursive manner?

A. -v
B. -R
C. -Z
D. -i

<details>
<summary style="color: red;">Answer</summary>

B. `-R` will copy directories in a recursive manner when using the cp command.

**Explanation:**
The -R option will copy directories recursively. Note that if the -i option is not enabled, the recursive copy will overwrite files in the destination.
The -v option adds verbosity but does not cause a recursive copy. The -Z option is not valid for cp.

**Domain:**
System Management

</details>

---

### Question 197

Which option to df displays the output in human-readable format?

A. -h
B. -m
C. -j
D. -s

<details>
<summary style="color: red;">Answer</summary>

A. `-h` displays the output of df in human-readable format.

**Explanation:**
The -h option displays output in human-readable format, meaning that the output will be displayed as megabytes, gigabytes, terabytes, and so on. The otehr options are not valid.

**Domain:**
System Management

</details>

---

### Question 198

Which command creates a TCP connection to the server wwww.example.com on port 80?

A. nc www.example.com 80
B. nc www.example.com
C. nc www.example.com:80
D. nc:80 www.example.com

<details>
<summary style="color: red;">Answer</summary>

A. `nc www.example.com 80` creates a TCP connection to the server www.example.com on port 80.

**Explanation:**
The netcat tool used with the nc command can create a network connection, and the format is nc <host> <port>, thus making options other than that incorrect.

**Domain:**
System Management

</details>

---

### Question 199

Which option to the file command specifies that file should examine compressed files?

A. -a
B. -z
C. -w
D. -b

<details>
<summary style="color: red;">Answer</summary>

B. `-z` specifies that file should examine compressed files when using the file command.

**Explanation:**
The -z option causes file to look inside compressed files. The -b option specifies brief output, and the other options don't exist.

**Domain:**
System Management

</details>

---

### Question 200

Which option to Vim enables editing of binary or executable files?

A. -a
B. -b
C. -c
D. -d

<details>
<summary style="color: red;">Answer</summary>

B. `-b` enables editing of binary or executable files when using Vim.

**Explanation:**
The -b option enables binary and executable editing with Vim. The -c option is related to commands, while the -d opiton starts Vim in diff mode. There is no -a option.

**Domain:**
System Management

</details>

---

### Question 201

When using the rmdir command, whihc option also removes child directories?

A. -c
B. -p
C. -m
D. -a

<details>
<summary style="color: red;">Answer</summary>

B. `-p` also removes child directories when using the rmdir command.

**Explanation:**
The -p option removes the hierarchy of directories. The other options do not exist.

**Domain:**
System Management

</details>

---

### Question 202

Emptying or clearing a block device is sometimes accomplished by writing zeroes to the device. Which file is used for this purpose?

A. /dev/format
B. /dev/go
C. /dev/zero
D. /tmp

<details>
<summary style="color: red;">Answer</summary>

C. `/dev/zero` is used for emptying or clearing a block device by writing zeroes to the device.

**Explanation:**
The /dev/zero special file is used as input to the dd command to write zeros or clear a block device. The other options either do not exist or are not used for this purpose.

**Domain:**
System Management

</details>

---

### Question 203

Which option to zip updates files within the archive?

A. -a
B. -f
C. -d
D. -e

<details>
<summary style="color: red;">Answer</summary>

B. `-f` updates files within the archive when using zip.

**Explanation:**
The -f opiton freshens the files within the archive. The -d option deletes from the archive. The other options do not exist.

**Domain:**
System Management

</details>

---

### Question 204

Which of the following will execute a job through cron at 12:15 am and 12:15 pm every day?

A. 0,12 15 \* \* \*
B. 15 0,12 \* \* \*
C. 15 \* \* \* 0/12
D. \*/12 \* \* \* 15

<details>
<summary style="color: red;">Answer</summary>

B. `15 0,12 * * *` will execute a job through cron at 12:15 am and 12:15 pm every day.

**Explanation:**
The format for cron is [minute hour day-of-month month-of-year day-of-week]. 15 in the first field means the job will run at the 15th minute of the hour. 0,12 in the second field specifies two hours: 0 (midnight) and 12 (noon).
The rest of the fields \* \* \* indicate that the job will run on any day, month, and weekday. Thereby making option B the correct option for this question.

**Domain:**

</details>

---

### Question 205

Which file is used to provide a list of users that can add and delete cron jobs?

A. /etc/cron.job
B. /etc/cron.allow
C. /etc/cron.users
D. /etc/crontab

<details>
<summary style="color: red;">Answer</summary>

B. `/etc/cron.allow` is used to provide a list of users that can add and delete cron jobs.

**Explanation:**
The /etc/cron.allow file is a list of users who have permission to create and remove their own cron jobs.
The /etc/crontab file is used to store cron jobs. The other options do not exist.

**Domain:**
System Management

</details>

---

### Question 206

Which of the following commands schedules a series of commands to execute one hour from now?

A. atq + 1hr
B. at now + 1 hour
C. atq
D. at -1

<details>
<summary style="color: red;">Answer</summary>

B. `at now + 1 hour` schedules a series of commands to execute

**Explanation:**
The at command is used to run a series of commands that you enter. Unlike with cron, you can schedule commands from the command line
to be executed in the same order entered rather than having to create a specific script for the commands. The syntax shown in option B sets the time to be one hour from now.

**Domain:**
System Management

</details>

---

### Question 207

Which of the following best describes the /proc filesystem?

A. /proc contains information about files to be processed.
B. /proc contains configuration files for processes.
C. /proc contains information on currently running processes, including the kernel.
D. /proc contains variable data such as mail and web files.

<details>
<summary style="color: red;">Answer</summary>

C. `/proc` contains information on currently running processes, including the kernel.

**Explanation:**
The /proc filesystem contains information about currently running processes and additional information
about the kernel and current boot of the system. The other options are not valid.

**Domain:**
System Management

</details>

---

### Question 208

Which option to fdisk provides a list of partitions on a given device?

A. -s
B. -l
C. -e
D. -d

<details>
<summary style="color: red;">Answer</summary>

B. `-l` provides a list of partitions on a given device when using fdisk.

**Explanation:**
The -l option lists partitions available on a given device. The -s option prints the size in 512-byte block
sectors. The other options do not exist.

**Domain:**
System Management

</details>

---

### Question 209

Within which directory would you find a list of files corresponding to the users who have current cron jobs on the system?

A. /var/spool/cron/crontabs
B. /var/spool/jobs
C. /etc/cron
D. /etc/cron.users

<details>
<summary style="color: red;">Answer</summary>

A. `/var/spool/cron/crontabs` contains a list of files corresponding to the users who have current cron jobs on the system.

**Explanation:**
The /var/spool/cron/crontabs directory contains a file for each user that currently has one or more cron jobs or entries.
Note that the other files listed here are not valid for this purpose.

**Domain:**
System Management

</details>

---

### Question 210

Which command deletes an at job with an ID of 3?

A. atq
B. at -l
C. atrm 3
D. rmat 3

<details>
<summary style="color: red;">Answer</summary>

C. `atrm 3` deletes an at job with an ID of 3.

**Explanation:**
The atrm command removes jobs given their ID. The ID can be obtained with the atq command. The atq and at -l commands shown
will list jobs but not delete them. The rmat command is not valid.

**Domain:**
System Management

</details>

---

### Question 211

Which of the following is used as a system-wide cron file?

A. /etc/cron.d
B. /etc/cron.sys
C. /etc/crontab
D. /etc/cron.tab

<details>
<summary style="color: red;">Answer</summary>

C. `/etc/crontab` is used as a system-wide cron file.

**Explanation:**
The /etc/crontab file is a plain-text file that is treated as a system-wide cron file.
As such, the file is generally not associated with any single user, and it's not necessary to run a special command
after editing the file to activate the changes. The other options do not exist.

**Domain:**
System Management

</details>

---

### Question 212

Whitin which directory will you find scripts that are scheduled to run through cron every 24 hours?

A. /etc/cron.daily
B. /etc/cron.weekly
C. /etc/cron.hourly24
D. /etc/crontab

<details>
<summary style="color: red;">Answer</summary>

A. `/etc/cron.daily` contains scripts that are scheduled to run through cron every 24 hours.

**Explanation:**
The /etc/cron.daily directory contains files such as scripts that are executed daily.
There are corresponding cron.hourly, cron.weekly, and cron.monthly directories that run on their respective schedules as indicated by the name of each directory.
The /etc/crontab file is a system-wide cron file.

**Domain:**
System Management

</details>

---

### Question 213

The system that you're working with recently had a hard drive failure, resulting in degraded storage. A new hard drive has been installed and Linux has been restored
from a backup to the drive. However, the system will not boot and instead shows a grub > prompt. Within the grub > prompt, which command will show the current partitions as seen by GRUB?

A. ls
B. showPart
C. partitionlist
D. ps

<details>
<summary style="color: red;">Answer</summary>

A. `ls` will show the current partitions as seen by GRUB within the grub > prompt.

**Explanation:**
The ls command from within the grub > prompt will show the available partitions in a fromat such as (hd0, 1).

**Domain:**
System Management

</details>

---

### Question 214

A legacy PATA disk is used to boot the system. You recently added an internal DVD drive to the computer, and now the system will no longer boot.
What is the most likely cause?

A. The BIOS has identified the DVD drive as the first disk, and therefore the system can no longer find the Linux partition(s).
B. The hard drive became corrupt when the DVD drive was installed.
C. The hot swap option has not been enabled in the BIOS.
D. The DVD drive is not detected by the computer and needs to be enabled first in the BIOS and then in Linux prior to installation.

<details>
<summary style="color: red;">Answer</summary>

A. The most likely cause is that the BIOS has identified the DVD drive as the first disk, and therefore the system can no longer find the Linux partition(s).

**Explanation:**
With cable select, ATA drives will be detected in the order in which they are plugged in on the cable from the motherboard. It's likely that the drives need to be swapped
physically on the cable.

**Domain:**
System Management

</details>

---

### Question 215

Which of the following will run a command called /usr/local/bin/changehome.sh as the www-data user when placed in /etc/crontab?

A. 1 1 \* \* _ www-data /usr/local/bin/changehome.sh
B. www-data changehome.sh
C. _/1 www-data changehome.sh
D. \* \* \* / www-data /usr/local/bin/changehome.sh

<details>
<summary style="color: red;">Answer</summary>

A. `1 1 * * * www-data /usr/local/bin/changehome.sh` will run the command as the www-data user when placed in /etc/crontab.

**Explanation:**
The format when adding a username places the username between the schedule and the command to run, thereby making option A correct. The other options shown for this
question are invalid. In the case of option B, there is no schedule. In the case of options C and D, the schedule is incorrectly formatted.

**Domain:**
System Management

</details>

---

### Question 216

Which command and option are used to update a Debian system to the latest software?

A. apt-update
B. apt-get upgrade
C. dpkg-U
D. apt-cache clean

<details>
<summary style="color: red;">Answer</summary>

B. `apt-get upgrade` is used to update a Debian system to the latest software.

**Explanation:**
The upgrade option for apt-get will upgrade the system to the latest version of software for packages already installed. The apt-update command does not exist, nor does the -U
option to dpkg. The apt-cache command is used to work with the package cache.

**Domain:**
System Management

</details>

---

### Question 217

You need to write a script that gathers all the process IDs for all instances of Apache running on the system. Which of the following
commands will accomplish this task?

A. ps auwx | grep apache
B. pgrep apache
C. processlist apache
D. ls -p apache

<details>
<summary style="color: red;">Answer</summary>

B. `pgrep apache` will gather all the process IDs for all instances of Apache running on the system.

**Explanation:**
While the ps auws command combined with grep will provide information on the running Apache instances, it will proivde much
more information than is required or useful for this problem. The pgrep command provides only the process IDs and therefore meets the criteria presented in the question.

**Domain:**
System Management

</details>

---

### Question 218

Which command can be run to detemine the default priority for processes spawned by the current user?

A. prio
B. nice
C. renice
D. defpriority

<details>
<summary style="color: red;">Answer</summary>

B. `nice` can be run to determine the default priority for processes spawned by the current user.

**Explanation:**
The nice command, when run without arguments, will output the priority for the currently logged-in user, which is normally 0. The renice command can be used to change
the priority of running processes. The other two commands shown as options for this question do not exist.

**Domain:**
System Management

</details>

---

### Question 219

Which of the following commands shows the usage of inodes across all filesystems?

A. df -i
B. ls -i
C. du -i
D. dm -i

<details>
<summary style="color: red;">Answer</summary>

A. `df -i` shows the usage of inodes across all filesystems.

**Explanation:**
The -i option to df produces information on inodes across all filesystems. The ls -i option will produce listings but only for the current directory. The -i option is invalid for du, and dm does not exist as a command.

**Domain:**
System Management

</details>

---

### Question 220

Which command will list the cron entries for a given user as denoted by <username>?

A. crontab -l -u <username>
B. crontab -u <username>
C. cron -u <username>
D. cronent -u <username>

<details>
<summary style="color: red;">Answer</summary>

A. `crontab -l -u <username>` will list the cron entries for a given user.

**Explanation:**
The crontab command can be used for this purpose, and the -l option is used to list the crontab entries. The -u option is needed to specify a user other than the current user.

**Domain:**
System Management

</details>

---

### Question 221

You are having difficulty with an interface on the server, and it is currently down. Assuming that there is not a hardware failure on the device
itself, which command and option can you use to display information about the interface?

A. ifconfig -a
B. ifup
C. netstat -n
D. ipconfig

<details>
<summary style="color: red;">Answer</summary>

A. `ifconfig -a` can be used to display information about the interface.

**Explanation:**
The ifconfig command will be used for this purpose and requires the addition of the -a option because the adapter is currently down. The ifup command can be used to bring the interface up, but does not display information by default. The netsat command displays information about the network but not with the -n option.

**Domain:**
System Management

</details>

---

### Question 222

Which option to the traceroute command will use TCP SYN packets for the path trace?

A. -T
B. -t
C. -s
D. -i

<details>
<summary style="color: red;">Answer</summary>

A. `-T` will use TCP SYN packets for the path trace when using the traceroute command.

**Explanation:**
The -T option causes traceroute to use TCP packets. This option, which requires root privileges, can be helpful for situations where a firewall may be blocking traceroute traffic. The -i option chooses the interfac, while -s
chooses the source address. A lowercase -t option sets the Type of Service (ToS) flag.

**Domain:**
System Management

</details>

---

### Question 223

When troubleshooting an issue where SSH connections are timing out, you think the firewal is blocking SSH connections. Which of the following ports is used for Secure Shell communication?

A. TCP/23
B. TCP/25
C. TCP/22
D. TCP/2200

<details>
<summary style="color: red;">Answer</summary>

C. TCP/22 is used for Secure Shell communication.

**Explanation:**
Secure Shell, of SSH, operates on TCP port 22 by default. The TCP/23 is used for Telnet, TCP/25 is SMTP, and TCP/2200 is not associated with a well known service.

**Domain:**
System Management

</details>

---

### Question 224

Which options for netcat will create a server listening on port 8080?

A. netcat -p 8080
B. nc -l -p 8080
C. nc -p 8080
D. nc -s 8080

<details>
<summary style="color: red;">Answer</summary>

B. `nc -l -p 8080` will create a server listening on port 8080.

**Explanation:**
The nc command is used to start netcat, and the -l option causes it to listen. The -p option specifies the local source address and is not used for this purpose. The -s option specifies the source address and is not used for this purpose.

**Domain:**
System Management

</details>

---

### Question 225

Which of the following commands displays the Start of Authority information for the domain example.com?

A. dig example.com soa
B. dig example.com authority
C. dig example.com -auth
D. dig -t auth example.com

<details>
<summary style="color: red;">Answer</summary>

A. `dig example.com soa` displays the Start of Authority information for the domain example.com.

**Explanation:**
The soa type is used to query for the Start of authority records for a domain. Note that in mnany cases, dig will attempt to look up the domain within a given command and way not appear to have had an error. For example when running option D (Dig -t auth example.com), you will receive information about example.com, and there will be a line in the output that dig has ignoreedthe invalid type auth.

**Domain:**
System Management

</details>

---

### Question 226

When configuring a local NTP server role, to what server address can you set the servers NTP client.

A. 127.0.0.1
B. 192.168.1.100
C. ntp.example.com
D. pool.ntp.org

<details>
<summary style="color: red;">Answer</summary>

A. You can set the servers NTP client to 127.0.0.1 when configuring a local NTP server role.

**Explanation:**
Setting your address to 127.0.0.1 will use the localhost interface. Other local NTP clients would contact this server by its normal IP address.

**Domain:**
System Management

</details>

---

### Question 227

A developer has created an application and wants to take advantage of syslog for logging to a custom log file. Which facility should be used for an application such as this?

A. syslog
B. kern
C. local#
D. user

<details>
<summary style="color: red;">Answer</summary>

C. The local# facility should be used for an application such as this.

**Explanation:**
The application could theoretically use any of the logging facilities, depending on the type of application being developed. However, the requirement to log
to a custom log file means the logs will have a different location than the standard logs. Therefore, logging to any of the standard or system-level facilities is not appropriate for this
scenario, so one of the local (local0 through local7) facilities should be used. The local# facility is used for custom logs. The syslog facility is used for system logs, the kern facility is used for kernel logs, and the user facility is used for user-level logs.

**Domain:**
System Management

</details>

---

### Question 228

You are troubleshooting a DNS problem using the dig command and receive a "status: NXDOMAIN" message. Which of the following best describes what NXDOMAIN means?

A. NXDOMAIN means you have recieved a non-autoritative answer for the query.
B. NXDOMAIN means the domain does not exist.
C. NXDOMAIN indicates a successful query.
D. NXDOMAIN signifies that a new domain record has been added.

<details>
<summary style="color: red;">Answer</summary>

B. NXDOMAIN means the domain does not exist.

**Explanation:**

NXDOMAIN is the status for a nonexistent domain or host: basically, the host for which the query was sent does not exist. A normal status when there
has not been an error is "NOERROR". The other options are not valid.

**Domain:**
System Management

</details>

---

### Question 229

Which of the following can be used to restart the CUPS service after a configuration change on a server running systemd?

A. systemctl restart cups.service
B. systemctl restart cups
C. systemctl reboot cups.target
D. systemctl restart cups.target

<details>
<summary style="color: red;">Answer</summary>

A. `systemctl restart cups.service` can be used to restart the CUPS service after a configuration change on a server running systemd.

**Explanation:**
The systemctl command is used for controlling services. In this case, restart should be sent to the CUPS service as denoted by the name cups.service. The other options are not valid.

**Domain:**
System Management

</details>

---

### Question 230

You need to temporarily prevent users from logging in to the system using SSH or other means. Which of the following describes one method for accomplishing this task?

A. Run touch /etc/nologin
B. Disable sshd.
C. Remove /etc/login.
D. Add a shadow file.

<details>
<summary style="color: red;">Answer</summary>

A. Running `touch /etc/nologin` will temporarily prevent users from logging in to the system using SSH or other means.

**Explanation:**
If /etc/nologin exists, users will be prevented from logging in to the system. The root user can still log in, assuming that root logins are enabled
within the SSH configuration. The other options are not valid.

**Domain:**
System Management

</details>

---

### Question 231

When expiring a user account with usermod -e, which of the following represents the correct data format?

A. YYYY-MM-DD
B. MM/DD/YYYY
C. DD/MM/YY
D. MM/DD/YY HH:MM:SS

<details>
<summary style="color: red;">Answer</summary>

A. `YYYY-MM-DD` represents the correct data format when expiring a user account with usermod -e.

**Explanation:**
The correct format is YYYY-MM-DD. The other options are not valid.

**Domain:**
System Management

</details>

---

### Question 232

Which of the following commands can be used to stop a given service, such as httpd.service, from starting on boot with a systemd-based system?

A. systemctl disable httpd.service
B. systemctl stop httpd.service
C. systemd disable httpd.service
D. systemd enable httpd.service boot=no

<details>
<summary style="color: red;">Answer</summary>

A. `systemctl disable httpd.service` can be used to stop a given service from starting on boot with a systemd-based system.

**Explanation:**
The systemctl command will be used for this purpose, and the subcommand is disable. There is a stop subcommand, but it will only stop the given service
rather than prevent it from starting on boot. The other options are invalid for various reasons, including that they use
systemd as the command name rather than systemctl.

**Domain:**
System Management

</details>

---

### Question 233

Which of the following commands searches the entire filesystem for files with the setuid bit set?

A. find ./ -perm suid
B. find / -perm 4000
C. find / -type suid
D. find / -type f -perm setuid

<details>
<summary style="color: red;">Answer</summary>

B. `find / -perm 4000` searches the entire filesystem for files with the setuid bit set.

**Explanation:**
The find command will be used for this purpose, and the permission can be described as 4000 to indicate the presence of the setuid bit. The -type option can be used for changing the type of object to be returned but is not relevant for the scenario described. The other options are invalid.

**Domain:**
System Management

</details>

---

### Question 234

You are upgrading the kernel that has been previously compiled on the same server. Which of the following commands incorporates the contents of the existing
kernel configuration into the new kernel?

A. config --merge
B. make oldconfig
C. merge config
D. int configs

<details>
<summary style="color: red;">Answer</summary>

B. `make oldconfig` incorporates the contents of the existing kernel configuration into the new kernel.

**Explanation:**
The make oldconfig command will integrate the existing configuration file into the new configuration for the kernel. Care still needs to be taken for items that have moved or changed
within the new kernel, to ensure that the configuration is correct. The other options are invalid.

**Domain:**
System Management

</details>

---

### Question 235

Which of the following commands should you execute after making changes to systemd service configurations in order for those changes to take effect?

A. systemd reload
B. reboot
C. systemctl daemon-reload
D. systemctl reboot

<details>
<summary style="color: red;">Answer</summary>

C. `systemctl daemon-reload` should be executed after making changes to systemd service configurations in order for those changes to take effect.

**Explanation:**
The systemctl command will be used for this purpose, with the daemon-reload subcommand. The reboot option would work to reload the systemd configuration
but is not correct because it requires the entire server to reboot, which is not what was asked for in this question. The other options are invalid.

**Domain:**
System Management

</details>

---

### Question 236

As a system administrator, you need to change options for automount. Which of the following
files is the default configuration file for the autofs automounter?

A. /etc/autofs
B. /etc/auto.master
C. /etc/autofs.conf
D. /etc/automounter.conf

<details>
<summary style="color: red;">Answer</summary>

B. `/etc/auto.master` is the default configuration file for the autofs automounter.

**Explanation:**
The file /etc/auto.master contains the configuration for autofs. The other files listed as options are not valid for this scenario.

**Domain:**
System Management

</details>

---

### Question 237

Which of the following directory hierarchies contains information such as the WWN for Fibre Channel?

A. /sys/class/wwn
B. /sys/class/fc_host
C. /sys/class/fclist
D. /sys/class/fclist

<details>
<summary style="color: red;">Answer</summary>

B. `/sys/class/fc_host` contains information such as the WWN for Fibre Channel.

**Explanation:**
The directory /sys/class/fc_host contains other directories based on the Fibre Channel connections available. Within those host directories will be found
the WWN (World Wide Name) in a file called port_name. The fcstat command can be used to obtain statistics related to a given device. The other directory hierarchies are not valid.

**Domain:**
System Management

</details>

---

### Question 238

Which option to the rsync command provides archive mode?

A. -r
B. -o
C. -a
D. -f

<details>
<summary style="color: red;">Answer</summary>

C. `-a` provides archive mode when using the rsync command.

**Explanation:**
The -a option provides archive mode, which is a substitute for several other options.
The -r option is recursive, the -o option indicates that ownership should be preserved, and the -f option enables a filter. None of these options provide the same functionality as the -a option.

**Domain:**
System Management

</details>

---

### Question 239

When compiling software such as with the gcc compiler, which of the following is the recommended name for a file containing commands and relationships
used with the make command?

A. Makefile
B. makefile
C. make.file
D. MakeFile.txt

<details>
<summary style="color: red;">Answer</summary>

A. `Makefile` is the recommended name for a file containing commands and relationships used with the make command.

**Explanation:**
According to the man(1) page for the make command, the name Makefile, with an upperacse M, is the recommended name for the file. The name makefile is valid as a default but
is not the recommended option. The other options are not valid as default names.

**Domain:**
System Management

</details>

---

### Question 240

You have downloaded a source file with the extension .gz. Which of the following commands will uncompress the file?

A. unzip
B. gunzip
C. dezip
D. uncomp

<details>
<summary style="color: red;">Answer</summary>

B. `gunzip` will uncompress the file with the extension .gz.

**Explanation:**
The gunzip command is used to uncompress files that have been compressed using hzip compression. The unzip command is used for files compressed with zip compression. The dezip and uncomp commands do not exist.

**Domain:**
System Management

</details>

---

### Question 241

Which target for make, typically included in the makefule for most projects, will place compiled files into their final destination
and perform other operations such as making the appropriate files executable?

A. list
B. distclean
C. run
D. install

<details>
<summary style="color: red;">Answer</summary>

D. `install` will place compiled files into their final destination and perform other operations such as making the appropriate files executable.

**Explanation:**
The install target installs the final compiled files in their appropriate location and makes them executable, if applicable.
Of the other options, distclean is sometimes included as a target to return source files to their pristine state. The other targets listed are not valid.

**Domain:**
System Management

</details>

---

### Question 242

When creating a local package repository, which option within the .repo file in /etc/yum.repos.d/ is used to set the URL for the repository?

A. url
B. repourl
C. httpurl
D. baseurl

<details>
<summary style="color: red;">Answer</summary>

D. `baseurl` is used to set the URL for the repository within the .repo file in /etc/yum.repos.d/.

**Explanation:**
The baseurl option is used to set the URL and must be fully qualified, meaning it must include the protocol, such as http:// or file://. The other options are not valid.

**Domain:**
System Management

</details>

---

### Question 243

When running the lsblk command, there is no separate partition listed for /boot. From which partition is the system likely booted?

A. There is a /boot partition under the / partition.
B. The /boot partition is hidden
C. The system has not yet built the /boot partition.
D. The /boot partition does not show up with lsblk.

<details>
<summary style="color: red;">Answer</summary>

A. There is a /boot partition under the / partition.

**Explanation:**
The /boot partition almost certainly exists but has not been partitioned into its own space. The /boot partition would not be hidden from lsblk if it was indeed a separate partition. The other options are not valid.

**Domain:**
System Management

</details>

---

### Question 244

Which of the following commands displays the currently open ports and the process that is using the port?

A. netstat -a
B. lsof -i
C. ps auwx
D. netlist

<details>
<summary style="color: red;">Answer</summary>

B. `lsof -i` displays the currently open ports and the process that is using the port.

**Explanation:**
The lsof command can be used for this purpose; with the -i option, it will display the network ports along with their process. The netstat command will display network ports but not the process with the -a option.
The ps command is used for processes but not network ports. Finally, there is no netlist command.

**Domain:**
System Management

</details>

---

### Question 245

Which option to the wget command logs output?

A. -r
B. -o
C. -b
D. -k

<details>
<summary style="color: red;">Answer</summary>

B. `-o` logs output when using the wget command.

**Explanation:**
The -o option logs output to the file specified. The -k option converts links, and the -r option indicates recursive. There is no -b option.

**Domain:**
System Management

</details>

---

### Question 246

When executed on a systemd-enabled server, the service status command is equivalent to which command?

A. systemd status
B. hournald status
C. service-systemd status
D. systemctl status

<details>
<summary style="color: red;">Answer</summary>

D. `systemctl status` is equivalent to the service status command when executed on a systemd-enabled server.

**Explanation:**
The service status command is equivalent to systemctl status on systemd-enabled computers. The other commands do not exist with the specified option.

**Domain:**
System Management

</details>

---

### Question 247

Which signal to the kill command can be used to signal that BIND should reload, including its configuration?

A. -15
B. -1
C. -9
D. -2

<details>
<summary style="color: red;">Answer</summary>

D. `-1` can be used to signal that BIND should reload, including its configuration.

**Explanation:**
The -1, or -HUP, signal reloads the given process. The -15 signal, also known as SIGTERM, is the default terminate signal,
while -2 is an interrupt signal. The -9 signal is kill and is considered bad practice except in emergencies when the process doesn't respond to normal singals.

**Domain:**
System Management

</details>

---

### Question 248

You are troubleshooting a daemon process and have started the daemon manually from the command line so that it does not fork into the background.
Which key combination can be used to terminate the daemon?

A. Ctrl + A
B. Ctrl + B
C. Ctrl + C
D. Ctrl + D

<details>
<summary style="color: red;">Answer</summary>

C. `Ctrl + C` can be used to terminate the daemon process that has been started manually from the command line.

**Explanation:**
The Ctrl+C key combination terminates, or kills, a process in a scenario such as the one described here. The Ctrl+D option is a valid key combination but is used to delete the character underneath the cursonr.
The other options are not valid for this purpose.

**Domain:**
System Management

</details>

---

### Question 249

Which service command is used to shut down a service?

A. shutdown
B. stop
C. norun
D. runstop

<details>
<summary style="color: red;">Answer</summary>

B. `stop` is the service command used to shut down a service.

**Explanation:**
The stop command, when used with the service command, causes a given service to shut down. The service can be started again with the service start command. The other options shown are not valid
commands to use with the service command.

**Domain:**
System Management

</details>

---

### Question 250

Which subcommand with the hostnamectl can be used to set the type of machine on which it is running?

A. set-machine
B. machine-type
C. set-type
D. chassis

<details>
<summary style="color: red;">Answer</summary>

D. `chassis` can be used with the hostnamectl command to set the type of machine on which it is running.

**Explanation:**
The chassis subcommand configures the type of machine on which the hostnamectl command is running. This can be useful
for certain types of applications. Of the other options, the hostname command can be used to set the hostname.
The other commands shown are not valid.

**Domain:**
System Management

</details>

---

### Question 251

Which option to the curl command sets the local filename to which the output will be saved?

A. -f
B. -o
C. -O
D. -l

<details>
<summary style="color: red;">Answer</summary>

B. `-o` sets the local filename to which the output will be saved when using the curl command.

**Explanation:**
The -o option sets the local filename. The -O option preserves the remote filename. The -f option causes curl to fail silently, and the -l option
is used with FTP to cause a name-only listing.

**Domain:**
System Management

</details>

---

### Question 252

Which of the following commands searches a server for files with the setgid bit enabled?

A. find / -perm 4000
B. find ./ -perm setgid
C. grep setgid\*
D. find / -perm 2000

<details>
<summary style="color: red;">Answer</summary>

D. `find / -perm 2000` searches a server for files with the setgid bit enabled.

**Explanation:**
The find command will be used for this purpose, and the -perm option is needed, specifically as the 2000
permission to indicate setgid. Note the use of / to indicate that the entire server will be searched. The grep command shown cannot be used for this purpose
because it looks for the presence of the string setgid within files located in the current directory only.

**Domain:**
System Management

</details>

---

### Question 253

You need to redirect output for a long-running process but do not need to see or capture the output. To which location can you redirect output so that
it does not consume disk space?

A. A regular file
B. /dev/null
C. /dev/random
D. A network interface

<details>
<summary style="color: red;">Answer</summary>

B. `/dev/null` is the location to which you can redirect output so that it does not consume disk space.

**Explanation:**
The /dev/null location will accept input and not consume additional disk space when output is redirected to it.
The /dev/random device exists but is not valid for this scenario. Likewise, redirecting to a network interface or
regular file does not meet the criteria for this scenario.

**Domain:**
System Management

</details>

---

### Question 254

Which target for the service command will cause a daemon to reread its configuartion files without restarting the daemon itself?

A. read
B. load
C. start
D. reload

<details>
<summary style="color: red;">Answer</summary>

D. `reload` is the target for the service command that will cause a daemon to reread its configuration files without restarting the daemon itself.

**Explanation:**
The reload target or command, used as part of a service command, causes the daemon to reload or reread its configuration files without restarting. The other options are not valid.

**Domain:**
System Management

</details>

---

### Question 255

You have executed a daemon process manually from the command line and now need to suspend the process. Which key combination can be used for this purpose?

A. Ctrl+S
B. Ctrl+C
C. Ctrl+Z
D. Ctrl+B

<details>
<summary style="color: red;">Answer</summary>

C. `Ctrl+Z` can be used to suspend a daemon process that has been executed manually from the command line.

**Explanation:**
The Ctrl+Z key combination will suspend a process. The other options are not valid for this purpose. The Ctrl+C key combination kills the process.

**Domain:**
System Management

</details>

---

### Question 256

You have been asked to recommend a simple command-line-based text editor for a begineer user. Which of the following would you recommend?

A. vi
B. nano
C. nc
D. ShellRedirect

<details>
<summary style="color: red;">Answer</summary>

B. `nano` is a simple command-line-based text editor that is suitable for beginner users.

**Explanation:**
The Nano editor is appropriate for this scenario. While Vi is indeed a text editor, beginners typically struggle with it.
The nc command is not used for text editing, and there is no ShellRedirect text editor.

**Domain:**
System Management

</details>

---

### Question 257

You need to ensure that a service does not start on a systemd system. Which systemctl command should be used for this purpose?

A. disable
B. delete
C. mask
D. norun

<details>
<summary style="color: red;">Answer</summary>

C. `mask` should be used to ensure that a service does not start on a systemd system.

**Explanation:**
The mask command links the unit file to /dev/null, thereby ensuring that the service cannot run. The disable command deltes the symlink between /etc/systemd and /lib/systemd, but
the service could still run. The other options are not valid.

**Domain:**
System Management

</details>

---

### Question 258

Which command can be used to print using a specially formatted string?

A. printf
B. echo
C. print
D. here

<details>
<summary style="color: red;">Answer</summary>

A. `printf` can be used to print using a specially formatted string.

**Explanation:**
The printf command can be used to add special formatting to strings for printing. The echo command can be used somewhat for this purpose but is not as powerful at special-formatting capabilites
as the printf command is. The other options are not valid commands.

**Domain:**
System Management

</details>

---

### Question 259

You need to copy a file to a remote system, but that remote system does not have FTP or any other file-sharing services running. You have the ability to SSH into
the server. Which of the following commands can be used for this purpose?

A. scp
B. ncftp
C. go
D. xfer

<details>
<summary style="color: red;">Answer</summary>

A. `scp` can be used to copy a file to a remote system over SSH.

**Explanation:**
The scp command copies or transfers a file over SSH. The ncftp command cannot be used for this purpose. The other commands are not valid.

**Domain:**
System Management

</details>

---

### Question 260

Which of the following describes a method for changing the sort order when using the top command such that the highest memory utilizers will be shown at the top of the list?

A. Whitin top, type o and then select mem.
B. Whitin top, press Shift+F, scroll to %MEM, press s to select, and then press Q to quit.
C. Within top, press S and then select %MEM.
D. Within top, press Shift+S, select %MEM, then press Q to quit.

<details>
<summary style="color: red;">Answer</summary>

B. `Within top, press Shift+F, scroll to %MEM, press s to select, and then press Q to quit` describes a method for changing the sort order in the top command.

**Explanation:**
Pressing Shift+F within top enables you to choose which columns display as well as the sort order for the columns. In the scenario described, you can view the processes using the highest amount of memory.

**Domain:**
System Management

</details>

---

### Question 261

Which option to the fsck command causes it to run the check even if the filesystem is apparently marked as clean?

A. -f
B. -m
C. -a
D. -c

<details>
<summary style="color: red;">Answer</summary>

A. `-f` causes the fsck command to run the check even if the filesystem is apparently marked as clean.

**Explanation:**
The -f option forces fsck to run on an otherwise clean filesystem. This can be helpful for times when you suspect there is an error on the filesystem and need to verify as part of the
troubleshooting process. This can also be helpful to prepare the filesystem for conversion, such as might be the case with a tool like btrfs-convert. The other options are not valid for this purpose.

**Domain:**
System Management

</details>

---

### Question 262

One of your customers needs to transfer a large file and is asking for FTP to be enabled on the server. Thinking of sercurity, what options can you offer that are more secure?

A. USB
B. Email (SMTP)
C. SSL
D. SFTP

<details>
<summary style="color: red;">Answer</summary>

D. `SFTP` is a more secure option for transferring files compared to FTP.

**Explanation:**
SFTP would be the preferred option because it provides additional security over legacy FTP. In general terms, FTP usually should be disabled becuase
credentials and other traffic are not encrypted. Among the other options, email (SMTP) offers no encryption, and SSL by itself does not transfer files.
Because the scenario did not include details of whether the transfer was over a long distance, it is difficult to tell whether USB would be appropriate. However, the use of a USB
device is frequently discouraged due to the potential for malware.

**Domain:**
System Management

</details>

---

### Question 263

You need to extract files from a backup created with an older version of HPUX. The tar command
does not seem to work for these files. Which of the following may be able to extract from this backup?

A. gzip
B. bzip2
C. cpio
D. hpb

<details>
<summary style="color: red;">Answer</summary>

C. `cpio` may be able to extract files from a backup created with an older version of HPUX.

**Explanation:**
The cpio utility can work with various archive formats, one of which is HPUX-created archives. The gzip
or bzip2 command likely would not be able to open or extract from the file; those are typically used for
compression and not archival purposes. The hpb command does not exist.

**Domain:**
System Management

</details>

---

### Question 264

You believe that the system has been broken into and files may have been changed. After taking the system offline and
unmounting one of the affected partitions, what could you do next?

A. Use dd to make an image of the partition to preserve it.
B. Create a backup using tar.
C. Examine the partition with fdisk.
D. Use mkfs to reformat the partition.

<details>
<summary style="color: red;">Answer</summary>

A. `Use dd to make an image of the partition to preserve it` is the best next step after taking the system offline and unmounting one of the affected partitions.

**Explanation:**
Making a bit-level image of the partition with dd is a good idea in order to preserve any evidence of the break-in. Creating a backup using tar is a less preferred option.
Examining the partition with fdisk would not reveal any relevant information, and reformatting the partition usually should not be done until the extent of the attack is understood.

**Domain:**
System Management

</details>

---

### Question 265

Which option to the zip command causes the command to traverse directories?

A. -g
B. -m
C. -r
D. -a

<details>
<summary style="color: red;">Answer</summary>

C. `-r` causes the zip command to traverse directories.

**Explanation:**
The -r option tells the zip command to traverse directories recursively when creating the archive. The other options are not valid for this purpose.

**Domain:**
System Management

</details>

---

### Question 266

You are working on a debian system and need to set ownership on a file such that the user used to execute Apache can write to the file.
What command can you use to determine which user Apache is running as?

A. ps auwx | grep apache
B. ls -a
C. free | grep httpd
D. monapache

<details>
<summary style="color: red;">Answer</summary>

A. `ps auwx | grep apache` can be used to determine which user Apache is running as.

**Explanation:**
The ps command, when given with arguments such as auwx, will show all processes and the owner of those processes. Combining with the grep commnad reveals
the processes with the word apache in them. On other systems, this might be called httpd instead of apache in them.
But the question specified a Debian system. The other options are not valid for this purpose.

**Domain:**
System Management

</details>

---

### Question 267

When scripting for build automation, you need to run a configure script prior to running the make command. Which of the following will execute
the configure script, assuming that it's in the same directory as the script invoking it?

A. configure
B. ./configure
C. ../configure
D. /configure

<details>
<summary style="color: red;">Answer</summary>

B. `./configure` will execute the configure script if it is in the same directory as the script invoking it.

**Explanation:**
The ./configure pattern is typically used to invoke a configure script. Option A might work, but the build directory is typically not in the path.
The other options are not valid for this purpose.

**Domain:**
System Management

</details>

---

### Question 268

Which command can be used to change the size of a logical volume when using Logical Volume Manager (LVM)?

A. vgs
B. lvresize
C. vgcreate
D. lvs

<details>
<summary style="color: red;">Answer</summary>

B. `lvresize` can be used to change the size of a logical volume when using Logical Volume Manager (LVM).

**Explanation:**
The lvresize command changes the size of a logical volume. The other commands shown are valid Logical Volume Manager commands but do not solve the problem described.

**Domain:**
System Management

</details>

---

### Question 269

Which file contains information about RAID arrays on a Linux system?

A. /proc/mdstat
B. /raidstat
C. /var/raidinfo
D. /etc/raid.txt

<details>
<summary style="color: red;">Answer</summary>

A. `/proc/mdstat` contains information about RAID arrays on a Linux system.

**Explanation:**
The file /proc/mdstat provides information about the status of RAID arrays on a Linux system. The other options are not valid.

**Domain:**
System Management

</details>

---

### Question 270

When working with mdadm, which command-line argument is used to specify things like striping and parity?

A. --layout
B. -R
C. --level
D. -x

<details>
<summary style="color: red;">Answer</summary>

A. `--layout` is used to specify things like striping and parity when working with mdadm.

**Explanation:**
Parity and striping are configured using --layout or -p. The -x option specifies spare devices while -R starts the array.
The --level option option can be used to set the type of RAID, such as mirroring(RAID 1) or striping (RAID 0).

**Domain:**
System Management

</details>

---

### Question 271

Which command displays Desktop Management Interface (DMI) information on a Linux system?

A. dmidump
B. dlad
C. dmid
D. dmidecode

<details>
<summary style="color: red;">Answer</summary>

D. `dmidecode` displays Desktop Management Interface (DMI) information on a Linux system.

**Explanation:**
The dmidecode command displays information related to the DMI, or Desktop Management Interface. The other options are not valid commands.

**Domain:**
System Management

</details>

---

### Question 272

SSHFS is an example of which type of filesystem use?

A. attachment
B. disk
C. RAID
D. FUSE

<details>
<summary style="color: red;">Answer</summary>

D. `FUSE` is the type of filesystem use that SSHFS is an example of.

**Explanation:**
SSHFS, or Secure Shell Filesystem, is an implementation of FUSE (Filesystem in Userspace) because it allows non-privileged users to mount a remote filesystrem without needing elevated privileges. The other options are not valid.

**Domain:**
System Management

</details>

---

### Question 273

Which of the following best describes .rpmnew and .rpmsave files?

A. The .rpmnew file contains RPM files and their hashes while .rpmsave contains a list of saved hashes.
B. The .rpmnew file contains new RPM files available for download while .rpmsave contains a list of files that have been saved loacally.
C. The .rpmnew file contains a list of RPM files that have changed since the last save while .rpmsave is a backup of the last .rpmnew file.
D. The .rpmnew file contains a new configuration file for a package when local changes exist to the configuration file while .rpmsave contains the local configuration file when a new file is included in the package.

<details>
<summary style="color: red;">Answer</summary>

D. The .rpmnew file contains a new configuration file for a package when local changes exist to the configuration file while .rpmsave contains the local configuration file when a new file is included in the package.

**Explanation:**
When an RPM package is updated, if the configuration file has been modified, the new configuration file is saved with the .rpmnew extension, and the original configuration file is saved with the .rpmsave extension. The other options are not valid.

**Domain:**
System Management

</details>

---

### Question 274

You are using the top command to monitor processes and you notice that the nc command is consuming a lot of CPU cycles. Which command can be used to change the priority of the command?

A. renice
B. nice
C. ps
D. top

<details>
<summary style="color: red;">Answer</summary>

A. `renice` can be used to change the priority of a running command.

**Explanation:**
The renice command can be used to set the priority of a running process. The nice command can be used to set the priority, but becuase the nc command was already running, renice must be used. The nc command can be used to transfer
files, so killing the process ins't a great option. The ps and top commands do not change priorities.

**Domain:**
System Management

</details>

---

### Question 275

Which command is used to create a packaged application to be distributed with Flatpak?

A. flatpak-builder
B. flatpak-create
C. flatpak-pack
D. flatpak-compile

<details>
<summary style="color: red;">Answer</summary>

A. `flatpak-builder` is used to create a packaged application to be distributed with Flatpak.

**Explanation:**
The flatpak-builder command is used to build applications for distribution with Flatpak. The other options are not valid commands.

**Domain:**
System Management

</details>

---

### Question 276

Which background process runs to maintain the list of snap packages available on an Ubuntu system?

A. snapper
B. snapperd
C. snapdaemon
D. snapd

<details>
<summary style="color: red;">Answer</summary>

D. `snapd` is the background process that runs to maintain the list of snap packages available on an Ubuntu system.

**Explanation:**
The snapd daemon is responsible for managing and maintaining snap packages on an Ubuntu system. The other options are not valid.

**Domain:**
System Management

</details>

---

### Question 277

Which tool is used to create a sandboxed AppImage package?

A. appimagetool
B. apptool
C. ocon
D. app-con

<details>
<summary style="color: red;">Answer</summary>

A. `appimagetool` is used to create a sandboxed AppImage package.

**Explanation:**
The appimagetool command is used to create AppImage packages, which are self-contained applications that can run on various Linux distributions. The other options are not valid commands.

**Domain:**
System Management

</details>

---

### Question 278

Which network-related tool combines elements of both ping and traceroute?

A. tcpdump
B. wireshark
C. mtr
D. nmcli

<details>
<summary style="color: red;">Answer</summary>

C. `mtr` combines elements of both ping and traceroute.

**Explanation:**
The mtr (My Traceroute) command provides a continuous ping and traceroute, allowing users to see the path packets take to a destination and the latency at each hop. The other options are not valid for this purpose.

**Domain:**
System Management

</details>

---

### Question 279

Which option to resolvectl specifies the protocol?

A. -f
B. -x
C. -p
D. -m

<details>
<summary style="color: red;">Answer</summary>

C. `-p` specifies the protocol when using resolvectl.

**Explanation:**
The -p option is used to specify the protocol in resolvectl commands. The other options are not valid for this purpose.

**Domain:**
System Management

</details>

---

### Question 280

Which command shows the background processes related to the current shell?

A. jobs
B. htop
C. pidof
D. -m

<details>
<summary style="color: red;">Answer</summary>

A. `jobs` shows the background processes related to the current shell.

**Explanation:**
The jobs command displays the status of jobs started in the current shell, including background processes. The other options do not provide this information.

**Domain:**
System Management

</details>

---

### Question 281

Which of the following commands displays Media Access Control (MAC) to IP address associations?

A. arp
B. -x
C. -p
D. -m

<details>
<summary style="color: red;">Answer</summary>

A. `arp` displays Media Access Control (MAC) to IP address associations.

**Explanation:**
The arp command is used to view and manipulate the ARP cache, which contains MAC to IP address mappings. The other options are not valid commands.

**Domain:**
System Management

</details>

---

### Question 282

As root, you run the command cd ~ followed by pwd to print the working directory. What is the expected output?

A. /home
B. /root
C. /sbin
D. /bin

<details>
<summary style="color: red;">Answer</summary>

B. `/root` is the expected output when running the command cd ~ as root.

**Explanation:**
The tilde (~) represents the home directory of the current user. When run as root, this corresponds to /root. The other options are not valid for the root user.

**Domain:**
System Management

</details>

---

### Question 283

Which command can be used to determine a file type?

A. file
B. xz
C. lsof
D. prep

<details>
<summary style="color: red;">Answer</summary>

A. `file` can be used to determine a file type.

**Explanation:**
The file command examines and reports the type of file based on its contents. The xz command is used for file compression. The lsof command lists open files but not types. The pgrep command is related to processes.

**Domain:**
System Management

</details>

---

### Question 284

When running the ps command you notice that a process has a Z in the state filed. What does Z represent?

A. speeping
B. running
C. stopped
D. zombie

<details>
<summary style="color: red;">Answer</summary>

D. `zombie` represents a process that has completed execution but still has an entry in the process table.

**Explanation:**
A process in the zombie state has finished executing but has not yet been cleaned up by its parent process. The other options do not correspond to the Z state.

**Domain:**
System Management

</details>

---

### Question 285

You need to kill a process using its name rather than its process ID. Which command can be used for this purpose?

A. pkill
B. pend
C. pterminate
D. kp

<details>
<summary style="color: red;">Answer</summary>

A. `pkill` can be used to kill a process using its name.

**Explanation:**
The pkill command allows you to terminate processes based on their name or other attributes. The other options are not valid commands.

**Domain:**
System Management

</details>

---

### Question 286

You need to change one level up from the current directory. Which command can be used for this purpose?

A. cd .
B. cd ~
C. mv ~
D. cd ..

<details>
<summary style="color: red;">Answer</summary>

D. `cd ..` can be used to change one level up from the current directory.

**Explanation:**
The cd .. command changes the current directory to the parent directory. The other options do not achieve this purpose.

**Domain:**
System Management

</details>

---
