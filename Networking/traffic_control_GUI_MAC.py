#!/usr/bin/env python3
"""
macOS Network Emulator GUI (using pfctl and dummynet)
Author: Alex Lux

This script provides a Tkinter GUI to configure network emulation on macOS
using pfctl and dummynet for latency, jitter, packet loss, and bandwidth shaping.
"""

import tkinter as tk
from tkinter import ttk, messagebox
import subprocess
import psutil
import os
import platform

# Suppress macOS Tk deprecation warning
os.environ['TK_SILENCE_DEPRECATION'] = '1'


def check_macos():
    """Check if running on macOS."""
    return platform.system() == 'Darwin'


def run_command(cmd):
    """Run a command with subprocess."""
    try:
        result = subprocess.run(cmd, shell=True, check=True,
                                capture_output=True, text=True)
        return True, result.stdout
    except subprocess.CalledProcessError as e:
        return False, f"Command failed: {e.stderr}"
    except Exception as e:
        return False, f"Unexpected error: {e}"


def check_root():
    """Check if running with root privileges."""
    return os.geteuid() == 0


def apply_rules_macos():
    """Apply network emulation rules on macOS using pfctl and dummynet."""
    if not check_root():
        messagebox.showerror("Permission Error",
                             "This script requires root privileges.\n"
                             "Please run with sudo: sudo python3 script.py")
        return

    iface = iface_var.get()
    delay = delay_var.get()
    jitter = jitter_var.get()
    loss = loss_var.get()
    rate = rate_var.get()

    if not iface:
        messagebox.showerror("Error", "Please select a network interface")
        return

    # Clear existing rules
    clear_rules_macos()

    try:
        # Configure dummynet pipe
        pipe_config = []

        if rate > 0:
            pipe_config.append(f"bw {rate}Mbit/s")

        if delay > 0:
            if jitter > 0:
                pipe_config.append(f"delay {delay}ms ± {jitter}ms")
            else:
                pipe_config.append(f"delay {delay}ms")

        if loss > 0:
            pipe_config.append(f"plr {loss/100}")

        if pipe_config:
            # Create dummynet pipe
            pipe_cmd = f"dnctl pipe 1 config {' '.join(pipe_config)}"
            success, output = run_command(pipe_cmd)
            if not success:
                messagebox.showerror(
                    "Error", f"Failed to create pipe:\n{output}")
                return

            # Create pfctl rule to use the pipe
            pf_rule = f"dummynet out on {iface} pipe 1"

            # Write rule to temporary file
            rule_file = "/tmp/pf_netem_rule"
            with open(rule_file, 'w') as f:
                f.write(f"{pf_rule}\n")

            # Load the rule
            success, output = run_command(f"pfctl -f {rule_file}")
            if not success:
                messagebox.showerror(
                    "Error", f"Failed to load pfctl rule:\n{output}")
                return

            # Enable pfctl
            success, output = run_command("pfctl -E")
            if not success and "already enabled" not in output:
                messagebox.showerror(
                    "Error", f"Failed to enable pfctl:\n{output}")
                return

            messagebox.showinfo("Success", f"Rules applied to {iface}")
        else:
            messagebox.showwarning("No Rules", "No rules specified to apply")

    except Exception as e:
        messagebox.showerror("Error", f"Failed to apply rules: {e}")


def clear_rules_macos():
    """Clear network emulation rules on macOS."""
    try:
        # Flush pfctl rules
        run_command("pfctl -F all")
        # Delete dummynet pipes
        run_command("dnctl -f flush")
        return True
    except:
        return False


def apply_rules_simulation():
    """Simulate applying rules for demonstration purposes."""
    iface = iface_var.get()
    delay = delay_var.get()
    jitter = jitter_var.get()
    loss = loss_var.get()
    rate = rate_var.get()

    if not iface:
        messagebox.showerror("Error", "Please select a network interface")
        return

    # Build rule description
    rules = []
    if delay > 0:
        if jitter > 0:
            rules.append(f"Delay: {delay}ms ± {jitter}ms")
        else:
            rules.append(f"Delay: {delay}ms")
    if loss > 0:
        rules.append(f"Loss: {loss}%")
    if rate > 0:
        rules.append(f"Bandwidth: {rate} Mbit/s")

    if rules:
        rule_text = "\n".join(rules)
        messagebox.showinfo("Simulation Mode",
                            f"Would apply to {iface}:\n\n{rule_text}\n\n"
                            f"Note: Running in simulation mode.\n"
                            f"For real network emulation on macOS, run with sudo.")
    else:
        messagebox.showwarning("No Rules", "No rules specified to apply")


def apply_rules():
    """Apply rules based on the operating system and privileges."""
    if not check_macos():
        messagebox.showerror("OS Error",
                             "This macOS version is designed for macOS only.\n"
                             "For Linux, use the original tc-based script.")
        return

    if check_root():
        apply_rules_macos()
    else:
        apply_rules_simulation()


