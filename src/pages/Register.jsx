import React, { useRef, useState } from 'react';
import { Alert, Button, Grid, Paper, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

const Register = () => {
    const navigate = useNavigate();
    const ruta_AWS = 'https://58klaqxqtf.execute-api.us-east-1.amazonaws.com/test/DynamoDBManager';
    const [error, setError] = useState(null);
    const [user, setUser] = useState({
        nombre: '',
        usuario: '',
        foto_perfil: null,
        password: '',
        pass_confirm: ''
    });

    const handleNavigate = () => {
        navigate('/login');
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            let base64String = reader.result;
            // Encuentra la posición del primer coma que separa el tipo de archivo y los datos base64
            const commaIndex = base64String.indexOf(",");
            // Recorta la cadena después del primer coma para eliminar el prefijo
            if (commaIndex !== -1) {
                base64String = base64String.slice(commaIndex + 1);
            }
            setUser({ ...user, foto_perfil: base64String });
        };
        
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Generar saldo aleatorio entre 1000 y 2000
        const saldo = Math.floor(Math.random() * (4000 - 2000 + 1)) + 3000;

        const requestBody = {
            operation: "register",
            payload:{
                id: user.usuario,
                name: user.nombre,
                imagen: user.foto_perfil,
                password: user.password,
                saldo: saldo
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
        if (resp.statusCode == 400) {
            setError(JSON.parse(resp.body).message);
        } else {
            setError(null);
            alert('¡Registrado correctamente!');
            handleNavigate();
        }
    };

    return (
        <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
            <Grid item xs={12} sm={8} md={6} lg={4}>
                <Paper elevation={3} style={{ padding: 20 }}>
                    <form onSubmit={handleSubmit}>
                        <Grid container direction="column" spacing={2}>
                            <Grid item>
                                <div className="avatar" style={{ textAlign: 'center' }}>
                                    <img
                                        src={'https://cdn-icons-png.flaticon.com/512/2433/2433214.png'}
                                        alt=""
                                        style={{ width: '150px', height: 'auto' }}
                                    />
                                </div>
                            </Grid>
                            <Grid item>
                                <div className="header">Completa tu información</div>
                            </Grid>
                            <Grid item>
                                <TextField
                                    label="Nombre"
                                    variant="outlined"
                                    fullWidth
                                    onChange={(e) => setUser({ ...user, nombre: e.target.value })}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    label="Usuario"
                                    variant="outlined"
                                    fullWidth
                                    onChange={(e) => setUser({ ...user, usuario: e.target.value })}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    type="file"
                                    label=""
                                    variant="outlined"
                                    fullWidth
                                    onChange={handleFileChange}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    type="password"
                                    label="Password"
                                    variant="outlined"
                                    fullWidth
                                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    type="password"
                                    label="Confirmar Password"
                                    variant="outlined"
                                    fullWidth
                                    onChange={(e) => setUser({ ...user, pass_confirm: e.target.value })}
                                />
                            </Grid>
                            <Grid item>
                                <Button type="submit" variant="contained" color="primary" fullWidth>
                                    Registrar
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

export default Register;
