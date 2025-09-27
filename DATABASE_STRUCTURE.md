## Database Structure & Monitoring Additions

### Renamed Table
- ICMP checks table renamed to `check_icmp` (from `icmp_checks`). Update existing migrations or run manual `RENAME TABLE icmp_checks TO check_icmp;` if upgrading.

### New Table: service_status_events
Stores discrete status change events (or sampled statuses) for any monitored service.

| Column        | Type        | Notes                                      |
|---------------|-------------|--------------------------------------------|
| id            | uint (PK)   |                                            |
| host_id       | uint        | FK to hosts.id (not enforced)              |
| service_type  | varchar(32) | icmp | http | future metrics                |
| service_id    | uint        | ID in its source table (e.g. check_icmp)   |
| status        | varchar(16) | OK, WARN, CRIT, UNKNOWN, H.DOWN            |
| occurred_at   | datetime    | UTC timestamp of status change             |

Index Suggestions:
- (service_type, service_id, occurred_at)
- (host_id, occurred_at)

### Event Generation
Currently generated in `PingRefreshHostServices` when a service status changes. Future real check schedulers should also insert events.

### Availability Aggregation Endpoint
`GET /api/v1.0/monitoring/hosts/availability/?from=RFC3339&to=RFC3339&service_type=icmp`

Response:
```
{
	"range": {"from":"...","to":"...","seconds":86400},
	"items": [
		{
			"host_id":1,
			"host_name":"example-host",
			"service_type":"icmp",
			"service_id":10,
			"service_name":"Ping Google",
			"ok_pct":100.0,
			"warn_pct":0,
			"crit_pct":0,
			"unknown_pct":0,
			"flapping_pct":0,
			"hard_down_pct":0,
			"downtime_pct":0,
			"na_pct":0
		}
	],
	"summary": { ... averaged percentages ... }
}
```

Calculation Logic:
1. Load all `service_status_events` up to `to` (filtered by service_type if provided)
2. Determine baseline status at `from` from the last event before (or default UNKNOWN)
3. Sum durations per status until `to`
4. NA = total_range - (sum of known status durations)
5. Flapping heuristic: if transitions/hour > 6 => assign 5% (placeholder)
6. Downtime = CRIT + H.DOWN

### Frontend Page
`/infrastructure/hosts/icmp` now shows ICMP availability with presets (1H,6H,24H,7D,30D,Custom) and auto-refresh (Off,30s,1m,5m).

### Future Improvements
- Replace placeholder flapping metric with real detection.
- Weighted summary by service importance.
- Store latency & integrate percentile calculations.

