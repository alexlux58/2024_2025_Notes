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

A. Rebooting the system
B. Viewing the contents of /var/log/usb.log
C. Connecting the drive to a USB port that you know the number of
D. Running dmesg and looking for the disk

<details>
<summary style="color: red;">Answer</summary>

D. Running dmesg and looking for the disk

**Explanation:**
Of the options presented, running dmesg is a common way to find out the location to which the kernel has assigned the drive.
Rebooting the system is not a good option, although it would work. There is no such thing as /var/log/usb.log, and the location of
the drive may change regardless of port, depending on how the drive may be detected in the system.

**Example:**

```bash
dmesg | grep -i usb | grep -i attached | tail -n 1 | awk '{print $NF}' | tr -d ':'

# Output
sdb
```

</details>

---

### Question 8

How many SCSI devices are supported per bus?

A. 7 to 15
B. 2 to 4
C. 12
D. 4

<details>
<summary style="color: red;">Answer</summary>

A. 7 to 15

**Explanation:**
SCSI supports 7 to 15 devices per bus, depending on the type of SCSI.

</details>

---

### Question 9

Within which folder are systemd unit configuration files stored?

A. /etc/system.conf.d
B. /lib/system.conf.d
C. /lib/systemd/system
D. /etc/sysconfd

<details>
<summary style="color: red;">Answer</summary>

C. /lib/systemd/system

**Explanation:**
Unit configuration files are stored in /lib/systemd/system. The other directory options for this question are not relevant
or do not exist by default.

</details>

---

### Question 10

You are troubleshooting a service not starting on time. Which network unit target waits until the network is up, such as with a
routable IP address?

A. network.target
B. network-online.target
C. network-up.target
D. network-on.target

<details>
<summary style="color: red;">Answer</summary>

B. network-online.target

**Explanation:**
The network-online.target is used to signify that the network is online and operational for services that depend on the network.
Of the other options, network.target is a legitimate target but is typically used to help with an orderly shutdown to ensure
that services are stopped prior to the network. The other options shown are not valid.

**Example:**

```bash
alexlux@ubuntuserver:~$ cat /lib/systemd/system/network-online.target
[Unit]
Description=Network is Online
Documentation=man:systemd.special(7)
Documentation=https://www.freedesktop.org/wiki/Software/systemd/NetworkTarget
After=network.target
```

</details>

---

### Question 11

To which file should a unit file be symlinked in order to disable the unit file?

A. /etc/systemd/unit.disable
B. /etc/systemd/disabled
C. /tmp/disabled
D. /dev/null

<details>
<summary style="color: red;">Answer</summary>

D. /dev/null

**Explanation:**
Creating a symbolic link to /dev/null effectively disables the unit file so that the service cannot be started.
The other options shown are not valid files.

**Example:**

```bash
ln -s /dev/null /etc/systemd/system/myunit.service
```

</details>

---

### Question 12

You are troubleshooting a service that does not stop correctly. During troubleshooting, you find
that the command to stop the service needs to be changed. Which configuration option specifies the command
to execute for stopping a service?

A. StopCmd
B. ExecStop
C. StopScript
D. StopSvc

<details>
<summary style="color: red;">Answer</summary>

B. ExecStop

**Explanation:**
The ExecStop configuration option specifies the command to execute to stop the service. The other options shown are not valid.

**Example:**

```bash
# Location of the unit file
/etc/systemd/system/myservice.service

[Service]
ExecStart=/usr/bin/myservice
ExecStop=/usr/bin/myservice --stop
```

</details>

---

### Question 13

You are working with a service dependency issue where a service is starting even tough it depends on a different service.
The unit file currently lists the dependency with Wants=. To what should the Wants= be changed to in order to make the requirements
stronger between the two services?

A. Needs=
B. LoadFirst=
C. Verify=
D. Requires=

<details>
<summary style="color: red;">Answer</summary>

D. Requires=

**Explanation:**
Using Wants= creates a weak dependency between two services, while using Requires= creates a stronger dependency. The other options shown
are not valid unit dependency directives.

**Example:**

```bash
# Location of the unit file
/etc/systemd/system/myservice.service

[Unit]
Description=My Service
Requires=network-online.target
After=network-online.target
```

</details>

---

### Question 14

When troubleshooting potential collisions for a network interface, which option to the ip command displays additional information
that includes a count of collisions?

A. -s
B. -c
C. -o
D. -f

<details>
<summary style="color: red;">Answer</summary>

A. -s

**Explanation:**
Using the -s option displays statistics including a count of collisions that have occurred on the network interface.
Of the other options, -c changes output colors, -o prints all information on one line, and -f changes the family.

**Example:**

```bash
ip -s link show eth0

# Output
2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast state UP mode DEFAULT group default qlen 1000
    link/ether 00:0c:29:3e:8e:7b brd ff:ff:ff:ff:ff:ff
    RX: bytes  packets  errors  dropped overrun mcast
    0          0        0       0       0       0
    TX: bytes  packets  errors  dropped carrier collsns
    0          0        0       0       0       0
```

</details>

---

### Question 15

Which of the following is true of Linux swap space?

A. Swap is used to hold temporary database tables.
B. Swap is used as additional memory when there is insufficient RAM.
C. Swap is used by the mail server for security.
D. Swap is used to scrub data from the network temporarily.

<details>
<summary style="color: red;">Answer</summary>

B. Swap is used as additional memory when there is insufficient RAM.

**Explanation:**
Swap space is used as additional memory when there is insufficient RAM. The other options are not true of swap space.

**Example:**

```bash
# Check swap space
free -h | grep Swap

# Output
Swap:         2.0G       0B      2.0G
```

</details>

---

### Question 16

You are running a Linux instance on a cloud provider and notice slow performance. Which CPU time metric helps to determine
if cycles are being used by other instances on the same hypervisor?

A. HyperV
C. CircleTime
C. Steal
D. CrossProc

<details>
<summary style="color: red;">Answer</summary>

C. Steal

**Explanation:**
Steal is the metric used to measure the number of cycles being used by other virtual instances in either a cloud or virtualization scenario.
The steal metric is abbreviated as st in the output of top. The other options are not valid for this scenario.

**Example:**

```bash
top

# Output
top - 04:19:23 up 66 days, 17:27,  2 users,  load average: 1.61, 1.08, 0.88
Tasks: 179 total,   1 running, 178 sleeping,   0 stopped,   0 zombie
%Cpu0  :  5.0 us,  2.7 sy,  0.0 ni, 92.3 id,  0.0 wa,  0.0 hi,  0.0 si,  0.0 st
%Cpu1  : 10.0 us,  5.0 sy,  0.0 ni, 84.9 id,  0.0 wa,  0.0 hi,  0.0 si,  0.0 st
MiB Mem :   1963.7 total,    347.5 free,   1010.2 used,    606.0 buff/cache
MiB Swap:   2048.0 total,    752.0 free,   1296.0 used.    747.5 avail Mem

    PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND
 874144 lxd       20   0  798668 150916   1776 S   7.0   7.5   6081:54 python3.9
      1 root      20   0  168148   9048   5604 S   0.4   0.4   1098:14 systemd
    659 root      20   0  392912   6348   4376 S   0.3   0.3   1317:31 udisksd
   1178 alexlux   20   0   17564   4796   3732 S   0.2   0.2   1078:20 systemd
   4366 root      20   0   21412   684   5412 S   0.2   0.0   685:54 dockerd
     13 root      20   0 1949604    276   3612 S   0.0   0.0    35:03 ksoftirqd/0
   4056 root      20   0  1238816   472   9528 S   0.0   0.0 1473:52 containerd
   5119 root      20   0   57722   2344   1692 S   0.0   0.1 1937:07 valkey-server
   5180 root      20   0 1238816   224   4028 S   0.0   0.0 1222:40 valkey-server
 260510 root      20   0 1874456    260   7548 S   0.0   0.0  185:57 containerd
      2 root      20   0       0      0      0 I   0.0   0.0   0:20.29 kthreadd
      4 root      0  -20       0      0      0 I   0.0   0.0   0:00.08 rcu_gp
      5 root      0  -20       0      0      0 I   0.0   0.0   0:00.00 rcu_par_gp
      6 root      0  -20       0      0      0 I   0.0   0.0   0:00.00 slub_flushwq
      8 root      0  -20       0      0      0 I   0.0   0.0   0:00.00 netns
      9 root      0  -20       0      0      0 I   0.0   0.0   0:00.00 kworker/0:0H-events_highpri

```

</details>

---

### Question 17

You need to examine the hardware to determine if the processor supports virtualization. Which command can be used to display
the status of virtualization support?

A. cpustat
B. cpuinfo
C. lscpu
D. brcxpu

<details>
<summary style="color: red;">Answer</summary>

C. lscpu

**Explanation:**
The lscpu command shows statistics about the CPU that include architecture, cache, speed, and other information. Among the other options,
cpuinfo is not a command but rather the file /proc/cpuinfo contains the same information as lscpu. The other options are not valid commands.

**Example:**

```bash
lscpu

# Output
alexlux@ubuntuserver:~$ lscpu
Architecture:             x86_64
  CPU op-mode(s):         32-bit, 64-bit
  Address sizes:          40 bits physical, 48 bits virtual
  Byte Order:             Little Endian
CPU(s):                   2
  On-line CPU(s) list:    0,1
Vendor ID:                GenuineIntel
  Model name:             QEMU Virtual CPU version 2.5+
    CPU family:           15
    Model:                107
    Thread(s) per core:   1
    Core(s) per socket:   2
    Socket(s):            1
    Stepping:             1
    BogoMIPS:             5807.99
    Flags:                fpu de pse tsc msr pae mce cx8 apic sep mtrr pge mca cmov pat pse36 clflush mmx fxsr sse sse2 ht syscall nx lm constant_tsc nopl xtopology cpuid tsc_known_freq pni ssse3 cx16 sse4_1 sse
                          4_2 x2apic popcnt aes hypervisor lahf_lm cpuid_fault pti
Virtualization features:
  Hypervisor vendor:      KVM
  Virtualization type:    full
Caches (sum of all):
  L1d:                    64 KiB (2 instances)
  L1i:                    64 KiB (2 instances)
  L2:                     8 MiB (2 instances)
  L3:                     16 MiB (1 instance)
NUMA:
  NUMA node(s):           1
  NUMA node0 CPU(s):      0,1
Vulnerabilities:
  Gather data sampling:   Not affected
  Itlb multihit:          KVM: Mitigation: VMX unsupported
  L1tf:                   Mitigation; PTE Inversion
  Mds:                    Vulnerable: Clear CPU buffers attempted, no microcode; SMT Host state unknown
  Meltdown:               Mitigation; PTI
  Mmio stale data:        Unknown: No mitigations
  Reg file data sampling: Not affected
  Retbleed:               Not affected
  Spec rstack overflow:   Not affected
  Spec store bypass:      Vulnerable
  Spectre v1:             Mitigation; usercopy/swapgs barriers and __user pointer sanitization
  Spectre v2:             Mitigation; Retpolines; STIBP disabled; RSB filling; PBRSB-eIBRS Not affected; BHI Retpoline
  Srbds:                  Not affected
  Tsx async abort:        Not affected
```

</details>

---

### Question 18

When you're troubleshooting a file access issue for a user, which command can be run in order to determine if the issue
is related to SELinux policy?

A. ls -p
B. pol --info
C. showpol
D. ls -Z

<details>
<summary style="color: red;">Answer</summary>

D. ls -Z

**Explanation:**
The ls -Z command shows information regarding the SELinux security context
applied to a file and can help determine if the issue is policy/non-policy related.
There is no -P option and the other commands shown are not valid.

**Example:**

```bash
ls -Z /etc/passwd

# Output
-rw-r--r--. 1 root root system_u:object_r:passwd_file_t:s0 1872 Jul  1  2020 /etc/passwd
```

</details>

---

### Question 19

Which of the following commands can be used to help troubleshoot an application crash that may be related to system calls?

A. strace
B. systemt
C. systemd-trace
D. systemd-debug

<details>
<summary style="color: red;">Answer</summary>

A. strace

**Explanation:**
The strace command is vital to debugging system-call-related application crashes, especially when the daemon or service does not log any error but
silently crashes. The other options shown are not valid.

**Example:**
Imagine a web application (e.g., myapp) is crashing without
producing logs or error messages. To debug, you can use strace to monitor its system calls:

```bash
# Run the application under strace
strace -o myapp_trace.log -f ./myapp

# Output
openat(AT_FDCWD, "/etc/myapp/config.yaml", O_RDONLY) = -1 ENOENT (No such file or directory)
write(2, "Error: Missing configuration file\n", 33) = 33
exit_group(1) = ?
```

- The strace output reveals that the application is attempting to open a configuration file (/etc/myapp/config.yaml) but fails because the file does not exist (ENOENT).
- This insight helps the developer recognize the issue and fix it by providing the missing configuration file.

</details>

---

### Question 20

Which setting should be changed in journald.conf in order to ensure that
journal log files are written to disk?

A. Location=
B. Persistence=
C. Storage=
D. WriteTo=

<details>
<summary style="color: red;">Answer</summary>

C. Storage=

**Explanation:**
The Storage= option controls whether journal logs are written to disk, kept in memory, or not kept at all.
The other options shown are not valid for journald.conf.

**Example:**

```bash
# Edit the journald.conf file
sudo vi /etc/systemd/journald.conf

# Add the following line
Storage=persistent

# Save and exit the file
```

</details>

---

### Question 21

As part of troubleshooting services not starting on time, you need to add a service to be started before another to an already-existing systemd unit file.
What delimiter is used to separate services with the Before= and After= configuration options in a systemd unit file?

