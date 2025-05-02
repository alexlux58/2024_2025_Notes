# Puppet

## Install instructions:

https://chatgpt.com/c/67798ad8-17f0-8010-8273-2405d2610a32

### Puppet Language (DSL)

#### Resource Declaration

- The resource type that we are managing
- The identifying name of the resource
- Attributes that we want to manage

```puppet
type { 'title':
  attribute => value,
  attribute => value,
  attribute => value,
}
```

#### Example

```puppet
file { '/etc/motd':
  ensure  => file,
  content => "Welcome to Puppet\n",
}
```

### Manifests

- Resource declarations are written in manifests files with .pp extension
- We can use the puppet apply command apply a manifest file
- Resources must be unique, you cannot define two states for the same resource

### Puppet Apply

- Puppet apply is a standalone puppet agent that applies a catalog of resources to the local system
- It doesn't require a puppet master
- It's useful for testing manifests

```bash
puppet apply /path/to/manifest.pp
```

### Puppet Agent

- Puppet agent is a daemon that runs on the client nodes
- It connects to the puppet master to fetch the catalog and apply it to the local system
- It runs every 30 minutes by default

### Puppet Master

- Puppet master is a server that stores the configuration details of the client nodes
- It compiles the catalog and sends it to the agent nodes
- It runs on port 8140 by default

# Classes and Modules

- Classes provide re-usable configuration models
- Singleton
- Model configuration by grouping together resources
- Apply the class to instantiate the configuration

```puppet
class classname {
  # Resources
}
```

- Modules are collections of classes, files, and templates
- Modules are stored in the modulepath
- Modules are used to organize and manage configurations

- We can use the `puppet config print` command to get the modulepath
- A module is installed in <modulepath></modulepath>

/etc/puppetlabs/code/environments/production/modules/{...}

### Example

```puppet
class motd {
  file { '/etc/motd':
    ensure  => file,
    content => "Welcome to Puppet\n",
  }
}
```

### Applying Classes

- To apply a class, use the include keyword

```puppet
include motd
```

# Puppet Agent

- Puppet agent runs as a daemon checking in periodically
- We can trigger a one off puppet run using puppet agent -t
  - -o --onetime: Run once and exit
  - -n --nodaemonize: Run in the foreground
  - -v --verbose: Verbose output
  - -t --test: Run in test mode, implies -onv
  - --noop: Compare catalog but don't apply any changes

# Authentication

- Agent connects to server over authenticated SSL
- Retrieves and applies configuration

# SSL

- Puppet server is a certificate authority (CA)
- The agent generates an SSL signing request (CSR) and sends it to the server
- Server signs and returns to identify hosts
- Agent verifies the server SSL cert contains the certname
- We can use the puppet cert command to manage certificates

# Common SSL Issues

- Clocks out of sync. Running NTP is advised
- Certname mismatch between servers and agents
- Agent has been rebuilt
- To overcome SSL issues, certs must be removed from both the agent and the server

# Facter

- Facter gathers a wide variety of information about the agent node
- Puppet can use these facts to determine how to configure resources
- Easily extendable to add your own facts
- Puppet agent sends facts to the server on every run
- We can use the command facter to view them

# Catalog

- Contains all managed resources and the state they should be in
- Puppet agent uses the RAL to compare running state to catalog
- Changes are enforced where drift is detected

# Classification

- When an authenticated agent checks in, it is classified
- Puppet identifies which classes should be applied
- Catalog is compiled

- Puppet classifies in two ways
- External node classifier (ENC)
  - Enterprise Console
  - Foreman
- Manifest file (site.pp)

# Manifest Based Classification

- We use the node definition to specify classification
- Puppet reads a manifest file called site.pp
- We can use the puppet config command to determine it's location

# Node Definition

node "host1.enviatics.com" {
include webserver
include database
}

**Regex / Wildcard Matching**
node /\*.enviatics.com/ {
include webserver
include database
}

node default {
include webserver
include database
}

**More Resource Types**

# Package

- Ensure absent, installed, latest or a specific version

package { 'ntp':
ensure => installed,
}

package { 'httpd':
ensure => '2.3.3',
}

# Service

- Ensure can be running or stopped
- Enable makes the service start at boot time and can be true or false

service { 'sshd':
ensure => running,
enable => true,
}

- Some applications have non-standard services
- We can override behavior using the following attributes
  - restart, stop, start, status

service { 'tinpot':
ensure => running,
enable => true,
status => '/opt/tinpot/bin/status.sh',
start => '/opt/tinpot/bin/server --start',
stop => '/opt/tinpot/bin/server --stop',
}

# Notify

- Non impacting resource type that causes a notice message to be displayed

notify {'Hello World':}

# Exec

- Execute any arbitrary command
- Not a replacement for a type and provider
- Use sparingly

exec { 'configure app':
path => '/bin:/usr/bin',
command => 'configure.sh',
}

- Not idempotent by default
- Can be made idempotent by using creates, onlyif or unless

exec { 'configure app':
path => '/bin:/usr/bin',
command => 'configure.sh',
creates => '/bin/myapp',
}

# Namevar

- Puppet resource must be unique
- Normally the title of the resource is used as the unique identifier
- Each resource type also has one or more attributes that are namevars
- Resource titles and namevars must be unique
