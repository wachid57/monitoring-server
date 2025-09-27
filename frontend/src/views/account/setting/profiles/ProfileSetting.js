import { useState } from "react";
import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Grid,
    TextField,
    Typography,
} from "@mui/material";

export default function ProfileSettingsPage() {
    const rawUser = localStorage.getItem("user");
    const user = rawUser ? JSON.parse(rawUser) : {};

    const [formData, setFormData] = useState({
        name: user.Name || "",
        username: user.Username || "",
        email: user.Email || "",
    });

    const handleChange = (key, value) =>
        setFormData(prev => ({ ...prev, [key]: value }));

    const handleSave = () => {
        // Simpan lagi ke localStorage (atau kirim ke backend kalau sudah ada)
        localStorage.setItem("user", JSON.stringify(formData));
        alert("Profile updated (local only)!");
    };

    return (
        <Box sx={{ maxWidth: 900, mx: "auto", p: 2 }}>
            <Card sx={{ mb: 3, borderRadius: 4, overflow: "hidden" }}>
                <Box
                    sx={{
                        height: 180,
                        background: "linear-gradient(120deg,#a1c4fd,#c2e9fb)",
                        position: "relative",
                    }}
                >
                    <Avatar
                        src="/avatar.png"
                        sx={{
                            width: 120,
                            height: 120,
                            border: "4px solid white",
                            position: "absolute",
                            left: "50%",
                            bottom: -60,
                            transform: "translateX(-50%)",
                        }}
                    />
                </Box>
                <Box sx={{ textAlign: "center", mt: 8, pb: 3 }}>
                    <Typography variant="h5">{formData.Name}</Typography>
                    <Typography color="text.secondary">@{formData.Username}</Typography>
                    <Typography color="text.secondary">{formData.email}</Typography>
                </Box>
                <Grid container justifyContent="center" spacing={4} sx={{ pb: 3 }}>
                    <Grid item>
                        <Typography variant="subtitle1" align="center">938</Typography>
                        <Typography variant="body2" color="text.secondary">Posts</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="subtitle1" align="center">3,586</Typography>
                        <Typography variant="body2" color="text.secondary">Followers</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="subtitle1" align="center">2,659</Typography>
                        <Typography variant="body2" color="text.secondary">Following</Typography>
                    </Grid>
                </Grid>
            </Card>

            <Card sx={{ borderRadius: 4 }}>
                <CardContent>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        Edit Profile Settings
                    </Typography>
                    {Object.keys(formData).map(key => (
                        <TextField
                            key={key}
                            fullWidth
                            margin="normal"
                            label={key}
                            value={formData[key]}
                            onChange={e => handleChange(key, e.target.value)}
                        />
                    ))}
                    <Button variant="contained" onClick={handleSave} sx={{ mt: 2 }}>
                        Save Changes
                    </Button>
                </CardContent>
            </Card>
        </Box>
    );
}
