import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Snackbar, Alert, Slide } from '@mui/material';

const NotificationContext = createContext({ notify: () => {}, mapSeverity: () => 'info' });

function SlideDown(props) { return <Slide {...props} direction="down" />; }

export const NotificationProvider = ({ children, autoHideDuration = 4000, maxSnack = 1 }) => {
  const [queue, setQueue] = useState([]); // { id, msg, severity }
  const [current, setCurrent] = useState(null);
  const timerRef = useRef();
  const idRef = useRef(0);
  const [open, setOpen] = useState(false);

  const mapSeverity = useCallback((variant) => {
    // allow alias mapping
    if(!variant) return 'info';
    const v = variant.toLowerCase();
    if(['success','error','warning','info'].includes(v)) return v;
    if(['warn'].includes(v)) return 'warning';
    if(['err','danger','fail','failed'].includes(v)) return 'error';
    if(['ok','passed'].includes(v)) return 'success';
    return 'info';
  }, []);

  const notify = useCallback((msg, options = {}) => {
    const sev = mapSeverity(options.severity || options.variant || 'info');
    setQueue(q => {
      const next = [...q, { id: ++idRef.current, msg, severity: sev }];
      // optional trimming if a hard limit desired beyond sequential display
      if (maxSnack > 0 && next.length > 50) next.shift();
      return next;
    });
  }, [mapSeverity, maxSnack]);

  // process queue
  useEffect(()=>{
    if(!current && queue.length){
      const [first, ...rest] = queue;
      setCurrent(first);
      setQueue(rest);
      setOpen(true);
    }
  }, [queue, current]);

  const handleClose = (_, reason) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  };

  const handleExited = () => {
    setCurrent(null);
  };

  // auto hide timer
  useEffect(()=>{
    if(open && current){
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(()=> setOpen(false), typeof current.autoHideDuration === 'number' ? current.autoHideDuration : autoHideDuration);
    }
    return ()=> clearTimeout(timerRef.current);
  }, [open, current, autoHideDuration]);

  // Global unhandled promise rejection & error listeners
  useEffect(()=>{
    const onRejection = (e) => {
      notify(`Unhandled rejection: ${e.reason?.message || e.reason || 'Unknown error'}`, { severity:'error'});
    };
    const onError = (e) => {
      notify(`Runtime error: ${e.message}`, { severity:'error'});
    };
    window.addEventListener('unhandledrejection', onRejection);
    window.addEventListener('error', onError);
    return ()=>{
      window.removeEventListener('unhandledrejection', onRejection);
      window.removeEventListener('error', onError);
    };
  }, [notify]);

  return (
    <NotificationContext.Provider value={{ notify, mapSeverity }}>
      {children}
      <Snackbar
        key={current ? current.id : undefined}
        open={open}
        onClose={handleClose}
        TransitionProps={{ onExited: handleExited }}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        TransitionComponent={SlideDown}
      >
        {current && (
          <Alert onClose={handleClose} severity={current.severity} variant="filled" sx={{ width: '100%' }}>
            {current.msg}
          </Alert>
        )}
      </Snackbar>
    </NotificationContext.Provider>
  );
};

export const useNotify = () => useContext(NotificationContext);
