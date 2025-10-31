# Network Monitor

A Python-based network monitoring tool that tracks internet connectivity, speed, and performance metrics over time. The tool performs periodic connectivity checks and speed tests while saving the data in both CSV format and detailed logs.

### Features

- Periodic internet connectivity checks
- Speed tests (download/upload speeds and ping)
- WiFi status monitoring
- Data-saving "light mode" for metered connections
- CSV data export for analysis
- Detailed logging
- Configurable test intervals

### Requirements

- Python 3.x
- Virtual environment (venv)
- Required packages:
  - speedtest-cli
  - psutil

### Installation

1. Create and activate a virtual environment:
```bash
python -m venv .venv
source .venv/bin/activate  # On Linux/Mac
# or
.venv\Scripts\activate     # On Windows
```

2. Install required packages:
```bash
pip install speedtest-cli psutil
```

### Usage

Basic usage with default settings:
```bash
python network_monitor.py
```

#### Command Line Options

The script supports several command-line arguments to customize its behavior:

```bash
python network_monitor.py [-h] [-i INTERVAL] [-s SPEED_INTERVAL] [--no-light-mode]
```

Options:
- `-h, --help`: Show help message
- `-i INTERVAL, --interval INTERVAL`: Time between connectivity checks in seconds (default: 300)
- `-s SPEED_INTERVAL, --speed-interval SPEED_INTERVAL`: Time between speed tests in seconds (default: 3600)
- `--no-light-mode`: Disable light mode (uses more data but potentially more accurate)

#### Examples

1. Check connectivity every minute:
```bash
python network_monitor.py -i 60
```

2. Run speed tests every 4 hours:
```bash
python network_monitor.py -s 14400
```

3. Run with full speed tests (disable light mode):
```bash
python network_monitor.py --no-light-mode
```

4. Combine multiple options:
```bash
python network_monitor.py -i 120 -s 7200 --no-light-mode
```

### Output Files

The script generates two types of output files:

1. `network_stats.csv`: Contains all measurements in CSV format with columns:
   - timestamp
   - connected
   - download_mbps
   - upload_mbps
   - ping_ms
   - wifi_status

2. `network_monitor.log`: Detailed log file with readable formatted output

### Data Usage Considerations

The script includes a "light mode" (enabled by default) to minimize data usage on metered connections:

- Light mode enabled: ~20-30 MB per speed test
- Light mode disabled: ~100-200 MB per speed test

To calculate approximate daily data usage:
```
Daily Usage = (Speed test size) × (24 hours ÷ Speed test interval in hours)
```

Example with default settings (light mode, hourly tests):
```
Daily Usage = 25 MB × (24 ÷ 1) = ~600 MB
```

### Stopping the Monitor

To stop the monitoring:
1. Press `Ctrl+C` in the terminal
2. The script will gracefully exit and log the stop event

### Analyzing Results

The CSV output can be easily imported into:
- Excel
- Python pandas
- Other data analysis tools

This allows for creating visualizations or analyzing network performance trends over time.

### Notes

- WiFi signal strength monitoring may not work on all systems
- Speed test results may vary based on network conditions
- The script requires continuous internet access
- Consider your data plan limitations when setting test intervals
