import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, CircularProgress, Divider, Grid, Stack, Typography, Alert, Chip, Button } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import { BACKEND_URL, API_PREFIX } from 'src/config/constants';
import { getAuthHeaders, handleAuthError } from 'src/utils/auth';

// Generic detail viewer for any monitored service attached to a host.
// Fallback until we split per-type detail pages (ICMP, WEBSITE, METRIC, etc.)

const crumbBase = [
	{ to: '/', title: 'Home' },
	{ to: '/monitoring/hosts', title: 'Hosts' },
	{ title: 'Service Detail' },
];

const UnifiedServiceDetails = () => {
	const [service, setService] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');

	// Parse path patterns like:
	// /monitoring/hosts/:hostId/service/:serviceId
	// /infrastructure/hosts/details/:hostId/service/:serviceId
	const parseIds = () => {
		const parts = window.location.pathname.split('/').filter(Boolean);
		const serviceIdx = parts.indexOf('service');
		if (serviceIdx === -1 || serviceIdx === parts.length - 1) return { hostId: null, serviceId: null };
		const serviceId = parts[serviceIdx + 1];
		// host id should be two positions before 'service' in expected patterns
		// e.g. monitoring hosts <hostId> service <serviceId>
		let hostId = null;
		for (let i = serviceIdx - 1; i >= 0; i--) {
			if (parts[i] !== 'hosts' && parts[i] !== 'details') {
				hostId = parts[i];
				break;
			}
		}
		return { hostId, serviceId };
	};

	const { hostId, serviceId } = parseIds();

	useEffect(() => {
		const fetchService = async () => {
			if (!serviceId) { setError('Invalid service id'); setLoading(false); return; }
			setLoading(true);
			try {
				// Assuming backend endpoint to get a single host service: /hosts/:id/services then filter or /hosts/:id/services/:serviceId
				// We'll call specific if available; if 404 fallback to list & find.
				const specificUrl = `${BACKEND_URL + API_PREFIX}/hosts/${hostId}/services?format=full`;
				const res = await fetch(specificUrl, { headers: getAuthHeaders() });
				if (res.status === 401 || res.status === 403) return handleAuthError({ status: res.status });
				if (!res.ok) {
					const data = await res.json().catch(() => ({}));
						setError(data.error || 'Failed load service');
						setLoading(false);
						return;
				}
				const data = await res.json();
				// Find service by id
				let svc = null;
				if (Array.isArray(data)) {
					svc = data.find(s => `${s.id}` === `${serviceId}` || `${s.service_id}` === `${serviceId}`);
				} else if (data && Array.isArray(data.services)) {
					svc = data.services.find(s => `${s.id}` === `${serviceId}` || `${s.service_id}` === `${serviceId}`);
				}
				if (!svc) {
					setError('Service not found');
				} else {
					setService(svc);
				}
			} catch (e) {
				console.error(e);
				setError('Failed load service');
			} finally {
				setLoading(false);
			}
		};
		fetchService();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [hostId, serviceId]);

	if (loading) return <PageContainer title="Service Detail"><Box display="flex" justifyContent="center" py={6}><CircularProgress /></Box></PageContainer>;
	if (error) return <PageContainer title="Service Detail"><Alert severity="error">{error}</Alert></PageContainer>;

	const tags = (service?.tags || service?.service_tags || '').split(',').map(t => t.trim()).filter(Boolean);
	const statusColor = service?.status === 'up' ? 'success' : (service?.status === 'down' ? 'error' : 'default');

	return (
		<PageContainer title="Service Detail" description="Unified monitored service information">
			<Breadcrumb title="Detail" items={crumbBase} />
			<Box mt={2} />
			<Grid container spacing={3}>
				<Grid item xs={12} md={8}>
					<Card sx={{ border: '1px solid rgba(0,0,0,0.06)' }}>
						<CardContent>
							<Stack spacing={2}>
								<Typography variant="h5">{service?.name || service?.service_name || 'Service'}</Typography>
								<Stack direction="row" spacing={1} alignItems="center">
									<Chip size="small" label={service?.type || service?.monitor_type || 'unknown'} />
									<Chip size="small" color={statusColor} label={service?.status || 'unknown'} />
									{service?.last_check && <Chip size="small" label={new Date(service.last_check).toLocaleString()} />}
								</Stack>
								<Divider />
								<Grid container spacing={2}>
									<Grid item xs={12} sm={6}>
										<Typography variant="subtitle2">Endpoint / Target</Typography>
										<Typography>{service?.url || service?.ip || service?.target || '-'}</Typography>
									</Grid>
									<Grid item xs={12} sm={6}>
										<Typography variant="subtitle2">Interval (s)</Typography>
										<Typography>{service?.interval || service?.heartbeat_interval || '-'}</Typography>
									</Grid>
									<Grid item xs={12} sm={6}>
										<Typography variant="subtitle2">Timeout</Typography>
										<Typography>{service?.timeout || '-'}</Typography>
									</Grid>
									<Grid item xs={12} sm={6}>
										<Typography variant="subtitle2">Retries</Typography>
										<Typography>{service?.retries ?? '-'}</Typography>
									</Grid>
									<Grid item xs={12} sm={6}>
										<Typography variant="subtitle2">Created</Typography>
										<Typography>{service?.created_at ? new Date(service.created_at).toLocaleString() : '-'}</Typography>
									</Grid>
									<Grid item xs={12} sm={6}>
										<Typography variant="subtitle2">Updated</Typography>
										<Typography>{service?.updated_at ? new Date(service.updated_at).toLocaleString() : '-'}</Typography>
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
								<Typography variant="subtitle2">Service ID</Typography>
								<Typography variant="body2">{serviceId}</Typography>
								{hostId && <>
									<Typography variant="subtitle2">Host ID</Typography>
									<Typography variant="body2">{hostId}</Typography>
								</>}
							</Stack>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</PageContainer>
	);
};

export default UnifiedServiceDetails;
