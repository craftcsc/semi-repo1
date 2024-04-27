import React, { useState } from 'react';
import { Alert, Grid, Paper, TextField, Button, Box, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Profile = () => {

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    // useEffect(() => {getTags();}, []);



    const ruta_AWS = 'https://58klaqxqtf.execute-api.us-east-1.amazonaws.com/test/DynamoDBManager';
    const navigate = useNavigate();
    const cookies = new Cookies();
    const usuario_logeado = cookies.get('session');
    console.log(usuario_logeado);



    const [error, setError] = useState(null);
    const [user, setUser] = useState({
        nombre: '',
        usuario: '',
        foto_perfil: null
    });


    const transferencia = () => {
        navigate("/transferencias");
    }

    const historials = () => {
        navigate("/historial");
    }

    const pagoServicio = () => {
        navigate("/pagoservicio");
    }
    
    const chatBot = () => {
        navigate("/chat");
    }





    return (
        <Box sx={{ flexGrow: 1 }}>

            <Grid container spacing={4} justifyContent="center" alignItems="center" style={{ marginTop: '1px' }}>
                <Grid item xs={8}>
                    <Item >
                        <h1>Perfil</h1>
                    </Item>
                </Grid>
            </Grid>

            <Grid container spacing={4} justifyContent="center" alignItems="center" style={{ marginTop: '20px' }}>
                <Grid item xs={4}>
                    <Item >

                        <img src={usuario_logeado?.photo} alt="Foto de perfil" style={{ width: '100%', height: 'auto' }} />

                    </Item>

                </Grid>
                <Grid item xs={4} >
                    <Item sx={{ '& button': { m: 2 } }}>
                        <TextField
                            fullWidth
                            label="Nombre"
                            id="nombre"
                            name="nombre"
                            value={usuario_logeado?.name}
                            onChange={(e) => setUser({ ...user, nombre: e.target.value })}
                            sx={{ marginBottom: '10px' }}
                            disabled
                        />
                        <TextField
                            fullWidth
                            label="Saldo"
                            id="saldo"
                            name="saldo"
                            value={usuario_logeado?.saldo}
                            onChange={(e) => setUser({ ...user, usuario: e.target.value })}
                            sx={{ marginBottom: '10px' }}
                            disabled
                        />

                    </Item>

                    <br></br>

                    {/* <Item sx={{ '& button': { m: 2 } }}>
                        
                        <h4>Características:</h4>
                        <br></br>

                        <Grid container spacing={1}>
                            {usuario_logeado?.features.map((feature, index) => (
                                <Grid item key={index}>
                                    <Chip label={feature} variant="outlined" />
                                </Grid>
                            ))}
                        </Grid>

                        

                    </Item> */}

                </Grid>
            </Grid>


            <Grid container spacing={4} justifyContent="center" alignItems="center" style={{ marginTop: '20px' }}>


                <Grid item xs={8}>
                    <Item>
                        <Button onClick={transferencia} variant="contained" color="success" sx={{ mr: 3 }}>
                            Transferencias
                        </Button>
                        <Button onClick={historials} variant="contained" color="success" sx={{ mr: 3 }}>
                            Historial
                        </Button>
                        <Button onClick={pagoServicio} variant="contained" color="success" sx={{ mr: 3 }}>
                            Pago de servicios
                        </Button>
                        <Button onClick={chatBot} variant="contained" color="success" sx={{ mr: 3 }}>
                            FAQ Bot
                        </Button>
                    </Item>

                </Grid>
            </Grid>
        </Box>
    );
};

export default Profile;
