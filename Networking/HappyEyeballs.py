import socket
import threading
import time

def happy_eyeballs_connect(host, port, delay=0.25, timeout=5):
    """
    Attempt to connect to a host using Happy Eyeballs v2 (RFC 8305).
    Tries IPv6 first, then IPv4 with a delay.
    
    :param host: Hostname to connect to
    :param port: Port number to connect to
    :param delay: Delay (seconds) between starting IPv6 and IPv4 attempts
    :param timeout: Maximum timeout for any socket attempt
    :return: A connected socket or raises an exception
    """
    addr_info = socket.getaddrinfo(host, port, socket.AF_UNSPEC, socket.SOCK_STREAM)
    
    # Separate IPv6 and IPv4 addresses
    ipv6_addrs = [ai for ai in addr_info if ai[0] == socket.AF_INET6]
    ipv4_addrs = [ai for ai in addr_info if ai[0] == socket.AF_INET]
    
    # Storage for results
    result = {'socket': None, 'error': None}
    lock = threading.Lock()
    
    def try_connect(addr_info_list):
        for family, socktype, proto, canonname, sockaddr in addr_info_list:
            try:
                s = socket.socket(family, socktype, proto)
                s.settimeout(timeout)
                s.connect(sockaddr)
                with lock:
                    if result['socket'] is None:
                        result['socket'] = s
                        return
            except Exception as e:
                with lock:
                    result['error'] = e
    
    # Launch IPv6 first
    t6 = threading.Thread(target=try_connect, args=(ipv6_addrs,))
    t6.start()
    
    # Wait delay before launching IPv4 attempts
    time.sleep(delay)
    t4 = threading.Thread(target=try_connect, args=(ipv4_addrs,))
    t4.start()
    
    # Wait for threads to finish or first connection to succeed
    start = time.time()
    while time.time() - start < timeout:
        with lock:
            if result['socket']:
                # Close other sockets if any
                return result['socket']
        time.sleep(0.05)
    
    # If no connection succeeded
    raise result['error'] if result['error'] else TimeoutError("Happy Eyeballs failed to connect")

# Example usage:
if __name__ == "__main__":
    try:
        s = happy_eyeballs_connect("google.com", 80)
        print("Connected to", s.getpeername())
        s.close()
    except Exception as e:
        print("Connection failed:", e)
