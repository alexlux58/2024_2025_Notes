## Domain

### System Operations and Maintenance

### Question 1

You need to delete a user from the system, including their home directory. Which of the following utility commands accomplishes this task?

A. userdel
B. userdel -r
C. userdel -R
D. deluser

<details>
<summary style="color: red;">Answer</summary>

B. userdel -r

**Explanation:**
The userdel command is used for this purpose, and the -r option (lowercase) deletes both the home directory and mail spool files. The -R (uppercase) option informs the userdel command to use a chroot directory, which is not relevant in this context. The deluser command is not standard across all Linux distributions, making it less reliable for this specific task.

**Example:**
To delete the user "alex" along with their home directory, you would use:

```bash
userdel -r alex
```

</details>

---

### Question 2

You need to enable the web server (running as the www-data user and group) to write into a directory called /home/webfiles. Which commands will accomplish this task in the most
secure manner?

A. chgrp www-data /home/webfiles; chmod 775 /home/webfiles
B. chmod 777 /home/webfiles
C. chgrp www-data /home/webfiles; chmod 711 /home/webfiles
D. chmod 707 /home/webfiles

<details>
<summary style="color: red;">Answer</summary>

A. chgrp www-data /home/webfiles; chmod 775 /home/webfiles

**Explanation:**
The best option among these choices is to change the group to www-data and change the permissions such that the group can write into the directory. Option B (chmod 777) gives all users write access, which is not secure. Option C (chmod 711) does not allow group write access, and option D (chmod 707) is also insecure as it allows all users read and execute access.

**Example:**
To set the permissions securely, use the following commands:

```bash
chgrp www-data /home/webfiles
chmod 775 /home/webfiles
```

</details>

---

### Question 3

Assume that passwords must be changed every 60 days. Which command will change the date of the users last password change without the user actually changing the account password?

A. chage -f
B. chage -W
C. chage -l
D. chage -d

<details>
<summary style="color: red;">Answer</summary>

D. chage -d

**Explanation:**
The chage command is used for this purpose. The -d option sets the days since the last password change and is measured in days since January 1, 1970. The -W option is the days of warning for changing a password, and the -l option displays a list of the various settings related to the account. There is no -f option for the chage command.

**Example:**
To set the last password change date to today for a user named "alex," you would use:

```bash
chage -d 0 alex
```

</details>

---

### Question 4

What is the order in which user configuration files are located on login to a Bash shell?

A. .bash_login, .profile, /etc/profile
B. .bash_profile, .bash_login, .profile
C. .profile, .bash_login, .bash_profile
D. .bash_login, .bash_profile, .profile

<details>
<summary style="color: red;">Answer</summary>

B. .bash_profile, .bash_login, .profile

**Explanation:**
When a user logs into a Bash shell, the shell looks for configuration files in the following order: .bash_profile, .bash_login, and then .profile. If none of these files are found, it will then look for the global configuration file /etc/profile. The other options do not reflect the correct order.

**Example:**
If you have all three configuration files in your home directory (.bash_profile, .bash_login, and .profile), they will be sourced in this order:

- .bash_profile
- .bash_login
- .profile

</details>

---

### Question 5

Within which directory should you place files to have them automatically copied to a user's home directory when the user is created.

A. /etc/userhome
B. /etc/templateuser
C. /etc/skel
D. /home/skel

<details>
<summary style="color: red;">Answer</summary>

C. /etc/skel

**Explanation:**
The /etc/skel directory contains files to be copied to the user's home directory. The other directories listed for this question do not exist or are not used for this purpose in standard Linux distributions.

**Example:**
Place template files in /etc/skel, and they will automatically copy to any new user’s home directory upon creation.

</details>

---

### Question 6

Which bash parameter or option will cause the shell to be executed without reading the initialization files?

A. --no-rc
B. --no-init
C. --norc
D. --rc-none

<details>
<summary style="color: red;">Answer</summary>

C. --norc

**Explanation:**
The --norc option causes bash to execute without reading the /etc/bash.bashrc (Debian derivatives) or /etc/bashrc (Red Hat derivatives) file or the local ~/.bashrc file. The other options do not exist or are not valid for this purpose.

**Example:**
To open a new bash session without reading initialization files, you would use:

```bash
bash --norc
```

</details>

---

### Question 7

You need to create a function that will be available each time you log in to the system. Within which file should this function be placed?

A. .bash_profile
B. .rc
C. /etc/profile
D. .bash_run

<details>
<summary style="color: red;">Answer</summary>

A. .bash_profile

**Explanation:**
The .bash_profile file, if it exists in your home directory, will be executed on login. Note that placing the function in /etc/profile would technically work, but then the function would be available to all users, not just the individual user. The other options are not standard files for this purpose.

**Example:**
Add a function in your .bash_profile file, for example:

```bash
myfunction() { echo "Hello, world!"; }
```

</details>

---

### Question 8

Assuming X forwarding has been enabled on the SSH server, which environment variable is used to set the location for newly spawned windows from within an SSH session?

A. DISPLAY
B. XTERMINAL
C. XTERM
D. XDISP

<details>
<summary style="color: red;">Answer</summary>

A. DISPLAY

**Explanation:**
The DISPLAY variable can be used to remotely send the window of an X session to another computer when using protocols like SSH.
There is no XTERMINAL or XDISP environment variable, and XTERM is typically a terminal window and not an environment variable.

**Example:**
Set the DISPLAY variable to direct GUI applications to another system:

```bash
export DISPLAY=remote_ip:0.0
```

</details>

---

### Question 9

Which of the following options in the SSH configuration file needs to be enabled so that X sessions can be sent over an SSH connection?

A. X11Connect yes
B. X11Forwarding yes
C. ForwardX yes
D. XForward yes

<details>
<summary style="color: red;">Answer</summary>

B. X11Forwarding yes

**Explanation:**
The X11Forwarding option must be enabled in order for X connections or windows generated from the X server to be sent over an SSH connection. The other options listed are not valid configuration options in the SSH configuration file.

**Example:**
To enable X11 forwarding, edit the SSH configuration file (/etc/ssh/sshd_config) and add:

```bash
X11Forwarding yes
```

</details>

---

### Question 10

Which file contains user information such as username and real name and is readable by all users of the system?

A. /etc/pass
B. /etc/shadow
C. /etc/passwd
D. /etc/userinfo

<details>
<summary style="color: red;">Answer</summary>

C. /etc/passwd

**Explanation:**
The /etc/passwd file contains various information about users on a system such as username and real name, along with user ID (UID) and login shell. The file is world-readable. The /etc/shadow file
contains encrypted passwords but is not readable by all users. The other two files shown as options do not exist by default in standard Linux distributions.

**Example:**
To view information about users in the system, you can read the contents of /etc/passwd:

```bash
cat /etc/passwd
```

</details>

---

### Question 11

Which of the following commands changes a group called DomainAdmins to DomainUsers?

A. groupmod -n DomainUsers DomainAdmins
B. groupchg DomainAdmins DomainUsers
C. chgroup DomainAdmins DomainUsers
D. group -N DomainAdmins DomainUsers

<details>
<summary style="color: red;">Answer</summary>

A. groupmod -n DomainUsers DomainAdmins

**Explanation:**
The groupmod command is used for this purpose, and the -n option is used to change the group name. The other commands listed do not exist or are not valid for this purpose.

**Example:**
To rename the group "DomainAdmins" to "DomainUsers," use:

```bash
groupmod -n DomainUsers DomainAdmins
```

</details>

---

### Question 12

When running useradd, which option needs to be specified in order for the user's home directory to be created?

A. -h
B. -m
C. -x
D. -a

<details>
<summary style="color: red;">Answer</summary>

B. -m

**Explanation:**
The -m option causes the user's home directory to be created. By default, if this option isn't specified and CREATE_HOME has not been set, the home directory won't be created.
The -h option displays help text, and the other options shown do not exist or are not valid for this purpose.

**Example:**
To create a user with a home directory, use the -m option like this:

```bash
useradd -m username
```

</details>

---

### Question 13

Which of the following commands locks out password-based login for a user but does not prevent other forms of login?

A. usermod -L
B. userdel -r
C. useradd -h
D. userlock

<details>
<summary style="color: red;">Answer</summary>

A. usermod -L

**Explanation:**
The usermod -L command locks an account by placing an ! in the encrypted password. If the user has another means to log in, such as with an SSH key, using usermod -L will not prevent their login.
Among the other answers, userdel -r deletes a user and useradd -h displays help related to adding a user to the system. There is no userlock command.

