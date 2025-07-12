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
