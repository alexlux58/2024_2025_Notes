# Linux+ Notes

---

## Users and Groups

### Superuser

- **Root User**: The superuser account with unrestricted access.

#### Sudoers Management

- **sudoers file**: List users in the `/etc/sudoers` file using the `visudo` editor to delegate user accounts.
- **Commands**:
  - `sudoedit`: Edit a file with the user's credentials.
  - `visudo`: Verify `/etc/sudoers` syntax before committing changes.
    - `-c`: Check for file errors.
    - `-f`: Edit/check location.
    - `-s`: Check file in strict mode.

### User and Group Management

- **Wheel Group**: Members have elevated privileges with reduced risk to system integrity.
- **Polkit (PolicyKit)**: A framework for managing authorizations and privileges.
  - **Commands**:
    - `pkexec`: Execute a command as another user (e.g., `pkexec mkdir /alux`).
    - `pkaction`: List available actions.
    - `pkcheck`: Verify if a user is authorized for an action.

### User Accounts

- **Storage**: User accounts are stored in the `/etc/passwd` file and configured per `/etc/login.defs`.
- **Home Directory**: Created in `/home/<account_name>` and populated from `/etc/skel`.
- **User Creation**: The `useradd` command does not automatically set a password.

#### Useradd Options

- `-c`: Comment
- `-d`: Home directory path/name
- `-e`: Expiration date (YYYY-MM-DD)
- `-f`: Inactive days (0 to disable account)
- `-g`: Primary group (name or GID)
- `-G`: Secondary group (name or GID)
- `-m`: Create home directory if it does not exist (default)
- `-M`: Do not create home directory
- `-n`: Do not create a group with the same name as the user
- `-r`: System account
- `-s`: Shell
- `-u`: User ID (UID)
- `-D`: Display default settings

### User Management Commands

- `useradd`: Create a new user.
- `useradd -m <username>`: Create a new user with a home directory.
- `usermod`: Modify an existing user.
  - `usermod -aG <group> <username>`: Add a user to a group.
- `userdel`: Delete a user.
  - `userdel -r <username>`: Delete a user and their home directory.
- `passwd`: Change a user's password.
  - `passwd <username>`: Change a specific user's password.
  - `passwd -e <username>`: Expire a user's password.
  - `passwd -l <username>`: Lock a user's password.
  - `passwd -u <username>`: Unlock a user's password.
- `chfn`: Change a user's full name.
  - `chfn -f <full_name> <username>`: Change a specific user's full name.
  - `chfn -r <room_number> <username>`: Change a specific user's room number.
  - `chfn -w <work_phone> <username>`: Change a specific user's work phone number.
  - `chfn -h <home_phone> <username>`: Change a specific user's home phone number.
  - `chfn -o <other_info> <username>`: Change a specific user's other information.
  - `chfn -L <username>`: Lock a user's full name.
- `chsh`: Change a user's shell.
- `chage`: Change a user's password expiration date.
  - `chage -l <username>`: View a user's password expiration date.

### Group Management Commands

- `groupadd`: Create a new group.
  - `groupadd -g <GID> <groupname>`: Create a new group with a specific GID.
  - `groupadd -r <groupname>`: Create a new system group.
  - `groupadd -o <groupname>`: Create a new group with a non-unique GID.
  - `groupadd -p <password> <groupname>`: Create a new group with a password.
  - `groupadd -K <key=value> <groupname>`: Create a new group with a key-value pair.
  - `groupadd -U <username> <groupname>`: Create a new group with a user.
  - `groupadd -A <username> <groupname>`: Create a new group with an administrator.
  - `groupadd -M <username> <groupname>`: Create a new group with a member.
  - `groupadd -S <username> <groupname>`: Create a new group with a service.
  - `groupadd -T <username> <groupname>`: Create a new group with a template.
  - `groupadd -Z <username> <groupname>`: Create a new group with a SELinux user.
- `groupmod`: Modify an existing group.
  - `groupmod -g <GID> <groupname>`: Change a group's GID.
  - `groupmod -n <newname> <groupname>`: Change a group's name.
  - `groupmod -o <groupname>`: Change a group's GID to a non-unique value.
  - `groupmod -p <password> <groupname>`: Change a group's password.
  - `groupmod -K <key=value> <groupname>`: Change a group's key-value pair.
  - `groupmod -U <username> <groupname>`: Change a group's user.
  - `groupmod -A <username> <groupname>`: Change a group's administrator.
  - `groupmod -M <username> <groupname>`: Change a group's member.
  - `groupmod -S <username> <groupname>`: Change a group's service.
  - `groupmod -T <username> <groupname>`: Change a group's template.
  - `groupmod -Z <username> <groupname>`: Change a group's SELinux user.
- `groupdel`: Delete a group.
  - `groupdel -r <groupname>`: Delete a group and its members.
  - `groupdel -f <groupname>`: Delete a group and its members without confirmation.
  - `groupdel -o <groupname>`: Delete a group with a non-unique GID.
  - `groupdel -p <password> <groupname>`: Delete a group with a password.
  - `groupdel -K <key=value> <groupname>`: Delete a group with a key-value pair.
  - `groupdel -U <username> <groupname>`: Delete a group with a user.
  - `groupdel -A <username> <groupname>`: Delete a group with an administrator.

### Viewing Users and Groups

- `cat /etc/passwd`: View all user accounts.
  - `cat /etc/passwd | grep <username>`: View a specific user account.
  - `cat /etc/shadow`: View user account passwords.
  - `cat /etc/shadow | grep <username>`: View a specific user's password.
  - `cat /etc/shadow | grep <username> | cut -d: -f2`: View a specific user's password hash.
  - `cat /etc/shadow | grep <username> | cut -d: -f3`: View a specific user's last password change date.
  - `cat /etc/shadow | grep <username> | cut -d: -f4`: View a specific user's minimum password age.
  - `cat /etc/shadow | grep <username> | cut -d: -f5`: View a specific user's maximum password age.
  - `cat /etc/shadow | grep <username> | cut -d: -f6`: View a specific user's password warning period.
  - `cat /etc/shadow | grep <username> | cut -d: -f7`: View a specific user's password inactivity period.
- `cat /etc/group`: View group accounts.
- `groups <username>`: View a user's groups.
- `id <username>`: View a user's UID and GID.
- `getent passwd`: View all user accounts.
- `getent group`: View all group accounts.
- `whoami`: View the current user.
- `who`: View all logged-in users.
  - `who -u`: View all logged-in users and their activities.
  - `who -b`: View the last system boot time.
  - `who -r`: View the current runlevel.
- `w`: View all logged-in users and their activities.
- `last`: View the last logged-in users.
  - `last -n <number>`: View the last `<number>` logged-in users.
  - `last -f <file>`: View the last logged-in users from a specific file.
  - `last -t <time>`: View the last logged-in users since a specific time.
  - `last -s <time>`: View the last logged-in users until a specific time.
  - `last -y`: View the last logged-in users from yesterday.
  - `last -b`: View the last logged-in users from the beginning of time.
  - `last -x`: View the last logged-in users from the end of time.
  - `last -R`: View the last logged-in users in reverse order.
  - `last -F`: View the last logged-in users in full format.
- `lastlog`: View the last login times of users.
- `finger`: View user information.

### /etc/login.defs: Default Settings for User Accounts

- **UID_MIN**: Minimum UID for a user.
- **UID_MAX**: Maximum UID for a user.
- **GID_MIN**: Minimum GID for a group.
- **GID_MAX**: Maximum GID for a group.
- **PASS_MAX_DAYS**: Maximum password age.
- **PASS_MIN_DAYS**: Minimum password age.
- **PASS_WARN_AGE**: Password warning period.
- **PASS_MIN_LEN**: Minimum password length.
- **PASS_MAX_LEN**: Maximum password length.
- **LOGIN_RETRIES**: Number of login retries.
- **LOGIN_TIMEOUT**: Login timeout period.
- **UMASK**: Default file creation mask.

### .bashrc: User-specific shell configuration file.

- **Location**: `/home/<username>/.bashrc`
- **Purpose**: Configure the user's shell environment.

### .bash_profile: User-specific shell configuration file.

- **Location**: `/home/<username>/.bash_profile`
- **Purpose**: Configure the user's shell environment.

### /etc/profile: System-wide shell configuration file.

