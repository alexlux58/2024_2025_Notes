1. FCC ID Lookups
   The FCC maintains a public database of all certified wireless and electronic devices in the U.S., indexed by FCC ID. Here’s how to make the most of it:

Find the FCC ID on Your Device

It’s often printed on the back of a device, on a label inside battery compartments, or etched into the PCB near the antenna.

Format is typically XXXXYYYYY: the first four characters are the Grantee Code (manufacturer), and the last up to five are the Product Code.

Use the FCC’s Equipment Authorization Search

Go to the FCC OET Equipment Authorization System:
https://apps.fcc.gov/oetcf/eas/reports/GenericSearch.cfm

Enter the full FCC ID (no spaces) in the “FCC ID” field and hit Search.

Navigate the Results

Grantee and Product Info: Manufacturer, address, product name.

Test Reports & RF Exposure: PDF reports of conducted and radiated tests, SAR data.

Internal/External Photos & Circuit Diagrams: Often you’ll get board‐shots and block diagrams—super helpful for reverse‐engineering or debugging.

User Manual: PDF containing operational details, wiring diagrams, pinouts, etc.

Advanced Tips

Bulk Export: You can sometimes script lookups by scraping the XML interface if you have a lot of IDs to process.

Cross‐Reference with ISED/CE: Many devices certified in North America also appear in Canada’s ISED database—useful if you hit a gap in FCC filings.

Why bother?
– Identify the exact RF module inside, so you know voltage rails, pinouts, and protocol support.
– Find compliance test setups to replicate signal‐level tests in your lab.
– Leverage internal photos to map out serial debug headers.

2. UART Hacking with the Bus Pirate
   The Bus Pirate is an awesome Swiss‐Army knife for talking to embedded serial interfaces—especially UART. Here’s a quick‐start:

A. Hardware Setup
Voltage Levels

Ensure the target’s UART is either 3.3 V or 5 V.

On the Bus Pirate, select the matching power rail via the P menu.

Wiring

Bus Pirate Pin Target Signal
MOSI (orange) → RXD (target)
MISO (yellow) → TXD (target)
GND (black) → GND (target)
Optionally, power the target from the Bus Pirate’s 3.3 V or 5 V rail if it’s low current.

B. Enter UART Mode
Connect and Power On

bash
Copy
Edit
screen /dev/ttyUSB0 115200

# or use your favorite serial terminal at 115200 baud, 8N1

Initialize the Bus Pirate
At the HiZ> prompt, type:

nginx
Copy
Edit
m ; mode menu
5 ; select UART mode
1 ; UART speed menu → choose baud (e.g. 115200)
8 ; data bits 8
1 ; stop bits 1
0 ; parity none
y ; enable power to target (if desired)
Check Connection

Anything the target sends on TX should appear in your terminal.

Typing into the terminal should go to the target’s RX pin.

C. Useful Commands in UART Mode
(1) Speed: Change baud on the fly.

(2) Bits: Toggle data bits / parity settings.

(4) Flow: Enable/disable RTS/CTS hardware flow.

(P)ower: Toggle the Bus Pirate’s pull-up resistors or power rail.

D. Capturing & Debugging
Log to a File: In screen, press Ctrl‐A then H to start logging.

Binary Dumps: Use the Bus Pirate’s built-in binary capture:

nginx
Copy
Edit
b ; toggle binary mode
Then all data is hex-encoded—ideal for analyzing non-ASCII protocols.

E. Real‐World Example
Suppose you have a mystery IoT module and want its boot messages:

Wire up RX/TX/GND as above.

Set UART to 115200 8N1.

Reset the module (power‐cycle).

In your terminal, watch the bootloader messages—often you’ll see prompt to interrupt and drop into a console.

Final Tips & Next Steps
Automate Lookups: Write a small Python script with requests + BeautifulSoup to pull FCC PDFs automatically—then parse PDFs for your BOM.

Expand to Other Buses: Bus Pirate also handles I²C, SPI, 1-Wire, JTAG… once you’ve mastered UART, experiment with peripherals.

Safety First: Always double-check voltage levels before connecting. A mis-set power rail on the Bus Pirate can fry your target.
