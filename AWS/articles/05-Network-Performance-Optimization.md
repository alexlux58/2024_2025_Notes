---
title: "Network Performance Optimization in AWS: MTU, Jumbo Frames, and Enhanced Networking"
subtitle: "Maximizing Network Throughput and Minimizing Latency in Your VPC"
author: "Alex Lux"
date: "2023-11-24"
image: "/images/network-performance.jpg"
tags: ["AWS", "Network Performance", "MTU", "Jumbo Frames", "Enhanced Networking"]
---

<a href="https://poetic-maamoul-8ea5fe.netlify.app/" target="_blank">Use this link for review flash cards</a>

<br>

<br>

# Network Performance Optimization in AWS: MTU, Jumbo Frames, and Enhanced Networking

Network performance is critical for modern applications, especially those requiring high throughput, low latency, or handling large data transfers. AWS provides several mechanisms to optimize network performance, including jumbo frames, enhanced networking, and various bandwidth optimization techniques. This article explores these capabilities and how to leverage them for optimal network performance.

## Network Performance Fundamentals

Understanding basic network performance metrics is essential:

### Key Metrics

**Bandwidth**: Maximum rate of data transfer over the network, measured in bits per second (bps).

**Latency**: Delay between two points in a network, including:
- Propagation delays for signals to travel across the medium
- Processing delays by network devices

**Jitter**: Variation in inter-packet delays, affecting real-time applications.

**Throughput**: Rate of successful data transfer (measured in bits per second). Affected by:
- Bandwidth
- Latency
- Packet loss

**Packets Per Second (PPS)**: Number of packets processed per second, important for high-frequency applications.

**Maximum Transmission Unit (MTU)**: Largest packet that can be sent over the network without fragmentation.

## Maximum Transmission Unit (MTU) and Jumbo Frames

MTU configuration significantly impacts network performance, especially for applications transferring large amounts of data.

### Standard vs Jumbo Frames

**Standard Frames**: 1500 bytes MTU (default for most networks)

**Jumbo Frames**: Ethernet frames with more than 1500 bytes of payload
- AWS supports 9001 bytes MTU for jumbo frames
- Reduces overhead and increases throughput
- Requires all devices in the network path to support jumbo frames

### Benefits of Jumbo Frames

1. **Reduced Overhead**: Fewer packets mean less header overhead
2. **Increased Throughput**: More data per packet improves efficiency
3. **Lower CPU Usage**: Fewer packets to process reduces CPU load
4. **Better Performance**: Especially beneficial for large data transfers

### Jumbo Frame Support in AWS

**Enabled by Default**: Jumbo frames are enabled in a VPC by default

**Within VPC**: Supports jumbo frames (9001 bytes)

**VPC Endpoints**: MTU 8500 bytes

**Internet Gateway**: Limited to 1500 bytes (standard MTU)

**VPC Peering**:
- Intra-region: Supports jumbo frames (9001 bytes)
- Inter-region: Limited to 1500 bytes

**Direct Connect**: Supports jumbo frames (9001 bytes)

**VPN**:
- Via VGW: MTU 1500 bytes
- Via Transit Gateway: MTU 1500 bytes for Site-to-Site VPN

**Direct Connect via Transit Gateway**: MTU 8500 bytes for VPC attachments

### Important Considerations

**Fragmentation**: Traffic leaving the VPC over IGW or inter-region peering doesn't support jumbo frames. Packets over 1500 bytes are:
- Fragmented (if "Don't Fragment" flag is not set)
- Dropped (if "Don't Fragment" flag is set)

**Path MTU Discovery**: Use to determine the maximum MTU along the network path:
```bash
tracepath amazon.com
```

### Configuring MTU on EC2 Instances

**Check Current MTU**:
```bash
ip link show eth0
```

**Set MTU Value (Linux)**:
```bash
sudo ip link set dev eth0 mtu 9001
```

**Test MTU (macOS/Linux)**:
```bash
ping -D -s 1472 amazon.com
```
- Replace `1472` with values to find MTU limit
- 1472 = 1500 - 28 bytes (IP and ICMP headers)

**MTU Dependencies**:
- MTU depends on instance type
- Defined at the ENI level
- Must be configured on the instance

## Enhanced Networking

Enhanced Networking provides higher bandwidth, higher PPS performance, and consistently lower inter-instance latencies.

### How Enhanced Networking Works

**SR-IOV (Single Root I/O Virtualization)**:
- Method of device virtualization providing higher I/O performance
- Lower CPU utilization
- Allows a single physical NIC to present itself as multiple vNICs

**PCI Passthrough**:
- Enables PCI devices (like ENI) to appear as if physically attached to the guest OS
- Bypasses hypervisor for consistent performance
- Results in low latency, high-rate data transfer (> 1M PPS)

### Network Drivers

Enhanced Networking uses one of two drivers depending on instance type:

**Option 1: Intel 82599 VF Interface**
- Up to 10 Gbps
- Uses `ixgbevf` driver
- Supported on: C3, C4, D2, I2, M4 (excluding m4.16xlarge), and R3

**Option 2: Elastic Network Adapter (ENA)**
- Up to 100 Gbps
- Supported on: C5, C5d, C5n, I3en, M5, M5a, M5n, M5zn, R5, R5a, R5n, R5dn, Z1d, H1, I3, M5d, R5ad, R5d, z1d

### Additional Optimization: DPDK

