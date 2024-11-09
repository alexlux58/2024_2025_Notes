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

</details>

---

### Question 61
