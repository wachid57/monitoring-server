import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, CircularProgress, Divider, Grid, Stack, Typography, Alert, Chip, Button } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import { BACKEND_URL, API_PREFIX } from 'src/config/constants';
import { getAuthHeaders, handleAuthError } from 'src/utils/auth';

// Details page specialized for Website Availability service (HTTP/HTTPS checks)

const crumbBase = [
	{ to: '/', title: 'Home' },
	{ to: '/infrastructure/hosts/details', title: 'Host Details' },
	{ title: 'Website Detail' },
];

const WebsiteDetails = () => {
	const [item, setItem] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');

	// Path patterns considered:
	// /monitoring/website/details/:id
	// /monitoring/hosts/:hostId/website/details/:id (future)
	const parseId = () => {
		const parts = window.location.pathname.split('/').filter(Boolean);
		// last part is id
		return parts[parts.length - 1];
	};
	const id = parseId();

	useEffect(() => {
		const fetchWebsite = async () => {
			setLoading(true);
			try {
				// Hypothetical endpoint: /infrastructure/availability/website/:id 
				// We'll try new canonical API: /infrastructure/availability/website/:id 
				const url = `${BACKEND_URL + API_PREFIX}/infrastructure/availability/website/${id}`;
				const res = await fetch(url, { headers: getAuthHeaders() });
				if (res.status === 401 || res.status === 403) return handleAuthError({ status: res.status });
				if (!res.ok) {
					const data = await res.json().catch(() => ({}));
					setError(data.error || 'Failed load website');
					setLoading(false);
					return;
				}
				const data = await res.json();
				setItem(data);
			} catch (e) {
				console.error(e);
				setError('Failed load website');
			} finally {
				setLoading(false);
			}
		};
		if (id) fetchWebsite(); else { setError('Invalid id'); setLoading(false); }
	}, [id]);

	if (loading) return <PageContainer title="Website Detail"><Box display="flex" justifyContent="center" py={6}><CircularProgress /></Box></PageContainer>;
	if (error) return <PageContainer title="Website Detail"><Alert severity="error">{error}</Alert></PageContainer>;

	const tags = (item?.tags || '').split(',').map(t => t.trim()).filter(Boolean);
	const statusColor = item?.status === 'up' ? 'success' : (item?.status === 'down' ? 'error' : 'default');

	return (
		<PageContainer title="Website Detail" description="Website availability monitoring detail">
			<Breadcrumb title="Detail" items={crumbBase} />
			<Box mt={2} />
			<Grid container spacing={3}>
				<Grid item xs={12} md={8}>
					<Card sx={{ border: '1px solid rgba(0,0,0,0.06)' }}>
						<CardContent>
							<Stack spacing={2}>
								<Typography variant="h5">{item?.name || item?.url || 'Website'}</Typography>
								<Stack direction="row" spacing={1} alignItems="center">
									<Chip size="small" label="WEBSITE" />
									<Chip size="small" color={statusColor} label={item?.status || 'unknown'} />
									{item?.last_check && <Chip size="small" label={new Date(item.last_check).toLocaleString()} />}
								</Stack>
								<Divider />
								<Grid container spacing={2}>
									<Grid item xs={12} sm={6}>
										<Typography variant="subtitle2">URL</Typography>
										<Typography>{item?.url || '-'}</Typography>
									</Grid>
									<Grid item xs={12} sm={6}>
										<Typography variant="subtitle2">Method</Typography>
										<Typography>{item?.method || 'GET'}</Typography>
									</Grid>
									<Grid item xs={12} sm={6}>
										<Typography variant="subtitle2">Interval (s)</Typography>
										<Typography>{item?.interval || item?.heartbeat_interval || '-'}</Typography>
									</Grid>
									<Grid item xs={12} sm={6}>
										<Typography variant="subtitle2">Timeout</Typography>
										<Typography>{item?.timeout || '-'}</Typography>
									</Grid>
									<Grid item xs={12} sm={6}>
										<Typography variant="subtitle2">Expected Status</Typography>
										<Typography>{item?.expected_status || '-'}</Typography>
									</Grid>
									<Grid item xs={12} sm={6}>
										<Typography variant="subtitle2">Max Redirects</Typography>
										<Typography>{item?.max_redirects ?? '-'}</Typography>
									</Grid>
									<Grid item xs={12} sm={6}>
										<Typography variant="subtitle2">Created</Typography>
										<Typography>{item?.created_at ? new Date(item.created_at).toLocaleString() : '-'}</Typography>
									</Grid>
									<Grid item xs={12} sm={6}>
										<Typography variant="subtitle2">Updated</Typography>
										<Typography>{item?.updated_at ? new Date(item.updated_at).toLocaleString() : '-'}</Typography>
									</Grid>
								</Grid>
								<Divider />
								<Typography variant="h6">Tags</Typography>
								{tags.length ? <Stack direction="row" spacing={1} flexWrap="wrap" rowGap={1}>{tags.map(t => <Chip size="small" key={t} label={t} />)}</Stack> : <Typography color="text.secondary">No tags</Typography>}
							</Stack>
						</CardContent>
					</Card>
				</Grid>
				<Grid item xs={12} md={4}>
					<Card sx={{ border: '1px solid rgba(0,0,0,0.06)' }}>
						<CardContent>
							<Stack spacing={2}>
								<Typography variant="h6">Actions</Typography>
								<Button variant="outlined" size="small">Recheck Now</Button>
								<Button variant="outlined" size="small" color="error">Disable</Button>
								<Divider />
								<Typography variant="h6">Meta</Typography>
								<Typography variant="subtitle2">ID</Typography>
								<Typography variant="body2">{id}</Typography>
							</Stack>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</PageContainer>
	);
};

export default WebsiteDetails;
