### Question 1

While troubleshooting a network service that does not appear to start, which option to the ss command shows the current TCP listening sockets?

A. -lt
B. -ct
C. -m
D. -f

<details>
<summary style="color: red;">Answer</summary>

A. -lt

**Explanation:**
The -l option displays listening ports and the -t option limits the ports to TCP only,
thus making -lt correct. The -m option shows socket memory usage and -f is used to define the family
to return. There is no -c option, thus making option B incorrect.

**Example:**

```bash
ss -lt
```

</details>

---

### Question 2

You are examining a problem report where a USB disk is no longer available. Which command is used to obtain a list of USB devices?

A. usb-list
B. lsusb
C. ls-usb
D. ls --usb

<details>
<summary style="color: red;">Answer</summary>

B. lsusb

**Explanation:**
The lsusb command is used to obtain a basic list of USB devices on a system. The other commands are not valid. In the case of option D, the ls command is valid,
but there is no --usb option.

**Example:**

```bash
lsusb

# Output
Bus 002 Device 001: ID 1d6b:0003 Linux Foundation 3.0 root hub
Bus 001 Device 003: ID 0bda:0129 Realtek Semiconductor Corp. RTS5129 Card Reader Controller
Bus 001 Device 002: ID 0bda:57b5 Realtek Semiconductor Corp.
```

</details>

---

### Question 3

You have lost the password for a server and need to boot into a single user mode. Which option given at boot time within the GRUB configuration will start the
system in single user mode to enable password recovery and/or reset?

A. single-user
B. su
C. single
D. root

<details>
<summary style="color: red;">Answer</summary>

C. single

**Explanation:**
The keyword single given on the Linux kernel command line will boot the system into single user mode. The other options are not valid. The su command is used to switch users and the root option is used to boot the system as the root user. The single-user option is not valid.

**Example:**

```bash
# At the GRUB menu, press 'e' to edit the boot configuration
# Add 'single' to the end of the line starting with 'linux'
linux /boot/vmlinuz-5.4.0-42-generic root=UUID=1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p ro quiet splash single
```

</details>

---

### Question 4

Which of the following is a good first troubleshooting step when a hard disk is not detected by the Linux kernel?

A. Unplug the disk.
B. Check the system BIOS.
C. Restart the web server service.
D. Run the disk-detect command.

<details>
<summary style="color: red;">Answer</summary>

B. Check the system BIOS.

**Explanation:**
Checking to ensure that the disk is detected in the BIOS is a good first step in troubleshooting. Option A, unplugging the disk, won't help it to be detected.
Restarting the web server won't help detect the disk, and the disk-detect command does not exist.

</details>

---

### Question 5

Which command and option are used to set the maximum number of times a filesystem can be mounted between running fsck?

A. tune2fs -c
B. dumpe2fs
C. tune2fs -m
D. setmount

<details>
<summary style="color: red;">Answer</summary>

A. tune2fs -c

**Explanation:**
The tune2fs command is used for this purpose, and the -c option sets the mount count for the specified partition. The dumpe2fs command is used to print the superblock
and block group information for the filesystem. The -m option is used to set the percentage of reserved blocks for the filesystem. The setmount command does not exist.

**Example:**

```bash
tune2fs -c 30 /dev/sda1

# Output
Setting maximal mount count to 30

tune2fs -l /dev/sda1 | grep 'Mount count'

# Output
Mount count:              1
```

</details>

---

### Question 6

When checking filesystems with the fsck command, which option skips checking of the root filesystem?

A. -A
B. -M
C. -R
D. -S

<details>
<summary style="color: red;">Answer</summary>

C. -R

**Explanation:**
The -R option skips the root filesystem when the -A option is used. The -M option does not check mounted filesystems.
The -S option skips checking the root filesystem, but only when the -A option is not used. The -A option checks all filesystems.

**Example:**

```bash
fsck -AR -y

# Output
fsck from util-linux 2.34
[/sbin/fsck.ext4 (1) -- /] fsck.ext4 -a /dev/sda1
/dev/sda1: clean, 11/655360 files, 123456/2621440 blocks
[/sbin/fsck.ext4 (1) -- /boot] fsck.ext4 -a /dev/sda2
/dev/sda2: clean, 11/655360 files, 123456/2621440 blocks
```

</details>

---

### Question 7

You have connected a USB disk to the system and need to find out its connection point within the system.
Which of the following is the best method for accomplishing this task?