**Example:**
To lock password-based login for a user named "alex" while keeping other access methods intact,

```bash
usermod -L alex
```

</details>

---

### Question 14

Which of the following commands produces a report listing the last password change date for all users on the system?

A. passwd -a
B. passwd -S
C. passwd -a -S
D. passwd --all

<details>
<summary style="color: red;">Answer</summary>

C. passwd -a -S

**Explanation:**
The passwd command will be used for this purpose. The -a option displays all users but requires the use of -S to indicate status. The -S option alone will not produce a report for all users,
and the --all option is an alias for -a. Therefore, the correct combination is -a -S.

**Example:**
To display the last password change date for all users, use:

```bash
passwd -a -S
```

</details>

---

### Question 15

Which file contains a list of usernames, UIDs, and encrypted passwords?

A. /etc/passwd
B. /etc/shadow
C. /etc/encpass
D. /etc/grouppass

<details>
<summary style="color: red;">Answer</summary>

B. /etc/shadow

**Explanation:**
The /etc/shadow file contains user account information, including usernames, UIDs, and encrypted passwords. This file is not readable by all users for security reasons.
The /etc/passwd file contains user information but does not store encrypted passwords. The other two files listed do not exist in standard Linux distributions.

**Example:**
To view encrypted password information for users, check the contents of /etc/shadow with:

```bash
sudo cat /etc/shadow
```

</details>

---

### Question 16

Which command is used to change a user's home directory to /srv/data/username and move the contents at the same time?

A. usermod -d /srv/data/username -m
B. homedir -m /srv/data/username
C. userex -m /srv/data/username
D. userchg /m /srv/data/username -d

<details>
<summary style="color: red;">Answer</summary>

A. usermod -d /srv/data/username -m

**Explanation:**
The usermod command is used for this purpose. The -d option changes the home directory from its normal location at /home. The -m option moves the contents.
The other commands shown for this question are not valid.

**Example:**
To change a user’s home directory and move existing files, use:

```bash
usermod -d /srv/data/username -m username
```

</details>

---

### Question 17

Which option to useradd will add groups for a user?

A. -g
B. -x
C. -l
D. -G

<details>
<summary style="color: red;">Answer</summary>

D. -G

**Explanation:**
The -G option is a list of supplemental groups to which the user will be added. A lowercase -g option provides the primary GID. The -l option causes the user to not be added
to the lastlog and faillog databases. There is no -x option.

**Example:**
To add a user to supplementary groups, use -G as follows:

```bash
useradd -G group1,group2 username
```

</details>

---

### Question 18

Which option to useradd creates a system user rather than a normal user?

A. -r
B. -s
C. -a
D. -S

<details>
<summary style="color: red;">Answer</summary>

A. -r

**Explanation:**
The -r option creates a system user, which will typically entail no expiration, no home directory, and a UID below 1000. The -s option defines
the user's shell, while the -a option is not valid for useradd. The -S option does not exist.

**Example:**
To create a system user, run:

```bash
useradd -r username
```

</details>

---

### Question 19

Which file contains encrypted password information for groups?

A. /etc/group
B. /etc/gshadow
C. /etc/gsecure
D. /etc/group.conf

<details>
<summary style="color: red;">Answer</summary>

B. /etc/gshadow

**Explanation:**
The /etc/gshadow file contains secure information such as an encrypted password for groups, where applicable. The /etc/group file contains general information
on groups. The other two files listed as options do not exist.

**Example:**
To view group password information, check the /etc/gshadow file:

```bash
sudo cat /etc/gshadow
```

</details>

---

### Question 20

Which of the following best describes a valid use of the groupdel command?

A. You may force group deletion with the -f option.
B. If a user's primary group is to be deleted, that user must be deleted first or have their primary group changed.
C. Groupdel can be run at any time, regardless of group membership.
D. The -r option for groupdel will recursively change users' GIDs after group deletion.

<details>
<summary style="color: red;">Answer</summary>

B. If a user's primary group is to be deleted, that user must be deleted first or have their primary group changed.

**Explanation:**
The groupdel command cannot delete groups unless there are no users who have the given group as their primary GID. Therefore, option B best fits the scenario.
There is no -f or -r option, making options A and D incorrect. Option C is also incorrect because groupdel cannot be run if there are users with that group as their primary group.

**Example:**
If you need to delete a group that is a user’s primary group, first change the user’s primary group or delete the user before running:

```bash
groupdel groupname
```

</details>

---

### Question 21

Which of the following commands displays the UID, primary group, and supplemental groups for a given user?

A. id
B. getid
C. passwd
D. chage

<details>
<summary style="color: red;">Answer</summary>

A. id

**Explanation:**
The id command shows the username, UID, primary group, and GID along with supplemental groups. The passwd and chage commands are not used for this purpose. There is no getid command.

**Example:**
To display the UID, primary group, and supplemental groups for a user named "alex," you would use:

```bash
id alex
```

</details>

---

### Question 22

Which option to the usermod command is used to change a given user's real name?

A. -R
B. -n
C. -d
D. -c

<details>
<summary style="color: red;">Answer</summary>

D. -c

**Explanation:**
The -c option changes the comment field in /etc/passwd. The comment field is typically associated with the real name of the account. The -R option indicates a chroot directory, while -d indicates a change of home directory. There is no -n option.

**Example:**
To change a user's real name to "Alex Lux," you would use:

```bash
usermod -c "Alex Lux" username
```

</details>

---

### Question 23

A user needs to work with printers and printer-related items. Which of the following commands adds the user (called username in the options) to the appropriate group for this purpose?

A. usermod -aG printusers username
B. usermod -aG lpadmin username
C. usermod -gA lpadm username
D. usermod -a lpadm username

<details>
<summary style="color: red;">Answer</summary>

B. usermod -aG lpadmin username

**Explanation:**
The usermod command with the -aG option is used to append a group onto the user's list of groups.
In this case, the user needs to be a member of hte lpadmin group. The other options are incorrect in their syntax or group names.

**Example:**
To add a user named "alex" to the lpadmin group, you would use:

```bash
usermod -aG lpadmin alex
```

</details>

---

### Question 24

You need to examine who is currently logged in to the system. Which of the following commands will display this information?

A. listuser
B. fuser
C. ls -u
D. w

<details>
<summary style="color: red;">Answer</summary>

D. w

**Explanation:**
The w command shows currently logged-in users along with information such as uptime and load average and is similar to the who command.
The fuser command is used to show open files, and the -u option to ls controls the display for file listings. There is no listuser command.

**Example:**
To see who is currently logged in to the system, you would use:

```bash
w
```

</details>

---

### Question 25

Within the following entry in /etc/shadow, to what does the number 15853 refer?
mail:\*:15835:0:99999:7:::

A. The UID of the mail user
B. The number of files owned by mail
C. The date of the last password change (since 1/1/1970)
D. The number of days until the account expires

<details>
<summary style="color: red;">Answer</summary>

C. The date of the last password change (since 1/1/1970)

**Explanation:**
The date of the password change, as measured in days since January 1, 1970, is contained in the hird field of a shadow entry. The expiration date would be the eighth field,
as separated by colons. The UID is not stored in /etc/shadow, and the other options are incorrect.

**Example:**
To view the date of the last password change for the user "mail," you would use:

```bash
chage -l mail
```

</details>

---

### Question 26

Which of the best describes the relationship between UIDs and GIDs on a Linux system when an authentication server is being configured?

A. whois
B. who
C. loggedin
D. curusers

<details>
<summary style="color: red;">Answer</summary>

A. whois

**Explanation:**
The who command displays who is currently logged in and the date and time they logged in. The whois command displays information about domains.
The other commands are not valid in this context.

**Example:**
To see who is currently logged in to the system, you would use:

```bash
who
```

</details>

---

### Question 27

Which of the following commands adds a group?

A. groupadd
B. addgrp
C. grpadd
D. creategroup

<details>
<summary style="color: red;">Answer</summary>

A. groupadd

**Explanation:**
The groupadd command is used to create a new group. The other options listed do not exist or are not valid commands for this purpose.

**Example:**
To add a new group named "developers," you would use:

```bash
groupadd developers
```

</details>

---

### Question 28

Which of the following commands enables the sticky bit for a user on a file called homescript.sh?

A. chmod +sticky homescript.sh
B. chmod 755 homescript.sh
C. chmod u+t homescript.sh
D. chown u+sticky homescript.sh

<details>
<summary style="color: red;">Answer</summary>

