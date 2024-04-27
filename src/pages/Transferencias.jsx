import React, { useState } from "react";
import {Alert, Grid,Paper,TextField,FormControl,Button,Box} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Transferencias = () => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const requestBody = {
      operation: "easytransfer",
        payload:{
          token: usuario_logeado?.token,
          destinationId: user.usuario_destino,
          amount: user.monto,
          detail: user.descripcion
        }
    };
  
    const endpoint = await fetch(`${ruta_AWS}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestBody)
    });
  
    const resp = await endpoint.json();

    console.log(resp);
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
      <form onSubmit={handleSubmit}>
        <Grid container spacing={4} justifyContent="center" alignItems="center" style={{ marginTop: "20px" }}>
          <Grid item xs={6}>
            <Item>
              <h1>Transferencia</h1>
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
              <FormControl fullWidth>
                <TextField
                  fullWidth
                  label={"Usuario destino "}
                  variant="outlined"
                  name="nombre"
                  onChange={(e) => setUser({ ...user, usuario_destino: e.target.value })}
                  sx={{ marginBottom: "10px" }}
                />
                <TextField
                  fullWidth
                  label={"Monto"}
                  variant="outlined"
                  name="usuario"
                  onChange={(e) =>
                    setUser({ ...user, monto: e.target.value })
                  }
                  sx={{ marginBottom: "10px" }}
                />
                <TextField
                  fullWidth
                  label="Descripcion"
                  variant="outlined"
                  name="password"
                  onChange={(e) =>
                    setUser({ ...user, descripcion: e.target.value })
                  }
                  sx={{ marginBottom: "10px" }}
                />
                <br></br>
                <br></br>
                <center>
                  <Button type="submit" variant="contained" color="success">
                    Enviar transferencia
                  </Button>
                </center>
              </FormControl>
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

export default Transferencias;