- **Location**: `/etc/profile`
- **Purpose**: Configure the system-wide shell environment.
- **Variables**:
  - **PATH**: Search path for executable files.
  - **PS1**: Primary prompt string.
  - **PS2**: Secondary prompt string.
  - **PS3**: Select prompt string.
  - **PS4**: Execution prompt string.
  - **HISTSIZE**: Number of commands to store in history.
  - **HISTFILESIZE**: Number of lines to store in history file.
  - **HISTCONTROL**: History control options.
  - **HISTIGNORE**: History ignore patterns.
  - **HISTTIMEFORMAT**: History timestamp format.
  - **HOSTNAME**: System hostname.
  - **HOSTTYPE**: System host type.
  - **MACHTYPE**: System machine type.
  - **OSTYPE**: System operating system type.
  - **SHELL**: System shell.
  - **TERM**: Terminal type.
  - **USER**: Current user.
  - **LOGNAME**`: Current user.
  - **MAIL**: Current user's mail.
  - **HOME**: Current user's home directory.
  - **LANG**: System language.
  - **LC_ALL**: System locale.
  - **LC_COLLATE**: System collation.
  - **LC_CTYPE**: System character type.
  - **LC_MESSAGES**: System messages.
  - **LC_NUMERIC**: System numeric format.
  - **LC_TIME**: System time format.
  - **LC_MONETARY**: System monetary format.
  - **LC_PAPER**: System paper format.
  - **LC_NAME**: System name format.
  - **LC_ADDRESS**: System address format.
  - **LC_TELEPHONE**: System telephone format.
  - **LC_MEASUREMENT**: System measurement format.
  - **LC_IDENTIFICATION**: System identification format.

### /etc/skel: Default User Home Directory

- **Location**: `/etc/skel`
- **Purpose**: Populate new user home directories.
- **Files**:
  - **.bashrc**: User-specific shell configuration file.
  - **.bash_profile**: User-specific shell configuration file.
  - **.bash_logout**: User-specific shell configuration file.
  - **.profile**: User-specific shell configuration file.
  - **.bash_history**: User-specific shell history file.
  - **.bash_logout**: User-specific shell logout file.
  - **.bash_profile**: User-specific shell profile file.
  - **.bashrc**: User-specific shell resource file.

---

## File Permissions

### Permission Types

- **Read (r)**: 4
- **Write (w)**: 2
- **Execute (x)**: 1

### Permission Representation

- **Numeric**: 0-7
- **Symbolic**: r, w, x

### Managing File Permissions

- **Commands**:
  - `chmod`: Change file permissions.
  - `chmod -R <permissions> <file>`: Recursively change file permissions.
  - `chmod -c <permissions> <file>`: Change file permissions and display changes.
  - `chmod -f <permissions> <file>`: Change file permissions without confirmation.
  - `chmod -v <permissions> <file>`: Change file permissions and display changes.
  - `chown`: Change file owner.
  - `chown -R <owner> <file>`: Recursively change file owner.
  - `chown -c <owner> <file>`: Change file owner and display changes.
  - `chown -f <owner> <file>`: Change file owner without confirmation.
  - `chown -v <owner> <file>`: Change file owner and display changes.
  - `chgrp`: Change group ownership.
  - `chgrp -R <group> <file>`: Recursively change group ownership.
  - `chgrp -c <group> <file>`: Change group ownership and display changes.
  - `chgrp -f <group> <file>`: Change group ownership without confirmation.
  - `chgrp -v <group> <file>`: Change group ownership and display changes.

### File Permission Representation

- **Symbolic**: `rwxrwxrwx`
- **Numeric**: `777`
- **Owner**: `rwx`
- **Group**: `rwx`
- **Others**: `rwx`

### Special Permissions

#### s bit

- **Setuid (s)**: Execute a file with the owner's permissions.
  - `chmod +s <file>`: Set the setuid/setgid bit on a file.
  - **Owner**: `rws`
  - **Group**: `r-x`
  - **Others**: `r-x`
- **Setgid (s)**: Execute a file with the group's permissions.
  - `chmod g+s <file>`: Set the setuid/setgid bit on a file.
  - **Owner**: `rwx`
  - **Group**: `rws`
  - **Others**: `r-x`
- **Sticky bit (t)**: Prevent users from deleting files in a directory.
  - `chmod +t <directory>`: Set the sticky bit on a directory.
  - `chmod -t <directory>`: Remove the sticky bit from a directory.
  - `chmod 1777 <directory>`: Set the sticky bit on a directory.

### Immutable Flag

- **chattr**: Change file attributes.
- **Immutable Flag**: Prevent file modification.
- **Commands**:
  - `chattr +i <file>`: Set the immutable flag on a file.
  - `chattr -i <file>`: Remove the immutable flag from a file.
  - `lsattr`: List file attributes.
  - `lsattr -a`: List all files with attributes.
  - `lsattr -d`: List directories with attributes.
  - `lsattr -R`: Recursively list files with attributes.
  - `lsattr -v`: List files with attributes in verbose mode.

### Access Control Lists (ACLs)

- **getfacl**: Get file access control list.
  - `getfacl <file>`: Display file permissions.
  - `getfacl -R <file>`: Recursively display file permissions.
  - `getfacl -c <file>`: Check file permissions.
  - `getfacl -v <file>`: Display file permissions in verbose mode.
- **setfacl**: Set file access control list.
  - `setfacl -m u:<username>:<permissions> <file>`: Set user permissions.
  - `setfacl -m g:<group>:<permissions> <file>`: Set group permissions.
  - `setfacl -m o:<others>:<permissions> <file>`: Set others permissions.
  - `setfacl -m m:<mask>:<permissions> <file>`: Set mask permissions.
  - `setfacl -x <user> <file>`: Remove user permissions.
  - `setfacl -b <file>`: Remove all permissions.
  - `setfacl -d <permissions> <file>`: Set default permissions.
  - `setfacl -k <file>`: Remove default permissions.
  - `setfacl -R <permissions> <file>`: Recursively set permissions.
  - `setfacl -c <file>`: Check permissions.
  - `setfacl -v <file>`: Display permissions.

### Viewing File Permissions

- `ls -l`: List files with permissions.

### umask

- **umask**: Default file creation mask.
  - **Default**: `0022`
  - `umask -p <octal>`: Display the umask in octal format.
  - `umask -S`: Display the umask in symbolic format.
  - `umask -S <octal>`: Display the umask in symbolic format with a specific octal value.
  - `umask -S <symbolic>`: Display the umask in octal format with a specific symbolic value.
  - `umask -S <symbolic> <octal>`: Display the umask in octal format with a specific symbolic value.

---

## Storage

### Block Devices

- **Block Devices**: Storage devices that store data in fixed-size blocks or sectors.
- **Examples**: Hard drives, solid-state drives, USB drives.

### Character Devices

- **Character Devices**: Devices that transfer data character by character.
- **Examples**: Keyboards, mice, serial ports.

### Filesystems

- **Filesystems**: Methods (data structures) used to organize and store data on storage devices.
- **Examples**: ext2, ext3, ext4, XFS, NTFS. FAT32, BTRFS.
- **Types**:
  - **Journaling**: Record changes before writing them to disk.
  - **Non-journaling**: Write changes directly to disk.
- ext2: Extended Filesystem 2, used to be the native Linux filesystem of some older releases.
- ext3: Extended Filesystem 3, an enhanced version of ext2 with journaling capabilities.
- ext4: Extended Filesystem 4, an improved version of ext3 with larger filesystem support, volumes up to one exabyte and files up to 16 terabytes.
- XFS: X Filesystem, a 64-bit, high-performance journaling filesystem that provides fast recovery and can handle large files efficiently.
- NTFS: New Technology File System, a proprietary journaling filesystem developed by Microsoft.
- FAT32: File Allocation Table 32, an older filesystem compatible with different operating systems.
- BTRFS: B-Tree Filesystem, a modern copy-on-write filesystem with advanced features like snapshots and subvolumes. Supports volumes up to 16 exabytes and files up to 18 quintillion files on each volume.

  - snapshots: A read-only copy of a filesystem at a specific point in time.
  - subvolumes: Independent filesystems within a BTRFS volume.

- SMB: Server Message Block, a network file sharing protocol.
- NFS: Network File System, a distributed file system protocol.
- CIFS: Common Internet File System, a network file sharing protocol.
- SSHFS: Secure Shell File System, a network file sharing protocol.
- FTP: File Transfer Protocol, a network file sharing protocol.
- SFTP: Secure File Transfer Protocol, a network file sharing protocol.
- SCP: Secure Copy Protocol, a network file sharing protocol.
- RSYNC: Remote Sync, a network file sharing protocol.

- **Index Node (inode)**: A data structure that stores metadata about files and directories.

  - **Metadata**: File type, permissions, owner, group, size, timestamps, and data block locations.
  - **Location**: `/`
  - **Size**: 128 bytes

- **Virtual Filesystem (VFS)**, an abstraction layer that allows multiple filesystems to be accessed through a common interface.
- **Location**: `/proc`, `/sys`, `/dev`, `/run`, `/tmp`, `/mnt`, `/media`, `/home`, `/var`, `/usr`.
- **Types**:

  - **proc**: Process information.
  - **sys**: System information.
  - **dev**: Device information. A special file that contains details about all the files and subdirectories housed within it.
  - **run**: Runtime information.
  - **tmp**: Temporary files.
  - **mnt**: Mount points.
  - **media**: Removable media.
  - **home**: User home directories.
  - **var**: Variable data.
  - **usr**: User programs.

- e2label: Set a label on an ext2/ext3/ext4 filesystem.
- xfs_admin: Set a label on an XFS filesystem.

- **Filesystem Hierarchy Standard (FHS)**: A standard that defines the directory structure and organization of Linux systems.
- **Location**: `/`, `/bin`, `/boot`, `/dev`, `/etc`, `/home`, `/lib`, `/media`, `/mnt`, `/opt`, `/proc`, `/root`, `/run`, `/sbin`, `/srv`, `/sys`, `/tmp`, `/usr`, `/var`.
- **Types**:
  - **bin**: Essential user binaries.
  - **boot**: Boot loader files.
  - **dev**: Device files.
  - **etc**: System configuration files.
  - **home**: User home directories.
  - **lib**: Library files.
  - **media**: Removable media.
  - **mnt**: Mount points.
  - **opt**: Optional software.
  - **proc**: Process information.
  - **root**: Root user home directory.
  - **run**: Runtime information.
  - **sbin**: System binaries.
  - **srv**: Service data.
  - **sys**: System information.
  - **tmp**: Temporary files.
  - **usr**: User programs.
  - **var**: Variable data.

### Mount Points

- **Mount Points**: Directories where filesystems are attached in the system's directory tree.
- **Location**: `/mnt`, `/media`, `/home`, `/var`, `/usr`.

### Partitions

- **Partitions**: Divisions of a storage device that can be formatted with a filesystem.
- **Types**:
  - **Primary**: Bootable partitions. Contains one filesystem or logical drive (up to four) and is sometimes referred to as a volume.
  - **Extended**: Logical partitions. Contains several file systems, which are referred to as logical drives.
  - **Logical**: Additional partitions within an extended partition. Partitioned and allocated as an independent unit and functions as a separate drive.

### Partitioning Tools

- **fdisk**: Partition table manipulator.
- **Commands**:

  - `fdisk`: Display partition information.
  - `fdisk -b <sector size>`: specify number of drive sectors
  - `fdisk -H <heads>`: specify number of drive heads
  - `fdisk -S <sectors>`: specify number of drive sectors per track
  - `fdisk -s <partition>`: print partition size in blocks.
  - `fdisk n`: create a new partition.
  - `fdisk p`: print the partition table.
  - `fdisk d`: remove partition.
  - `fdisk q`: quit without saving changes.
  - `fdisk w`: write changes to disk.
  - `fdisk -l`: List all partitions.
  - `fdisk -l <device>`: List partitions on a specific device.
  - `fdisk -s <device>`: Display partition size.
  - `fdisk -u <device>`: Display partition size in sectors.
  - `fdisk -v <device>`: Display partition size in sectors and cylinders.
  - `fdisk -c <device>`: Display partition size in cylinders.
  - `fdisk -b <device>`: Display partition size in bytes.
  - `fdisk -t <type> <device>`: Display partition type.
  - `fdisk -m <device>`: Display partition mode.
  - `fdisk -p <device>`: Display partition table.
  - `fdisk -q <device>`: Display partition quick mode.
  - `fdisk -r <device>`: Display partition table in raw mode.
  - `fdisk -x <device>`: Display partition table in expert mode.
  - `fdisk -y <device>`: Display partition table in easy mode.
  - `fdisk -z <device>`: Display partition table in compact mode.
  - `fdisk -A <device>`: Display partition table in auto mode.
  - `fdisk -B <device>`: Display partition table in batch mode.
  - `fdisk -C <device>`: Display partition table in compact mode.
  - `fdisk -D <device>`: Display partition table in display mode.
  - `fdisk -F <device>`: Display partition table in full mode.
  - `fdisk -H <device>`: Display partition table in human-readable mode.
  - `fdisk -I <device>`: Display partition table in interactive mode.
  - `fdisk -L <device>`: Display partition table in long mode.
  - `fdisk -M <device>`: Display partition table in machine-readable mode.
  - `fdisk -N <device>`: Display partition table in no mode.
  - `fdisk -O <device>`: Display partition table in optimized mode.
  - `fdisk -P <device>`: Display partition table in print mode.
  - `fdisk -Q <device>`: Display partition table in

- **parted**: used to create, destroy, and resize partitions and runs the GNU Parted utility.

  - select <device>: select a device.
  - mklabel <label>: create a new disk label.
  - mkpart <part-type> <fs-type> <start> <end>: create a new partition.
  - rm <number>: remove a partition.
  - print: display the partition table.
  - quit: exit the program.
  - help: display help information.
  - resizepart <number> <end>: resize a partition.
  - move <number> <end>: move a partition.

- **partprobe**: Inform the OS of partition table changes.
- **Commands**:
  - `partprobe -s`: Display partition table changes.
  - `partprobe -d`: Debug partition table changes.
  - `partprobe -v`: Verbose partition table changes.

### Formatting Filesystems

- **mkfs**: Create a filesystem.
- **Commands**:
  - `mkfs`: Create a filesystem.
  - `mkfs -t <type> <device>`: Create a filesystem with a specific type.
  - `mkfs -c <device>`: Check a filesystem before creating it.
  - `mkfs -l <device>`: Label a filesystem.
  - `mkfs -n <device>`: Dry-run a filesystem creation.
  - `mkfs -v <device>`: Verbose filesystem creation.
  - `mkfs -V <device>`: Display filesystem creation version.
  - `mkfs -r <device>`: Create a read-only filesystem.
  - `mkfs -f <device>`: Force filesystem creation.
  - `mkfs -d <device>`: Debug filesystem creation.
  - `mkfs -D <device>`: Display filesystem creation debug information.
  - `mkfs -s <device>`: Create a sparse filesystem.
  - `mkfs -S <device>`: Create a filesystem without superblocks.
  - `mkfs -b <device>`: Create a filesystem with a specific block size.
  - `mkfs -B <device>`: Create a filesystem with a specific block count.
  - `mkfs -i <device>`: Create a filesystem with a specific inode size.
  - `mkfs -I <device>`: Create a filesystem with a specific inode count.
  - `mkfs -m <device>`: Create a filesystem with a specific metadata size.
  - `mkfs -M <device>`: Create a filesystem with a specific metadata count.
  - `mkfs -p <device>`: Create a filesystem with a specific partition size.
  - `mkfs -P <device>`: Create a filesystem with a specific partition count.
  - `mkfs -q <device>`: Create a filesystem with a specific quota size.
  - `mkfs -Q <device>`: Create a filesystem with a specific quota count.
  - `mkfs -u <device>`: Create a filesystem with a specific UUID.
  - `mkfs -U <device>`: Create a filesystem with a specific UUID count.
  - `mkfs -w <device>`: Create a filesystem with a specific write size.
  - `mkfs -W <device>`: Create a filesystem with a specific write count.

### Mounting Filesystems

- **Mounting**: Attaching a filesystem to a directory in the system's directory tree.
- **Commands**:
  - `mount`: Mount a filesystem.
  - `mount -t <type> <device> <directory>`: Mount a filesystem with a specific type.
  - `mount -o <options> <device> <directory>`: Mount a filesystem with specific options.
  - `mount -a`: Mount all filesystems in `/etc/fstab`.
  - `umount`: Unmount a filesystem.
  - `umount -l`: Lazy unmount a filesystem.
  - `umount -f`: Force unmount a filesystem.
  - `umount -r`: Remount a read-only filesystem.
  - `umount -v`: Verbose unmount a filesystem.

**Mount Options**

- auto: Automatically mount the filesystem.
- noauto: Do not automatically mount the filesystem.
- exec: Allow the execution of binaries.
- noexec: Do not allow the execution of binaries.
- suid: Allow the setuid permission.
- nosuid: Do not allow the setuid permission.
- ro: Mount the filesystem as read-only.
- rw: Mount the filesystem as read-write.
- user: Allow users to mount the filesystem.
- nouser: Do not allow users to mount the filesystem.
- sync: Synchronize data writes.
- async: Asynchronously write data.
- atime: Update the access time.
- noatime: Do not update the access time.
- relatime: Update the access time relative to the modification time.

**umount options**

- -l: Lazy unmount a filesystem.
- -f: Force unmount a filesystem.
- -r: Remount a read-only filesystem.
- -v: Verbose unmount a filesystem.
- -a: Unmount all filesystems in `/etc/fstab`.
- -n: Dry-run unmount a filesystem.
- -t: Unmount a filesystem with a specific type.
- -o: Unmount a filesystem with specific options.
- -p: Unmount a filesystem with a specific process.
- -R: Recursively unmount a filesystem.
- -fake: Fake unmount a filesystem.

**FUSE (Filesystem in USErspace)**

- **FUSE**: A software interface that allows non-privileged users to create their filesystems. Lets non-privileged users create own file systems without editing the underlying kernel code.
- **Location**: `/dev/fuse`

### /etc/fstab

- **fstab**: Filesystem table that lists filesystems and their mount points. Stores information about storage devices and partitions and where and how they should be mounted.
- **Location**: `/etc/fstab`
- **Fields**:
  - **Device**: Device name or UUID.
  - **Mount Point**: Directory where the filesystem is mounted.
  - **Type**: Filesystem type.
  - **Options**: Mount options.
  - **Dump**: Backup frequency.
  - **Pass**: Filesystem check order.

### /etc/mtab file

- **mtab**: Mounted filesystem table that lists mounted filesystems.
- **Location**: `/etc/mtab`
- **Fields**:

  - **Device**: Device name or UUID.
  - **Mount Point**: Directory where the filesystem is mounted.
  - **Type**: Filesystem type.
  - **Options**: Mount options.

  ### /proc/interupts file

- **interupts**: System interrupts information.
- **Location**: `/proc/interupts`
- **Fields**:
  - **IRQ**: Interrupt request number.
  - **Count**: Number of interrupts.
  - **Device**: Device name.
- **Types**:
  - **Hardware Interrupts**: Generated by hardware devices.
  - **Software Interrupts**: Generated by software.
- **IRQs**:
  - **0-15**: System interrupts.
  - **16-31**: Hardware interrupts.
  - **32-255**: Software interrupts.
- **Commands**:

  - `cat /proc/interupts`: Display system interrupts.
  - `cat /proc/interupts | grep <IRQ>`: Display a specific interrupt.
  - `cat /proc/interupts | grep <Device>`: Display a specific device.
  - `cat /proc/interupts | grep <Count>`: Display a specific interrupt count.

  ### /proc/ioports file

- **ioports**: Input/output ports information.
- **Location**: `/proc/ioports`
- **Fields**:
  - **Start**: Start address of the port.
  - **End**: End address of the port.
  - **Size**: Size of the port.
  - **Type**: Port type.
- **Types**:
  - **Memory-mapped I/O**: Uses memory addresses to communicate with hardware devices.
  - **Port-mapped I/O**: Uses port addresses to communicate with hardware devices.
- **Commands**:

  - `cat /proc/ioports`: Display input/output ports.
  - `cat /proc/ioports | grep <Start>`: Display a specific port.
  - `cat /proc/ioports | grep <End>`: Display a specific port.
  - `cat /proc/ioports | grep <Size>`: Display a specific port size.
  - `cat /proc/ioports | grep <Type>`: Display a specific port type.

  ### /proc/dma file

- **dma**: Direct memory access information.
- **Location**: `/proc/dma`
- **Fields**:
  - **Channel**: DMA channel number.
  - **Device**: Device name.
  - **Count**: Number of DMA requests.
- **Commands**:

  - `cat /proc/dma`: Display direct memory access information.
  - `cat /proc/dma | grep <Channel>`: Display a specific DMA channel.
  - `cat /proc/dma | grep <Device>`: Display a specific device.
  - `cat /proc/dma | grep <Count>`: Display a specific DMA request count.

  ### /proc/iomem file

- **iomem**: Input/output memory information.
- **Location**: `/proc/iomem`
- **Fields**:
  - **Start**: Start address of the memory.
  - **End**: End address of the memory.
  - **Size**: Size of the memory.
  - **Type**: Memory type.
- **Types**:
  - **System Memory**: Memory used by the system.
  - **Reserved Memory**: Memory reserved for specific purposes.
  - **Memory-mapped I/O**: Memory used for input/output operations.
- **Commands**:

  - `cat /proc/iomem`: Display input/output memory information.
  - `cat /proc/iomem | grep <Start>`: Display a specific memory address.
  - `cat /proc/iomem | grep <End>`: Display a specific memory address.
  - `cat /proc/iomem | grep <Size>`: Display a specific memory size.
  - `cat /proc/iomem | grep <Type>`: Display a specific memory type.

  ### /proc/meminfo file

- **meminfo**: System memory information.
- **Location**: `/proc/meminfo`
- **Fields**
  - **Total**: Total memory.
  - **Free**: Free memory.
  - **Available**: Available memory.
  - **Buffers**: Memory used for buffers.
  - **Cached**: Memory used for cache.

### /proc/mounts file

- **mounts**: Mounted filesystems information.
- **Location**: `/proc/mounts`
- **Fields**:
  - **Device**: Device name or UUID.
  - **Mount Point**: Directory where the filesystem is mounted.
  - **Type**: Filesystem type.
  - **Options**: Mount options.

### /proc/filesystems file

- **filesystems**: Available filesystems.
- **Location**: `/proc/filesystems`
- **Fields**:
  - **Type**: Filesystem type.

### /proc/partitions file

- **partitions**: Available partitions.
- **Location**: `/proc/partitions`
- **Fields**:

  - **Major**: Major device number.
  - **Minor**: Minor device number.
  - **Blocks**: Number of blocks.
  - **Name**: Partition name.

  **lsblk**

- **lsblk**: List block devices.
- **Commands**:

  - `lsblk`: List block devices.
  - `lsblk -a`: List all block devices.
  - `lsblk -b`: List block devices in bytes.
  - `lsblk -d`: List block devices in detail.
  - `lsblk -f`: List block devices with filesystems.
  - `lsblk -i`: List block devices with IDs.
  - `lsblk -l`: List block devices in list format.
  - `lsblk -m`: List block devices in megabytes.
  - `lsblk -n`: List block devices without headers.
  - `lsblk -o`: List block devices with specific columns.
  - `lsblk -p`: List block devices with paths.
  - `lsblk -r`: List block devices in raw format.
  - `lsblk -s`: List block devices in size format.
  - `lsblk -t`: List block devices with topology.
  - `lsblk -u`: List block devices in units.
  - `lsblk -v`: List block devices in verbose mode.
  - `lsblk -x`: List block devices in XML format.
  - `lsblk -y`: List block devices in YAML format.

  **blkid**

- **blkid**: Print block device attributes.
- **Commands**:

  - `blkid`: Print block device attributes.
  - `blkid -c <file>`: Print block device attributes from a specific file.
  - `blkid -g`: Print block device attributes in cache mode.
  - `blkid -i`: Print block device attributes in input mode.
  - `blkid -l`: Print block device attributes in list mode.
  - `blkid -o`: Print block device attributes with specific columns.
  - `blkid -p`: Print block device attributes in probe mode.
  - `blkid -s`: Print block device attributes with specific attributes.
  - `blkid -t`: Print block device attributes with specific types.
  - `blkid -u`: Print block device attributes in UUID mode.
  - `blkid -v`: Print block device attributes in verbose mode.
  - `blkid -w`: Print block device attributes in cache write mode.
  - `blkid -x`: Print block device attributes in XML mode.
  - `blkid -y`: Print block device attributes in YAML mode.

  **df**

### Filesystem Check

- **fsck**: Filesystem consistency check.
- **Commands**:
  - `fsck`: Check a filesystem.
  - `fsck -t <type>`: Check a filesystem with a specific type.
  - `fsck -a`: Automatically repair a filesystem.
  - `fsck -r`: Interactively repair a filesystem.
  - `fsck -V`: Verbose check a filesystem.

### Filesystem Resize

- **resize2fs**: Resize an ext2, ext3, or ext4 filesystem.
- **Commands**:

  - `resize2fs`: Resize a filesystem.
  - `resize2fs -M <device>`: Shrink a filesystem to the minimum size.
  - `resize2fs -P <device>`: Print the minimum size of a filesystem.
  - `resize2fs -p <device>`: Print the progress of a filesystem resize.
  - `resize2fs -f <device>`: Force a filesystem resize.
  - `resize2fs -d <device>`: Debug a filesystem resize.
  - `resize2fs -S <device>`: Resize a filesystem without moving data blocks.
  - `resize2fs -T <device>`: Resize a filesystem without moving data blocks.

- **tune2fs**: Adjust filesystem parameters for ext2/ext3.

  - `tune2fs -c <count> <device>`: Set the maximum mount count.
  - `tune2fs -C <count> <device>`: Set the current mount count.
  - `tune2fs -e <errors> <device>`: Set the error behavior.
  - `tune2fs -i <interval> <device>`: Set the maximum interval between checks.
  - `tune2fs -j <device>`: Enable journaling.
  - `tune2fs -J <device>`: Disable journaling.
  - `tune2fs -l <device>`: List filesystem information.
  - `tune2fs -m <percent> <device>`: Set the reserved blocks percentage.
  - `tune2fs -o <option> <device>`: Set a filesystem option.
  - `tune2fs -r <reserved> <device>`: Set the reserved blocks count.
  - `tune2fs -u <user> <device>`: Set the default user.
  - `tune2fs -U <uuid> <device>`: Set the filesystem UUID.
  - `tune2fs -v <device>`: Verify a filesystem.
  - `tune2fs -z <device>`: Zero the journal.

- **Superblock**: A data structure that contains metadata about a filesystem.

  - **Location**: `/`
  - **Size**: 1024 bytes
  - **Fields**:
    - **Magic Number**: Filesystem type.
    - **Inode Count**: Number of inodes.
    - **Block Count**: Number of blocks.
    - **Block Size**: Size of blocks.
    - **Blocks Per Group**: Number of blocks per group.
    - **Inodes Per Group**: Number of inodes per group.
    - **Mount Time**: Last mount time.
    - **Write Time**: Last write time.
    - **Mount Count**: Number of mounts.
    - **Max Mount Count**: Maximum number of mounts.
    - **Magic**: Magic number.
    - **State**: Filesystem state.
    - **Errors**: Error behavior.
    - **Minor Revision Level**: Minor revision level.
    - **Last Check Time**: Last check time.
    - **Check Interval**: Check interval.
    - **OS ID**: Operating system ID.
    - **Major Revision Level**: Major revision level.
    - **UID**: User ID.
    - **GID**: Group ID.
    - **First Inode**: First inode.
    - **Inode Size**: Size of inodes.
    - **Block Group Number**: Block group number.
    - **Compatible Features**: Compatible features.
    - **Incompatible Features**: Incompatible features.
    - **Read-Only Compatible Features**: Read-only compatible features.
    - **UUID**: Filesystem UUID.
    - **Volume Name**: Volume name.
    - **Last Mounted Directory**: Last mounted directory.
    - **Algorithm Group Descriptor**: Algorithm group descriptor.
    - **Checksum**: Checksum.

- **dumpe2fs**: Dump ext2/ext3/ext4 filesystem information.

  - `dumpe2fs -h <device>`: Display filesystem information.
  - `dumpe2fs -f <device>`: Display filesystem features.
  - `dumpe2fs -g <device>`: Display filesystem group information.
  - `dumpe2fs -i <device>`: Display filesystem inode information.
  - `dumpe2fs -j <device>`: Display filesystem journal information.
  - `dumpe2fs -l <device>`: Display filesystem label information.
  - `dumpe2fs -m <device>`: Display filesystem metadata information.
  - `dumpe2fs -p <device>`: Display filesystem block group information.
  - `dumpe2fs -s <device>`: Display filesystem superblock information.
  - `dumpe2fs -t <device>`: Display filesystem block information.
  - `dumpe2fs -u <device>`: Display filesystem UUID information.
  - `dumpe2fs -v <device>`: Display filesystem volume information.
  - `dumpe2fs -x <device>`: Display filesystem extended information.
  - `dumpe2fs -y <device>`: Display filesystem journal UUID information.
  - `dumpe2fs -z <device>`: Display filesystem journal backup information.

- **debugfs**: Debug an ext2/ext3/ext4 filesystem.

  - `debugfs -R <command> <device>`: Run a debugfs command.
  - `debugfs -d <device>`: Display filesystem information.
  - `debugfs -f <device>`: Display filesystem features.
  - `debugfs -g <device>`: Display filesystem group information.
  - `debugfs -i <device>`: Display filesystem inode information.
  - `debugfs -j <device>`: Display filesystem journal information.
  - `debugfs -l <device>`: Display filesystem label information.
  - `debugfs -m <device>`: Display filesystem metadata information.
  - `debugfs -p <device>`: Display filesystem block group information.
  - `debugfs -s <device>`: Display filesystem superblock information.
  - `debugfs -t <device>`: Display filesystem block information.
  - `debugfs -u <device>`: Display filesystem UUID information.
  - `debugfs -v <device>`: Display filesystem volume information.
  - `debugfs -x <device>`: Display filesystem extended information.
  - `debugfs -y <device>`: Display filesystem journal UUID information.
  - `debugfs -z <device>`: Display filesystem journal backup information.

- **e2fsck**: Check an ext2/ext3/ext4 filesystem.

  - `e2fsck -b <block> <device>`: Check a filesystem with a specific block.
  - `e2fsck -B <block> <device>`: Check a filesystem with a specific block count.
  - `e2fsck -c <device>`: Check a filesystem before mounting it.
  - `e2fsck -C <device>`: Check a filesystem with a specific command.
  - `e2fsck -d <device>`: Debug a filesystem check.
  - `e2fsck -D <device>`: Debug a filesystem check with a specific command.
  - `e2fsck -f <device>`: Force a filesystem check.
  - `e2fsck -F <device>`: Force a filesystem check with a specific command.
  - `e2fsck -j <device>`: Check a filesystem with journaling.
  - `e2fsck -J <device>`: Check a filesystem without journaling.
  - `e2fsck -l <device>`: Check a filesystem with a specific label.
  - `e2fsck -L <device>`: Check a filesystem without a specific label.
  - `e2fsck -m <device>`: Check a filesystem with metadata.
  - `e2fsck -M <device>`: Check a filesystem without metadata.
  - `e2fsck -n <device>`: Dry-run a filesystem check.
  - `e2fsck -p <device>`: Check a filesystem with a specific partition.
  - `e2fsck -P <device>`: Check a filesystem without a specific partition.
  - `e2fsck -q <device>`: Check a filesystem with quotas.
  - `e2fsck -Q <device>`: Check a filesystem without quotas.
  - `e2fsck -r <device>`: Check a filesystem with a specific reserved block count.
  - `e2fsck -R <device>`: Check a filesystem without a specific reserved block count.
  - `e2fsck -s <device>`: Check a filesystem with a specific superblock.
  - `e2fsck -S <device>`: Check a filesystem without a specific superblock.
  - `e2fsck -t <device>`: Check a filesystem with a specific type

- **lsscsi**: List SCSI devices.

  - `lsscsi`: List SCSI devices.
  - `lsscsi -g`: List SCSI devices with generic information.
  - `lsscsi -H`: List SCSI devices with host information.
  - `lsscsi -t`: List SCSI devices with topology information.
  - `lsscsi -v`: List SCSI devices with verbose information.
  - `lsscsi -x`: List SCSI devices with XML information.
  - `lsscsi -y`: List SCSI devices with YAML information.

- **fcstat**

  - `fcstat`: Display Fibre Channel statistics.
  - `fcstat -a`: Display all Fibre Channel statistics.
  - `fcstat -c`: Display Fibre Channel class statistics.
  - `fcstat -d`: Display Fibre Channel device statistics.
  - `fcstat -f`: Display Fibre Channel fabric statistics.
  - `fcstat -h`: Display Fibre Channel host statistics.
  - `fcstat -i`: Display Fibre Channel interface statistics.
  - `fcstat -l`: Display Fibre Channel link statistics.
  - `fcstat -n`: Display Fibre Channel node statistics.
  - `fcstat -p`: Display Fibre Channel port statistics.
  - `fcstat -s`: Display Fibre Channel switch statistics.
  - `fcstat -t`: Display Fibre Channel target statistics.
  - `fcstat -v`: Display Fibre Channel virtual statistics.

### Logical Volume Management (LVM)

- **LVM**: Logical volume management for managing disk space. Maps whole physical devices and partitions into one or more virtual containers called volume groups, each of which can be divided into logical volumes.
- **Commands**:

  - `pvcreate`: Create a physical volume.
  - `pvdisplay`: Display physical volume information.
  - `pvremove`: Remove a physical volume.
  - `vgcreate`: Create a volume group.
  - `vgdisplay`: Display volume group information.
  - `vgremove`: Remove a volume group.
  - `lvcreate`: Create a logical volume.
  - `lvdisplay`: Display logical volume information.
  - `lvremove`: Remove a logical volume.
  - `lvextend`: Extend a logical volume.
  - `lvreduce`: Reduce a logical volume.
  - `lvresize`: Resize a logical volume.
  - `lvchange`: Change logical volume attributes.

- Device Mapper: A kernel-level framework that maps logical block devices onto physical devices. It is used by LVM to manage logical volumes. Creates a virtual device and passes data from that virtual device to one or more physical devices.

- DM-Multipath: A device mapper target that allows multiple paths to storage devices to be used simultaneously. It is used to provide fault tolerance and load balancing.

- mdadm: Manage software RAID devices. It is used to create, manage, and monitor software RAID devices.

### RAID

- **RAID**: Redundant array of independent disks for data redundancy and performance.
- **Levels**:

  - **RAID 0**: Striping without redundancy.
  - **RAID 1**: Mirroring for data redundancy.
  - **RAID 5**: Striping with parity for data redundancy.
  - **RAID 6**: Striping with double parity for data redundancy.
  - **RAID 10**: Mirroring and striping for data redundancy and performance.

- /proc/mdstat: Display software RAID information. Contains a snapshot of the kernel's RAID/md state.
  - `mdadm --detail <device>`: Display RAID device information.
  - `mdadm --create <device> --level=<level> --raid-devices=<devices> <devices>`: Create a RAID device.
  - `mdadm --assemble <device> <devices>`: Assemble a RAID device.
  - `mdadm --stop <device>`: Stop a RAID device.
  - `mdadm --remove <device> <devices>`: Remove a device from a RAID device.
  - `mdadm --add <device> <devices>`: Add a device to a RAID device.
  - `mdadm --grow <device> --size=<size>`: Grow a RAID device.
  - `mdadm --fail <device> <devices>`: Fail a device in a RAID device.
  - `mdadm --zero-superblock <device>`: Zero the superblock of a device.
  - `mdadm --examine <device>`: Examine a device.
  - `mdadm --detail <device>`: Display RAID device information.
  - `mdadm --query <device>`: Query a device.
  - `mdadm --monitor <device>`: Monitor a device.
  - `mdadm --wait <device>`: Wait for a device.
  - `mdadm --scan`: Scan for RAID devices.
  - `mdadm --auto-detect`: Auto-detect RAID devices.
  - `mdadm --auto=partition`: Auto-detect RAID partitions.
  - `mdadm --auto=md`: Auto-detect RAID devices.

### Swap

- **Swap**: Space on a storage device used as virtual memory.
- **Commands**:

  - `swapon`: Enable swap space.
  - `swapoff`: Disable swap space.
  - `mkswap`: Create a swap space.
  - `swapon -s`: Display swap space information.

- **/etc/crypttab**: File that contains information about encrypted filesystems (partitions, devices) that must be unlocked and mounted on a system boot.

## Special Files

**/dev/disk/by-id**: Device indentifiers/hardware serial numbers. Used to identify devices by their unique hardware serial number.
**/dev/disk/by-path**: Shortest physical path to the device. Used to identify devices by their physical location.
**/dev/disk/by-uuid**: Universally unique identifier (UUID) of the device. A unique identifier assigned to a device when it is formatted with a filesystem. Used to identify devices in a persistent manner.
**/dev/null**: Null device that discards all data written to it. Will send back the ASCII code for null (0x00). Used to discard unwanted output.
**/dev/zero**: Zero device that returns null bytes when read. Will send back the ASCII code for null (0x00).
**/dev/random**: Random device that returns random bytes when read. A special type of virtual device that returns a randomized series of pseudorandom numbers.
**/dev/urandom**: Unpredictable random device that returns random bytes when read. A special type of virtual device that returns a randomized series of pseudorandom numbers.
**/dev/loop0**: Loop device that allows a file to be mounted as a filesystem. A pseudo-device that makes a file accessible as a block device. It is used to mount filesystem images.
**/dev/mapper/**: Device mapper devices. A virtual device that maps logical block devices onto physical devices. Used by LVM to manage logical volumes. Creates a virtual device and passes data from that virtual device to one or more physical devices.

#### dd if=/dev/zero of=/dev/sdb bs=1GB count=1024: Write zeros to a block device.

#### head -c5 /dev/urandom: Generate random data.

- pvscan: Scan all disks for physical volumes.
- pvcreate: Create a physical volume.
- pvdisplay: Display physical volume information.
- pvchange: Change physical volume attributes.
- pvremove: Remove a physical volume.
- pvs: Display physical volume information.
- pvck: Check physical volume metadata.
- vgcreate: Create a volume group.
- vgdisplay: Display volume group information.
- vgextend: Extend a volume group.
- vgreduce: Reduce a volume group.
- vgremove: Remove a volume group.
- vgscan: Scan all disks for volume groups.
- vgchange: Change volume group attributes.
- vgs: Display volume group information.
- vgck: Check volume group metadata.
- vgrename: Rename a volume group.
- vgsplit: Split a volume group.
- lvcreate: Create a logical volume.
- lvdisplay: Display logical volume information.
- lvextend: Extend a logical volume.
- lvreduce: Reduce a logical volume.
- lvremove: Remove a logical volume.
- lvrename: Rename a logical volume.
- lvchange: Change logical volume attributes.
- lvs: Display logical volume information.
- lvck: Check logical volume metadata.

#### Domain Sockets

- **Domain Sockets**: Inter-process communication mechanism that allows communication between processes on the same host via networking sockets that is protected by the file system's access control.
- **Location**: `/var/run`, `/tmp`
- **Types**:
  - **Stream**: Connection-oriented communication.
  - **Datagram**: Connectionless communication.
- **Commands**:
  - `netstat -x`: Display domain socket information.
  - `ss -x`: Display domain socket information.
  - `lsof -U`: Display domain socket information.
  - `fuser -U`: Display domain socket information.

#### Named Pipes

- **Named Pipes**: Inter-process communication mechanism that allows communication between processes on the same host without using network sockets.
- **Location**: `/tmp`, `/var/tmp`
- **Commands**:
  - `mkfifo`: Create a named pipe.
  - `ls -l`: List named pipes.
  - `rm`: Remove a named pipe.

#### Troubleshooting Storage Issues

- **dmesg**: Display kernel messages.
- `dmesg`: Display kernel messages.
- `dmesg -c`: Clear kernel messages.
- `dmesg -n`: Set kernel message level.
- `dmesg -r`: Display kernel messages in raw format.
- `dmesg -s`: Display kernel messages in size format.
- `dmesg -t`: Display kernel messages in time format.
- `dmesg -x`: Display kernel messages in XML format.
- `dmesg -y`: Display kernel messages in YAML format.
- **smartctl**: Control and monitor storage devices using the Self-Monitoring, Analysis, and Reporting Technology (SMART) system built into storage devices.
- **badblocks**: Check for bad blocks on a storage device.
- **hdparm**: Get/set hard disk parameters.
- **lshw**: List hardware information.
- **Commands**:
- `lshw`: List hardware information.
- `lshw -a`: List all hardware information.
- `lshw -c`: List hardware information by class.
- `lshw -d`: List hardware information by driver.
- `lshw -h`: List hardware information in HTML format.
- `lshw -m`: List hardware information in machine-readable format.
- `lshw -s`: List hardware information by slot.
- `lshw -short`: List hardware information in short format.
- `lshw -numeric`: List hardware information in numeric format.
- `lshw -businfo`: List hardware information by bus.
- `lshw -class`: List hardware information by class.
- `lshw -c`: List hardware information by class.
- `lshw -disable`: List hardware information by disable.
- `lshw -enable`: List hardware information by enable.
- `lshw -quiet`: List hardware information in quiet mode.
- `lshw -sanitize`: List hardware information in sanitize mode.
- `lshw -version`: List hardware information in version mode.
- `lshw -xml`: List hardware information in XML format.
- **ulimit**: limits the system resources for a user in a Linux-based server.
- **Commands**:
- `ulimit -a`: Display all limits.
- `ulimit -c`: Display core file size.
- `ulimit -d`: Display data segment size.
- `ulimit -f`: Display file size.
- `ulimit -l`: Display locked memory size.
- `ulimit -m`: Display resident set size.
- `ulimit -n`: Display open files limit.
- `ulimit -q`: Display virtual memory size.
- `ulimit -s`: Display stack size.
- `ulimit -t`: Display CPU time limit.
- `ulimit -u`: Display user processes limit.
- `ulimit -v`: Display virtual memory size.
- `ulimit -x`: Display file locks limit.
- `ulimit -X`: Display file locks limit.
- `ulimit -y`: Display file locks limit.
- `ulimit -z`: Display file locks limit.
- **iostat**: Report I/O statistics.
- **Commands**:
- `iostat`: Report I/O statistics.
- `iostat -c`: Report CPU statistics.
- `iostat -d`: Report disk statistics.
- `iostat -m`: Report memory statistics.
- `iostat -n`: Report network statistics.
- `iostat -p`: Report partition statistics.
- `iostat -t`: Report time statistics.
- `iostat -u`: Report CPU utilization statistics.
- `iostat -x`: Report extended statistics.
- `iostat -y`: Report TTY statistics.
- `iostat -z`: Report zone statistics.
- **iotop**: Display I/O usage by process.
- **Commands**:
- `iotop`: Display I/O usage by process.
- `iotop -a`: Display all I/O usage by process.
- `iotop -b`: Display I/O usage by process in batch mode.
- `iotop -c`: Display I/O usage by process with command.
- `iotop -d`: Display I/O usage by process with delay.
- `iotop -e`: Display I/O usage by process with extended information.
- `iotop -h`: Display I/O usage by process in help mode.
- `iotop -k`: Display I/O usage by process with kernel threads.
- `iotop -n`: Display I/O usage by process with number of samples.
- `iotop -o`: Display I/O usage by process with only processes.
- `iotop -p`: Display I/O usage by process with process ID.
- `iotop -q`: Display I/O usage by process in quiet mode.
- `iotop -r`: Display I/O usage by process with reverse order.
- `iotop -s`: Display I/O usage by process with sort.
- `iotop -t`: Display I/O usage by process with time.
- `iotop -u`: Display I/O usage by process with user.
- `iotop -v`: Display I/O usage by process in verbose mode.
- `iotop -w`: Display I/O usage by process in write mode.
- `iotop -y`: Display I/O usage by process in yield mode.
- `iotop -z`: Display I/O usage by process in zero mode.
- **ioping**: Generates a report of device I/O latency in real-time.
- **Commands**:
- `ioping -c <count> <device>`: Generate a report of device I/O latency.
- `ioping -f <device>`: Generate a report of device I/O latency in futex mode.
- `ioping -g <device>`: Generate a report of device I/O latency in gettime mode.
- `ioping -h <device>`: Generate a report of device I/O latency in high resolution mode.
- `ioping -i <device>`: Generate a report of device I/O latency in idle mode.
- `ioping -l <device>`: Generate a report of device I/O latency in low resolution mode.
- `ioping -m <device>`: Generate a report of device I/O latency in mmap mode.
- `ioping -n <device>`: Generate a report of device I/O latency in no-op mode.
- `ioping -o <device>`: Generate a report of device I/O latency in open mode.
- `ioping -p <device>`: Generate a report of device I/O latency in poll mode.
- `ioping -q <device>`: Generate a report of device I/O latency in quiet mode.
- `ioping -r <device>`: Generate a report of device I/O latency in read mode.
- `ioping -s <device>`: Generate a report of device I/O latency in seek mode.
- `ioping -t <device>`: Generate a report of device I/O latency in thread mode.
- `ioping -u <device>`: Generate a report of device I/O latency in unmap mode.
- `ioping -v <device>`: Generate a report of device I/O latency in verbose mode.
- `ioping -w <device>`: Generate a report of device I/O latency in write mode.
- `ioping -x <device>`: Generate a report of device I/O latency in exit mode.
- `ioping -y <device>`: Generate a report of device I/O latency in yield mode.
- `ioping -z <device>`: Generate a report of device I/O latency in zero mode.

- **df**: Display disk space usage.
- **Commands**:
- `df`: Display disk space usage.
- `df -a`: Display all disk space usage.
- `df -B`: Display disk space usage in bytes.
- `df -h`: Display disk space usage in human-readable format.
- `df -H`: Display disk space usage in human-readable format with base 1000.
- `df -i`: Display disk space usage with inode information.
- `df -k`: Display disk space usage in kilobytes.
- `df -l`: Display disk space usage with local filesystems.
- `df -m`: Display disk space usage in megabytes.
- `df -P`: Display disk space usage in POSIX format.
- `df -T`: Display disk space usage with filesystem type.
- `df -t`: Display disk space usage with specific filesystem type.
- `df -x`: Display disk space usage without specific filesystem type.
- `df -v`: Display disk space usage in verbose mode
- **du**: Display disk usage.
- **Commands**:
- `du`: Display disk usage.
- `du -a`: Display all disk usage.
- `du -B`: Display disk usage in bytes.
- `du -h`: Display disk usage in human-readable format.
- `du -H`: Display disk usage in human-readable format with base 1000.
- `du -k`: Display disk usage in kilobytes.
- `du -m`: Display disk usage in megabytes.
- `du -s`: Display disk usage in summary mode.
- `du -S`: Display disk usage without subdirectories.
- `du -t`: Display disk usage with a specific threshold.
- `du -x`: Display disk usage without crossing filesystem boundaries.
- `du -c`: Display disk usage with a total.
- `du -l`: Display disk usage with count.
- `du -L`: Display disk usage with dereference.
- `du -n`: Display disk usage with no-dereference.
- `du -r`: Display disk usage with reverse order.
- `du -v`: Display disk usage in verbose mode.
- `du -x`: Display disk usage without crossing filesystem boundaries.
- `du -X`: Display disk usage with exclude.
- `du -z`: Display disk usage with zero.
- `du -0`: Display disk usage with null.
- **fdisk**: Partition table manipulator.
- **Commands**:
- `fdisk`: Partition table manipulator.
- `fdisk -b`: Display partition table in bytes.
- `fdisk -c`: Display partition table in cylinders.
- `fdisk -h`: Display partition table in heads.
- `fdisk -l`: Display partition table in sectors.
- `fdisk -s`: Display partition table in sectors.
- `fdisk -t`: Display partition table in type.
- `fdisk -u`: Display partition table in sectors.
- `fdisk -v`: Display partition table in sectors and cylinders.
- `fdisk -c`: Display partition table in cylinders.
- `fdisk -b`: Display partition table in bytes.
- `fdisk -t`: Display partition type.
- `fdisk -m`: Display partition mode.
- `fdisk -p`: Display partition table.
- `fdisk -q`: Display partition quick mode.
- `fdisk -r`: Display partition table in raw mode.
- `fdisk -x`: Display partition table in expert mode.
- `fdisk -y`: Display partition table in easy mode.
- `fdisk -z`: Display partition table in compact mode.
- `fdisk -A`: Display partition table in auto mode.
- `fdisk -B`: Display partition table in batch mode.
- `fdisk -C`: Display partition table in compact mode.
- `fdisk -D`: Display partition table in display mode.
- `fdisk -F`: Display partition table in full mode.
- `fdisk -H`: Display partition table in human-readable mode.
- `fdisk -I`: Display partition table in interactive mode.
- `fdisk -L`: Display partition table in long mode.
- `fdisk -M`: Display partition table in machine-readable mode.
- `fdisk -N`: Display partition table in no mode.
- `fdisk -O`: Display partition table in optimized mode.
- `fdisk -P`: Display partition table in print mode.
- `fdisk -Q`: Display partition table in quick mode.

- `quotacheck -cugv /dev/sda1`: Check disk quotas.
- `quotaon -avug`: Enable disk quotas.
- `edquota -u <user>`: Edit user disk quotas.
- `edquota -g <group>`: Edit group disk quotas.
- `repquota -a`: Report disk quotas.
- `quotaoff -avug`: Disable disk quotas.

**vim**: A text editor that is an improved version of the vi editor.
**Commands**:

- `vim`: Open a file in vim.
- `vim -b`: Open a file in binary mode.
- `vim -c`: Open a file with a command.
- `vim -d`: Open a file in diff mode.
- `vim -e`: Open a file in ex mode.
- `vim -E`: Open a file in improved ex mode.
- `vim -f`: Open a file in read-only mode.
- `vim -g`: Open a file in GUI mode.
- `vim -i`: Open a file with a viminfo file.
- `vim -l`: Open a file in LISP mode.
- `vim -m`: Open a file in restricted mode.
- `vim -n`: Open a file in no-compatible mode.
- `vim -o`: Open a file in horizontal split mode.
- `vim -O`: Open a file in vertical split mode.
- `vim -p`: Open a file in tab page mode.
- `vim -q`: Open a file with a quickfix file.
- `vim -r`: Open a file in recovery mode.
- `vim -s`: Open a file in silent mode.
- `:q`: Quit vim.
- `:q!`: Quit vim without saving.
- `:qa`: Quit all vim instances.
- `:w`: Save a file.
- `:wq`: Save a file and quit.
- `:x`: Save a file and quit.
- `:e`: Edit a file.
- `:e!`: revert last saved format without closing the file.
- `:r`: Read a file.
- `:!`: Run a shell command.
- `^`: Move to the beginning of a line.
- `$`: Move to the end of a line.
- `w`: Move forward one word.
- `b`: Move backward one word.
- `dd`: Delete a line.
- `y`: Copy a line.
- `yy`: Copy a line.
- `p`: Paste a line above the cursor.
- `c{range of lines}c`: Change a range of lines.
- `u`: Undo the last change.
- `U`: Undo all changes on a line.
- `ZZ`: Write a file only if changes are made, then quit editor.
- `Ctrl + r`: Redo the last change.
- `:set number`: Show line numbers.
- `:set nonumber`: Hide line numbers.
- `:set autoindent`: Enable auto-indent.
- `:set noautoindent`: Disable auto-indent.
- `:set tabstop=4`: Set tabstop to 4 spaces.
- `:set shiftwidth=4`: Set shiftwidth to 4 spaces.
- `:set expandtab`: Enable expandtab.
- `:set noexpandtab`: Disable expandtab.
- `:set ignorecase`: Enable ignorecase.
- `:set noignorecase`: Disable ignorecase.
- `:set hlsearch`: Enable search highlighting.
- `:set nohlsearch`: Disable search highlighting.
- `Shift+L`: Move to the bottom of the screen.
- `Shift+M`: Move to the middle of the screen.
- `Shift+H`: Move to the top of the screen.
- `Ctrl + b`: Move back one page.
- `Ctrl + f`: Move forward one page.
- `Ctrl + d`: Move down half a page.
- `Ctrl + u`: Move up half a page.
- `Ctrl + e`: Move the screen up one line.
- `Ctrl + y`: Move the screen down one line.
- `Ctrl + o`: Move to the previous location.
- `Ctrl + i`: Move to the next location.
- `Ctrl + g`: Show the current file name and position.
- `gg`: Move to the beginning of the file.
- `G`: Move to the end of the file.
- `/<pattern>`: Search for a pattern.
- `n`: Move to the next search result.
- `N`: Move to the previous search result.
- `:s/<pattern>/<replacement>/g`: Replace a pattern with a replacement.
- `:s/<pattern>/<replacement>/gc`: Replace a pattern with a replacement with confirmation.
- `:set spell`: Enable spell checking.
- `:set nospell`: Disable spell checking.
- `:set spelllang=en_us`: Set the spell checking language to US English.

**Search Files**

- **find**: Search for files in a directory hierarchy.
- **Commands**:

  - `find`: Search for files in a directory hierarchy.
  - `find -H`: Search for files with symbolic links.
  - `find -L`: Search for files with symbolic links.
  - `find -P`: Search for files without symbolic links.
  - `find -O`: Search for files with optimization.
  - `find -X`: Search for files with regex.
  - `find -d`: Search for files with depth.
  - `find -f`: Search for files with a specific file.
  - `find -i`: Search for files with a specific inode.
  - `find -m`: Search for files with a specific mode.
  - `find -n`: Search for files with a specific name.
  - `find -p`: Search for files with a specific path.
  - `find -s`: Search for files with a specific size.
  - `find -t`: Search for files with a specific type.
  - `find -c`: Search for files with a specific ctime.
  - `find -m`: Search for files with a specific mtime.
  - `find -a`: Search for files with a specific atime.
  - `find -B`: Search for files with a specific birthtime.
  - `find -D`: Search for files with a specific depth.
  - `find -E`: Search for files with a specific exec.
  - `find -G`: Search for files with a specific group.
  - `find -U`: Search for files with a specific user.
  - `find -V`: Search for files with a specific version.
  - `find -W`: Search for files with a specific writable.
  - `find -X`: Search for files with a specific executable.
  - `find -Y`: Search for files with a specific non-executable.
  - `find -Z`: Search for files with a specific context.
  - `find -0`: Search for files with a specific null.
  - `find -1`: Search for files with a specific one.
  - `find -2`: Search for files with a specific two.
  - `find -3`: Search for files with a specific three.
  - `find -4`: Search for files with a specific four.
  - `find -5`: Search for files with a specific five.
  - `find -type`: Search for files with a specific type.
  - `find -name`: Search for files with a specific name.
  - `find -iname`: Search for files with a specific name with ignore case.
  - `find -path`: Search for files with a specific path.
  - `find -ipath`: Search for files with a specific path with ignore case.
  - `find -regex`: Search for files with a specific regex.
  - `find -iregex`: Search for files with a specific regex with ignore case.
  - `find -size`: Search for files with a specific size.

**which**: Locate a command. Displays the complete path of a specified command by searching the directories assigned to the PATH environment variable.
**whereis**: Locate a command. Displays the complete path of a specified command by searching the directories assigned to the PATH environment variable.

- **locate**: Find files by name.
- **updatedb**: Update the locate database.Used to build a database of files based on the /etc/updatedb.conf configuration file.
  updatedb is used to update the /var/lib/mlocate/mlocate.db database used by the locate command.
  - `PRUNEPATHS`: List of paths to exclude from the database.
- **Commands**:

  - `locate`: Find files by name.
  - `locate -A`: Find files with all.
  - `locate -b`: Find files with basename.
  - `locate -c`: Find files with count.
  - `locate -d`: Find files with database.
  - `locate -e`: Find files with existing.
  - `locate -f`: Find files with file.
  - `locate -i`: Find files with ignore case.
  - `locate -l`: Find files with limit.
  - `locate -m`: Find files with match.
  - `locate -p`: Find files with path.
  - `locate -r`: Find files with regex.
  - `locate -s`: Find files with statistics.
  - `locate -S`: Find files with sort.
  - `locate -t`: Find files with time.
  - `locate -u`: Find files with update.
  - `locate -v`: Find files with verbose.
  - `locate -w`: Find files with whitespace.
  - `locate -x`: Find files with regex.
  - `locate -y`: Find files with any.

- **grep**: Search for patterns in files.
- **Commands**:

  - `grep`: Search for patterns in files.
  - `grep -A`: Search for patterns with after.
  - `grep -B`: Search for patterns with before.
  - `grep -C`: Search for patterns with context.
  - `grep -D`: Search for patterns with devices.
  - `grep -E`: Search for patterns with extended regex.
  - `grep -F`: Search for patterns with fixed strings.
  - `grep -G`: Search for patterns with basic regex.
  - `grep -H`: Search for patterns with filename.
  - `grep -I`: Search for patterns with binary files.
  - `grep -L`: Search for patterns with files without matches.
  - `grep -l`: Search for patterns with files with matches.
  - `grep -m`: Search for patterns with max count.
  - `grep -n`: Search for patterns with line number.
  - `grep -o`: Search for patterns with only matches.
  - `grep -q`: Search for patterns with quiet.
  - `grep -r`: Search for patterns recursively.
  - `grep -s`: Search for patterns with silent.
  - `grep -v`: Search for patterns without matches.
  - `grep -w`: Search for patterns with whole words.
  - `grep -x`: Search for patterns with exact matches.
  - `grep -y`: Search for patterns with any.

- **awk**: Pattern scanning and processing language.
- **Commands**:

  - `awk`: Pattern scanning and processing language.
  - `awk -F`: Pattern scanning and processing language with field separator.
  - `awk -v`: Pattern scanning and processing language with variable.
  - `awk -f`: Pattern scanning and processing language with file.
  - `awk -W`: Pattern scanning and processing language with warning.
  - `awk -d`: Pattern scanning and processing language with debug.
  - `awk -i`: Pattern scanning and processing language with include.
  - `awk -l`: Pattern scanning and processing language with library.
  - `awk -L`: Pattern scanning and processing language with lint.
  - `awk -n`: Pattern scanning and processing language with non-decimal.
  - `awk -N`: Pattern scanning and processing language with non-decimal.
  - `awk -p`: Pattern scanning and processing language with profiling.
  - `awk -q`: Pattern scanning and processing language with quick.
  - `awk -r`: Pattern scanning and processing language with re-interval.
  - `awk -s`: Pattern scanning and processing language with safe.
  - `awk -S`: Pattern scanning and processing language with sandbox.
  - `awk -t`: Pattern scanning and processing language with traditional

- **sed/stream editor**: Stream editor for filtering and transforming text.
- **Commands**:

  - `sed`: Stream editor for filtering and transforming text.
  - `sed -e`: Stream editor for filtering and transforming text with expression.
  - `sed -f`: Stream editor for filtering and transforming text with file.
  - `sed -i`: Stream editor for filtering and transforming text with in-place.
  - `sed -n`: Stream editor for filtering and transforming text with quiet.
  - `sed -r`: Stream editor for filtering and transforming text with extended regex.
  - `sed -s`: Stream editor for filtering and transforming text with separate.
  - `sed -u`: Stream editor for filtering and transforming text with unbuffered.
  - `sed -z`: Stream editor for filtering and transforming text with zero.

  **link/ln**: Create a link to a file.
  **Commands**:

  - `ln`: Create a link to a file.
  - `ln -b`: Create a link to a file with backup.
  - `ln -d`: Create a link to a file with directory.
  - `ln -f`: Create a link to a file with force.
  - `ln -i`: Create a link to a file with interactive.
  - `ln -L`: Create a link to a file with logical.
  - `ln -n`: Create a link to a file with no-dereference.
  - `ln -P`: Create a link to a file with physical.
  - `ln -backup`: Create a link to a file with backup.

  - **hard link**: A link that points to the inode of a file. Hard links are used to create multiple references to a file. Hard links cannot be created for directories. Hard links cannot span filesystems.

  - example: `ln file1 file2` creates a hard link to file1 called file2.

    If the origional file or directory is deleted after a hard link is created, the contents will still be available through the hard link.

- **soft link / symbolic link**: A link that points to the path of a file. Soft links are used to create a shortcut to a file. Soft links can be created for directories. Soft links can span filesystems.

- example: `ln -s file1 file2` creates a soft link to file1 called file2.

  If the original file or directory is deleted after a soft link is created, the contents will not be available through the soft link.

- **sort**: Sort lines of text files.
- **Commands**:

  - `sort`: Sort lines of text files.
  - `sort -b`: Sort lines of text files with ignore leading blanks.
  - `sort -c`: Sort lines of text files with check.
  - `sort -C`: Sort lines of text files with check.
  - `sort -d`: Sort lines of text files with dictionary order.
  - `sort -f`: Sort lines of text files with ignore case.
  - `sort -g`: Sort lines of text files with general numeric.
  - `sort -h`: Sort lines of text files with human numeric.
  - `sort -i`: Sort lines of text files with ignore nonprinting.
  - `sort -k`: Sort lines of text files with key.
  - `sort -m`: Sort lines of text files with merge.
  - `sort -M`: Sort lines of text files with month.
  - `sort -n`: Sort lines of text files with numeric.
  - `sort -o`: Sort lines of text files with output.
  - `sort -r`: Sort lines of text files with reverse.
  - `sort -R`: Sort lines of text files with random.
  - `sort -t`: Sort lines of text files with field separator.
  - `sort -u`: Sort lines of text files with unique.
  - `sort -V`: Sort lines of text files with version.
  - `sort -z`: Sort lines of text files with zero.

- **uniq**: Report or omit repeated lines.
- **Commands**:

  - `uniq`: Report or omit repeated lines.
  - `uniq -c`: Report or omit repeated lines with count.
  - `uniq -d`: Report or omit repeated lines with duplicates.
  - `uniq -D`: Report or omit repeated lines with all duplicates.
  - `uniq -f`: Report or omit repeated lines with skip fields.
  - `uniq -i`: Report or omit repeated lines with ignore case.
  - `uniq -s`: Report or omit repeated lines with skip characters.
  - `uniq -u`: Report or omit repeated lines with unique.
  - `uniq -w`: Report or omit repeated lines with check characters.

- **cut**: Remove sections from each line of files.
- **Commands**:

  - `cut`: Remove sections from each line of files.
  - `cut -b`: Remove sections from each line of files with bytes.
  - `cut -c`: Remove sections from each line of files with characters.
  - `cut -d`: Remove sections from each line of files with delimiter.
  - `cut -f`: Remove sections from each line of files with fields.
  - `cut -n`: Remove sections from each line of files with characters and bytes.
  - `cut -s`: Remove sections from each line of files with suppress.

- **paste**: Merge lines of files.
- **Commands**:

  - `paste`: Merge lines of files.
  - `paste -d`: Merge lines of files with delimiter.
  - `paste -s`: Merge lines of files with serial.

- **join**: Join lines of two files on a common field.
- **Commands**:

  - `join`: Join lines of two files on a common field.
  - `join -a`: Join lines of two files on a common field with all.
  - `join -e`: Join lines of two files on a common field with empty.
  - `join -i`: Join lines of two files on a common field with ignore case.
  - `join -j`: Join lines of two files on a common field with field.
  - `join -o`: Join lines of two files on a common field with output.
  - `join -t`: Join lines of two files on a common field with delimiter.
  - `join -v`: Join lines of two files on a common field with not matches.

- **comm**: Compare two sorted files line by line.
- **Commands**:

  - `comm`: Compare two sorted files line by line.
  - `comm -1`: Compare two sorted files line by line with suppress.
  - `comm -2`: Compare two sorted files line by line with suppress.
  - `comm -3`: Compare two sorted files line by line with suppress.
  - `comm -i`: Compare two sorted files line by line with ignore case.
  - `comm -o`: Compare two sorted files line by line with output.
  - `comm -z`: Compare two sorted files line by line with zero.

- **diff**: Compare files line by line.
- **Commands**:

  - `diff`: Compare files line by line.
  - `diff -a`: Compare files line by line with text.
  - `diff -b`: Compare files line by line with ignore space.
  - `diff -B`: Compare files line by line with ignore blank lines.
  - `diff -c`: Compare files line by line with context.
  - `diff -C`: Compare files line by line with context.
  - `diff -d`: Compare files line by line with minimal.
  - `diff -D`: Compare files line by line with minimal.
  - `diff -e`: Compare files line by line with ed.
  - `diff -f`: Compare files line by line with forward.
  - `diff -F`: Compare files line by line with forward.
  - `diff -h`: Compare files line by line with horizontal.
  - `diff -i`: Compare files line by line with ignore case.
  - `diff -l`: Compare files line by line with minimal.
  - `diff -n`: Compare files line by line with minimal.
  - `diff -N`: Compare files line by line with minimal.
  - `diff -p`: Compare files line by line with context.
  - `diff -P`: Compare files line by line with context.
  - `diff -q`: Compare files line by line with brief.
  - `diff -r`: Compare files line by line recursively.
  - `diff -s`: Compare files line by line with summary.
  - `diff -t`: Compare files line by line with expand tabs.
  - `diff -u`: Compare files line by line with unified.
  - `diff -U`: Compare files line by line with unified.
  - `diff -v`: Compare files line by line with version.
  - `diff -w`: Compare files line by line with ignore all space.
  - `diff -x`: Compare files line by line with exclude.
  - `diff -X`: Compare files line by line with exclude.
  - `diff -y`: Compare files line by line with side by side.
  - `diff -Z`: Compare files line by line with ignore white space.

- **patch**: Apply a diff file to an original.
- **Commands**:
  - `patch`: Apply a diff file to an original.
  - `patch -b`: Apply a diff file to an original with backup.
  - `patch -c`: Apply a diff file to an original with context.
  - `patch -d`: Apply a diff file to an original with directory.
  - `patch -D`: Apply a diff file to an original with directory.
  - `patch -e`: Apply a diff file to an original with ed.
  - `patch -f`: Apply a diff file to an original with force.
  - `patch -g`: Apply a diff file to an original with get.
  - `patch -i`: Apply a diff file to an original with input.
  - `patch -l`: Apply a diff file to an original with ignore whitespace.
  - `patch -n`: Apply a diff file to an original with dry run.
  - `patch -N`: Apply a diff file to an original with forward.
  - `patch -o`: Apply a diff file to an original with output.
  - `patch -p`: Apply a diff file to an original with strip.
  - `patch -r`: Apply a diff file to an original with reject.
  - `patch -R`: Apply a diff file to an original with reverse.
  - `patch -s`: Apply a diff file to an original with silent.
  - `patch -t`: Apply a diff file to an original with batch.
  - `patch -u`: Apply a diff file to an original with unified.
  - `patch -v`: Apply a diff file to an original with verbose.
  - `patch -V`: Apply a diff file to an original with version.
  - `patch -x`: Apply a diff file to an original with exclude.
  - `patch -X`: Apply a diff file to an original with exclude.
  - `patch -y`: Apply a diff file to an original with side by side.
  - `patch -z`: Apply a diff file to an original with ignore white space.

**cat**: Concatenate files and print on the standard output.
**Commands**:

- `cat`: Concatenate files and print on the standard output.
- `cat -A`: Concatenate files and print on the standard output with all.
- `cat -b`: Concatenate files and print on the standard output with non-empty.
- `cat -e`: Concatenate files and print on the standard output with end.
- `cat -E`: Concatenate files and print on the standard output with end.
- `cat -n`: Concatenate files and print on the standard output with number.
- `cat -s`: Concatenate files and print on the standard output with squeeze.
- `cat -t`: Concatenate files and print on the standard output with tabs.

**head**: Output the first part of files.
**Commands**:

- `head`: Output the first part of files.
- `head -c`: Output the first part of files with bytes.
- `head -n`: Output the first part of files with lines.

**tail**: Output the last part of files.
**Commands**:

- `tail`: Output the last part of files.
- `tail -c`: Output the last part of files with bytes.
- `tail -f`: Output the last part of files with follow.
- `tail -n`: Output the last part of files with lines.

**tee**: Read from standard input and write to standard output and files.
**Commands**:

- `tee`: Read from standard input and write to standard output and files.
- `tee -a`: Read from standard input and write to standard output and files with append.

**more**: Display output one screen at a time.
**Commands**:

- `more`: Display output one screen at a time.
- `more -d`: Display output one screen at a time with prompt.
- `more -f`: Display output one screen at a time with form feed.
- `more -l`: Display output one screen at a time with lines.
- `more -p`: Display output one screen at a time with percentage.
- `more -s`: Display output one screen at a time with silent.

**less**: Display output one screen at a time.
**Commands**:

- `less`: Display output one screen at a time.
- `less -b`: Display output one screen at a time with buffer.
- `less -c`: Display output one screen at a time with clear.
- `less -e`: Display output one screen at a time with quit.
- `less -f`: Display output one screen at a time with force.
- `less -g`: Display output one screen at a time with search.

**wc**: Print newline, word, and byte counts for each file.
**Commands**:

- `wc`: Print newline, word, and byte counts for each file.
- `wc -c`: Print newline, word, and byte counts for each file with bytes.
- `wc -l`: Print newline, word, and byte counts for each file with lines.
- `wc -m`: Print newline, word, and byte counts for each file with characters.
- `wc -w`: Print newline, word, and byte counts for each file with words.

**tr**: Translate or delete characters.
**Commands**:

- `tr`: Translate or delete characters. Performs operations like removing repeated characters, converting uppercase to lowercase, and basic character replacement and removal.
- `tr -c`: Translate or delete characters with complement.
- `tr -d`: Translate or delete characters with delete.
- `tr -s`: Translate or delete characters with squeeze.

**socat**: Multipurpose relay for bidirectional data transfer.
**Commands**:

- `socat`: Multipurpose relay for bidirectional data transfer.
- `socat -b`: Multipurpose relay for bidirectional data transfer with buffer.
- `socat -c`: Multipurpose relay for bidirectional data transfer with close.
- `socat -d`: Multipurpose relay for bidirectional data transfer with debug.
- `socat -e`: Multipurpose relay for bidirectional data transfer with exit.
- `socat -f`: Multipurpose relay for bidirectional data transfer with file.

**xargs**: Build and execute command lines from standard input.
**Commands**:

- `xargs`: Build and execute command lines from standard input.
- `xargs -0`: Build and execute command lines from standard input with null.
- `xargs -a`: Build and execute command lines from standard input with file.
- `xargs -d`: Build and execute command lines from standard input with delimiter.
- `xargs -E`: Build and execute command lines from standard input with exit.
- `xargs -I`: Build and execute command lines from standard input with replace.
- `xargs -L`: Build and execute command lines from standard input with lines.
- `xargs -n`: Build and execute command lines from standard input with max-args.
- `xargs -P`: Build and execute command lines from standard input with max-procs.

**standard input/output**

- **stdin**: Standard input. The default input device is the keyboard.
- `>`: Redirect output to a file.
- `>>`: Append output to a file.
- `<`: Redirect input from a file.
- `<<`: Redirect input from a string.
- `|`: Pipe output to another command.
- `2>`: Redirect error output to a file.
- `2>>`: Append error output to a file.
- `2>&1`: Redirect error output to the same location as standard output.
- `&>`: Redirect all output to a file.
- `&>>`: Append all output to a file.
- `2>&1 | tee error.log`: Redirect error output to the same location as standard output and save it to a file.
- `command > file 2>&1`: Redirect standard output and error output to a file.
- `command 2>&1 > file`: Redirect error output to the same location as standard output and save it to a file.
- `command 2>&1 | tee file`: Redirect error output to the same location as standard output and save it to a file.
- `command 2>&1 | tee -a file`: Redirect error output to the same location as standard output and append it to a file.
- `command 2>&1 | tee file1 | tee file2`: Redirect error output to the same location as standard output and save it to multiple files.

- **stdout**: Standard output. The default output device is the terminal.
- **stderr**: Standard error. The default error output device is the terminal.

**Kernel Modules**

- **lsmod**: Show the status of kernel modules in the Linux kernel.
- **modinfo**: Show information about a kernel module.
- **modprobe**: Add or remove a module from the Linux kernel.
- `modprobe -r`: Remove a module from the Linux kernel.
- `modprobe -v`: Show verbose output.
- `modprobe -c`: Show configuration information.
- `/etc/modprobe.d`: Directory containing configuration files for modprobe. Can also create a blocklist.
- **insmod**: Insert a module into the Linux kernel.
- **rmmod**: Remove a module from the Linux kernel.
- **depmod**: Generate a list of module dependencies. Searches the contents of /lib/modules/ for each module
- **modprobe.d**: Directory containing configuration files for modprobe.
- **/etc/modules**: File containing a list of modules to load at boot time.
- **/etc/modules-load.d**: Directory containing configuration files for modules to load at boot time.
- **/lib/modules**: Directory containing kernel modules.
- **/lib/modules/$(uname -r)**: Directory containing kernel modules for the current kernel.
- **/lib/modules/$(uname -r)/kernel**: Directory containing kernel modules.
- **/lib/modules/$(uname -r)/kernel/drivers**: Directory containing kernel drivers.

**The Linux Boot Process**

- **Booting**: Process of starting or restarting a computer and loading an operating system.
- **Boot Loader**: Software stored in ROM that loads the operating system (kernel) into memory during the boot process from a storage device.
  - Boot loaders protect the boot process with a password.
    - Boot Sector Program: Loads the second boot loader on startup.
    - Second Stage Boot loader: Loads the operating system and contains a kernel loader.
    - Boot Loader Installer: Controls the installation of drive sectors and runs only when booting.
- **Kernel**: Core component of an operating system that manages system resources and provides a foundation for applications.

- **BIOS**: Basic Input/Output System. The BIOS is the firmware used to perform hardware initialization during the booting process.
- **UEFI**: Unified Extensible Firmware Interface. UEFI is a modern replacement for BIOS that provides more advanced features. Operates with a greater amount of memory, access storage drives and
  hardware types, and has improved security features. Both BIOS and UEFI include the ability to set a password.
- **(PXE) Preboot eXecution Environment**: Enables a client to retrieve the necessary boot loader and system files from a server over the network.
- Booting from NFS: Network File System. Booting from NFS allows a client to retrieve the necessary boot loader and system files from a server over the network.
- **MBR**: Master Boot Record. The MBR is the first sector of a storage device and contains the boot loader.
- **GPT**: GUID Partition Table. GPT is a modern replacement for MBR that provides more advanced features.
- **GRUB**: Grand Unified Bootloader. GRUB is a popular boot loader used in Linux distributions.
- **Raw Partition**: Enables users and applications to read from and write to a block storage without using the system cache. Raw partitions are used for high-performance applications.
- **initramfs**: Initial RAM Filesystem. The initramfs is a temporary file system loaded into memory during the boot process.
- **initrd**: Initial RAM Disk. The initrd is a temporary file system loaded into memory during the boot process.
- **net**: Contains modules for networking compontents. The network is used to download files during the boot process.
- **/boot**: Directory containing the kernel and initramfs files.
- **mkinitrd**: Command used to create an initrd image for preloading the kernel modules.
- `mkinitrd -f`: Force the creation of an initrd image.
- `mkinitrd -k`: Specify the kernel version.
- `mkinitrd -v`: Verbose output.
- `mkinitrd -r`: Specify the root directory.
- `mkinitrd -d`: Specify the directory containing the modules.
- `mkinitrd --preload=module1,module2`: Create an initrd image with preloaded modules.
- `mkinitrd --with=module1,module2`: Create an initrd image with included modules.
- `mkinitrd --omit=module1,module2`: Create an initrd image with omitted modules.
- **dracut**: Command used to create an initramfs image for preloading the kernel modules.
- **dracut --add=module1,module2**: Create an initramfs image with included modules.
- **dracut --omit=module1,module2**: Create an initramfs image with omitted modules.

- **/boot/grub**: Directory containing GRUB configuration files.
- **/boot/efi**: Directory containing EFI files. EFI is a modern replacement for BIOS that provides more advanced features. EFI is used to boot the operating system.
- **/etc/default/grub**: GRUB configuration file.
- **/etc/grub.d**: Directory containing GRUB configuration scripts.
- **/etc/grub.d/00_header**: GRUB configuration script.
- **/etc/grub.d/10_linux**: GRUB configuration script.
  To add a custom script in the directory, place the ##\_file name prefix in the file name.
  ex: 11_custom
  **/etc/grub.d/40_custom**: GRUB configuration script. Custom scripts are used to add custom menu entries to the GRUB menu.
- **/boot/grub/grub.cfg**: GRUB configuration file.
- **/etc/fstab**: File containing filesystem information.
- **/etc/crypttab**: File containing encrypted filesystem information.
- **/etc/default/grub**: File containing GRUB configuration settings.
- **/boot/initramfs-<kernel version>.img**: File containing the initramfs image. The initramfs is a temporary file system loaded into memory during the boot process. The initramfs contains the necessary kernel modules to mount the root filesystem.
- **/boot/vmlinuz-<kernel version>**: File containing the Linux kernel. The kernel is the core component of an operating system that manages system resources and provides a foundation for applications.
- **/boot/vmlinux-<kernel version>**: File containing the Linux kernel. The kernel is the core component of an operating system that manages system resources and provides a foundation for applications.

- **/etc/initramfs-tools/initramfs.conf**: File containing initramfs configuration settings.
- **/etc/initramfs-tools/modules**: File containing a list of modules to include in the initramfs.
- **grub2**: Directory containing GRUB configuration files. GRUB is a popular boot loader used in Linux distributions.
- **grub2-install**: Command used to install GRUB. GRUB is a popular boot loader used in Linux distributions.
- **grub2-mkconfig**: Command used to generate the GRUB configuration file. GRUB is a popular boot loader used in Linux distributions.
- **grub2-mknetdir**: Command used to create a GRUB network directory. GRUB is a popular boot loader used in Linux distributions.

**/etc/sysctl.conf**: Enables configuration changes to a running Linux kernel.
**/etc/sysctl.d**: Directory containing configuration files for sysctl.
**sysctl**: Command used to view and modify kernel parameters at runtime.
**sysctl.conf**: File containing kernel parameters.
**sysctl.d**: Directory containing configuration files for sysctl.
**/proc/sys**: Directory containing kernel parameters.
**/proc/sys/kernel**: Directory containing kernel parameters.
**/proc/sys/net**: Directory containing network parameters.
**/proc/sys/net/ipv4**: Directory containing IPv4 parameters.
**/proc/sys/net/ipv6**: Directory containing IPv6 parameters.
**/proc/sys/net/ipv4/ip_forward**: File containing the value of the IPv4 forwarding parameter.
**/proc/sys/net/ipv4/ip_forwarding**: File containing the value of the IPv4 forwarding parameter.
**/proc/cmdline**: Contains options passed to the kernel by the boot loader.
**/proc/modules**: Contains a list of currently loaded kernel modules.
**/proc/version**: Contains the version of the Linux kernel.
**/proc/cpuinfo**: Contains information about the CPU.
**/proc/meminfo**: Contains information about memory usage.

- **MemTotal**: Total memory available.
- **MemFree**: Free memory available.
- **MemAvailable**: Memory available for starting new applications.
- **Buffers**: Memory used for disk buffers.
- **Cached**: Memory used for disk cache.
- **SwapCached**: Memory used for swap cache.
- **Active**: Memory used by active processes.
- **Inactive**: Memory used by inactive processes.
- **Active(anon)**: Memory used by active anonymous memory.
- **Inactive(anon)**: Memory used by inactive anonymous memory.
  **/proc/mounts**: Contains a list of mounted filesystems.
  **/proc/partitions**: Contains a list of disk partitions.
  **/proc/devices**: Contains a list of device drivers.
  **/proc/stat**: Contains system statistics.
  **/proc/filesystems**: Contains a list of filesystem types.
  **/proc/sysrq-trigger**: File used to trigger SysRq commands.
  **/proc/sys/kernel/sysrq**: File containing the value of the SysRq parameter.

**System compontents**

- **Localization**: Adpating system compontents for use within a distinct culture.
- **/usr/share/zoneinfo**: A container for all the regional time zones the system can use.
- Create a symbolic link to one of the individual time zone files to the /etc/localtime file.
- **/etc/timezone**: List the time zone by the region structure seen in the /usr/share/zoneinfo directory. (Debian-based systems)
- **date**: Prints the date in a specified format based on the /etc/localtime file.
- **options**
- **date +%A**: Prints the day of the week.
- **date +%B**: Prints the month.
- **date +%d**: Prints the day.
- **date +%T**: Prints the time.
- **date +%Z**: Prints the time zone.
- **date +%Y**: Prints the year.
- **date +%A%B%d%T%Z%Y**: Prints the date and time in a specific format.
-
- <day of the week><month><day><24-hour time ##:##:##><time zone><year>
- **/etc/localtime**: File containing the system time zone.

- **timedatectl**: Command used to control the system time and date settings.
- **timedatectl set-timezone**: Command used to set the system time zone.
- **timedatectl list-timezones**: Command used to list available time zones.
- **localectl**: Command used to control the system locale settings as well as keyboard layout settings.
- **localectl set-locale**: Command used to set the system locale.
- **localectl list-locales**: Command used to list available locales.
- **localectl list-keymaps**: Command used to list available keymaps.
- **localectl set-keymap**: Command used to set the system keymap.
- **localectl set-x11-keymap**: Command used to set the system X11 keymap.
- **localectl set-locale LANG=en_US.UTF-8**: Set the system locale to en_US.UTF-8.
- **localectl set-keymap us**: Set the system keymap to us.
- **localectl set-x11-keymap us**: Set the system X11 keymap to us.
- **/etc/locale.conf**: File containing the system locale settings.
- **/etc/vconsole.conf**: File containing the system console settings.
- **/etc/default/keyboard**: File containing the system keyboard settings. (Debian-based systems)
- **/etc/sysconfig/keyboard**: File containing the system keyboard settings. (Red Hat-based systems)
- **/etc/sysconfig/i18n**: File containing the system locale settings. (Red Hat-based systems)
- **/etc/sysconfig/clock**: File containing the system clock settings. (Red Hat-based systems)
- **hwclock**: Command used to display or set the hardware clock.
- **hwclock --systohc**: Command used to set the hardware clock to the system time.
- **systematic drift**: The predictable amount of time that the hardware clock gains or loses each day.
- **/etc/adjtime**: File containing the systematic drift of the hardware clock.
- **/etc/hostname**: File containing the system hostname.
- **hostnamectl**: Command used to control the system hostname settings.
- **hostnamectl set-hostname**: Command used to set the system hostname.
- **hostnamectl set-hostname server1**: Set the system hostname to server1.
- **hostname**: Command used to display the system hostname.
- **/etc/hosts**: File containing static hostname-to-IP address mappings.
- **/etc/hostname**: File containing the system hostname.
- **/etc/hostname.eth0**: File containing the hostname for the eth0 interface.
- **/etc/hostname.wlan0**: File containing the hostname for the wlan0 interface.

- **SysVinit**: System V initialization. SysVinit is a legacy system initialization process used in older Linux distributions.
- **/etc/inittab**: File containing the system initialization configuration.
- **/etc/init.d**: Directory containing SysVinit scripts.
- **/etc/rc.d**: Directory containing SysVinit scripts.
- **/etc/rc.local**: File containing commands to run at boot time.
- **/etc/rc.local.d**: Directory containing scripts to run at boot time.
- **service status**: Command used to display the status of a service.
- **service start**: Command used to start a service.
- **service stop**: Command used to stop a service.
- **service restart**: Command used to restart a service.
- **service reload**: Command used to reload a service.

- **systemd**: System and service manager. systemd is a modern system initialization process used in newer Linux distributions.
- **systemctl**: Command used to control systemd services.
- **systemctl start**: Command used to start a service.
- **systemctl stop**: Command used to stop a service.
- **systemctl restart**: Command used to restart a service.
- **systemctl reload**: Command used to reload a service.
- **systemctl status**: Command used to display the status of a service.
- **systemctl enable**: Command used to enable a service.
- **systemctl disable**: Command used to disable a service.
- **systemctl list-units**: Command used to list all active units.
- **systemctl list-unit-files**: Command used to list all available units.
- **systemctl list-dependencies**: Command used to list a unit's dependencies.
- **systemctl list-jobs**: Command used to list active jobs.
- **systemctl list-sockets**: Command used to list active sockets.
- **systemctl mask**: Command used to mask a service.
- **systemctl isolate**: Command used to isolate a unit.
- **systemctl set-default**: Command used to set the default target.
- **systemctl daemon-reload**: Command used to reload systemd configuration.

- **uptime**: Command used to display the system uptime.
- **sar**: Command used to display system activity reports.
- **vmstat**: Command used to display virtual memory statistics.
- **free**: Command used to display memory usage statistics.

- **Out-of-memory (OOM) Killer**: A Linux kernel feature that terminates processes when the system runs out of memory.
- **/proc/sys/vm/overcommit_memory**: File containing the overcommit memory setting.
- **/proc/sys/vm/overcommit_ratio**: File containing the overcommit ratio setting.
- **/proc/sys/vm/overcommit_kbytes**: File containing the overcommit memory setting in kilobytes.
- **/proc/sys/vm/oom_kill_allocating_task**: File containing the OOM killer setting.
- **/proc/sys/vm/panic_on_oom**: File containing the panic on OOM setting.
- **/proc/sys/vm/oom_score_adj**: File containing the OOM score adjustment setting.

**Process Issues**

- **Running State**: The process is currently executing in user space or kernel space.
- **Interruptible Sleeping State**: The process is waiting for an event to occur.
- **Uninterruptible Sleeping State**: The process is waiting for an event to occur and cannot be interrupted.
- **Zombie State**: The process has completed execution but still has an entry in the process table.
- **Stopped State**: The process has been stopped by a signal.

- **ps**: Report a snapshot of the current processes.
- **Commands**:

  - `ps`: Report a snapshot of the current processes.
  - `ps -A`: Report a snapshot of the current processes with all users.
  - `ps -a`: Report a snapshot of the current processes with terminals.
  - `ps -e`: Report a snapshot of the current processes with all users.
  - `ps -f`: Report a snapshot of the current processes with full format.
  - `ps -H`: Report a snapshot of the current processes with hierarchy.
  - `ps -l`: Report a snapshot of the current processes with long format.
  - `ps -N`: Report a snapshot of the current processes with negated selection.
  - `ps -o`: Report a snapshot of the current processes with user-defined format.
  - `ps -p`: Report a snapshot of the current processes with process ID.
  - `ps -t`: Report a snapshot of the current processes with terminal.
  - `ps -u`: Report a snapshot of the current processes with user.
  - `ps -x`: Report a snapshot of the current processes with all users.
  - `ps -Z`: Report a snapshot of the current processes with SELinux security context.

- **top**: Display Linux processes.
- **Commands**:

  - `top`: Display Linux processes. Developed in 1984, top is a process viewer that provides a real-time view of system processes.
  - `top -d`: Display Linux processes with delay.
  - `top -H`: Display Linux processes with threads.
  - `top -i`: Display Linux processes with idle.
  - `top -p`: Display Linux processes with PID.
  - `top -s`: Display Linux processes with secure.
  - `top -S`: Display Linux processes with cumulative mode.
  - `top -u`: Display Linux processes with user.
  - `top -U`: Display Linux processes with user.
  - `top -v`: Display Linux processes with version.
  - `top -w`: Display Linux processes with wide.
  - `top -Z`: Display Linux processes with SELinux security context.

- **htop**: Interactive process viewer. Developed in 2004, htop is a process viewer that provides a more user-friendly interface than the top command.
  htop is not installed by default on most Linux distributions.
- **Commands**:

  - `htop`: Interactive process viewer.
  - `htop -d`: Interactive process viewer with delay.
  - `htop -p`: Interactive process viewer with PID.
  - `htop -s`: Interactive process viewer with secure.
  - `htop -u`: Interactive process viewer with user.
  - `htop -U`: Interactive process viewer with user.
  - `htop -v`: Interactive process viewer with version.
  - `htop -w`: Interactive process viewer with wide.
  - `htop -Z`: Interactive process viewer with SELinux security context.

  - **systemd-analyze**: retrieves performance statistics for boot operations.
  - **Commands**:

    - `systemd-analyze`: retrieves performance statistics for boot operations.
    - `systemd-analyze blame`: retrieves performance statistics for boot operations with blame.
    - `systemd-analyze critical-chain`: retrieves performance statistics for boot operations with critical chain.
    - `systemd-analyze dot`: retrieves performance statistics for boot operations with dot.
    - `systemd-analyze plot`: retrieves performance statistics for boot operations with plot.
    - `systemd-analyze set-log-level`: retrieves performance statistics for boot operations with set log level.
    - `systemd-analyze time`: retrieves performance statistics for boot operations with time.

- **systemd-cgtop**: displays the control group hierarchy top.
- **Commands**:

  - `systemd-cgtop`: displays the control group hierarchy top.
  - `systemd-cgtop -a`: displays the control group hierarchy top with all.
  - `systemd-cgtop -b`: displays the control group hierarchy top with batch.
  - `systemd-cgtop -c`: displays the control group hierarchy top with cpu.
  - `systemd-cgtop -m`: displays the control group hierarchy top with memory.
  - `systemd-cgtop -n`: displays the control group hierarchy top with no-header.
  - `systemd-cgtop -p`: displays the control group hierarchy top with path.
  - `systemd-cgtop -r`: displays the control group hierarchy top with raw.
  - `systemd-cgtop -s`: displays the control group hierarchy top with sort.
  - `systemd-cgtop -t`: displays the control group hierarchy top with tree.
  - `systemd-cgtop -u`: displays the control group hierarchy top with user.

- **systemd-cgls**: displays the control group hierarchy list.
- **Commands**:

  - `systemd-cgls`: displays the control group hierarchy list.
  - `systemd-cgls -a`: displays the control group hierarchy list with all.
  - `systemd-cgls -l`: displays the control group hierarchy list with long.
  - `systemd-cgls -r`: displays the control group hierarchy list with raw.
  - `systemd-cgls -t`: displays the control group hierarchy list with tree.

  - **lsof**: Prints a list of all files currently opened to all active processes.
  - **Commands**:

    - `lsof`: Prints a list of all files currently opened to all active processes.
    - `lsof -a`: Prints a list of all files currently opened to all active processes with and.
    - `lsof -b`: Prints a list of all files currently opened to all active processes with kernel.
    - `lsof -c`: Prints a list of all files currently opened to all active processes with command.
    - `lsof -d`: Prints a list of all files currently opened to all active processes with device.
    - `lsof -g`: Prints a list of all files currently opened to all active processes with group.
    - `lsof -i`: Prints a list of all files currently opened to all active processes with internet.
    - `lsof -k`: Prints a list of all files currently opened to all active processes with kernel.
    - `lsof -l`: Prints a list of all files currently opened to all active processes with link.
    - `lsof -n`: Prints a list of all files currently opened to all active processes with no.
    - `lsof -p`: Prints a list of all files currently opened to all active processes with process.
    - `lsof -r`: Prints a list of all files currently opened to all active processes with repeat.
    - `lsof -t`: Prints a list of all files currently opened to all active processes with terse.
    - `lsof -u`: Prints a list of all files currently opened to all active processes with user.
    - `lsof -w`: Prints a list of all files currently opened to all active processes with warnings.
    - `lsof -x`: Prints a list of all files currently opened to all active processes with exact.

- **fuser**: Identify processes using files or sockets.
- **Commands**:

  - `fuser`: Identify processes using files or sockets.
  - `fuser -a`: Identify processes using files or sockets with all.
  - `fuser -c`: Identify processes using files or sockets with command.
  - `fuser -k`: Identify processes using files or sockets with kill.
  - `fuser -m`: Identify processes using files or sockets with mount.
  - `fuser -n`: Identify processes using files or sockets with network.
  - `fuser -u`: Identify processes using files or sockets with user.
  - `fuser -v`: Identify processes using files or sockets with verbose.

- **pgrep**: Look up or signal processes based on name and other attributes.
- **Commands**:

  - `pgrep`: Look up or signal processes based on name and other attributes.
  - `pgrep -a`: Look up or signal processes based on name and other attributes with full.
  - `pgrep -d`: Look up or signal processes based on name and other attributes with delimiter.
  - `pgrep -f`: Look up or signal processes based on name and other attributes with full.
  - `pgrep -l`: Look up or signal processes based on name and other attributes with long.
  - `pgrep -n`: Look up or signal processes based on name and other attributes with newest.
  - `pgrep -o`: Look up or signal processes based on name and other attributes with oldest.
  - `pgrep -P`: Look up or signal processes based on name and other attributes with parent.
  - `pgrep -t`: Look up or signal processes based on name and other attributes with terminal.
  - `pgrep -u`: Look up or signal processes based on name and other attributes with effective user.
  - `pgrep -v`: Look up or signal processes based on name and other attributes with inverse.

  - **pidof**: Find the process ID of a running program.

- **Commands**:

  - `pidof`: Find the process ID of a running program.
  - `pidof -c`: Find the process ID of a running program with count.
  - `pidof -o`: Find the process ID of a running program with omit.
  - `pidof -s`: Find the process ID of a running program with single.
  - `pidof -x`: Find the process ID of a running program with exact.

- **pkill**: Look up or signal processes based on name and other attributes.
- **Commands**:

  - `pkill`: Look up or signal processes based on name and other attributes.
  - `pkill -f`: Look up or signal processes based on name and other attributes with full.
  - `pkill -g`: Look up or signal processes based on name and other attributes with group.
  - `pkill -n`: Look up or signal processes based on name and other attributes with newest.
  - `pkill -o`: Look up or signal processes based on name and other attributes with oldest.
  - `pkill -P`: Look up or signal processes based on name and other attributes with parent.
  - `pkill -t`: Look up or signal processes based on name and other attributes with terminal.
  - `pkill -u`: Look up or signal processes based on name and other attributes with effective user.
  - `pkill -v`: Look up or signal processes based on name and other attributes with inverse.

- **kill**: Send a signal to a process.
- **Commands**:

  - `kill`: Send a signal to a process.
  - `kill -l`: Send a signal to a process with list.
  - `kill -s`: Send a signal to a process with signal.
  - `kill -n`: Send a signal to a process with signal number.
  - `kill -p`: Send a signal to a process with process ID.
  - `kill -a`: Send a signal to a process with all.
  - `kill -q`: Send a signal to a process

  - **kill signals with values**:

    - **SIGHUP (1)**: Hangup signal. Sent to a process when its controlling terminal is closed.
    - **SIGINT (2)**: Interrupt signal. Sent to a process when the user presses Ctrl+C.
    - **SIGQUIT (3)**: Quit signal. Sent to a process when the user presses Ctrl+D.
    - **SIGKILL (9)**: Kill signal. Sent to a process to terminate it immediately.
    - **SIGTERM (15)**: Terminate signal. Sent to a process to request termination.
    - **SIGSTOP (17 [19,23])**: Stop signal. Sent to a process to pause it.
    - **SIGTSTP (18 [20,24])**: Terminal stop signal. Sent to a process to pause it.
    - **SIGCONT (19)**: Continue signal. Sent to a process to resume it.
    - **SIGUSR1 (30)**: User-defined signal 1.
    - **SIGUSR2 (31)**: User-defined signal 2.

    - **sleep**: Pause for a specified amount of time.
    - **Commands**:

      - `sleep`: Pause for a specified amount of time.
      - `sleep -n`: Pause for a specified amount of time with number.
      - `sleep -v`: Pause for a specified amount of time with verbose.

  - **nice**: Run a command with modified scheduling priority.
  - **Commands**:

    - `nice`: Run a command with modified scheduling priority.
    - `nice -n`: Run a command with modified scheduling priority with adjustment.
    - `nice -adjustment command`: Run a command with modified scheduling priority with adjustment.

    - Processes are prioritized based on a number from -20 to 19, called a nice or niceness value. Lower values are higher priority. The default nice value is 0.

- **renice**: Alter priority of running processes.
- **Commands**:

  - `renice`: Alter priority of running processes.
  - `renice -n`: Alter priority of running processes with adjustment.
  - `renice -p`: Alter priority of running processes with process ID.
  - `renice -g`: Alter priority of running processes with group.
  - `renice -u`: Alter priority of running processes with user.

  - **fg %{job ID}**: Run jobs in the foreground.
  - &: Run jobs in the background when added to the end of a command.
  - **bg %{job ID}**: Run jobs in the background.
  - **jobs**: List jobs running in the background.
  - **Ctrl+Z**: Stops a foreground job and places it in the background.
  - **Ctrl+C**: Stops a foreground job and terminates it.
  - **Ctrl+D**: Log out of a shell session.
  - **Ctrl+Alt+Del**: Reboot the system.
  - **Ctrl+Alt+Backspace**: Restart the X server.
  - **Ctrl+Alt+F1**: Switch to the first virtual terminal.
  - **Ctrl+Alt+F2**: Switch to the second virtual terminal.

  - **nohup (no hangup)**: Run a command immune to hangups (when the user logs off).
  - **Commands**:

    - `nohup`: Run a command immune to hangups.
    - `nohup -p`: Run a command immune to hangups with process ID.
    - `nohup -c`: Run a command immune to hangups with command.
    - `nohup -f`: Run a command immune to hangups with file.
    - `nohup -o`: Run a command immune to hangups with output.
    - `nohup -p`: Run a command immune to hangups with process ID.
    - `nohup -q`: Run a command immune to hangups with quiet.
    - `nohup -v`: Run a command immune to hangups with verbose.

- **at**: Schedule a command to run at a later time.
- **Commands**:

  - `at`: Schedule a command to run at a later time.
  - `at -c`: Schedule a command to run at a later time with cat.
  - `at -d`: Schedule a command to run at a later time with delete.
  - `at -l`: Schedule a command to run at a later time with list.
  - `at -m`: Schedule a command to run at a later time with mail.
  - `at -q`: Schedule a command to run at a later time with queue.
  - `at -r`: Schedule a command to run at a later time with remove.
  - `at -v`: Schedule a command to run at a later time with verbose.

- **batch**: Schedule commands to run when system load levels permit.
- **Commands**:

  - `batch`: Schedule commands to run when system load levels permit.
  - `batch -q`: Schedule commands to run when system load levels permit with queue.

- **crontab**: Schedule a command to run at a later time.
- **Commands**:

  - `crontab`: Schedule a command to run at a later time.
  - `crontab -e`: Schedule a command to run at a later time with edit.
  - `crontab -l`: Schedule a command to run at a later time with list.
  - `crontab -r`: Schedule a command to run at a later time with remove.

- **systemd-run**: Run a command in a transient scope unit.
- **Commands**:

  - `systemd-run`: Run a command in a transient scope unit.
  - `systemd-run -p`: Run a command in a transient scope unit with property.
  - `systemd-run -q`: Run a command in a transient scope unit with quiet.
  - `systemd-run -t`: Run a command in a transient scope unit with time.
  - `systemd-run -u`: Run a command in a transient scope unit with user.

- **systemd-inhibit**: Delay system shutdown or sleep.
- **Commands**:

  - `systemd-inhibit`: Delay system shutdown or sleep.
  - `systemd-inhibit -h`: Delay system shutdown or sleep with handle.
  - `systemd-inhibit -l`: Delay system shutdown or sleep with list.
  - `systemd-inhibit -t`: Delay system shutdown or sleep with time.
  - `systemd-inhibit -u`: Delay system shutdown or sleep with user.

- **systemd-sleep**: Run a command before system suspend or hibernate.
- **Commands**:

  - `systemd-sleep`: Run a command before system suspend or hibernate.
  - `systemd-sleep -h`: Run a command before system suspend or hibernate with handle.
  - `systemd-sleep -i`: Run a command before system suspend or hibernate with ignore.
  - `systemd-sleep -n`: Run a command before system suspend or hibernate with no.
  - `systemd-sleep -p`: Run a command before system suspend or hibernate with prepare.
  - `systemd-sleep -r`: Run a command before system suspend or hibernate with resume.
  - `systemd-sleep -s`: Run a command before system suspend or hibernate with suspend.

- **systemd-hwdb**: Hardware database for udev.
- **Commands**:

  - `systemd-hwdb`: Hardware database for udev.
  - `systemd-hwdb -h`: Hardware database for udev with help.
  - `systemd-hwdb -c`: Hardware database for udev with check.
  - `systemd-hwdb -g`: Hardware database for udev with get.
  - `systemd-hwdb -l`: Hardware database for udev with list.
  - `systemd-hwdb -p`: Hardware database for udev with print.
  - `systemd-hwdb -q`: Hardware database for udev with query.
  - `systemd-hwdb -r`: Hardware database for udev with resolve.
  - `systemd-hwdb -t`: Hardware database for udev with test.
  - `systemd-hwdb -v`: Hardware database for udev with verbose.

- Linux registers USB storage devices attached to the system in /dev/sd# format
- **udevadm**: Control the udev system.
- **Commands**:

  - `udevadm`: Control the udev system.
  - `udevadm control`: Control the udev system with control.
  - `udevadm info`: Control the udev system with info.
  - `udevadm monitor`: Control the udev system with monitor.
  - `udevadm settle`: Control the udev system with settle.
  - `udevadm test`: Control the udev system with test.
  - `udevadm trigger`: Control the udev system with trigger.
  - `udevadm hwdb`: Control the udev system with hardware database.
  - `udevadm trigger -s`: Control the udev system with subsystem.
  - `udevadm trigger -a`: Control the udev system with action.
  - `udevadm trigger -p`: Control the udev system with path.
  - `udevadm trigger -c`: Control the udev system with change.
  - `udevadm trigger -n`: Control the udev system with dry-run.
  - `udevadm trigger -v`: Control the udev system with verbose.

- **/etc/udev/rules.d**: Directory containing udev rules.
- **/etc/udev/udev.conf**: File containing udev configuration.
- **/etc/udev/hwdb.d**: Directory containing udev hardware database rules.
- **/etc/udev/hwdb.bin**: File containing the udev hardware database.
- **/etc/udev/udevadm.conf**: File containing udevadm configuration.
- **udev**: Device manager for the Linux kernel.
- **/dev**: Directory containing device files.
- **/dev/sd#**: Device file for a SATA drive.
- **udevadm**: Control the udev system.
- **info subcommand**: Display information about a device.
- **monitor subcommand**: Monitor udev events.
- **settle subcommand**: Wait for pending udev events to finish.
- **test subcommand**: Test a udev rule.
- **trigger subcommand**: Trigger udev events.
- **hwdb subcommand**: Manage the udev hardware database.
- **udevadm trigger -s**: Trigger udev events for a specific subsystem.

- **SATA**: Serial Advanced Technology Attachment. SATA is a computer bus interface that connects host bus adapters to mass storage devices.
- **IDE**: Integrated Drive Electronics. IDE is a computer bus interface that connects host bus adapters to mass storage devices.
- **SCSI**: Small Computer System Interface. SCSI is a computer bus interface that connects host bus adapters to mass storage devices.
- **SAS**: Serial Attached SCSI. SAS is a computer bus interface that connects host bus adapters to mass storage devices.
- **SAS4**: Serial Attached SCSI 4. SAS4 is a computer bus interface that connects host bus adapters to mass storage devices.
- **HBA**: Host Bus Adapter. HBA is a computer bus interface that connects host bus adapters to mass storage devices.
- **RAID**: Redundant Array of Independent Disks. RAID is a computer bus interface that connects host bus adapters to mass storage devices.
- **SATA RAID**: SATA Redundant Array of Independent Disks. SATA RAID is a computer bus interface that connects host bus adapters to mass storage devices.
- **IDE RAID**: Integrated Drive Electronics Redundant Array of Independent Disks. IDE RAID is a computer bus interface that connects host bus adapters to mass storage devices.
- **SCSI RAID**: Small Computer System Interface Redundant Array of Independent Disks. SCSI RAID is a computer bus interface that connects host bus adapters to mass storage devices.
- **SAS RAID**: Serial Attached SCSI Redundant Array of Independent Disks. SAS RAID is a computer bus interface that connects host bus adapters to mass storage devices.
- **SAS4 RAID**: Serial Attached SCSI 4 Redundant Array of Independent Disks. SAS4 RAID is a computer bus interface that connects host bus adapters to mass storage devices.
- **HBA RAID**: Host Bus Adapter Redundant Array of Independent Disks. HBA RAID is a computer bus interface that connects host bus adapters to mass storage devices.
- **iSCSI**: Internet Small Computer System Interface. iSCSI is a computer bus interface that connects host bus adapters to mass storage devices.
- **Fibre Channel**: Fibre Channel is a computer bus interface that connects host bus adapters to mass storage devices.
- **NVMe**: Non-Volatile Memory Express. NVMe is a computer bus interface that connects host bus adapters to mass storage devices.
- **USB**: Universal Serial Bus. USB is a computer bus interface that connects host bus adapters to mass storage devices.
- **PCI Express (PCIe)**: Peripheral Component Interconnect Express. PCI Express is a computer bus interface that connects host bus adapters to mass storage devices.
- **Thunderbolt**: Thunderbolt is a computer bus interface that connects host bus adapters to mass storage devices.
- **FireWire**: FireWire is a computer bus interface that connects host bus adapters to mass storage devices.

- **CUPS - Common Unix Printing System**: CUPS is a printing system for Unix-like operating systems that allows a computer to act as a print server.
- **/etc/cups**: Directory containing CUPS configuration files.

- **lp**: Print files.
- **Commands**:

  - `lp`: Print files.
  - `lp -c`: Print files with copy.
  - `lp -d`: Print files with destination.
  - `lp -h`: Print files with header.
  - `lp -i`: Print files with job ID.
  - `lp -m`: Print files with mail.
  - `lp -n`: Print files with number.
  - `lp -o`: Print files with options.
  - `lp -q`: Print files with queue.
  - `lp -s`: Print files with silent.
  - `lp -t`: Print files with title.
  - `lp -u`: Print files with user.
  - `lp -v`: Print files with verbose.

- **lpr**: Print files.
- **Commands**:

  - `lpr`: Print files.
  - `lpr -C`: Print files with class.
  - `lpr -J`: Print files with job name.
  - `lpr -P`: Print files with printer.
  - `lpr -T`: Print files with title.
  - `lpr -U`: Print files with user.
  - `lpr -#`: Print files with number.
  - `lpr -c`: Print files with copy.
  - `lpr -h`: Print files with header.
  - `lpr -i`: Print files with job ID.
  - `lpr -m`: Print files with mail.
  - `lpr -o`: Print files with options.
  - `lpr -q`: Print files with queue.
  - `lpr -s`: Print files with silent.
  - `lpr -v`: Print files with verbose.