C. chmod u+t homescript.sh

**Explanation:**
The sticky bit is set using +t. For this question, the user permission is being affected, thus the u as an argument to chmod.
Among the other answers, the chown command is valid but changes ownership, not permissions, and thus isn't used for the purpose described in the question.

**Example:**
To enable the sticky bit for a file called "homescript.sh," you would use:

```bash
chmod u+t homescript.sh
```

</details>

---

### Question 29

The umask reports as 022. What is the permission that will be in effect for a newly non-executable created file?

A. u+rw, g+r, w+r
B. 755
C. 644
D. a+r

<details>
<summary style="color: red;">Answer</summary>

C. 644

**Explanation:**
The umask value of 022 means that the group and others will not have write permissions.
The default permission for a newly created file is 666 (rw-rw-rw-), and when the umask is applied, it results in 644 (rw-r--r--).

**Example:**
To see the current umask value, you would use:

```bash
umask
```

</details>

---

### Question 30

Which of the following best describes the relationship between UIDs and GIDs on a Linux system when an authentication server is being configured?

A. The UID and GID are the ame across the system for a given user.
B. Each user has a UID and GID that are the same and are created when the user is created.
C. The UID represents the user, while the GID is a globally unique user ID.
D. There is no direct relationship between UID and GID.

<details>
<summary style="color: red;">Answer</summary>

D. There is no direct relationship between UID and GID.

**Explanation:**
There is no direct relationship between the UIDs and GIDs on a system. UIDs represent users, while GIDs represent group IDs.
On some systems, the UID and GID numbers will match for regular users, but this is not a requirement and is more of a coincidence than a rule.

**Example:**
To see the UID and GID for a user named "alex," you would use:

```bash
id alex
```

</details>

---

### Question 31

When you're configuring a server for SNMP server role, which ports need to be allowed through the firewall for SNMP traffic?

A. Ports 23 and 25
B. Ports 110 and 143
C. Ports 80 and 443
D. Ports 161 and 162

<details>
<summary style="color: red;">Answer</summary>

D. Ports 161 and 162

**Explanation:**
SNMP (Simple Network Management Protocol) uses UDP ports 161 for general SNMP messages and 162 for SNMP traps.
Although the traffic is usually on UDP, the TCP ports are also reserved for SNMP.
Ports 23 and 25 are used for Telnet and SMTP, respectively. Ports 110 and 143 are used for POP3 and IMAP, while ports 80 and 443 are used for HTTP and HTTPS traffic.

</details>

---

### Question 32

You need to look at information on logins beyond what was captured by the current log file for the last command.
Which option to the last command can be used to load information from an alternate file?

A. -a
B. -t
C. -e
D. -f

<details>
<summary style="color: red;">Answer</summary>

D. -f

**Explanation:**
Loading of alternate files is accomplished using the -f option.
Doing so facilitates exactly the scenario described: being able to examine logins from old log files.
The -a option controls the location of the display for the host, while -t controls the display to show the logins as of the specified date and time.
The -e option does not exist.

</details>

---

### Question 33

When creating a certificate authority server role, which of the following commands generates a private key for use with SSL and places it into the file /etc/ssl/example.com.private?

A. openssl genrsa -out /etc/ssl/example.com.private
B. openssl generate-private > /etc/ssl/example.com.private
C. openssl genpriv > /etc/ssl/example.com.private
D. openssh genkey -out /etc/ssl/example.com.private

<details>
<summary style="color: red;">Answer</summary>

A. openssl genrsa -out /etc/ssl/example.com.private

**Explanation:**
The openssl command will be used for this purpose, with the genrsa option. An output file is specified with -ou.
The other commands containing openssl all contain an invalid option. The final command is openssh and is not used for this scenario.

</details>

---

### Question 34

Which of the following options within an OpenSSH server configuration is used to determine whether the root user can log in directly with an SSH client?

A. PermitRootLogin
B. AllowRoot
C. RootLogin
D. PermitDirectRootLogin

<details>
<summary style="color: red;">Answer</summary>

A. PermitRootLogin

**Explanation:**
The PermitRootLogin directive, set to yes or no, determines whether the root user can log in directly. This option is set within the server configuration file at /etc/ssh/sshd_config. In general
server-wide configuration files for SSH are stored in /etc/ssh while user-specific configuration files are stored in each user's home directory. The other options listed are not valid configuration options.

</details>

---

### Question 35

Which option to ssh creates a port forwarding to which remote clients can also connect?

A. -L
B. -R
C. -P
D. -E

<details>
<summary style="color: red;">Answer</summary>

B. -R

**Explanation:**
The -R option creates a port forward and enables remote clients to connect. The -L option also creates a port forward but does not allow remote clients to connect.
The -P and -E options are not valid for this scenario.

</details>

---

### Question 36

Which subcommand of openssl is used to create a Certificate Signing Request (CSR) for Secure Sockets Layer (SSL) / Transport Layer Security (TLS) certificates?

A. req
B. csr
C. gencsr
D. newcsr

<details>
<summary style="color: red;">Answer</summary>

A. req

**Explanation:**
The req option begins the CSR generation process, typically also requiring -new as an additional option.
The other subcommands are not valid for this purpose.

</details>

---

### Question 37

Within which directory should scripts and other files to run at login be stored?

A. /etc/login
B. /etc/profile
C. /etc/bash.defs
D. /etc/profile.d

<details>
<summary style="color: red;">Answer</summary>

D. /etc/profile.d

**Explanation:**
The /etc/profile.d directory can be used to store files and scripts that are then executed on login. Of the other answers, /etc/profile does exist, but it
is a file and not a directory. The other two options do not exist.

</details>

---

### Question 38

Using udev to configure a network adapter for use with a firewall so that it has a specific and consistent name, you edit the udev rules file.
Which option within the rules file ensures that the device will always have a name of eth0?

A. ATTR-NAME="eth0"
B. NAME="eth0"
C. DEV_NAME="eth0"
C. NAME_DEV="eth0"

<details>
<summary style="color: red;">Answer</summary>

B. NAME="eth0"

**Explanation:**
The NAME parameter sets the name for the device. The other options shown are not valid for this purpose.

</details>

---

### Question 39

You are configuring a database service and need to open the default port for MySQL on the firewall.
Which port is the default for MySQL?

A. 6592
B. 25
C. 389
D. 3306

<details>
<summary style="color: red;">Answer</summary>

D. 3306

**Explanation:**
Port 3306 is the default port for MySQL. Of the other options, 25 is used for SMTP, 389 is used for LDAP, and 6592 is not a standard port for MySQL.

</details>

---

### Question 40

When configuring Apache for a web server role, which of the following directives tells the server the location of the SSL private key file?

A. SSLKeyFile
B. SSLCertificatePrivateKey
C. SSLCertificateKeyFile
D. SSLPrivateKey

<details>
<summary style="color: red;">Answer</summary>

C. SSLCertificateKeyFile

**Explanation:**
The SSLCertificateKeyFile directive points to the location of the private key for an SSL configuration. The other options shown are not valid directives.

</details>

---

### Question 41

Which of the following commands will correctly change the group ownership of the file called a.out to users?

A. chgrp users a.out
B. chgrp a.out users
C. groupchg a.out users
D. grpchg users a.out

<details>
<summary style="color: red;">Answer</summary>

A. chgrp users a.out

**Explanation:**
The chgrp command can be used to change group ownership of a file. The order is chgrp <groupname> <target>.
The other options shown are not valid commands for this purpose.

</details>

---

### Question 42

Which option to umask will display the permissions to be used in a POSIX format?

A. -P
B. -p
C. -S
D. -v

<details>
<summary style="color: red;">Answer</summary>

C. -S

**Explanation:**
The -S option displays output in a format such as u=rwx, g=rx, o=rx.
The -p option is used to set the umask, not display it. The -v option is used to display the version of the umask command. The -P option is not valid.

</details>

---

### Question 43

Which option to chown recursively changes the ownership?

A. -f
B. -R
C. -a
D. -m

<details>
<summary style="color: red;">Answer</summary>

B. -R

**Explanation:**
The -R option is used to change ownership recursively. The -f option forces the change, while the -a and -m options are not valid for this purpose.

</details>

---

### Question 44

Which option to chgrp will change group ownership of all files within a given directory?

A. -directory
B. -d
C. -R
D. -V

<details>
<summary style="color: red;">Answer</summary>

C. -R

