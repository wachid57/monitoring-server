import React, { useState } from 'react';
import Grid from '@mui/material/Grid2';
import Button from '@mui/material/Button';
import { BACKEND_URL, API_PREFIX } from 'src/config/constants';
import CustomFormLabel from '../../../../components/forms/theme-elements/CustomFormLabel';
import CustomTextField from '../../../../components/forms/theme-elements/CustomTextField';

// ✅ helper auth
import {
    getAuthHeaders,
    isTokenExpired,
    handleAuthError,
    clearAuthData,
} from 'src/utils/auth';

export default function AddHostGroupForm() {
    const [form, setForm] = useState({
        groupName: '',
        alias: '',
        hostID: '',      // tipe string di form, nanti di backend parse ke uint
        groupsTags: '',
        keterangan: '',
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isTokenExpired()) {
            clearAuthData();
            window.location.href = '/auth/login';
            return;
        }

        setLoading(true);
        try {
            const res = await fetch(`${BACKEND_URL}${API_PREFIX}/hosts/groups`, {
                method: 'POST',
                headers: {
                    ...getAuthHeaders(),
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    group_name: form.groupName,
                    alias: form.alias,
                    host_id: parseInt(form.hostID, 10) || 0,
                    groups_tags: form.groupsTags,
                    keterangan: form.keterangan,
                }),
            });

            if (!res.ok) {
                handleAuthError({ status: res.status });
                throw new Error(`Failed to save host group: ${res.status}`);
            }

            // reset form bila sukses
            setForm({
                groupName: '',
                alias: '',
                hostID: '',
                groupsTags: '',
                keterangan: '',
            });
            alert('Host Group berhasil ditambahkan');
        } catch (err) {
            console.error(err);
            alert('Gagal menambahkan Host Group');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                {/* Group Name */}
                <Grid size={12}>
                    <CustomFormLabel htmlFor="groupName">Group Name</CustomFormLabel>
                </Grid>
                <Grid size={12}>
                    <CustomTextField
                        id="groupName"
                        name="groupName"
                        value={form.groupName}
                        onChange={handleChange}
                        placeholder="Nama group, misal: Web Servers"
                        fullWidth
                    />
                </Grid>

                {/* Alias */}
                <Grid size={12}>
                    <CustomFormLabel htmlFor="alias">Alias</CustomFormLabel>
                </Grid>
                <Grid size={12}>
                    <CustomTextField
                        id="alias"
                        name="alias"
                        value={form.alias}
                        onChange={handleChange}
                        placeholder="Alias group, misal: Production Cluster"
                        fullWidth
                    />
                </Grid>

                {/* Host ID */}
                <Grid size={12}>
                    <CustomFormLabel htmlFor="hostID">Host ID</CustomFormLabel>
                </Grid>
                <Grid size={12}>
                    <CustomTextField
                        id="hostID"
                        name="hostID"
                        type="number"
                        value={form.hostID}
                        onChange={handleChange}
                        placeholder="ID host yang terkait"
                        fullWidth
                    />
                </Grid>

                {/* Groups Tags */}
                <Grid size={12}>
                    <CustomFormLabel htmlFor="groupsTags">Groups Tags</CustomFormLabel>
                </Grid>
                <Grid size={12}>
                    <CustomTextField
                        id="groupsTags"
                        name="groupsTags"
                        value={form.groupsTags}
                        onChange={handleChange}
                        placeholder="production,linux"
                        fullWidth
                    />
                </Grid>

                {/* Keterangan */}
                <Grid size={12}>
                    <CustomFormLabel htmlFor="keterangan">Keterangan</CustomFormLabel>
                </Grid>
                <Grid size={12}>
                    <CustomTextField
                        id="keterangan"
                        name="keterangan"
                        value={form.keterangan}
                        onChange={handleChange}
                        placeholder="Catatan tambahan"
                        multiline
                        fullWidth
                    />
                </Grid>

                {/* Submit */}
                <Grid size={12} mt={3}>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? 'Menyimpan...' : 'Tambah Host Group'}
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
}
