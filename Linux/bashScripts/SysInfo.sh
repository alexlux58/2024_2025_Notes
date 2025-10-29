#!/bin/bash
# sysinfo.sh - Quick System Information Script
# Author: Alex's SysAdmin Toolkit

echo "=============================="
echo "   System Information Report"
echo "=============================="
echo "Hostname       : $(hostname)"
echo "OS Version     : $(cat /etc/*release | grep PRETTY_NAME | cut -d= -f2- | tr -d '\"')"
echo "Kernel Version : $(uname -r)"
echo "Uptime         : $(uptime -p)"
echo

echo "=== CPU Info ==="
lscpu | egrep 'Model name|Socket|Thread|Core|CPU\(s\)'
echo

echo "=== Memory Usage ==="
free -h
echo

echo "=== Disk Usage ==="
df -hT | grep -E '^Filesystem|/dev/'
echo

echo "=== Top 5 Memory-Hungry Processes ==="
ps -eo pid,ppid,cmd,%mem,%cpu --sort=-%mem | head -n 6
echo

echo "=== Network Interfaces ==="
ip -brief addr
echo

echo "=== Default Gateway ==="
ip route | grep default
echo

echo "=== Listening Ports ==="
ss -tulpn | grep LISTEN
echo

echo "=== Failed SSH Logins ==="
grep "Failed password" /var/log/auth.log 2>/dev/null | tail -n 10
echo

echo "=== Sudo Users ==="
getent group sudo | awk -F: '{print $4}'
echo

echo "=== Recent Logins ==="
last -n 5
echo

echo "=== Largest Files (>500MB) ==="
find / -type f -size +500M -exec du -h {} + 2>/dev/null | sort -hr | head -n 10
echo

echo "=== Done ==="
