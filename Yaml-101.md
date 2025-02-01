# A typical Netplan YAML file looks like this:

```yaml
network:
  version: 2
  renderer: <renderer-name>
  ethernets:
    <interface-name>:
      <options>:
  wifis:
    <interface-name>: ...
  bonds:
    <bond-name>: ...
  bridges:
    <bridge-name>: ...
  vlans:
    <vlan-name>: ...
  tunnels:
    <tunnel-name>: ...
```

1.  **`network:`**

    - **`version`**: _(required)_ Currently must be `2`.
    - **`renderer`**: _(optional)_ Specifies the backend for network configuration. Usually `networkd` or `NetworkManager`.
    - **`ethernets:`**, **`wifis:`**, **`bonds:`**, **`bridges:`**, **`vlans:`**, **`tunnels:`**: _(optional)_ Stanzas for different interface types (explained below).

2.  **Interface Sections**\
    Under `ethernets:`, `wifis:`, `bonds:`, `bridges:`, `vlans:`, `tunnels:`, each interface entry has an identifier (`<interface-name>:`) followed by a set of options.

---

## Common Interface Options

These options can appear under _any_ interface type (ethernet, wifi, bond, bridge, vlan, or tunnel) unless otherwise noted:

1.  **`dhcp4`** / **`dhcp6`**

    - Boolean (`true`/`false`) specifying whether the interface should use DHCP for IPv4/IPv6 respectively.

2.  **`addresses`**

    - A list of static addresses (in CIDR notation).
    - Example:

      `addresses:

      - 192.168.1.100/24
      - 2001:db8::123/64`

3.  **`gateway4`** / **`gateway6`**

    - Default gateways (one for IPv4, one for IPv6).

4.  **`nameservers`**

    - **`addresses`**: A list of DNS server IPs.
    - **`search`**: A list of domain search suffixes.
    - Example:

          `nameservers:

      addresses: [8.8.8.8, 8.8.4.4]
      search: [example.com, subdomain.example.com]`

5.  **`routes`**

    - A list of static routes. Each route can have keys like `to`, `via`, `on-link`, `metric`, etc.
    - Example:

      `routes:

      - to: 10.10.10.0/24
        via: 192.168.1.1
        metric: 100`

6.  **`routing-policy`**

    - Defines advanced routing rules. Keys can include `from`, `to`, `table`, `priority`, `mark`, etc.
    - Example:

      `routing-policy:

      - from: 10.100.0.0/24
        table: 100
        priority: 10`

7.  **`link-local`**

    - A list of protocols to use for link-local addressing. Typically `[ ipv6 ]` or an empty list.

8.  **`accept-ra`** (IPv6-specific)

    - Boolean to accept Router Advertisements for IPv6 autoconfiguration.

9.  **`optional`**

    - Boolean indicating if the boot process should wait for this interface to come up.

10. **`match`**

    - Used to match physical interfaces by certain attributes. Common sub-keys:
      - **`name`**: e.g. `en*` to match interfaces that start with `en`
      - **`macaddress`**: match by MAC address

11. **`set-name`**

    - Renames the interface at boot (e.g., rename `enp0s3` to `internal0`).

12. **`wakeonlan`**

    - Boolean to enable or disable Wake-on-LAN for an interface.

13. **`macaddress`**

    - Manually override the MAC address of the interface.

14. **`mtu`**

    - Manually set the Maximum Transmission Unit.

15. **`dhcp4-overrides` / `dhcp6-overrides`**

    - Fine-tune DHCP behavior (e.g., `use-routes: false`, `use-dns: false`, `route-metric: <num>`, etc.).

---

## Ethernet Stanza Example

```yaml
network:
  version: 2
  renderer: networkd
  ethernets:
    enp0s3:
      dhcp4: false
      addresses:
        - 192.168.1.10/24
      gateway4: 192.168.1.1
      nameservers:
        addresses: [8.8.8.8, 1.1.1.1]
      optional: true`
