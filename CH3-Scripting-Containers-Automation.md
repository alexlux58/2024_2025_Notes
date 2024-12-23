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

You are writing a while loop in a Bash script and need to compare two string values. Which operator is used for this purpose?

A. -ne
B. =
C. equal
D. eq

<details>
<summary style="color: red;">Answer</summary>

B. =

**Explanation:**
A single equal sign is used for string comparison in a Bash script. Of the other answers, -ne is valid but is used when comparing integers. The
string eq would be an operator if preceded by a single dash, as in -eq. In that case, -eq is used for integer comparison.

</details>

---

### Question 25

You need to create a Bash script that will loop continually and perform some commands within the loop. Which of the following lines will accomplish this task?

A. if [ $exit -eq "exit"]
B. while true; do
C. for ($i=0, $i++)
D. continue until ($exit)

<details>
<summary style="color: red;">Answer</summary>

B. while true; do

**Explanation:**
A while loop that evaluates boolean true will accomplish the task described. The other options given are syntactically incorrect in various ways.

</details>

---

### Question 26

Which of the following commands changes the location to which HEAD is pointing with git?

A. git point
B. git checkout
C. git change
D. git load

<details>
<summary style="color: red;">Answer</summary>

B. git checkout

**Explanation:**
The git checkout command switches the working copy to the specified branch and points the HEAD toward that branch. The other
options are not valid git commands.

**Example:**

```bash
# Create a new branch
git checkout -b new_branch
# Output: Switched to a new branch 'new_branch'
```

</details>

---

### Question 27

You need to declare a variable as part of the environment prior to running a Bash script.
Which of the following commands can be used to accomplish this task?

A. dec
B. create
C. export
D. get

<details>
<summary style="color: red;">Answer</summary>

C. export

**Explanation:**
The export command adds a variable to the current environment and is frequently used for the scenario described. The other options are not valid commands for this purpose.

**example:**

```bash
export APP_ENV="production"
```

</details>

---

### Question 28

Which of the following commands displays the contents of the PATH variable in Bash?

A. echo PATH
B. echo $PATH
C. echo $CURPATH
D. ext $PATH

<details>
<summary style="color: red;">Answer</summary>

B. echo $PATH

**Explanation:**
The current contents of the PATH variable, or any other shell environment variable, can be displayed using the echo command.
Variables in Bash use a $ as part of the identifier. Therefore, any option without the $ would not work.

</details>

---

### Question 29

Which character sequence is used to execute a command within a subshell in a Bash script?

