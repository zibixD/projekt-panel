import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuthToken } from "../util/auth";

const columns = [
  { field: "name", headerName: "Nazwa firmy", width: 150 },
  { field: "nip", headerName: "NIP", width: 150 },
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

  return (
    <>
      <Typography variant="h4">Lista firm</Typography>
      <Box sx={{ height: 600, width: "100%" }}>
        <DataGrid
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