**Intel Data Plane Development Kit (DPDK)**:
- Set of libraries and drivers for fast packet processing
- Reduces overhead of packet processing inside the Operating System
- Benefits:
  - Lower CPU overhead
  - Low latency due to kernel bypass
  - Predictable packet processing
  - High throughput

**How It Works**:
- Enhanced Networking reduces overhead between instance and hypervisor
- DPDK reduces overhead inside the OS
- Combined, provides maximum performance

### Elastic Fabric Adapter (EFA)

EFA is an ENA with added capabilities for High Performance Computing (HPC) workloads.

**Capabilities**:
- Lower latency and higher throughput for tightly coupled HPC applications
- OS bypass functionality (Linux)
- For Windows instances, acts as standard ENA

**How It Works**:
- HPC applications use MPI to interface with Libfabric API
- Bypasses OS kernel
- Communicates directly with EFA device
- Puts packets on the network with minimal overhead

## Bandwidth Limits

### VPC-Level Limits

- **No VPC-specific limits** on bandwidth
- **No limit** for Internet Gateway
- **No limit** for VPC peering
- **NAT Gateway**: Up to 45 Gbps per gateway (use multiple for higher throughput)

### EC2 Instance Bandwidth Limits

**Intel 82599 VF Interface**:
- 10 Gbps aggregate bandwidth
- 5 Gbps flow-based bandwidth limit

**AWS ENA Driver**:
- 10 Gbps flow limit inside a placement group
- 5 Gbps flow limit outside of a placement group
- Aggregate bandwidth of 100 Gbps with multiple flows within:
  - VPC
  - Peered VPC
  - S3 (using VPC endpoint) in the same region

**Special Note**: AWS P4d instances deployed in UltraClusters supercomputer provide 400 Gbps networking.

## Network Credits

Some instance families use a network I/O credit mechanism for burst performance.

### How Network Credits Work

**Instance Families**: R4, C5, and others

**Mechanism**:
- Most applications don't consistently need high network performance
- Instances accumulate credits during low usage
- Can burst above baseline during peak requirements

**Considerations**:
- Consider accumulated network credits before performance benchmarking
- Credits allow temporary performance above baseline
- Sustained high usage may deplete credits

## Placement Groups and Network Performance

### Cluster Placement Groups

**Definition**: Logical grouping of instances within a single Availability Zone

**Benefits**:
- Low network latency
- High network throughput
- Ideal for distributed applications requiring both

**Use with Jumbo Frames**: Using jumbo frames inside EC2 cluster placement groups provides maximum network throughput

### EBS Optimized Instances

**Impact on Network Performance**:
- EBS is a network drive (not physically attached)
- Uses network to communicate with instances
- EBS I/O affects network performance

**EBS-Optimized Instances**:
- Enable EC2 instances to fully use provisioned IOPS
- Dedicated throughput between EC2 and EBS
- Minimizes contention between EBS I/O and other traffic

## Best Practices for Network Performance

### MTU Configuration

1. **Use Jumbo Frames Within VPC**: Enable 9001 MTU for intra-VPC traffic
2. **Be Cautious with Internet Traffic**: Standard 1500 MTU for internet-bound traffic
3. **Test Path MTU**: Use tracepath to determine optimal MTU
4. **Consider Fragmentation**: Understand when packets will be fragmented

### Enhanced Networking

1. **Enable Enhanced Networking**: Use instance types that support it
2. **Choose Appropriate Driver**: Select ENA for higher bandwidth requirements
3. **Use Placement Groups**: For applications requiring low latency
4. **Consider DPDK**: For applications requiring maximum packet processing performance

### Bandwidth Optimization

1. **Use VPC Endpoints**: Reduce internet bandwidth usage for AWS services
2. **Optimize Data Transfer**: Minimize cross-AZ and cross-region transfers
3. **Use Direct Connect**: For consistent, high-bandwidth connections to on-premises
4. **Monitor Network Usage**: Use CloudWatch to track bandwidth utilization

### High Performance Computing

1. **Use EFA**: For HPC workloads requiring low latency
2. **Cluster Placement Groups**: For tightly coupled applications
3. **Jumbo Frames**: Maximize throughput for large data transfers
4. **Optimize Instance Types**: Choose instances with ENA support

## Monitoring Network Performance

### CloudWatch Metrics

Monitor key network metrics:
- **NetworkIn**: Bytes received by the instance
- **NetworkOut**: Bytes sent by the instance
- **NetworkPacketsIn**: Packets received
- **NetworkPacketsOut**: Packets sent

### Performance Testing

**Bandwidth Testing**:
- Use tools like `iperf3` for bandwidth testing
- Test within VPC and across regions
- Compare jumbo frame vs standard frame performance

**Latency Testing**:
- Use `ping` for basic latency measurement
- Use specialized tools for application-level latency
- Test with and without placement groups

## Conclusion

Network performance optimization in AWS involves understanding and configuring MTU, leveraging enhanced networking capabilities, and choosing the right instance types and configurations. Jumbo frames provide significant benefits for intra-VPC traffic, while enhanced networking and EFA enable high-performance applications.

By understanding these capabilities and applying best practices, you can achieve optimal network performance for your applications. Whether you're running high-throughput data processing, low-latency financial applications, or HPC workloads, AWS provides the tools to maximize network performance.

In the next article, we'll explore VPC monitoring capabilities including Flow Logs, Traffic Mirroring, and Reachability Analyzer. Stay tuned!

