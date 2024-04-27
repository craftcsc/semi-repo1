import React, { useRef, useState } from 'react';
import { Alert, Button, FormControl, Grid, Paper, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

const Login = () => {
    const ruta_AWS = 'https://58klaqxqtf.execute-api.us-east-1.amazonaws.com/test/DynamoDBManager';
    const [error, setError] = useState(null);
    const [user, setUser] = useState({
        usuario: '',
        password: ''
    });

    const navigate = useNavigate();
    const cookies = new Cookies();
    const videoRef = useRef(null);

    const handleNavigate = () => {
        navigate('/profile');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            operation: "login",
            payload:{
                id: user.usuario,
                password: user.password
            }
        };

        const endpoint = await fetch(`${ruta_AWS}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Indica que estás enviando datos en formato JSON
            },
            body: JSON.stringify(data) // Convierte el objeto a JSON
        });

        const resp = await endpoint.json();
        
        if (resp.statusCode != 200) {
            setError(JSON.parse(resp.body).message);
        } else {
            setError(null);
            cookies.set('session', JSON.parse(resp.body).data);
            handleNavigate();
        }
    };

    const takePhoto = async () => {
        const video = videoRef.current;
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const context = canvas.getContext('2d');
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        let imageData = canvas.toDataURL('image/png');
        imageData = imageData.replace(/^data:image\/(jpeg|png|jpg);base64,/, '');
    
        // Enviar la foto al backend
        const requestBody = {
            operation: "login",
            payload:{
                id: user.usuario,
                photo: imageData,
                password: ""
            }
        };

        
    
        const endpoint = await fetch(`${ruta_AWS}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });
    
        const resp = await endpoint.json();


        if (resp.statusCode != 200) {
            setError(JSON.parse(resp.body).message);
        } else {
            setError(null);
            cookies.set('session', JSON.parse(resp.body).data);
            handleNavigate();
        }
    
        // Manejar la respuesta del backend aquí
    };

    const handleCameraAccess = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            videoRef.current.srcObject = stream;
        } catch (error) {
            console.error('Error accessing camera:', error);
        }
    };

    return (
        <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh', marginTop: 25 }}>
            <Grid item xs={12} sm={8} md={6} lg={4}>
                <Paper elevation={3} style={{ padding: 20 }}>
                    <form onSubmit={handleSubmit}>
                        <Grid container direction="column" spacing={2}>
                            <Grid item>
                                <div className="avatar" style={{ textAlign: 'center' }}>
                                    <img src="https://bit.ly/31pHqJb" alt="" />
                                </div>
                            </Grid>
                            <Grid item>
                                <div className="header">Ingresa tus datos</div>
                            </Grid>
                            <Grid item>
                                <FormControl fullWidth>
                                    <TextField
                                        label="Username"
                                        variant="outlined"
                                        onChange={(e) => setUser({ ...user, usuario: e.target.value })}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item>
                                <FormControl fullWidth>
                                    <TextField
                                        type="password"
                                        label="Password"
                                        variant="outlined"
                                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item>
                                <Button type="submit" variant="contained" color="primary" fullWidth>
                                    Login
                                </Button>
                                <Button variant="contained" color="primary" style={{ marginTop: 10, marginBottom: 10 }} onClick={handleCameraAccess} fullWidth>
                                    Face ID
                                </Button>
                                
                                <video ref={videoRef} style={{ width: '100%', maxHeight: '200px', objectFit: 'cover' }} autoPlay muted />

                                <Button variant="contained" color="primary" style={{ marginBottom: 10 }} onClick={takePhoto} fullWidth>
                                    Enviar Foto
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                    {error ? <Alert variant="filled" severity="error">{error}</Alert> : ''}
                </Paper>
            </Grid>
        </Grid>
    );
};

export default Login;