```

---

## Wi-Fi (wifis:) Specific Options

Along with the common options listed above, Wi-Fi interfaces have an extra sub-key:

- **`access-points:`**

  - Each SSID is listed as a key. Under that, you can define:
    - **`password`**: Wi-Fi password
    - **`mode`**: Typically `infrastructure` (client), or `ap` for access point mode
    - **`key-mgmt`**: Encryption/authentication method (e.g., `wpa-psk`)
  - Example:

        `wifis:

    wlan0:
    dhcp4: true
    access-points:
    "MyHomeWiFi":
    password: "supersecret"
    mode: infrastructure
    key-mgmt: wpa-psk`

---

## Bond (bonds:) Specific Options

Bond interfaces aggregate multiple physical interfaces into a single logical interface. Common sub-keys:

- **`interfaces`**: A list of slave interfaces (e.g., `[enp0s3, enp0s4]`).
- **`parameters:`**:
  - **`mode`**: e.g., `balance-rr`, `active-backup`, `802.3ad`, etc.
  - **`mii-monitor-interval`**: Interval in milliseconds for link monitoring.
  - **`lacp-rate`**: For 802.3ad (fast/slow).
  - **`transmit-hash-policy`**: e.g. `layer2+3`, etc.

Example:

`network:
  version: 2
  renderer: networkd
  bonds:
    bond0:
      dhcp4: true
      interfaces:
        - enp0s3
        - enp0s4
      parameters:
        mode: active-backup
        mii-monitor-interval: 100`

---

## Bridge (bridges:) Specific Options

Bridge interfaces group multiple interfaces (often for virtualization or containers):

- **`interfaces`**: A list of interfaces that are part of the bridge.
- **`parameters:`**: Additional bridge-related parameters (e.g., `stp`, `priority`, etc.).
- Otherwise, normal interface config (addresses, routes, etc.) also applies.

Example:

```yaml
network:
  version: 2
  renderer: networkd
  bridges:
    br0:
      addresses: [192.168.1.2/24]
      dhcp4: no
      interfaces:
        - enp0s3
        - enp0s4
      parameters:
        stp: true
        forward-delay: 4`
```

---

## VLAN (vlans:) Specific Options

VLAN interfaces are logical sub-interfaces that tag traffic with a VLAN ID:

- **`id`**: The VLAN ID number.
- **`link`**: The underlying (physical) interface to attach to.
- Normal interface options (addresses, dhcp, etc.) also apply.

Example:

```yaml
network:
  version: 2
  renderer: networkd
  vlans:
    vlan10:
      id: 10
      link: enp0s3
      addresses: [192.168.10.2/24]
      gateway4: 192.168.10.1`
```

---

## Tunnels (tunnels:) Specific Options

Tunnel interfaces can encapsulate traffic (e.g., GRE, IPIP, SIT, WireGuard):

- **`mode`**: Type of tunnel (e.g., `ipip`, `gre`, `sit`, `wireguard` (when netplan supports it), etc.).
- **`local`, `remote`**: Tunnel endpoints.
- **`addresses`**, **`gateway4`**, etc., just like normal interfaces.
- For WireGuard, you have additional keys like `private-key`, `peers`, etc. (though keep in mind version and distro support).

Example (generic IP-in-IP):

```yaml
network:
  version: 2
  renderer: networkd
  tunnels:
    tun0:
      mode: ipip
      local: 203.0.113.1
      remote: 203.0.113.2
      addresses:
        - 10.0.0.1/24`
```

---

## DHCP Overrides Example

You can override certain default DHCP behaviors:

```yaml
eth0:
  dhcp4: true
  dhcp4-overrides:
    use-dns: false
    use-routes: false
    route-metric: 50`
```

Similarly for IPv6 with `dhcp6-overrides:`.

---

## Putting It All Together

A more complex single-file example might combine multiple stanzas:

```yaml
network:
  version: 2
  renderer: networkd
  ethernets:
    enp0s3:
      addresses:
        - 192.168.1.10/24
      gateway4: 192.168.1.1
      nameservers:
        addresses: [8.8.8.8, 8.8.4.4]
      dhcp4: false
      optional: true
  wifis:
    wlan0:
      dhcp4: true
      access-points:
        "HomeWiFi":
          password: "secretpassword"
          mode: infrastructure
          key-mgmt: wpa-psk
  bonds:
    bond0:
      dhcp4: no
      addresses: [10.0.0.2/24]
      interfaces: [enp0s4, enp0s5]
      parameters:
        mode: active-backup
        mii-monitor-interval: 100
  vlans:
    vlan10:
      id: 10
      link: enp0s3
      addresses: [10.10.10.2/24]
  bridges:
    br0:
      dhcp4: yes
      interfaces: [ bond0, vlan10 ]
      parameters:
        stp: true
  tunnels:
    tun0:
      mode: ipip
      local: 203.0.113.1
      remote: 203.0.113.2
      addresses:
        - 10.100.0.1/24
```

---

## Key Points

1.  **Indentation & Spacing:** As with all YAML, indentation is critical.
2.  **`version: 2`** is mandatory in current Netplan releases.
3.  **`renderer`** can be omitted if you're using the system default or specified to enforce `networkd` vs. `NetworkManager`.
4.  **Multiple files:** Netplan will merge multiple `.yaml` files in `/etc/netplan/`. Naming conventions (e.g., `01-netcfg.yaml`, `02-...)` may affect the merge order.

For **the full, official schema** (including details on advanced overrides and rarely used options), **always refer to**:

> **Netplan.io Official Reference**
