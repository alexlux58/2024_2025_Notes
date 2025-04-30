What is circusctl?
circusctl is a command-line interface (CLI) tool used to control and manage the Circus daemon, a process and socket manager built with ZeroMQ (Zero Message Queue). Circus is designed to run, monitor, and manage multiple processes and sockets, simplifying web stack process management. The circusctl tool acts as a front-end to interact with the Circus daemon (circusd), allowing administrators to perform actions such as starting, stopping, scaling, or monitoring processes and watchers (groups of processes managed by Circus).

Key Features of circusctl
Control the Circus daemon: Start, stop, or restart the daemon or specific processes.
Manage watchers: List, add, remove, or scale watchers (e.g., increase/decrease the number of worker processes).
Monitor system status: Retrieve real-time information about running processes.
ZeroMQ-based communication: circusctl is a ZeroMQ client that sends JSON-formatted commands to the Circus daemon.
Interactive shell: Provides an interactive mode for issuing multiple commands.
Extensibility: Can be used programmatically by writing custom ZeroMQ clients.
How to Use circusctl
To use circusctl, you need to have Circus installed and a running circusd daemon. Circus is typically installed in a Python virtual environment, and circusctl is available as a command-line tool after installation.

Prerequisites
Install Circus:

virtualenv /tmp/circus
cd /tmp/circus
source bin/activate
pip install circus circus-web chaussette
This installs Circus, the web dashboard (circus-web), and chaussette (a WSGI server for testing).
Set up a Circus configuration file (circus.ini): Create a configuration file to define watchers and sockets. Example:
ini

Copy
[circus]
statsd = 1
httpd = 1

[watcher:webapp]
cmd = bin/chaussette --fd $(circus.sockets.web)
numprocesses = 3
use_sockets = True

[socket:web]
host = 127.0.0.1
port = 9999
This configures Circus to manage a WSGI application with three worker processes listening on port 9999.
Start the Circus daemon:

circusd circus.ini
Basic Usage
The general syntax for circusctl is:

circusctl [options] command [args]
Common Options:

--endpoint: Specify the ZeroMQ endpoint (default: tcp://127.0.0.1:5555 or set via CIRCUSCTL_ENDPOINT environment variable).
--timeout: Set connection timeout (e.g., --timeout 5 for 5 seconds).
--json: Output results in JSON format.
--prettify: Pretty-print JSON output.
--ssh: Connect via SSH (e.g., user@host:port).
--version: Display Circus version and exit.
-h, --help: Show help message.
Common Commands:

start: Start a watcher or the entire Circus system.
stop: Stop a watcher or the system.
restart: Restart a watcher or the system.
list: List all watchers or processes.
incr: Increase the number of processes for a watcher.
decr: Decrease the number of processes for a watcher.
quit: Shut down the Circus daemon.
status: Check the status of watchers or processes.
Interactive Mode
Run circusctl without a command to enter an interactive shell:

circusctl
This opens a prompt (circusctl) where you can issue commands sequentially. Exit with Ctrl+D.

Examples of circusctl Usage
Below are practical examples based on a Circus setup managing a WSGI application (webapp) as defined in the circus.ini above.

List all watchers:

circusctl list
Output:

webapp
This shows the webapp watcher is running.
List processes for a specific watcher:

circusctl list webapp
Output:

13712,13713,13714
This lists the process IDs (PIDs) of the three worker processes for webapp.
Increase the number of processes:

circusctl incr webapp 4
Output:

ok
Verify the change:

circusctl list webapp
Output:

13712,13713,13714,13973
The webapp watcher now has four processes.
Decrease the number of processes:

circusctl decr webapp 1
Output:

ok
Verify:

circusctl list webapp
Output:

13712,13713,13714
The webapp watcher is back to three processes.
Check the status of all watchers:

circusctl status
Output:

webapp: active
This confirms the webapp watcher is running.
Stop a watcher:

circusctl stop webapp
Output:

ok
Verify:

circusctl status
Output:

webapp: stopped
Start a watcher:

circusctl start webapp
Output:

ok
Verify:

circusctl status
Output:

webapp: active
Restart a watcher:

circusctl restart webapp
Output:

ok
This restarts all processes in the webapp watcher.
Shut down the Circus daemon:

circusctl quit
Output:

ok
This stops the Circus daemon and all managed processes.
Using JSON output:

circusctl --json list webapp
Output:

{"status": "ok", "pids": [13712, 13713, 13714], "time": 1697051234.567}
This returns the process list in JSON format.
Interactive shell example:

circusctl
At the (circusctl) prompt:

(circusctl) list
webapp
(circusctl) incr webapp 2
ok
(circusctl) list webapp
13712,13713,13714,13973,13974
Exit with Ctrl+D.
Specifying a custom endpoint: If the Circus daemon is running on a non-default endpoint:

circusctl --endpoint tcp://127.0.0.1:5556 status
This connects to the daemon at the specified endpoint.
Additional Tools
circus-top: A top-like console to monitor CPU and memory usage of Circus-managed processes in real-time. Run:

circus-top
Press Ctrl+C to exit.
circus-web: A web dashboard for monitoring and managing Circus. Enable it in circus.ini and access it via a browser (e.g., http://localhost:8080). Install with:

pip install circus-web
Notes
Error Handling: If a command times out, check the --endpoint or ensure the Circus daemon is running. Timeout errors often indicate connectivity issues or a slow daemon response.
Environment Variable: Set CIRCUSCTL_ENDPOINT to avoid specifying --endpoint repeatedly:

export CIRCUSCTL_ENDPOINT=tcp://127.0.0.1:5555
Programmatic Control: Since circusctl is a ZeroMQ client, you can write custom scripts to interact with Circus using ZeroMQ libraries, sending JSON messages to the daemon.
Sources
Circus documentation:
Ubuntu Manpage:
GitHub Circus repository:
For more details, refer to the official Circus documentation at https://circus.readthedocs.io/ or the GitHub repository at https://github.com/circus-tent/circus.
