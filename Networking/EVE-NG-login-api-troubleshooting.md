# **EVE‑NG Installation & Login Troubleshooting Guide**

This guide covers:

- How to install EVE‑NG on an Ubuntu (or Proxmox) system.
- How to set up the MySQL database and user accounts for EVE‑NG.
- How to troubleshoot common login issues (such as password hash mismatches and "Undefined index: rows" errors).

---

## **Part 1. Installing EVE‑NG**

_Note: Many users install EVE‑NG on a Proxmox Virtual Environment. The following steps outline a typical installation on Ubuntu, which can then be imported into Proxmox if needed._

### **1.1 System Preparation**

1.  **Install Ubuntu 22.04 (or the recommended version)**\
    Ensure you have a fresh Ubuntu install with at least 4 GB RAM (more is recommended for lab environments).

2.  **Update the System:**

    `sudo apt update && sudo apt upgrade -y`

3.  **Install Required Packages:** EVE‑NG depends on several packages such as Apache, PHP, MySQL, and various libraries. For example:

    `sudo apt install apache2 php php-cli php-mysql php-xml php-mbstring libapache2-mod-php mysql-server`

### **1.2 Installing EVE‑NG Community Edition**

1.  **Download and Install EVE‑NG:**\
    Follow the official installation guide from [EVE‑NG's website](https://www.eve-ng.net/) which typically involves running a script or following a series of commands. For example:

    `wget https://www.eve-ng.net/final/iso/eve-ng-community-*.iso`

    _For Proxmox, you can import the provided OVA or convert the ISO into a VM._

2.  **Configure Networking and Storage:**\
    Follow the setup instructions to configure your network interfaces (bridged or NAT, as needed) and allocate enough disk space for labs.

3.  **Complete the Installation:**\
    Once installed, you should be able to access the EVE‑NG web interface at:

    `http://<your-eve-ng-ip>/`

---

## **Part 2. Configuring the MySQL Database for EVE‑NG**

EVE‑NG requires a dedicated MySQL database and user for storing lab configurations and user accounts.

### **2.1 Set Up MySQL Root Access**

If needed, reset your MySQL root password:

1.  **Temporarily disable privilege checking (if locked out):**

    - Edit `/etc/mysql/mysql.conf.d/mysqld.cnf` and add:

      `skip-grant-tables`

    - Restart MySQL:

      `sudo systemctl restart mysql`

    - Connect without a password:

      `mysql -u root`

    - Reset root password:

      `ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'YourNewRootPassword';
FLUSH PRIVILEGES;
EXIT;`

    - Remove `skip-grant-tables` from the config and restart MySQL:

      `sudo nano /etc/mysql/mysql.conf.d/mysqld.cnf  # Remove or comment out skip-grant-tables
sudo systemctl restart mysql`

### **2.2 Create the EVE‑NG Database and User**

1.  **Log in as root:**

    `mysql -u root -p`

2.  **Create the Database:**

    `CREATE DATABASE eve_ng_db;`

    (If it already exists, you'll see an error which can be ignored.)

3.  **Create the Dedicated EVE‑NG User:**

    `CREATE USER 'eve-ng'@'localhost' IDENTIFIED BY 'eve-ng';
GRANT ALL PRIVILEGES ON eve_ng_db.* TO 'eve-ng'@'localhost';
FLUSH PRIVILEGES;
EXIT;`

### **2.3 Set Up the Admin User in the Database**

EVE‑NG's admin account is stored in the `users` table of `eve_ng_db`. Verify the record:

`USE eve_ng_db;
SELECT * FROM users WHERE username='admin';`

- If the `admin` row exists, note the password field.
- If it doesn't exist, you might need to insert it according to your EVE‑NG version's requirements.

---

## **Part 3. Troubleshooting Login Issues**

### **3.1 The Problem: Password Hash Mismatch**

- **Issue:** The EVE‑NG API code hashes the entered password using SHA‑256:

  `$hash = hash('sha256', $p['password']);`

- **Mismatch:** If the database stored a plain text password or an MD5 hash, the comparison fails, and the query returns no rows. This causes the "Undefined index: rows" error in the authentication code.

### **3.2 The Fix: Store the Correct SHA‑256 Hash**

1.  **Decide on a Password:** For example, use "eve".
2.  **Update the Admin Password in MySQL:**

    `USE eve_ng_db;
UPDATE users
SET password = SHA2('eve', 256)
WHERE username = 'admin';`

3.  **Verify the Change:**

    `SELECT username, password FROM users WHERE username='admin';`

    You should see a 64‑character hexadecimal string (the SHA‑256 hash).

### **3.3 Resolving "Undefined index: rows"**

In the file `/opt/unetlab/html/includes/api_authentication.php`, the code checks:

`if ($result['rows'] == 0) {
    // Error: User/Password does not match
}`

Since the query alias is defined as `urows` in:

`SELECT COUNT(*) as urows FROM users WHERE username = :username AND password = :password;`

you need to update the code to check `urows` instead:

- **Edit the file:**

  `sudo nano /opt/unetlab/html/includes/api_authentication.php`

- **Replace the condition:** Change:

  `} else if ($result['rows'] == 0) {`

  to:

  `} else if ($result['urows'] == 0) {`

- **Save the file.**

### **3.4 Final Steps: Fix Permissions and Reboot**

After making changes, run:

`/opt/unetlab/wrappers/unl_wrapper -a fixpermissions
sudo reboot`

Then test the web interface again:

1.  **Open your browser** and navigate to:

    `http://<your-eve-ng-ip>/`

2.  **Log in** using:
    - **Username:** admin
    - **Password:** eve\
      (The API will hash "eve" and compare it with the stored SHA‑256 hash.)

---

## **Summary of Commands**

1.  **MySQL Root & DB Setup:**

    `sudo systemctl restart mysql
mysql -u root -p`

    `CREATE DATABASE eve_ng_db;
CREATE USER 'eve-ng'@'localhost' IDENTIFIED BY 'eve-ng';
GRANT ALL PRIVILEGES ON eve_ng_db.* TO 'eve-ng'@'localhost';
FLUSH PRIVILEGES;`

2.  **Admin User Password (SHA‑256):**

    `USE eve_ng_db;
UPDATE users
SET password = SHA2('eve', 256)
WHERE username = 'admin';`

3.  **Fix API Authentication Code (if necessary):** Edit `/opt/unetlab/html/includes/api_authentication.php` and change:

    `} else if ($result['rows'] == 0) {`

    to:

    `} else if ($result['urows'] == 0) {`

4.  **Run Permission Fix & Reboot:**

    `/opt/unetlab/wrappers/unl_wrapper -a fixpermissions
sudo reboot`

5.  **Test Login:** Open browser → `http://<your-eve-ng-ip>/` → log in as `admin` with password `eve`.

---

## **Conclusion**

**What Happened:**

- EVE‑NG's login API hashes passwords using SHA‑256.
- The database initially stored an incorrect password format (plain text or MD5), so the login query returned no rows---triggering an "Undefined index: rows" error.

**How It Was Fixed:**

- We updated the admin user's password to store the SHA‑256 hash using `UPDATE users SET password = SHA2('eve', 256) ...`.
- We corrected the API authentication code (if needed) to reference the correct alias (`urows`).
- After fixing file permissions and rebooting, the web interface was able to successfully validate login credentials.

By following these steps, your EVE‑NG installation is now fully operational. This guide should help anyone who runs into similar issues with database setup and login errors in EVE‑NG.

Happy labbing, and feel free to refer back to this article if you run into trouble in the future!
