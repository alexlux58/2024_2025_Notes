# Network Technologies

## Well known multicast addresses

| Protocol | IPv4       | IPv6       |
| -------- | ---------- | ---------- |
| EIGRP    | 224.0.0.10 | FF02::A/16 |
| OSPF     | 224.0.0.5  | FF02::5/16 |
| OSPF DR  | 224.0.0.6  | FF02::6/16 |
| RIP      | 224.0.0.9  | FF02::9/16 |
| PIM      | 224.0.0.13 | FF02::D/16 |

## IPv6 Address Types

- Unicast
  - Global Unicast
    - 2000::/3
  - Link-Local
    - FE80::/10
  - Loopback
    - ::1/128
  - Unspecified
    - ::/128
  - Unique Local
    - FC00::/7
    - FD00::/8
  - Embedded IPv4
    - ::/80
- Multicast
  - Assigned
    - FF00::/8
  - Solicited-Node
    - FF02::1:FF00:0000/104
- Anycast
