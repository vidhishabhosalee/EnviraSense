# EnviraSense — Environmental Intelligence Network

React 18 + Vite 5 + Tailwind + MapLibre GL + Recharts, backed by the existing EnviraSense Supabase project.
Two role-based experiences share one app and one design system.

```
                       EnviraSense
                            |
              +-------------+--------------+
              |                            |
          CITIZEN                      AUTHORITY
  Overview · Map · Air Quality     Overview · Live Map · Air Monitoring
  Water Quality · Alerts           Water Monitoring · Alerts & Incidents
  Trends & History                 Analytics · Historical Data · Node Management
  Report Anomaly                   CPCB Live Data · Copernicus / Satellite
```

## Run

```bash
npm install
cp .env.example .env      # optional — defaults match the deployed build
npm run dev               # http://localhost:5173  (/ogd is proxied to api.data.gov.in)
npm run build             # → dist/
```

## Deploy — any static host

The site is a plain static folder (`dist/`) that talks to Supabase from the browser. CPCB Live Data goes
through the `cpcb-proxy` Edge Function (`supabase/functions/cpcb-proxy/index.ts` — deploy once with
Verify JWT off), so no host-specific rewrite is required. Build with `npm run build`, then upload `dist/`:

- **Cloudflare Pages** (free, drag-and-drop): Workers & Pages → Create → Pages → Upload assets → drop `dist/`.
- **Netlify**: drag `dist/` onto Deploys (or connect the repo — `netlify.toml` sets build + redirects). **GitHub Pages**: publish `dist/`.
- **Vercel**: `vercel --prod` (vercel.json included).

**Vercel via Git:** push this folder to GitHub → vercel.com → Add New → Project → import. `vercel.json`
sets the Vite build, the SPA fallback and the `/ogd` → api.data.gov.in proxy (CORS) for CPCB Live Data.
Add `VITE_OGD_API_KEY` under Settings → Environment Variables. Without Git: `npm i -g vercel && vercel --prod`.

**Netlify:** drag `dist/` onto the site's Deploys page; `public/_redirects` provides the same rewrites.

Any static host works for readings/alerts (the browser talks to Supabase directly); only the `/ogd` proxy
needs a host that can rewrite to an external URL.

## Data sources

| Source | Where | Notes |
|---|---|---|
| Air nodes | Supabase `sensor_readings` | PM2.5 / PM10 / VOC / temperature / humidity / pressure / noise + `altitude_m`, `gas_kohm`, `rssi`, `snr`, `packet` (no PM1 column) |
| Water nodes | Supabase `water_readings` | `temperature`, `tds_ppm` (+raw/voltage), `turbidity_voltage` (+raw), `distance_cm` (may be NULL — hidden when absent) |
| Node registry | Supabase `nodes` + `water_nodes` (`node_id, name, water_body, latitude, longitude`) | locations and water body |
| Alerts | Supabase `alerts` | written by the Edge Function engines (air: bright-handler, water: swift-endpoint). All columns displayed: parameter, node_value, baseline, severity, verdict, summary, context, status, alert_type, trend, forecast, actions, confidence, ai_summary, ai_summary_hi. Read-only; local rules only if the table is unreachable |
| Citizen reports | `verify-photo` Edge Function → `citizen_reports` | the form POSTs the photo (base64) + location + type to `/functions/v1/verify-photo`; the Authority queue reads `id, created_at, node_id, latitude, longitude, image_url, report_type, ai_verdict, ai_confidence, ai_severity, ai_explanation` |
| Context | `context_cache`, `water_context_cache` | CAMS / wind / CPCB / satellite and rainfall / satellite caches written hourly by smart-action, smooth-processor, dynamic-endpoint; rendered as stored with the cache timestamp |
| Rules | `alert_rules`, `water_alert_rules` | shown read-only under the Alert center |
| Realtime | Supabase Realtime | INSERTs on the three tables trigger a refetch; polling slows to 5 min while subscribed |
| CPCB Live Data | data.gov.in resource `3b01bcb8-…` via `/ogd` | Official NAQI sub-indices per station with each station's own `last_update` |
| CPCB archive | `public/data/cpcb-daily-aqi.json` | Daily bulletins 2022 → Apr 2025 — always labelled as an archive, never live |
| Copernicus | Sentinel Hub WMS (`sh.dataspace.copernicus.eu`) | Sentinel-2 / 5P layers, CAMS forecast grid |

