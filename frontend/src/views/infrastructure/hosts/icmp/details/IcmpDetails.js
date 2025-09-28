import React, { useEffect, useState, useRef } from 'react';
import { Card, CardContent, Typography, Box, CircularProgress, Alert, Grid, Stack, Divider, Chip, Button, Switch, FormControlLabel, Tooltip, IconButton } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import ImageIcon from '@mui/icons-material/Image';
import { alpha, useTheme } from '@mui/material/styles';
import PageContainer from 'src/components/container/PageContainer';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import { BACKEND_URL, API_PREFIX } from 'src/config/constants';
import { getAuthHeaders, handleAuthError } from 'src/utils/auth';

// Simple utility to derive host id from path (support both monitoring & infrastructure prefixes)
const extractHostId = () => {
  const parts = window.location.pathname.split('/').filter(Boolean);
  // patterns we expect: /infrastructure/hosts/details/:id/icmp/details OR /monitoring/hosts/:id/icmp/details
  const infraIdx = parts.indexOf('infrastructure');
  const monIdx = parts.indexOf('monitoring');
  if (infraIdx !== -1) {
    const i = parts.indexOf('hosts');
    if (i !== -1 && parts[i + 1] === 'details') return parts[i + 2];
  }
  if (monIdx !== -1) {
    const i = parts.indexOf('hosts');
    if (i !== -1) return parts[i + 1];
  }
  return null;
};

const BCrumb = [
  { to: '/', title: 'Home' },
  { to: '/monitoring/hosts', title: 'Hosts' },
  { title: 'ICMP Details' },
];