A. Comma
B. Semicolon
C. Colon
D. Space

<details>
<summary style="color: red;">Answer</summary>

D. Space

**Explanation:**
A space is used to separate services within a systemd unit file on the Before= and After=
configuration lines. The other delimiters shown as options are not valid for this purpose.

**Example:**
You have a custom web application (mywebapp.service) that requires the database service (mariadb.service) to start first.
However, you notice the web application sometimes fails because the database service isn't fully started.
To fix this, you edit the unit file of your web application and configure the correct startup order using After= and Before= directives.

```bash
# Location of the unit file
/etc/systemd/system/mywebapp.service

[Unit]
Description=My Web Application
After=mariadb.service network-online.target
Before=nginx.service

[Service]
ExecStart=/usr/bin/mywebapp

[Install]
WantedBy=multi-user.target
```

### Explanation of Configuration:

- **`After=mariadb.service network-online.target`**: Ensures that the `mariadb.service` and the network are started before the web application.
- **`Before=nginx.service`**: Ensures that `mywebapp.service` starts before the NGINX service.

This ensures proper dependency management, solving the issue of services not starting on time. A space is used to separate multiple services in both `After=` and `Before=` directives.

### Restart Services to Apply Changes:

```bash
sudo systemctl daemon-reload
sudo systemctl restart mywebapp.service
```

</details>

---

### Question 22

When using the du command to diagnose which directories are large, you would like to summarize the output in
a more human-friendly format. Which option(s) should be used?

A. --summarize
B. -uh
C. -h
D. -sh

<details>
<summary style="color: red;">Answer</summary>

D. -sh

**Explanation:**
The -s option summarizes the output by directory, while the -h option presents the output in a more human-friendly manner.

**Example:**

```bash
du -sh /var/log

# Output
2.0G    /var/log
```

</details>

---

### Question 23

Which option to tune2fs forces the operation to complete in the event of a problem such as corruption?

A. -f
B. -m
C. -x
D. -k

<details>
<summary style="color: red;">Answer</summary>

A. -f

**Explanation:**
The -f option forces the specified operation to complete and can sometimes be necessary if there is no other option to fix the issue.
However, data loss can occur with this option so care must be taken when using it. The other options shown are not valid.

**Example:**

```bash
tune2fs -f -c 30 /dev/sda1

# Output
Setting maximal mount count to 30
```

</details>

---

### Question 24

You have purchased a new SSD hardware that uses the NVMe protocol, but you cannot find the disk in the normal /dev/sd\* location where you have traditionally found such a storage. In which location should you look for these drives?