**Explanation:**
The -R option sets the recursive option, which means chgrp will traverse the given directory and perform the group ownership change operation throughout the specified hierarchy.
The other options are not valid for this purpose.

</details>

---

### Question 45

When sourcing a file in bash, which chmod command would be necessary to provide the minimum privileges in order for the file to be sourced correctly, assuming
that your current user owns the file?

A. chmod 600
B. chmod 755
C. chmod 777
D. chmod 400

<details>
<summary style="color: red;">Answer</summary>

D. chmod 400

**Explanation:**
You minimally need to be able to read the file being sourced; therefore, chmod 400 will correctly set the permissions. Any chmod that gives additional permissions is not necessary.
When permissions are granted using octal notation, the number 4 is read, 2 is write, and 1 is execute. There are three permissions: user (owner), group, and other or world.
Therefore, chmod 400 grants "read" privileges to the owner and no permissions to group and other/ world. This is the minimum necessary to source a file.

</details>

---

### Question 46

Which of the following commands removes an expiration from an account?

A. sudo chage -l username
B. sudo chage -E -1 username
C. sudo chage -E now username
D. sudo chage --expire username

<details>
<summary style="color: red;">Answer</summary>

B. sudo chage -E -1 username

**Explanation:**
The chage command will be used for this purpose, specifically with the -E option.
When provided with a date, chage will expire the account on that date. When provided with -1, the expiration will be
removed, thus removing the user lockout. The use of sudo in the options for this question notes the need for elevated privileges in order to run the command successfully.
The other options are not valid for this purpose.

</details>

---

### Question 47

You need to determine whether LDAP integration is working correctly. In order to do so, you would like to obtain a list of users,
as read by /etc/nsswitch.conf. Which of the following commands will provide this information?

A. getuser
B. getent
C. usermod
D. userlist

<details>
<summary style="color: red;">Answer</summary>

B. getent

**Explanation:**
The getent command is used to display entries based on the /etc/nsswitch.conf file. One use case for getent is when integrating with Microsoft Active Directory
or another LDAP service, to check whether the connection can be made to the LDAP server. The usermod command is valid but is not used for this purpose, and
the other commands shown for this quetion are not valid.

</details>

---

### Question 48

A command has the following listing obtained with ls -la:

-rwsr-xr-x 1 suehring suehring 21 Nov 2 13:53 script.sh

What does the s denote within the user permissions in the listing?

A. The suid bit has been set for this program.
B. This is a symlink
C. The file will not be executable.
D. The file is a special system file.

<details>
<summary style="color: red;">Answer</summary>

A. The suid bit has been set for this program.

**Explanation:**
The suid bit enables the program to run as the user who owns the file, regardless of who executes the program. Using
SUID typically is not recommended for security reasons. The other permissions allow read (r) and write (w) for the owner of the file.
The group and "other" permissions include read (r) and execute (x) but not write. The s denotes the suid bit.

</details>

---

### Question 49

Which system logging facility is used for messages from the kernel?

A. syslog
B. kernel
C. kern
D. system

<details>
<summary style="color: red;">Answer</summary>

C. kern

**Explanation:**
The kern facility receives messages from the kernel for logging pruposes. Of the other options, syslog is used for logging messages about syslog itself.
The other two options shown are not valid syslog facilities. Kernel messages are sometimes placed in a separate log called /var/log/kern.log.

</details>

---

### Question 50

What is the name of the systemd service that provides logging facilities?

A. systemd-journald
B. systemd-loggingd
C. systemd-syslog
D. systemd-logger

<details>
<summary style="color: red;">Answer</summary>

A. systemd-journald

**Explanation:**
The serivce used for logging on a computer managed by systemd is called systemd-journald. You use journalctl to view logged entries rather than the standard Linux toolset.
The other options shown are not valid systemd services.

</details>

---

### Question 51

Which configuration option in /etc/logrotate.conf will cause the log to be emailed to admin@example.com when the log
rotation process runs for the selected log?

A. mail admin@example.com
B. sendmail admin@example.com
C. maillog admin@example.com
D. logmail admin@example.com

<details>
<summary style="color: red;">Answer</summary>

A. mail

**Explanation:**
The mail command will send the log to the specified email address on completion of the logrotate process.
The other options shown do not exist as options in /etc/logrotate.conf.

</details>

---

### Question 52

You are deploying an Exim server and need to work with the firewall to ensure that the proper incoming ports are open.
Which protocol and port should you allow inbound for normal SMTP traffic?

A. TCP/23
B. TCP/25
C. TCP/110
D. TCP/143

<details>
<summary style="color: red;">Answer</summary>

B. TCP/25

**Explanation:**
SMTP operates on TCP port 25, and if other servers are contacting your SMTP server, you'll need to listen on this port and allow traffic to it as well. Port 23 is used for Telnet,
port 110 is used for POP3, and port 143 is used for IMAP. None of these are used for SMTP.

</details>

---

### Question 53

Which port(s) and protocol(s) should be opened in a firewall in order for the primary and secondary name servers to communicate for a given domain?

A. udp/53
B. Both tcp/53 and udp/53
C. tcp/53
D. udp/53 and tcp/503

<details>
<summary style="color: red;">Answer</summary>

B. Both tcp/53 and udp/53

**Explanation:**
Traditionally, udp/53 is used for DNS queries, but with a primary and secondary server, it is assumed that zone transfers may occur. DNS zone transfers typically take place over tcp/53.

</details>

---

### Question 54

When examining open ports on the server, you see that TCP port 3000 is listed with no corresponding protocol name, such as smtp, imaps, and so on.
In which file would you find a list of port-to-protocol translations that could be customized to add this new port?

A. /etc/ports
B. /etc/p2p
C. /etc/ppp
D. /etc/services

<details>
<summary style="color: red;">Answer</summary>

D. /etc/services

**Explanation:**
The /etc/services file contains standard port-to-protocol information based on the well-known and assigned ports from IANA. If you'd like to provide
a custom name for the service, you can do so by editing this file. There is no /etc/ports or /etc/p2p file by default, and /etc/ppp is usually a directory for the point-to-point protocol
daemon and related services.

</details>

---

### Question 55

On which port does ICMP operate?

A. TCP/43
B. UDP/111
C. UDP/69
D. ICMP does not use ports

<details>
<summary style="color: red;">Answer</summary>

D. ICMP does not use ports

**Explanation:**
ICMP is a layer 3 protocol, meaning it does not use ports for communication. TCP/43 is used for whois,
while port 111 is used for sunrpc. UDP/69 is used for the TFTP protocol.

**Example:**
Since ICMP doesn’t use ports, tools like ping use ICMP directly without specifying a TCP or UDP port.

</details>

---

### Question 56

Which of the following commands displays account information such as expiration date, last password change,
and other related details for a given user?

A. usermod -l
B. userinfo -a
C. chageuser -l
D. chage -l

<details>
<summary style="color: red;">Answer</summary>

D. chage -l

**Explanation:**
The chage command is used for working with account aging information such as expiration date, password change,
days between password changes, and so on. The -l command lists information for the given account. The usermod
command is used to make changes to an account, and the other two commands are not valid.

**Example:**
To view account information for a user named "alex," you would use:

```bash
chage -l alex
```

</details>

---

### Question 57

Which command is used to create a public/private key pair for use with SSH?

A. ssh -k
B. ssh-keygen
C. ssh-genkey
D. ssh-key

<details>
<summary style="color: red;">Answer</summary>

B. ssh-keygen

**Explanation:**
The ss-keygen command is used to create a key pair for use with SSH instead of a password. Of the other options,
the ssh command does exist, but the -k option is used to disable GSSAPI credential forwarding and not for the prupose described. The other two commands are not valid.

**Example:**
To generate an SSH key pair, use:

