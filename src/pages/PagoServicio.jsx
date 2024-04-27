import React, { useState, useEffect } from "react";
import {  Alert,  Grid,  Paper,  TextField,  Button,  Box,  Autocomplete,} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const PagoServicio = () => {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const ruta_AWS = "https://58klaqxqtf.execute-api.us-east-1.amazonaws.com/test/DynamoDBManager";
  const navigate = useNavigate();
  const cookies = new Cookies();
  const usuario_logeado = cookies.get("session");

  const [delAlbum, setDelAlbum] = useState(null);
  const [modAlbum, setModAlbum] = useState(null);
  const [newAlbum, setNewAlbum] = useState(null);
  const [albums, setAlbums] = useState(null);
  const [error, setError] = useState(null);
  const [user, setUser] = useState({
    nombre: "",
    usuario: "",
    foto_perfil: null,
  });


  const albumes = [
    { title: "EEGSA", id: 1 },
    { title: "EMPAGUA", id: 2 },
    { title: "Servicio de Telefono", id: 3 },
    { title: "Basura", id: 4 },
    { title: "Multas MUNI", id: 5 },
  ];

  const modifyAlbum = async (e) => {
    e.preventDefault();

    const data = {
      operation: "PaymentServices",
        payload:{
          token: usuario_logeado?.token,
          amount: user.monto,
          detail: modAlbum,
        }
    };

    const endpoint = await fetch(`${ruta_AWS}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const resp = await endpoint.json();
    if (resp.statusCode != 200) {
      setError(JSON.parse(resp.body).message);
    } else {
      alert(JSON.parse(resp.body).message)
      setError(null);
    }
  };

  const volverPerfil = () => {
    navigate("/profile");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={4}
        justifyContent="center"
        alignItems="center"
        style={{ marginTop: "20px" }}
      >
        <Grid item xs={6}>
          <Item>
            <h1>Pagar Servicio</h1>
          </Item>
        </Grid>
        <Grid item xs={2}>
          <Item>
            <Button onClick={volverPerfil} variant="contained">
              <ArrowBackIcon />
              Volver
            </Button>
          </Item>
        </Grid>
      </Grid>

      <Grid container spacing={4} justifyContent="center" alignItems="center" style={{ marginTop: "20px" }}>
        
        <Grid item xs={8}>
          <Paper elevation={3} style={{ padding: 20 }}>
            <center>
              <h3>Servicios</h3>
            </center>
            <Autocomplete
              fullWidth
              options={albumes}
              getOptionLabel={(option) => option.title}
              onChange={(event, newValue) => setModAlbum(newValue?.title)}
              renderInput={(params) => <TextField {...params} label="Servicio" />}
              sx={{ marginBottom: "10px" }}
            />
            <TextField
              fullWidth
              label="Monto"
              id="nombre"
              name="nombre"
              onChange={(e) => setUser({ ...user, monto: e.target.value })}
              sx={{ marginBottom: "10px" }}
            />
            <center>
              <Button onClick={modifyAlbum} variant="contained" color="success">
                Pagar
              </Button>
            </center>
          </Paper>
        </Grid>
      </Grid>
      {error ? (
        <Alert variant="filled" severity="error">
          {error}
        </Alert>
      ) : (
        ""
      )}
    </Box>
  );
};

export default PagoServicio;