- **lpq**: Show printer queue status.
- **Commands**:

  - `lpq`: Show printer queue status.
  - `lpq -a`: Show printer queue status with all.
  - `lpq -l`: Show printer queue status with long.
  - `lpq -P`: Show printer queue status with printer.
  - `lpq -U`: Show printer queue status with user.
  - `lpq -#`: Show printer queue status with number.
  - `lpq -c`: Show printer queue status with copy.
  - `lpq -h`: Show printer queue status with header.
  - `lpq -i`: Show printer queue status with job ID.
  - `lpq -m`: Show printer queue status with mail.
  - `lpq -o`: Show printer queue status with options.
  - `lpq -q`: Show printer queue status with queue.
  - `lpq -s`: Show printer queue status with silent.
  - `lpq -v`: Show printer queue status with verbose.

- **lprm**: Remove jobs from the printer queue.
- **Commands**:

  - `lprm`: Remove jobs from the printer queue.
  - `lprm -P`: Remove jobs from the printer queue with printer.
  - `lprm -U`: Remove jobs from the printer queue with user.
  - `lprm -#`: Remove jobs from the printer queue with number.
  - `lprm -c`: Remove jobs from the printer queue with copy.
  - `lprm -h`: Remove jobs from the printer queue with header.
  - `lprm -i`: Remove jobs from the printer queue with job ID.
  - `lprm -m`: Remove jobs from the printer queue with mail.
  - `lprm -o`: Remove jobs from the printer queue with options.
  - `lprm -q`: Remove jobs from the printer queue with queue.
  - `lprm -s`: Remove jobs from the printer queue with silent.
  - `lprm -v`: Remove jobs from the printer queue with verbose.

