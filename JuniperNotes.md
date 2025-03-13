# Static Routes

run show interfaces terse

set interfaces ge-0/0/0 unit 0 family inet address 100.100.100.1/24

set interfaces ge-0/0/0 unit 0 description "Link to R2"

commit and-quit

set interfaces ge-0/0/0.0 family inet address 100.100.100.2/24

set interfaces ge-0/0/0.0 description "Link to R1"

commit and-quit

ping 100.100.100.2