def clear_rules():
    """Clear network emulation rules."""
    iface = iface_var.get()
    if not iface:
        messagebox.showerror("Error", "Please select a network interface")
        return

    if not check_macos():
        messagebox.showerror("OS Error", "This version is for macOS only")
        return

    if check_root():
        if clear_rules_macos():
            messagebox.showinfo("Cleared", f"Rules cleared from {iface}")
        else:
            messagebox.showerror("Error", "Failed to clear some rules")
    else:
        messagebox.showinfo("Simulation", f"Would clear rules from {iface}")


def show_current_rules():
    """Display current network rules."""
    if not check_root():
        messagebox.showinfo("Current Rules",
                            "Simulation mode - no actual rules to display.\n"
                            "Run with sudo to see real rules.")
        return

    try:
        # Show pfctl rules
        success, pf_output = run_command("pfctl -s rules")
        success2, dn_output = run_command("dnctl list")

        output = "PF Rules:\n" + (pf_output if success else "None") + \
            "\n\nDummynet Pipes:\n" + (dn_output if success2 else "None")

        messagebox.showinfo("Current Rules", output)
    except Exception as e:
        messagebox.showerror("Error", f"Failed to get current rules: {e}")


# GUI setup
root = tk.Tk()
root.title("macOS Network Emulator (pfctl/dummynet GUI)")
root.geometry("450x400")

# Main frame
main_frame = ttk.Frame(root, padding="10")
main_frame.grid(row=0, column=0, sticky="nsew")

# Configure grid weights
root.columnconfigure(0, weight=1)
root.rowconfigure(0, weight=1)
main_frame.columnconfigure(1, weight=1)

# Network interfaces (exclude loopback and virtual interfaces)
interfaces = [iface for iface in psutil.net_if_addrs().keys()
              if not iface.startswith(('lo', 'utun', 'awdl', 'llw', 'bridge'))]
iface_var = tk.StringVar(value=interfaces[0] if interfaces else "")

ttk.Label(main_frame, text="Interface:").grid(
    row=0, column=0, sticky="w", pady=2)
iface_menu = ttk.Combobox(
    main_frame, textvariable=iface_var, values=interfaces, state="readonly")
iface_menu.grid(row=0, column=1, sticky="ew", pady=2)

# Input fields
delay_var = tk.IntVar()
jitter_var = tk.IntVar()
loss_var = tk.DoubleVar()
rate_var = tk.IntVar()

fields = [
    ("Delay (ms):", delay_var, "Network delay in milliseconds"),
    ("Jitter (ms):", jitter_var, "Delay variation in milliseconds"),
    ("Loss (%):", loss_var, "Packet loss percentage (0-100)"),
    ("Bandwidth (Mbit/s):", rate_var, "Bandwidth limit in Megabits per second"),
]

for i, (label, var, tooltip) in enumerate(fields, start=1):
    ttk.Label(main_frame, text=label).grid(row=i, column=0, sticky="w", pady=2)
    entry = ttk.Entry(main_frame, textvariable=var, width=20)
    entry.grid(row=i, column=1, sticky="ew", pady=2)

# Button frame
button_frame = ttk.Frame(main_frame)
button_frame.grid(row=5, column=0, columnspan=2, pady=20)

ttk.Button(button_frame, text="Apply Rules",
           command=apply_rules).pack(side=tk.LEFT, padx=5)
ttk.Button(button_frame, text="Clear Rules",
           command=clear_rules).pack(side=tk.LEFT, padx=5)
ttk.Button(button_frame, text="Show Current",
           command=show_current_rules).pack(side=tk.LEFT, padx=5)

# Status information
status_frame = ttk.LabelFrame(main_frame, text="System Status", padding="5")
status_frame.grid(row=6, column=0, columnspan=2, sticky="ew", pady=10)

# System info
os_info = f"OS: {platform.system()} {platform.release()}"
root_info = f"Privileges: {'Root' if check_root() else 'User'}"
mode_info = f"Mode: {'Active' if check_root() else 'Simulation'}"

ttk.Label(status_frame, text=os_info).pack(anchor="w")
ttk.Label(status_frame, text=root_info).pack(anchor="w")
ttk.Label(status_frame, text=mode_info).pack(anchor="w")

# Help text
help_text = """
macOS Network Emulator Usage:
• Run with 'sudo' for actual network emulation
• Without sudo, runs in simulation mode for testing
• Uses pfctl and dummynet (built into macOS)
• Corruption not supported (pfctl limitation)

Examples:
• Slow connection: 100ms delay, 2Mbit bandwidth  
• Unstable network: 50ms delay, 20ms jitter, 1% loss
• High latency: 300ms delay

Note: Changes affect outbound traffic on selected interface.
Use 'Clear Rules' to restore normal network behavior.
"""

help_label = ttk.Label(main_frame, text=help_text, font=("Arial", 8),
                       justify=tk.LEFT, wraplength=400)
help_label.grid(row=7, column=0, columnspan=2, sticky="w", pady=(10, 0))

# Warning for non-root users
if not check_root():
    warning_label = ttk.Label(main_frame,
                              text="⚠️ Running in simulation mode - use 'sudo' for real network emulation",
                              foreground="orange")
    warning_label.grid(row=8, column=0, columnspan=2, pady=5)

root.mainloop()
