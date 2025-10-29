#!/usr/bin/env python3
"""
Linux Traffic Control GUI (tc + netem)
Author: Alex Lux

This script provides a Tkinter GUI to configure tc/netem rules for latency,
jitter, packet loss, corruption, and bandwidth shaping.
"""

import tkinter as tk
from tkinter import ttk, messagebox
import subprocess
import psutil  # for listing network interfaces
import os


def run_tc_command(cmd):
    """Run a tc command with subprocess."""
    try:
        # Check if running as root
        if os.geteuid() != 0:
            messagebox.showerror("Permission Error",
                                 "This script requires root privileges.\n"
                                 "Please run with sudo: sudo python3 script.py")
            return False

        result = subprocess.run(cmd, shell=True, check=True,
                                capture_output=True, text=True)
        return True
    except subprocess.CalledProcessError as e:
        messagebox.showerror(
            "Error", f"Command failed:\n{cmd}\n\nError: {e.stderr}")
        return False
    except Exception as e:
        messagebox.showerror("Error", f"Unexpected error: {e}")
        return False


def clear_existing_rules(iface):
    """Clear existing tc rules from interface."""
    # Try to delete root qdisc, ignore errors if none exists
    subprocess.run(f"tc qdisc del dev {iface} root",
                   shell=True, capture_output=True)


def apply_rules():
    """Apply tc netem rules based on GUI input."""
    iface = iface_var.get()
    delay = delay_var.get()
    jitter = jitter_var.get()
    loss = loss_var.get()
    corrupt = corrupt_var.get()
    rate = rate_var.get()

    if not iface:
        messagebox.showerror("Error", "Please select a network interface")
        return

    # Clear existing rules first
    clear_existing_rules(iface)

    # Build netem command
    netem_params = []

    if delay > 0:
        if jitter > 0:
            netem_params.append(f"delay {delay}ms {jitter}ms")
        else:
            netem_params.append(f"delay {delay}ms")

    if loss > 0:
        netem_params.append(f"loss {loss}%")

    if corrupt > 0:
        netem_params.append(f"corrupt {corrupt}%")

    # Apply rules based on what's configured
    if rate > 0 and netem_params:
        # Both bandwidth limiting and netem - use htb + netem
        if not run_tc_command(f"tc qdisc add dev {iface} root handle 1: htb default 30"):
            return
        if not run_tc_command(f"tc class add dev {iface} parent 1: classid 1:1 htb rate {rate}mbit"):
            return
        if not run_tc_command(f"tc class add dev {iface} parent 1:1 classid 1:30 htb rate {rate}mbit"):
            return

        netem_cmd = f"tc qdisc add dev {iface} parent 1:30 handle 30: netem {' '.join(netem_params)}"
        if not run_tc_command(netem_cmd):
            return

    elif rate > 0:
        # Only bandwidth limiting
        if not run_tc_command(f"tc qdisc add dev {iface} root tbf rate {rate}mbit burst 32kbit latency 400ms"):
            return

    elif netem_params:
        # Only netem rules
        netem_cmd = f"tc qdisc add dev {iface} root netem {' '.join(netem_params)}"
        if not run_tc_command(netem_cmd):
            return
    else:
        messagebox.showwarning("No Rules", "No rules specified to apply")
        return

    messagebox.showinfo("Success", f"Rules applied to {iface}")


def clear_rules():
    """Remove all tc rules from interface."""
    iface = iface_var.get()
    if not iface:
        messagebox.showerror("Error", "Please select a network interface")
        return

    clear_existing_rules(iface)
    messagebox.showinfo("Cleared", f"Rules cleared from {iface}")


def show_current_rules():
    """Display current tc rules for the selected interface."""
    iface = iface_var.get()
    if not iface:
        messagebox.showerror("Error", "Please select a network interface")
        return

    try:
        result = subprocess.run(f"tc qdisc show dev {iface}",
                                shell=True, capture_output=True, text=True, check=True)
        if result.stdout.strip():
            messagebox.showinfo(
                "Current Rules", f"Interface {iface}:\n\n{result.stdout}")
        else:
            messagebox.showinfo(
                "Current Rules", f"No tc rules found on {iface}")
    except subprocess.CalledProcessError:
        messagebox.showinfo("Current Rules", f"No tc rules found on {iface}")


