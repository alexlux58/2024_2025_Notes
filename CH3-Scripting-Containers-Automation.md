### Question 1

You are writing a shell script using Bash and need to print the contents of a variable. Which of the following commands can be used to do so?

A. echo
B. lf
C. sp
D. varpt

<details>
<summary style="color: red;">Answer</summary>

A. echo

**Explanation:**
The echo command is used to send output from a Bash script. The other options are not valid commands for this purpose.

</details>

---

### Question 2

Which of the following packages provides orchestration for Linux in an agentless manner?

A. Ansible
B. Puppet
C. Automat
D. vid

<details>
<summary style="color: red;">Answer</summary>

A. Ansible

**Explanation:**
Ansible is agentless, using SSH and Python for orchestration Puppet does have an agentless mode but typically uses agents for orchestration. The others are not valid orchestration packages.

</details>

---

### Question 3

Which of the following commands can be used to execute a command with a customized environment?

A. set
B. env
C. run
D. crun

<details>
<summary style="color: red;">Answer</summary>

B. env

**Explanation:**
The `env` command executes a command and enables a custom environment for that command execution. The `set` command changes environment variables but does not change variables for the single command execution, as specified in the scenario. The other options are not valid commands for this purpose.

</details>

---

### Question 4

Which of the following commands, when used with git, retrieves the latest objects from a repository and attempts to incorporate those changes into the local working copy of the repository?

A. fetch
B. pull
C. retr
D. get

<details>
<summary style="color: red;">Answer</summary>

B. pull

**Explanation:**
The pull command in git fetches the changes and incorporates them into the current working copy. The fetch command retrieves but does not incorporate the changes. The other options are not valid git subcommands.

</details>

---

### Question 5

Which of the following best describes the concept of infrastructure as code?

A. The management of switches and routers using compiled programs
B. The management of servers and other systems using scripting, source code management, and automation
C. The deployment of hardware using Agile methodologies
D. Planning for bugs in infrastructure code and allowing time to fix them

<details>
<summary style="color: red;">Answer</summary>

B. The management of servers and other systems using scripting, source code management, and automation

**Explanation:**
Infrastructure as code typically means managing infrastructure components using some of the same tools that developers would use, such as source code management, scripting, and automation.
These practices help to facilitate continuous integration/continuous deployment (CI/CD) scenarios by automating many processes.
The other options are not accurate descriptions of infrastructure as code.

</details>

---

### Question 6

Which of the following commands changes a file called script.sh, which is located in your home directory, such that it can be executed by the owner of the file and no one else?

A. chmod 700 ~/script.sh
B. chown +x/script.sh
C. chmod ~/script.sh +x
D. chmod 777 /home/script.sh

<details>
<summary style="color: red;">Answer</summary>

A. chmod 700 ~/script.sh

**Explanation:**
The chmod command will be used for this solution. The option granting 700 enables execute privileges for the owner.
The other options have incorrect syntax, an incorrect path, or inappropriate permissions for the scenario described.
It is important to differentiate between relative and absolute paths, noting that ~/ is an alias for your home directory.

</details>

---

### Question 7

Which command can be used to add functions and variables to the current shell?

A. source
B. echo
C. en
D. src

<details>
<summary style="color: red;">Answer</summary>

A. source

**Explanation:**
The source command adds functions found in the file arguments to the current shell. The source command is frequently used for software installs to ensure that the environment
is set up properly prior to execution of the install scripts. The other options are not valid commands for this purpose.

**Example:**

```bash
# START >> myscript.sh <<
#!/usr/bin/env bash

# Define a variable
export APP_ENV="production"

# Define a function
greet_user() {
    echo "Hello, $USER! Welcome to the $APP_ENV environment."
}

# Add a command to verify the script ran
echo "Environment and functions have been set up."
# END >> myscript.sh <<

source myscript.sh
echo $APP_ENV
# Output: production
greet_user
# Output: Hello, your_username! Welcome to the production environment.
```

</details>

---

### Question 8

Which of the following is the correct method for invoking the Bash shell for a script,
typically found as the first line of the script?

A. #!/BASH
B. #!bash
C. #!/bash
D. #!/bin/bash

<details>
<summary style="color: red;">Answer</summary>

D. #!/bin/bash

**Explanation:**
The character sequence #!/bin/bash invokes the commands that follow as a Bash script.
The other options are not valid shebang lines for invoking the Bash shell.

</details>

---

### Question 9

You need to send output from a command to a log file. Overwriting the contents of the log
file is acceptable. Which of the following characters is used to redirect output in such
a way as to fulfill this scenario?

A. |
B. <
C. >
D. &

<details>
<summary style="color: red;">Answer</summary>

C. >

**Explanation:**
The greater-than sign is used to redirect output to a file and will overwrite the file if it already
exists. The pipe character can be used to chain output but is not considered redirection
of output. The less-than sign will redirect input and the ampersand will send a
process into the background.

</details>

---

### Question 10

You need to create a new empty git repository called repo. Which of the following sequences
accomplishes this task?

A. mkdir repo; cd repo; git init --bare
B. mkdir repo; git init repo/
C. git init repo -md
D. git create repo/

<details>
<summary style="color: red;">Answer</summary>

A. mkdir repo; cd repo; git init --bare

**Explanation:**
Creating a git repository requires creating a directory, changing the current working directory
to the new directory, and then running git init --bare. The other commands will not create
an empty git repository.

</details>

---