A. $()
B. subs()
C. $%
D. $(~

<details>
<summary style="color: red;">Answer</summary>

A. $()

**Explanation:**
The $() sequence executes a command within a subshell, which is helpful for ensuring that global variables in a Bash script cannot be modified.
The other sequences shown are not valid for the scenario described.

</details>

---

### Question 30

You need to make a change to the configuration of the SSH daemon across your infrastructure. Being able to do so
from a central server is an example of which type of automation?

A. Security
B. Automated configuration management
C. Development configuration management
D. Usability management

<details>
<summary style="color: red;">Answer</summary>

B. Automated configuration management

**Explanation:**
Managing configuration with orchestration is described in this scenario, so option B is the closest response. The other options are not accurate descriptions of this type of automation.

</details>

---

### Question 31

Which option is used with the env command in order to remove a variable from the environment?

A. -r
B. -u
C. -n
D. -d

<details>
<summary style="color: red;">Answer</summary>

B. -u

**Explanation:**
The -u option or --unset will remove a variable from the environment. The other options are not valid with the env command.

</details>

---

### Question 32

Within a Bash script, you need to run two commands but only run the second command if the first succeeds.
Which of the following metacharacters can be use to accomplish this task?

A. <>
B. &
C. &&
D. |

<details>
<summary style="color: red;">Answer</summary>

C. &&

**Explanation:**
The double-ampersand metacharacter executes the right-hand command only if the first command exits with a successful exit
code (0). A single ampersand sends the command into the background, thus making option B incorrect. A pipe character executes the
second command but does so regardless of the success or failure of the first command, thus making option D incorrect.

</details>

---

### Question 33

You need to redirect the output from a command and append that output to a file. Which of the following character sequences accomplishes this task?

A. >
B. >>
C. |
D. ^

<details>
<summary style="color: red;">Answer</summary>

B. >>

**Explanation:**
Two greater-than signs append output to the specified destination. Option A includes only one greater-than sign, which overwrites rather than appends output.
The pipe character in option C does not send output to a file, and option D does not work for the purpose described.

</details>

---

### Question 34

You need to obtain a directory listing of all files and directories except those that begin with the letter p. Which of the following commands accomplishes this task?

A. ls -l !p
B. ls -l [!p]
C. ls -l [^p]
D. ls -l [^p]\*

<details>
<summary style="color: red;">Answer</summary>

D. ls -l [^p]\*

**Explanation:**
File globbing is the process of expansion of special characters, which is required for this scenario. In this case, the negation character is the carret, thus making
option D correct. Option C is missing the crucial globbing pattern needed for this scenario. Option B is incorrect because the square brackets are not needed for this scenario.

</details>

---

### Question 35

Which of the following files is used within a git repository in order to indicate files and file patterns that should not be versioned?

A. novers
B. .gitignore
C. .gitignore.txt
D. gitnover

<details>
<summary style="color: red;">Answer</summary>

B. .gitignore

**Explanation:**
The .gitignore file is used to specify files and file patterns that should not be versioned. The other options are not valid files for this purpose. The .gitignore file is typically placed in the root of the repository. It can be used to specify files, directories, and file patterns that should not be versioned.

</details>

---

### Question 36

You need to iterate through a directory listing and perform an operation on certain files within it. To accomplish this task, you will be using a Bash script
and a looping construct. Which looping construct is most appropriate for this purpose?

A. until
B. do
C. for
D. foreach

<details>
<summary style="color: red;">Answer</summary>

C. for

**Explanation:**
The for loop should be used for this purpose because it iterates through a list. An until loop would require additional code, thus
making it a less-preferable construct for the purpose described. There is no do loop or foreach loop in Bash, thus making those options incorrect.

</details>

---

### Question 37

You are debugging a Bash script written by a different system administrator. Within the script, you see
a command surrounded by backquotes, or `. What will be the result of surrounding the command with backquotes?

A. The command will execute and send all output to the console.
B. The command will not execute.
C. The command will execute as if the $() command substitution was used.
D. The command will execute and send all output to /dev/null.

<details>
<summary style="color: red;">Answer</summary>

C. The command will execute as if the $() command substitution was used.

**Explanation:**
Command substitution can be accomplished using backquotes or $(). These two methods are substantially but not completely equivalent. The backquote method is older and is less flexible than the $() method. The backquote method is still used in many scripts, but the $() method is more common in modern scripts.

</details>

---

### Question 38

Which git command displays a short history of commits along with the commit ID?

A. showhist
B. list
C. log
D. hist

<details>
<summary style="color: red;">Answer</summary>

C. log

**Explanation:**
The log command displays a short history of commits along with the commit ID. The other options are not valid git commands.

**Example:**

```bash
git log
```

</details>

---

### Question 39

You are committing code to a git repository and need to include a message on the command line. Which option enables this behavior?

A. -m
B. -h
C. -f
D. -l

<details>
<summary style="color: red;">Answer</summary>

A. -m

**Explanation:**
The -m option enables a message to be included in the commit, thereby alleviating the need to go into an editor to create the commit message. The other options
shown do not accomplish the required task.

**Example:**

```bash
git commit -m "Initial commit"
```

</details>

---

### Question 40

Compiling software when a developer commits code to a certain branch in a repository is an example of which type of automation?

A. Infrastructure
B. Build
C. Complex
D. DevOps

<details>
<summary style="color: red;">Answer</summary>

B. Build

**Explanation:**
Compiling software when a developer commits code to a certain branch in a repository is an example of build automation. The other options are not accurate descriptions of this type of automation. Build automation is a key component of continuous integration/continuous deployment (CI/CD) scenarios.

</details>

---

### Question 41

You are working with a MySQL database and need to read in several SQL commands from a file and send them into the MySQL CLI for execution. You will be using STDIN redirection for this. Which of the following commands is correct, assuming a filename of customers.sql?

A. mysql < customers.sql
B. mysql | customers.sql
C. mysql > customers.sql
mysql >< customers.sql

<details>
<summary style="color: red;">Answer</summary>

A. mysql < customers.sql

**Explanation:**
In this scenario, STDIN redirection is accomplished with a less-than sign to take the contents of customers.sql and send those contents into the mysql command. It's also likely that the mysql command would have things like -u for the username and -p to prompt for the password, but those were not relevant to the scenario and are not required in all circumstances. The other options shown are not valid for the purpose described. Options B and C take output from the mysql command, while option D is an invalid character sequence.

</details>

---

### Question 42

You are collaborating on a coding project using git as the source code management tool. Teammates are saying that they cannot see your code, although you have been committing code regularly. Which of the following is most likely the problem?

A. You have not added commit messages.
B. You need to send the commit IDs to the teammates.
C. You have not executed git push to send the code to the server.
D. You are committing using the -h flag.

<details>
<summary style="color: red;">Answer</summary>

C. You have not executed git push to send the code to the server.

**Explanation:**
More than likely you have not executed git push to send the code to the server. Of the other options, you do not need to send commit IDs to teammates and there is nothing to indicate that you have been having problems committing the code itself. The -h flag is not a valid flag for the git commit command.

</details>

---

### Question 43

Which option to the chmod command performs a recursive change?

A. -re
B. -R
C. -c
D. -v

<details>
<summary style="color: red;">Answer</summary>

B. -R

**Explanation:**
The -R option performs a recursive change to the targets identified by the chmod command. The other options do not perform recursive changes for chmod.

</details>

---

### Question 44

Which character sequence is used to indicate the default case within a case statement in a Bash script?

A. ()
B. _._
C. \*_
D. _)

<details>
<summary style="color: red;">Answer</summary>

D. \*)

**Explanation:**
The closing parenthesis is used to denote a case; when preceded by an asterisk, the default case is indicated. The other options are not valid for this purpose.

</details>

---

### Question 45

Which character sequence indicates the end of an if conditional in a Bas script?

A. }
B. fi
C. end
D. endif

<details>
<summary style="color: red;">Answer</summary>

B. fi

**Explanation:**
The character sequence fi, which is the if statement backward, indicates the end of an if conditional within a Bash script. The other sequences shown as options may be used in other languages but are not valid for this purpose in a Bash script.

**Example:**

```bash
if [ $USER == "root" ]; then
    echo "You are the root user."
fi
```

</details>

---

### Question 46

What is the name of the default branch in a git repository?

A. source
B. main
C. primary
D. first

<details>
<summary style="color: red;">Answer</summary>

B. main

**Explanation:**
The main branch is the branch created by default within a git repository. The other names shown are not the default branch name.

</details>

---

### Question 47

You need to use the output from a command as input for another command. Which character facilitates this scenario?

A. >
B. |
C. !
D. `

<details>
<summary style="color: red;">Answer</summary>

B. |

**Explanation:**
The pipe character sends, or pipes, the output from one command into another and is commonly used in a Linux environment for creating complex command sequences, whether through scripting or directly on the command line. The other options shown are not used for the purpose described in the scenario.

**Example:**

```bash
ls -l | grep "file"
```

</details>

---

### Question 48

Which git command shows the current state of the working copy of a repository?

A. git list
B. git status
C. git state
D. git view

<details>
<summary style="color: red;">Answer</summary>

B. git status

**Explanation:**
The git status command is used to show the current state of the working copy, displaying things like untracked files, files staged for commit, and so on. The other options shown are not valid for the scenario. The git status command is a common command used in git workflows.

</details>

---

### Question 49

Which option to the echo command suppresses the ending newline character that is normally included?

A. -a
B. -n
C. -d
D. -y

<details>
<summary style="color: red;">Answer</summary>

B. -n

**Explanation:**
The -n option suppresses the ending newline character that is normally included with the echo command and is quite useful in scripting scenarios. The other options shown are not valid for this purpose.

**Example:**

```bash
echo -n "Hello, "
echo "World!"
# Output: Hello, World!
```

</details>

---

### Question 50

Determining the version of software installed on each client node is an example of collecting information for which collection in an automated infrastructure?

A. Inventory
B. Group
C. Procedure
D. Build

<details>
<summary style="color: red;">Answer</summary>

A. Inventory

**Explanation:**
The inventory of an infrastructure contains things like the version of software installed clients. The other options are not accurate descriptions of this type of collection in an automated infrastructure.

</details>

---

### Question 51

You need to redirect STDERR from a command into a file to capture the errors. Which character sequence can be used for this purpose?

A. >
B. %2>
C. 2>
D. %%>

<details>
<summary style="color: red;">Answer</summary>

C. 2>

**Explanation:**
Redirecting STDERR is accomplished with the character sequence 2>. The plain greater-than sign redirects STDOUT. The other greater-than sign redirects STDOUT. The other character sequences shown as options are not valid for the purpose described.

**Example:**

```bash
ls -l /nonexistent 2> errors.txt
```

</details>

---

### Question 52

You need to make a change to your git environment because
your email address has changed. Which of the following commands ensures that your new email address will be used for all subsequent commits?

A. git config user.email
B. git change email
C. git config email.addr
D. git config email.address

<details>
<summary style="color: red;">Answer</summary>

A. git config user.email

**Explanation:**
The git config command will be used for this purpose, and the parameter is user.email.

**Example:**

```bash
git config --global user.email "
```

</details>

---

### Question 53

Which shell built-in command is used to display a list of read only variables?

A. ro
B. readonly
C. env-ro
D. ro-env

<details>
<summary style="color: red;">Answer</summary>

B. readonly

**Explanation:**
The readonly command displays the list of read-only variables
that have been declared in the current session. The other commands listed for this question do not exist. The readonly command is used to declare variables as read-only, meaning that they cannot be changed or unset.

**Example:**

```bash
readonly MY_VAR="This is a read-only variable."
```

</details>

---

### Question 54

Assume that you're using the Bash shell and want to prevent output redirects from accidentally overwriting existing files. Which command and option can be used to invoke this behavior?

A. setoutput -f
B. overwrite=no
C. overwrite -n
D. set -C

<details>
<summary style="color: red;">Answer</summary>

D. set -C

**Explanation:**
The set command can be used for a variety of purposes to change how the shell environment works. One such option is -C, which prevents output redirection such as that done with > from overwriting a file if the file already exists. The other options shown are not valid for this purpose.

</details>

---

### Question 55

You have received a file that does not have a file extension. Which command can you run to help determine what type of file it might be?

A. grep
B. telnet
C. file
D. export

<details>
<summary style="color: red;">Answer</summary>

C. file

**Explanation:**
The file command can be used to determine which type of file is being used. This can be particularly helpful for files without extensions, where you are unsure if you should view the contents of the file. Option A, grep, is used to look within files but would not be helpful in this case. Option B, telnet, is used for remote connections and would not be helpful in this case. Option D, export, is used to add variables to the environment and would not be helpful in this case.

**Example:**

```bash
file my_file
```

</details>

---

### Question 56

Which of the following commands will display the last 50 lines of your command history when using Bash, including commands from the current session?

A. bashhist 50
B. history 50
C. cat .bash_history
D. tail -f .bash_history

<details>
<summary style="color: red;">Answer</summary>

B. history 50

**Explanation:**
The history command will display your command history, including commands from the current session. You can specify how many lines of history to display, as shown in the answer for this question. Note that .bash_history will not show the current session's history. The tail command will display the last lines of a file, but it will not show the command history.

</details>

---

### Question 57

When using Bash, how would you execute the last command starting with a certain string, even if that command was not the last one that you typed?

A. Precede the command with ! and then the string to search for.
B. Search for the command in history and then execute it.
C. Precede the command with a ? and then the string to search for.
D. This is not possible with Bash.

<details>
<summary style="color: red;">Answer</summary>

A. Precede the command with ! and then the string to search for.

**Explanation:**
Preceding the command with a ! will search history and execute the specified command. For example, !vi will start your last Vi session.

**example:**

```bash
!vi
```

</details>

---

### Question 58

Which shell built-in command can be used to determine the location from which a given command will be run?

A. type
B. when
C. find
D. help

<details>
<summary style="color: red;">Answer</summary>

A. type

**Explanation:**
The type built-in command returns the location that the shell will use in order to run the given command. The find command cannot be used for this purpose, and the other commands do not exist.

**Example:**

```bash
type ls
# Output: ls is /bin/ls
```

</details>

---

### Question 59

Which command is used to read and execute commands from a file in the Bash shell?

A. run
B. execute
C. source
D. func

<details>
<summary style="color: red;">Answer</summary>

C. source

**Explanation:**
The source command is used to execute commands from a file. A typical use case is to create functions or variables that are then available for use within the current session. The other commands listed do not exist.

**Example:**

```bash
source myscript.sh
```

</details>

---

### Question 60

You need a command to be executed on logout for all users. Within which file should this be placed (assume all users are using Bash)?

A. ~/.bash_logout
B. /etc/bash.bash_logout
C. /home/.bash_logout
D. /etc/bash_logout

<details>
<summary style="color: red;">Answer</summary>

B. /etc/bash.bash_logout

**Explanation:**
While it's true that every user has a .bash_logout, the file exists in their home directory and therefore can be edited by the user.
Therefore, to ensure that the required command is executed at logout, the file /etc/bash.bash_logout must be used. The other options are not valid for this purpose.

</details>

---

### Question 61

Which of the following commands removes an environment variable that has been set?

A. profile --unset
B. env -u
C. set -u
D. import

<details>
<summary style="color: red;">Answer</summary>

B. env -u

**Explanation:**
The env -u command will unset an environment variable for the current session. The unset command can also be used for this purpose. The other options are not valid for this purpose.

**Example:**

```bash
env -u MY_VAR
```

</details>

---

### Question 62

When setting the shebang line of a shell script, which of the following commands will help to determine the location of the interpreter automatically?

A. #!/usr/bin/env bash
B. #!/bin/bash
C. #!env
D. /bin/int bash

<details>
<summary style="color: red;">Answer</summary>

A. #!/usr/bin/env bash

**Explanation:**
The env command, when used as #!/usr/bin/env bash, will determine the location of the Bash interpreter automatically.
This makes the resulting script more portable for systems where Bash may not be located in /bin/.

</details>

---

### Question 63

Which of the following best describes the PS1 environment variable?

A. PS1 is used to set the location of the PostScript command.
B. PS1 is used to define the default shell prompt for Bash.
C. PS1 is used as per-system variable.
D. PS1 is user-defined and does not have a default value or setting.

<details>
<summary style="color: red;">Answer</summary>

B. PS1 is used to define the default shell prompt for Bash.

**Explanation:**
The PS1 variable usually has its default set in /etc/profile and is used as the shell prompt.
Users can customize the prompt to include hostname, working directory, and other elements.

</details>

---

### Question 64

Which variable within a Bash script is used to access the first command-line parameter?

A. $ARG
B. $0
C. $1
D. $ARGO

<details>
<summary style="color: red;">Answer</summary>

C. $1

**Explanation:**
The $1 variable is automatically available within Bash scripts and represents the first command-line argument.
The $0 variable is the script itself. The other variables listed in this question do not exist by default.

</details>

---

### Question 65

Which of the following commands will print a list of six numbers beginning at 0?

A. list 0-5
B. seq 0 1 5
C. echo 0-5
D. seq 0 1 6

<details>
<summary style="color: red;">Answer</summary>

B. seq 0 1 5

**Explanation:**
The seq command is used to print a sequence of numbers in a variety of formats. The answer for this question provides a starting point (0), an increment (1), and the final
number (5), thus resulting in six numbers being displayed as output. The other options shown are not valid for this purpose.

</details>

---

### Question 66

Which of the following commands will execute a script and then exit the shell?

A. run
B. source
C. ./
D. exec

<details>
<summary style="color: red;">Answer</summary>

D. exec

**Explanation:**
The exec command executes the command given as its argument and will then exit the shell. The source command does not exit the shell.

**Example:**

```bash
exec myscript.sh
```

</details>

---

### Question 67

Which command within a shell script awaits user input and places that input into a variable?

A. exec
B. get
C. read
D. prompt

<details>
<summary style="color: red;">Answer</summary>

C. read

**Explanation:**
The read command awaits user input and places that input into the specified variable. The exec command is used to execute commands, and the other
options are not valid for the purpose described.

**Example:**

```bash
read -p "Enter your name: " name
```

</details>

---

### Question 68

What characters are used to mark sequence of commands as a function within a shell script?

A. Parentheses to declare the function (optional), and curly braces to contain the commands.
B. Curly braces to declare the function, and parentheses to contain the commands.
C. Square brackets to declare the function, and curly braces to contain the commands.
D. Run quotes to denote the function

<details>
<summary style="color: red;">Answer</summary>

A. Parentheses to declare the function (optional), and curly braces to contain the commands.

**Explanation:**
Parentheses are used to denote a function, such as myFunction(). The parentheses are optional but are then
followed by curly braces containing the commands to be executed when the function is called. The other options are not valid for this purpose.

**Example:**

```bash
myFunction() {
    echo "This is a function."
}
```

</details>

---

### Question 69

Which character sequence is used to terminate a case statement in a Bash script?

A. end
B. done
C. esac
D. caseend

<details>
<summary style="color: red;">Answer</summary>

C. esac

**Explanation:**
The sequence esac, which is case spelled backward, is used to indicate that a case statement has ended. Of the other options, the done statement is used for termination
of certain loops in Bash.

**Example:**

```bash
case $1 in
    1)
        echo "One"
        ;;
    2)
        echo "Two"
        ;;
esac
```

</details>

---

### Question 70

Which option to declare displays output in a way that could then be used to another command?

A. -o
B. -n
C. -p
D. -m

<details>
<summary style="color: red;">Answer</summary>

C. -p

**Example:**

```bash
declare -p MY_VAR | grep "MY_VAR"   # Output: declare -x MY_VAR="This is a variable."
```

**Explanation:**
The -p options displays declare statements in a way that the commands are fully qualified and could then be used as input
for another command, through either piping or redirection to a script.

</details>

---

### Question 71

Which characters are used to denote the beginning and end of the test portion of a while loop in a shell script?

A. Parentheses ()
B. Curly braces {}
C. Square brackets []
D. Double quotes ""

<details>
<summary style="color: red;">Answer</summary>

C. Square brackets []

**Explanation:**
Square brackets are used to denote the beginning and end of the test portion of a while loop in a shell script. Other languages generally use parentheses for this purpose.

**Example:**

```bash
while [ $i -lt 10 ]; do
    echo $i
    i=$((i+1))
done
```

</details>

---

### Question 72

When using the test built-in with one argument, what will be the return if its argument is not null?

A. false
B. true
C. unknown
D. -1

<details>
<summary style="color: red;">Answer</summary>

B. true

**Explanation:**
The test built-in will return true and can be used to test for the value existence of a variable not being null. Note that the behavior of the test built-in differs depending
on the number of arguments.

**Example:**

```bash
if [ $MY_VAR ]; then
    echo "MY_VAR is not null."
fi

# Output: MY_VAR is not null.
```

</details>

---

### Question 73

Which environment variable is used when changing directory with the tilde character, such as cd ~?

A. HOMEDIR
B. HOMEPATH
C. HOME
D. MAILPATH

<details>
<summary style="color: red;">Answer</summary>

C. HOME

**Explanation:**
The HOME environment variable, set automatically to the user's home directory, is consulted when the command cd ~ is entered. The other paths beginning with
HOME do not exist by default, and the MAILPATH environment variable shown contains a list of locations where mail is checked when the shell is used interactively.

</details>

---

### Question 74

You would like to examine the entries for a single file through the git commit history. Which command should be used for this purpose, assuming
a filename of nhl_scores.php?

A. git log --history nhl_scores.php
B. git log --follow nhl_scores.php
C. git history nhl_scores.php
D. git commit-history nhl_scores.php

<details>
<summary style="color: red;">Answer</summary>

B. git log --follow nhl_scores.php

**Explanation:**
The git log command will be used for this purpose, with an option of --follow and the filename/path to
follow through history. The other options shown are not valid for this purpose.

**Example:**

```bash
git log --follow nhl_scores.php
```

</details>

---

### Question 75

Which of the following best describes attributes of an inventory within an automated continuous integration/continuous deployment (CI/CD) environment?

A. Parameters such as the client IP address and software versions
B. The number of client nodes
C. The software used on the server for the orchestration
D. The architectural pattern for deployment

<details>
<summary style="color: red;">Answer</summary>

A. Parameters such as the client IP address and software versions

**Explanation:**
Parameters and other facts about the clients are also called attributes in an orchestration environment. The other options are not accurate descriptions of this type of automation.

**Example:**

```bash
# Get the client IP address
echo $SSH_CLIENT

# Get the software version
echo $SHELL
```

</details>

---

### Question 76

Which operator should be used when comparing integers to determine if one is equal to another in a Bash script?

A. -ro
B. ===
C. -eq
D. -fe

<details>
<summary style="color: red;">Answer</summary>

C. -eq

**Explanation:**
The integer comparison -eq is used for comparing integers within Bash scripts.
The other answers are not valid for Bash script comparison.

**Example:**

```bash
if [ $i -eq 10 ]; then
    echo "i is equal to 10."
fi
```

</details>

---

### Question 77

You would like to run several commands in succession but not have the output sent into the next command. Which of the following metacharacters will accomplish this task?

A. &
B. >
C. ;
D. |

<details>
<summary style="color: red;">Answer</summary>

C. ;

**Explanation:**
The semicolon metacharacter chains multiple commands together but does not use the output from one command
as input to the next. If the output needs to be sent into the next command, the pipe character (option D) us used.
A single ampersand places a task in the background, thus making option A incorrect; a greater-than sign redirects standard output, making option B incorrect as well.

**Example:**

```bash
ls -l ; echo "This is a separate command."
```

</details>

---

### Question 78

Which escape sequence is used to denote the alert or bell?

A. \a
B. \b
C. \c
D. \d

<details>
<summary style="color: red;">Answer</summary>

A. \a

**Explanation:**
The \a escape sequence, when used with the echo command, sounds an alert or bell. The \b option is a backspace. The \c option indicates that echo should not produce
any additional output. There is no \d option for echo.

**Example:**

```bash
echo -e "This is an alert: \a"

# Output: This is an alert: (bell sound)
```

</details>

---

### Question 79

Which of the following is a valid variable declaration in a Bash script, setting the variable NUM equal to 1?

A. NUM = 1
B. $NUM=1
C. NUM= 1
D. NUM=1

<details>
<summary style="color: red;">Answer</summary>

D. NUM=1

**Explanation:**
It is important to note that there cannot be any spaces between the variable name and the equal sign. Likewise, there cannot be any spaces between the equal sign and the contents
of the variable. This makes option D the only correct answer.

**Example:**

```bash
NUM=1
```

</details>

---

### Question 80

Which of the following commands will obtain the date in seconds since the epoch and place it into a variable called DATE within a shell script?

A. DATE="$(date +%s)"
B. DATE="date"
C. DATE="$(date)";
D. DATE="$date %s"

<details>
<summary style="color: red;">Answer</summary>

A. DATE="$(date +%s)"

**Explanation:**
The provided answer performs command substitution and places the value from the resulting command into a variable. Note the use of +%s formatting on the date, which then
formats the output as seconds since the epoch, as specified in the question. Option C will provide the date within the DATE variable but will not format it as specified in the question.

**Example:**

```bash
DATE="$(date +%s)"
```

</details>

---

### Question 81

Which sequence is used to mark the beginning and end of the commands to execute within a for loop in a shell script?

A. Curly braces {}
B. The keywords do and done
C. Semicolons ;
D. Tabs

<details>
<summary style="color: red;">Answer</summary>

B. The keywords do and done

**Explanation:**
In shell scripts, the commands to execute begin at the do keyword and end at the done keyword. Other languages generally
use either curly braces or tabs. Semicolons are used to separate commands within a line.

**Example:**

```bash
for i in {1..10}; do
    echo $i
done
```

</details>

---

### Question 82

Which option to the declare command will create a variable that is read-only?

A. -r
B. -ro
C. -p
D. -x

<details>
<summary style="color: red;">Answer</summary>

A. -r

**Explanation:**
The -r option to declare will create or mark the variable as read-only.
The -p option prints output in a format that can be reused.
The -x option declares the variable for export. The -ro option does not exist.

**Example:**

```bash
declare -r MY_VAR="This is a read-only variable."
```

</details>

---

### Question 83

Which environment variable controls the format of dates and times, such as a 12-hour or 24-hour clock?

A. LOCALE_DATE
B. DATE_FORMAT
C. LC_TIME
D. LC_DATE

<details>
<summary style="color: red;">Answer</summary>

C. LC_TIME

**Explanation:**
The LC_TIME environment variable is used to control the display and behavior of the date and time and can be changed to a different
locale in order to achieve the desired display and behavior of date and time formatting. The other options shown for this question do not exist.

**Example:**

```bash
LC_TIME=en_US.UTF-8
```

</details>

---

### Question 84

Which option to netstat displays interface information in a table-like format that might be suitable for use with scripting?

A. -i
B. -r
C. -t
D. -l

<details>
<summary style="color: red;">Answer</summary>

A. -i

**Explanation:**
The -i option shows interface information in a table-like format. This option is used to see information
such as transmit and receive bytes as well as the MTU for the interface and other information. The -r option
shows routes, while -l shows listening sockets. There is no -t option for netstat.

**Example:**

```bash
netstat -i
```

</details>

---

### Question 85

You are running a shell script from within your SSH session. Which key combination can be used to terminate the script?

A. Ctrl+X
B. Ctrl+-
C. Ctrl+C
D. Ctrl+Esc

<details>
<summary style="color: red;">Answer</summary>

C. Ctrl+C

**Explanation:**
The Ctrl+C key combination kills a shell script that you are running interactively. The other key combinations
may have an effect but not within this context or for the desired behavior. Ctrl+C is a common key combination to terminate a running process.

</details>

---

### Question 86

Which of the following conditionals in a Bash script will test if the variable DAY is equal to SUNDAY?

A. if ($DAY == "SUNDAY")
B. if($DAY -eq "SUNDAY")
C. if [ $DAY == "SUNDAY" ]
D. if [ $DAY = "SUNDAY" ]

<details>
<summary style="color: red;">Answer</summary>

C. if [ $DAY == "SUNDAY" ]

**Explanation:**
Shell scripting syntax uses the format shown, with square brackets around the condition to be tested and double equal signs for a string test. Variables are preceded by
a dollar sign as shown. The other options shown are not valid for this purpose.

**Example:**

```bash
if [ $DAY == "SUNDAY" ]; then
    echo "It's Sunday!"
fi
```

</details>

---

### Question 87

Which of the following commands adds ~/code/bin to the path?

A. PATH=~/code/bin:$PATH
B. PATH=/code/bin:$PATH
C. PATH=/home/code/bin:$PATH
D. PATH=PATH:~/code/bin

<details>
<summary style="color: red;">Answer</summary>

A. PATH=~/code/bin:$PATH

**Explanation:**
The syntax for setting the PATH separates the new path with a colon, as shown in the correct option.
A primary difference between teh correct and incorrect options for this question is in how the actual specified path is shown.

**Example:**

```bash
PATH=~/code/bin:$PATH
```

</details>

---

### Question 88

Which option to git merge can be used to attempt to roll back a merge that has conflicts?

A. --rollback
B. --abort
C. --rewind
D. --restart

<details>
<summary style="color: red;">Answer</summary>

B. --abort

**Explanation:**
The --abort option attempts to roll back a problematic merge. The other options shown do not exist as options to the git merge command.

**Example:**

```bash
git merge --abort
```

</details>

---

### Question 89

Which environment variable can be used to change the default path for a new git repository?

A. GIT_DIR
B. GIT_HOME
C. GIT_DEST
D. GIT_LOC

<details>
<summary style="color: red;">Answer</summary>

A. GIT_DIR

**Explanation:**
The GIT_DIR environment variable can be used to change the default location away from the ./.git directory in which a new repository would normally
be created. The other options are not used by git as environment variables.

**Example:**

```bash
GIT_DIR=/path/to/repo
```

</details>

---

### Question 90

Which character sequence is used to add a horizontal tab using echo with a Bash script?

A. \h
B. \t
C. \a
D. \f

<details>
<summary style="color: red;">Answer</summary>

B. \t

**Explanation:**
The \t escape sequence adds a horizontal tab. The other characters may have different meaning and so are not valid for this question. For example, \a is alert or bell.

**Example:**

```bash
echo -e "Hello\tWorld!"
```

</details>

---

### Question 91

You need to exclude a build file, called build.o, from being tracked by git. Which character sequence can be used in the .gitignore file to exclude or ignore
that file in all directories?

A. build.o
B. /build.o
C. \*_/build.o
D. build._

<details>
<summary style="color: red;">Answer</summary>

C. \*\*/build.o

**Explanation:**
The double-asterisk sequence has special meaning and indicates that the file will be ignored in all directories. The other options shown are not valid for this purpose.

**Example:**

```bash
**/build.o
```

</details>

---

### Question 92
