import React from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, IconButton, TextField, Button, Box, CircularProgress, Tooltip, Switch, Chip } from '@mui/material';
import { IconPlus, IconTrash, IconEdit, IconCheck, IconX } from '@tabler/icons';

// Generic editable key/value table with per-row edit & save
export default function EditableSettingsTable({ rows, loading, onReload, onUpsert, onDelete, title, allowAdd=true }) {
  const [editKey, setEditKey] = React.useState(null);
  const [draft, setDraft] = React.useState({ key:'', name:'', value:'', description:'', enabled:true, native:false });
  const [adding, setAdding] = React.useState(false);
  const [saving, setSaving] = React.useState(false);

  const startEdit = (row) => { setEditKey(row.key); setDraft({ key:row.key, name:row.name||'', value:row.value||'', description:row.description||'', enabled: row.enabled!==false, native: !!row.native }); };
  const cancelEdit = () => { setEditKey(null); setDraft({ key:'', name:'', value:'', description:'', enabled:true, native:false }); };

  const submit = async () => {
    setSaving(true);
    try { await onUpsert(draft); setEditKey(null); setAdding(false); onReload && onReload(); }
    finally { setSaving(false); }
  };

  const startAdd = () => { setAdding(true); setEditKey('__new'); setDraft({ key:'', name:'', value:'', description:'', enabled:true, native:false }); };

  return (
    <Box>
      {loading ? <CircularProgress size={28} /> : (
        <>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell width={180}>Key</TableCell>
                <TableCell width={200}>Name</TableCell>
                <TableCell width={90}>Enabled</TableCell>
                <TableCell width={90}>Native</TableCell>
                <TableCell>Value</TableCell>
                <TableCell>Description</TableCell>
                <TableCell width={120} align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(r => (
                <TableRow key={r.key} hover>
                  <TableCell>{editKey===r.key ? <TextField size="small" disabled fullWidth value={draft.key} /> : r.key}</TableCell>
                  <TableCell>{editKey===r.key ? <TextField size="small" fullWidth value={draft.name||''} onChange={e=>setDraft(d=>({...d,name:e.target.value}))} /> : (r.name||'')}</TableCell>
                  <TableCell>
                    {editKey===r.key ? (
                      <Switch size="small" checked={!!draft.enabled} onChange={e=>setDraft(d=>({...d,enabled:e.target.checked}))} />
                    ) : (
                      <Switch size="small" checked={!!r.enabled} disabled />
                    )}
                  </TableCell>
                  <TableCell>{r.native ? <Chip size="small" label="Default" color="default" /> : <Chip size="small" label="Custom" color="primary" />}</TableCell>
                  <TableCell>{editKey===r.key ? <TextField size="small" fullWidth value={draft.value||''} onChange={e=>setDraft(d=>({...d,value:e.target.value}))} /> : r.value}</TableCell>
                  <TableCell>{editKey===r.key ? <TextField size="small" fullWidth value={draft.description||''} onChange={e=>setDraft(d=>({...d,description:e.target.value}))} /> : (r.description||'')}</TableCell>
                  <TableCell align="center">
                    {editKey===r.key ? (
                      <>
                        <IconButton size="small" disabled={saving || !draft.key} onClick={submit} color="primary"><IconCheck size={18} /></IconButton>
                        <IconButton size="small" disabled={saving} onClick={cancelEdit} color="error"><IconX size={18} /></IconButton>
                      </>
                    ) : (
                      <>
                        <IconButton size="small" onClick={()=>startEdit(r)}><IconEdit size={18} /></IconButton>
                        <IconButton size="small" disabled={r.native} onClick={()=>{ if(!r.native && window.confirm('Delete '+r.key+'?')) onDelete(r.key); }}><IconTrash size={18} /></IconButton>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
        {adding && (
                <TableRow key="__new" hover>
                  <TableCell><TextField size="small" autoFocus value={draft.key} onChange={e=>setDraft(d=>({...d,key:e.target.value}))} placeholder="new_key" /></TableCell>
                  <TableCell><TextField size="small" value={draft.name} onChange={e=>setDraft(d=>({...d,name:e.target.value}))} placeholder="Name" /></TableCell>
          <TableCell><Switch size="small" checked={draft.enabled} onChange={e=>setDraft(d=>({...d,enabled:e.target.checked}))} /></TableCell>
          <TableCell></TableCell>
                  <TableCell><TextField size="small" value={draft.value} onChange={e=>setDraft(d=>({...d,value:e.target.value}))} placeholder="Value" /></TableCell>
                  <TableCell><TextField size="small" value={draft.description} onChange={e=>setDraft(d=>({...d,description:e.target.value}))} placeholder="Description" /></TableCell>
                  <TableCell align="center">
                    <IconButton size="small" disabled={saving || !draft.key || !draft.value} onClick={submit} color="primary"><IconCheck size={18} /></IconButton>
                    <IconButton size="small" disabled={saving} onClick={cancelEdit} color="error"><IconX size={18} /></IconButton>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          {allowAdd && !adding && editKey===null && (
            <Box mt={2}>
              <Button startIcon={<IconPlus />} variant="contained" onClick={startAdd}>Add Setting</Button>
            </Box>
          )}
        </>
      )}
    </Box>
  );
}