```bash
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

</details>

---

### Question 58

Whithin which file should you place public keys for servers from which you will accept key-based SSH authentication?

A. ~/.ssh/authorized_keys
B. ~/.ssh/keys
C. ~/.ssh/keyauth
D. ~/.ssh/authkeys

<details>
<summary style="color: red;">Answer</summary>

A. ~/.ssh/authorized_keys

**Explanation:**
The file authorized_keys, stored in the .ssh directory in your home directory, contains public keys authorized to log in to the server using their corresponding private key. The other options are not valid.

**Example:**
To add a public key for SSH authentication, save it to ~/.ssh/authorized_keys like this:

```bash
echo "ssh-rsa AAAA...your-public-key" >> ~/.ssh/authorized_keys
```

</details>

---

### Question 59

You need to execute a command as a specific user. Which of the following commands enables this to occur?

A. sudo -u
B. sudo -U
C. sudo -s
D. sudo -H

<details>
<summary style="color: red;">Answer</summary>

A. sudo -u

**Explanation:**
The -u option is correct for this purpose. An uppercase -U option sets the user context for listing privileges. The -s option
sets the shell, and the -H option sets the home directory. The -u option is used to run a command as a specific user.

**Example:**
To run a command as the user "alex," you would use:

```bash
sudo -u alex command
```

</details>

---

### Question 60

Which option in /etc/sudoers will cause the specified command to not prompt for a password?

A. PASSWORD=NO
B. NOPASSWD
C. NOPASSWD
D. NOPROMPT

<details>
<summary style="color: red;">Answer</summary>

B. NOPASSWD

**Explanation:**
The NOPASSWD option causes sudo to not prompt for a password for a given sudo command. This is useful for scripted scenarios where a password prompt would cause problems. The other options are not valid.

**Example:**
In the /etc/sudoers file, add the following to allow a command without a password prompt:

```bash
alex ALL=(ALL) NOPASSWD: /path/to/command
```

</details>

---

### Question 61

Which of the following commands will display kernel parameters related to resource limits such as CPU time, memory, and other limits for the currently logged-in user?

A. reslimit
B. limiters -a
C. ulimit -a
D. proclimit -n

<details>
<summary style="color: red;">Answer</summary>

C. ulimit -a

**Explanation:**
The ulimit command shows such limits, and the -a option shows all limits for the currently logged-in user. The other commands are not valid. The ulimit command is used to set or display resource limits for the shell and its child processes.

**Example:**
To display all resource limits for the current user, use:

```bash
ulimit -a
```

</details>

---

### Question 62

When working with TCP wrappers, which line within the /etc/hosts.deny file will prevent any host within the 192.168.1.0/24 network from accessing services that operate from xinted?

A. BLOCK: 192.168.1.0/24
B. REJECT: 192.168.1.0
C. ALL: 192.168.1.0/255.255.255.0
D. NONE: 192.168.1/255.255.255.0

<details>
<summary style="color: red;">Answer</summary>

C. ALL: 192.168.1.0/255.255.255.0

**Explanation:**
The syntax to block access to every service uses the ALL keyword followed by the address or network to which the policy will apply. This is important
becuase you may notice attacks coming from certain IP blocks, and blocking with TCP wrappers provides a fast method for effective blocking. The other options are not valid.

**Example:**
To deny access to all services for the network 192.168.1.0/24, add this line in /etc/hosts.deny:

```bash
ALL: 192.168.1.0/255.255.255.0
```

</details>

---

### Question 63

You are using an RSA-based key pair for SSH. By default, what is the name of the private key file in ~/.ssh?

A. id_rsa
B. id_rsa.priv
C. id_rsa.key
D. rsa_key.priv

<details>
<summary style="color: red;">Answer</summary>

A. id_rsa

**Explanation:**
The file is named id_rsa by default, and the public key is named id_rsa.pub. For DSA keys, the names are id_dsa and id_dsa.pub. The other options are not valid.

**Example:**
The default private key file for an RSA-based SSH key is located at:

```bash
~/.ssh/id_rsa
```

</details>

---

### Question 64

Which option to the su command will execute a single command with a non-interactive session?

A. -s
B. -u
C. -c
D. -e

<details>
<summary style="color: red;">Answer</summary>

C. -c

**Explanation:**
The -c option executes a single command but does so without an interactive session. The -s option specifies the shell to be used. There is no -u or -e option for the su command.

**Example:**
To execute a single command as another user non-interactively, use:

```bash
su -c "command" username
```

</details>

---

### Question 65

When working with digital signatures, after specifying the key server, which option to gpg is used to specify the key to send to the key server?

A. key-name
B. keyname
C. send-key
D. sendkey

<details>
<summary style="color: red;">Answer</summary>

C. send-key

**Explanation:**
The send-key option followed by the name of the key sends the key to the key server specified by the --keyserver option. This is a typical scenario for sending a locally generated public key to a public server for others to use. The other options are not valid.

**Example:**
To send a key to a keyserver using gpg, you would use:

```bash
gpg --send-key keyID
```

</details>

---

### Question 66

Which of the following commands should be used to edit the /etc/sudoers file?

A. Any text editor such as Vi or Nano
B. editsudo
C. visudo
D. visudoers

<details>
<summary style="color: red;">Answer</summary>

C. visudo

**Explanation:**
While any text editor can be used, it is highly recommended to use the visudo command to edit /etc/sudoers. Using visudo enables syntax checking, which will help prevent issues with an invalid configuration causing problems for thos who rely on sudo. The other options are not valid.

**Example:**
To edit the /etc/sudoers file, use:

```bash
sudo visudo
```

</details>

---

### Question 67

Which file can be used to store a server-wide cache of hosts whose keys are known for SSH?

A. /etc/sshd_known_hosts
B. /etc/ssh_known_hosts
C. ~/.ssh/known_hosts
D. /root/ssh_known_hosts

<details>
<summary style="color: red;">Answer</summary>

B. /etc/ssh_known_hosts

**Explanation:**
The file ssh_known_hosts, usually kept in either /etc/ or /etc/ssh/, is used for the purpose described. Note that on some systems, this file and other SSH-related configurations may be found in /etc/sshd/. The answers that indicated ~ or within /root are incorrect because the question specified a server-wide list. A known_hosts file found within ~/.ssh would indicate the user's home directory. The file /etc/sshd_known_hosts does not exist.

**Example:**
To add a host key to the system-wide known_hosts file, use:

```bash
sudo echo "hostkey" >> /etc/ssh/ssh_known_hosts
```

</details>

---

### Question 68

Which option within /etc/sshd/sshd.conf (or /etc/sshd_config) can be changed to prevent password-based authentication?

A. PasswordAuthentication
B. Passwrds
C. AllowPass
D. AllowPasswords

<details>
<summary style="color: red;">Answer</summary>

A. PasswordAuthentication

**Explanation:**
The option PasswordAuthentication configures whether users will be allowed to authenticate using a password rather than key-based or another form of authentication. The other options shown are not valid. Note that on some distributions, the configuration files are found in /etc/sshd/, while on other distributions, the configuration files are found in /etc/ssh/.

**Example:**
To disable password-based authentication, set PasswordAuthentication to no in /etc/ssh/sshd_config:

```bash
PasswordAuthentication no
```

</details>

---

### Question 69

Which of the following commands generates a GnuPG key pair?

A. gpg --gen-key
B. gpg --key
C. gpg --send-key
D. gpg --create-key

<details>
<summary style="color: red;">Answer</summary>

A. gpg --gen-key

**Explanation:**
The --gen-key subcommand is used for the purpose described and will generate a self-signed private and public key pair in a PKI scenario.
The other options shown do not exist.

**Example:**
To generate a GnuPG key pair, use:

```bash
gpg --gen-key
```

</details>

---

### Question 70

Which file is used as the default storage for public keyrings for gpg?

A. publickeys.gpg
B. pubring.gpg
C. public.gpg
D. pubkeys.gpg

<details>
<summary style="color: red;">Answer</summary>

B. pubring.gpg

**Explanation:**
The file pubring.gpg, found in ~/.gnupg/, is used to store public keys for GnuPG. The other options shown are not valid.

**Example:**
To view the public keys in the keyring, use:

```bash
gpg --list-keys
```

</details>

---

### Question 71

Which option to the su command is used to obtain the normal login environment for the target user?

A. -u
B. -U
C. -
D. -login

<details>
<summary style="color: red;">Answer</summary>

C. -

**Explanation:**
The - option is used to obtain the normal login environment for the target user. The other options are not valid.

**Example:**
To obtain the normal login environment for the target user, use:

```bash
su - username
```

</details>

---

### Question 72

Which option enables SSL configuration for a given website or server?

A. SSLEngine
B. SSLDirect
C. SSLEnable
D. SSLConnect

<details>
<summary style="color: red;">Answer</summary>

A. SSLEngine

**Explanation:**
The SSLEngine option needs to be set to On for SSL to be enabled for a given site or server. The other options are not valid. Enabling SSL is important in order to provide a level of security such that the actual data within an HTTP transaction cannot be viewed.

**Example:**
To enable SSL for a given site, use:

```bash
SSLEngine On
```

</details>

---

### Question 73

When using the net command in an Active Directory single sign-on (SSO) environment, which option enables authenticaiton using Kerberos?

A. -b
B. -k
C. -l
D. -a

<details>
<summary style="color: red;">Answer</summary>

B. -k

**Explanation:**
The -k option enables Kerberos authentication for the net command. The -a option indicates that non-interactive mode should be used, and -l sets the log directory. There is no -b option.

**Example:**
To use Kerberos authentication with the net command, use:

```bash
net -k
```

</details>

---

### Question 74

Whithin which directroy are individual configuration files stored for the Pluggable Authenticaiton Module (PAM) mechanism?

A. /etc/pamd
B. /etc/pam
C. /etc/pam.d
D. /etc/pam.conf.d

<details>
<summary style="color: red;">Answer</summary>

C. /etc/pam.d

**Explanation:**
The directory /etc/pam.d stores configuration files for individual PAM-aware services. Each service typically has its own file, which is managed for that service according to its usage of PAM. Of the other options, none of the directories are the default directories used for PAM.

**Example:**
To view the PAM configuration for a given service, look in /etc/pam.d/ for the service-specific file.

</details>

---

### Question 75

On which port does the slapd LDAP daemon listen for connections?

A. 389
B. 3389
C. 3306
D. 110

<details>
<summary style="color: red;">Answer</summary>

A. 389

**Explanation:**
The standard port for LDAP is 389, and that is the port on which slapd listens for connections. Port 3389 is RDP, while 3306 is MySQL. Finally, 110 is POP3.

**Example:**
To configure slapd to listen on a different port, edit the /etc/ldap/slapd.conf file and change the port directive.

</details>

---

### Question 76

Which PAM module prevents logins from accounts other than root when the file /etc/nologin exists?

A. pam_login.so
B. pam_preventlogin.so
C. pam_nologin.so
D. pma_logindef.so

<details>
<summary style="color: red;">Answer</summary>

C. pam_nologin.so

**Explanation:**
The pam_nologin.so module facilitates a scenario whereby non-root logins are prevented when /etc/nologin exists. This module must be specified within a configuration file for a given service. For example, within the sshd PAM configuration file, the following line creates this configuration for SSH: account required pam_nologin.so. The other options are not valid.

**Example:**
To prevent non-root logins when /etc/nologin exists, add the following line to the PAM configuration file for the service:

```bash
account required pam_nologin.so
```

</details>

---

### Question 77

Which PAM module is responsible for normal or standard password authentication?

A. pam_auth.so
B. pam_login.so
C. pam_unix.so
D. pam_standardlogin.so

<details>
<summary style="color: red;">Answer</summary>

C. pam_unix.so

**Explanation:**
The pam_unix.so module is used for standard login. The manpage for pam_unix.so indicates that it is for "traditional password authentication."
The other modules listed are not standard PAM modules, altough there is a similar pam_auth or squid_pam_auth module for Squid. The pam_login.so and pam_standardlogin.so modules do not exist.

**Example:**
To configure standard password authentication, add the following line to the PAM configuration file for the service:

```bash
auth required pam_unix.so
```

</details>

---

### Question 78

Which PAM moudle provides a mechanism for checking and enforcing the stregth of passwords in order to enforce a password policy?

A. pam_passwdstr.so
B. pam_cracklib.so
C. pam_libpasswd.so
D. pam_strpass.so

<details>
<summary style="color: red;">Answer</summary>

B. pam_cracklib.so

**Explanation:**
The pam_cracklib.so module enforces password strength options. The other files listed are not valid PAM modules. The pam_cracklib.so module is used to enforce password policies such as minimum length, complexity, and history.

**Example:**
To enforce password strength, add the following line to the PAM configuration file for the service:

```bash
password required pam_cracklib.so
```

</details>

---

### Question 79

Which format should the certificate and key be in for a Postfix TLS configuration?

A. PKCS
B. PEM
C. TLS
D. SSL

<details>
<summary style="color: red;">Answer</summary>

B. PEM

**Explanation:**
PEM format is used for public and private keys with a Postfix TLS configuration. The other methods listed are valid cryptographic algorithms or systems but not for the scenario described. As with Sendmail, system administrators should take steps to secure mail servers so that the servers are not used for sending unsolicited email. For many scenarios, a full mail server like Postfix or Sendmail is not required in order to simply relay mail from a server.

**Example:**
To configure Postfix to use a certificate and key in PEM format, add the following lines to the Postfix configuration file:

```bash
smtpd_tls_cert_file = /etc/ssl/certs/server.crt
smtpd_tls_key_file = /etc/ssl/private/server.key
```

</details>

---

### Question 80

Which iptables chain is used to create a port redirect?

A. REDIRECT
B. PREROUTING
C. PORTREDIR
D. ROUTING

<details>
<summary style="color: red;">Answer</summary>

A. REDIRECT

**Explanation:**
The PREROUTING chain, part of the nat table, contains rules that are applied as packets arrive. A common use for this chain is to apply redirect rules. Among the other answers, REDIRECT may appear valid but is in fact a target and not a chain. The other options shown are not valid.

**Example:**
To redirect traffic from port 80 to port 8080, use:

```bash
iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-port 8080
```

</details>

---

### Question 81

Which of the following commands saves the current set of iptables rules into a file?

A. save-iptables
B. iptables-create
C. iptables-save
D. ipt-save

<details>
<summary style="color: red;">Answer</summary>

C. iptables-save

**Explanation:**
The iptables-save command sends the current iptables rules to STDOUT. The output can be saved to a file and then applied the next time the server is restarted. The other commands shown are not valid. The iptables-restore command is used to restore the rules from a file. The iptables command is used to manage the rules.

**Example:**
To save the current iptables rules to a file, use:

```bash
iptables-save > /etc/iptables/rules.v4
```

</details>

---

### Question 82

Which of the following commands lists the current iptables rules while not attempting to resolve host or port names?

A. iptables -L
B. iptables -List -no-resolve
C. iptables -a
D. iptables -nL

<details>
<summary style="color: red;">Answer</summary>

D. iptables -nL

**Explanation:**
The iptables -n option causes iptables to not resolve host names or port names. The -L option lists current rules. There is no -a option and the other options are not valid.

**Example:**
To list the current iptables rules without resolving host or port names, use:

```bash
iptables -nL
```

</details>

---

### Question 83

Which of the following directories contains configuration files for the fail2ban system?

A. /etc/fail2ban.cfg
B. /etc/fail2ban.d
C. /etc/f2b
D. /etc/fail2ban

<details>
<summary style="color: red;">Answer</summary>

D. /etc/fail2ban

**Explanation:**
The /etc/fail2ban directory contains configuration files related to fail2ban. The other directories shown are not valid. The use of fail2ban
is helpful for SSH when compared with other methods like the recently deprecated pam_tall2 and faillock, both of which would not prevent key-based authentication for SSH.

**Example:**
To configure fail2ban, edit the configuration files in /etc/fail2ban.

</details>

---

### Question 84

Whithin an OpenSSH configuration, which option disables the use of empty passwords?

A. DisableEmptyPass
B. PermitEmptyPasswords
C. EmptyPasswordAuth
D. PermitPasswordLength

<details>
<summary style="color: red;">Answer</summary>

B. PermitEmptyPasswords

**Explanation:**
The PermitEmptyPasswords directive specifies whether empty passwords can be used for authentication. Enabling empty passwords would be a specialized use case and genrally is not recommended. The other options shown are not valid.

**Example:**
To disable the use of empty passwords in OpenSSH, add the following line to the sshd configuration file:

```bash
PermitEmptyPasswords no
```

</details>

---

### Question 85

Which of the following commands sets the default policy for the INPUT chain to discard packets that don't have a specific rule allowing them?

A. iptables INPUT DROP
B. iptables chain INPUT policy DROP
C. iptables -P INPUT DROP
D. iptables POLICY=DROP CHAIN=INPUT

<details>
<summary style="color: red;">Answer</summary>

C. iptables -P INPUT DROP

**Explanation:**
The -P option sets the policy for a given chain in iptables. In this case, the chain is INPUT and the policy necessary is DROP. The other options are not valid. The iptables command is used to manage the rules in the Linux kernel firewall.

**Example:**
To set the default policy for the INPUT chain to DROP, use:

```bash
iptables -P INPUT DROP
```

</details>

---

### Question 86

When configuring VPN service through a firewall, on which port and protocol does OpenVPN listen?

A. ICMP/1194
B. UDP/1194
C. TCP/1194
D. VPN/1194

<details>
<summary style="color: red;">Answer</summary>

B. UDP/1194

**Explanation:**
OpenVPN listens on UDP port 1194 by default. The other combinations are not the valid OpenVPN configuration. OpenVPN is a popular VPN solution that is used to create secure connections between systems.

**Example:**
To configure OpenVPN to listen on a different port, edit the OpenVPN configuration file and change the port directive.

</details>

---

### Question 87

Which of the following best describes the difference between the DROP and REJECT targets in iptables?

A. Both DROP and REJECT do the same thing.
B. DROP silently discards packets, while REJECT sends an ICMP acknowledgment.
C. REJECT silently discards message, while DROP sends an ICMP acknowledgment.
D. DROP sends back a direct message, and REJECT sens a redirect message.

<details>
<summary style="color: red;">Answer</summary>

B. DROP silently discards packets, while REJECT sends an ICMP acknowledgment.

**Explanation:**
The DROP target silently discards packets that match the rule. An ICMP unreachable message is sent back for REJECT. In general, DROP is preffered
in order to reduce the chances of denial of service (DoS) or other information-gathering issues. The other options are not valid.

**Example:**
To drop packets that match a rule, use:

```bash
iptables -A INPUT -s
```

</details>

---

### Question 88

Which of the following partial iptables rules sets up a configuration that limits log entries to threee per minute?

A. -m limit 3 -j LOG
B. -m limit --limit 3/minute --limit-burst 3 -j LOG
C. -m limit --limit 3
D. -m limit --limit-minute 3 --burst 3 -j LOG

<details>
<summary style="color: red;">Answer</summary>

B. -m limit --limit 3/minute --limit-burst 3 -j LOG

**Explanation:**
The -m match limit, along with the configuration options shown including the LOG target, creates the scenario described. There will be three log entries per minute. This can be useful to prevent denial
of service caused by filling up log files or overwhelming the server I/O while another attack is under way. The other options are not valid.

**Example:**
To limit log entries to three per minute, use:

```bash
iptables -A INPUT -m limit --limit 3/minute --limit-burst 3 -j LOG
```

</details>

---

### Question 89

Which of the following partial iptables rules allows incoming ICMP traffic?

A. -A INPUT -p ICMP -j ACCEPT
B. -A IN -P ICMP
C. -A INPUT -P ACCEPT -ICMP
D. -A IN -P ICMP -j ACCEPT

<details>
<summary style="color: red;">Answer</summary>

A. -A INPUT -p ICMP -j ACCEPT

**Explanation:**
The INPUT chain will be used. When used with the -A option, it will append a rule to the chain. The -p option specifies the protocol, ICMP in this case; the -j option specifies the target,
ACCEPT in this case. The -P option specifies a policy and will not be used for this scenario. The other options are not valid.

**Example:**
To allow incoming ICMP traffic, use:

```bash
iptables -A INPUT -p icmp -j ACCEPT
```

</details>

---

### Question 90

Which of the following partial iptables rules blocks all traffic from source IP 192.168.51.50?

A. -A INPUT -p ALL 192.168.51.50 -j ACCEPT
B. -A INPUT -p ALL -s 192.168.51.50 -j DROP
C. -A INPUT -p ALL -s 192.168.51.50 -j BLOCK
D. -A INPUT -p ALL -f 192.168.51.50 -j DISCARD

<details>
<summary style="color: red;">Answer</summary>

B. -A INPUT -p ALL -s 192.168.51.50 -j DROP

**Explanation:**
The INPUT chain will be used, and a rule needs to be appended with -A. The ALL option, when specifying a protocol, means all protocols will be included
in the rule. The -s option specifies the source, which in this case is a single IP address. Finally, the DROP target silently discards packets. There is no BLOCK
or DISCARD target, and the ACCEPT target will not block but will accept all traffic. The other options are not valid.

**Example:**
To block all traffic from a specific IP address, use:

```bash
iptables -A INPUT -p ALL -s 192.168.51.50 -j DROP
```

</details>

---

### Question 91

Which of the following partial iptables rules will allow all hosts to connect to TCP port 2222?

A. -A INPUT -p TCP -s 0/0 --destination-port 2222 -j ACCEPT
B. -A TCP -s ALL -p 2222 -j ACCEPT
C. -A INPUT -p TCP -s*.* --destination-port 2222 -j ALLOW
D. -A INPUT --destination-port _/_ -j ACCEPT

<details>
<summary style="color: red;">Answer</summary>

B. -A TCP -s ALL -p 2222 -j ACCEPT

**Explanation:**
A rule will be appended to the INPUT chain with -A. In this case, the protocol should be specified with -p TCP and a destination port of 2222. The source address indicated, 0/0, applies the rule to all hosts. The ACCEPT target will be used. The other options are not valid.

**Example:**
To allow all hosts to connect to TCP port 2222, use:

```bash
iptables -A INPUT -p tcp --dport 2222 -s 0.0.0.0/0 -j ACCEPT
```

</details>

---

### Question 92

Which of the following commands enables forwarding such as would be used for NAT?

A. echo "1" > /proc/sys/net/ipv4/nat
B. echo "1" ? /proc/sys/net/ipv4/ip_forward
C. iptables --enable-forwarding
D. ip-forward --enable

<details>
<summary style="color: red;">Answer</summary>

B. echo "1" ? /proc/sys/net/ipv4/ip_forward

**Explanation:**
Echoing a 1 to the /proc/sys/net/ipv4/ip_forward file enables forwarding of IP packets. This is necessary in order to utilize NAT and for other uses.
There is a similar file for IPv6 at /proc/sys/net/ipv6/ip_forward. There is no /proc/sys/net/ipv4/nat file. The other options are not valid.

**Example:**
To enable IP forwarding, use:

```bash
echo "1" > /proc/sys/net/ipv4/ip_forward
```

</details>

---

### Question 93

Within a jail configuration for fail2ban, which configuration options sets the name and location of the log file to monitor for failures?

A. logpath
B. monitor
C. logfile_mon
D. monitor_log

<details>
<summary style="color: red;">Answer</summary>

A. logpath

**Explanation:**
The logpath directive determines the log file that will be monitored for failures by fail2ban. This file is used as part of a larger configuration for a given jail.
The other directives are not valid for fail2ban configuration.

**Example:**
To set the log file to monitor for failures, use:

```bash
logpath = /var/log/auth.log
```

</details>

---

### Question 94

Which command sends a copy of the public key identity to another server for use with SSH?

A. ssh-key
B. ssh-copy-key
C. ssh-sendkey
D. ssh-copy-id

<details>
<summary style="color: red;">Answer</summary>

D. ssh-copy-id

**Explanation:**
The ssh-copy-id command sends an identity to a remote server that can then be used for key-based authenticaiton. The other commands hsown are not valid.

**Example:**
To send a public key to a remote server, use:

```bash
ssh-copy-id user@remote-server
```

</details>

---

### Question 95

Which option in /etc/sudoers sets the destination address for administrative and security emails related to sudo?

A. mail
B. mailto
C. secmail
D. adminmail

<details>
<summary style="color: red;">Answer</summary>

B. mailto

**Explanation:**
The mailto configuration options sets the destination for emails related to sudo. The other options listed are not valid for sudo.

**Example:**
To set the destination address for sudo emails, use:

```bash
Defaults mailto="alux@live.com"
```

</details>

---

### Question 96

Which port should be allowed through a firewall for NTP communication?

A. Port 139
B. Port 161
C. Port 123
D. Port 194

<details>
<summary style="color: red;">Answer</summary>

C. Port 123

**Explanation:**
Port 123 is used for NTP communication by default. Port 161 is SNMP, while 139 is NetBIOS, and 194 is IRC.

**Example:**
To allow NTP communication through a firewall, open port 123.

- iptables -A INPUT -p udp --dport 123 -j ACCEPT

</details>

---

### Question 97

You are looking for files related to the SSL configuration on the server. After looking in /etc/ssl, within which other directory might the files reside?

A. /etc/sslconfig
B. /usr/share/ssl
C. /etc/pki
D. /etc/private

<details>
<summary style="color: red;">Answer</summary>

C. /etc/pki

**Explanation:**
Files related to SSL are typically stored in either /etc/ssl (or a subdirectory therein) or in the /etc/pki hierarchy. There is no /etc/private
or /usr/share/ssl directory. The other directories shown as options do not exist.

</details>

---

### Question 98

Which OpenSSH configuration directive is used to specify the users who will be allowed to log in using SSH?

A. AllowUsers
B. PermitUsers
C. UsersAllowed
D. AllowedUsers

<details>
<summary style="color: red;">Answer</summary>

A. AllowUsers

**Explanation:**
The AllowUsers directive is used to specify users who will be allowed to log in to the server. The other options shown are not valid.

**Example:**
To allow only the users "alex" and "jane" to log in using SSH, use:

```bash
AllowUsers alex jane
```

</details>

---

### Question 99

Which option within a LOG target for iptables sets a string that will be prepended to log entries?

A. --log-prefix
B. --prepend
C. --log-prepend
D. --log-str

<details>
<summary style="color: red;">Answer</summary>

A. --log-prefix

**Explanation:**
The --log-prefix option specifies the string that will be prepended when a log entry is created by iptables. The other options shown are not valid for use with iptables.

**Example:**
To set a prefix for log entries, use:

```bash
iptables -A INPUT -j LOG --log-prefix "IPTABLES: "
```

</details>

---

### Question 100

Whithin the SELinux configuration, which option controls whether the policy will be targeted or strict?

A. SEPOLICY
B. SELINUXTYPE
C. SETARGET
D. SELINUXPOLICY

<details>
<summary style="color: red;">Answer</summary>

B. SELINUXTYPE

**Explanation:**
The SELINUXTYPE option can be set to targeted or strict. With targeted, only specific network daemons are protected. With strict, all daemons are protected. The other options shown are not valid.

**Example:**
To set the SELinux policy to targeted, use:

```bash
SELINUXTYPE=targeted
```

</details>

---

### Question 101

Which of the following best describes the status of SELinux when the command getenforce returns Permissive?

A. A Permissive return means SELinux is enabled but rules are not enforced, although DAC rules are still in effect.
B. A Permissive return means SELinux is not enabled.
C. A Permissive return means SELinux is enabled, although rules are not enforced and DAC rules are not in effect.
D. A Permissive return means SELinux is using an enforcing policy.

<details>
<summary style="color: red;">Answer</summary>

A. A Permissive return means SELinux is enabled but rules are not enforced, although DAC rules are still in effect.

**Explanation:**
When SELinux is in Permissive mode, it is enabled but rules are not enforced. DAC rules are still in effect. The other options are not valid. The getenforce command is used to determine the current SELinux status. The setenforce command is used to change the SELinux status. The sestatus command provides a more detailed view of the SELinux status. The SELinux status can be set in the /etc/selinux/config file. The SELinux policy can be set in the /etc/selinux/config file. The SELinux policy can be set to targeted or strict.

**Example:**
To set SELinux to Permissive mode, use:

```bash
setenforce 0
```

</details>

---

### Question 102

Which of the following describes the primary difference between the configuration files ssh.conf and sshd.conf (typically found in /etc/sshd/ or /etc/ssh/)?

A. sshd.conf is the configuration file for the system SSH, and ssh.conf is the options configuration file.
B. sshd.conf is the configuration file for the system SSH daemon, and ssh.conf provides system-wide client SSH configuration.
C. sshd.conf is used when SSH will be disabled, and ssh.conf is used when SSH is enabled.
D. sshd.conf is the first configuration file read for a client connection, while ssh.conf is the first configuration read for a server configuration.

<details>
<summary style="color: red;">Answer</summary>

B. sshd.conf is the configuration file for the system SSH daemon, and ssh.conf provides system-wide client SSH configuration.

**Explanation:**
The sshd.conf file is used for server configuration. On some distributions, this file is called sshd_config. The ssh.conf file is used for client configuration at the system level. The other options are not valid.

**Example:**
To configure the SSH daemon, edit the sshd_config file. To configure the SSH client, edit the ssh_config file. Both files are typically found in /etc/ssh/ or /etc/sshd/.

</details>

---

### Question 103

When you're working with PAM, a module that is marked as required has failed. Which of the following describes what happens to the other modules in that realm?

A. Processing stops immediately when a failure of a required module occurs.
B. Processing stops after all required modules are processed.
C. Processing continues until another required module is encountered.
D. Processing continues through other modules but ultimately fails.

<details>
<summary style="color: red;">Answer</summary>

D. Processing continues through other modules but ultimately fails.

**Explanation**
When a required module returns a failure, other modules continue to process, but the authentication ultimately fails. This is done so that logging will occur and other modules have had a chance to handle
the authentication attempt. If a failure should be immediate without processing other modules, then the requisite option should be used instead of required. The other options are not valid.

</details>

---

### Question 104

What is the UID of the root account?

A. 1000
B. 0
C. 100
D. 65535

<details>
<summary style="color: red;">Answer</summary>

B. 0

**Explanation**
The root account has UID 0 on a Linux system. Typically, service accounts have UIDs below 1000, many times below 100. Normal user accounts usually begin at UID 10000. The other options are not valid.

</details>

---

### Question 105

Using a system such as Google Authenticatior to provide multifactor authentication is an example of which type of token?

A. Hardware
B. Software
C. Virtual-based
D. Usage-based

<details>
<summary style="color: red;">Answer</summary>

B. Software

**Explanation**
Although a hardware token may be available, the default option is software based. Note also that OTP solutions to generate a one-time passcode are similar in functionality to provide multifactor authentication. The other options are not valid.

</details>

---

### Question 106

Whitin which directory are the predefined zones for firewalld?

A. /etc/firewalld/
B. /usr/lib/firewalld/zones/
C. /usr/firewalld/zones/
D. /etc/firewall/zones

<details>
<summary style="color: red;">Answer</summary>

B. /usr/lib/firewalld/zones/

**Explanation**
The directory /usr/lib/firewalld/zones/ contains predefined zones for use with firewalld. The files are copied to /etc/firewalld/zones/ when modified. The other options are not valid.

</details>

---

### Question 107

You need to set a bootloader password for GRUB. To do so, which of the following configuration options should be set in /boot/grub/grub.conf?

A. login
B. prompt
C. boot-passwd
D. password

<details>
<summary style="color: red;">Answer</summary>

D. password

**Explanation**
The password configuration option is set in /boot/grub/grub.conf. The other options shown for this question are not valid for the scenario.

**Example**
To set a password for GRUB, add the following line to /boot/grub/grub.conf:

```bash
password --md5 $1$2sdfj$
```

</details>

---

### Question 108

Assuming that the output from the sestatus command indicates that SELinux is in Permissive mode, which of the following commands is used to change the mode to Enforcing?

A. setenforce en
B. setenforce 1
C. setenforce on
D. setenforce --enable

<details>
<summary style="color: red;">Answer</summary>

B. setenforce 1

**Explanation**
The setenforce command is used for this purpose and can be given an argument of the number 1 or the word Enforcing to enable Enforcing mode. This can be verified with the sestatus command. The other options are not valid.

**Example**
To change SELinux to Enforcing mode, use:

```bash
setenforce 1
```

</details>

---

### Question 109

Your organization uses ssh-agent for authenticaiton assistance with SSH. Which command can be used to add a private key to ssh-agent?

A. ssh-privkey
B. ssh-agent-key
C. ssh-add
D. ssh-addkey

<details>
<summary style="color: red;">Answer</summary>

C. ssh-add

**Explanation**
The ssh-add command is used for this purpose. The other commands shown do not exist.

**Example**
To add a private key to ssh-agent, use:

```bash
ssh-add /path/to/private-key
```

</details>

---

### Question 110

When working with access control lists (ACLs), which of the following commands is used to display inforamtion about the access control list for a given file?

A. getfacl
B. getacl
C. acldisp
D. showacl

<details>
<summary style="color: red;">Answer</summary>

A. getfacl

**Explanation**
The getfacl command is used to display access control list information for a file. The setfacl command is used to set this information. The other commands shown are not valid Linux commands.

**Example**
To display the access control list for a file, use:

```bash
getfacl /path/to/file
```

</details>

---

### Question 111

You need to provide a special username and other parameters related to a specific host to which you connect using SSH. To which file should you add this information?

A. ~/.ssh/hosts
B. ~/.ssh/known_hosts
C. ~/.ssh/config
D. ~/.ssh/hostconfig

<details>
<summary style="color: red;">Answer</summary>

C. ~/.ssh/config

**Explanation**
The file ~/.ssh/config is the appropriate location for this type of configuration information. Of the other answers, only ~/.ssh/known_hosts exists and contains public key inforamtion for hosts
to which you have connected. The other options are not valid.

**Example**
To add a special username and other parameters for a specific host, add the following to ~/.ssh/config:

```bash
Host hostname
    User username
    Port 2222
```

</details>

---

### Question 112