- **cancel**: Cancel print jobs.
- **Commands**:

  - `cancel`: Cancel print jobs.
  - `cancel -a`: Cancel print jobs with all.
  - `cancel -u`: Cancel print jobs with user.
  - `cancel -#`: Cancel print jobs with number.
  - `cancel -c`: Cancel print jobs with copy.
  - `cancel -h`: Cancel print jobs with header.
  - `cancel -i`: Cancel print jobs with job ID.
  - `cancel -m`: Cancel print jobs with mail.
  - `cancel -o`: Cancel print jobs with options.
  - `cancel -q`: Cancel print jobs with queue.
  - `cancel -s`: Cancel print jobs with silent.
  - `cancel -v`: Cancel print jobs with verbose.

- **cupsd**: CUPS daemon.
- **Commands**:

  - `cupsd`: CUPS daemon.
  - `cupsd -c`: CUPS daemon with configuration.
  - `cupsd -f`: CUPS daemon with file.
  - `cupsd -h`: CUPS daemon with help.
  - `cupsd -t`: CUPS daemon with test.
  - `cupsd -v`: CUPS daemon with verbose.

- **cupsd.conf**: CUPS configuration file.
- **cups-files.conf**: CUPS files configuration file.
- **cupsd-logs**: CUPS logs directory.
- **cupsd-logs/access_log**: CUPS access log.
- **cupsd-logs/error_log**: CUPS error log.
- **cupsd-logs/page_log**: CUPS page log.
- **cupsd-logs/printer_log**: CUPS printer log.
- **cupsd-logs/audit_log**: CUPS audit log.
- **cupsd-logs/subscription_log**: CUPS subscription log.
- **cupsd-logs/cache**: CUPS cache directory.

