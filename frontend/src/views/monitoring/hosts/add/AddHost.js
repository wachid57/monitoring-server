import React, { useState } from 'react';
import Grid from '@mui/material/Grid2';
import Button from '@mui/material/Button';
import { BACKEND_URL, API_PREFIX } from 'src/config/constants';
import CustomFormLabel from '../../../../components/forms/theme-elements/CustomFormLabel';
import CustomTextField from '../../../../components/forms/theme-elements/CustomTextField';

// ✅ import helper dari utils/auth
import {
    getAuthHeaders,
    isTokenExpired,
    handleAuthError,
    clearAuthData,
} from 'src/utils/auth';

export default function AddHostForm() {
    const [form, setForm] = useState({
        ip: '',
        hostname: '',
        alias: '',
        deskripsi: '',
        service: '',
        hostsTags: '',
        keterangan: '',
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // ✅ cek token expired sebelum request
        if (isTokenExpired()) {
            clearAuthData();
            window.location.href = '/auth/login';
            return;
        }

        setLoading(true);
        try {
            const res = await fetch(`${BACKEND_URL}${API_PREFIX}/hosts`, {
                method: 'POST',
                headers: getAuthHeaders(), // ✅ header otomatis dgn Authorization Bearer
                body: JSON.stringify(form),
            });

            if (!res.ok) {
                // ✅ tangani 401/403
                handleAuthError({ status: res.status });
                throw new Error(`Failed to save host: ${res.status}`);
            }

            // reset form bila sukses
            setForm({
                ip: '',
                hostname: '',
                alias: '',
                deskripsi: '',
                service: '',
                hostsTags: '',
                keterangan: '',
            });
            alert('Host berhasil ditambahkan');
        } catch (err) {
            console.error(err);
            alert('Gagal menambahkan host');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                {/* IP */}
                <Grid size={12}>
                    <CustomFormLabel htmlFor="ip">IP</CustomFormLabel>
                </Grid>
                <Grid size={12}>
                    <CustomTextField
                        id="ip"
                        name="ip"
                        value={form.ip}
                        onChange={handleChange}
                        placeholder="192.168.0.1"
                        fullWidth
                    />
                </Grid>

                {/* Hostname */}
                <Grid size={12}>
                    <CustomFormLabel htmlFor="hostname">Hostname</CustomFormLabel>
                </Grid>
                <Grid size={12}>
                    <CustomTextField
                        id="hostname"
                        name="hostname"
                        value={form.hostname}
                        onChange={handleChange}
                        placeholder="server01.local"
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
                        placeholder="Server Utama"
                        fullWidth
                    />
                </Grid>

                {/* Deskripsi */}
                <Grid size={12}>
                    <CustomFormLabel htmlFor="deskripsi">Deskripsi</CustomFormLabel>
                </Grid>
                <Grid size={12}>
                    <CustomTextField
                        id="deskripsi"
                        name="deskripsi"
                        value={form.deskripsi}
                        onChange={handleChange}
                        placeholder="Deskripsi singkat host"
                        multiline
                        fullWidth
                    />
                </Grid>

                {/* Service */}
                <Grid size={12}>
                    <CustomFormLabel htmlFor="service">Service</CustomFormLabel>
                </Grid>
                <Grid size={12}>
                    <CustomTextField
                        id="service"
                        name="service"
                        value={form.service}
                        onChange={handleChange}
                        placeholder="Web, Database, dll"
                        fullWidth
                    />
                </Grid>

                {/* HostsTags */}
                <Grid size={12}>
                    <CustomFormLabel htmlFor="hostsTags">Tags</CustomFormLabel>
                </Grid>
                <Grid size={12}>
                    <CustomTextField
                        id="hostsTags"
                        name="hostsTags"
                        value={form.hostsTags}
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
                        {loading ? 'Menyimpan...' : 'Tambah Host'}
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
}
