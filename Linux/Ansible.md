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
