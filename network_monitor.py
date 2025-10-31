#!/usr/bin/env python3
import speedtest
import psutil
import time
import logging
from datetime import datetime
import socket
import csv
from pathlib import Path

# Set up logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('network_monitor.log'),
        logging.StreamHandler()
    ]
)

def check_connectivity(host="8.8.8.8", port=53, timeout=3):
    """
    Check if there is an internet connection by trying to connect to Google's DNS
    """
    try:
        socket.setdefaulttimeout(timeout)
        socket.socket(socket.AF_INET, socket.SOCK_STREAM).connect((host, port))
        return True
    except socket.error:
        return False

def get_network_speed(light_mode=True):
    """
    Test internet speed using speedtest-cli
    light_mode: If True, uses less data by reducing test length and size
    """
    try:
        st = speedtest.Speedtest(secure=True)
        st.get_best_server()
        
        # Configure for reduced data usage
        if light_mode:
            # Reduce the amount of data used in tests
            download_speed = st.download(threads=1) / 1_000_000  # Use single thread
            upload_speed = st.upload(threads=1, pre_allocate=False) / 1_000_000  # Reduce upload size
        else:
            download_speed = st.download() / 1_000_000
            upload_speed = st.upload() / 1_000_000
            
        # Get ping in ms
        ping = st.results.ping
        
        return {
            'download': round(download_speed, 2),
            'upload': round(upload_speed, 2),
            'ping': round(ping, 2)
        }
    except Exception as e:
        logging.error(f"Speed test failed: {str(e)}")
        return None

def get_wifi_strength():
    """
    Get WiFi signal strength using psutil
    Note: This might not work on all systems
    """
    try:
        # Get network interfaces statistics
        net_if_stats = psutil.net_if_stats()
        
        # Look for wireless interfaces (usually named wlan0 or similar)
        for interface, stats in net_if_stats.items():
            if interface.startswith(('wlan', 'wifi', 'wi-fi')):
                return stats.isup
        return None
    except Exception as e:
        logging.error(f"Failed to get WiFi strength: {str(e)}")
        return None

def save_to_csv(data):
    """
    Save the network data to a CSV file
    """
    csv_file = Path('network_stats.csv')
    is_new_file = not csv_file.exists()
    
    fieldnames = ['timestamp', 'connected', 'download_mbps', 'upload_mbps', 'ping_ms', 'wifi_status']
    
    with open(csv_file, mode='a', newline='') as file:
        writer = csv.DictWriter(file, fieldnames=fieldnames)
        
        if is_new_file:
            writer.writeheader()
        
        writer.writerow(data)

def monitor_network(interval=300, speed_test_interval=3600, light_mode=True):  # Default: check connection every 5 min, speed every hour
    """
    Main monitoring function
    interval: Time between connectivity checks (in seconds)
    speed_test_interval: Time between speed tests (in seconds)
    light_mode: If True, uses less data for speed tests
    """
    logging.info("Starting network monitoring...")
    last_speed_test = 0
    
    while True:
        timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        connected = check_connectivity()
        current_time = time.time()
        
        data = {
            'timestamp': timestamp,
            'connected': connected,
            'download_mbps': None,
            'upload_mbps': None,
            'ping_ms': None,
            'wifi_status': None
        }
        
        if connected:
            # Only run speed test at specified intervals
            if current_time - last_speed_test >= speed_test_interval:
                speed_data = get_network_speed(light_mode=light_mode)
                if speed_data:
                    data.update({
                        'download_mbps': speed_data['download'],
                        'upload_mbps': speed_data['upload'],
                        'ping_ms': speed_data['ping']
                    })
                    last_speed_test = current_time
            
            wifi_strength = get_wifi_strength()
            data['wifi_status'] = wifi_strength
            
            logging.info(
                f"Network Status: Connected | "
                f"Download: {data['download_mbps']} Mbps | "
                f"Upload: {data['upload_mbps']} Mbps | "
                f"Ping: {data['ping_ms']} ms | "
                f"WiFi: {'Up' if wifi_strength else 'Down'}"
            )
        else:
            logging.warning("Network Status: Disconnected")
        
        save_to_csv(data)
        
        time.sleep(interval)

if __name__ == "__main__":
    try:
        # Run with default settings: 
        # - Check connectivity every 5 minutes
        # - Run speed tests every hour
        # - Use light mode for reduced data usage
        monitor_network(
            interval=300,           # 5 minutes
            speed_test_interval=3600,  # 1 hour
            light_mode=True
        )
    except KeyboardInterrupt:
        logging.info("Monitoring stopped by user")
    except Exception as e:
        logging.error(f"Monitoring stopped due to error: {str(e)}")