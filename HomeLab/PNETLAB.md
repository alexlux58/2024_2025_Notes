🌟 PNETLab on Proxmox — Clear Installation Steps

1. Extract OVA
   On your local machine:

bash
Copy
Edit
tar -xvf PNETLab.ova
You’ll get _.vmdk, _.ovf, etc.

2. Copy the VMDK to Proxmox
   From your Mac’s Terminal:

bash
Copy
Edit
scp ~/Desktop/PNETLab-disk1.vmdk root@192.168.4.180:/var/lib/vz/images/
Replace filename & IP as needed.

3. Create a New Empty VM
   In Proxmox GUI:

Click Create VM

Enter ID (e.g., 103) and Name (“PNET”)

OS tab: select “Do not use any media”

Skip the disk or accept dummy default

Assign CPU, RAM, and network (e.g. bridge=vmbr0)

Finish creation

4. Import Disk Using CLI
   SSH into the node:

bash
Copy
Edit
qm importdisk 103 /var/lib/vz/images/PNETLab-disk1.vmdk local-lvm --format qcow2
Proxmox will import as raw into local-lvm storage.

5. Attach the Imported Disk to the VM
   Go to VM 103 → Hardware

Select “Unused Disk 0” and click Add → Hard Disk

Choose:

Bus: SCSI

Storage: local-lvm

Leave defaults (raw format, IO thread checked)

Click Add

6. Remove the Dummy Disk
   In Hardware, identify any original placeholder (e.g. scsi0 sized ~150GB)

Select → Remove to avoid boot conflicts

7. Set Disk as the Boot Device
   Navigate to VM 103 → Options → Boot Order

Check the box next to your attached SCSI disk and move it to the top

Save your changes

CLI alternative:

bash
Copy
Edit
qm set 103 --boot order=scsi0 8. Start the VM
Go to Summary → Start

Open the Console tab and confirm that PNETLab is booting up

🛠️ Optional: Manage Thin Pool
If you saw warnings about over-provisioning, consider:

bash
Copy
Edit
pvscan
lvextend -l +100%FREE pve/data
This expands your LVM-thin pool so you won't hit capacity issues.
Or switch to file-based qcow2 storage if preferred.

🔐 PNETLab Default Login Credentials
When first accessing the web interface (offline mode):

Username: root

Password: pnet
pnetlab.com
+8
pnetlab.com
+8
authen.pnetlab.com
+8
support.versa-networks.com

The UI will prompt if you want Online or Offline mode—just choose your preference (offline doesn’t require registration).

✅ TL;DR
Extract OVA → get .vmdk

SCP it to Proxmox

Create VM (no disk)

qm importdisk it to local-lvm

Attach the imported disk under VM Hardware

Remove placeholder disk

Set correct boot order

Start VM and log in at https://PNET-IP