### Question 11

Which of the following terms is used in orchestration and automation scenarios to refer
to the collection of devices being managed?

A. Device collection
B. Inventory
C. Machines
D. UsableObjects

<details>
<summary style="color: red;">Answer</summary>

B. Inventory

**Explanation:**
The term _Inventory_ is most often used in orchestration to refer to the collection
of devices under management. The other terms are not commonly used in this context.

</details>

---

### Question 12

You need to print output from a Bash script such that single quotes appear in the outputted
string. Which character should be used as an escape sequence in order to get the single
quotes into the output?

A. /
B. '
C. ?
D. \

<details>
<summary style="color: red;">Answer</summary>

D. \

**Explanation:**
A backslash is used to escape characters such as a single quote in a Bash script.
The other characters will not achieve the desired result.

**Example:**

```bash
echo "This is a single quote: \'"
# Output: This is a single quote: '
```

</details>

---

### Question 13

Which exit code indicates success for a Bash script?

A. 0
B. 1
C. 2
D. EOF

<details>
<summary style="color: red;">Answer</summary>

A. 0

**Explanation:**
An exit code of 0 indicates that the script did not encounter an error. This exit code
is generally associated with a successful execution of a program in Linux. The other
exit codes are not typically associated with successful execution of a program.

</details>

---

### Question 14

Which of the following commands produces output sit sat set?

A. echo s{i,a,e}t
B. echo s(i,a,e)t
C. echo s[i,a,e]t
D. echo s/i,a,e/t

<details>
<summary style="color: red;">Answer</summary>

A. echo s{i,a,e}t

**Explanation:**
Shell expansion, or more accurately, brace expansion, can be used to create the output
shown. The other options will not produces output as shown.

</details>

---

### Question 15

Which of the following characters or character sequences begins a comment in a Bash script?

A. /\*
B. //
C. #
D. '

<details>
<summary style="color: red;">Answer</summary>

C. #

**Explanation:**
The pound sign (#) is used to indicate that what follows is a comment and will not be executed
for the remainder of the line. The other options are valid comment styles in other languages
but not for a Bash script.

</details>

---

### Question 16

Which, if any, file extension is required in order for a Bash script to execute?

A. .sh
B. .bash
C. bat
D. No special extension is necessary.

<details>
<summary style="color: red;">Answer</summary>

D. No special extension is necessary.

**Explanation:**
No special extension is necessary for a Bash script to be executed. The extension .sh
shown as an option is a common extension that you will see for a shell scripts of any
variety, but the extension isn't required.

</details>

---

### Question 17

After fetching changes for a previously cloned repository, which git command is used
to incorporate the changes from that branch into the local copy?

A. put
B. push
C. merge
D. inc

<details>
<summary style="color: red;">Answer</summary>

C. merge

**Explanation:**
The merge command incorporates changes to a previously cloned git repository. The
push command is valid but is used to send code to a remote repository or origin.
The other commands are not valid.

</details>

---

### Question 18

Which of the following best describes the role of an agent in software orchestration?

A. An agent is software that listens for and executes commands from the server.
B. An agent is used to migrate from one operating system to another.
C. An agent is a hardware-based token used for authentication.
D. An agent is not used in software orchestration.

<details>
<summary style="color: red;">Answer</summary>

A. An agent is software that listens for and executes commands from the server.

**Explanation:**
An agent is software that runs on clients and listens for commands from the server
in an orchestration architecture. The other options are not accurate descriptions of an agent.

</details>

---

### Question 19

Being able to deploy additional servers in response to high demand or loads is an example of which type of automation?

A. Build
B. Compile
C. Infrastructure
D. Config

<details>
<summary style="color: red;">Answer</summary>

C. Infrastructure

**Explanation:**
Infrastructure automation is the term most closely associated with adding (and removing)
servers in response to load and demand and is frequently associated with continuous integration/continuous deployment (CI/CD) scenarios.
The other options are not accurate descriptions of this type of automation.

</details>

---

### Question 20

Which command can be used to indicate a local variable within a Bash script?

A. localvar
B. ll
C. local
D. %local%

<details>
<summary style="color: red;">Answer</summary>

C. local

**Explanation:**
When executed as part of a function, the local command can be used to create a local variable in a Bash script. The other options are not valid commands for this purpose.

</details>

---

### Question 21

Which git command is used to retrieve a repository from a remote server?

A. clone
B. checkout
C. co
D. retr

<details>
<summary style="color: red;">Answer</summary>

A. clone

**Explanation:**
The clone command retrieves a copy of the repository for a local use. The checkout and co commands are used with Subversion and not with git. The retr command is not a valid git command.

</details>

---

### Question 22

You need to echo the name of the script back to the user for a usage or help output. Which positional parameter can be used for this purpose?

A. $me
B. $1
C. $myname
D. $0

<details>
<summary style="color: red;">Answer</summary>

D. $0

**Explanation:**
The $0 parameter contains the name of the script being called. The other answers are not valid positional parameters for this purpose.

</details>

---

### Question 23

Which of the following commands can be used to print the contents of the current shell environment?

A. echoenv
B. printenv
C. showenv
D. envvar

<details>
<summary style="color: red;">Answer</summary>

B. printenv

**Explanation:**
The printenv command can be used to print the contents of the current shell environment such as environment variables. Within the output you'll find things
like the $SHELL variable, which specifies the current shell. The other options shown are not valid commands.

</details>

---

### Question 24