- **lsdev**: List devices.
- **Commands**:

  - `lsdev`: List devices.
  - `lsdev -c`: List devices with class.
  - `lsdev -d`: List devices with description.
  - `lsdev -l`: List devices with location.
  - `lsdev -s`: List devices with status.
  - `lsdev -t`: List devices with type.
  - `lsdev -v`: List devices with verbose.

  - **lsusb**: List USB devices.
  - **Commands**:

    - `lsusb`: List USB devices.
    - `lsusb -d`: List USB devices with description.
    - `lsusb -l`: List USB devices with location.
    - `lsusb -s`: List USB devices with status.
    - `lsusb -t`: List USB devices with type.
    - `lsusb -v`: List USB devices with verbose.

- **lspci**: List PCI devices.
- **Commands**:

  - `lspci`: List PCI devices.
  - `lspci -d`: List PCI devices with description.
  - `lspci -l`: List PCI devices with location.
  - `lspci -s`: List PCI devices with status.
  - `lspci -t`: List PCI devices with type.
  - `lspci -v`: List PCI devices with verbose.

- **lsslot**: List slots.
- **Commands**:

  - `lsslot`: List slots.
  - `lsslot -c`: List slots with class.
  - `lsslot -d`: List slots with description.
  - `lsslot -l`: List slots with location.
  - `lsslot -s`: List slots with status.
  - `lsslot -t`: List slots with type.
  - `lsslot -v`: List slots with verbose.

- **lscfg**: List configuration.
- **Commands**:

  - `lscfg`: List configuration.
  - `lscfg -c`: List configuration with class.
  - `lscfg -d`: List configuration with description.
  - `lscfg -l`: List configuration with location.
  - `lscfg -s`: List configuration with status.
  - `lscfg -t`: List configuration with type.
  - `lscfg -v`: List configuration with verbose.

- **lsattr**: List file attributes.
- **Commands**:

  - `lsattr`: List file attributes.
  - `lsattr -a`: List file attributes with all.
  - `lsattr -d`: List file attributes with directories.
  - `lsattr -e`: List file attributes with exclude.
  - `lsattr -i`: List file attributes with inode.
  - `lsattr -l`: List file attributes with long.
  - `lsattr -r`: List file attributes with recursive.
  - `lsattr -v`: List file attributes with verbose.

- **chattr**: Change file attributes.
- **Commands**:

  - `chattr`: Change file attributes.
  - `chattr -a`: Change file attributes with append.
  - `chattr -c`: Change file attributes with no-copy-on-write.
  - `chattr -d`: Change file attributes with no-dump.
  - `chattr -i`: Change file attributes with immutable.
  - `chattr -j`: Change file attributes with data-journaling.
  - `chattr -s`: Change file attributes with secure deletion.
  - `chattr -S`: Change file attributes with synchronous-directory.
  - `chattr -t`: Change file attributes with no-tail-merging.
  - `chattr -u`: Change file attributes with undeletable.
  - `chattr -v`: Change file attributes with verbose.

  ### ISA DMA

- **ISA DMA**: ISA Direct Memory Access. ISA DMA is a method for transferring data from memory to a device without using the CPU.
- **Commands**:

  - `ISA DMA0`: ISA Direct Memory Access channel 0.
  - `ISA DMA1`: ISA Direct Memory Access channel 1.
  - `ISA DMA2`: ISA Direct Memory Access channel 2.
  - `ISA DMA3`: ISA Direct Memory Access channel 3.

- **DMA0**: Direct Memory Access channel 0.
- **DMA1**: Direct Memory Access channel 1.
- **DMA2**: Direct Memory Access channel 2.
- **DMA3**: Direct Memory Access channel 3.

- **DMI DECODE**: Direct Media Interface Decode. DMI DECODE is a method for decoding Direct Media Interface data.
- **Commands**:

  - `DMI DECODE0`: Direct Media Interface Decode channel 0.
  - `DMI DECODE1`: Direct Media Interface Decode channel 1.
  - `DMI DECODE2`: Direct Media Interface Decode channel 2.
  - `DMI DECODE3`: Direct Media Interface Decode channel 3.

  - **(ABRT) Automatic Bug Reporting Tool**: ABRT is a tool that automatically reports errors to the system administrator.

- **abrt**: Automatic Bug Reporting Tool.
- **Commands**:

  - `abrt`: Automatic Bug Reporting Tool.
  - `abrt -c`: Automatic Bug Reporting Tool with configuration.
  - `abrt -d`: Automatic Bug Reporting Tool with daemon.
  - `abrt -h`: Automatic Bug Reporting Tool with help.
  - `abrt -l`: Automatic Bug Reporting Tool with list.
  - `abrt -r`: Automatic Bug Reporting Tool with report.
  - `abrt -s`: Automatic Bug Reporting Tool with status.
  - `abrt -t`: Automatic Bug Reporting Tool with test.
  - `abrt -v`: Automatic Bug Reporting Tool with verbose.

- **/var/spool/abrt**: Directory containing ABRT files.
- **/etc/abrt**: Directory containing ABRT configuration files.
- **/etc/abrt/abrt.conf**: File containing ABRT configuration.
- **/etc/abrt/abrt-action-save-package-data.conf**: File containing ABRT action save package data configuration.

**Networking**

- **ifconfig**: Configure a network interface.
- **ip**: Show or manipulate routing, devices, policy routing, and tunnels.
- **netstat**: Print network connections, routing tables, interface statistics, masquerade connections, and multicast memberships.
- **ss**: Show socket statistics.
- **ping**: Send ICMP ECHO_REQUEST packets to network hosts.
- **traceroute**: Print the route packets take to network host.
- **tracepath**: Traceroute utility that determines the path packets take to a destination.
- **mtr**: Network diagnostic tool that combines ping and traceroute.
- **dig**: DNS lookup utility.
- **host**: DNS lookup utility.
- **nslookup**: DNS lookup utility.
- **whois**: Lookup information about a domain.
- **arp**: Display or modify the IP-to-MAC address translation tables used by the ARP protocol.
- **route**: Show or manipulate the IP routing table.
- **iptables**: Administration tool for IPv4 packet filtering and NAT.
- **ip6tables**: Administration tool for IPv6 packet filtering and NAT.
- **firewalld**: Dynamic firewall manager.
- **nftables**: Netfilter tables.
- **sshd**: Secure Shell Daemon.
- **telnet**: User interface to the TELNET protocol.
- **ftp**: File Transfer Protocol.
- **scp**: Secure copy.
- **sftp**: Secure file transfer program.
- **rsync**: Remote file copy.
- **wget**: Non-interactive network downloader.
- **curl**: Command-line tool for transferring data with URLs.
- **nc**: Arbitrary TCP and UDP connections and listens.
- **nmap**: Network exploration tool and security scanner.
- **tcpdump**: Dump traffic on a network.
- **wireshark**: Network protocol analyzer.
- **netcat**: Utility for managing network connections.
- **ssh**: Secure Shell.
- **ssh-keygen**: Create a new SSH key pair.
- **ssh-copy-id**: Copy SSH keys to a server.
- **ssh-agent**: Authentication agent.
- **ssh-add**: Add private key identities to the SSH authentication agent.
- **scp**: Secure copy.
- **sftp**: Secure file transfer program.

DHCP information

- **/var/lib/dhcpd/dhcpd.leases**: File containing DHCP leases.
- **/etc/dhcp/dhcpd.conf**: File containing DHCP server configuration.
- **/etc/dhcp/dhcpd6.conf**: File containing DHCPv6 server configuration.
- **/etc/dhcp/dhclient.conf**: File containing DHCP client configuration.
- **/etc/dhcp/dhclient6.conf**: File containing DHCPv6 client configuration.
- **/etc/dhcp/dhclient-enter-hooks.d**: Directory containing scripts to run when a DHCP client enters a state.
- **/etc/dhcp/dhclient-exit-hooks.d**: Directory containing scripts to run when a DHCP client exits a state.

DNS information

- **/etc/resolv.conf**: File containing DNS resolver configuration.
- **/etc/nsswitch.conf**: File containing system databases and name resolution configuration.
- **/etc/hosts**: File containing static hostname-to-IP address mappings.
- **/etc/hostname**: File containing the system's hostname.
- **/etc/hostname.eth0**: File containing the hostname for the eth0 interface.
- **/etc/hostname.wlan0**: File containing the hostname for the wlan0 interface.

**/etc/hosts.allow**: File containing hosts allowed to access services.
**/etc/hosts.deny**: File containing hosts denied access to services.
**/etc/hosts.equiv**: File containing hosts allowed to access services.

NTP information

- **/etc/ntp.conf**: File containing NTP configuration.
- **/etc/ntp/keys**: Directory containing NTP keys.
- **/etc/ntp/step-tickers**: File containing NTP step-tickers.
- **/etc/ntp/ntpservers**: File containing NTP servers.
- **/etc/ntp/ntpservers.pool**: File containing NTP pool servers.
- **/etc/ntp/ntpservers.pool.ntp.org**: File containing NTP pool servers.
- **/etc/ntp/ntpservers.pool.ntp.org.0**: File containing NTP pool servers.

lldp information

- **/etc/lldpd.conf**: File containing LLDP configuration.
- **/etc/lldpd.d**: Directory containing LLDP configuration files.
- **/etc/lldpd.d/README**: File containing information about LLDP configuration files.

### Network Manager: nmcli

- **nmcli**: Network Manager command-line interface.
- **Commands**:

  - `nmcli`: Network Manager command-line interface.
  - `nmcli -a`: Network Manager command-line interface with all.
  - `nmcli -c`: Network Manager command-line interface with connection.
  - `nmcli -d`: Network Manager command-line interface with device.
  - `nmcli -g`: Network Manager command-line interface with get.
  - `nmcli -h`: Network Manager command-line interface with help.
  - `nmcli -m`: Network Manager command-line interface with mode.
  - `nmcli -p`: Network Manager command-line interface with pretty.
  - `nmcli -t`: Network Manager command-line interface with terse.
  - `nmcli -v`: Network Manager command-line interface with verbose.

- **nmcli connection**: Manage Network Manager connections.
- **Commands**:

  - `nmcli connection`: Manage Network Manager connections.
  - `nmcli connection add`: Manage Network Manager connections with add.
  - `nmcli connection delete`: Manage Network Manager connections with delete.
  - `nmcli connection down`: Manage Network Manager connections with down.
  - `nmcli connection edit`: Manage Network Manager connections with edit.
  - `nmcli connection export`: Manage Network Manager connections with export.
  - `nmcli connection import`: Manage Network Manager connections with import.
  - `nmcli connection load`: Manage Network Manager connections with load.
  - `nmcli connection modify`: Manage Network Manager connections with modify.
  - `nmcli connection reload`: Manage Network Manager connections with reload.
  - `nmcli connection show`: Manage Network Manager connections with show.
  - `nmcli connection up`: Manage Network Manager connections with up.

- **nmcli device**: Manage Network Manager devices.
- **Commands**:

  - `nmcli device`: Manage Network Manager devices.
  - `nmcli device show`: Manage Network Manager devices with show.

- **nmcli general**: Show general Network Manager information.
- **Commands**:

  - `nmcli general`: Show general Network Manager information.
  - `nmcli general hostname`: Show general Network Manager information with hostname.
  - `nmcli general permissions`: Show general Network Manager information with permissions.
  - `nmcli general status`: Show general Network Manager information with status.

- **nmcli networking**: Manage Network Manager networking.
- **Commands**:

  - `nmcli networking`: Manage Network Manager networking.
  - `nmcli networking connectivity`: Manage Network Manager networking with connectivity.
  - `nmcli networking connectivity check`: Manage Network Manager networking with connectivity check.
  - `nmcli networking connectivity status`: Manage Network Manager networking with connectivity status.
  - `nmcli networking connectivity wait`: Manage Network Manager networking with connectivity wait.
  - `nmcli networking off`: Manage Network Manager networking with off.
  - `nmcli networking on`: Manage Network Manager networking with on.

- **nmcli radio**: Manage Network Manager radios.
- **Commands**:

  - `nmcli radio`: Manage Network Manager radios.
  - `nmcli radio all`: Manage Network Manager radios with all.
  - `nmcli radio wifi`: Manage Network Manager radios with wifi.
  - `nmcli radio wwan`: Manage Network Manager radios with wwan.

- **nmcli monitor**: Monitor Network Manager.
- **Commands**:

  - `nmcli monitor`: Monitor Network Manager.
  - `nmcli monitor all`: Monitor Network Manager with all.
  - `nmcli monitor connectivity`: Monitor Network Manager with connectivity.
  - `nmcli monitor connectivity check`: Monitor Network Manager with connectivity check.
  - `nmcli monitor connectivity status`: Monitor Network Manager with connectivity status.
  - `nmcli monitor connectivity wait`: Monitor Network Manager with connectivity wait.
  - `nmcli monitor off`: Monitor Network Manager with off.
  - `nmcli monitor on`: Monitor Network Manager with on.

- **nmcli bash-completion**: Network Manager bash completion.
- **Commands**:

  - `nmcli bash-completion`: Network Manager bash completion.
  - `nmcli bash-completion -h`: Network Manager bash completion with help.
  - `nmcli bash-completion -v`: Network Manager bash completion with verbose.

- **nmcli examples**: Network Manager examples.
- **Commands**:

  - `nmcli examples`: Network Manager examples.
  - `nmcli examples -h`: Network Manager examples with help.
  - `nmcli examples -v`: Network Manager examples with verbose.

- **nmcli scripting**: Network Manager scripting.
- **Commands**:

  - `nmcli scripting`: Network Manager scripting.
  - `nmcli scripting -h`: Network Manager scripting with help.
  - `nmcli scripting -v`: Network Manager scripting with verbose.

- **nmcli tabular**: Network Manager tabular.
- **Commands**:

  - `nmcli tabular`: Network Manager tabular.
  - `nmcli tabular -h`: Network Manager tabular with help.
  - `nmcli tabular -v`: Network Manager tabular with verbose.

- **nmtui**: Network Manager Text User Interface.
- **Commands**:

  - `nmtui`: Network Manager Text User Interface.
  - `nmtui -c`: Network Manager Text User Interface with connection.
  - `nmtui -e`: Network Manager Text User Interface with edit.
  - `nmtui -h`: Network Manager Text User Interface with help.
  - `nmtui -l`: Network Manager Text User Interface with list.
  - `nmtui -s`: Network Manager Text User Interface with set.

- **nm-connection-editor**: Network Manager Connection Editor.
- **Commands**:

  - `nm-connection-editor`: Network Manager Connection Editor.
  - `nm-connection-editor -c`: Network Manager Connection Editor with connection.
  - `nm-connection-editor -e`: Network Manager Connection Editor with edit.
  - `nm-connection-editor -h`: Network Manager Connection Editor with help.
  - `nm-connection-editor -l`: Network Manager Connection Editor with list.
  - `nm-connection-editor -s`: Network Manager Connection Editor with set.

- **nm-online**: Network Manager online.
- **Commands**:

  - `nm-online`: Network Manager online.
  - `nm-online -h`: Network Manager online with help.
  - `nm-online -v`: Network Manager online with verbose.

- **nmgui**: Network Manager GUI.
- **Commands**:

  - `nmgui`: Network Manager GUI.
  - `nmgui -c`: Network Manager GUI with connection.
  - `nmgui -e`: Network Manager GUI with edit.
  - `nmgui -h`: Network Manager GUI with help.
  - `nmgui -l`: Network Manager GUI with list.
  - `nmgui -s`: Network Manager GUI with set.

- **nm-applet**: Network Manager applet.
- **Commands**:

  - `nm-applet`: Network Manager applet.
  - `nm-applet -c`: Network Manager applet with connection.
  - `nm-applet -e`: Network Manager applet with edit.
  - `nm-applet -h`: Network Manager applet with help.
  - `nm-applet -l`: Network Manager applet with list.
  - `nm-applet -s`: Network Manager applet with set.

  - **ip**: Show or manipulate routing, devices, policy routing, and tunnels.

- **Commands**:

  - `ip`: Show or manipulate routing, devices, policy routing, and tunnels.
  - `ip -a`: Show or manipulate routing, devices, policy routing, and tunnels with all.
  - `ip -b`: Show or manipulate routing, devices, policy routing, and tunnels with brief.
  - `ip -c`: Show or manipulate routing, devices, policy routing, and tunnels with color.
  - `ip -d`: Show or manipulate routing, devices, policy routing, and tunnels with details.
  - `ip -f`: Show or manipulate routing, devices, policy routing, and tunnels with family.
  - `ip -h`: Show or manipulate routing, devices, policy routing, and tunnels with help.
  - `ip -i`: Show or manipulate routing, devices, policy routing, and tunnels with interface.
  - `ip -l`: Show or manipulate routing, devices, policy routing, and tunnels with link.
  - `ip -m`: Show or manipulate routing, devices, policy routing, and tunnels with monitor.
  - `ip -n`: Show or manipulate routing, devices, policy routing, and tunnels with netns.
  - `ip -o`: Show or manipulate routing, devices, policy routing, and tunnels with oneline.
  - `ip -p`: Show or manipulate routing, devices, policy routing, and tunnels with protocol.
  - `ip -r`: Show or manipulate routing, devices, policy routing, and tunnels with resolve.
  - `ip -s`: Show or manipulate routing, devices, policy routing, and tunnels with statistics.
  - `ip -t`: Show or manipulate routing, devices, policy routing, and tunnels with terse.
  - `ip -v`: Show or manipulate routing, devices, policy routing, and tunnels with verbose.
  - **subcommands**
    - `ip address`: Show or manipulate routing, devices, policy routing, and tunnels with address.
    - `ip addrlabel`: Show or manipulate routing, devices, policy routing, and tunnels with addrlabel.
    - `ip l2tp`: Show or manipulate routing, devices, policy routing, and tunnels with l2tp.
    - `ip link`: Show or manipulate routing, devices, policy routing, and tunnels with link.
    - `ip maddress`: Show or manipulate routing, devices, policy routing, and tunnels with maddress.
    - `ip mroute`: Show or manipulate routing, devices, policy routing, and tunnels with mroute.
    - `ip neigh`: Show or manipulate routing, devices, policy routing, and tunnels with neigh.
    - `ip netns`: Show or manipulate routing, devices, policy routing, and tunnels with netns.
    - `ip ntable`: Show or manipulate routing, devices, policy routing, and tunnels with ntable.
    - `ip route`: Show or manipulate routing, devices, policy routing, and tunnels with route.
    - `ip rule`: Show or manipulate routing, devices, policy routing, and tunnels with rule.
    - `ip tcp_metrics`: Show or manipulate routing, devices, policy routing, and tunnels with tcp_metrics.
    - `ip token`: Show or manipulate routing, devices, policy routing, and tunnels with token.
    - `ip tunnel`: Show or manipulate routing, devices, policy routing, and tunnels with tunnel.
    - `ip xfrm`: Show or manipulate routing, devices, policy routing, and tunnels with xfrm.

- **iwconfig**:

  - `iwconfig`: Configure a wireless network interface.
  - `iwconfig -a`: Configure a wireless network interface with all.
  - `iwconfig -c`: Configure a wireless network interface with channel.
  - `iwconfig -e`: Configure a wireless network interface with essid.
  - `iwconfig -f`: Configure a wireless network interface with frequency.
  - `iwconfig -h`: Configure a wireless network interface with help.
  - `iwconfig -i`: Configure a wireless network interface with interface.
  - `iwconfig -k`: Configure a wireless network interface with key.
  - `iwconfig -m`: Configure a wireless network interface with mode.
  - `iwconfig -n`: Configure a wireless network interface with nick.
  - `iwconfig -p`: Configure a wireless network interface with power.
  - `iwconfig -q`: Configure a wireless network interface with quality.
  - `iwconfig -r`: Configure a wireless network interface with rate.
  - `iwconfig -s`: Configure a wireless network interface with sensitivity.
  - `iwconfig -t`: Configure a wireless network interface with txpower.
  - `iwconfig -v`: Configure a wireless network interface with verbose.

