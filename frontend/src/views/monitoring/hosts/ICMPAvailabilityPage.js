import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Card, CardContent, Typography, Box, Stack, ButtonGroup, Button, Table, TableHead, TableRow, TableCell, TableBody, LinearProgress, IconButton, Tooltip, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { IconRefresh, IconCalendarEvent, IconDownload } from '@tabler/icons-react';
import PageContainer from 'src/components/container/PageContainer';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import { BACKEND_URL, API_PREFIX } from 'src/config/constants';
import { getAuthHeaders, handleAuthError } from 'src/utils/auth';
import dayjs from 'dayjs';
import { useNotify } from 'src/components/notifications/NotificationProvider';

const BCrumb = [{ to: '/', title: 'Home' }, { title: 'Monitoring' }, { title: 'ICMP Availability' }];

const PRESETS = [
  { label: '1H', hours: 1 },
  { label: '6H', hours: 6 },
  { label: '24H', hours: 24 },
  { label: '7D', hours: 24 * 7 },
  { label: '30D', hours: 24 * 30 },
];

export default function ICMPAvailabilityPage(){
  const notify = useNotify().notify;
  const [preset, setPreset] = useState('24H');
  const [from, setFrom] = useState(dayjs().subtract(24,'hour'));
  const [to, setTo] = useState(dayjs());
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [customDialog, setCustomDialog] = useState(false);
  const [refreshInterval, setRefreshInterval] = useState(0); // seconds (0=off)
  const intervalRef = useRef();
  const [customFrom, setCustomFrom] = useState(dayjs().subtract(24,'hour').format('YYYY-MM-DDTHH:mm'));
  const [customTo, setCustomTo] = useState(dayjs().format('YYYY-MM-DDTHH:mm'));

  const buildURL = () => {
    return `${BACKEND_URL}${API_PREFIX}/monitoring/hosts/availability/?from=${from.toISOString()}&to=${to.toISOString()}&service_type=icmp`;
  };

  const fetchData = useCallback(async ()=>{
    setLoading(true);
    try {
      const res = await fetch(buildURL(), { headers: getAuthHeaders() });
      if(res.status===401||res.status===403){ handleAuthError({status:res.status}); return; }
      const json = await res.json();
      setData(json);
    } catch(e){ console.error(e); notify('Failed load availability',{severity:'error'}); }
    finally { setLoading(false); }
  }, [from, to]);

  useEffect(()=> { fetchData(); }, [fetchData]);

  // auto refresh effect
  useEffect(()=> {
    if(intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; }
    if(refreshInterval > 0) {
      intervalRef.current = setInterval(()=> { fetchData(); }, refreshInterval * 1000);
    }
    return ()=> { if(intervalRef.current) clearInterval(intervalRef.current); };
  }, [refreshInterval, fetchData]);

  const onPreset = (p)=> {
    setPreset(p.label);
    setFrom(dayjs().subtract(p.hours,'hour'));
    setTo(dayjs());
  };

  const openCustom = ()=> { setCustomDialog(true); setPreset('CUSTOM'); };
  const applyCustom = ()=> {
    const f = dayjs(customFrom);
    const t = dayjs(customTo);
    if(!f.isValid() || !t.isValid() || f.isAfter(t)) { notify('Invalid time range',{severity:'warning'}); return; }
    setFrom(f); setTo(t); setCustomDialog(false); fetchData();
  };

  const exportCSV = ()=> {
    if(!data) return; const rows = [ ['Host','Service','Service Type','OK','WARN','CRIT','UNKNOWN','Flapping','H.Down','Downtime','N/A'] ];
    data.items?.forEach(it=> rows.push([it.host_name||it.host_name, it.service_name, it.service_type, it.ok_pct.toFixed(2), it.warn_pct.toFixed(2), it.crit_pct.toFixed(2), it.unknown_pct.toFixed(2), it.flapping_pct.toFixed(2), it.hard_down_pct.toFixed(2), it.downtime_pct.toFixed(2), it.na_pct.toFixed(2)]));
    const csv = rows.map(r=> r.join(',')).join('\n');
    const blob = new Blob([csv], {type:'text/csv'}); const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = `icmp_availability_${Date.now()}.csv`; a.click(); URL.revokeObjectURL(url);
  };

  const percentCell = (v)=> <Box sx={{display:'flex', alignItems:'center', gap:1}}><Box sx={{minWidth:60}}>{v.toFixed(2)}%</Box><LinearProgress variant='determinate' value={v} sx={{flex:1, height:6, borderRadius:2}} /></Box>;

  return (
    <PageContainer title='ICMP Availability' description='Availability of ICMP services'>
      <Breadcrumb title='ICMP Availability' items={BCrumb} />
      <Card>
        <CardContent>
          <Stack direction='row' justifyContent='space-between' alignItems='center' mb={2} flexWrap='wrap' gap={2}>
            <Stack direction='row' spacing={1} alignItems='center'>
              <Typography variant='h6'>Time Range:</Typography>
              <ButtonGroup size='small'>
                {PRESETS.map(p=> <Button key={p.label} variant={preset===p.label?'contained':'outlined'} onClick={()=> onPreset(p)}>{p.label}</Button>)}
                <Button variant={preset==='CUSTOM'?'contained':'outlined'} onClick={openCustom}>Custom</Button>
              </ButtonGroup>
              <Typography variant='body2'>{from.format('YYYY-MM-DD HH:mm')} → {to.format('YYYY-MM-DD HH:mm')}</Typography>
            </Stack>
            <Stack direction='row' spacing={1} alignItems='center'>
              <TextField select label='Auto Refresh' size='small' value={refreshInterval}
                onChange={e=> setRefreshInterval(parseInt(e.target.value))}
                SelectProps={{ native:true }} sx={{ minWidth:140 }}>
                <option value={0}>Off</option>
                <option value={30}>30s</option>
                <option value={60}>1m</option>
                <option value={300}>5m</option>
              </TextField>
              <Tooltip title='Refresh'><IconButton onClick={fetchData}><IconRefresh size={18} /></IconButton></Tooltip>
              <Tooltip title='Export CSV'><IconButton onClick={exportCSV}><IconDownload size={18} /></IconButton></Tooltip>
            </Stack>
          </Stack>

          {loading && <LinearProgress sx={{mb:2}} />}
          <Box sx={{overflowX:'auto'}}>
            <Table size='small'>
              <TableHead>
                <TableRow>
                  <TableCell>Host</TableCell>
                  <TableCell>Service</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>OK</TableCell>
                  <TableCell>WARN</TableCell>
                  <TableCell>CRIT</TableCell>
                  <TableCell>UNKNOWN</TableCell>
                  <TableCell>Flapping</TableCell>
                  <TableCell>H.Down</TableCell>
                  <TableCell>Downtime</TableCell>
                  <TableCell>N/A</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {!loading && data?.items?.length===0 && <TableRow><TableCell colSpan={11} align='center'>No data</TableCell></TableRow>}
                {data?.items?.map(it=> <TableRow key={`${it.host_id}-${it.service_type}-${it.service_id}`}>
                  <TableCell>{it.host_name || it.hostname || it.host_id}</TableCell>
                  <TableCell>{it.service_name || it.service_id}</TableCell>
                  <TableCell>{it.service_type}</TableCell>
                  <TableCell>{percentCell(it.ok_pct)}</TableCell>
                  <TableCell>{percentCell(it.warn_pct)}</TableCell>
                  <TableCell>{percentCell(it.crit_pct)}</TableCell>
                  <TableCell>{percentCell(it.unknown_pct)}</TableCell>
                  <TableCell>{percentCell(it.flapping_pct)}</TableCell>
                  <TableCell>{percentCell(it.hard_down_pct)}</TableCell>
                  <TableCell>{percentCell(it.downtime_pct)}</TableCell>
                  <TableCell>{percentCell(it.na_pct)}</TableCell>
                </TableRow>)}
                {data && data.summary && <TableRow sx={{background:'#111827'}}>
                  <TableCell colSpan={3}><strong>Summary</strong></TableCell>
                  <TableCell>{percentCell(data.summary.ok_pct||0)}</TableCell>
                  <TableCell>{percentCell(data.summary.warn_pct||0)}</TableCell>
                  <TableCell>{percentCell(data.summary.crit_pct||0)}</TableCell>
                  <TableCell>{percentCell(data.summary.unknown_pct||0)}</TableCell>
                  <TableCell>{percentCell(data.summary.flapping_pct||0)}</TableCell>
                  <TableCell>{percentCell(data.summary.hard_down_pct||0)}</TableCell>
                  <TableCell>{percentCell(data.summary.downtime_pct||0)}</TableCell>
                  <TableCell>{percentCell(data.summary.na_pct||0)}</TableCell>
                </TableRow>}
              </TableBody>
            </Table>
          </Box>
        </CardContent>
      </Card>

      <Dialog open={customDialog} onClose={()=> setCustomDialog(false)} fullWidth maxWidth='xs'>
        <DialogTitle>Custom Time Range</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{mt:1}}>
            <TextField type='datetime-local' label='From' value={customFrom} onChange={e=> setCustomFrom(e.target.value)} InputLabelProps={{shrink:true}} />
            <TextField type='datetime-local' label='To' value={customTo} onChange={e=> setCustomTo(e.target.value)} InputLabelProps={{shrink:true}} />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=> setCustomDialog(false)}>Cancel</Button>
          <Button variant='contained' onClick={applyCustom}>Apply</Button>
        </DialogActions>
      </Dialog>
    </PageContainer>
  );
}
