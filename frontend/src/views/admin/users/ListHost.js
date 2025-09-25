import React, { useEffect, useState } from 'react';
import {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Typography,
    Box,
    CircularProgress,
    Paper,
} from '@mui/material';
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table';
import DownloadCard from 'src/components/shared/DownloadCard';
import { API_PREFIX, BACKEND_URL } from '../../../config/constants';

// -------- Komponen Utama ----------
export default function HostList() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    // ambil data dari backend
    useEffect(() => {
        const fetchHosts = async () => {
            try {
                const token = localStorage.getItem('token'); // ambil token dari localStorage

                const res = await fetch(`${BACKEND_URL}${API_PREFIX}/hosts`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`, // kirim token ke BE
                    },
                });

                if (!res.ok) {
                    throw new Error(`Fetch hosts failed: ${res.status}`);
                }

                const json = await res.json();
                setData(json);
            } catch (err) {
                console.error('Error fetch hosts:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchHosts();
    }, []);

    const columnHelper = createColumnHelper();
    const columns = [
        columnHelper.accessor('ip', {
            header: () => 'IP',
            cell: (info) => <Typography variant="body1">{info.getValue()}</Typography>,
        }),
        columnHelper.accessor('hostname', {
            header: () => 'Hostname',
            cell: (info) => <Typography variant="body1">{info.getValue()}</Typography>,
        }),
        columnHelper.accessor('alias', {
            header: () => 'Alias',
            cell: (info) => <Typography variant="body1">{info.getValue()}</Typography>,
        }),
        columnHelper.accessor('deskripsi', {
            header: () => 'Deskripsi',
            cell: (info) => (
                <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 250 }}>
                    {info.getValue()}
                </Typography>
            ),
        }),
        columnHelper.accessor('service', {
            header: () => 'Service',
            cell: (info) => <Typography variant="body1">{info.getValue()}</Typography>,
        }),
        columnHelper.accessor('hostsTags', {
            header: () => 'Tags',
            cell: (info) => <Typography variant="body2">{info.getValue()}</Typography>,
        }),
        columnHelper.accessor('keterangan', {
            header: () => 'Keterangan',
            cell: (info) => (
                <Typography variant="body2" color="text.secondary">
                    {info.getValue()}
                </Typography>
            ),
        }),
        columnHelper.accessor('createdAt', {
            header: () => 'Created At',
            cell: (info) => new Date(info.getValue()).toLocaleString(),
        }),
        columnHelper.accessor('updatedAt', {
            header: () => 'Updated At',
            cell: (info) => new Date(info.getValue()).toLocaleString(),
        }),
    ];

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    const handleDownload = () => {
        const headers = columns.map((col) =>
            typeof col.header === 'function' ? col.header() : col.header
        );
        const rows = data.map((row) =>
            columns.map((col) => {
                const key = col.accessorKey;
                return row[key];
            })
        );
        const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.setAttribute('download', 'hosts.csv');
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <DownloadCard title="Daftar Host" onDownload={handleDownload}>
            <Paper variant="outlined">
                <TableContainer>
                    <Table sx={{ whiteSpace: 'nowrap' }}>
                        <TableHead>
                            {table.getHeaderGroups().map((hg) => (
                                <TableRow key={hg.id}>
                                    {hg.headers.map((header) => (
                                        <TableCell key={header.id}>
                                            <Typography variant="subtitle1" fontWeight={600}>
                                                {flexRender(header.column.columnDef.header, header.getContext())}
                                            </Typography>
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHead>
                        <TableBody>
                            {table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </DownloadCard>
    );
}
