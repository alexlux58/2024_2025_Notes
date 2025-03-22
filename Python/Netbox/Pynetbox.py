# pip install pynetbox
# https://pynetbox.readthedocs.io/en/latest/
# https://www.youtube.com/watch?v=AybLCyazpL4

import pynetbox

# Replace with your NetBox URL and API token
nb = pynetbox.api(
    'http://your-netbox-instance-url',
    token='your_api_token'
)

# Fetch all devices
devices = nb.dcim.devices.all()
for device in devices:
    print(device.name)
