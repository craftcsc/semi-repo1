import React, { useState } from "react";
import { Alert, Grid, Paper, TextField, FormControl, Button, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { DataGrid } from '@mui/x-data-grid';

const Historial = () => {
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

  const [error, setError] = useState(null);
  const [user, setUser] = useState({
    nombre: "",
    usuario: "",
    foto_perfil: null,
    password: "",
    usuario_destino: "",
    monto: null,
    descripcion: ""
  });

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'firstName', headerName: 'Usuario destino', width: 200 },
    { field: 'lastName', headerName: 'Monto', width: 200 },
    { field: 'age', headerName: 'Descripcion', width: 400 },
  ];

  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("token", usuario_logeado?.id);
    formData.append("destinationId", user.usuario_destino);
    formData.append("amount", user.monto);
    formData.append("detail", user.descripcion);

    const endpoint = await fetch(`${ruta_AWS}`, {
      method: "POST",
      body: formData,
    });

    const resp = await endpoint.json();
    if (endpoint.status != 200) {
      setError(resp.mensaje);
    } else {
      //   cookies.remove("session");
      //   cookies.set('session', resp);
      //   cookies.update()
      alert(resp.mensaje)
      setError(null);
    }
  };

  const volverPerfil = () => {
    navigate("/profile");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={4} justifyContent="center" alignItems="center" style={{ marginTop: "20px" }}>
          <Grid item xs={6}>
            <Item>
              <h1>Historial de transferencias</h1>
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
              <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={5}
                  rowsPerPageOptions={[5, 10, 20]}
                />
              </div>
            </Paper>
          </Grid>
        </Grid>
      </form>
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

export default Historial;
