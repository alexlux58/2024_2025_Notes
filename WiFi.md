# WiFi

# 802.11 RF Bands & Channels

## 5GHz UNII Band (Unlicensed)

- **U-NII**: Unlicensed National Information Infrastructure bands
- Used by **802.11a**, **802.11n**, and **802.11ac** standards
- Subdivided into 4 bands: **UNII-1**, **UNII-2**, **UNII-2-Ex**, **UNII-3**
- Each channel is **20MHz wide** and **5MHz apart**
- **23 non-overlapping channels** compared to **3 non-overlapping channels** in **2.4GHz**

---

## Standards, Bands, and Data Rates

| Standard     | Band        | Data Rate        |
| ------------ | ----------- | ---------------- |
| **802.11**   | 2.4GHz      | 1Mbps–2Mbps      |
| **802.11b**  | 2.4GHz      | 5.5Mbps–11Mbps   |
| **802.11g**  | 2.4GHz      | 6Mbps–54Mbps     |
| **802.11a**  | 5GHz        | 6Mbps–54Mbps     |
| **802.11n**  | 2.4GHz–5GHz | 72Mbps–450Mbps   |
| **802.11ac** | 5GHz        | 200Mbps–1.73Gbps |
| **802.11ax** | 2.4GHz–5GHz | 143Mbps–2.4Gbps  |

---

## UNII Band Channels and Frequencies

| Channel | Frequency (GHz) | Band      |
| ------- | --------------- | --------- |
| 36      | 5.180           | UNII-1    |
| 40      | 5.200           | UNII-1    |
| 44      | 5.220           | UNII-1    |
| 48      | 5.240           | UNII-1    |
| 52      | 5.260           | UNII-2    |
| 56      | 5.280           | UNII-2    |
| 60      | 5.300           | UNII-2    |
| 64      | 5.320           | UNII-2    |
| 100     | 5.500           | UNII-2-Ex |
| 104     | 5.520           | UNII-2-Ex |
| 108     | 5.540           | UNII-2-Ex |
| 112     | 5.560           | UNII-2-Ex |
| 116     | 5.580           | UNII-2-Ex |
| 120     | 5.600           | UNII-2-Ex |
| 124     | 5.620           | UNII-2-Ex |
| 128     | 5.640           | UNII-2-Ex |
| 132     | 5.660           | UNII-2-Ex |
| 136     | 5.680           | UNII-2-Ex |
| 140     | 5.700           | UNII-2-Ex |
| 149     | 5.745           | UNII-3    |
| 153     | 5.765           | UNII-3    |
| 157     | 5.785           | UNII-3    |
| 161     | 5.805           | UNII-3    |

---

# 802.11 Standards

802.11i: Security enhancements for 802.11 networks
802.11e: Quality of Service (QoS) enhancements for 802.11 networks
802.11r: Fast roaming for 802.11 networks
802.11w: Protected Management Frames (PMF) for 802.11 networks
802.11s: Mesh networking for 802.11 networks
802.11u: Interworking with non-802.11 networks
802.11v: Wireless network management enhancements for 802.11 networks
802.11k: Radio resource measurement enhancements for 802.11 networks
802.11z: Extensions to Direct Link Setup (DLS) for 802.11 networks
802.11y: 3650-3700 MHz Operation in the U.S.
802.11ad: Very High Throughput (VHT) in the 60 GHz band
802.11ah: Sub 1 GHz operation
802.11ai: Fast Initial Link Setup (FILS)
802.11aj: China Millimeter Wave (45 GHz) operation
802.11aq: Pre-association discovery
802.11ax: High-efficiency WLAN (HEW)
802.11ay: Next-generation 60 GHz operation
802.11az: Next-generation location
802.11ba: Wake-up radio
802.11bb: Light Communications
802.11bc: WLAN operation in the 6 GHz band
802.11bd: WLAN operation in the 7 GHz band
802.11be: WLAN operation in the 60 GHz band
802.11bf: WLAN operation in the 5 GHz band
802.11bg: WLAN operation in the 60 GHz band

---

# 802.11 Frame Types

- **Management Frames**: Used to establish and manage communication between devices. Advertises a BSS (Basic Service Set) and provides authentication and association, manage clients as they join or leave the BSS.

  - **Beacon Frames**: Sent by an AP to announce its presence and provide information about the network. Contains information about the SSID, supported data rates, and other information about the network. Broadcast frame sent by AP, different beacon for each SSID.
  - **Probe Request Frames**: Sent by a client to request information from an AP. Sent by a client to discover available networks. Broadcast frame sent by Wireless device,
    in return AP sends Probe Response frame (type of beacon).
  - **Authentication and Deauthentication**: Used to authenticate and deauthenticate devices from the network. Authentication frames are used to authenticate a device to the network, while deauthentication frames are used to disconnect a device from the network.
  - **Association and Disassociation**: Association request and response frames are used to establish a connection between a client and an AP. Disassociation frames are used to disconnect a client from the network.

