### Question 1

**Example:** To load a module with dependencies:
```bash
modprobe <module_name>
```
**Expected Output:**
```bash
# (No output indicates success, but you can check with lsmod)
```

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

**Example:** To boot into single-user mode, edit the GRUB menu and append to the kernel line:
```bash
linux /vmlinuz-linux root=/dev/sda1 single
```
**Expected Output:**
```bash
# You will see a single-user shell prompt.
```

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
