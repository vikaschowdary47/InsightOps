#!/usr/bin/env python3
import psutil
import time
import json
import requests
import platform
import subprocess

BACKEND = "http://localhost:4000/metrics/receiveMetrics"
CLIENT_ID = "client-aws-123"  # Dynamic: script asks them on install

def get_uptime():
    return time.time() - psutil.boot_time()

def get_disk_usage():
    return {p.mountpoint: psutil.disk_usage(p.mountpoint).percent for p in psutil.disk_partitions()}

while True:
    data = {
        "client_id": CLIENT_ID,
        "cpu_percent": psutil.cpu_percent(),
        "memory_percent": psutil.virtual_memory().percent,
        "disk_percent": get_disk_usage(),
        "uptime_seconds": int(get_uptime()),
        "os": platform.system(),
        "hostname": platform.node(),
        "process_count": len(psutil.pids())
    }
    try:
        print(data)
        requests.post(BACKEND, json=data, timeout=5)
    except:
        pass  # Don’t crash if network down

    time.sleep(10)  # Every 1 minute
