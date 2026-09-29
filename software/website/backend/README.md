# Supabase Backend

Supabase is used as the backend and database layer for the EnviraSense
environmental monitoring dashboard.

## Functions

- Stores sensor readings
- Stores environmental parameters
- Stores node information
- Provides data to the website
- Supports real-time data retrieval
- Stores historical readings

## Data Flow

ESP32 Sensor Node-->
LoRa-->
LoRa Receiver-->
Data Processing-->
Supabase Database-->
Website Dashboard
