# Ansible Configuration Files

- /etc/ansible/ansible.cfg: Main configuration file for Ansible.

```ansible
[defaults]

log_path = /var/log/ansible.log

library = /etc/ansible/library
module_utils = /etc/ansible/module_utils
remote_tmp = /tmp/.ansible-${USER}

[inventory]
inventory = /etc/ansible/hosts
inventory_ignore_extensions = .bak, .swp, .swx, .swp~
inventory_ignore_patterns = .git, .svn, .hg, .bzr, .tox, .venv, .idea, .vscode
inventory_ignore_files = .gitignore, .gitmodules, .gitattributes, .hgignore, .hgsub, .hgsubstate, .svnignore, .tox.ini, .venv, .idea, .vscode

[privilege_escalation]
become = true
become_method = sudo
become_user = root

[paramiko_connection]

[ssh_connection]
ssh_args = -o ControlMaster=auto -o ControlPersist=60s

[persistent_connections]
control_path_dir = /tmp/ansible-ssh-%%h-%%p-%%r

[colors]
color = true
```

- /etc/ansible/hosts: Default inventory file that lists the managed nodes.
- /etc/ansible/roles: Directory where Ansible roles are stored.
- /etc/ansible/group_vars: Directory for group-specific variables.
- /etc/ansible/host_vars: Directory for host-specific variables.
- /etc/ansible/facts.d: Directory for custom facts scripts.
- /etc/ansible/collections: Directory for Ansible collections.

---

# Ansible Inventory File

- The inventory file defines the hosts and groups of hosts that Ansible manages.

```ini
[webservers]
web1.example.com
web2.example.com

[dbservers]
db1.example.com
db2.example.com

[all:vars]
ansible_user=admin
ansible_ssh_private_key_file=/path/to/private/key
```

```yml
# Example of a YAML inventory file
all:
  hosts:
    web1.example.com:
      ansible_user: admin
      ansible_ssh_private_key_file: /path/to/private/key
    web2.example.com:
      ansible_user: admin
      ansible_ssh_private_key_file: /path/to/private/key
  children:
    webservers:
      hosts: web1.example.com
        web2.example.com
    dbservers:
      hosts: db1.example.com
        db2.example.com
```

# Ansible Inventory Format

- Ansible supports multiple inventory formats, including INI and YAML.
- The INI format uses sections to define groups and hosts, while the YAML format uses a more structured approach with key-value pairs.

# Grouping and Parent-Child Relationships

- Ansible allows you to group hosts into logical collections, making it easier to manage configurations.
- You can define parent-child relationships between groups, allowing for hierarchical organization of hosts.

```ini
[webservers:children]
dbservers

[dbservers]
db1.example.com
db2.example.com

[webservers]
web1.example.com
web2.example.com
```

```yml
# Example of a YAML inventory file with groups and relationships
all:
  children:
    webservers:
      hosts:
        web1.example.com:
          ansible_user: admin
          ansible_ssh_private_key_file: /path/to/private/key
        web2.example.com:
          ansible_user: admin
          ansible_ssh_private_key_file: /path/to/private/key
    dbservers:
      hosts:
        db1.example.com:
          ansible_user: admin
          ansible_ssh_private_key_file: /path/to/private/key
        db2.example.com:
          ansible_user: admin
          ansible_ssh_private_key_file: /path/to/private/key
```

# Ansible Variables

- Ansible allows you to define variables at different levels, including playbook, inventory, and role levels.
- Variables can be defined in the inventory file, playbooks, or in separate files under `group_vars` or `host_vars`.

```yml
# Example of defining variables in a playbook
- name: Install web server
  hosts: webservers
  vars:
    http_port: 80
    max_clients: 200
  tasks:
    - name: Install Apache
      apt:
        name: apache2
        state: present

    - name: Configure Apache
      template:
        src: /path/to/apache.conf.j2
        dest: /etc/apache2/apache2.conf
      notify:
        - restart apache

  handlers:
    - name: restart apache
      service:
        name: apache2
        state: restarted
```

# Variable Types

- Ansible supports different types of variables, including:
  - **Host Variables**: Specific to a host, defined in `host_vars`.
  - **Group Variables**: Shared among hosts in a group, defined in `group_vars`.
  - **Playbook Variables**: Defined within a playbook.
  - **Role Variables**: Defined within a role's `defaults` or `vars` directories.
  - **string Variables**: Simple text values, sequences of chars.
  - **Integer/Number Variables**: Numeric values, used for calculations.
  - **List Variables**: Ordered collections of items (any type), defined using `-`.
  - **Dictionary Variables**: Key-value pairs (any type), defined using `{{}}`.
  - **Boolean Variables**: True/false values, used for conditional logic.
  - **Environment Variables**: Variables set in the environment, accessed using `{{ lookup('env', 'VAR_NAME') }}`.
  - **Facts**: Automatically gathered information about hosts, accessed using `{{ ansible_facts }}`.
  - **Jinja2 Variables**: Variables defined using Jinja2 templating syntax, allowing for dynamic content generation.

```yml
# Example of defining variables in group_vars
# group_vars/webservers.yml
http_port: 80
max_clients: 200
```

# Using variables