const IcmpDetails = () => {
  const hostId = extractHostId();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [host, setHost] = useState(null);
  const [icmpService, setIcmpService] = useState(null);
  const [availability, setAvailability] = useState(null);
  const theme = useTheme();
  const [range, setRange] = useState('24h'); // 6h | 12h | 24h | 7d
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);
  const [compact, setCompact] = useState(false);

  const rangeToMs = (r) => {
    switch(r){
      case '6h': return 6*3600*1000;
      case '12h': return 12*3600*1000;
      case '24h': return 24*3600*1000;
      case '7d': return 7*24*3600*1000;
      default: return 24*3600*1000;
    }
  };

  // Derived mini component for timeline chart
  const PingHistoryChart = ({ events, width, height=140, compactMode=false, onSvgRef, uptimePct, downtimePct }) => {
    if (!Array.isArray(events) || events.length === 0) return <Typography variant="body2">No events.</Typography>;
    // Normalize events: expect occurred_at / status (OK|DOWN)
    const parsed = events
      .map(e => ({
        t: new Date(e.occurred_at || e.occurredAt || e.time || Date.now()).getTime(),
        status: (e.status || '').toUpperCase(),
      }))
      .sort((a,b) => a.t - b.t);
    const minT = parsed[0].t;
    const maxT = parsed[parsed.length - 1].t;
    const span = Math.max(1, maxT - minT);
  const W = Math.max(300, width || 1000); // responsive width
  const H = compactMode ? 90 : height;
    // Build segments between points; last point extends to maxT
    const segments = [];
    for (let i=0;i<parsed.length;i++) {
      const cur = parsed[i];
      const next = parsed[i+1];
      const x1 = ((cur.t - minT) / span) * W;
      const x2 = next ? ((next.t - minT) / span) * W : W;
      segments.push({ x1, x2, status: cur.status });
    }
    const [hover, setHover] = useState(null);
    const handleMove = (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const t = minT + (x / W) * span;
      // find segment containing t
      const seg = segments.find(s => x >= s.x1 && x <= s.x2) || null;
      setHover(seg ? { x, status: seg.status, time: t } : null);
    };
    const handleLeave = () => setHover(null);
    return (
      <Box sx={{ width:'100%', overflow:'auto', position:'relative' }}>
        <Box component="svg" ref={onSvgRef} width={W} height={H} onMouseMove={handleMove} onMouseLeave={handleLeave} sx={{ cursor:'crosshair', display:'block', background: theme.palette.mode==='dark'? alpha('#fff',0.02): alpha('#000',0.02), border:'1px solid', borderColor:'divider', borderRadius:1 }}>
          <defs>
            <linearGradient id="okGrad" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor={alpha(theme.palette.success.main,0.7)} />
              <stop offset="100%" stopColor={alpha(theme.palette.success.main,0.3)} />
            </linearGradient>
            <linearGradient id="downGrad" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor={alpha(theme.palette.error.main,0.75)} />
              <stop offset="100%" stopColor={alpha(theme.palette.error.main,0.35)} />
            </linearGradient>
            <linearGradient id="otherGrad" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor={alpha(theme.palette.warning.main,0.7)} />
              <stop offset="100%" stopColor={alpha(theme.palette.warning.main,0.3)} />
            </linearGradient>
          </defs>
          {/* Background grid */}
          {Array.from({length:6}).map((_,i)=>(
            <line key={i} x1={0} x2={W} y1={(H/6)*i} y2={(H/6)*i} stroke={alpha(theme.palette.text.primary,0.08)} strokeWidth={1} />
          ))}
          {/* Segments representing status */}
          {segments.map((s,idx)=>{
            let stroke, fill;
            if (s.status === 'OK') { stroke = theme.palette.success.main; fill = 'url(#okGrad)'; }
            else if (s.status === 'DOWN') { stroke = theme.palette.error.main; fill = 'url(#downGrad)'; }
            else { stroke = theme.palette.warning.main; fill = 'url(#otherGrad)'; }
            return <rect key={idx} x={s.x1} y={0} width={Math.max(1,s.x2 - s.x1)} height={H} fill={fill} stroke={stroke} strokeWidth={1} />;
          })}
          {hover && (
            <g>
              <line x1={hover.x} x2={hover.x} y1={0} y2={H} stroke={theme.palette.primary.main} strokeDasharray="4" />
            </g>
          )}
          {/* Time labels (start/mid/end) */}
          <text x={4} y={H-6} fontSize={11} fill={theme.palette.text.secondary}>{new Date(minT).toLocaleTimeString()}</text>
          <text x={W/2} y={H-6} fontSize={11} textAnchor="middle" fill={theme.palette.text.secondary}>{new Date(minT + span/2).toLocaleTimeString()}</text>
          <text x={W-4} y={H-6} fontSize={11} textAnchor="end" fill={theme.palette.text.secondary}>{new Date(maxT).toLocaleTimeString()}</text>
        </Box>
        {hover && (
          <Box sx={{ position:'absolute', top:8, left: hover.x + 12, background:'rgba(0,0,0,0.75)', color:'#fff', px:1, py:0.5, borderRadius:1, fontSize:11, pointerEvents:'none' }}>
            <div>{new Date(hover.time).toLocaleString()}</div>
            <div>Status: {hover.status}</div>
          </Box>
        )}
        {!compactMode && (
          <Stack direction="row" spacing={1} mt={1} alignItems="center" flexWrap="wrap">
            <Chip size="small" label="OK" color="success" />
            <Chip size="small" label="DOWN" color="error" />
            <Chip size="small" label="OTHER" color="warning" />
            <Chip size="small" label={`Uptime: ${uptimePct ?? '-'}%`} color="success" variant="outlined" />
            <Chip size="small" label={`Downtime: ${downtimePct ?? '-'}%`} color="error" variant="outlined" />
          </Stack>
        )}
      </Box>
    );
  };

  useEffect(() => {
    const load = async () => {
      if (!hostId) { setError('Invalid host id'); setLoading(false); return; }
      try {
        // Fetch host base info
        const hostRes = await fetch(`${BACKEND_URL}${API_PREFIX}/hosts/${hostId}`, { headers: getAuthHeaders() });
        if (hostRes.status === 401 || hostRes.status === 403) return handleAuthError({ status: hostRes.status });
        if (!hostRes.ok) {
          const d = await hostRes.json().catch(() => ({}));
            throw new Error(d.error || 'Failed load host');
        }
        const hostData = await hostRes.json();
        setHost(hostData);

        // Fetch all services for host to locate ICMP
        const servicesRes = await fetch(`${BACKEND_URL}${API_PREFIX}/hosts/${hostId}/services`, { headers: getAuthHeaders() });
        if (!servicesRes.ok) {
          const d = await servicesRes.json().catch(() => ({}));
          throw new Error(d.error || 'Failed load services');
        }
        const services = await servicesRes.json();
        const icmp = Array.isArray(services) ? services.find(s => (s.type || s.service_type || '').toLowerCase() === 'icmp') : null;
        setIcmpService(icmp || null);

    // Availability summary (selected range)
    const to = new Date().toISOString();
    const from = new Date(Date.now() - rangeToMs(range)).toISOString();
        const availRes = await fetch(`${BACKEND_URL}${API_PREFIX}/monitoring/hosts/availability/?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&service_type=icmp&host_id=${hostId}`, { headers: getAuthHeaders() });
        if (availRes.ok) {
          const av = await availRes.json();
          setAvailability(av);
        }
      } catch (e) {
        console.error(e);
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [hostId, range, refreshKey]);

  // Auto refresh interval 60s
  useEffect(()=>{
    if(!autoRefresh) return;
    const id = setInterval(()=> setRefreshKey(k=>k+1), 60000);
    return () => clearInterval(id);
  }, [autoRefresh]);

  // Responsive width for chart
  const chartWrapRef = useRef(null);
  const svgRef = useRef(null);
  const [chartWidth, setChartWidth] = useState(1000);
  useEffect(()=>{
    const handle = () => {
      if (chartWrapRef.current) {
  setChartWidth(chartWrapRef.current.getBoundingClientRect().width); // full width
      }
    };
    handle();
    window.addEventListener('resize', handle);
    return () => window.removeEventListener('resize', handle);
  }, []);

  if (loading) return <PageContainer title="ICMP Details"><Box display="flex" justifyContent="center" py={6}><CircularProgress /></Box></PageContainer>;
  if (error) return <PageContainer title="ICMP Details"><Alert severity="error">{error}</Alert></PageContainer>;

  return (
    <PageContainer title="ICMP Details" description="Host ICMP service details">
      <Breadcrumb title="ICMP Details" items={BCrumb} />
      <Box mt={2} />
      <Card sx={{ border: '1px solid rgba(0,0,0,0.06)', mb:3 }}>
        <CardContent>
          <Stack spacing={2}>
            <Typography variant="h5">ICMP Service - {host?.hostname || host?.ip}</Typography>
            <Divider />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={3}>
                <Typography variant="subtitle2">Host</Typography>
                <Typography>{host?.hostname || host?.ip}</Typography>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Typography variant="subtitle2">IP</Typography>
                <Typography>{host?.ip || '-'}</Typography>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Typography variant="subtitle2">Interval</Typography>
                <Typography>{icmpService?.interval || host?.heartbeat_interval || '-'} sec</Typography>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Typography variant="subtitle2">Last Status</Typography>
                <Chip label={(icmpService?.status || 'UNKNOWN').toUpperCase()} color={(icmpService?.status || 'unknown') === 'ok' ? 'success':'warning'} size="small" />
              </Grid>
            </Grid>
          </Stack>
        </CardContent>
      </Card>

      <Card sx={{ border: '1px solid rgba(0,0,0,0.06)', mb:3, position:'relative' }}>
        <CardContent ref={chartWrapRef}>
          <Stack spacing={2}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Typography variant="h6" sx={{ flexGrow:1 }}>Availability ({range})</Typography>
              <FormControlLabel control={<Switch size="small" checked={autoRefresh} onChange={e=> setAutoRefresh(e.target.checked)} />} label={<Typography variant="caption">Auto</Typography>} />
              <FormControlLabel control={<Switch size="small" checked={compact} onChange={e=> setCompact(e.target.checked)} />} label={<Typography variant="caption">Compact</Typography>} />
              <Tooltip title="Refresh now"><span><Button size="small" variant="outlined" onClick={()=> setRefreshKey(k=>k+1)}>Refresh</Button></span></Tooltip>
              <Tooltip title="Download SVG"><span><IconButton size="small" onClick={()=>{
                if(!svgRef.current) return; const svgData = new XMLSerializer().serializeToString(svgRef.current);
                const blob = new Blob([svgData], {type:'image/svg+xml;charset=utf-8'});
                const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href=url; a.download=`icmp-history-${hostId}-${Date.now()}.svg`; a.click(); URL.revokeObjectURL(url);
              }}><DownloadIcon fontSize="inherit" /></IconButton></span></Tooltip>
              <Tooltip title="Download PNG"><span><IconButton size="small" onClick={()=>{
                if(!svgRef.current) return; const svgData = new XMLSerializer().serializeToString(svgRef.current);
                const img = new Image(); const svgBlob = new Blob([svgData], {type:'image/svg+xml;charset=utf-8'}); const url = URL.createObjectURL(svgBlob);
                img.onload = function(){
                  const canvas = document.createElement('canvas'); canvas.width = svgRef.current.getAttribute('width'); canvas.height = svgRef.current.getAttribute('height');
                  const ctx = canvas.getContext('2d'); ctx.drawImage(img,0,0); URL.revokeObjectURL(url);
                  canvas.toBlob(b=>{ const a=document.createElement('a'); a.href=URL.createObjectURL(b); a.download=`icmp-history-${hostId}-${Date.now()}.png`; a.click(); }, 'image/png');
                };
                img.src = url;
              }}><ImageIcon fontSize="inherit" /></IconButton></span></Tooltip>
              <Stack direction="row" spacing={1}>
                {['6h','12h','24h','7d'].map(r => (
                  <Button key={r} size="small" variant={range===r? 'contained':'outlined'} onClick={()=> setRange(r)}>{r}</Button>
                ))}
              </Stack>
            </Stack>
            {availability ? (
              <Box sx={{ position:'relative', pt:1 }}>
                <Box mt={1}>
                  <PingHistoryChart uptimePct={availability.uptime_percentage} downtimePct={availability.downtime_percentage} onSvgRef={svgRef} compactMode={compact} width={chartWidth} events={availability.events || availability.items || []} />
                </Box>
              </Box>
            ) : <Typography variant="body2">No availability data.</Typography>}
          </Stack>
        </CardContent>
      </Card>

      <Card sx={{ border: '1px solid rgba(0,0,0,0.06)', mb:3 }}>
        <CardContent>
          <Stack spacing={2}>
            <Typography variant="h6">Actions</Typography>
            <Button variant="outlined" size="small" onClick={() => window.history.back()}>Back</Button>
          </Stack>
        </CardContent>
      </Card>

      <Card sx={{ border: '1px solid rgba(0,0,0,0.06)' }}>
        <CardContent>
          <Stack spacing={2}>
            <Typography variant="h6">Raw JSON</Typography>
            <Box sx={{ maxHeight:400, overflow:'auto', fontSize:12, fontFamily:'monospace', background:'#fafafa', p:1, border:'1px solid #eee' }}>
              <pre style={{ margin:0 }}>{JSON.stringify({ host, icmpService, availability }, null, 2)}</pre>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </PageContainer>
  );
};

export default IcmpDetails;
