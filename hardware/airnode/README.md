

The AirNode is the air-quality monitoring unit of the EnviraSense system. It collects environmental and air-quality data using connected sensors and transmits the readings to the LoRa Receiver.

Purpose

The AirNode is designed to:

Monitor air and environmental conditions
Collect sensor readings
Process the collected data
Transmit sensor data using LoRa
Send environmental information to the central monitoring system
Main Components
ESP32 / microcontroller
Air-quality and environmental sensors
LoRa communication module
Power supply
Connecting wires and supporting components
Working
The sensors collect air and environmental measurements.
The ESP32 reads the sensor values.
The readings are processed by the microcontroller.
The sensor data is transmitted through LoRa.
The LoRa Receiver receives the transmitted data.
The received data can be used by the monitoring system.
Communication

The AirNode uses LoRa wireless communication to transmit sensor data to the LoRa Receiver.