- Variables can be used in playbooks, templates, and tasks to make configurations dynamic and reusable.

```yml
# Example of using variables in a playbook to add DNS server to resolv.conf
-
name: Add DNS server to resolv.conf
hosts: localhost
vars:
  dns_server: 10.1.250.10
tasks:
  - lineinfile:
    path: /etc/resolv.conf
    line: "nameserver {{ dns_server }}"
```

# Variable Precedence

- Ansible follows a specific order of precedence for variables, which determines which variable value is used when multiple definitions exist.
- The order of precedence is as follows (from highest to lowest):
  1. Extra vars (command line `-e` option)
  2. Task vars (defined in a task)
  3. Block vars (defined in a block)
  4. Role defaults
  5. Inventory vars
  6. Group vars
  7. Host vars
  8. Play vars
  9. Registered vars

```yml
# Example of variable precedence in a playbook
- name: Example playbook
  hosts: all
  vars:
    my_var: "default value"
  tasks:
    - name: Print my_var
      debug:
        msg: "my_var is {{ my_var }}"
      vars:
        my_var: "task level value" # This will override the default value
```

# Magic Variables

- Ansible provides several "magic" variables that are automatically available in playbooks and templates.
- These variables include:
  - `{{ ansible_hostname }}`: The hostname of the managed node.
  - `{{ ansible_fqdn }}`: The fully qualified domain name of the managed node.
  - `{{ ansible_os_family }}`: The operating system family of the managed node.
  - `{{ ansible_distribution }}`: The distribution name of the managed node.
  - `{{ ansible_distribution_version }}`: The version of the distribution.

```yml
# Example of using magic variables in a playbook
- name: Print magic variables
  hosts: all
  tasks:
    - name: Display hostname and OS family
      debug:
        msg: "Hostname: {{ ansible_hostname }}, OS Family: {{ ansible_os_family }}"
```

# Magic Variable - group_names

- The `{{ group_names }}` magic variable contains a list of all groups that the current host belongs to.
- It is useful for conditional tasks or when you need to apply different configurations based on group membership.

```yml
# Example of using group_names in a playbook
- name: Example playbook using group_names
  hosts: all
  tasks:
    - name: Display group names
      debug:
        msg: "Host {{ inventory_hostname }} belongs to groups: {{ group_names }}"
    - name: Conditional task based on group membership
      debug:
        msg: "This host is part of the webservers group"
      when: "'webservers' in group_names"
```

# Ansible Playbooks

- Playbook - A single YAML file
  - Play - Defines a set of activities (tasks) to be run on hosts
    - Task - An action to be performed on the host
      - Execute a command
      - Run a script
      - Install a package
      - Shutdown/Restart

# list Ansible modules

- Ansible modules are reusable units of code that perform specific tasks.
- They can be used to manage system resources, install software, configure services, and more.

`ansible-doc -l`

- Commonly used Ansible modules include:
  - `apt`: Manages packages using the APT package manager (Debian/Ubuntu).
  - `yum`: Manages packages using the YUM package manager (Red Hat/CentOS).
  - `copy`: Copies files from the control machine to the managed nodes.
  - `template`: Renders Jinja2 templates and copies them to the managed nodes.
  - `service`: Manages services on the managed nodes.
  - `user`: Manages user accounts on the managed nodes.
  - `file`: Manages file properties (permissions, ownership, etc.) on the managed nodes.

# Run Ansible Playbook

- To run an Ansible playbook, use the `ansible-playbook` command followed by the playbook file name.
- `ansible-playbook --help`

# How to verify playbooks in Ansible?

- Check Mode
  - Ansible's "dry run" where no actual changes are made on hosts
  - Allows preview of playbook changes without applying them
  - Use the `--check` option to run a playbook in check mode
- Diff Mode
  - Provides a before-and-after comparison of playbook changes
  - Understand and verify the impact of playbook changes before applying them
  - Utilize the `--diff` option to run a playbook in diff mode

# Why do we need ansible-lint?

- Ansible lint is a command-line tool that performs linting on Ansible playbooks, roles, and collections.
- It checks your code for potential errors, bugs, stylistic errors, and suspicious constructs.
- It's akin to having a seasoned Ansible mentor guiding you, providing valuable insights, and catching issues that might have slipped past your notice.

# Conditionals

- Ansible allows you to use conditionals to control the execution of tasks based on certain conditions.

```yml
# Example of using conditionals in a playbook
- name: Install package if not already installed
  hosts: all
  vars:
    package_name: mypackage
      - name: nginx
        required: true
  tasks:
    - name: Check if package is installed
      ansible.builtin.command: dpkg -l | grep mypackage
      register: package_check
      ignore_errors: true
    when: ansible_os_family == 'Debian' or ansible_os_family == 'RedHat'

    - name: Install {{ item.name}} if not installed
      ansible.builtin.apt:
        name: mypackage
        state: present
      when: package_check.rc != 0 and ansible_os_family == 'Debian'
```

# Modules

- System
  - User
  - Group
  - Hostname
  - IPtables
  - Lvg
  - Make
  - Mount
  - Ping
  - Timezone
  - Systemd
  - Service
- Commands
- Files
- Database
- Cloud
- Windows
- More..
