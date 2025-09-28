import React, { useRef } from 'react';
import { alpha, useTheme } from '@mui/material/styles';
import DownloadIcon from '@mui/icons-material/Download';
import ImageIcon from '@mui/icons-material/Image';
import { Switch, FormControlLabel, Tooltip, IconButton } from '@mui/material';

import PageContainer from 'src/components/container/PageContainer';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import { BACKEND_URL, API_PREFIX } from 'src/config/constants';
import { getAuthHeaders, handleAuthError } from 'src/utils/auth';

const crumbBase = [
	{ to: '/', title: 'Home' },
	{ to: '/monitoring/hosts', title: 'Hosts' },
	{ title: 'Website Details' },
];

const extractHostId = () => {
	const parts = window.location.pathname.split('/').filter(Boolean);
	const infraIdx = parts.indexOf('infrastructure');
	const monIdx = parts.indexOf('monitoring');
	if (infraIdx !== -1) {
		const i = parts.indexOf('hosts');
		if (i !== -1 && parts[i+1] === 'details') return parts[i+2];
	}
	if (monIdx !== -1) {
		const i = parts.indexOf('hosts');
		if (i !== -1) return parts[i+1];
	}
	return null;
};

const WebsiteDetails = () => {
	const hostId = extractHostId();
	const [loading, setLoading] = React.useState(true);
	const [error, setError] = React.useState('');
	const [host, setHost] = React.useState(null);
	const [websiteService, setWebsiteService] = React.useState(null);
	const [availability, setAvailability] = React.useState(null);
	const [range, setRange] = React.useState('24h');
	const [autoRefresh, setAutoRefresh] = React.useState(true);
	const [refreshKey, setRefreshKey] = React.useState(0);
	const [compact, setCompact] = React.useState(false);
	const theme = useTheme();
	const chartWrapRef = useRef(null);
	const svgRef = useRef(null);
	const [chartWidth, setChartWidth] = React.useState(1000);

	const rangeToMs = (r) => ({ '6h':6,'12h':12,'24h':24,'7d':24*7 }[r] *3600*1000 || 24*3600*1000);

	// Chart component (reuse from ICMP logic)
	const TimelineChart = ({ events, width, height=140, compactMode=false, uptimePct, downtimePct, onSvgRef }) => {
		if (!Array.isArray(events) || events.length === 0) return <Typography variant="body2">No events.</Typography>;
		const parsed = events.map(e=>({ t:new Date(e.occurred_at || e.time || Date.now()).getTime(), status:(e.status||'').toUpperCase()})).sort((a,b)=>a.t-b.t);
		const minT = parsed[0].t; const maxT = parsed[parsed.length-1].t; const span = Math.max(1,maxT-minT);
		const W = Math.max(300, width||1000); const H = compactMode?90:height;
		const segments=[]; for(let i=0;i<parsed.length;i++){const cur=parsed[i]; const next=parsed[i+1]; const x1=((cur.t-minT)/span)*W; const x2= next? ((next.t-minT)/span)*W:W; segments.push({x1,x2,status:cur.status});}
		const [hover,setHover]=React.useState(null);
		const move=(e)=>{const rect=e.currentTarget.getBoundingClientRect(); const x=e.clientX-rect.left; const t=minT+(x/W)*span; const seg=segments.find(s=>x>=s.x1 && x<=s.x2) || null; setHover(seg?{x,status:seg.status,time:t}:null);};
		return <Box sx={{width:'100%',position:'relative'}}>
			<Box component="svg" ref={onSvgRef} width={W} height={H} onMouseMove={move} onMouseLeave={()=>setHover(null)} sx={{cursor:'crosshair',display:'block',background:theme.palette.mode==='dark'?alpha('#fff',0.02):alpha('#000',0.02),border:'1px solid',borderColor:'divider',borderRadius:1}}>
				<defs>
					<linearGradient id="upGrad" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor={alpha(theme.palette.success.main,0.7)} /><stop offset="100%" stopColor={alpha(theme.palette.success.main,0.3)} /></linearGradient>
					<linearGradient id="downGradW" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor={alpha(theme.palette.error.main,0.75)} /><stop offset="100%" stopColor={alpha(theme.palette.error.main,0.35)} /></linearGradient>
				</defs>
				{Array.from({length:6}).map((_,i)=><line key={i} x1={0} x2={W} y1={(H/6)*i} y2={(H/6)*i} stroke={alpha(theme.palette.text.primary,0.08)} strokeWidth={1} />)}
				{segments.map((s,i)=>{const stroke=s.status==='UP'?theme.palette.success.main: theme.palette.error.main; const fill=s.status==='UP'?'url(#upGrad)':'url(#downGradW)'; return <rect key={i} x={s.x1} y={0} width={Math.max(1,s.x2-s.x1)} height={H} fill={fill} stroke={stroke} strokeWidth={1}/>})}
				{hover && <line x1={hover.x} x2={hover.x} y1={0} y2={H} stroke={theme.palette.primary.main} strokeDasharray="4" />}
				<text x={4} y={H-6} fontSize={11} fill={theme.palette.text.secondary}>{new Date(minT).toLocaleTimeString()}</text>
				<text x={W/2} y={H-6} fontSize={11} textAnchor="middle" fill={theme.palette.text.secondary}>{new Date(minT+span/2).toLocaleTimeString()}</text>
				<text x={W-4} y={H-6} fontSize={11} textAnchor="end" fill={theme.palette.text.secondary}>{new Date(maxT).toLocaleTimeString()}</text>
			</Box>
			{hover && <Box sx={{position:'absolute',top:8,left:hover.x+12,background:'rgba(0,0,0,0.75)',color:'#fff',px:1,py:0.5,borderRadius:1,fontSize:11,pointerEvents:'none'}}>
				<div>{new Date(hover.time).toLocaleString()}</div>
				<div>Status: {hover.status}</div>
			</Box>}
			{!compactMode && <Stack direction="row" spacing={1} mt={1} flexWrap="wrap" alignItems="center">
				<Chip size="small" label="UP" color="success" />
				<Chip size="small" label="DOWN" color="error" />
				<Chip size="small" variant="outlined" color="success" label={`Uptime: ${uptimePct ?? '-'}%`} />
				<Chip size="small" variant="outlined" color="error" label={`Downtime: ${downtimePct ?? '-'}%`} />
			</Stack>}
		</Box>;
	};

	// Load data
	useEffect(()=>{
		const load=async()=>{
			if(!hostId){ setError('Invalid host id'); setLoading(false); return; }
			try {
				const hostRes= await fetch(`${BACKEND_URL}${API_PREFIX}/hosts/${hostId}`, { headers:getAuthHeaders() });
				if(hostRes.status===401||hostRes.status===403) return handleAuthError({status:hostRes.status});
				const h= await hostRes.json(); setHost(h);
				const servicesRes = await fetch(`${BACKEND_URL}${API_PREFIX}/hosts/${hostId}/services`, { headers:getAuthHeaders() });
				if(servicesRes.ok){ const svs= await servicesRes.json(); const ws = Array.isArray(svs)? svs.find(s => (s.type || s.service_type || '').toLowerCase()==='website'): null; setWebsiteService(ws||null);}        
				const to = new Date().toISOString(); const from=new Date(Date.now()-rangeToMs(range)).toISOString();
				// reuse availability endpoint (assuming param service_type=website)
				const availRes = await fetch(`${BACKEND_URL}${API_PREFIX}/monitoring/hosts/availability/?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&service_type=website&host_id=${hostId}`, { headers:getAuthHeaders() });
				if(availRes.ok){ const av= await availRes.json(); setAvailability(av); }
			} catch(e){ console.error(e); setError(e.message); } finally { setLoading(false);} };
		load();
	}, [hostId, range, refreshKey]);

	// Auto refresh
	useEffect(()=>{ if(!autoRefresh) return; const id=setInterval(()=> setRefreshKey(k=>k+1),60000); return ()=> clearInterval(id); }, [autoRefresh]);

	// Responsive width
	useEffect(()=>{ const handle=()=>{ if(chartWrapRef.current){ setChartWidth(chartWrapRef.current.getBoundingClientRect().width); } }; handle(); window.addEventListener('resize', handle); return ()=> window.removeEventListener('resize', handle); }, []);

	if (loading) return <PageContainer title="Website Details"><Box display="flex" justifyContent="center" py={6}><CircularProgress /></Box></PageContainer>;
	if (error) return <PageContainer title="Website Details"><Alert severity="error">{error}</Alert></PageContainer>;

	return <PageContainer title="Website Details" description="Host website service details">
		<Breadcrumb title="Website Details" items={crumbBase} />
		<Box mt={2} />
		<Card sx={{ border:'1px solid rgba(0,0,0,0.06)', mb:3 }}>
			<CardContent>
				<Stack spacing={2}>
					<Typography variant="h5">Website Service - {host?.hostname || host?.ip}</Typography>
					<Divider />
					<Grid container spacing={2}>
						<Grid item xs={12} sm={3}><Typography variant="subtitle2">Host</Typography><Typography>{host?.hostname || host?.ip}</Typography></Grid>
						<Grid item xs={12} sm={3}><Typography variant="subtitle2">IP</Typography><Typography>{host?.ip || '-'}</Typography></Grid>
						<Grid item xs={12} sm={3}><Typography variant="subtitle2">Interval</Typography><Typography>{websiteService?.interval || '-' } sec</Typography></Grid>
						<Grid item xs={12} sm={3}><Typography variant="subtitle2">Last Status</Typography><Chip label={(websiteService?.status||'UNKNOWN').toUpperCase()} color={(websiteService?.status||'').toLowerCase()==='up'? 'success':'warning'} size="small" /></Grid>
						<Grid item xs={12} sm={6}><Typography variant="subtitle2">URL</Typography><Typography>{websiteService?.url || websiteService?.endpoint || '-'}</Typography></Grid>
						<Grid item xs={12} sm={3}><Typography variant="subtitle2">Method</Typography><Typography>{websiteService?.method || 'GET'}</Typography></Grid>
						<Grid item xs={12} sm={3}><Typography variant="subtitle2">Timeout</Typography><Typography>{websiteService?.timeout || '-'}</Typography></Grid>
					</Grid>
				</Stack>
			</CardContent>
		</Card>

		<Card sx={{ border:'1px solid rgba(0,0,0,0.06)', mb:3 }}>
			<CardContent ref={chartWrapRef}>
				<Stack spacing={2}>
					<Stack direction="row" alignItems="center" spacing={2}>
						<Typography variant="h6" sx={{ flexGrow:1 }}>Availability ({range})</Typography>
						<FormControlLabel control={<Switch size="small" checked={autoRefresh} onChange={e=> setAutoRefresh(e.target.checked)} />} label={<Typography variant="caption">Auto</Typography>} />
						<FormControlLabel control={<Switch size="small" checked={compact} onChange={e=> setCompact(e.target.checked)} />} label={<Typography variant="caption">Compact</Typography>} />
						<Tooltip title="Refresh now"><span><Button size="small" variant="outlined" onClick={()=> setRefreshKey(k=>k+1)}>Refresh</Button></span></Tooltip>
						<Tooltip title="Download SVG"><span><IconButton size="small" onClick={()=>{ if(!svgRef.current) return; const svgData=new XMLSerializer().serializeToString(svgRef.current); const blob=new Blob([svgData],{type:'image/svg+xml;charset=utf-8'}); const url=URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url; a.download=`website-history-${hostId}-${Date.now()}.svg`; a.click(); URL.revokeObjectURL(url); }}><DownloadIcon fontSize="inherit" /></IconButton></span></Tooltip>
						<Tooltip title="Download PNG"><span><IconButton size="small" onClick={()=>{ if(!svgRef.current) return; const svgData=new XMLSerializer().serializeToString(svgRef.current); const img=new Image(); const blob=new Blob([svgData],{type:'image/svg+xml;charset=utf-8'}); const url=URL.createObjectURL(blob); img.onload=function(){ const canvas=document.createElement('canvas'); canvas.width=svgRef.current.getAttribute('width'); canvas.height=svgRef.current.getAttribute('height'); const ctx=canvas.getContext('2d'); ctx.drawImage(img,0,0); URL.revokeObjectURL(url); canvas.toBlob(b=>{ const a=document.createElement('a'); a.href=URL.createObjectURL(b); a.download=`website-history-${hostId}-${Date.now()}.png`; a.click(); }, 'image/png'); }; img.src=url; }}><ImageIcon fontSize="inherit" /></IconButton></span></Tooltip>
						<Stack direction="row" spacing={1}>{['6h','12h','24h','7d'].map(r=> <Button key={r} size="small" variant={range===r? 'contained':'outlined'} onClick={()=> setRange(r)}>{r}</Button>)}</Stack>
					</Stack>
					{availability ? <TimelineChart onSvgRef={svgRef} width={chartWidth} compactMode={compact} events={availability.events || availability.items || []} uptimePct={availability.uptime_percentage} downtimePct={availability.downtime_percentage} /> : <Typography variant="body2">No availability data.</Typography>}
				</Stack>
			</CardContent>
		</Card>

		<Card sx={{ border:'1px solid rgba(0,0,0,0.06)' }}>
			<CardContent>
				<Stack spacing={2}>
					<Typography variant="h6">Raw JSON</Typography>
					<Box sx={{ maxHeight:400, overflow:'auto', fontSize:12, fontFamily:'monospace', background:'#fafafa', p:1, border:'1px solid #eee' }}>
						<pre style={{margin:0}}>{JSON.stringify({ host, websiteService, availability }, null, 2)}</pre>
					</Box>
				</Stack>
			</CardContent>
		</Card>
	</PageContainer>;
};

export default WebsiteDetails;