def validate_input(var, min_val=0, max_val=None):
    """Validate numeric input."""
    try:
        val = var.get()
        if val < min_val:
            return False
        if max_val is not None and val > max_val:
            return False
        return True
    except:
        return False


# GUI setup
root = tk.Tk()
root.title("Linux Network Emulator (tc GUI)")
root.geometry("400x350")

# Main frame
main_frame = ttk.Frame(root, padding="10")
main_frame.grid(row=0, column=0, sticky="nsew")

# Configure grid weights
root.columnconfigure(0, weight=1)
root.rowconfigure(0, weight=1)
main_frame.columnconfigure(1, weight=1)

# Network interfaces
interfaces = [iface for iface in psutil.net_if_addrs().keys() if iface != 'lo']
iface_var = tk.StringVar(value=interfaces[0] if interfaces else "")

ttk.Label(main_frame, text="Interface:").grid(
    row=0, column=0, sticky="w", pady=2)
iface_menu = ttk.Combobox(
    main_frame, textvariable=iface_var, values=interfaces, state="readonly")
iface_menu.grid(row=0, column=1, sticky="ew", pady=2)

# Input fields with validation
delay_var = tk.IntVar()
jitter_var = tk.IntVar()
loss_var = tk.DoubleVar()
corrupt_var = tk.DoubleVar()
rate_var = tk.IntVar()

fields = [
    ("Delay (ms):", delay_var, "Network delay in milliseconds"),
    ("Jitter (ms):", jitter_var, "Delay variation in milliseconds"),
    ("Loss (%):", loss_var, "Packet loss percentage (0-100)"),
    ("Corruption (%):", corrupt_var, "Packet corruption percentage (0-100)"),
    ("Bandwidth (Mbit/s):", rate_var, "Bandwidth limit in Megabits per second"),
]

for i, (label, var, tooltip) in enumerate(fields, start=1):
    ttk.Label(main_frame, text=label).grid(row=i, column=0, sticky="w", pady=2)
    entry = ttk.Entry(main_frame, textvariable=var, width=20)
    entry.grid(row=i, column=1, sticky="ew", pady=2)

    # Add tooltip (simple implementation)
    def create_tooltip(widget, text):
        def on_enter(event):
            widget.configure(cursor="question_arrow")

        def on_leave(event):
            widget.configure(cursor="")
        widget.bind("<Enter>", on_enter)
        widget.bind("<Leave>", on_leave)

    create_tooltip(entry, tooltip)

# Button frame
button_frame = ttk.Frame(main_frame)
button_frame.grid(row=6, column=0, columnspan=2, pady=20)

ttk.Button(button_frame, text="Apply Rules",
           command=apply_rules).pack(side=tk.LEFT, padx=5)
ttk.Button(button_frame, text="Clear Rules",
           command=clear_rules).pack(side=tk.LEFT, padx=5)
ttk.Button(button_frame, text="Show Current",
           command=show_current_rules).pack(side=tk.LEFT, padx=5)

# Status/Help text
help_text = """
Usage Notes:
• This tool requires root privileges (run with sudo)
• Delay/Jitter: Simulates network latency
• Loss: Percentage of packets to drop
• Corruption: Percentage of packets to corrupt
• Bandwidth: Limits connection speed

Examples:
• Slow connection: 100ms delay, 2Mbit bandwidth
• Unstable network: 50ms delay, 20ms jitter, 1% loss
"""

help_label = ttk.Label(main_frame, text=help_text,
                       font=("Arial", 8), justify=tk.LEFT)
help_label.grid(row=7, column=0, columnspan=2, sticky="w", pady=(10, 0))

# Check if running as root and show warning
if os.geteuid() != 0:
    warning_label = ttk.Label(main_frame,
                              text="⚠️ Warning: Run with 'sudo' for tc commands to work",
                              foreground="red")
    warning_label.grid(row=8, column=0, columnspan=2, pady=5)

root.mainloop()
