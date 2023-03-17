import { Box, Card, Typography, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import { Form, useNavigate } from "react-router-dom";
import { getAuthToken } from "../util/auth";

const columns = [
  { field: "name", headerName: "Nazwa firmy", width: 200 },
  { field: "nip", headerName: "NIP", width: 200},
];

const CompanyList = () => {
  const token = getAuthToken();
  const [company, setCompany] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://dev.pgitdev.pl/admin/companies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((json) => setCompany(json));
  }, []);

  const doubleClickHandler = (idCompany) => {
    const foundCompany = company.find((c) => c.id == idCompany);
    const { id } = foundCompany;
    navigate(`${id}`);
  };

  // const logoutHandler = () => {

  // }

  return (
    <>
    <Card sx={{
      backgroundColor: 'primary.light',
      display: 'flex',
      }}>
      <Typography variant="h4" sx={{
        backgroundColor: 'primary.light',
        color: 'white',
        height: 70,
        width: '100%',
        padding: 4
        }}>Lista firm</Typography>
        <Form action="logout">
          <Button sx={{
            color: "white",
            width: 250,
            paddingRight: 2,
            fontSize: 20
          }} > Wyloguj</Button>
        </Form>
    </Card>
      <Box sx={{ 
        height: 600,
        width: "100%",
        boxShadow: 5,
        }}>
        <DataGrid sx={{
          padding: 1
        }}
          onRowDoubleClick={({ id }) => doubleClickHandler(id)}
          getRowId={(row) => row.id}
          rows={company}
          columns={columns}
        />
      </Box>
    </>
  );
};

export default CompanyList;
