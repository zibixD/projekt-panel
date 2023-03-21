import { Box, Card, Typography, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "../hooks/useIsMobile";
import { useLogout } from "../hooks/useLogout";
import { getCompaniesList } from "../store/panel-actions";
import DebugButton from "./DebugButton";

const columns = [
  { field: "name", headerName: "Nazwa firmy", width: 150 },
  { field: "nip", headerName: "NIP", width: 150 },
];

const CompanyList = () => {
  const companies = useSelector((state) => state.company.companies);
  const navigate = useNavigate();
  const logout = useLogout();
  const isMobile = useIsMobile();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCompaniesList());
  }, []);

  const doubleClickHandler = (idCompany) => {
    const foundCompany = companies.find((c) => c.id == idCompany);
    const { id } = foundCompany;
    navigate(`${id}`);
  };

  return (
    <>
      <Card
        sx={{
          backgroundColor: "primary.light",
          display: "flex",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            backgroundColor: "primary.light",
            color: "white",
            height: 50,
            width: "100%",
            padding: 6,
          }}
        >
          Lista firm
        </Typography>
        <Button
          onClick={logout}
          sx={{
            color: "white",
            width: 250,
            paddingRight: 2,
            fontSize: 20,
          }}
        >
          Wyloguj
        </Button>
        <DebugButton />
      </Card>
      <Box
        sx={{
          height: 600,
          width: "100%",
          boxShadow: 5,
        }}
      >
        <DataGrid
          sx={{
            padding: 1,
          }}
          onRowClick={
            isMobile ? ({ row }) => doubleClickHandler(row.id) : undefined
          }
          onRowDoubleClick={({ id }) => doubleClickHandler(id)}
          getRowId={(row) => row.id}
          rows={companies}
          columns={columns}
        />
      </Box>
    </>
  );
};

export default CompanyList;