- **iwlist**:

  - `iwlist`: Get more detailed wireless information from a wireless interface.
  - `iwlist -a`: Get more detailed wireless information from a wireless interface with all.
  - `iwlist -c`: Get more detailed wireless information from a wireless interface with channel.
  - `iwlist -e`: Get more detailed wireless information from a wireless interface with essid.
  - `iwlist -f`: Get more detailed wireless information from a wireless interface with frequency.
  - `iwlist -h`: Get more detailed wireless information from a wireless interface with help.
  - `iwlist -i`: Get more detailed wireless information from a wireless interface with interface.
  - `iwlist -k`: Get more detailed wireless information from a wireless interface with key.
  - `iwlist -m`: Get more detailed wireless information from a wireless interface with mode.
  - `iwlist -n`: Get more detailed wireless information from a wireless interface with nick.
  - `iwlist -p`: Get more detailed wireless information from a wireless interface with power.
  - `iwlist -q`: Get more detailed wireless information from a wireless interface with quality.
  - `iwlist -r`: Get more detailed wireless information from a wireless interface with rate.
  - `iwlist -s`: Get more detailed wireless information from a wireless interface with sensitivity.
  - `iwlist -t`: Get more detailed wireless information from a wireless interface with txpower.
  - `iwlist -v`: Get more detailed wireless information from a wireless interface with verbose.

  - **subcommands**:
    - `iwlist scan`: Get more detailed wireless information from a wireless interface with scan.
    - `iwlist freq`: Get more detailed wireless information from a wireless interface with frequency.
    - `iwlist keys`: Get more detailed wireless information from a wireless interface with keys.
    - `iwlist power`: Get more detailed wireless information from a wireless interface with power.
    - `iwlist rate`: Get more detailed wireless information from a wireless interface with rate.
    - `iwlist retry`: Get more detailed wireless information from a wireless interface with retry.
    - `iwlist txpower`: Get more detailed wireless information from a wireless interface with txpower.

- **iw**:

  - `iw`: Show or manipulate wireless devices and their configuration.
  - `iw -a`: Show or manipulate wireless devices and their configuration with all.
  - `iw -c`: Show or manipulate wireless devices and their configuration with channel.
  - `iw -d`: Show or manipulate wireless devices and their configuration with device.
  - `iw -e`: Show or manipulate wireless devices and their configuration with essid.
  - `iw -f`: Show or manipulate wireless devices and their configuration with frequency.
  - `iw -h`: Show or manipulate wireless devices and their configuration with help.
  - `iw -i`: Show or manipulate wireless devices and their configuration with interface.
  - `iw -k`: Show or manipulate wireless devices and their configuration with key.
  - `iw -m`: Show or manipulate wireless devices and their configuration with mode.
  - `iw -n`: Show or manipulate wireless devices and their configuration with nick.
  - `iw -p`: Show or manipulate wireless devices and their configuration with power.
  - `iw -q`: Show or manipulate wireless devices and their configuration with quality.
  - `iw -r`: Show or manipulate wireless devices and their configuration with rate.
  - `iw -s`: Show or manipulate wireless devices and their configuration with sensitivity.
  - `iw -t`: Show or manipulate wireless devices and their configuration with txpower.
  - `iw -v`: Show or manipulate wireless devices and their configuration with verbose.

  ### LXC / LXD

- **LXC**: Linux Containers. LXC is a containerization technology that enables the creation and management of lightweight system containers.
- **LXD**: Linux Containers Daemon. LXD is a container management tool that provides a more user-friendly interface to LXC.
- **lxc**: LXC command-line interface.
- **Commands**:

  - `lxc`: LXC command-line interface.
  - `lxc -a`: LXC command-line interface with all.
  - `lxc -c`: LXC command-line interface with configuration.
  - `lxc -d`: LXC command-line interface with debug.
  - `lxc -e`: LXC command-line interface with execute.
  - `lxc -f`: LXC command-line interface with file.
  - `lxc -h`: LXC command-line interface with help.
  - `lxc -i`: LXC command-line interface with information.
  - `lxc -l`: LXC command-line interface with list.
  - `lxc -m`: LXC command-line interface with monitor.
  - `lxc -n`: LXC command-line interface with network.
  - `lxc -o`: LXC command-line interface with output.
  - `lxc -p`: LXC command-line interface with profile.
  - `lxc -q`: LXC command-line interface with quiet.
  - `lxc -r`: LXC command-line interface with remote.
  - `lxc -s`: LXC command-line interface with server.
  - `lxc -t`: LXC command-line interface with template.
  - `lxc -u`: LXC command-line interface with user.
  - `lxc -v`: LXC command-line interface with verbose.

- **lxd**: LXD command-line interface.
- **Commands**:

  - `lxd`: LXD command-line interface.
  - `lxd -a`: LXD command-line interface with all.
  - `lxd -c`: LXD command-line interface with configuration.
  - `lxd -d`: LXD command-line interface with debug.
  - `lxd -e`: LXD command-line interface with execute.
  - `lxd -f`: LXD command-line interface with file.
  - `lxd -h`: LXD command-line interface with help.
  - `lxd -i`: LXD command-line interface with information.
  - `lxd -l`: LXD command-line interface with list.
  - `lxd -m`: LXD command-line interface with monitor.
  - `lxd -n`: LXD command-line interface with network.
  - `lxd -o`: LXD command-line interface with output.
  - `lxd -p`: LXD command-line interface with profile.
  - `lxd -q`: LXD command-line interface with quiet.
  - `lxd -r`: LXD command-line interface with remote.
  - `lxd -s`: LXD command-line interface with server.
  - `lxd -t`: LXD command-line interface with template.
  - `lxd -u`: LXD command-line interface with user.
  - `lxd -v`: LXD command-line interface with verbose.

- **lxc-create**: Create LXC containers.
- **Commands**:

  - `lxc-create`: Create LXC containers.
  - `lxc-create -a`: Create LXC containers with all.
  - `lxc-create -c`: Create LXC containers with configuration.
  - `lxc-create -d`: Create LXC containers with debug.
  - `lxc-create -e`: Create LXC containers with execute.
  - `lxc-create -f`: Create LXC containers with file.
  - `lxc-create -h`: Create LXC containers with help.
  - `lxc-create -i`: Create LXC containers with information.
  - `lxc-create -l`: Create LXC containers with list.
  - `lxc-create -m`: Create LXC containers with monitor.
  - `lxc-create -n`: Create LXC containers with network.
  - `lxc-create -o`: Create LXC containers with output.
  - `lxc-create -p`: Create LXC containers with profile.
  - `lxc-create -q`: Create LXC containers with quiet.
  - `lxc-create -r`: Create LXC containers with remote.
  - `lxc-create -s`: Create LXC containers with server.
  - `lxc-create -t`: Create LXC containers with template.
  - `lxc-create -u`: Create LXC containers with user.
  - `lxc-create -v`: Create LXC containers with verbose.

- **lxc-destroy**: Destroy LXC containers.
- **Commands**:

  - `lxc-destroy`: Destroy LXC containers.
  - `lxc-destroy -a`: Destroy LXC containers with all.
  - `lxc-destroy -c`: Destroy LXC containers with configuration.
  - `lxc-destroy -d`: Destroy LXC containers with debug.
  - `lxc-destroy -e`: Destroy LXC containers with execute.
  - `lxc-destroy -f`: Destroy LXC containers with file.
  - `lxc-destroy -h`: Destroy LXC containers with help.
  - `lxc-destroy -i`: Destroy LXC containers with information.
  - `lxc-destroy -l`: Destroy LXC containers with list.
  - `lxc-destroy -m`: Destroy LXC containers with monitor.
  - `lxc-destroy -n`: Destroy LXC containers with network.
  - `lxc-destroy -o`: Destroy LXC containers with output.
  - `lxc-destroy -p`: Destroy LXC containers with profile.
  - `lxc-destroy -q`: Destroy LXC containers with quiet.
  - `lxc-destroy -r`: Destroy LXC containers with remote.
  - `lxc-destroy -s`: Destroy LXC containers with server.
  - `lxc-destroy -t`: Destroy LXC containers with template.
  - `lxc-destroy -u`: Destroy LXC containers with user.
  - `lxc-destroy -v`: Destroy LXC containers with verbose.

  - **libvirt**: Libvirt is a toolkit for managing virtualization platforms.

- **virsh**: Libvirt command-line interface.
- **Commands**:

  - `virsh`: Libvirt command-line interface.
  - `virsh -a`: Libvirt command-line interface with all.
  - `virsh -c`: Libvirt command-line interface with connect.
  - `virsh -d`: Libvirt command-line interface with debug.
  - `virsh -e`: Libvirt command-line interface with execute.
  - `virsh -f`: Libvirt command-line interface with file.
  - `virsh -h`: Libvirt command-line interface with help.
  - `virsh -i`: Libvirt command-line interface with information.
  - `virsh -l`: Libvirt command-line interface with list.
  - `virsh -m`: Libvirt command-line interface with monitor.
  - `virsh -n`: Libvirt command-line interface with network.
  - `virsh -o`: Libvirt command-line interface with output.
  - `virsh -p`: Libvirt command-line interface with profile.
  - `virsh -q`: Libvirt command-line interface with quiet.
  - `virsh -r`: Libvirt command-line interface with remote.
  - `virsh -s`: Libvirt command-line interface with server.
  - `virsh -t`: Libvirt command-line interface with template.
  - `virsh -u`: Libvirt command-line interface with user.
  - `virsh -v`: Libvirt command-line interface with verbose.

- **virt-install**: Create virtual machines.
- **Commands**:

  - `virt-install`: Create virtual machines.
  - `virt-install -a`: Create virtual machines with all.
  - `virt-install -c`: Create virtual machines with configuration.
  - `virt-install -d`: Create virtual machines with debug.
  - `virt-install -e`: Create virtual machines with execute.
  - `virt-install -f`: Create virtual machines with file.
  - `virt-install -h`: Create virtual machines with help.
  - `virt-install -i`: Create virtual machines with information.
  - `virt-install -l`: Create virtual machines with list.
  - `virt-install -m`: Create virtual machines with monitor.
  - `virt-install -n`: Create virtual machines with network.
  - `virt-install -o`: Create virtual machines with output.
  - `virt-install -p`: Create virtual machines with profile.
  - `virt-install -q`: Create virtual machines with quiet.
  - `virt-install -r`: Create virtual machines with remote.
  - `virt-install -s`: Create virtual machines with server.
  - `virt-install -t`: Create virtual machines with template.
  - `virt-install -u`: Create virtual machines with user.
  - `virt-install -v`: Create virtual machines with verbose.

- **virt-clone**: Clone virtual machines.
- **Commands**:

  - `virt-clone`: Clone virtual machines.
  - `virt-clone -a`: Clone virtual machines with all.
  - `virt-clone -c`: Clone virtual machines with configuration.
  - `virt-clone -d`: Clone virtual machines with debug.
  - `virt-clone -e`: Clone virtual machines with execute.
  - `virt-clone -f`: Clone virtual machines with file.
  - `virt-clone -h`: Clone virtual machines with help.
  - `virt-clone -i`: Clone virtual machines with information.
  - `virt-clone -l`: Clone virtual machines with list.
  - `virt-clone -m`: Clone virtual machines with monitor.
  - `virt-clone -n`: Clone virtual machines with network.
  - `virt-clone -o`: Clone virtual machines with output.
  - `virt-clone -p`: Clone virtual machines with profile.
  - `virt-clone -q`: Clone virtual machines with quiet.
  - `virt-clone -r`: Clone virtual machines with remote.
  - `virt-clone -s`: Clone virtual machines with server.
  - `virt-clone -t`: Clone virtual machines with template.
  - `virt-clone -u`: Clone virtual machines with user.
  - `virt-clone -v`: Clone virtual machines with verbose.

- **virt-convert**: Convert virtual machines.
- **Commands**:

  - `virt-convert`: Convert virtual machines.
  - `virt-convert -a`: Convert virtual machines with all.
  - `virt-convert -c`: Convert virtual machines with configuration.
  - `virt-convert -d`: Convert virtual machines with debug.
  - `virt-convert -e`: Convert virtual machines with execute.
  - `virt-convert -f`: Convert virtual machines with file.
  - `virt-convert -h`: Convert virtual machines with help.
  - `virt-convert -i`: Convert virtual machines with information.
  - `virt-convert -l`: Convert virtual machines with list.
  - `virt-convert -m`: Convert virtual machines with monitor.
  - `virt-convert -n`: Convert virtual machines with network.
  - `virt-convert -o`: Convert virtual machines with output.
  - `virt-convert -p`: Convert virtual machines with profile.
  - `virt-convert -q`: Convert virtual machines with quiet.
  - `virt-convert -r`: Convert virtual machines with remote.
  - `virt-convert -s`: Convert virtual machines with server.
  - `virt-convert -t`: Convert virtual machines with template.
  - `virt-convert -u`: Convert virtual machines with user.
  - `virt-convert -v`: Convert virtual machines with verbose.

- **netstat**: Print network connections, routing tables, interface statistics, masquerade connections, and multicast memberships.
- **Commands**:

  - `netstat`: Print network connections, routing tables, interface statistics, masquerade connections, and multicast memberships.
  - `netstat -a`: Print network connections, routing tables, interface statistics, masquerade connections, and multicast memberships with all.
  - `netstat -c`: Print network connections, routing tables, interface statistics, masquerade connections, and multicast memberships with continuous.
  - `netstat -e`: Print network connections, routing tables, interface statistics, masquerade connections, and multicast memberships with extend.
  - `netstat -f`: Print network connections, routing tables, interface statistics, masquerade connections, and multicast memberships with fib.
  - `netstat -h`: Print network connections, routing tables, interface statistics, masquerade connections, and multicast memberships with help.
  - `netstat -i`: Print network connections, routing tables, interface statistics, masquerade connections, and multicast memberships with interfaces.
  - `netstat -l`: Print network connections, routing tables, interface statistics, masquerade connections, and multicast memberships with listening.
  - `netstat -m`: Print network connections, routing tables, interface statistics, masquerade connections, and multicast memberships with memory.
  - `netstat -n`: Print network connections, routing tables, interface statistics, masquerade connections, and multicast memberships with numeric.
  - `netstat -o`: Print network connections, routing tables, interface statistics, masquerade connections, and multicast memberships with owner.
  - `netstat -p`: Print network connections, routing tables, interface statistics, masquerade connections, and multicast memberships with programs.
  - `netstat -r`: Print network connections, routing tables, interface statistics, masquerade connections, and multicast memberships with routing.
  - `netstat -s`: Print network connections, routing tables, interface statistics, masquerade connections, and multicast memberships with summary.
  - `netstat -t`: Print network connections, routing tables, interface statistics, masquerade connections, and multicast memberships with tcp.
  - `netstat -u`: Print network connections, routing tables, interface statistics, masquerade connections, and multicast memberships with udp.
  - `netstat -v`: Print network connections, routing tables, interface statistics, masquerade connections, and multicast memberships with verbose.

- **ss**: Show socket statistics.
- **Commands**:

  - `ss`: Show socket statistics.
  - `ss -a`: Show socket statistics with all.
  - `ss -c`: Show socket statistics with continuous.
  - `ss -d`: Show socket statistics with details.
  - `ss -e`: Show socket statistics with extended.
  - `ss -f`: Show socket statistics with fib.
  - `ss -h`: Show socket statistics with help.
  - `ss -i`: Show socket statistics with interfaces.
  - `ss -l`: Show socket statistics with listening.
  - `ss -m`: Show socket statistics with memory.
  - `ss -n`: Show socket statistics with numeric.
  - `ss -o`: Show socket statistics with owner.
  - `ss -p`: Show socket statistics with programs.
  - `ss -r`: Show socket statistics with routing.
  - `ss -s`: Show socket statistics with summary.
  - `ss -t`: Show socket statistics with tcp.
  - `ss -u`: Show socket statistics with udp.
  - `ss -v`: Show socket statistics with verbose.

  - **tcpdump**: Dump traffic on a network.

- **Commands**:

  - `tcpdump`: Dump traffic on a network.
  - `tcpdump -a`: Dump traffic on a network with all.
  - `tcpdump -c`: Dump traffic on a network with count.
  - `tcpdump -d`: Dump traffic on a network with datalink.
  - `tcpdump -e`: Dump traffic on a network with ethernet.
  - `tcpdump -f`: Dump traffic on a network with file.
  - `tcpdump -h`: Dump traffic on a network with help.
  - `tcpdump -i`: Dump traffic on a network with interface.
  - `tcpdump -l`: Dump traffic on a network with link.
  - `tcpdump -n`: Dump traffic on a network with numeric.
  - `tcpdump -o`: Dump traffic on a network with options.
  - `tcpdump -p`: Dump traffic on a network with promiscuous.
  - `tcpdump -q`: Dump traffic on a network with quick.
  - `tcpdump -r`: Dump traffic on a network with read.
  - `tcpdump -s`: Dump traffic on a network with snaplen.
  - `tcpdump -t`: Dump traffic on a network with timestamp.
  - `tcpdump -u`: Dump traffic on a network with udp.
  - `tcpdump -v`: Dump traffic on a network with verbose.
  - `tcpdump -w`: Dump traffic on a network with write.
  - `tcpdump -x`: Dump traffic on a network with hex.

  examples with output:

  ```bash
  tcpdump -i eth0 -c 10 -n -v -X -s 0 -w /tmp/tcpdump.pcap
  ```

- **netcat**: Utility for managing network connections.
- **Commands**:

  - `netcat`: Utility for managing network connections.
  - `netcat -a`: Utility for managing network connections with all.
  - `netcat -b`: Utility for managing network connections with bind.
  - `netcat -c`: Utility for managing network connections with close.
  - `netcat -d`: Utility for managing network connections with delay.
  - `netcat -e`: Utility for managing network connections with execute.
  - `netcat -f`: Utility for managing network connections with file.
  - `netcat -g`: Utility for managing network connections with gateway.
  - `netcat -h`: Utility for managing network connections with help.
  - `netcat -i`: Utility for managing network connections with interval.
  - `netcat -l`: Utility for managing network connections with listen.
  - `netcat -m`: Utility for managing network connections with max.
  - `netcat -n`: Utility for managing network connections with numeric.
  - `netcat -o`: Utility for managing network connections with output.
  - `netcat -p`: Utility for managing network connections with port.
  - `netcat -q`: Utility for managing network connections with quit.
  - `netcat -r`: Utility for managing network connections with random.
  - `netcat -s`: Utility for managing network connections with source.
  - `netcat -t`: Utility for managing network connections with tcp.
  - `netcat -u`: Utility for managing network connections with udp.
  - `netcat -v`: Utility for managing network connections with verbose.
  - `netcat -w`: Utility for managing network connections with timeout.
  - `netcat -x`: Utility for managing network connections with proxy.
  - `netcat -z`: Utility for managing network connections with zero.

- **iftop**: Display bandwidth usage on an interface.
- **Commands**:

  - `iftop`: Display bandwidth usage on an interface.
  - `iftop -a`: Display bandwidth usage on an interface with all.
  - `iftop -b`: Display bandwidth usage on an interface with bar.
  - `iftop -c`: Display bandwidth usage on an interface with config.
  - `iftop -d`: Display bandwidth usage on an interface with display.
  - `iftop -e`: Display bandwidth usage on an interface with elapsed.
  - `iftop -f`: Display bandwidth usage on an interface with filter.
  - `iftop -h`: Display bandwidth usage on an interface with help.
  - `iftop -i`: Display bandwidth usage on an interface with interface.
  - `iftop -l`: Display bandwidth usage on an interface with log.
  - `iftop -n`: Display bandwidth usage on an interface with numeric.
  - `iftop -o`: Display bandwidth usage on an interface with order.
  - `iftop -p`: Display bandwidth usage on an interface with port.
  - `iftop -s`: Display bandwidth usage on an interface with sort.
  - `iftop -t`: Display bandwidth usage on an interface with time.
  - `iftop -v`: Display bandwidth usage on an interface with version.

- **nethogs**: Monitor network traffic.
- **Commands**:

  - `nethogs`: Monitor network traffic.
  - `nethogs -a`: Monitor network traffic with all.
  - `nethogs -b`: Monitor network traffic with bytes.
  - `nethogs -c`: Monitor network traffic with capture.
  - `nethogs -d`: Monitor network traffic with device.
  - `nethogs -e`: Monitor network traffic with ethernet.
  - `nethogs -f`: Monitor network traffic with filter.
  - `nethogs -h`: Monitor network traffic with help.
  - `nethogs -i`: Monitor network traffic with interface.
  - `nethogs -l`: Monitor network traffic with log.
  - `nethogs -n`: Monitor network traffic with numeric.
  - `nethogs -o`: Monitor network traffic with order.
  - `nethogs -p`: Monitor network traffic with port.
  - `nethogs -s`: Monitor network traffic with sort.
  - `nethogs -t`: Monitor network traffic with time.
  - `nethogs -v`: Monitor network traffic with version.

- **bmon**: Bandwidth monitor and rate estimator.
- **Commands**:

  - `bmon`: Bandwidth monitor and rate estimator.
  - `bmon -a`: Bandwidth monitor and rate estimator with all.
  - `bmon -b`: Bandwidth monitor and rate estimator with bytes.
  - `bmon -c`: Bandwidth monitor and rate estimator with capture.
  - `bmon -d`: Bandwidth monitor and rate estimator with device.
  - `bmon -e`: Bandwidth monitor and rate estimator with ethernet.
  - `bmon -f`: Bandwidth monitor and rate estimator with filter.
  - `bmon -h`: Bandwidth monitor and rate estimator with help.
  - `bmon -i`: Bandwidth monitor and rate estimator with interface.
  - `bmon -l`: Bandwidth monitor and rate estimator with log.
  - `bmon -n`: Bandwidth monitor and rate estimator with numeric.
  - `bmon -o`: Bandwidth monitor and rate estimator with order.
  - `bmon -p`: Bandwidth monitor and rate estimator with port.
  - `bmon -s`: Bandwidth monitor and rate estimator with sort.
  - `bmon -t`: Bandwidth monitor and rate estimator with time.
  - `bmon -v`: Bandwidth monitor and rate estimator with version.

- **iperf**: Network bandwidth measurement tool.
- **Commands**:

  - `iperf`: Network bandwidth measurement tool.
  - `iperf -a`: Network bandwidth measurement tool with all.
  - `iperf -b`: Network bandwidth measurement tool with bind.
  - `iperf -c`: Network bandwidth measurement tool with client.
  - `iperf -d`: Network bandwidth measurement tool with dual.
  - `iperf -e`: Network bandwidth measurement tool with execute.
  - `iperf -f`: Network bandwidth measurement tool with format.
  - `iperf -h`: Network bandwidth measurement tool with help.
  - `iperf -i`: Network bandwidth measurement tool with interval.
  - `iperf -l`: Network bandwidth measurement tool with length.
  - `iperf -m`: Network bandwidth measurement tool with mss.
  - `iperf -n`: Network bandwidth measurement tool with num.
  - `iperf -o`: Network bandwidth measurement tool with output.
  - `iperf -p`: Network bandwidth measurement tool with port.
  - `iperf -r`: Network bandwidth measurement tool with reverse.
  - `iperf -s`: Network bandwidth measurement tool with server.
  - `iperf -t`: Network bandwidth measurement tool with time.
  - `iperf -u`: Network bandwidth measurement tool with udp.
  - `iperf -v`: Network bandwidth measurement tool with verbose.
  - `iperf -w`: Network bandwidth measurement tool with window.

- **mtr**: Network diagnostic tool.
- **Commands**:

  - `mtr`: Network diagnostic tool.
  - `mtr -a`: Network diagnostic tool with all.
  - `mtr -b`: Network diagnostic tool with bitfields.
  - `mtr -c`: Network diagnostic tool with cycles.
  - `mtr -d`: Network diagnostic tool with display.
  - `mtr -e`: Network diagnostic tool with extended.
  - `mtr -f`: Network diagnostic tool with filename.
  - `mtr -h`: Network diagnostic tool with help.
  - `mtr -i`: Network diagnostic tool with interval.
  - `mtr -l`: Network diagnostic tool with local.
  - `mtr -n`: Network diagnostic tool with numeric.
  - `mtr -o`: Network diagnostic tool with order.
  - `mtr -p`: Network diagnostic tool with port.
  - `mtr -q`: Network diagnostic tool with quiet.
  - `mtr -r`: Network diagnostic tool with report.
  - `mtr -s`: Network diagnostic tool with split.
  - `mtr -t`: Network diagnostic tool with tcp.
  - `mtr -u`: Network diagnostic tool with udp.
  - `mtr -v`: Network diagnostic tool with version.

- **nmap**: Network exploration tool and security scanner.
- **Commands**:

  - `nmap`: Network exploration tool and security scanner.
  - `nmap -a`: Network exploration tool and security scanner with all.
  - `nmap -b`: Network exploration tool and security scanner with badsum.
  - `nmap -c`: Network exploration tool and security scanner with checksum.
  - `nmap -d`: Network exploration tool and security scanner with debugging.
  - `nmap -e`: Network exploration tool and security scanner with ethernet.
  - `nmap -f`: Network exploration tool and security scanner with fragmentation.
  - `nmap -h`: Network exploration tool and security scanner with help.
  - `nmap -i`: Network exploration tool and security scanner with idle.
  - `nmap -l`: Network exploration tool and security scanner with list.
  - `nmap -n`: Network exploration tool and security scanner with numeric.
  - `nmap -o`: Network exploration tool and security scanner with output.
  - `nmap -p`: Network exploration tool and security scanner with port.
  - `nmap -q`: Network exploration tool and security scanner with quick.
  - `nmap -r`: Network exploration tool and security scanner with reason.
  - `nmap -s`: Network exploration tool and security scanner with scan.
  - `nmap -t`: Network exploration tool and security scanner with timing.
  - `nmap -u`: Network exploration tool and security scanner with udp.
  - `nmap -v`: Network exploration tool and security scanner with verbose.
  - `nmap -w`: Network exploration tool and security scanner with write.

- **arp**: Manipulate the system ARP cache.
- **Commands**:

  - `arp`: Manipulate the system ARP cache.
  - `arp -a`: Manipulate the system ARP cache with all.
  - `arp -d`: Manipulate the system ARP cache with delete.
  - `arp -e`: Manipulate the system ARP cache with ethernet.
  - `arp -f`: Manipulate the system ARP cache with file.
  - `arp -g`: Manipulate the system ARP cache with get.
  - `arp -h`: Manipulate the system ARP cache with help.
  - `arp -i`: Manipulate the system ARP cache with interface.
  - `arp -l`: Manipulate the system ARP cache with list.
  - `arp -n`: Manipulate the system ARP cache with numeric.
  - `arp -p`: Manipulate the system ARP cache with publish.
  - `arp -q`: Manipulate the system ARP cache with query.
  - `arp -r`: Manipulate the system ARP cache with read.
  - `arp -s`: Manipulate the system ARP cache with set.
  - `arp -v`: Manipulate the system ARP cache with verbose.

- **ip**: Show / manipulate routing, devices, policy routing, and tunnels.
- **Commands**:

  - `ip`: Show / manipulate routing, devices, policy routing, and tunnels.
  - `ip -a`: Show / manipulate routing, devices, policy routing, and tunnels with all.
  - `ip -b`: Show / manipulate routing, devices, policy routing, and tunnels with brief.
  - `ip -c`: Show / manipulate routing, devices, policy routing, and tunnels with commands.
  - `ip -d`: Show / manipulate routing, devices, policy routing, and tunnels with details.
  - `ip -e`: Show / manipulate routing, devices, policy routing, and tunnels with execute.
  - `ip -f`: Show / manipulate routing, devices, policy routing, and tunnels with family.
  - `ip -h`: Show / manipulate routing, devices, policy routing, and tunnels with help.
  - `ip -i`: Show / manipulate routing, devices, policy routing, and tunnels with interface.
  - `ip -l`: Show / manipulate routing, devices, policy routing, and tunnels with link.
  - `ip -m`: Show / manipulate routing, devices, policy routing, and tunnels with monitor.
  - `ip -n`: Show / manipulate routing, devices, policy routing, and tunnels with netns.
  - `ip -o`: Show / manipulate routing, devices, policy routing, and tunnels with oneline.
  - `ip -p`: Show / manipulate routing, devices, policy routing, and tunnels with protocol.
  - `ip -r`: Show / manipulate routing, devices, policy routing, and tunnels with resolve.
  - `ip -s`: Show / manipulate routing, devices, policy routing, and tunnels with statistics.
  - `ip -t`: Show / manipulate routing, devices, policy routing, and tunnels with terse.
  - `ip -v`: Show / manipulate routing, devices, policy routing, and tunnels with verbose.

### SOFTWARE