Nothing is simulated: sections show an empty state until their table has rows. Demo nodes appear only
when `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` are empty, and the header then says DEMO MODE.

## Where things live

| Path | What |
|---|---|
| `src/App.jsx`, `src/roles/` | Role selection (localStorage prototype, **not auth**) and router |
| `src/citizen/` | Citizen views |
| `src/authority/` | Authority views (overview, monitoring, alerts & incidents, historical, node management, CPCB, Copernicus) |
| `src/views/` | Shared original views still in use: `MapView`, `AnalyticsView`, `HistoricalView` (CPCB archive) |
| `src/components/` | Header, sidebar, charts, node/station popovers, map (`map/SensorMap.js`) |
| `src/lib/supabase.js` | PostgREST client (publishable key only), Range-paged history, node registry, online/offline rule |
| `src/lib/realtime.js` | Supabase Realtime bridge |
| `src/lib/water.js`, `incidents.js` | Water readings + BIS-limit alerts; citizen reports |
| `src/lib/cpcbLive.js`, `cpcbHistorical.js` | Live stations (data.gov.in) and the bundled archive |
| `src/lib/copernicus.js` | Sentinel Hub WMS capabilities / tiles |
| `src/lib/demoData.js` | Alert rules (`ALERT_RULES`, `computeAlerts`) and demo nodes |

Files recovered from the original bundle keep the `jsx()` call style; new code is JSX.

## Alerts, status and thresholds

Alerts come from the backend `alerts` table (Edge Function engines + pg_net triggers). The rules below
run in the browser ONLY as a fallback when that table cannot be read, and for node online/offline:

- **Air alerts** (`ALERT_RULES`): PM2.5 60/100, PM10 100/250, VOC 300/400, noise 70/85 dB, temperature 35/38 °C (warning / critical).
- **Water alerts**: BIS IS 10500 — TDS 500/2000 ppm, turbidity 1/5 NTU.
- **Offline**: no reading for `OFFLINE_AFTER_MS` (15 min), unless the `nodes` row carries `last_seen_at` / `status`.
- Alert timestamps are the reading's own `created_at`; nothing is pre-acknowledged.

If you add Edge Functions for these, replace `computeAlerts` / `computeWaterAlerts` / `connectivityFor`.

## Security

- Only the **publishable** key ships in the bundle; RLS on the tables is the protection. Never put the
  service-role key, an NVIDIA key or any private secret in a `VITE_*` variable.
- No connection settings are editable in the UI any more (the old Supabase URL/key dialog was removed).
- `incident_reports` currently needs an anon `UPDATE` policy for the prototype status workflow — replace it
  with an authenticated authority-only policy before real deployment (see `src/roles/roleContext.jsx`).

## Tables expected (create only if missing)

```sql
create table if not exists water_readings (
  id bigint generated always as identity primary key,
  node_id text not null, water_temperature numeric, tds numeric, turbidity numeric, water_level numeric,
  created_at timestamptz not null default now());
create index on water_readings (node_id, created_at desc);
alter table water_readings enable row level security;
create policy "public read" on water_readings for select to anon using (true);

create table if not exists nodes (
  node_id text primary key, name text, area text, city text, latitude double precision, longitude double precision,
  node_type text, last_seen_at timestamptz, status text);
alter table nodes enable row level security;
create policy "public read" on nodes for select to anon using (true);

create table if not exists incident_reports (
  id uuid primary key default gen_random_uuid(), report_type text not null, description text not null,
  latitude double precision not null, longitude double precision not null, location_label text,
  reporter_name text, reporter_contact text, image_data text,
  status text not null default 'new' check (status in ('new','under_review','verified','rejected','resolved')),
  review_note text, reviewed_at timestamptz, created_at timestamptz not null default now());
alter table incident_reports enable row level security;
create policy "anyone can report" on incident_reports for insert to anon with check (status = 'new');
create policy "public read"       on incident_reports for select to anon using (true);
-- PROTOTYPE ONLY:
create policy "prototype status update" on incident_reports for update to anon using (true) with check (true);
```
