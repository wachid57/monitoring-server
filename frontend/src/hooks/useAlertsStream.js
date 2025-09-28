import { useEffect, useRef, useState } from 'react';
import { BACKEND_URL, API_PREFIX } from 'src/config/constants';
import { getAuthHeaders } from 'src/utils/auth';

// Simple SSE alerts hook. Filters via query (host_id, service_type) and returns array of recent alerts.
export default function useAlertsStream({ hostId, serviceType='icmp', limit=50, enabled=true }={}) {
  const [alerts, setAlerts] = useState([]);
  const esRef = useRef(null);
  const headers = getAuthHeaders(); // for token cookie maybe; SSE usually uses cookies / Authorization not always supported in EventSource

  useEffect(()=>{
    if(!enabled) return;
    let closed = false;
    let reconnectTimer;
    const qs = new URLSearchParams();
    if(hostId) qs.append('host_id', hostId);
    if(serviceType) qs.append('service_type', serviceType);

    const connect = () => {
      try {
        const url = `${BACKEND_URL}${API_PREFIX}/monitoring/alerts/stream?${qs.toString()}`;
        const es = new EventSource(url, { withCredentials:true });
        esRef.current = es;
        es.addEventListener('alert', (ev)=>{
          try {
            const obj = JSON.parse(ev.data);
            setAlerts(prev => {
              const next = [obj, ...prev];
              if(next.length > limit) next.length = limit;
              return next;
            });
          } catch(e){ /* ignore */ }
        });
        es.onerror = () => {
          if(es) es.close();
          if(!closed){ reconnectTimer = setTimeout(connect, 5000); }
        };
      } catch(e){
        if(!closed){ reconnectTimer = setTimeout(connect, 5000); }
      }
    };
    connect();
    return ()=>{ closed = true; if(esRef.current) esRef.current.close(); if(reconnectTimer) clearTimeout(reconnectTimer); };
  }, [hostId, serviceType, enabled, limit]);

  return alerts;
}