- **apt**: Advanced Package Tool.
- **Commands**:

  - `apt`: Advanced Package Tool.
  - `apt -a`: Advanced Package Tool with all.
  - `apt -b`: Advanced Package Tool with build.
  - `apt -c`: Advanced Package Tool with cache.
  - `apt -d`: Advanced Package Tool with download.
  - `apt -e`: Advanced Package Tool with edit.
  - `apt -f`: Advanced Package Tool with fix-broken.
  - `apt -g`: Advanced Package Tool with generate.
  - `apt -h`: Advanced Package Tool with help.
  - `apt -i`: Advanced Package Tool with install.
  - `apt -l`: Advanced Package Tool with list.
  - `apt -m`: Advanced Package Tool with mark.
  - `apt -n`: Advanced Package Tool with no.
  - `apt -o`: Advanced Package Tool with option.
  - `apt -p`: Advanced Package Tool with purge.
  - `apt -q`: Advanced Package Tool with quiet.
  - `apt -r`: Advanced Package Tool with remove.
  - `apt -s`: Advanced Package Tool with search.
  - `apt -t`: Advanced Package Tool with target-release.
  - `apt -u`: Advanced Package Tool with update.
  - `apt -v`: Advanced Package Tool with version.

  - **/etc/apt/sources.list.d**: Directory for additional APT repositories.
  - **/etc/apt.conf**: APT configuration file.

- **dpkg**: Package manager for Debian.
- **Commands**:

  - `dpkg`: Package manager for Debian.
  - `dpkg -a`: Package manager for Debian with all.
  - `dpkg -b`: Package manager for Debian with build.
  - `dpkg -c`: Package manager for Debian with contents.
  - `dpkg -d`: Package manager for Debian with debug.
  - `dpkg -e`: Package manager for Debian with extract.
  - `dpkg -f`: Package manager for Debian with field.
  - `dpkg -g`: Package manager for Debian with get-selections.
  - `dpkg -h`: Package manager for Debian with help.
  - `dpkg -i`: Package manager for Debian with install.
  - `dpkg -l`: Package manager for Debian with list.
  - `dpkg -m`: Package manager for Debian with merge.
  - `dpkg -n`: Package manager for Debian with no.
  - `dpkg -o`: Package manager for Debian with option.
  - `dpkg -p`: Package manager for Debian with purge.
  - `dpkg -q`: Package manager for Debian with query.
  - `dpkg -r`: Package manager for Debian with remove.
  - `dpkg -s`: Package manager for Debian with status.
  - `dpkg -t`: Package manager for Debian with trigger.
  - `dpkg -u`: Package manager for Debian with update.
  - `dpkg -v`: Package manager for Debian with version.

- **rpm**: Package manager for Red Hat.
- **Commands**:

  - `rpm`: Package manager for Red Hat.
  - `rpm -a`: Package manager for Red Hat with all.
  - `rpm -b`: Package manager for Red Hat with build.
  - `rpm -c`: Package manager for Red Hat with check.
  - `rpm -d`: Package manager for Red Hat with debug.
  - `rpm -e`: Package manager for Red Hat with erase.
  - `rpm -f`: Package manager for Red Hat with freshen.
  - `rpm -g`: Package manager for Red Hat with group.
  - `rpm -h`: Package manager for Red Hat with help.
  - `rpm -i`: Package manager for Red Hat with install.
  - `rpm -l`: Package manager for Red Hat with list.
  - `rpm -m`: Package manager for Red Hat with modify.
  - `rpm -n`: Package manager for Red Hat with no.
  - `rpm -o`: Package manager for Red Hat with options.
  - `rpm -p`: Package manager for Red Hat with package.
  - `rpm -q`: Package manager for Red Hat with query.
  - `rpm -r`: Package manager for Red Hat with replace.
  - `rpm -s`: Package manager for Red Hat with setperms.
  - `rpm -t`: Package manager for Red Hat with test.
  - `rpm -u`: Package manager for Red Hat with update.
  - `rpm -v`: Package manager for Red Hat with verify.

- **yum**: Package manager for Red Hat.
- **Commands**:

  - `yum`: Package manager for Red Hat.
  - `yum -a`: Package manager for Red Hat with all.
  - `yum -b`: Package manager for Red Hat with best.
  - `yum -c`: Package manager for Red Hat with check.
  - `yum -d`: Package manager for Red Hat with download.
  - `yum -e`: Package manager for Red Hat with erase.
  - `yum -f`: Package manager for Red Hat with freshen.
  - `yum -g`: Package manager for Red Hat with group.
  - `yum -h`: Package manager for Red Hat with help.
  - `yum -i`: Package manager for Red Hat with install.
  - `yum -l`: Package manager for Red Hat with list.
  - `yum -m`: Package manager for Red Hat with merge.
  - `yum -n`: Package manager for Red Hat with no.
  - `yum -o`: Package manager for Red Hat with options.
  - `yum -p`: Package manager for Red Hat with package.
  - `yum -q`: Package manager for Red Hat with query.
  - `yum -r`: Package manager for Red Hat with remove.
  - `yum -s`: Package manager for Red Hat with search.
  - `yum -t`: Package manager for Red Hat with time.
  - `yum -u`: Package manager for Red Hat with update.
  - `yum -v`: Package manager for Red Hat with version.

- **zypper**: Package manager for SUSE.
- **Commands**:

  - `zypper`: Package manager for SUSE.
  - `zypper -a`: Package manager for SUSE with all.
  - `zypper -b`: Package manager for SUSE with best.
  - `zypper -c`: Package manager for SUSE with check.
  - `zypper -d`: Package manager for SUSE with download.
  - `zypper -e`: Package manager for SUSE with erase.
  - `zypper -f`: Package manager for SUSE with freshen.
  - `zypper -g`: Package manager for SUSE with group.
  - `zypper -h`: Package manager for SUSE with help.
  - `zypper -i`: Package manager for SUSE with install.
  - `zypper -l`: Package manager for SUSE with list.
  - `zypper -m`: Package manager for SUSE with merge.
  - `zypper -n`: Package manager for SUSE with no.
  - `zypper -o`: Package manager for SUSE with options.
  - `zypper -p`: Package manager for SUSE with package.
  - `zypper -q`: Package manager for SUSE with query.
  - `zypper -r`: Package manager for SUSE with remove.
  - `zypper -s`: Package manager for SUSE with search.
  - `zypper -t`: Package manager for SUSE with time.
  - `zypper -u`: Package manager for SUSE with update.
  - `zypper -v`: Package manager for SUSE with version.

- **pacman**: Package manager for Arch Linux.
- **Commands**:

  - `pacman`: Package manager for Arch Linux.
  - `pacman -a`: Package manager for Arch Linux with all.
  - `pacman -b`: Package manager for Arch Linux with build.
  - `pacman -c`: Package manager for Arch Linux with check.
  - `pacman -d`: Package manager for Arch Linux with download.
  - `pacman -e`: Package manager for Arch Linux with erase.
  - `pacman -f`: Package manager for Arch Linux with freshen.
  - `pacman -g`: Package manager for Arch Linux with group.
  - `pacman -h`: Package manager for Arch Linux with help.
  - `pacman -i`: Package manager for Arch Linux with install.
  - `pacman -l`: Package manager for Arch Linux with list.
  - `pacman -m`: Package manager for Arch Linux with merge.
  - `pacman -n`: Package manager for Arch Linux with no.
  - `pacman -o`: Package manager for Arch Linux with options.
  - `pacman -p`: Package manager for Arch Linux with package.
  - `pacman -q`: Package manager for Arch Linux with query.
  - `pacman -r`: Package manager for Arch Linux with remove.
  - `pacman -s`: Package manager for Arch Linux with search.
  - `pacman -t`: Package manager for Arch Linux with time.
  - `pacman -u`: Package manager for Arch Linux with update.
  - `pacman -v`: Package manager for Arch Linux with version.

- **createrepo**: Create a repository. Updates the XML files used to reference the repository location.
- **.repo Configuration File**: Configuration file for YUM. Provides additional information about the repository and is stored in the /etc/yum.repos.d/ directory.
- **yum.conf**: Configuration file for YUM. Provides additional information about the repository and is stored in the /etc/ directory.
- **yum.repos.d**: Directory that contains the .repo configuration files for YUM.
- **rpmdb**: RPM database. Contains information about installed packages.
- **rpm2cpio**: Extracts the contents of an RPM package.
- **rpmbuild**: Builds an RPM package.
- **rpmsign**: Signs an RPM package.
- **reposync**: Synchronizes a local repository with a remote repository. Manages the mirroring process.
- **/etc/apt.conf**: Configuration file for APT. Provides additional information about the repository and is stored in the /etc/ directory.
- **/etc/apt/sources.list**: Configuration file for APT. Provides additional information about the repository and is stored in the /etc/ directory.
- **/etc/apt/sources.list.d**: Directory that contains the .list configuration files for APT.

### Acquire Software

- **wget/curl**: Download files from the internet.

  - `wget http://example.com/file.tar.gz`

    - `-b`: Background.
    - `-c`: Continue.
    - `-d`: Debug.
    - `-h`: Help.
    - `-i`: Input file.
    - `-l`: Limit.
    - `-m`: Mirror.
    - `-n`: Number of tries.

  - `curl -O http://example.com/file.tar.gz`
    - `-#`: Progress bar.
    - `-A`: User agent.
    - `-b`: Background.
    - `-c`: Continue.
    - `-d`: Debug.
    - `-h`: Help.
    - `-i`: Input file.
    - `-l`: Limit.
    - `-m`: Mirror.
    - `-n`: Number of tries.

| **wget**                       | **curl**                          |
| ------------------------------ | --------------------------------- |
| Command-line utility only      | Cross-platform                    |
| Can download files recursively | Cannot download files recursively |
| Supports HTTP/S and FTP only   | Supports more network protocols   |
| Downloads files                | Builds/manages complex requests   |

- **(tar) Tape Archiver**: Bundles together multiple files into a single tarball with a .tar extension.

  - `tar -cvf archive.tar file1 file2 file3`: Create a tarball.
  - `tar -xvf archive.tar`: Extract a tarball.
  - `tar -tvf archive.tar`: List the contents of a tarball.
  - `tar -rvf archive.tar file4`: Add a file to a tarball.
  - `tar -uvf archive.tar file5`: Update a file in a tarball.
  - `tar -xvf archive.tar -C /tmp`: Extract a tarball to a specific directory.

- **(dar) Disk Archiver**: Creates a backup of a directory.

  - `dar -c archive.dar directory1`: Create a backup.
  - `dar -x archive.dar`: Extract a backup.
  - `dar -l archive.dar`: List the contents of a backup.
  - `dar -r archive.dar directory2`: Add a file to a backup.
  - `dar -u archive.dar directory3`: Update a file in a backup.
  - `dar -x archive.dar -C /tmp`: Extract a backup to a specific directory.
  - `dar -R mydata -c full.bak`: Create a full backup.
  - `dar -R mydata -c -A incr.bak`: Create an incremental backup.
  - `dar -R mydata -c -A incr.bak -K incr.snar`: Create an incremental backup with a snapshot file.
  - `dar -R mydata -c -A incr.bak -K incr.snar -s 100M`: Create an incremental backup with a snapshot file and a size limit.

- **cpio**: Copies files to and from archives.

  - `cpio -o < file1 file2 file3 > archive.cpio`: Create an archive.
  - `cpio -i < archive.cpio`: Extract an archive.
  - `cpio -t < archive.cpio`: List the contents of an archive.
  - `cpio -p directory1 < archive.cpio`: Copy files to a directory.
  - `cpio -d < archive.cpio`: Create directories as needed.
  - `cpio -m < archive.cpio`: Preserve modification times.
  - `cpio -v < archive.cpio`: Verbose output.

- **dd (disk duplicate)**: Copies and converts files.

  - `dd if=/dev/sda of=/dev/sdb`: Copy a disk.
  - `dd if=/dev/sda of=/tmp/disk.img`: Copy a disk to an image file.
  - `dd if=/dev/sda of=/dev/sdb bs=512 count=1`: Copy the first sector of a disk.
  - `dd if=/dev/sda of=/dev/sdb bs=1M count=1`: Copy the first megabyte of a disk.
  - `dd if=/dev/zero of=/dev/sda`: Write zeros to a disk.
  - `dd if=/dev/zero of=/dev/sda bs=1M count=1`: Write zeros to the first megabyte of a disk.
  - `dd if=/dev/urandom of=/dev/sda`: Write random data to a disk.
  - `dd if=/dev/urandom of=/dev/sda bs=1M count=1`: Write random data to the first megabyte of a disk.

- **mirrorvg**: Copies a volume group to another disk.

  - `mirrorvg -m /dev/vg1 /dev/sdb`: Mirror a volume group.
  - `mirrorvg -l /dev/vg1`: List logical volumes in a volume group.
  - `mirrorvg -c /dev/vg1`: Check a mirrored volume group.
  - `mirrorvg -r /dev/vg1`: Remove a mirrored volume group.
  - `mirrorvg -s /dev/vg1`: Split a mirrored volume group.
  - `mirrorvg -b /dev/vg1`: Break a mirrored volume group.
  - `mirrorvg -a /dev/vg1`: Add a mirrored volume group.
  - `mirrorvg -p /dev/vg1`: Print mirrored volume group information.

- **pvmove**: Moves physical extents from one disk to another.

  - `pvmove /dev/sda /dev/sdb`: Move physical extents.
  - `pvmove -n /dev/sda /dev/sdb`: Move physical extents with a name.
  - `pvmove -v /dev/sda /dev/sdb`: Move physical extents with verbose output.
  - `pvmove -b /dev/sda /dev/sdb`: Move physical extents with a background process.
  - `pvmove -i 10 /dev/sda /dev/sdb`: Move physical extents with an interval.
  - `pvmove -t 10 /dev/sda /dev/sdb`: Move physical extents with a timeout.
  - `pvmove -d /dev/sda /dev/sdb`: Move physical extents with debug output.
  - `pvmove -s /dev/sda /dev/sdb`: Move physical extents with a status report.

- **rsync**: Synchronizes files and directories between two locations.

  - `rsync -avz /tmp/dir1/ /tmp/dir2`: Synchronize directories.
  - `rsync -avz /tmp/dir1/ user@remote:/tmp/dir2`: Synchronize directories over SSH.
  - `rsync -avz --delete /tmp/dir1/ /tmp/dir2`: Synchronize directories and delete extraneous files.
  - `rsync -avz --exclude='*.txt' /tmp/dir1/ /tmp/dir2`: Synchronize directories and exclude files.
  - `rsync -avz --dry-run /tmp/dir1/ /tmp/dir2`: Synchronize directories without making changes.
  - `rsync -avz --progress /tmp/dir1/ /tmp/dir2`: Synchronize directories and show progress.
  - `rsync -avz --bwlimit=100 /tmp/dir1/ /tmp/dir2`: Synchronize directories and limit bandwidth.
  - `rsync -avz --log-file=/tmp/rsync.log /tmp/dir1/ /tmp/dir2`: Synchronize directories and log output.
  - `rsync -avz --include='*.txt' /tmp/dir1/ /tmp/dir2`: Synchronize directories and include files.
  - `rsync -avz --exclude='*.txt' --delete /tmp/dir1/ /tmp/dir2`: Synchronize directories and exclude files.

- **(gzip) GNU Zip**: Compresses files with a .gz extension.

      - `gzip file1`: Compress a file.
      - `gzip -d file1.gz`: Decompress a file.
      - `gzip -l file1.gz`: List the contents of a compressed file.
      - `gzip -k file1`: Keep the original file.
      - `gzip -r directory1`: Compress all files in a directory.
      - `gzip -t file1.gz`: Test a compressed file.

- **(gunzip) GNU Zip**: Decompresses files with a .gz extension.

        - `gunzip file1.gz`: Decompress a file.
        - `gunzip -l file1.gz`: List the contents of a compressed file.
        - `gunzip -k file1.gz`: Keep the original file.
        - `gunzip -r directory1`: Decompress all files in a directory.
        - `gunzip -t file1.gz`: Test a compressed file.

- **xz**: Compresses files with a .xz extension.

      - `xz file1`: Compress a file.
      - `xz -d file1.xz`: Decompress a file.
      - `xz -l file1.xz`: List the contents of a compressed file.
      - `xz -k file1`: Keep the original file.
      - `xz -r directory1`: Compress all files in a directory.
      - `xz -t file1.xz`: Test a compressed file.

- **(tar.xz) Tarball**: Compresses files with a .tar.xz extension.

        - `tar -cJvf archive.tar.xz file1 file2 file3`: Create a tarball.
        - `tar -xJvf archive.tar.xz`: Extract a tarball.
        - `tar -tJvf archive.tar.xz`: List the contents of a tarball.
        - `tar -rJvf archive.tar.xz file4`: Add a file to a tarball.
        - `tar -uJvf archive.tar.xz file5`: Update a file in a tarball.
        - `tar -xJvf archive.tar.xz -C /tmp`: Extract a tarball to a specific directory.

- **(bzip2) Bzip2**: Compresses files with a .bz2 extension.

      - `bzip2 file1`: Compress a file.
      - `bzip2 -d file1.bz2`: Decompress a file.
      - `bzip2 -l file1.bz2`: List the contents of a compressed file.
      - `bzip2 -k file1`: Keep the original file.
      - `bzip2 -r directory1`: Compress all files in a directory.
      - `bzip2 -t file1.bz2`: Test a compressed file.

- **(zip) Zip**: Compresses files with a .zip extension.

        - `zip archive.zip file1 file2 file3`: Create a zip archive.
        - `unzip archive.zip`: Extract a zip archive.
        - `unzip -l archive.zip`: List the contents of a zip archive.
        - `unzip -t archive.zip`: Test a zip archive.
        - `unzip -d /tmp archive.zip`: Extract a zip archive to a specific directory.

- **(unzip) Unzip**: Extracts files from a .zip archive.

          - `unzip archive.zip`: Extract a zip archive.
          - `unzip -l archive.zip`: List the contents of a zip archive.
          - `unzip -t archive.zip`: Test a zip archive.
          - `unzip -d /tmp archive.zip`: Extract a zip archive to a specific directory.

- **(tar.gz) Tarball**: Compresses files with a .tar.gz extension.
  - `tar -czvf archive.tar.gz file1 file2 file3`: Create a tarball.
  - `tar -xzvf archive.tar.gz`: Extract a tarball.
  - `tar -tzvf archive.tar.gz`: List the contents of a tarball.
  - `tar -rzvf archive.tar.gz file4`: Add a file to a tarball.
  - `tar -uzvf archive.tar.gz file5`: Update a file in a tarball.
  - `tar -xzvf archive.tar.gz -C /tmp`: Extract a tarball to a specific directory.

### Security

- **Chroot Jail**: Restricts a process to a specific directory.
  - **/etc/chroot.conf**: Configuration file for chroot.
  - **/etc/chroot.d**: Directory that contains chroot configuration files.
- **SELinux**: Security-Enhanced Linux. Provides access control security policies. References inodes directly.
  - **/etc/selinux/config**: Configuration file for SELinux.
  - **/etc/selinux/semanage.conf**: Configuration file for SELinux.
  - **/etc/selinux/semanage.conf.d**: Directory that contains SELinux configuration files.
- **AppArmor**: Application Armor. Provides access control security policies. Works with file system objects.
  - **/etc/apparmor.d**: Directory that contains AppArmor configuration files.
  - **tunables**: AppArmor tunables file.
    - **/etc/apparmor.d/tunables/home**: AppArmor tunables file.
  - **abstractions**: AppArmor abstractions file.
  - **profiles**: AppArmor profiles file.
- **ACLs**: Access Control Lists. Provide fine-grained permissions for files and directories.
  - **getfacl**: Get file ACLs.
  - **setfacl**: Set file ACLs.
- **PAM**: Pluggable Authentication Modules. Provides dynamic authentication support.
  - **/etc/pam.d**: Directory that contains PAM configuration files.
- **Sudo**: Provides limited root access to users.
  - **/etc/sudoers**: Configuration file for sudo.
  - **/etc/sudoers.d**: Directory that contains sudo configuration files.
- **iptables**: Command-line utility for configuring the Linux kernel firewall.
  - **/etc/sysconfig/iptables**: Configuration file for iptables.
  - **/etc/sysconfig/iptables-config**: Configuration file for iptables.
  - **/etc/sysconfig/ip6tables**: Configuration file for iptables.
  - **/etc/sysconfig/ip6tables-config**: Configuration file for iptables.
  - **/var/log/messages**: Log file for iptables. Contains system messages.
  - **/var/log/kern.log**: Log file for iptables. Contains kernel messages.
    - **Filter table**: Default table for iptables.
      - **INPUT chain**: Input chain for iptables.
      - **OUTPUT chain**: Output chain for iptables.
      - **FORWARD chain**: Forward chain for iptables.
    - **NAT table**: Network Address Translation table for iptables.
      - **PREROUTING chain**: Pre-routing chain for iptables.
      - **POSTROUTING chain**: Post-routing chain for iptables.
      - **OUTPUT chain**: Output chain for iptables.
    - **Mangle table**: Packet alteration table for iptables. Used to alter the packets' TCP/IP header.
      - **PREROUTING chain**: Pre-routing chain for iptables.
      - **OUTPUT chain**: Output chain for iptables.
      - **INPUT chain**: Input chain for iptables.
      - **FORWARD chain**: Forward chain for iptables.
      - **POSTROUTING chain**: Post-routing chain for iptables.
    - **Raw table**: Raw table for iptables. Used to mark packets for special processing. Does not track connection state. Used for performance.
      - **PREROUTING chain**: Pre-routing chain for iptables.
      - **OUTPUT chain**: Output chain for iptables.
    - **Security table**: Security table for iptables. Used to filter packets based on SELinux context.
      - **INPUT chain**: Input chain for iptables.
      - **OUTPUT chain**: Output chain for iptables.
      - **FORWARD chain**: Forward chain for iptables.
- **ufw**: Uncomplicated Firewall. Command-line utility for configuring the Linux kernel firewall.
  - **/etc/ufw**: Directory that contains ufw configuration files.
  - **/etc/default/ufw**: Configuration file for ufw. Configure high-level settings like policy defaults and kernel module usage.
  - **/etc/ufw/before.rules**: Configuration file for ufw.
  - **/etc/ufw/after.rules**: Configuration file for ufw.
  - **/etc/ufw/sysctl.conf**: Configuration file for ufw.
- **firewalld**: Dynamic Firewall Manager. Command-line utility for configuring the Linux kernel firewall without requiring a restart.
  - **/etc/firewalld**: Directory that contains firewalld configuration files.
  - **/etc/firewalld/firewalld.conf**: Configuration file for firewalld.
  - **/etc/firewalld/zones**: Directory that contains firewalld zone configuration files.
  - **/etc/firewalld/services**: Directory that contains firewalld service configuration files.
  - **/etc/firewalld/icmptypes**: Directory that contains firewalld ICMP type configuration files.
  - **/etc/firewalld/richrules**: Directory that contains firewalld rich rule configuration files.
  - **/etc/firewalld/direct.xml**: Configuration file for firewalld.
  - **firewall-cmd**: Command-line utility for firewalld.
    - **--get-zones**: Get firewalld zones.
    - **--get-services**: Get firewalld services.
    - **--get-active-zones**: Get active firewalld zones.
    - **--get-default-zone**: Get the default firewalld zone.
    - **--get-icmptypes**: Get firewalld ICMP types.
    - **--get-rich-rules**: Get firewalld rich rules.
    - **--get-log-denied**: Get firewalld log denied.
    - **--get-logging**: Get firewalld logging.
    - **--get-nflog-group**: Get firewalld nflog group.
    - **--get-nflog-prefix**: Get firewalld nflog prefix.
    - **--get-nflog-range**: Get firewalld nflog range.
    - **--get-nflog-threshold**: Get firewalld nflog threshold.
    - **--get-nflog-size**: Get firewalld nflog size.
    - **--get-nflog-numeric**: Get firewalld nflog numeric.
    - **--get-nflog-reset**: Get firewalld nflog reset.
  - **firewall-offline-cmd**: Command-line utility for firewalld.
  - **firewall-config**: Graphical utility for firewalld.
- **DenyHost**: Intrusion prevention software.
  - **/etc/denyhosts.conf**: Configuration file for DenyHost.
    - **ADMIN_EMAIL**: Email address for DenyHost notifications.
      - **SMTP_HOST**: SMTP server for DenyHost notifications.
      - **SMTP_PORT**: SMTP port for DenyHost notifications.
      - **SMTP_FROM**: Email address for DenyHost notifications.
      - **SMTP_SUBJECT**: Subject line for DenyHost notifications.
      - **SMTP_USERNAME**: SMTP username for DenyHost notifications.
      - **SMTP_PASSWORD**: SMTP password for DenyHost notifications.
    - **BLOCK_SERVICE**: Service to block for DenyHost.
    - **DENY_THRESHOLD_INVALID**: Invalid login threshold for DenyHost.
    - **DENY_THRESHOLD_VALID**: Valid login threshold for DenyHost.
    - **DENY_THRESHOLD_ROOT**: Root login threshold for DenyHost.
    - **DENY_THRESHOLD_RESTRICTED**: Restricted login threshold for DenyHost.
    - **DENY_THRESHOLD_ROOT_RESTRICTED**: Root restricted login threshold for DenyHost.
    - **DENY_THRESHOLD_UNKNOWN**: Unknown login threshold for DenyHost.
    - **DENY_THRESHOLD_VALID_FROM_SAME_IP**: Valid login from the same IP threshold for DenyHost.
    - **DENY_THRESHOLD_ROOT_FROM_SAME_IP**: Root login from the same IP threshold for DenyHost.
    - **DENY_THRESHOLD_RESTRICTED_FROM_SAME_IP**: Restricted login from the same IP threshold for DenyHost.
    - **DENY_THRESHOLD_ROOT_RESTRICTED_FROM_SAME_IP**: Root restricted login from the same IP threshold for DenyHost.
    - **DENY_THRESHOLD_UNKNOWN_FROM_SAME_IP**: Unknown login from the same IP threshold for DenyHost.
    - **DENY_THRESHOLD_ROOT_RESTRICTED**: Root restricted login threshold for DenyHost.
  - **/etc/hosts.deny**: Configuration file for DenyHost.
  - **/var/log/denyhosts**: Log file for DenyHost.
- **(fail2ban) Fail2Ban**: Intrusion prevention software.
- **/etc/fail2ban/jail.conf**: Configuration file for Fail2Ban.
  - **[DEFAULT]**: Default section for Fail2Ban.
    - **ignoreip**: IP addresses to ignore for Fail2Ban.
    - **bantime**: Ban time for Fail2Ban.
    - **findtime**: Find time for Fail2Ban.
    - **maxretry**: Maximum retries for Fail2Ban.
    - **backend**: Backend for Fail2Ban.
    - **usedns**: Use DNS for Fail2Ban.
    - **destemail**: Destination email for Fail2Ban.
    - **sender**: Sender for Fail2Ban.
    - **mta**: Mail transfer agent for Fail2Ban.
    - **protocol**: Protocol for Fail2Ban.
    - **chain**: Chain for Fail2Ban.
    - **action**: Action for Fail2Ban.
    - **banaction**: Ban action for Fail2Ban.
    - **bantime**: Ban time for Fail2Ban.
    - **findtime**: Find time for Fail2Ban.
    - **maxretry**: Maximum retries for Fail2Ban.
    - **backend**: Backend for Fail2Ban.
    - **usedns**: Use DNS for Fail2Ban.
    - **destemail**: Destination email for Fail2Ban.
    - **sender**: Sender for Fail2Ban.
    - **mta**: Mail transfer agent for Fail2Ban.
    - **protocol**: Protocol for Fail2Ban.
    - **chain**: Chain for Fail2Ban.
    - **action**: Action for Fail2Ban.
    - **banaction**: Ban action for Fail2Ban.
  - **[sshd]**: SSHD section for Fail2Ban.
    - **enabled**: Enable SSHD for Fail2Ban.
    - **port**: Port for SSHD for Fail2Ban.
    - **filter**: Filter for SSHD for Fail2Ban.
    - **logpath**: Log path for SSHD for Fail2Ban.
    - **maxretry**: Maximum retries for SSHD for Fail2Ban.
    - **findtime**: Find time for SSHD for Fail2Ban.
    - **bantime**: Ban time for SSHD for Fail2Ban.
    - **action**: Action for SSHD for Fail2Ban.
    - **banaction**: Ban action for SSHD for Fail2Ban.
  - **[apache]**: Apache section for Fail2Ban.
    - **enabled**: Enable Apache for Fail2Ban.