A. /dev/nd*
B. /dev/nvme*
C. /dev/nv*
D. /dev/nvme/*

<details>
<summary style="color: red;">Answer</summary>

B. /dev/nvme\*

**Explanation:**
NVMe-capable drives are named as /dev/nvme\*. No special drivers are needed other than those found in the native kernel on a modern system.
The other answers do not exist as paths by default.

**Example:**

```bash
ls /dev/nvme*

# Output
/dev/nvme0  /dev/nvme0n1  /dev/nvme0n1p1
```

</details>

---

### Question 25

Which of the following commands mounts /dev/sda1 in the /boot partition?

A. mount /dev/sda /boot
B. mount /boot /dev/sda1
C. mount /dev/sda1 /boot
D. mount -dev sda1 /boot

<details>
<summary style="color: red;">Answer</summary>

C. mount /dev/sda1 /boot

**Explanation:**
The format for the mount command is [partition][target], thereby making option C correct. The other options are not valid
because the arguments are in the wrong order.

</detail>

---

### Question 26

Using vmstat to examine the run queues on a single processor system with four cores reveals that there are six jobs in 'r' status.
Which of the following describes the current situation?

A. There are four jobs running and two waiting in the run queue.
B. There are six jobs running.
C. There is one job running and there are five in the run queue.
D. The 'r' column describes regulated processes and not the run queue.

<details>
<summary style="color: red;">Answer</summary>

A. There are four jobs running and two waiting in the run queue.

**Explanation:**
Each processor core can run a job, meaning that there are four available run queues on the system described in this scenario. Four of the six processes are therefore running while two are waiting in the run queue. Presence of high run queues can mean that additional processors are needed or that applications should be changed to utilize existing resources more efficiently.

**Example:**

```bash
vmstat 1 5 | awk '{print $1, $2, $3, $4, $5, $6, $7, $8, $9, $10}'

# Output
procs -----------memory---------- ---swap-- -----io---- -system-- ------cpu-----
 r  b   swpd   free   buff  cache   si   so    bi    bo   in   cs us sy id wa st
 0  0      0  12345  12345  12345

# In this output, the 'r' column shows the number of processes in the run queue.
# In this case, there are no processes in the run queue.
```

</details>

---

### Question 27

Which command is used to search for physical volumes for use with LVM?

A. lvmcreate
B. pvcreate
C. lvmdiskscan
D. lvmscan

<details>
<summary style="color: red;">Answer</summary>

C. lmvdiskscan

**Explanation:**
The lvmdiskscan command looks for physical volumes that have been initialized for use with LVM. The other options are not valid.

**Example:**

```bash
lvmdiskscan

# Output
  /dev/sda [      20.00 GiB]
  /dev/sdb [      20.00 GiB]
  /dev/sdc [      20.00 GiB]
  3 disks
  0 partitions
  0 LVM physical volume whole disks
  0 LVM physical volumes
```

</details>

---

### Question 28

Which configuration option within a systemd time unit file causes the program to execute a certain number of seconds or minutes after the
system has booted?

A. OnBootSec
B. StartupCommand
C. StartCmdSec
D. CmdSec

<details>
<summary style="color: red;">Answer</summary>

A. OnBootSec

**Explanation:**
The OnBootSec option defines the time to wait, in seconds, until launching the command specified within the unit file.
It is notable that OnBootSec is an alias for OnStartupSec. The other options shown are not valid.

**Example:**

```bash
# Location of the unit file
/etc/systemd/system/myapp.service

[Service]
ExecStart=/usr/bin/myapp
OnBootSec=30
```

</details>

---

### Question 29

You are troubleshooting an issue reported by a user and suspect it may be related to their environment variables.
What command should the user run in order to view the current settings for their environment when using Bash?

A. environment
B. env
C. listenv
D. echoenv

<details>
<summary style="color: red;">Answer</summary>

B. env

**Explanation:**
The env command will print the current environment variables from Bash. The printenv command will also perform the same operation. The other
commands listed in this question do not exist.

**Example:**

```bash
env

# Output
USER=alexlux
HOME=/home/alexlux
SHELL=/bin/bash
```

</details>

---

### Question 30

Which command can be used to determine the defualt CPU scheduling priority for a given user?

A. nice
B. sked
C. pri
D. sched

<details>
<summary style="color: red;">Answer</summary>

A. nice

**Explanation:**
The nice command displays the scheduling priority and can also be used to set the scheduling priority for a command to be executed. The other options shown are not valid.

**Example (Real-Life Scenario):**

You want to check and adjust the priority of a process (e.g., running a `tar` command) to ensure it doesn't consume too many CPU resources.

### Checking the Default Priority:

`nice`

### Output:

`0`

This means the default priority (nice value) for commands run by this user is `0`.

---

### Running a Command with a Lower Priority:

To start a command with a nice value of `10` (lower priority):

`nice -n 10 tar -czf archive.tar.gz /path/to/folder`

---

### Verifying Priority with `ps`:

After running the command, you can verify its priority:

`ps -o pid,ni,cmd -p <PID>`

Example Output:

`PID  NI CMD
12345  10 tar -czf archive.tar.gz /path/to/folder`

In this case:

- `NI` shows the nice value of `10`.
- This confirms the command is running with the specified priority.

This example demonstrates how to check and adjust CPU scheduling priorities using the `nice` command effectively.

</details>

---

### Question 31

Users are reprting that various programs are crashing on the server. Examining logs, you see that certain processes are reporting out-of-memory conditions. Which command can you use to see the overall memory usage, including available swap space?

A. tree
B. pgrep
C. uptime
D. free

<details>
<summary style="color: red;">Answer</summary>

D. free

**Explanation:**
The free command displays overall memory usage for both RAM and swap and can be used to determine when additional memory might be needed. The other options shown are not valid for this purpose.

**Example:**

```bash
free -h

# Output
              total        used        free      shared  buff/cache   available
Mem:           1.9G        1.2G        123M        123M
Swap:          2.0G        123M        1.9G
```

</details>

---

### Question 32

You suspect that there is high CPU utilization on the system and need to perform further troubleshooting. Which command can be used to determine the current load average along with information on the amount of time since the last boot of the sytem?

A. uptime
B. sysinfo
C. bash
D. ls -u

<details>
<summary style="color: red;">Answer</summary>

A. uptime

**Explanation:**
The uptime command shows basic information such as that described along with the mumber of users logged into the system
and the current time. The bash command is a shell environment, and the ls command will not display the required information. The sysinfo command does not exist.

**Example:**

```bash
uptime

# Output
 04:19:23 up 66 days, 17:27,  2 users,  load average: 1.61, 1.08, 0.88
```

</details>

---

### Question 33

You need to start a long-running process that requires a terminal and foreground processing. However, you cannot leave your terminal window
open due to security restrictions. Which command will enable you to start the process and return at a later time to continue the session?

A. fg
B. bg
C. kill
D. screen

<details>
<summary style="color: red;">Answer</summary>

D. screen

**Explanation:**
The screen command starts a new terminal that can be disconnected and reconnected as needed. Processes running from within the screen session
do not know what they are running in a screen session and therfore meet the criteria needed to satisfy this question. The fg and bg commands
will not meet the criteria, and the kill command will stop a process.

### **Example:**

You are running a long process, such as compiling a large codebase or performing a database migration, and you want to ensure it continues running even if your SSH session is disconnected. The `screen` command allows you to create a persistent session for this purpose.

---

### **Steps:**

1.  **Start a `screen` session:**

    `screen -S mysession`

    - This creates a new screen session named `mysession`.
    - You are now inside the screen session.

2.  **Run your long-running command:**

    `./long_running_process.sh`

3.  **Detach from the session:**\
    If you want to disconnect from the session while keeping the process running, press:

    `Ctrl + A, then D`

    - This detaches you from the `screen` session, but the process continues running in the background.

4.  **Reattach to the session later:** If you want to reconnect to the session to check the process:

    `screen -r mysession`

---

### **Example Scenario:**

```bash
# Start a screen session named "backup"
screen -S backup

# Inside the session, start a database backup
mysqldump -u root -p mydatabase > backup.sql

# Detach from the session
Ctrl + A, then D

# Reattach to the session later
screen -r backup`
```

This ensures the backup continues running even if your SSH connection is interrupted.

</details>

---

### Question 34

You are troubleshooting an NFS filesystem that will not unmount. Which option within the mount point's systemd mount
file can be used to force the mount point to be unmounted?

A. NFSUmoount=
B. Timeout=
C. Options=
D. ForceUnmount=

<details>
<summary style="color: red;">Answer</summary>

D. ForceUnmount=

**Explanation:**
The ForceUnmount= option is equivalent to passing the -f option to unmount and forces the filesystem
to be unmounted. The Options= directive is valid but not for this purpose. The other options shown are not valid.

**Example:**

```bash
# Location of the mount file
/etc/systemd/system/mymount.mount

[Mount]
What=/dev/sdb1
Where=/mnt/mymount
Type=ext4
Options=defaults
ForceUnmount=true

or

unmount -f /mnt/mymount
```

</details>

---

### Question 35

You have backgrounded several tasks using &. Which command can be used to view the current list of running tasks that have been backgrounded?

A. procs
B. plist
C. jobs
D. free

<details>
<summary style="color: red;">Answer</summary>

C. jobs

**Explanation:**
The jobs built-in command shows the list of jobs running in the background. Its output includes both a job number and the status of the job.

**Example:**

```bash
# Start a background process
sleep 100 &
jobs

# Output
[1]+  Running                 sleep 100 &
```

</details>

---

### Question 36

You suspect there is a runway process on the server. Which commmand can be used to kill any process by using its name?

A. killproc
B. killname
C. killall
D. kill -f

<details>
<summary style="color: red;">Answer</summary>

C. killall

**Explanation:**
The killall command is used to terminate processes using their name.

**Example**:

```bash
killall -9 process_name
```

</details>

---

### Question 37

You are using top to investigate a report of the system processing being slow. A developer reports that the id column within %Cpu(s) output of top is reporting as 98.3 and they would like to know which PID is associated with that much CPU. What should you tell them?

A. The id column represents the average delay for a process.
B. The id column is CPU time related to user processes.
C. The process ID will need to be found with the ps command to determine which PID corresponds to the id output.
D. The number that corresponds to id represents idle time of the CPU and not the time used by a process ID.

<details>
<summary style="color: red;">Answer</summary>

D. The number that corresponds to id represents idle time of the CPU and not the time used by a process ID.

**Explanation:**
The id output represents CPU idle time and therefore is telling for this scenario insofar as further investigation will be needed to determine the cause of reported slowdowns on the system. The id output is not associated with a process or user ID, and user processes are represented by us in the output of top.

**Example:**

```bash
top

# Output
top - 04:19:23 up 66 days, 17:27,  2 users,  load average: 1.61, 1.08, 0.88
Tasks: 179 total,   1 running, 178 sleeping,   0 stopped,   0 zombie
%Cpu0  :  5.0 us,  2.7 sy,  0.0 ni, 92.3 id,  0.0 wa,  0.0 hi,  0.0 si,  0.0 st
%Cpu1  : 10.0 us,  5.0 sy,  0.0 ni, 84.9 id,  0.0 wa,  0.0 hi,  0.0 si,  0.0 st
MiB Mem :   1963.7 total,    347.5 free,   1010.2 used,    606.0 buff/cache
```

</details>

---

### Question 38

When an fsck is running on an ext3 filesystem, the process is taking longer than expected and requiring input from the administrator to fix issues. What option could be added to fsck next time so that the command will automatically attempt to fix errors without intervention?

A. -o
B. -V
C. -y
D. -f

<details>
<summary style="color: red;">Answer</summary>

C. -y

**Explanation:**
The -y option will attempt to repair automatically, essentially answering y or yes instead of prompting. Of the other options,
only -V is valid and will produce verbose output. The -o option is not valid, and the -f option is used to force a check. The -y option is the best choice for this scenario.

**Example:**

```bash
fsck -y /dev/sda1
```

</details>

---

### Question 39

You are using a storage area network (SAN) that keeps causing errors on your Linux system due to an improper kernel module created by the SAN vendor. When the SAN sends updates, it causes the filesystem to be mounted as read-only. Which command and option can you use to change the behavior of the filesystem to account for the SAN bug?

A. mount --continue
B. tune2fs -e continue
C. mkfs --no-remount
D. mount -o remount

<details>
<summary style="color: red;">Answer</summary>

B. tune2fs -e continue

**Explanation:**
The tune2fs command can be used for this purpose but should be used with case because it can result in data corruption. The -e option is used to set the error behavior of the filesystem. The other options shown are not valid.

**Example:**

```bash
tune2fs -e continue /dev/sda1
```

</details>

---

### Question 40

Which command is used to format a swap partition?

A. fdisk
B. mkswap
C. formatswap
D. format -s

<details>
<summary style="color: red;">Answer</summary>

B. mkswap

**Explanation:**
The mkswap command formats a swap partition. The fdisk command is used to create the partition but not format it. The other two options do not exist.

**Example:**

```bash
mkswap /dev/sda1
```

</details>

---

### Question 41

The system is running out of disk space within the home directory partition, and quotas have not been enabled. Which command can you use to determine the directories that might contain large files?

A. du
B. df
C. ls
D. locate

<details>
<summary style="color: red;">Answer</summary>

A. du

**Explanation:**
The du command will report on disk usage in a recursive manner, unlike the other commands shown here. The df command will show disk space usage but not in a recursive manner. The ls command will show files in a directory but not their size, and the locate command is used to find files by name.

**Example:**

```bash
du -h /home

# Output
2.0G    /home/user1
1.0G    /home/user2
```

</details>

---

### Question 42

Which option is set on a filesystem in order to enable user-level quotas?

A. quotaon
B. enquota=user
C. usrquota
D. userquota

<details>
<summary style="color: red;">Answer</summary>

C. usrquota

**Explanation:**
The usrquota option will enable user-level quotas on the given mount point. This is typically set within /etc/fstab. The other options shown are not valid.

**Example:**

```bash
# Edit the /etc/fstab file
vi /etc/fstab

# Add the usrquota option to the filesystem
/dev/sda1 /home ext4 defaults,usrquota 0 0

# Remount the filesystem
mount -o remount /home
```

</details>

---

### Question 43

Which option to quotacheck is used to create the files for the first time?

A. -f
B. -u
C. -m
D. -c

<details>
<summary style="color: red;">Answer</summary>

D. -c

**Explanation:**
The -c option creates the files for the first time. The -f option is used for force checking, -u is used for user quotas,
and -m is used to not attempt remounting read-only filesystems.

**Example:**

```bash
quotacheck -c /home
```

</details>

---

### Question 44

While troubleshooting a file permission issue, you wrote a Bash script containing an if conditional. Which of the following tests will determine whether a file exists and can be ready by the user executing the test?

A. -e
B. -s
C. -a
D. -r

<details>
<summary style="color: red;">Answer</summary>

D. -r

**Explanation:**
The -r test determines whether a given file exists and can be read by the current user. The -e test only checks to see if the file exists, while -s determines if the file exists and has a size greater than zero. There is no -a file test.

**Example:**

```bash
if [ -r /path/to/file ]; then
    echo "File exists and is readable."
else
    echo "File does not exist or is not readable."
fi
```

</details>

---

### Question 45

Which start-up type is the defualt for systemd services if no Type= or BusName= options are specified?

A. oneshot
B. exec
C. simple
D. none

<details>
<summary style="color: red;">Answer</summary>

C. simple

**Explanation:**
The default `Type=` for systemd services is `simple` if no `Type=` or `BusName=` is explicitly specified in the service unit file. In the `simple` type, systemd assumes the process started by `ExecStart=` is the main service process, and no additional forking or complex logic is involved.

The other options:

- **oneshot**: Used for one-time tasks like initialization scripts.
- **exec**: Not a valid option for `Type=`.
- **none**: Not a valid systemd `Type=` option.

---

### Example:

**Scenario:**
You have an application named `myapp` located at `/usr/bin/myapp` that you want to run as a simple service using systemd. The service unit file doesn't specify a `Type=`, so the default `simple` is used.

**Unit File Example:**

```bash
# Location of the unit file
/etc/systemd/system/myapp.service

[Unit]
Description=My Simple Application

[Service]
ExecStart=/usr/bin/myapp

[Install]
WantedBy=multi-user.target`
```

**Explanation of the Example:**

1.  Since no `Type=` is specified, systemd defaults to `simple`.
2.  When the service starts, systemd will execute the command `/usr/bin/myapp` and assume it is the main process.

---

**Start the Service:**

`sudo systemctl start myapp.service`
`sudo systemctl enable myapp.service`

**Verify the Service Status:**

`sudo systemctl status myapp.service`

### Output:

```bash
 myapp.service - My Simple Application
   Loaded: loaded (/etc/systemd/system/myapp.service; enabled)
   Active: active (running) since Tue 2024-12-30 10:15:00 UTC; 5s ago
 Main PID: 12345 (/usr/bin/myapp)
    Tasks: 1 (limit: 4915)
   Memory: 5.8M
   CGroup: /system.slice/myapp.service
           └─12345 /usr/bin/myapp`
```

</details>

---

### Question 46

Which command can be used as a means to elevate privileges to run a command as root?

A. asroot
B. elev
C. sudo
D. runroot

<details>
<summary style="color: red;">Answer</summary>

C. sudo

**Explanation:**
The sudo command is used to run a command as another user, typically root. The other options shown are not valid.

**Example:**

```bash
sudo systemctl restart apache2
```

</details>

---

### Question 47

To which shell can a user account be set if they are not allowed to log in interactively to the computer?

A. /bin/bash
B. /bin/tcsh
C. /bin/zsh
D. /bin/false

<details>
<summary style="color: red;">Answer</summary>

D. /bin/false

**Explanation:**
Setting a user's shell to `/bin/false` will prevent them from logging in interactively to the system, such as with SSH. The other options shown for this question are valid shells and would allow an interactive login.

**Example:**

```bash
# Set the user's shell to /bin/false
sudo usermod -s /bin/false username
```

</details>

---

### Question 48

When troubleshooting disk usage, which of the following commands is used to determine the amount of disk space used by systemd journal log files?

A. journalctl --disk
B. journalctl -du
C. journalctl --disk-usage
D. journalctl -ls

<details>
<summary style="color: red;">Answer</summary>

C. journalctl --disk-usage

**Explanation:**
The `journalctl --disk-usage` command is used to determine the amount of disk space used by systemd journal log files, journal log files typically stored in /var/log/journal. The other options shown are not valid.

**Example:**

```bash
journalctl --disk-usage

# Output
Archived and active journals take up 3.0G in the file system.
```

</details>

---

### Question 49

Which command can be used to determine the current time-zone setting while troubleshooting a time-zone configuration issue?

A. timedatectl status
B. timedate --gettz
C. tzdata --list
D. timezone --show

<details>
<summary style="color: red;">Answer</summary>

A. timedatectl status

**Explanation:**
The command `timedatectl status` shows the current time zone along with other information about time and date on the device. The other commands shown are not valid for this purpose.

**Example:**

```bash
timedatectl status

# Output
Local time: Tue 2024-12-30 10:15:00 UTC
Universal time: Tue 2024-12-30 10:15:00 UTC
RTC time: Tue 2024-12-30 10:15:00
Time zone: UTC (UTC, +0000)
System clock synchronized: yes
NTP service: active
RTC in local TZ: no
```

</details>

---

### Question 50

Which of the following is not used as a private address for internal, non-internet use?

A. 172.16.4.2
B. 192.168.40.3
C. 10.74.5.244
D. 143.236.32.231

<details>
<summary style="color: red;">Answer</summary>

D. 143.236.32.231

**Explanation:**
Private IP addresses are found within the 10.0.0.0/8, 172.16.0.0/12, and 192.168.0.0/16 ranges, thus making an address in the 143 range a public IP.

</details>

---

### Question 51

Which of the following commands adds a default gateway of 192.168.1.1 for interface eth0?

A. route add default gateway 192.168.1.1 eth0
B. eth0 --dg 192.168.1.1
C. route add default gw 192.168.1.1 eth0
D. route define eth0 192.168.1.1

<details>
<summary style="color: red;">Answer</summary>

C. route add default gw 192.168.1.1 eth0

**Explanation:**
The route command is used for this purpose, and adding a route is done with the add option. The default gateway is added using the default gw keywords followed by the IP of the gateway and the adapter. The other options shown are not valid.

</details>

---

### Question 52

Which option for the host command will query for the authoritative nameservers for a given domain?

A. -t ns
B. -t all
C. -ns
D. -named

<details>
<summary style="color: red;">Answer</summary>

A. -t ns

**Explanation:**
The host command enables changing of the query type with the -t option. Using ns as the type will query for the nameservers for a given domain.
There is no all type, and the other options are also invalid.

**Example:**

```bash
host -t ns example.com

# Output
example.com name server ns1.example.com.
example.com name server ns2.example.com.
```

</details>

---

### Question 53

Which option for the ping command enables you to choose the interface from which the ICMP packets will be generated?

A. -i
B. -I
C. -t
D. -a

<details>
<summary style="color: red;">Answer</summary>

B. -I

**Explanation:**
The -I option enables the choice of interface. A lowercase -i option sets the interval, while -a indicates an audible ping. Finally, -t enables a TTL-based ping only.

**Example:**

```bash
ping -I eth0 8.8.8.8
```

</details>

---

### Question 54

Which of the following commands queries for the mail servers for the domain example.com?

A. dig example.com mx
B. dig example.com
C. host -t smtp example.com
D. dig example.com smtp

<details>
<summary style="color: red;">Answer</summary>

A. dig example.com mx

**Explanation:**
The host or dig command can be used for this purpose by setting the type to mx. The mx type will query for the mail exchanger for the given domain. There is no smtp type.

**Example:**

```bash
dig example.com mx

# Output
example.com.  3600  IN  MX  10 mail.example.com.
```

</details>

---

### Question 55

You need to test SSL connectivity to a web server at www.example.com. Which of the following commands accomplishes this task?

A. rd www.example.com -L
B. curSSH https://www.example.com
C. openssl https://www.example.com:443
D. openssl s_client -connect www.example.com:443

<details>
<summary style="color: red;">Answer</summary>

D. openssl s_client -connect www.example.com:443

**Explanation:**
The openssl s_client -connect www.example.com:443 command accomplishes the task described. The other commands shown are not valid.

**Example:**

```bash
openssl s_client -connect www.example.com:443

# Output
CONNECTED(00000003)
depth=2 C = US, O = DigiCert Inc, OU = www.digicert.com, CN = DigiCert Global Root CA
verify return:1
depth=1 C = US, O = DigiCert Inc, CN = DigiCert SHA2 Secure Server CA
```

</details>

---

### Question 56

Which command can be used to listen for netlink messages on a network?

A. ip monitor
B. netlink -a
C. ip netlink
D. route

<details>
<summary style="color: red;">Answer</summary>

A. ip monitor

**Explanation:**
The ip command with the monitor option/subcommand will display netlink messages as they arrive. There is no netlink subcommand for ip, and the route command will not work for this purpose.

### Real-Life Example:

#### **Scenario:**

You want to monitor changes to the network in real time, such as when an interface goes up or down or a new IP address is assigned.

#### **Command:**

`ip monitor`

#### **Expected Output (Example):**

```bash
14:28:36 dev eth0 link DOWN
14:28:40 dev eth0 link UP
14:28:41 RTM_NEWADDR: 192.168.1.10/24 brd 192.168.1.255 dev eth0
14:28:41 RTM_NEWROUTE: dst 0.0.0.0/0 via 192.168.1.1 dev eth0
```

---

### **Additional Usage:**

The `ip monitor` command can also monitor specific network components:

1.  **Monitor addresses:**

    `ip monitor address`

    - Displays only changes related to IP addresses.

2.  **Monitor routes:**

    `ip monitor route`

    - Displays only route changes, such as when a new gateway is added or removed.

3.  **Monitor all events (default):**

    `ip monitor all`

    - Monitors all events, including changes to links, addresses, and routes.

---

### Practical Use Case:

1.  Open a terminal and run:

    `ip monitor`

2.  In another terminal, make a network change (e.g., bring an interface down):

    `sudo ip link set eth0 down`

3.  Observe the output from the `ip monitor` command:

    `14:45:23 dev eth0 link DOWN`

</details>

---

### Question 57

Which of the following dig commands sends the query for example.com directly to the server at 192.168.2.5 rather than to a locally configuraed resolver?

A. dig example.com@192.168.2.5
B. dig -t 192.168.2.5 example.com
C. dig -s 192.168.2.5 exmaple.com
D. dig server=192.168.2.5 example.com

<details>
<summary style="color: red;">Answer</summary>

A. dig example.com@192.168.2.5

**Explanation:**
The @ symbol is used to indicate a server to which the query will be sent directly. This can be quite useful for troubleshooting resolution problems by sending the query directly to an authoritative name server for the domain. Of the other options, -t sets the type, and the remanining options are not valid.

**Example:**

```bash
dig example.com@

# Output
example.com.  3600  IN  A
```

</details>

---

### Question 58

Which of the following commands will enumerate the hosts database?

A. getent hosts
B. gethosts
C. nslookup
D. host

<details>
<summary style="color: red;">Answer</summary>

A. getent hosts

**Explanation:**
The `getent` command is used to query databases configured in `/etc/nsswitch.conf`. The `hosts` argument displays the hosts database entries, which include hostname-to-IP mappings from `/etc/hosts` and other sources such as DNS, depending on the configuration in `/etc/nsswitch.conf`.

The other options:

- **gethosts**: Not a valid command.
- **nslookup**: Used to query DNS servers, not the hosts database.
- **host**: A DNS lookup tool, unrelated to the hosts database.

---

### **Example:**

#### **Scenario:**

You want to view all entries in the hosts database, including those defined in `/etc/hosts` and resolved via DNS.

#### **Command:**

`getent hosts`

#### **Output (Example):**

`127.0.0.1       localhost
::1             localhost
192.168.1.10    myserver.local`

---

### **Explanation of the Output:**

1.  **`127.0.0.1 localhost`**: A standard entry from `/etc/hosts` for the loopback address.
2.  **`::1 localhost`**: The IPv6 equivalent of the loopback address.
3.  **`192.168.1.10 myserver.local`**: A custom entry (likely from `/etc/hosts`) mapping a local hostname to an IP address.

---

### **Real-Life Scenario:**

If you're troubleshooting hostname resolution issues, you can use `getent hosts` to verify:

1.  If a hostname is correctly defined in `/etc/hosts` or resolved via DNS.
2.  How the system resolves a specific hostname.

For example, to find the IP of `myserver.local`:

`getent hosts myserver.local`

#### **Output:**

`192.168.1.10    myserver.local`

---

### Practical Use:

1.  View all host mappings:

    `getent hosts`

2.  Check resolution for a specific hostname:

    `getent hosts example.com`

3.  Compare results with DNS tools (e.g., `nslookup` or `dig`) to identify inconsistencies.

---

</details>

---

### Question 59

Which of the following configuration lines will set the DNS server to 192.168.1.4 using /etc/resolv.conf?

A. dns 192.168.1.4
B. dns-server 192.168.1.4
C. nameserver 192.168.1.4
D. name-server 192.168.1.4

<details>
<summary style="color: red;">Answer</summary>

C. nameserver 192.168.1.4

**Explanation:**
The configuration option is called nameserver, and the valude for the option is the IP address of the desired nameserver. There are serveral options that affect how name resolution is performed, such as the number of attempts and timeout. See resolv.conf(5) for more information.

**Example:**

```bash
# Edit the /etc/resolv.conf file
vi /etc/resolv.conf

# Add the nameserver option
nameserver 192.168.1.4

# Save and exit the file
```

</details>

---

### Question 60

Which of the following commands adds a route to the server for the network 192.168.51.0/24 through its gateway of 192.168.51.1?

A. route add -net 192.168.51.0 netmask 255.255.255.0 gw 192.168.51.1
B. route add -net 192.168.51/24 gw 192.168.1.51
C. route -net 192.168.51.0/24 192.168.51.1
D. route add 192.168.51.1 -n 192168.51.0//255.255.255.0

<details>
<summary style="color: red;">Answer</summary>

A. route add -net 192.168.51.0 netmask 255.255.255.0 gw 192.168.51.1

**Explanation:**
The route command can be used for this purpose; the syntax includes the network range, denoted with the -net option, followed by the word
netmask and the masked bits, followed by the word gw and the IP of the gatway. The other options shown are invalid for a variety of reasons, including missing keywoards and options and order.

</detail>

---

### Question 61

Which of the following commands shows network services or sockets that are currently listening with sockets that are not listening?

A. netstat -a
B. netlink -a
C. sockets -f
D. opensock -l

<details> 
<summary style="color: red;">Answer</summary>

A. netstat -a

**Explanation:**
The netstat command is used for this purpose, and the -a option displays all sockets, listening and non-listening. Note that it's frequently helpful to add the -n option, or combine them as in netstat -an, in ordr to prevent name lookup. Doing so can significantly improve performance of the command. The other options shown are not valid.

**Example:**

```bash
netstat -an

# Output
Proto Recv-Q Send-Q Local Address           Foreign Address         State
tcp        0      0
tcp        0      0
tcp        0      0
```

</details>

---

### Question 62

Which of the following represents a correct configuration line for /etc/hosts?

A. 192.168.1.4 cwa.braingia.org cwa
B. cwa.braingia.org cwa 192.168.1.4
C. cwa.braingia.org 192.168.1.8 alias cwa
D. alias cwa.braingia.org cwa 192.168.1.4

<details>
<summary style="color: red;">Answer</summary>

A. 192.168.1.4 cwa.braingia.org cwa

**Explanation:**
The correct format is IP address followed by canonical hostname and any aliases for the host. You can use entries in /etc/hosts to override DNS lookups, which can be useful to prevent those names from resolving or to provide a different resolution.

### Example:

#### **Scenario:**

You want to map the hostname `cwa.braingia.org` and its alias `cwa` to the IP address `192.168.1.4` to ensure it resolves locally without relying on DNS.

#### **Steps:**

1.  **Edit the `/etc/hosts` file:**

    `sudo vi /etc/hosts`

2.  **Add the entry:**

    `192.168.1.4 cwa.braingia.org cwa`

3.  **Save and exit the file.**

---

### **Testing the Configuration:**

After adding the entry, test the resolution:

1.  **Using `ping`:**

        `ping cwa`

        **Output:**

        `PING cwa (192.168.1.4): 56 data bytes

    64 bytes from 192.168.1.4: icmp_seq=0 ttl=64 time=0.123 ms`

2.  **Using `getent`:**

    `getent hosts cwa.braingia.org`

    **Output:**

    `192.168.1.4 cwa.braingia.org cwa`

---

### Real-Life Use Case:

The `/etc/hosts` file is particularly useful when:

1.  Setting up development environments to resolve hostnames to local IPs.
2.  Overriding DNS entries for testing or debugging.
3.  Blocking specific domains by pointing them to `127.0.0.1`.

For example, to block a website:

`127.0.0.1 example.com`

</details>

---

### Question 63

Which command can be used to determine how much time a Linux command takes?

A. time
B. cmdtime
C. timeproc
D. proctime

<details>
<summary style="color: red;">Answer</summary>

A. time

**Explanation:**
The time command is used to determine how much time a command takes to run. The other options shown are not valid.

**Example:**

```bash
time ls

# Output
real    0m0.003s
user    0m0.001s
sys     0m0.001s
```

</details>

---

### Question 64

Which of the following commands will change the default gateway to 192.168.1.1 using eth0?

A. ip route default gw 192.168.1.1
B. ip route change default via 192.168.1.1 dev eth0
C. ip route default gw update 192.168.1.1
D. ip route update default 192.168.1.1 eth0

<details>
<summary style="color: red;">Answer</summary>

B. ip route change default via 192.168.1.1 dev eth0

**Explanation:**
The ip route command can be used for this purpose, and its syntax uses a change command and the via keyword. The same operation could
be completed with the route command but would require deleting the existing gateway first and then re-adding a new default gateway.

</details>

---

### Question 65

Which option to dumpe2fs displays the bad blocks for a given partition?

A. -bb
B. -c
C. -b
D. -f

<details>
<summary style="color: red;">Answer</summary>

C. -b

**Explanation:**
Bad blocks are shown with the -b option. The -f option forces dumpe2fs to perform the requested operation, and the other command options do not exist.

**Example:**

```bash
dumpe2fs -b /dev/sda1

# Output
Block 12345 is marked as bad
Block 23456 is marked as bad
```

</details>

---

### Question 66

Which option to xfs_check is used to verify a filesystem that is stored in a file?

A. -v
B. -a
C. -f
D. -d

<details>
<summary style="color: red;">Answer</summary>

C. -f

**Explanation:**
The -f option specifies that xfs_check should check the contents of the named file for consistency. The -v option sets verbosity, and
there are no -d and -a options for xfs_check.

**Example:**

```bash
xfs_check -f /path/to/file

# Output
Filesystem in file /path/to/file is consistent
```

</details>

---

### Question 67

Which option within a systemd mount file specifies the filesystem to be mounted?

A. FSPath=
B. Path=
C. Where=
D. What=

<details>
<summary style="color: red;">Answer</summary>

D. What=

**Explanation:**
The What= option specifies the filesystem to be mounted. The Where= option defines the destination to which the filesystem will be mounted.
The other options shown are not valid.

**Example:**

```bash
# Location of the mount file
/etc/systemd/system/mymount.mount

[Mount]
What=/dev/sdb1
Where=/mnt/mymount
Type=ext4
Options=defaults
```

</details>

---

### Question 68

Assume that you want to enable local client services to go to hosts on the network without needing to fully qualify the name by adding the
domain for either example.com or example.org. Which option in /etc/resolv.conf will provide this functionality?

A. search
B. domain
C. local-domain
D. local-order

<details>
<summary style="color: red;">Answer</summary>

A. search

**Explanation:**
The search option is used for this purpose and can be provided with multiple domain names, each separated by a space or tab. The domain
option is valid within /etc/resolv.conf but does not allow for multiple domain names. The other options shown are not valid.

**Example:**

```bash
# Edit the /etc/resolv.conf file
vi /etc/resolv.conf

# Add the search option
search example.com example.org

# Save and exit the file
```

</details>

---

### Question 69

Which of the following commands prevents traffic from reaching the host 192.168.1.3?

A. route add -host 192.168.1.3 reject
B. route -nullroute 192.168.1.3
C. route add -null 192.168.1.3
D. route add -block 192.168.1.3

<details>
<summary style="color: red;">Answer</summary>

A. route add -host 192.168.1.3 reject

**Explanation:**
The route command cna be used for this purpose, and in the scenario described, a reject destination is used for the route. The other
options shown are invalid because they use incorrect keywords or options.

</details>

---

### Question 70

Which of the following describes a primary difference betweeen traceroute and tracepath?

A. The traceroute command requires root privileges.
B. The tracepath command provides the MTU for each hop, whereas traceroute does not.
C. The tracepath command cannot be used for tracing a path on an external network.
D. The traceroute command is not compatible with IPv6.

<details>
<summary style="color: red;">Answer</summary>

B. The tracepath command provides the MTU for each hop, whereas traceroute does not.

**Explanation:**
The tracepath command provides the Maximum Transimmion Unit (MTU) of the hops, where possible. Both traceroute and tracepath can be used internally
or externally, and both provide IPv6 capabilities. Certain options with the traceroute command can require root privileges, but not enough information
was given in the question for that to have been the correct answer.

</details>

---

### Question 71

Which of the following commands will emulate the ping command in Microsoft Windows, where the ping is sent for four packets
and then the command exits?

A. ping -n 4
B. ping -t 4
C. ping -p 4
D. ping -c 4

<details>
<summary style="color: red;">Answer</summary>

D. ping -c 4

**Explanation:**
The -c option provides the count of the number of pings to send. The -n option specifies numeric output only, while -p specifies the pattern to use for the
packet content. Finally, the -t option sets the TTL for the packet.

</details>

---

### Question 72

Which option to journalctl displays log messages as they are being logged?

A. --tail
B. --du
C. -f
D. -m

<details>
<summary style="color: red;">Answer</summary>

C. -f

**Explanation:**
The -f follows the log much like tail -f. There is no --tail option for journalctl.
Of the other options, --du dumps the catalog, and -m merges all available journals.

**Example:**

```bash
journalctl -f -u apache2
```

</details>

---

### Question 73

Which of the following commands should be executed after running ip route change?

A. ip route flush cache
B. ip route reload
C. ip route cache reload
D. ip route restart

<details>
<summary style="color: red;">Answer</summary>

A. ip route flush cache

**Explanation:**
The ip route flush cache command should be executed after changing the routes. This will clear the routing cache and ensure that the new routes are used.
The other options shown are not valid.

**Example:**

```bash
ip route change default via 192.168.4.1 dev eth0 && ip route flush cache
```

</details>

---

### Question 74

Which option should be used to send a DNS query for an SPF record with dig?

A. -t txt
B. -t spf
C. -t mx
D. -t mailspf

<details>
<summary style="color: red;">Answer</summary>

A. -t txt

**Explanation:**
SPF records are stored in the txt record type in DNS, thereby making -t txt the correct option for this.
Of the other answers, only -t mx is valid and returns the mail exchangers for the given domain. The other options are not valid.

**Example:**

```bash
dig -t txt example.com +short
```

</details>

---

### Question 75

When troubleshooting a connectivity issue, you have found that you can reach a server via the Web but cannot ping it and suspect that there are dropped packets.
Which of the following best describes a possible cause for this scenario?

A. TCP traffic has been blocked at the firewall.
B. The DNS lookup is failing.
C. ICMP traffic has been blocked at the firewall.
D. There is a reject route in place.

<details>
<summary style="color: red;">Answer</summary>

C. ICMP traffic has been blocked at the firewall.

**Explanation:**
The only viable possiblity of those listed is that ICMP traffic is blocked. TCP traffic is obviously
passing because of the ability to get there using HTTP, and DNS must also be working because the server is being reached by name. A reject route would not allow the connection to be made.

</details>

---

### Question 76

When you're viewing the available routes using the route command, one route contains the flags UG and the others contain U.
What does the letter G signify in the route table?

A. The G signifies that the route is good.
B. The G signifies that the route is unavailable.
C. The G signifies that this is a gateway.
D. The G signifies that the route is an aggregate.

<details>
<summary style="color: red;">Answer</summary>

C. The G signifies that this is a gateway.

**Explanation:**
The G flag signifies that the route is a gateway. The U flag signifies that the route is up and available. The other options are not valid.

**Example:**

```bash
route -n

# Output
Kernel IP routing table
Destination     Gateway         Genmask         Flags Metric Ref    Use Iface
0.0.0.0         192.168.1.1     0.0.0.0         UG    100    0        0 eth0
192.168.1.0     0.0.0.0         255.255.255.0   U     100    0        0 eth0
```

</details>

---

### Question 77

Which of the following commands requests a zone transfer of example.org from the server at 192.168.1.4?

A. dig example.org@192.168.1.4 axfr
B. dig example.org@192.168.1.4
C. dig example.org@192.168.1.4 xfer
D. dig example.org#192.168.1.4 xfer

<details>
<summary style="color: red;">Answer</summary>

A. dig example.org@192.168.1.4 axfr

**Explanation:**
The axfr type is a zone transfer, and the @ symbol signifies the server to which the query will be sent. There is no xfer type. Option B is just a normal
query for the domain sent to the speciffied server.

</details>

---

### Question 78

You are troubleshooting a disk space issue and notice that the journal files are consuming too much space. Which option within journald.conf sets a limit on how much disk space can be used?

A. MaxDisk=
B. SystemMaxUse=
C. MaxSpace=
D. SpaceLimit=

<details>
<summary style="color: red;">Answer</summary>

B. SystemMaxUse=

**Explanation:**
The SystemMaxUse= option sets a limit on how much disk space can be used by the journal files. The other options shown are not valid.

**Example:**

```bash
# Edit the /etc/systemd/journald.conf file
vi /etc/systemd/journald.conf

# Add the SystemMaxUse option
SystemMaxUse=500M

# Save and exit the file
```

</details>

---

### Question 79

Although no dependencies may appear in a unit file, a service with a Type=dbus depends on which service?

A. dbus.socket
B. dbus.run
C. dbus.dep
D. dbus.svc

<details>
<summary style="color: red;">Answer</summary>

A. dbus.socket

**Explanation:**
A Type=dbus for a service file has implicit dependencies of Requires= and After= on dbus.socket. The other options are not valid.

</details>

---

### Question 80

Which of the following commands scans the IP address 192.168.1.154 for open ports?

A. nmap 192.168.1.154
B. lsof 192.168.1.154
C. netstat 192.168.1.154
D. netmap 192.168.1.154

<details>
<summary style="color: red;">Answer</summary>

A. nmap

**Explanation:**
The nmap command is used to scan for open ports. It will scan for open TCP ports to the address or addresses specified.
The other commands shown do not scan for open ports to external (off-host) IP addresses.

</details>

---

### Question 81

You are troubleshooting an NFS filesystem that will not mount. Which option within the mount point's systemd mount file is used to specify the type of filesystem being mounted?

A. FSType=
B. Type=
C. App=
D. MountType=

<details>
<summary style="color: red;">Answer</summary>

B. Type=

**Explanation:**
The Type= option is used to specify the type of filesystem that will be mounted. It is similar to the types used with the mount command itself. The other options shown are not valid.

**Example:**

```bash
# Location of the mount file
/etc/systemd/system/mymount.mount

[Mount]
What=/dev/sdb1
Where=/mnt/mymount
Type=ext4
Options=defaults
```

</details>

---

### Question 82

What is the file extension used with systemd unit files that provide time-based control of services?

A. .svc
B. .cron
C. .sked
D. .timer

<details>
<summary style="color: red;">Answer</summary>

D. .timer

**Explanation:**
The .timer file extension is used with systemd timer files that provide an alternative to cron. The other options are not valid.

</details>

---

### Question 83

You are using nmap to scan a host for open ports. However, the server is blocking ICMP echo requests. Which option to nmap can you set in order to continue the scan?

A. -P0
B. -no-ping
C. -s0
D. -ping-0

<details>
<summary style="color: red;">Answer</summary>

A. -P0

**Explanation:**
Setting -P0 wil cause no ping requests to precede the scan and is useful for the scenario decsribed. There is a -s option, but it is not used for this purpose. The other options shown are not valid.

**Example:**

```bash
nmap -P0 example.com

# Output
Starting Nmap 7.80 ( https://nmap.org ) at 2024-12-30 10:15 UTC
Nmap scan report for example.com (
Host is up (0.0010s latency).
Not shown: 999 closed ports
PORT   STATE SERVICE
80/tcp open  http
```

</details>

---

### Question 84

Which option within /etc/security/limits.conf is used to control the number of times a given account can log in simultaneously?

A. nlogins
B. loginmax
C. maxlogins
D. loginlimit

<details>
<summary style="color: red;">Answer</summary>

C. maxlogins

**Explanation:**
The maxlogins parameter is used to control the number of simultaneous logins for a given account. The other options shown are not valid.

**Example:**

```bash
# Edit the /etc/security/limits.conf file
vi /etc/security/limits.conf

# Add the maxlogins option
username hard maxlogins 2

# Save and exit the file
```

</details>

---

### Question 85

Which option to nmap sets the scan to use TCP SYN packets for finding open ports?

A. -sS
B. -sT
C. -sY
D. -type SYN

<details>
<summary style="color: red;">Answer</summary>

A. -sS

**Explanation:**
The -s option sets the type of scan and, when followed by an uppercase S, sets the option to SYN. The T option is a Connect() scan. There is no Y option, and the -type option is not valid.

**Example:**

```bash
nmap -sS example.com

# Output
Starting Nmap 7.80 ( https://nmap.org ) at 2024-12-30 10:15 UTC
Nmap scan report for example.com (
Host is up (0.0010s latency).
Not shown: 999 closed ports
PORT   STATE SERVICE
80/tcp open  http
```

</details>

---

### Question 86

Which option to tune2fs enables the specification of various journal options such as specifying the location of the journal itself?

A. -a
B. -J
C. -x
D. -A

<details>
<summary style="color: red;">Answer</summary>

B. -J

**Explanation:**
The -J option enables specification of various settings for the journal such as its location. The other options shown are not valid.

**Example:**

```bash
tune2fs -J location=external /dev/sda1
```

</details>

---

### Question 87

You are troubleshooting high latency and low throughput with a disk and using iostat to assess performance. Which option to iostat displays information on a per-partition basis for block devices?

A. -a
B. -c
C. -d
D. -p

<details>
<summary style="color: red;">Answer</summary>

D. -p

**Explanation:**
The -p option to iostat displays information on devices and partitions. The -c option shows CPU utilization, and -d shows device utilization and can be used
to display Input/Output Per Second (IOPS) information. There is no -a option.

**Example:**

```bash
trafshape@XN ~ $ iostat -p
Linux 4.4.0-210-generic (XN) 	01/08/2025 	_x86_64_	(4 CPU)

avg-cpu:  %user   %nice %system %iowait  %steal   %idle
           1.69    0.01    0.85    0.01    0.06   97.39

Device:            tps    kB_read/s    kB_wrtn/s    kB_read    kB_wrtn
xvdb              0.09         0.36         0.00   15089508      34772
xvda              0.98         2.05        10.90   86864097  460944364
xvdap1            0.96         1.98        10.90   83864653  460944364
```

</details>

---

### Question 88

Which of the following commands displays blocks in and blocks out as related to I/O?

A. iorpt
B. iptraf
C. vmswap
D. vmstat

<details>
<summary style="color: red;">Answer</summary>

D. vmstat

**Explanation:**
The vmstat command is used to display extended information about performance, including blocks in and out. The iptraf command is used to provide network-level monitoring, and
the other two commands listed are not valid.

**Example:**

```bash
vmstat

# Output
procs -----------memory---------- ---swap-- -----io---- -system-- ------cpu-----
 r  b   swpd   free   buff  cache   si   so    bi    bo   in   cs us sy id wa st
 0  0      0  12345  12345  12345
```

</details>

---

### Question 89

Which of the following commands can be used to display a list of currently logged-in users along with the current load average and time since last reboot?

A. uptime
B. w
C. swap
D. sysinfo

<details>
<summary style="color: red;">Answer</summary>

B. w

**Explanation:**
The w command shows various useful information that includes load average, logged-in users, and other uptime information. The uptime command does not show who
is currently logged in. There is no swap or sysinfo command.

**Example:**

```bash
w

# Output
 10:15:00 up  1:00,  1 user,  load average: 0.00, 0.01, 0.05
USER     TTY      FROM             LOGIN@   IDLE   JCPU   PCPU WHAT
trafshape pts/0
```

</details>

---

### Question 90

You need to examine the hardware to determine the amount of memory on the system and the block size. Which command can be used for this purpose?

A. free
B. memstat
C. lsmem
D. memx

<details>
<summary style="color: red;">Answer</summary>

C. lsmem

**Explanation:**
The lsmem command shows statistics about the memory in the system, including block size. Among the other options, free shows in-use memory
information but not block size. The other options are not valid.

**Example:**

```bash
lsmem

# Output
RANGE                                  SIZE  STATE REMOVABLE BLOCK
0x0000000000000000-0x0000000007ffffff  128M online        no  4K
0x0000000008000000-0x000000001fffffff  384M online        no  4K
0x0000000020000000-0x000000002fffffff  256M online        no  4K
```

</details>

---

### Question 91

While troubleshooting high latency, you need to collect data on throughput. Which of the following monitoring tools can use SNMP
and scripts to collect data for performance-related graphing such as throughput and bandwidth?

A. ptop
B. pstree
C. Cacti
D. Grafr

<details>
<summary style="color: red;">Answer</summary>

C. Cacti

**Explanation:**
Cacti is a graphing tool that uses scripts for gathering performance data as well as SNMP. The graphs can help to visualize performance of networks and systems alike. The pstree command is used to show a tree-like structure of processes, and the other two options are not valid.

</details>

---

### Question 92

Which swapon option silently skips those swap partitions that do not exist?

A. -u
B. -e
C. -i
D. -o

<details>
<summary style="color: red;">Answer</summary>

B. -e

**Explanation:**
The -e option causes swapon to skip those partitions that do not exist. The other options are not valid.
**Example:**

```bash
swapon -e -a

# Output
Skipping non-existent swap file /swapfile
```

</details>

---

### Question 93

Which of the following abbreviations is used to signify system time CPU percentage in the output of the top command?

A. sys
B. us
C. sy
D. system%

<details>
<summary style="color: red;">Answer</summary>

C. sy

**Explanation:**
The sy abbrviation in the output of top represents the percentage of CPU time used by the system. Of the other options, us represents user CPU time. Options A and D
are not valid for this scenario.

**Example:**

```bash
top

# Output
%Cpu(s):  0.0 us,  0.0 sy,  0.0 ni, 99.9 id,  0.0 wa,  0.0 hi,  0.0 si,  0.0 st
```

</details>

---

### Question 94

Which of the following commands deactivates swap space?

A. swapoff
B. swap -off
C. unmountswap
D. uswap

<details>
<summary style="color: red;">Answer</summary>

A. swapoff

**Explanation:**
The swapoff command deactivates swap space, thereby making it unavailable as virtual memory on the system. The other commands shown as options are not valid.

**Example:**

```bash
swapoff /dev/sda1
```

</details>

---

### Question 95

Which of the following swapon options displays information on the size of swap space along with its used space?

A. --list
B. -a
C. --show
D. -h

<details>
<summary style="color: red;">Answer</summary>

C. --show

**Explanation:**
The --show option displays information about the swap spaces on the computer, indcluding how much swap is currently being used. The -a
option activates all swap spaces. There is no --list option, and -h displays help.

**Example:**

```bash
swapon --show

# Output
NAME      TYPE SIZE USED PRIO
/dev/sda1 partition 1G 0B -2
```

</details>

---

### Question 96

Which of the following commands displays information about a given physical volume in an LVM setup?

A. pvdisp
B. pvlist
C. pvdisplay
D. pv1

<details>
<summary style="color: red;">Answer</summary>

C. pvdisplay

**Explanation:**
The pvdisplay command shows information about a given physical volume. You can use pvdisplay to view the device on which the PV is built along with the extent size of the PV.
The other commands shown are not valid.

**Example:**

```bash
pvdisplay /dev/sda1

# Output
--- Physical volume ---
PV Name               /dev/sda1
VG Name               vg1
PV Size               10.00 GiB / not usable 4.00 MiB
Allocatable           yes
PE Size               4.00 MiB
Total PE              2559
Free PE               2559
Allocated PE          0
PV UUID               12345678-1234-1234-1234-1234567890ab
```

</details>

---

### Question 97

Which of the following commands looks for LVM physical volumes and volume groups involved in an LVM configuration?

A. vgscan
B. lvmscan
C. lvlist
D. pvlist

<details>
<summary style="color: red;">Answer</summary>

A. vgscan

**Explanation:**
The vgscan command looks for both physical volumes and volume groups related to an LVM configuration. The vgscan command is run at
system startup but can also be run manually. The other commands are not valid.

**Example:**

```bash
vgscan

# Output
Reading all physical volumes.  This may take a while...
Found volume group "vg1" using metadata type lvm2
```

</details>

---

### Question 98

Which of the following commands is used to display a list of physical volumes involved in LVM?

A. pvdisp
B. pvlist
C. pvscan
D. pvmm

<details>
<summary style="color: red;">Answer</summary>

C. pvscan

**Explanation:**
The pvscan command displays a list of physical volumes on a given server. The PVs dispalyed are those that have been initialized with pvcreate for use with LVM. The other commands shown are not valid.

**Example:**

```bash
pvscan

# Output
PV /dev/sda1   VG vg1   lvm2 [10.00 GiB / 0    free]
PV /dev/sdb1   VG vg2   lvm2 [10.00 GiB / 0    free]
```

</details>

---

### Question 99

While troubleshooting interface errors, you need to examine the protocol family supported by an interface. When you're using the ip command, which protocol family is used as the default if not otherwise specified?

A. tcpip
B. ip
C. inet
D. arp

<details>
<summary style="color: red;">Answer</summary>

C. inet

**Explanation:**
The ip command defaults to the inet family if not otherise specified with the -f option. The command will attempt to guess the correct
family and fall back to inet. The other families listed as options for this command are not valid for use with the ip command.

**Example:**

```bash
ip addr show

# Output
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet
```

</details>

---

### Question 100

You are using the route command to view routes. However, name resolution is taking a long time and causing delay in the response from the route
command. Which option to route can be added to cause it to not perform name resolution?

A. -d
B. -e
C. -f
D. -n

<details>
<summary style="color: red;">Answer</summary>

D. -n

**Explanation:**
The -n option casues route to use numeric values only, performing no name resolution. This option is useful for the scenario described.
The -e option causes the output to be in netstat format. There is no -d or -f option for the route command.

**Example:**

```bash
route -n

# Output
Kernel IP routing table
Destination     Gateway         Genmask         Flags Metric Ref    Use Iface
0.0.0.0         10.32.5.1       0.0.0.0         UG    0      0        0 eth0
10.32.5.0       0.0.0.0         255.255.255.0   U     0      0        0 eth0
172.17.0.0      0.0.0.0         255.255.0.0     U     0      0        0 docker0

```

</details>

---

### Question 101

You have replaced a device on the network but used the IP address from another active device.
Which command can be run to remove the MAC address entry from your computer so that it performs the address resolution again?

A. arp -d
B. netstat -rn
C. hostname
D. dig

<details>
<summary style="color: red;">Answer</summary>

A. arp -d

**Explanation:**
Because you're working with MAC addresses, the arp command will be used. The -d option removes or deletes an ARP entry, which would be
appropriate here so that the MAC address resolution occurs again. The netstat command will not be used for this purpose. The hostname and dig commands
work with name resolution but not for MAC addresses or the ARP table.

**Example:**

```bash
arp -d

# Output
Address                  HWtype  HWaddress           Flags Mask            Iface
```

</details>

---

### Question 102

When looking to parse the output of the ip command, which option can be set to remove newlines such that the output could be piped to the grep command?

A. -n
B. -o
C. -l
D. -f

<details>
<summary style="color: red;">Answer</summary>

B. -o

**Explanation:**
The -o option removes newlines from the output, thereby making the output more suitable for the grep command. The -l option specifies the number of loops for the ip addr flush command. The -f option specifies the protocol family. There is no -n option.

**Example:**

```bash
ip addr show -o | grep inet

# Output
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    inet
```

</details>

---

### Question 103

Which option to arp command creates a new entry for a given IP address to MAC address pair?

A. -s
B. -c
C. -d
D. --add

<details>
<summary style="color: red;">Answer</summary>

A. -s

**Explanation:**
The -s option creates an static ARP table entry. The -d option removes an entry. The -c and --add options do not exist.

**Example:**

```bash
sudo arp -s 192.168.1.50 aa:bb:cc:dd:ee:ff -i eth0
```

**Note**
The arp utility is considered legacy. Modern Linux systems prefer the ip neigh command from iproute2 for managing neighbors (ARP for IPv4 and NDP for IPv6). An equivalent example using ip neigh would be:

`sudo ip neigh add 192.168.1.50 lladdr aa:bb:cc:dd:ee:ff dev eth0 nud permanent`

</details>

---

### Question 104

Which option to tcpdump displays a list of available interfaces on which tcpdump can operate?

A. -a
B. -d
C. -D
D. -i

<details>
<summary style="color: red;">Answer</summary>

C. -D

**Explanation:**
The -D option lists the interfaces on a given computer. The -d option dumps compiled matching code, and -i selects an interface. There is no -a option.

**Example:**

```bash
alux@MacBook-Pro-3:~$ tcpdump -D
1.en5 [Up, Running, Connected]
2.en0 [Up, Running, Wireless, Associated]
3.awdl0 [Up, Running, Wireless, Associated]
4.llw0 [Up, Running, Wireless, Not associated]
5.utun0 [Up, Running]
6.utun1 [Up, Running]
7.utun2 [Up, Running]
8.utun3 [Up, Running]
9.utun4 [Up, Running]
10.lo0 [Up, Running, Loopback]
11.ap1 [Up, Running, Disconnected]
12.en4 [Up, Running, Disconnected]
13.en3 [Up, Running, Disconnected]
14.en1 [Up, Running, Disconnected]
15.en2 [Up, Running, Disconnected]
16.bridge0 [Up, Running, Disconnected]
17.gif0 [none]
18.stf0 [none]
```

</details>

---

### Question 105

Which option to nmap will cause it to always perform name resolution?

A. -n
B. -R
C. -b
D. -a

<details>
<summary style="color: red;">Answer</summary>

B. -R

**Explanation:**
The -R option requires that an attempt at name resolution be performed. The -n option does the opposite: it disables name resolution.
There is no -b or -a option. The -R option is useful when you want to see the resolved names of the hosts being scanned.

**Example:**

```bash
nmap -R -sn 192.168.1.0/24

# -R: Forces Nmap to perform reverse-DNS lookups on every host it scans, even if it would normally skip name resolution for performance reasons.
# -sn (Ping Scan): Tells Nmap to detect which hosts are up without doing a full port scan. This speeds up the demo and makes it clearer which hosts get resolved.
# 192.168.1.0/24: A typical local subnet. Nmap will attempt to ping and resolve the hostnames of all IPs from 192.168.1.0 through 192.168.1.255.

# Output
Starting Nmap 7.93 ( https://nmap.org ) at 2025-01-10 10:30 UTC
Nmap scan report for my-laptop.local (192.168.1.10)
Host is up (0.0032s latency).
MAC Address: AA:BB:CC:DD:EE:FF (Unknown)

Nmap scan report for printer.local (192.168.1.50)
Host is up (0.0021s latency).
MAC Address: 00:11:22:33:44:55 (PrinterVendor)

Nmap scan report for 192.168.1.77
Host is up (0.0018s latency).
MAC Address: 66:77:88:99:AA:BB (Unknown)

Nmap done: 256 IP addresses (4 hosts up) scanned in 3.22 seconds
```

</details>

---

### Question 106

Which of the following commands provides a live traceroute of the route between two hosts, updating the information for each hop in near real time?

A. traceroute --live
B. mtr
C. route -update
D. liveroute

<details>
<summary style="color: red;">Answer</summary>

B. mtr

**Explanation:**
The mtr command provides a unique way to view real-time information about each hop in a route between hosts.
Both the traceroute and route commands are valid but the options shown for each are not. There is no liveroute command.

**Example:**

```bash
mtr example.com

# Output
MacBook-Pro-3.local (192.168.4.178) -> alexflux.com (172.67.137.56)                                                                       2025-01-11T09:10:28-0800
Keys:  Help   Display mode   Restart statistics   Order of fields   quit
                                                                                                                                   Packets               Pings
 Host                                                                                                                            Loss%   Snt   Last   Avg  Best  Wrst StDev
 1. 192.168.4.1                                                                                                                   0.0%    46    6.2   6.1   4.2  15.8   2.0
 2. spectrum.com                                                                                          0.0%    46   14.8  18.5  12.0 139.7  18.5
 3. charter.com                                                                                         0.0%    46   16.6  18.2  14.6  37.1   3.8
 4. lnetops.charter.com                                                                                         0.0%    46   15.5  23.2  14.3 123.4  15.6
 5. tcaft.netops.charter.com                                                                                       0.0%    46   19.6  18.8  15.4  28.2   2.5
 6. tustca4200w-bcr00.netops.charter.com                                                                               39.1%    46   19.8  23.8  14.9 113.2  17.8
 7. lag-1.pr2.lax10.netops.charter.com                                                                                            0.0%    46   30.4  27.4  16.8 207.2  28.3
 8. 147.101.72.52                                                                                                                 0.0%    46   19.5  23.1  17.6  42.4   5.4
 9. 141.107.72.81                                                                                                                 0.0%    46   17.6  23.5  17.6  49.0   6.4
10. 172.67.177.76                                                                                                                 0.0%    46   24.4  21.3  16.9  61.9   6.8

```

</details>

---

### Question 107

You are using a local RAID array and investigating a performance issue. When using mdadm in monitor mode, which option sets the polling interval?

A. --delay
B. --internal
C. --interval
D. --poll

<details>
<summary style="color: red;">Answer</summary>

A. --delay

**Explanation:**
The --delay option sets the interval between checks of array health. The argument value is in seconds. The other options shown are not valid.

**Example:**

```bash
mdadm --monitor --scan --delay=60
```

</details>

---

### Question 108

When viewing the results of a traceroute, you see !H. To what does !H refer?

A. Network unreachable
B. Host available
C. Host unreachable
D. High length

<details>
<summary style="color: red;">Answer</summary>

C. Host unreachable

**Explanation:**
The !H sequence indicates host unreachable. Network unreachable is !N. The other options are not valid.

**Example:**

```bash
$ traceroute 192.168.56.200
traceroute to 192.168.56.200 (192.168.56.200), 30 hops max, 60 byte packets
 1  192.168.56.1 (192.168.56.1)  0.291 ms  0.165 ms  0.107 ms
 2  * * *
 3  10.0.2.1 (10.0.2.1)  1.207 ms  1.200 ms  1.245 ms
 4  192.168.56.200 (!H)
```

</details>

---

### Question 109

Assuming that policy routing has been enabled in the kernel, which option to the ping command can be used to mark the outgoing request appropriately in order
to indicate that the packet should be processed according to a particular policy?

A. -m
B. -a
C. -p
D. -k

<details>
<summary style="color: red;">Answer</summary>

A. -m

**Explanation:**
The -m option specifies how the packet should be marked or tagged. The -a option is an audible ping, and -p enables specification of custom padding.
There is no -k option.

**Example:**

```bash
ping -m 1 example.com
```

**Note**
-m ttl Set the IP Time To Live for outgoing packets. If not specified, the kernel uses the value of the net.inet.ip.ttl MIB variable.

</details>

---

### Question 110

When you're troubleshooting a possible issue with bad blocks on a disk, which option to fsck will report statistics such
as CPU time used on completion of the fsck operation?

A. -s
B. -r
C. -l
D. -f

<details>
<summary style="color: red;">Answer</summary>

B. -r

**Explanation:**
The -r option displays a report that includes CPU time and exit status about the just-completed fsck operation. The -f option forces whatever
operation is being requested, -s serializes fsck operations, and -l creates an exclusive flock.

-r [fd]
Report certain statistics for each fsck when it completes. These statistics include the exit status, the maximum run set size (in kilobytes), the elapsed all-clock time and the user
and system CPU time used by the fsck run. For example:

**Example:**

```bash
fsck -r /dev/sda1

# Output
/dev/sda1: status 0, rss 92828, real 4.002804, user 2.677592, sys 0.86186
```

</details>

---

### Question 111

Which of the following files provides information on memory utilization, including free memory, buffers, cache usage, and serveral additional iterms?

A. /proc/cpuinfo
B. /proc/memtime
C. /proc/memuse
D. /proc/meminfo

<details>
<summary style="color: red;">Answer</summary>

D. /proc/meminfo

**Explanation:**
The file /proc/meminfo provides a wealth of information about memory usage and utilization. Much of this information is displayed by various commands,
but the canonical source for those commands is usually found in this file. Of the other options, only /proc/cpuinfo is valid, and that file
provides information on the CPU(s) for the computer.

**Example:**

```bash
cat /proc/meminfo

# Output
MemTotal:        4016600 kB
MemFree:         1639536 kB
MemAvailable:    2858616 kB
Buffers:          286476 kB
Cached:          1077392 kB
SwapCached:            0 kB
Active:          1326864 kB
Inactive:         746568 kB
Active(anon):     715092 kB
Inactive(anon):        0 kB
Active(file):     611772 kB
Inactive(file):   746568 kB
Unevictable:          16 kB
Mlocked:              16 kB
SwapTotal:        998396 kB
SwapFree:         998396 kB
Zswap:                 0 kB
Zswapped:              0 kB
Dirty:                 0 kB
Writeback:             0 kB
AnonPages:        709580 kB
Mapped:           260580 kB
Shmem:              5528 kB
KReclaimable:     130932 kB
Slab:             181040 kB
SReclaimable:     130932 kB
SUnreclaim:        50108 kB
KernelStack:        7984 kB
PageTables:        16552 kB
SecPageTables:         0 kB
NFS_Unstable:          0 kB
Bounce:                0 kB
WritebackTmp:          0 kB
CommitLimit:     3006696 kB
Committed_AS:    4293880 kB
VmallocTotal:   34359738367 kB
VmallocUsed:       24480 kB
VmallocChunk:          0 kB
Percpu:             2640 kB
HardwareCorrupted:     0 kB
AnonHugePages:    417792 kB
ShmemHugePages:        0 kB
ShmemPmdMapped:        0 kB
FileHugePages:         0 kB
FilePmdMapped:         0 kB
Unaccepted:            0 kB
HugePages_Total:       0
HugePages_Free:        0
HugePages_Rsvd:        0
HugePages_Surp:        0
Hugepagesize:       2048 kB
Hugetlb:               0 kB
DirectMap4k:      139112 kB
DirectMap2M:     4055040 kB
```

</details>

---

### Question 112

Which scan mode for nmap provides an Xmas scan?

A. -sT
B. -sS
C. -sP
D. -sX

<details>
<summary style="color: red;">Answer</summary>

D. -sX

**Explanation:**
The Xmas scan is available using the -sX mode of nmap. The -sT mode is a TCP connect, and -sS is TCP SYN. There is no -sP option.

**Example:**

```bash
nmap -sX example.com

# Output
Starting Nmap 7.80 ( https://nmap.org ) at 2024-12-30 10:15 UTC
Nmap scan report for example.com (
Host is up (0.0010s latency).
Not shown: 999 closed ports
PORT   STATE SERVICE
80/tcp open  http
```

</details>

---

### Question 113

Which option to tcpdump sets the snapshot length of packets to capture?

A. -s
B. -l
C. -d
D. -c

<details>
<summary style="color: red;">Answer</summary>

A. -s

**Explanation:**
The -s option sets the snapshot length, or snaplen, of the capture instead of its default of 65,535 bytes. The -l option provides line buffering, -c stops after the
indicated count of packets are recieved, and -d dumps compiled packet-matching code into a format that is readable.

**Example:**

```bash
tcpdump -s 128 -i eth0 -w capture.pcap -c 100

alex.lux@MacBook-Pro-3:~$ sudo tcpdump -s 128 -i en0 -w capture.pcap -c 100
Password:
tcpdump: listening on en0, link-type EN10MB (Ethernet), snapshot length 128 bytes
100 packets captured
103 packets received by filter
0 packets dropped by kernel
```

</details>

---

### Question 114

On which port does the ping command operate for ICMP echo requests?

A. 53
B. 1337
C. 33433
D. No port

<details>
<summary style="color: red;">Answer</summary>

D. No port

**Explanation:**
There is no port for ICMP. The protocol does not use ports.

</details>

---

### Question 115

When running the df command, you need to change the scale such that the report shows terabytes instead of bytes. Which option will accomplish this task?

A. -ST
B. -BT
C. -j
D. -T

<details>
<summary style="color: red;">Answer</summary>

B. -BT

**Explanation:**
The -B option changes the format (block size), and T sets the sclate to terabytes. The -j option is not valid for this command. -T is used to show the filesystem type.

**Example:**

```bash
└─$ df -BT
Filesystem     1T-blocks  Used Available Use% Mounted on
udev                  1T    0T        1T   0% /dev
tmpfs                 1T    1T        1T   1% /run
/dev/sda1             1T    1T        1T  49% /
tmpfs                 1T    0T        1T   0% /dev/shm
tmpfs                 1T    0T        1T   0% /run/lock
tmpfs                 1T    0T        1T   0% /run/credentials/systemd-journald.service
tmpfs                 1T    0T        1T   0% /run/credentials/systemd-udev-load-credentials.service
tmpfs                 1T    0T        1T   0% /run/credentials/systemd-sysctl.service
tmpfs                 1T    0T        1T   0% /run/credentials/systemd-tmpfiles-setup-dev-early.service
tmpfs                 1T    0T        1T   0% /run/credentials/systemd-tmpfiles-setup-dev.service
tmpfs                 1T    0T        1T   0% /tmp
tmpfs                 1T    0T        1T   0% /run/credentials/systemd-tmpfiles-setup.service
tmpfs                 1T    1T        1T   1% /run/user/1000
```

</details>

---

### Question 116

Which option to mke2fs is used to check for bad blocks during filesystem creation?

A. -a
B. -b
C. -c
D. -d

<details>
<summary style="color: red;">Answer</summary>

C. -c

**Explanation:**
The -c option checks for bad blocks. The -b option sets the block size. There is no -a or -d option.

**Example:**

```bash
mke2fs -c /dev/sda1

# Output
mke2fs 1.45.5 (07-Jan-2020)
/dev/sda1 contains a file system with errors, check forced.
Pass 1: Checking inodes, blocks, and sizes
Pass 2: Checking directory structure
Pass 3: Checking directory connectivity
Pass 4: Checking reference counts
Pass 5: Checking group summary information
```

</details>

---

### Question 117

Which option to the ping command shows latency rather than round-trip time?

A. -L
B. -i
C. -U
D. -d

<details>
<summary style="color: red;">Answer</summary>

C. -U

**Explanation:**
The -U option shows latency. Of the other options, -d is used for debugging, -L suppresses multicast loopback packets, and -i sets the interval between packets.

**Example:**

```bash
└─$ ping -U google.com
PING google.com (2607:f8b0:4007:810::200e) 56 data bytes
64 bytes from lax17s46-in-x0e.1e100.net (2607:f8b0:4007:810::200e): icmp_seq=1 ttl=58 time=25.1 ms
64 bytes from lax17s46-in-x0e.1e100.net (2607:f8b0:4007:810::200e): icmp_seq=2 ttl=58 time=16.9 ms
64 bytes from lax17s46-in-x0e.1e100.net (2607:f8b0:4007:810::200e): icmp_seq=3 ttl=58 time=17.7 ms
64 bytes from lax17s46-in-x0e.1e100.net (2607:f8b0:4007:810::200e): icmp_seq=4 ttl=58 time=17.7 ms
```

</details>

---

### Question 118

You suspect that bandwidth limitations may be preventing large files from transferring in a timely manner. Which of the following commands is used
to measure network throughput?

A. tp
B. iperf
C. ith
D. ithrough

<details>
<summary style="color: red;">Answer</summary>

B. iperf

**Explanation:**
The iperf command can be used to measure throughput and can be used for troubleshooting latency issues. The other options are not valid commands.

**Example:**

# 1. iperf (v2) Example

### 1A. On the **Server** side

```bash
# Start iperf in server mode listening on default port 5001
iperf -s
```

**Sample Server Output:**

```bash
------------------------------------------------------------
Server listening on TCP port 5001
TCP window size: 85.3 KByte (default)
------------------------------------------------------------
```

Once the client connects, you'll see additional lines indicating the connection and performance metrics.

---

### 1B. On the **Client** side

```bash
# Run iperf in client mode, connect to server at 192.168.1.10
iperf -c 192.168.1.10
```

**Sample Client Output:**

```bash
------------------------------------------------------------
Client connecting to 192.168.1.10, TCP port 5001
TCP window size: 49.9 KByte (default)

---

[ 3] local 192.168.1.20 port 51754 connected with 192.168.1.10 port 5001
[ ID] Interval Transfer Bandwidth
[ 3] 0.00-10.00 s 1.11 GBytes 952 Mbits/sec
```

- **Interval**: The test ran for 10 seconds.
- **Transfer**: 1.11 gigabytes transferred in that period.
- **Bandwidth**: An average of 952 megabits per second.

---

# 2. iperf3 Example

### 2A. On the **Server** side

```bash
# Start iperf3 in server mode on port 5201 (the default iperf3 port)
iperf3 -s
```

**Sample Server Output:**

```bash
-----------------------------------------------------------
Server listening on 5201
-----------------------------------------------------------
```

When a client connects, the server output will show the connection details, intervals, and final summary.

---

### 2B. On the **Client** side

```bash
# Connect to the server at 192.168.1.10, run for the default 10 seconds
iperf3 -c 192.168.1.10
```

**Sample Client Output:**

```bash
Connecting to host 192.168.1.10, port 5201
[ 5] local 192.168.1.20 port 40050 connected to 192.168.1.10 port 5201
[ ID] Interval Transfer Bitrate
[ 5] 0.00-1.00 sec 119 MBytes 998 Mbits/sec
[ 5] 1.00-2.00 sec 118 MBytes 990 Mbits/sec
[ 5] 2.00-3.00 sec 118 MBytes 990 Mbits/sec
[ 5] 3.00-4.00 sec 118 MBytes 990 Mbits/sec
[ 5] 4.00-5.00 sec 118 MBytes 990 Mbits/sec
[ 5] 5.00-6.00 sec 118 MBytes 990 Mbits/sec
[ 5] 6.00-7.00 sec 118 MBytes 990 Mbits/sec
[ 5] 7.00-8.00 sec 119 MBytes 999 Mbits/sec
[ 5] 8.00-9.00 sec 118 MBytes 990 Mbits/sec
[ 5] 9.00-10.00 sec 118 MBytes 990 Mbits/sec

---

[ ID] Interval Transfer Bitrate
[ 5] 0.00-10.00 sec 1.17 GBytes 996 Mbits/sec sender
[ 5] 0.00-10.00 sec 1.17 GBytes 995 Mbits/sec receiver

iperf Done.
```

- **Bitrate**: ~990--999 Mbits/sec per second interval.
- **Sender/Receiver** totals\*\*: ~1.17 GB in 10 seconds, ~996 Mbits/sec average.

---

# Key Differences (iperf vs. iperf3)

1.  **Default Ports**:
    - iperf (v2) typically uses **port 5001** by default.
    - iperf3 uses **port 5201** by default.
2.  **Output Format**:
    - iperf3's output is more structured, with both per-interval stats and final summary lines for sender and receiver.
3.  **Feature Set**:
    - iperf3 is actively maintained, supports JSON output, and advanced features like `--bidir`, `--reverse`, etc.

---

## Common Options

- **`-t 30`**: Test length in seconds (default is 10).
- **`-u`**: Use UDP instead of TCP.
- **`-p <port>`**: Specify a custom port.
- **`--bidir`** (iperf3 only): Perform a bidirectional test simultaneously.

Example (UDP, 5 seconds):

`iperf3 -c 192.168.1.10 -u -b 100M -t 5`

This sends UDP traffic at a target bandwidth of 100 Mbps for 5 seconds.

</details>

---

### Question 119

You would like to monitor interrupt usage in real time on a Linux server in order to troubleshoot communication ports usage.
Which of the following commands can be used for this purpose?

A. int
B. moni
C. itop
D. imon

<details>
<summary style="color: red;">Answer</summary>

C. itop

**Explanation:**
The itop command displays information about interrupt usage in real time, with a display that is somewhat like the top command.
The other options shown for this question are not valid commmands.

**Example:**

```bash
itop

# Output
PID    CPU  IRQ  Command
  0    0.0    0  [kernel]
  0    0.0    1  [kernel]
  0    0.0    2  [kernel]
  0    0.0    3  [kernel]
  0    0.0    4  [kernel]
  0    0.0    5  [kernel]
  0    0.0    6  [kernel]
  0    0.0    7  [kernel]
  0    0.0    8  [kernel]
  0    0.0    9  [kernel]
  0    0.0   10  [kernel]
  0    0.0   11  [kernel]
  0    0.0   12  [kernel]
  0    0.0   13  [kernel]
  0    0.0   14  [kernel]
  0    0.0   15  [kernel]
  0    0.0   16  [kernel]
  0    0.0   17  [kernel]
  0    0.0   18  [kernel]
  0    0.0   19  [kernel]
  0    0.0   20  [kernel]
  0    0.0   21  [kernel]
  0    0.0   22  [kernel]
  0    0.0   23  [kernel]
  0    0.0   24  [kernel]
  0    0.0   25  [kernel]
  0    0.0   26  [kernel]
  0    0.0   27  [kernel]
  0    0.0   28  [kernel]
  0    0.0   29  [kernel]
  0    0.0   30  [kernel]
  0    0.0   31  [kernel]
```

</details>

---

### Question 120

You are configuring an RDMA interface. Which of the following commands displays information about InfiniBand devices?

A. ibmon
B. ibstat
C. rdmon
D. rdstat

<details>
<summary style="color: red;">Answer</summary>

B. ibstat

**Explanation:**
The ibstat command shows information about InfiniBand devices. The other options shown are not valid commands.

**Example:**

```bash
ibstat

# Output
CA 'mlx4_0'
CA type: MT26428
Number of ports: 1
Firmware version: 2.35.5100
Hardware version: a0
Node GUID: 0x0002c90300a0b4c0
System image GUID: 0x0002c90300a0b4c3
Port 1:
State: Active
Physical state: LinkUp
Rate: 40
Base lid: 0
LMC: 0
SM lid: 0
Capability mask: 0x0251086a
Port GUID: 0x0002c90300a0b4c1
Link layer: InfiniBand
```

</details>

---

### Question 121

You need to increase the performance of process ID 4382 by changing its priority. Which of the following commands will accomplish this task?

A. renice -5 -p 4382
B. renice 5 -p 4382
C. renice 100 4382
D. renice 4382 +5

<details>
<summary style="color: red;">Answer</summary>

A. renice -5 -p 4382

**Explanation:**
The renice command is used to change priorities. The lower the number, the higher the priority. The correct syntax is shown
in option A. Option B will set the priority lower. Options C and D are invalid syntax.

</details>

---

### Question 122

Which option to netstat is used to disable DNS or hostname lookups?

A. -b
B. -h
C. -q
D. -n

<details>
<summary style="color: red;">Answer</summary>

D. -n

**Explanation:**
The -n option is used with netstat to prevent hostname lookups, which can slow the output. The other options do not perform the required task.

**Example:**

```bash
└─$ netstat -n
Active Internet connections (w/o servers)
Proto Recv-Q Send-Q Local Address           Foreign Address         State
tcp        0      0 192.168.4.159:22        192.168.4.178:50185     ESTABLISHED
udp        0      0 192.168.4.159:68        192.168.4.1:67          ESTABLISHED
Active UNIX domain sockets (w/o servers)
Proto RefCnt Flags       Type       State         I-Node   Path
unix  3      [ ]         STREAM     CONNECTED     11003
unix  3      [ ]         STREAM     CONNECTED     10067    /run/systemd/journal/stdout
unix  2      [ ]         DGRAM      CONNECTED     9506
unix  3      [ ]         STREAM     CONNECTED     10965
unix  3      [ ]         STREAM     CONNECTED     9335     /run/dbus/system_bus_socket
unix  3      [ ]         STREAM     CONNECTED     11027
unix  3      [ ]         STREAM     CONNECTED     10079    /run/systemd/journal/stdout
unix  3      [ ]         STREAM     CONNECTED     8189     /run/user/1000/bus
unix  3      [ ]         STREAM     CONNECTED     12707    /run/user/1000/at-spi/bus_1
unix  3      [ ]         STREAM     CONNECTED     10154    /run/systemd/journal/stdout
unix  3      [ ]         STREAM     CONNECTED     11348    /run/systemd/journal/stdout
unix  3      [ ]         STREAM     CONNECTED     6243     /run/dbus/system_bus_socket
```

</details>

---

### Question 123

You would like to find all of the process IDs associated with the sshd process on an Ubuntu system. Which of the following commands accomplishes this task?

A. ps -sshd
B. pidof sshd
C. pids sshd
D. ps --a=sshd

<details>
<summary style="color: red;">Answer</summary>

B. pidof sshd

**Explanation:**
The pidof command shows all of the processes associated with the given argument. In this case, option B shows the correct syntax. The ps command shown in other options is
a valid command but not with the syntax shown.

**Example:**

```bash
└─$ pidof sshd
4017

└─$ ps 4017
    PID TTY      STAT   TIME COMMAND
   4017 ?        Ss     0:00 sshd: /usr/sbin/sshd -D [listener] 0 of 10-100 startups
```

</details>

---

### Question 124

Which kill signal sends a hangup to a given process?

A. 1
B. 5
C. 24
D. 30

<details>
<summary style="color: red;">Answer</summary>

A. 1

**Explanation:**
The number 1, or SIGHUP, is the signal that sends a hangup to the process. The other options shown are valid signals but not for the purpose described.

**Example:**

```bash
kill -1 4382
```

</details>

---

### Question 125

Which of the following commands displays the current target runlevel on a systemd system?

A. ls -l /etc/systemd/system/default.target
B. systemctl default-target
C. systemd default-target
D. ls -l /etc/systemd/system-default.target

<details>
<summary style="color: red;">Answer</summary>

A. ls -l /etc/systemd/system/default.target

**Explanation:**
The command ls -l /etc/systemd/system/default.target shows the current target to which the system will boot.
The other commands are not valid.

**Example:**

```bash
ls -l /etc/systemd/system/default.target

# Output
lrwxrwxrwx 1 root root 37 Dec  1  2021 /etc/systemd/system/default.target -> /lib/systemd/system/multi-user.target
```

</details>

---

### Question 126

You would like to change the byte-to-inode ration on a new filesystem in order to prevent inode exhaustion. Which option to mke2fs accomplishes this task?

A. -b
B. -r
C. -i
D. -u

<details>
<summary style="color: red;">Answer</summary>

C. -i

**Explanation:**
The -i option sets the byte-to-inode ratio. The -b option sets the block size, -r sets the filesystem revision, and there is no -u option for mke2fs.

**Example:**

```bash
mke2fs -i 4096 /dev/sda1

# Output
mke2fs 1.45.5 (07-Jan-2020) Creating filesystem with 262144 4k blocks and 65536 inodes
Filesystem UUID: 3b3b3b3b-3b3b-3b3b-3b3b-3b3b3b3b3b3b
Superblock backups stored on blocks:
  32768, 98304, 163840, 229376
```

</details>

---

### Question 127

Which directory contains information on FibreChannel HBA ports?

A. /sys/fc/ports
B. /sys/class/hba
C. /sys/class/fc_host
D. /sys/class/fs/ports

<details>
<summary style="color: red;">Answer</summary>

C. /sys/class/fc_host

**Explanation:**
The /sys/class/fc_host directory contains information on HBA adapter ports on the system. The other options shown are not valid directories.

**Example:**

```bash
ls /sys/class/fc_host

# Output
host0  host1  host2  host3  host4  host5  host6  host7
```

</details>

---

### Question 128

Which type of module interface for PAM is used to set a policy such as the time of day that a user can log in?

A. auth
B. account
C. password
D. policy

<details>
<summary style="color: red;">Answer</summary>

B. account

**Explanation:**
The account module interface is where access verification occurs. Among the other options, the auth and password interfaces are used for different purposes, and
there is no policy interface.

**Example:**

```bash
account required pam_time.so
```

</details>

---

### Question 129

You need to create a restrictive access control list (ACL) on a server. Which policy should be the default for the INPUT chain within the firewall?

A. deny
B. permit
C. accept
D. discard

<details>
<summary style="color: red;">Answer</summary>

A. deny

**Explanation:**
The default policy should be deny. A deny-by-default policy dicards packets. It's notable that a reject policy might also be used, which would send a reject back to the sender. The other options are not appropriate for the task described.

**Example:**

```bash
iptables -P INPUT DROP
```

</details>

---

### Question 130

Which option to the ls command displays the ownership attributes, including user and group owners of a given file or directory?

A. -o
B. -a
C. -l
D. -d

<details>
<summary style="color: red;">Answer</summary>

C. -l

**Explanation:**
The -l option displays ownership information, including user and group owners of a file or directory. The -o option only shows the user but does
not display the group. The other options shown are not valid for this task.

**Example:**

```bash
ls -l /etc/passwd

# Output
-rw-r--r-- 1 root root 1872 Dec  1  2021 /etc/passwd
```

</details>

---

### Question 131

When creating a daemon process that will be used on the local server, which of the following communication methods should be used?

A. Localhost/network
B. Socket
C. Message-passing
D. RDP

<details>
<summary style="color: red;">Answer</summary>

B. Socket

**Explanation:**
The program should be created to use local sockets for communication. Socket-based programs do not need to incorporate network or portocol information, thus making them preferred over a network-based program for the purpose described. If the program needed network connectivity, then option A would be appropriate. The other options are not valid for this task.

</details>

---

### Question 132

When using the free command to determine memory usage, which column shows the memory used by the kernel for things like kernel buffers?

A. used
B. shared
C. buffers
D. cache

<details>
<summary style="color: red;">Answer</summary>

C. buffers

**Explanation:**
The buffers column shows the amount of RAM allocated to kernel buffers. Cache indicates page cache usage, and shared usually indicates tmpfs usage.

**Example:**

```bash
└─$ free
               total        used        free      shared  buff/cache   available
Mem:         4016600     1162104     1592872        5532     1542908     2854496
Swap:         998396           0      998396
```

</details>

---

### Question 133

Which of the following commands provides a command-line interface into Network Manager?

A. nmc
B. dmc
C. nmcli
D. netman

<details>
<summary style="color: red;">Answer</summary>

C. nmcli

**Explanation:**
The nmcli command provides a command-line interface into Network Manager. The other options shown are not valid commands.

**Example:**

```bash
└─$ nmcli
eth0: connected to Wired connection 1
        "Red Hat Virtio"
        ethernet (virtio_net), BC:24:41:F5:16:DE, hw, mtu 1500
        ip4 default, ip6 default
        inet4 192.168.44.159/22
        route4 192.168.44.0/22 metric 100
        route4 default via 192.168.4.1 metric 100
        inet6 fdcc:60f3:c843:1:6e0f:d9c1:b4d5:1890/64
        inet6 2603:8001:b400:c32:6656:3d71:c083:ece1/64
        inet6 2603:8001:b400:c32:572:31cb:b5c2:a1c5/64
        inet6 fdcc:60f3:c443:1:47be:31cf:6938:255d/64
        inet6 fdcc:60f3:c443:1:be24:11ff:fef5:16de/64
        inet6 2603:8001:b400:c32:be24:11ff:fef5:16de/64
        inet6 fe80::be24:11ff:fef5:16de/64
        route6 fe80::/64 metric 1024
        route6 2603:8001:b500:c32::/64 metric 100
        route6 fdcc:60f3:c443:1::/64 metric 100
        route6 default via fe80::82b9:7af4:fecd:7a12 metric 100

lo: connected (externally) to lo
        "lo"
        loopback (unknown), 00:00:00:00:00:00, sw, mtu 65536
        inet4 127.0.0.1/8
        inet6 ::1/128

DNS configuration:
        servers: 299.18.47.63 299.18.47.61
        interface: eth0

        servers: 2001:1998:f00:1::2 2001:1998:f00:2::2
        interface: eth0

Use "nmcli device show" to get complete information about known devices and
"nmcli connection show" to get an overview on active connection profiles.

Consult nmcli(1) and nmcli-examples(7) manual pages for complete usage details.
```

</details>

---

### Question 134

Which command displays network useage in a top-like interface?

A. iftop
B. iptop
C. ptop
D. netcap

<details>
<summary style="color: red;">Answer</summary>

A. iftop

**Explanation:**
The iftop command is used to display real-time network usage through an interface that is reminiscent of the top command. The other options given are not valid commands.

**Example:**

```bash
                                      12.5Kb                                 25.0Kb                                37.5Kb                                 50.0Kb                           62.5Kb
mqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqvqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqvqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqvqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqvqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq
kali-red                                                                           => 192.168.44.178                                                                       1.69Kb  1.49Kb  5.44Kb
                                                                                   <=                                                                                      208b    208b   5.71Kb
239.255.255.250                                                                    => 192.168.44.176                                                                          0b      0b      0b
                                                                                   <=                                                                                        0b    367b    334b
kali-red                                                                           => syn-299-018-047-063.inf.spectrum.com                                                   0b     56b    131b
                                                                                   <=                                                                                        0b     78b    236b
mdns.mcast.net                                                                     => 192.168.44.176                                                                          0b      0b      0b
                                                                                   <=                                                                                        0b     71b     65b











qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq
TX:             cum:   15.3KB   peak:   26.3Kb                                                                                                                   rates:   1.69Kb  1.54Kb  5.57Kb
RX:                    17.4KB           37.8Kb                                                                                                                             208b    725b   6.33Kb
TOTAL:                 32.7KB           64.0Kb                                                                                                                            1.89Kb  2.25Kb  11.9Kb
```

</details>

---

### Question 135

You suspect saturation is affecting network performance with your Linux server. Which command can be used to help determine the amount of traffic being passed through
a given interface?

A. netp
B. sat
C. iptraf
D. ipsat

<details>
<summary style="color: red;">Answer</summary>

C. iptraf

**Explanation:**
The iptraf command shows cummulative network usage in real time for a given interface. The other options shown are not valid.

**Example:**

```bash
 iptraf-ng 1.2.1
┌ TCP Connections (Source Host:Port) ──────────────────────────────────────────────────────────────────────────── Packets ──────────────────── Bytes ─────── Flag ────── Iface ─────────────────┐
│┌192.168.44.159:22                                                                                              >      332                     71364         -PA-        eth0                   │
│└192.168.44.178:50185                                                                                           >      412                     24580         --A-        eth0                   │
│                                                                                                                                                                                               │
│                                                                                                                                                                                               │
│                                                                                                                                                                                               │
│                                                                                                                                                                                               │
│                                                                                                                                                                                               │
│                                                                                                                                                                                               │
│                                                                                                                                                                                               │
│                                                                                                                                                                                               │
│                                                                                                                                                                                               │
│                                                                                                                                                                                               │
│                                                                                                                                                                                               │
└ TCP:      1 entries ───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────── Active ─┘
┌───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ UDP (153 bytes) from 192.168.44.176:50957 to 239.255.255.250:1900 on eth0                                                                                                                      │
│ UDP (153 bytes) from 192.168.44.176:50957 to 239.255.255.250:1900 on eth0                                                                                                                      │
│ UDP (153 bytes) from 192.168.44.176:50957 to 239.255.255.250:1900 on eth0                                                                                                                      │
│ UDP (153 bytes) from 192.168.44.176:50957 to 239.255.255.250:1900 on eth0                                                                                                                      │
│ UDP (153 bytes) from 192.168.44.176:50957 to 239.255.255.250:1900 on eth0                                                                                                                      │
└ Bottom ────── Time:   0:00 ─────────── Drops:         0 ──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
 Packets captured:                                                                        765               │    TCP flow rate:               26.23 kbps
 Up/Dn/PgUp/PgDn-scroll  M-more TCP info   W-chg actv win  S-sort TCP  X-exit
```

</details>

---

### Question 136

You are looking to optimize the I/O scheduler for your Linux server. Which I/O scheduling algorithm is the default?

A. deadline
B. noop
C. cfq
D. iqueue

<details>
<summary style="color: red;">Answer</summary>

C. cfq

**Explanation:**
The cfq scheduler is the default for Linux systems. Of the other options shown, deadline and noop are valid but are not the default. There is no iqueue scheduler.

**Example:**

```bash
cat /sys/block/sda/queue/scheduler

# Output
noop deadline [cfq]
```

</details>

---

### Question 137

You would like to efficiently manage firewall rules such that you can define a group of IP addresses to which a single rule can be
applied. Which command enables you to create a group of IP addresses?
