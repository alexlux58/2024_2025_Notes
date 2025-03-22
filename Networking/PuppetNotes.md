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