- **Control Frames**: Used to manage the communication between devices. Control frames are used to acknowledge the receipt of data frames, request retransmission of lost frames, and manage the flow of data between devices. Contains frame header information only and no data payload.

  - **Request to Send (RTS) and Clear to Send (CTS)**: Used to manage the flow of data between devices. RTS frames are sent by a device to request permission to send data, while CTS frames are sent by the receiving device to grant permission to send data. Used to avoid collisions in wireless networks.
  - **Acknowledgement (ACK)**: Sent by the receiving device to acknowledge the receipt of a data frame. Used to confirm that the data frame was received successfully.
  - **Block Acknowledgement (Block ACK)**: Used to acknowledge the receipt of multiple data frames. Allows the receiving device to acknowledge the receipt of multiple data frames with a single frame.

- **Data Frames**: Used to carry the actual data being transmitted between devices. Data frames contain the data payload and are used to carry higher-layer data between devices.

# 802.11 Frame Format

---

## 802.3 Frame Format (Ethernet -> Wired Communication)

| Field                          | Size          |
| ------------------------------ | ------------- |
| **Preamble**                   | 8 bytes       |
| **Destination Address**        | 6 bytes       |
| **Source Address**             | 6 bytes       |
| **Type**                       | 2 bytes       |
| **Data**                       | 45–1500 bytes |
| **FCS (Frame Check Sequence)** | 4 bytes       |

---

## 802.11 Frame Format

| Field                          | Size         |
| ------------------------------ | ------------ |
| **Frame Control**              | 2 bytes      |
| **Duration/ID**                | 2 bytes      |
| **Address 1**                  | 6 bytes      |
| **Address 2**                  | 6 bytes      |
| **Address 3**                  | 6 bytes      |
| **Sequence Control**           | 2 bytes      |
| **Address 4**                  | 6 bytes      |
| **Data**                       | 0–2312 bytes |
| **FCS (Frame Check Sequence)** | 4 bytes      |

---

### Frame Control Subfields

| Field                | Size   |
| -------------------- | ------ |
| **Protocol Version** | 2 bits |
| **Type**             | 2 bits |
| **SubType**          | 4 bits |
| **To DS**            | 1 bit  |
| **From DS**          | 1 bit  |
| **More Flag**        | 1 bit  |
| **Retry**            | 1 bit  |
| **Power Management** | 1 bit  |
| **More Data**        | 1 bit  |
| **WEP**              | 1 bit  |
| **Order**            | 1 bit  |

In IEEE 802.11 (Wi-Fi) networks, **To DS** and **From DS** are two single-bit flags in the MAC header that indicate the direction of data flow relative to the **Distribution System (DS)** (i.e., the access point and its associated wired/wireless backbone). They help stations and access points determine how to handle and forward each frame. Here's a quick summary:

1.  **To DS bit** (short for "To Distribution System")

    - **Set to 1** when a station is sending a frame toward the DS (i.e., toward the AP or through the AP to another station on the network).
    - **Set to 0** when a frame is _not_ being sent toward the DS (e.g., in ad hoc or when a frame is coming from the DS).

2.  **From DS bit** (short for "From Distribution System")

    - **Set to 1** when a frame is coming _from_ the DS (i.e., from the AP).
    - **Set to 0** when a frame is not coming from the DS (again, typical in ad hoc, or when the frame is going to the DS instead).

### Common Combinations

- **To DS = 0, From DS = 0**\
  Frames in an ad hoc network (IBSS) or control/management frames that do not traverse an AP.

- **To DS = 1, From DS = 0**\
  Frames going from a station to the AP (into the DS).

- **To DS = 0, From DS = 1**\
  Frames going from the AP (DS) to a station.

- **To DS = 1, From DS = 1**\
  Typically used in "wireless distribution system" or bridging scenarios, where frames may transit from one AP to another AP wirelessly.

By examining these bits, devices can figure out how to process and forward the frames accordingly---whether it needs to be handed off to another station within the same BSS (Basic Service Set), relayed to another AP, or passed onto a wired network segment.

# RF Antenna

## Antenna

- Passive device that radiates or receives electromagnetic waves
- Does not amplify RF signals
- Adds gain to the signal by diverting / shaping the RF signal in a particular direction
- Types: Omnidirectional, Directional, Yagi, Parabolic, Patch, Dipole, etc.

## Antenna Gain

- How effectively antenna focus RF energy in a particular direction.
- Also known as comparison of one antenna against an isotropic antenna.
- Measured in dBi (decibel isotropic)
- Higher the dBi, more focused the RF energy in a particular direction

## Isotropic Antenna

- Radiates equal RF signals in all direction and has 0 gain.
- Does not exist because it is ideal and impossible to construct.
