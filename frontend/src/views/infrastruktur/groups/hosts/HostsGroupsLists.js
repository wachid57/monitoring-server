import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Stack,
  Box,
  TextField,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  IconPlus,
  IconSearch,
  IconEdit,
  IconTrash,
  IconEye,
} from '@tabler/icons';
import PageContainer from 'src/components/container/PageContainer';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import { BACKEND_URL, API_PREFIX } from 'src/config/constants';
import { getAuthHeaders, handleAuthError } from 'src/utils/auth';

const BCrumb = [
  { to: '/', title: 'Home' },
  { title: 'Host Groups' },
  { title: 'List Host Groups' },
];

const ListHostGroup = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteDialog, setDeleteDialog] = useState({ open: false, group: null });
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [newGroup, setNewGroup] = useState({
    group_name: '',
    alias: '',
  // host_id removed per spec
    groups_tags: '',
    keterangan: '',
  });
  const [editMode, setEditMode] = useState(false);
  const [editingGroupId, setEditingGroupId] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);

  const fetchGroups = async () => {
    setLoading(true);
    setError('');
    try {
  const res = await fetch(`${BACKEND_URL}${API_PREFIX}/infrastruktur/hosts/groups`, {
        headers: getAuthHeaders(),
      });
      if (res.status === 401 || res.status === 403) {
        handleAuthError({ status: res.status });
        return;
      }
      const data = await res.json();
      if (res.ok) {
        setGroups(data || []);
      } else {
        setError(data.error || 'Failed to fetch host groups');
      }
    } catch (err) {
      console.error('fetch groups error', err);
      setError('Failed to fetch host groups');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (groupId) => {
    try {
      const res = await fetch(
        `${BACKEND_URL}${API_PREFIX}/hosts/groups/${groupId}`,
        { method: 'DELETE', headers: getAuthHeaders() }
      );
      if (res.status === 401 || res.status === 403)
        return handleAuthError({ status: res.status });
      if (res.ok) {
        setGroups((prev) => prev.filter((g) => g.id !== groupId));
        setDeleteDialog({ open: false, group: null });
      } else {
        const data = await res.json();
        setError(data.error || 'Failed to delete host group');
      }
    } catch (err) {
      console.error('delete group error', err);
      setError('Failed to delete host group');
    }
  };

  const filteredGroups = groups.filter((g) =>
    g.group_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    g.alias?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    g.keterangan?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => { fetchGroups(); }, []);

  return (
    <PageContainer title="List Host Groups" description="Manage host groups">
      <Breadcrumb title="List Host Groups" items={BCrumb} />
      <Card>
        <CardContent>
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
            <Box sx={{ minWidth: 300 }}>
              <TextField
                placeholder="Search group..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconSearch size={20} />
                    </InputAdornment>
                  ),
                }}
                fullWidth
              />
            </Box>
            <Button
              variant="contained"
              startIcon={<IconPlus />}
              onClick={() => setAddDialogOpen(true)}
            >
              Add Group
            </Button>
          </Stack>

          {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

          {loading ? (
            <Box display="flex" justifyContent="center" py={4}>
              <CircularProgress />
            </Box>
          ) : (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Group Name</TableCell>
                    <TableCell>Alias</TableCell>
                    <TableCell>Tags</TableCell>
                    <TableCell>Keterangan</TableCell>
                    <TableCell>Created</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredGroups.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} align="center">
                        No host groups found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredGroups.map((g) => (
                      <TableRow key={g.id}>
                        <TableCell>{g.group_name || '-'}</TableCell>
                        <TableCell>{g.alias || '-'}</TableCell>
                        <TableCell>{g.groups_tags || '-'}</TableCell>
                        <TableCell>{g.keterangan || '-'}</TableCell>
                        <TableCell>
                          {g.created_at ? new Date(g.created_at).toLocaleDateString() : '-'}
                        </TableCell>
                        <TableCell align="center">
                          <Stack direction="row" spacing={1} justifyContent="center">
                            <IconButton size="small" color="primary">
                              <IconEye size={16} />
                            </IconButton>
                            <IconButton
                              size="small"
                              color="warning"
                              onClick={() => {
                                setEditMode(true);
                                setEditingGroupId(g.id);
                                setNewGroup({
                                  group_name: g.group_name || '',
                                  alias: g.alias || '',
                                  host_id: g.host_id || '',
                                  groups_tags: g.groups_tags || '',
                                  keterangan: g.keterangan || '',
                                });
                                setAddDialogOpen(true);
                              }}
                            >
                              <IconEdit size={16} />
                            </IconButton>
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => setDeleteDialog({ open: true, group: g })}
                            >
                              <IconTrash size={16} />
                            </IconButton>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>

      {/* Delete dialog */}
      <Dialog
        open={deleteDialog.open}
        onClose={() => setDeleteDialog({ open: false, group: null })}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Delete group "{deleteDialog.group?.group_name}"?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog({ open: false, group: null })}>
            Cancel
          </Button>
          <Button
            color="error"
            variant="contained"
            onClick={() => handleDelete(deleteDialog.group?.id)}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add / Edit dialog */}
      <Dialog
        open={addDialogOpen}
        onClose={() => {
          setAddDialogOpen(false);
          setEditMode(false);
          setEditingGroupId(null);
        }}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>{editMode ? 'Edit Group' : 'Add Group'}</DialogTitle>
        <DialogContent>
          <TextField
            label="Group Name"
            fullWidth
            margin="dense"
            value={newGroup.group_name}
            onChange={(e) =>
              setNewGroup({ ...newGroup, group_name: e.target.value })
            }
          />
          <TextField
            label="Alias"
            fullWidth
            margin="dense"
            value={newGroup.alias}
            onChange={(e) =>
              setNewGroup({ ...newGroup, alias: e.target.value })
            }
          />
          {/* Host ID removed */}
          <TextField
            label="Groups Tags"
            fullWidth
            margin="dense"
            value={newGroup.groups_tags}
            onChange={(e) =>
              setNewGroup({ ...newGroup, groups_tags: e.target.value })
            }
          />
          <TextField
            label="Keterangan"
            fullWidth
            margin="dense"
            multiline
            minRows={2}
            value={newGroup.keterangan}
            onChange={(e) =>
              setNewGroup({ ...newGroup, keterangan: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddDialogOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            color="primary"
            onClick={async () => {
              setSubmitLoading(true);
              try {
                let res;
                  const payload = {
                  group_name: newGroup.group_name,
                  alias: newGroup.alias,
                  groups_tags: newGroup.groups_tags,
                  keterangan: newGroup.keterangan,
                };
                if (editMode && editingGroupId) {
                  res = await fetch(
                    `${BACKEND_URL}${API_PREFIX}/hosts/groups/${editingGroupId}`,
                    {
                      method: 'PUT',
                      headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
                      body: JSON.stringify(payload),
                    }
                  );
                } else {
                  res = await fetch(
                    `${BACKEND_URL}${API_PREFIX}/hosts/groups`,
                    {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
                      body: JSON.stringify(payload),
                    }
                  );
                }
                if (res.status === 401 || res.status === 403)
                  return handleAuthError({ status: res.status });
                const data = await res.json();
                if (res.ok) {
                  fetchGroups();
                  setAddDialogOpen(false);
                  setNewGroup({
                    group_name: '',
                    alias: '',
                    host_id: '',
                    groups_tags: '',
                    keterangan: '',
                  });
                  setEditMode(false);
                  setEditingGroupId(null);
                } else
                  setError(
                    data.error ||
                    (editMode ? 'Failed to update group' : 'Failed to create group')
                  );
              } catch (err) {
                console.error(err);
                setError(editMode ? 'Failed to update group' : 'Failed to create group');
              } finally {
                setSubmitLoading(false);
              }
            }}
          >
            {submitLoading ? <CircularProgress size={20} /> : editMode ? 'Save' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </PageContainer>
  );
};

export default ListHostGroup;