- **fail2ban-client**: Fail2Ban command-line client. Manages Fail2Ban configuration.
- **fail2ban-server**: Fail2Ban server. Monitors log files and bans malicious IP addresses.
- **sealert**: SELinux alert browser. Displays detailed information about SELinux alerts.
- **semanage**: SELinux policy management tool. Manages SELinux policy.
- **setenforce**: Set the enforcing mode of SELinux.
- **getenforce**: Get the enforcing mode of SELinux.
- **restorecon**: Restore the SELinux context of files.
- **chcon**: Change the SELinux context of files.
- **audit2allow**: Generate SELinux policy modules.
  - **RuleName.pp**: SELinux policy module. Policy package file.
  - **RuleName.te**: SELinux policy module. Type engorcement file.
- **audit2why**: Explain SELinux audit messages.
- **auditd**: Audit daemon. Collects and logs SELinux audit messages.
- **ls-Z**: List SELinux context of files.
- **ps-Z**: List SELinux context of processes.
- **runcon**: Run a command in a specific SELinux context.
- **newrole**: Change to a new SELinux role.

  - **/etc/fail2ban**: Directory that contains fail2ban configuration files.

  - **/etc/fail2ban**: Directory that contains fail2ban configuration files.

- **(LUKS) Linux Unified Key Setup**: Disk encryption.

  - `cryptsetup luksFormat /dev/sda1`: Encrypt a partition.
  - `cryptsetup luksOpen /dev/sda1 my_encrypted_partition`: Open an encrypted partition.
  - `cryptsetup luksClose my_encrypted_partition`: Close an encrypted partition.
  - `cryptsetup luksDump /dev/sda1`: Display information about an encrypted partition.
  - `cryptsetup luksAddKey /dev/sda1`: Add a key to an encrypted partition.
  - `cryptsetup luksRemoveKey /dev/sda1`: Remove a key from an encrypted partition.
  - `cryptsetup luksChangeKey /dev/sda1`: Change a key on an encrypted partition.
  - `cryptsetup luksKillSlot /dev/sda1`: Remove a key slot from an encrypted partition.

- **(GPG) GNU Privacy Guard**: Encrypts and signs data.

  - `gpg --gen-key`: Generate a new key pair.
  - `gpg --list-keys`: List public keys.
  - `gpg --list-secret-keys`: List private keys.
  - `gpg --delete-secret-keys`: Delete a key pair.

- **shred**: Securely delete files.

  - `shred file1`: Securely delete a file.
  - `shred -n 3 file1`: Securely delete a file three times.
  - `shred -u file1`: Securely delete a file and remove it.
  - `shred -v file1`: Securely delete a file and show progress.

- **(openssl) Open Secure Socket Layer**: Secure communication.

  - `openssl genrsa -out key.pem 2048`: Generate a private key.
  - `openssl req -new -key key.pem -out csr.pem`: Generate a certificate signing request.
  - `openssl x509 -req -in csr.pem -signkey key.pem -out cert.pem`: Generate a self-signed certificate.
  - `openssl pkcs12 -export -in cert.pem -inkey key.pem -out cert.p12`: Generate a PKCS#12 certificate.
  - `openssl s_client -connect example.com:443`: Connect to a secure server.
  - `openssl s_server -key key.pem -cert cert.pem -accept 443`: Start a secure server.

## **(ssh) Secure Shell**

Secure Shell (SSH) is a cryptographic network protocol for secure communication and remote management of servers. It allows users to log in to remote machines, execute commands, and transfer files securely.

---

### **Basic Commands and Usage**

1.  **Generate an SSH Key Pair**:

    - Command:

      `ssh-keygen -t rsa -b 2048 -f key`

    - **Description**: Creates a 2048-bit RSA key pair for secure authentication.
      - `-t rsa`: Specifies the key type.
      - `-b 2048`: Sets the key size to 2048 bits.
      - `-f key`: Defines the output filename (e.g., `key` for private and `key.pub` for public).

---

1.  **Copy an SSH Key to a Remote Host**:

    - Command:

      `ssh-copy-id -i id_rsa.pub user@host`

    - **Description**: Installs your public key (`id_rsa.pub`) on the remote server for password-less authentication.

---

1. **Add Private Key Identities**

   - Command:

     `ssh-add key`

   - **Description**: Adds the specified private key (`key`) to the SSH agent for authentication.

1. **Connect to a Remote Host with an SSH Key**:

   - Command:

     `ssh -i key user@host`

   - **Description**: Establishes an SSH connection to a remote host using the specified private key (`key`).

---

### **Tunneling with SSH**

1.  **Create an SSH Tunnel**:

    - Command:

      `ssh -L 8080:localhost:80 user@host`

    - **Description**: Forwards port `8080` on your local machine to port `80` on the remote host.
      - Useful for accessing web servers or other services running on the remote host through your local machine.

---

1.  **Create a Reverse SSH Tunnel**:

    - Command:

      `ssh -R 8080:localhost:80 user@host`

    - **Description**: Forwards port `8080` on the remote host to port `80` on your local machine.
      - Useful when accessing a service on your local machine from the remote host.

---

1.  **Create a Dynamic SSH Tunnel**:

    - Command:

      `ssh -D 8080 user@host`

    - **Description**: Sets up a SOCKS proxy on port `8080` on your local machine.
      - Useful for routing browser traffic securely through the SSH tunnel.

---

### **File Transfer with SSH**

1.  **Securely Copy Files to a Remote Host (SCP)**:

    - Command:

      `scp file1 user@host:/path`

    - **Description**: Transfers `file1` from your local machine to the specified directory (`/path`) on the remote host.

---

1.  **Secure File Transfer Protocol (SFTP)**:

    - Command:

      `sftp user@host`

    - **Description**: Provides an interactive interface for transferring files between your local machine and the remote host securely.

---

### **Practical Examples**

1.  Generate an RSA key pair:

    `ssh-keygen -t rsa -b 2048 -f mykey`

2.  Copy your public key to a server:

    `ssh-copy-id -i mykey.pub alex@192.168.1.10`

3.  Add the private key to the SSH agent:

    `ssh-add mykey`

4.  SSH into the server with the private key:

    `ssh -i mykey alex@192.168.1.10`

5.  Forward a web server on the remote host:

    `ssh -L 8080:localhost:80 alex@192.168.1.10`

6.  Transfer a file securely:

    `scp report.pdf alex@192.168.1.10:/home/alex/documents`

7.  Set up a SOCKS proxy:

    `ssh -D 8080 alex@192.168.1.10 -N`

- **TCP Wrapper**: Provides access control for network services.
  - **/etc/hosts.allow**: Configuration file for TCP Wrapper. Allows access to services.
  - **/etc/hosts.deny**: Configuration file for TCP Wrapper. Denies access to services.

### To disable Ctrl+Alt+Del on Linux, you can modify the system configuration to prevent this key combination from triggering a system reboot. Here's how to do it:

- For Systemd-based systems (e.g., Ubuntu, Debian, CentOS, etc.):
- Open the ctrl-alt-del configuration file:

`sudo systemctl edit ctrl-alt-del.target`

- Mask the target: Add the following lines in the editor:

`[Unit]`
`Description=Mask Ctrl+Alt+Del Reboot`
`RefuseManualStart=yes`
`RefuseManualStop=yes`

- Save and exit:

- Press Ctrl+O, then Enter to save.
- Press Ctrl+X to exit.
- Reload the systemctl daemon:

`sudo systemctl daemon-reexec`

- Verify the configuration:

`sudo systemctl status ctrl-alt-del.target`

- It should show as "masked".

- **Banner**: A message displayed before the login prompt.

  - **/etc/issue**: Banner displayed before the login prompt.
  - **/etc/issue.net**: Banner displayed before the login prompt for remote connections.
  - **/etc/motd**: Message displayed after login.
  - **/etc/ssh/banner**: Banner displayed before SSH login.

### Logging and Monitoring

- **syslog**: System logging daemon. Collects and logs system messages.

  - **/etc/syslog.conf**: Configuration file for syslog.
  - **/etc/rsyslog.conf**: Configuration file for rsyslog.
  - **/var/log/messages**: Log file for system messages.
  - **/var/log/syslog**: Log file for system messages.
  - **/var/log/auth.log**: Log file for authentication messages.
  - **/var/log/secure**: Log file for security messages.
  - **/var/log/maillog**: Log file for mail messages.
  - **/var/log/cron**: Log file for cron messages.
  - **/var/log/boot.log**: Log file for boot messages.
  - **/var/log/kern.log**: Log file for kernel messages.
  - **/var/log/dmesg**: Log file for kernel messages.
  - **/var/log/lastlog**: Log file for last login information.
  - **/var/log/wtmp**: Log file for login records.
  - **/var/log/btmp**: Log file for failed login attempts.
  - **/var/log/utmp**: Log file for current login information.
  - **/var/log/[application]**: Log file for application messages.
  - **logger**: Command-line utility for logging messages.
    - `-p`: Priority level.
    - `-t`: Tag.
    - `-f`: File.
    - `-i`: ID.
    - `-u`: Socket.
    - `-P`: Port.
    - `-n`: Network.
    - `-d`: Debug.
    - `-s`: Size.
    - `-r`: Remote.
    - `-T`: Timestamp.
    - `-h`: Host.
    - `-m`: Message.
    - `-w`: Wait.
    - `-v`: Verbose.
    - `-k`: Secure.
    - `-a`: Append.
    - `-b`: Batch.
    - `-c`: Count.
    - `-e`: Exit.
    - `-l`: Level.
    - `-o`: Output.
    - `-q`: Quiet.
    - `-x`: Hex.
    - `-z`: Zero.
    - `-A`: Address.
    - `-B`: Buffer.
    - `-C`: Command.
    - `-D`: Directory.
    - `-E`: Escape.
    - `-F`: Facility.
    - `-G`: Group.
    - `-H`: Header.
    - `-I`: Interval
    - `-J`: Journal.

- **journalctl**: Query and display messages from the systemd journal.

  - `-b`: Show messages from the current boot.
  - `-u`: Show messages from a specific unit.
  - `-f`: Follow messages in real-time.
  - `-n`: Show the last N lines.
  - `-p`: Show messages with a specific priority.
  - `-r`: Reverse the output.
  - `-o`: Output format.
  - `-k`: Show kernel messages.
  - `-x`: Show messages in a concise format.
  - `-t`: Show messages with a specific tag.
  - `-S`: Show messages since a specific time.
  - `-U`: Show messages until a specific time.
  - `-M`: Show messages from a specific machine.
  - `-a`: Show all messages.
  - `-c`: Show messages from a specific catalog.
  - `-l`: Show messages with long lines.
  - `-i`: Show messages with a specific identifier.
  - `-m`: Show messages with a specific message ID.
  - `-q`: Show messages with a specific message ID.
  - `-e`: Show messages with a specific message ID.
  - `-g`: Show messages with a specific message ID.
  - `-h`: Show messages with a specific message ID.
  - `-j`: Show messages with a specific message ID.
  - `-n`: Show messages with a specific message ID.
  - `-o`: Show messages with a specific message ID.
  - `-p`: Show messages with a specific message ID.
  - `-r`: Show messages with a specific message ID.
  - `-s`: Show messages with a specific message ID.
  - `-t`: Show messages with a specific message ID.
  - `-u`: Show messages with a specific message ID.
  - `-v`: Show messages with a specific message ID.
  - `-w`: Show messages with a specific message ID.
  - `-x`: Show messages with a specific message ID.
  - `-y`: Show messages with a specific message ID.
  - `-z`: Show messages with a specific message ID.
  - `-A`: Show messages with a specific message ID.
  - `-B`: Show messages with a specific message ID.
  - `-C`: Show messages with a specific message ID.
  - `-D`: Show messages with a specific message ID.
  - `-E`: Show messages with a specific message ID.
  - `-F`: Show messages with a specific message ID

- **logrotate**: Rotates, compresses, and archives log files.

  - **/etc/logrotate.conf**: Configuration file for logrotate.
  - **/etc/logrotate.d**: Directory that contains logrotate configuration files.
  - **/var/lib/logrotate/status**: Logrotate status file.
  - **/var/log/logrotate**: Logrotate log file.
  - **/var/log/messages**: Log file for logrotate messages.
  - **/var/log/syslog**: Log file for logrotate messages.
  - **/var/log/auth.log**: Log file for logrotate messages.
  - **/var/log/secure**: Log file for logrotate messages.
  - **/var/log/maillog**: Log file for logrotate messages.
  - **/var/log/cron**: Log file for logrotate messages.
  - **/var/log/boot.log**: Log file for logrotate messages.
  - **/var/log/kern.log**: Log file for logrotate messages.
  - **/var/log/dmesg**: Log file for logrotate messages.
  - **/var/log/lastlog**: Log file for logrotate messages.
  - **/var/log/wtmp**: Log file for logrotate messages.
  - **/var/log/btmp**: Log file for logrotate messages.
  - **/var/log/utmp**: Log file for logrotate messages.

- **logwatch**: Log analysis and reporting tool.
- **logcheck**: Log analysis and reporting tool.
- **rsyslog**: Enhanced system logging daemon.
- **auditd**: Audit daemon. Collects and logs security messages.
- **auditctl**: Audit control command. Manages audit rules.
- **ausearch**: Audit search command. Searches audit logs.
- **aureport**: Audit report command. Generates audit reports.
- **autrace**: Audit trace command. Traces system calls.
- **auparse**: Audit parse command. Parses audit logs.
- **audit.rules**: Audit rules file. Contains audit rules.
- **/etc/audit/auditd.conf**: Configuration file for auditd.
- **/etc/audit/audit.rules**: Configuration file for audit rules.
- **/var/log/audit/audit.log**: Log file for audit messages.
- **/var/log/audit/audit.rules**: Log file for audit rules.
- **/var/log/audit/audit.rules.d**: Directory that contains audit rules files.

- **syslog-ng**: Enhanced system logging daemon.
- **logstash**: Log data processing pipeline.
- **fluentd**: Log data collector.
- **graylog**: Log management platform.
- **splunk**: Log analysis and monitoring tool.
- **kibana**: Data visualization tool.
- **grafana**: Data visualization tool.
- **prometheus**: Monitoring and alerting toolkit.
- **telegraf**: Agent for collecting metrics.
- **influxdb**: Time-series database.
- **elasticsearch**: Distributed search and analytics engine.

- **last**: Show last logins.
- **lastb**: Show last failed logins.
- **lastlog**: Show last login information.
- **utmpdump**: Dump UTMP file.
- **wtmpdump**: Dump WTMP file.
- **ac**: Show connect time.
- **acpid**: Advanced Configuration and Power Interface daemon.
- **apmd**: Advanced Power Management daemon.
- **atd**: Job scheduler daemon.

### Bash Scripting

- **Shebang**: Specifies the interpreter for the script.

  - `#!/bin/bash`: Use the Bash interpreter.
  - `#!/bin/sh`: Use the Bourne shell interpreter.
  - `#!/bin/zsh`: Use the Z shell interpreter.
  - `#!/bin/dash`: Use the Debian Almquist shell interpreter.
  - `#!/bin/ksh`: Use the Korn shell interpreter.
  - `#!/bin/csh`: Use the C shell interpreter.
  - `#!/bin/tcsh`: Use the TENEX C shell interpreter.

- **Variables**: Store and manipulate data.

  - `variable=value`: Assign a value to a variable.
  - `echo $variable`: Print the value of a variable.
  - `export variable`: Export a variable to the environment.
  - `unset variable`: Unset a variable.
  - `readonly variable`: Make a variable read-only.
  - `readonly -p`: List read-only variables.
  - `readonly -f`: List read-only functions.

- **Environment Variables**: Predefined variables.

  - `$HOME`: Home directory.
  - `$PATH`: Search path for executables.
  - `$PWD`: Present working directory.
  - `$USER`: Username.
  - `$SHELL`: Shell.
  - `$TERM`: Terminal type.
  - `$EDITOR`: Default text editor.
  - `$LANG`: Default language.
  - `$LC_ALL`: Default locale.
  - `$TZ`: Timezone.
  - `$HOSTNAME`: Hostname.
  - `$PS1`: Primary prompt.
  - `$PS2`: Secondary prompt.
  - `$PS3`: Select prompt.
  - `$PS4`: Debug prompt.
  - `$IFS`: Internal field separator.
  - `$RANDOM`: Random number.
  - `$UID`: User ID.
  - `$EUID`: Effective user ID.
  - `$GID`: Group ID.
  - `$EGID`: Effective group ID.
  - `$PPID`: Parent process ID.
  - `$BASH_VERSION`: Bash version.
  - `$BASH`: Bash path.
  - `$BASH_ENV`: Bash environment file.
  - `$BASH_VERSINFO`: Bash version information.
  - `$BASH_SOURCE`: Bash source file.
  - `$BASH_SUBSHELL`: Bash subshell level.
  - `$BASH_ALIASES`: Bash aliases.
  - `$BASH_ARGC`: Bash argument count.
  - `$BASH_ARGV`: Bash argument vector.
  - `$BASH_LINENO`: Bash line number.
  - `$BASH_REMATCH`: Bash regular expression match.
  - `$BASH_EXECUTION_STRING`: Bash execution string.
  - `$BASH_COMMAND`: Bash command

  - **local configuration**: /etc/locale.conf
  - **user configuration**: ~/.bashrc
  - **system configuration**: /etc/bash.bashrc
  - **global configuration**: /etc/profile
  - **user configuration**: ~/.bash_profile
  - **LC\_\*={locale}**: Colletion of Localization Environment Variables for the system. Used to set the locale for the system.
  - **LANG={locale}**: Default locale for the system. Used to set the default locale for the system.
  - **LANGUAGE={locale}**: Language preference for the system. Used to set the language preference for the system.
  - **LC_ALL={locale}**: Override for all locale settings. Used to override all locale settings.
  - **TZ={timezone}**: Timezone for the system. Used to set the timezone for the system.
  - **PS1={prompt}**: Primary prompt for the shell. Used to set the primary prompt for the shell.

- **env**: Display environment variables.
- **printenv**: Display environment variables.
- **set**: Display shell variables.
- **export**: Export environment variables.
- **unset**: Unset environment variables.
- **readonly**: Make variables read-only.
- **declare**: Declare variables.
- **local**: Declare local variables.
- **typeset**: Declare variables.
- **read**: Read input from the user.
- **shift**: Shift positional parameters.
- **source**: Execute a script.

- **HISTFILESIZE**: Maximum number of lines in the history file.
- **HISTSIZE**: Maximum number of commands in the history.
- **HISTCONTROL**: Control how commands are saved in the history.
- **HISTIGNORE**: Ignore commands in the history.
- **HISTTIMEFORMAT**: Format for displaying the history timestamp.
- **HISTFILE**: History file location.

- **alias**: Create an alias for a command.
- **unalias**: Remove an alias.

- **Comments**: Add comments to scripts.

  - `# comment`: Single-line comment.
  - `: 'comment'`: Multi-line comment.
  - `<<'EOF'`: Here document start.
  - `EOF`: Here document end.

- **Quotes**: Preserve whitespace and special characters.

  - `echo "message"`: Print a message.
  - `echo 'message'`: Print a message.
  - `echo "Hello, $USER!"`: Print a message with a variable.
  - `echo 'Hello, $USER!'`: Print a message without a variable.
  - `echo "Hello, \$USER!"`: Print a message with an escaped variable.
  - `echo "Hello, ${USER}!"`: Print a message with a variable in braces.
  - `echo "Hello, $(whoami)!"`: Print a message with command substitution.
  - `echo "Hello, `whoami`!"`: Print a message with command substitution.
  - `echo "Hello, $((2+2))!"`: Print a message with arithmetic expansion.
  - `echo "Hello, $[2+2]!"`: Print a message with arithmetic expansion.
  - `echo "Hello, $USER"!`: Print a message with a variable and punctuation.
  - `echo "Hello, $USER!"`: Print a message with a variable and an exclamation mark.
  - `echo "Hello, $USER!"`: Print a message with a variable and double quotes.
  - `echo 'Hello, $USER!'`: Print a message with a variable and single quotes.
  - `echo "Hello, $USER!"`: Print a message with a variable and escaped quotes.
  - `echo "Hello, $USER!"`: Print a message with a variable and nested quotes.
  - `echo "Hello, $USER!"`: Print a message with a variable and backticks.
  - `echo "Hello, $USER!"`: Print a message with a variable and double quotes.
  - `echo "Hello, $USER!"`: Print a message with a variable and single quotes.
  - `echo "Hello, $USER!"`: Print a message with a variable and escaped quotes.
  - `echo "Hello, $USER!"`: Print a message with a variable and nested quotes.
  - `echo "Hello, $USER!"`: Print a message with a variable and backticks.

- **Special Variables**: Predefined variables.

  - `$0`: Script name.
  - `$1`, `$2`, ...: Positional parameters.
  - `$@`: All positional parameters.
  - `$#`: Number of positional parameters.
  - `$?`: Exit status of the last command.
  - `$$`: Process ID of the script.
  - `$!`: Process ID of the last background command.
  - `$USER`: Username of the user running the script.
  - `$HOME`: Home directory of the user running the script.
  - `$PWD`: Current working directory.
  - `$SHELL`: Shell of the user running the script.
  - `$HOSTNAME`: Hostname of the machine.
  - `$RANDOM`: Random number.
  - `$LINENO`: Current line number.

- **Arithmetic**: Perform mathematical operations.

  - `((expression))`: Evaluate an arithmetic expression.
  - `let variable=expression`: Assign the result of an expression to a variable.
  - `((variable++))`: Increment a variable.
  - `((variable--))`: Decrement a variable.
  - `((variable+=value))`: Add a value to a variable.
  - `((variable-=value))`: Subtract a value from a variable.
  - `((variable*=value))`: Multiply a variable by a value.
  - `((variable/=value))`: Divide a variable by a value.
  - `((variable%=value))`: Get the remainder of a variable divided by a value.

- **Conditional Expressions**: Make decisions based on conditions.

      - `if condition; then commands; fi`: Execute commands if a condition is true.
      - `if condition; then commands; else other_commands; fi`: Execute commands based on a condition.
      - `if condition; then commands; elif other_condition; then other_commands; else more_commands; fi`: Execute commands based on multiple conditions.
      - `[[ expression ]]`: Evaluate an expression.
      - `[[ -e file ]]`: Check if a file exists.
      - `[[ -f file ]]`: Check if a file is a regular file.
      - `[[ -d file ]]`: Check if a file is a directory.
      - `[[ -r file ]]`: Check if a file is readable.
      - `[[ -w file ]]`: Check if a file is writable.
      - `[[ -x file ]]`: Check if a file is executable.
      - `[[ -z string ]]`: Check if a string is empty.
      - `[[ -n string ]]`: Check if a string is not empty.
      - `[[ string1 == string2 ]]`: Check if two strings are equal.
      - `[[ string1 != string2 ]]`: Check if two strings are not equal.
      - `[[ n1 -eq n2 ]]`: Check if two numbers are equal.
      - `[[ n1 -ne n2 ]]`: Check if two numbers are not equal.
      - `[[ n1 -lt n2 ]]`: Check if n1 is less than n2.
      - `[[ n1 -le n2 ]]`: Check if n1 is less than or equal to n2.
      - `[[ n1 -gt n2 ]]`: Check if n1 is greater than n2.
      - `[[ n1 -ge n2 ]]`: Check if n1 is greater than or equal to n2.
      - `[[ !condition ]]`: Negate a condition.
      - `[[ condition1 && condition2 ]]`: Check if both conditions are true.
      - `[[ condition1 || condition2 ]]`: Check if either condition is true.

- **String Manipulation**: Modify and extract strings.

      - `variable="string"`: Assign a string to a variable.
      - `echo ${#variable}`: Get the length of a string.
      - `echo ${variable:position:length}`: Extract a substring.
      - `echo ${variable#pattern}`: Remove the shortest match from the beginning.
      - `echo ${variable##pattern}`: Remove the longest match from the beginning.
      - `echo ${variable%pattern}`: Remove the shortest match from the end.
      - `echo ${variable%%pattern}`: Remove the longest match from the end.
      - `echo ${variable/pattern/replacement}`: Replace the first match.
      - `echo ${variable//pattern/replacement}`: Replace all matches.
      - `echo ${variable^}`: Uppercase the first character.
      - `echo ${variable^^}`: Uppercase all characters.
      - `echo ${variable,}`: Lowercase the first character.
      - `echo ${variable,,}`: Lowercase all characters.

- **Arrays**: Store multiple values.

  - `array=(value1 value2 value3)`: Create an array.
  - `echo ${array[0]}`: Print the first element of an array.
  - `echo ${array[@]}`: Print all elements of an array.
  - `echo ${#array[@]}`: Print the length of an array.
  - `unset array[1]`: Unset an element of an array.
  - `unset array`: Unset an array.
  - `array+=(value4)`: Append an element to an array.
  - `array=( "${array[@]}" "value5" )`: Append an element to an array.
  - `array=( "${array[@]:0:2}" )`: Slice an array.
  - `array=( "${array[@]:1}" )`: Slice an array.
  - `array=( "${array[@]/pattern/replacement}" )`: Replace elements in an array.
  - `array=( $(command) )`: Assign the output of a command to an array.

- **Functions**: Group commands for reuse.

  - `function_name() { commands }`: Define a function.
  - `function_name`: Call a function.
  - `return value`: Return a value from a function.
  - `local variable=value`: Define a local variable in a function.
  - `unset -f function_name`: Unset a function.
  - `declare -f`: List defined functions.
  - `declare -F`: List function names.
  - `declare -i`: Declare an integer variable.

- **Loops**: Repeat commands.

  - `for variable in list; do commands; done`: Iterate over a list.
  - `while condition; do commands; done`: Execute commands while a condition is true.
  - `until condition; do commands; done`: Execute commands until a condition is true.
  - `break`: Exit a loop.
  - `continue`: Skip the current iteration.
  - `select variable in list; do commands; done`: Create a menu.
  - `case variable in pattern1) commands;; pattern2) commands;; esac`: Execute commands based on a pattern.
  - `getopts options variable`: Parse command-line options.
  - `shift`: Shift command-line arguments.
  - `shopt -s extglob`: Enable extended globbing.

- **Input/Output**: Read and write data.

  - `read variable`: Read input from the user.
  - `echo "message" > file`: Write output to a file.
  - `echo "message" >> file`: Append output to a file.
  - `cat file`: Display the contents of a file.
  - `wc -l file`: Count lines in a file.
  - `grep pattern file`: Search for a pattern in a file.
  - `sed 's/old/new/' file`: Replace text in a file.
  - `awk '{print $1}' file`: Extract columns from a file.

- **Command Substitution**: Execute commands and use the output.

  - `$(command)`: Execute a command and use the output.
  - `variable=$(command)`: Assign the output of a command to a variable.

- **Exit Status**: Return a status code.

  - `$?`: Get the exit status of the last command.
  - `exit status`: Return a status code.

- **Debugging**: Troubleshoot scripts.
  - `set -x`: Enable debugging mode.
  - `set +x`: Disable debugging mode.
  - `set -e`: Exit on error.
  - `set +e`: Continue on error.
  - `set -u`: Treat unset variables as errors.
  - `set +u`: Treat unset variables as normal.
