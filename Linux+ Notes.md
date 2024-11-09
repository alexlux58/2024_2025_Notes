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

---

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
  - `groupadd -R <groupname>`: Create a new group with a specific GID.
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
- `groupmod -R <groupname>`: Change a group's GID to a unique value.
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
- `.`: Active user.
- `old`: Inactive user (24hrs).
- `am i`: User information.
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
  - **LOGNAME**: Current user.
  - **MAIL**: Current user's mail.
  - **HOME**: Current user's home directory.
  - **PATH**: Search path for executable files.
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
  - **LC_ALL**: System locale.
  - **LC_CTYPE**: System character type.
  - **LC_NUMERIC**: System numeric format.
  - **LC_TIME**: System time format.
  - **LC_COLLATE**: System collation.
  - **LC_MONETARY**: System monetary format.
  - **LC_MESSAGES**: System messages.
  - **LC_PAPER**: System paper format.
  - **LC_NAME**: System name format.
  - **LC_ADDRESS**: System address format.
  - **LC_TELEPHONE**: System telephone format.
  - **LC_MEASUREMENT**: System measurement format.

  - /etc/profile.d directory: Additional shell configuration files.
  - **Location**: `/etc/profile.d`
  - **Purpose**: Configure additional shell environment settings.
  - **Files**:
    - **alias.sh**: Define shell aliases.
    - **color.sh**: Define shell colors.
    - **completion.sh**: Define shell completions.
    - **env.sh**: Define shell environment variables.
    - **history.sh**: Define shell history settings.
    - **prompt.sh**: Define shell prompt settings.
    - **umask.sh**: Define shell umask settings.

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
  - **.bash_logout**: User-specific shell logout file.
  - **.bash_profile**: User-specific shell profile file.
  - **.bashrc**: User-specific shell resource file.
  - **.bash_logout**: User-specific shell logout file.
  - **.bash_profile**: User-specific shell profile file.
  - **.bashrc**: User-specific shell resource file.
  - **.bash_logout**: User-specific shell logout file.
  - **.bash_profile**: User-specific shell profile file.
  - **.bashrc**: User-specific shell resource file.
  - **.bash_logout**: User-specific shell logout file.
  - **.bash_profile**: User-specific shell profile file.
  - **.bashrc**: User-specific shell resource file.
  - **.bash_logout**: User-specific shell logout file.
  - **.bash_profile**: User-specific shell profile file.
  - **.bashrc**: User-specific shell resource file.
  - **.bash_logout**: User-specific shell logout file.
  - **.bash_profile**: User-specific shell profile file.
  - **.bashrc**: User-specific shell resource file.
  - **.bash_logout**: User-specific shell logout file.
  - **.bash_profile**: User-specific shell profile file.
  - **.bashrc**: User-specific shell resource file.
  - **.bash_logout**: User-specific shell logout file.
  - **.bash_profile**: User-specific shell profile file.
  - **.bashrc**: User-specific shell resource file.
  - **.bash_logout**: User-specific shell logout file.
  - **.bash_profile**: User-specific shell profile file.
  - **.bashrc**: User-specific shell resource file.
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

### s bit

- **Setuid (s)**: Execute a file with the owner's permissions.
  - **Owner**: `rws`
- **Setgid (s)**: Execute a file with the group's permissions.
- **Sticky bit (t)**: Prevent users from deleting files in a directory.

### Viewing File Permissions

- `ls -l`: List files with permissions.

- umask: Default file creation mask.
- **Default**: `0022`
- umask -p <octal>: Display the umask in octal format.
- umask -S: Display the umask in symbolic format.
- umask -S <octal>: Display the umask in symbolic format with a specific octal value.
- umask -S <symbolic>: Display the umask in octal format with a specific symbolic value.
- umask -S <symbolic> <octal>: Display the umask in octal format with a specific symbolic value.
