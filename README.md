# EnviraSense

## AI-Powered Environmental Monitoring and Early Warning System

EnviraSense is a resilient, AI-powered environmental monitoring network designed to provide early detection, localized intelligence, and actionable alerts for environmental hazards such as floods, forest fires, air pollution, extreme heat, landslides, industrial emissions, and water quality issues.

The system combines distributed sensor nodes, edge processing, wireless communication, machine learning, cloud-based monitoring, and satellite/environmental data to help shift disaster management from reactive response to proactive risk prevention.

---

## Problem Statement

Environmental hazards in India can develop rapidly and affect communities, infrastructure, agriculture, and ecosystems.

Traditional monitoring systems may face challenges such as limited coverage, delayed detection, false alarms, communication failures, and lack of localized information.

The proposed system addresses these challenges through a distributed Environmental Intelligence Network consisting of sensor nodes, edge intelligence, communication systems, cloud analytics, and an alert mechanism.

---

## Our Solution

EnviraSense uses multiple environmental sensor nodes deployed in different locations to continuously collect real-time environmental data.

The collected data is processed through the following pipeline:

Sensor Data-->
Edge Anomaly Detection-->
Machine Learning Analysis-->
Parameter Cross-Check-->
Nearby Node Verification-->
Historical and Trend Analysis-->
Satellite/Environmental Data Validation-->
Risk Score + Confidence Score-->
Targeted Alert

This approach helps identify abnormal environmental conditions while reducing false alarms through multiple levels of verification.

---

## Key Features

* Real-time environmental monitoring
* Distributed sensor nodes
* Edge-based anomaly detection
* AI/ML-based risk analysis
* Cross-verification of multiple environmental parameters
* Nearby-node verification
* Historical trend analysis
* Risk and confidence scoring
* Satellite and environmental data validation
* Targeted alerts
* Local data processing during connectivity loss
* Cloud-based data storage and visualization
* Support for multiple environmental hazards

---

## Environmental Hazards Covered

### 1. Flood Monitoring

The flood monitoring node can use parameters such as:

* Water level
* Rainfall
* Soil moisture
* Temperature
* Atmospheric pressure
* Water presence

Possible sensors include JSN-SR04T, tipping bucket rain gauge, SEN0308, BME280, and water presence sensors.

### 2. Forest Fire Detection

The forest fire monitoring system can monitor:

* Particulate matter
* Carbon monoxide
* Temperature
* Humidity
* Wind speed
* Wind direction
* Rainfall
* Soil moisture

The collected parameters can be combined to identify conditions associated with forest fire risk.

### 3. Air Pollution Monitoring

The air-quality node can monitor:

* PM1.0
* PM2.5
* PM10
* Temperature
* Humidity
* Pressure
* Carbon monoxide
* CO₂
* VOCs
* Wind conditions

Example sensors include PMS7003/SDS011, BME680, MQ-7, MH-Z19B, and other gas sensors.

### 4. Extreme Heat Monitoring

The system can monitor:

* Temperature
* Humidity
* Solar radiation/light
* Wind speed
* Wind direction
* Rainfall
* Soil moisture
* UV radiation

### 5. Landslide Monitoring

Landslide monitoring can use:

* Soil moisture
* Rainfall
* Ground vibration
* Tilt/acceleration
* Distance
* Atmospheric conditions

Possible sensors include MPU6050/MPU9250, soil moisture sensors, rain gauges, vibration sensors, ultrasonic sensors, and pressure sensors.

### 6. Industrial Emission Monitoring

The system can monitor:

* Particulate matter
* Carbon monoxide
* VOCs
* Other gases
* Temperature
* Humidity

Multiple gas and environmental sensors can be combined to identify abnormal emission patterns.

### 7. Water Quality Monitoring

The water monitoring system can measure parameters such as:

* pH
* TDS/EC
* Turbidity
* Water temperature
* Dissolved oxygen
* ORP
* Nitrate/ammonia

---

## System Architecture

The overall architecture consists of several layers.

### Sensor Layer

Distributed sensor nodes continuously collect environmental parameters from their surroundings.

### Edge Intelligence Layer

Sensor data is processed locally to identify abnormal conditions and perform initial anomaly detection.

The system can cross-check multiple parameters before considering an event as a potential hazard.

### Communication Layer

The system can use communication technologies such as:

* LoRa
* Wi-Fi
* LoRa + Wi-Fi

The nodes can continue local processing and data storage during temporary communication failures.

### Cloud and Data Layer

Environmental data, historical readings, anomalies, risk values, node locations, and trends can be stored for further analysis and visualization.

### Machine Learning Layer

Machine learning models analyze:

* Multiple environmental parameters
* Historical trends
* Rate of change
* Nearby-node correlations
* Environmental/satellite data

The system generates a risk score and confidence score.

### Decision and Alert Layer

The final risk information is used to generate targeted alerts for relevant authorities and communities.

---

## Hardware

The project consists of multiple hardware prototypes and environmental monitoring nodes.

The hardware section contains:

* ESP32-based sensor nodes
* Environmental sensors
* Communication modules
* Power supply components
* Circuit diagrams
* Prototype models
* Sensor calibration information

The exact hardware configuration varies depending on the environmental hazard being monitored.

---

## Machine Learning

The ML component is designed to analyze environmental sensor data and identify abnormal patterns and potential hazards.

The model can use:

* Real-time sensor readings
* Historical data
* Rate of parameter change
* Nearby sensor-node information
* Environmental conditions
* Satellite/environmental information

The ML system produces:

* Risk score
* Confidence score
* Potential hazard classification

---

## Website and Dashboard

The project includes a monitoring dashboard for visualizing environmental information.

The dashboard can display:

* Sensor readings
* Node locations
* Environmental parameters
* Detected anomalies
* Risk levels
* Confidence values
* Historical trends
* Alerts

---

## Installation and Setup

### Hardware

1. Assemble the required sensors with the ESP32.
2. Connect the sensors according to the circuit diagram.
3. Upload the corresponding ESP32 code.
4. Configure the required Wi-Fi/LoRa communication.
5. Verify sensor readings.
6. Perform sensor calibration before deployment.
   

## Sensor Calibration

Sensor calibration is an important part of the system because reliable environmental monitoring requires accurate measurements.

The project includes calibration procedures for sensors such as:

* BME680/BME280
* PMS7003
* INMP441
* MPU6050
* Soil moisture sensors
* Water-quality sensors

Calibration information, reference measurements, offsets, scale factors, and acceptance criteria are documented in the file.

---

## Testing and Validation

The system can be evaluated using:

* Sensor accuracy testing
* Calibration testing
* Hardware testing
* Communication testing
* ML model testing
* Anomaly detection testing
* False-alarm analysis
* Node-to-node verification
* Dashboard testing
* End-to-end system testing

---

## Demo

The project demonstration includes:

* Hardware prototypes
* Sensor data collection
* Machine learning analysis
* Environmental monitoring
* Dashboard visualization
* Alert generation

The project demonstration video is provided through the link in:


---

## Documentation

Additional documentation is available in the directory, including:

* Problem statement
* System architecture
* Technical report
* Calibration procedures
* Workflow diagrams
* Project documentation



Future improvements can include:

* Larger-scale deployment of sensor nodes
* Improved ML models with larger datasets
* Integration of additional satellite data
* Improved communication coverage
* Automated alert delivery
* Mobile application integration
* More advanced predictive analytics
* Improved community feedback mechanisms
* Integration with additional environmental monitoring infrastructure

---
