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
