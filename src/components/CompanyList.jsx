import { Box, Card, Typography, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "../hooks/useIsMobile";
import { useLogout } from "../hooks/useLogout";
import { getCompaniesList } from "../store/panel-actions";
// import DebugButton from "./DebugButton";
import { ExitToApp } from "@mui/icons-material";
import LoadingEffect from "../UI/LoadingCircle";

const columns = [
  { field: "name", headerName: "Nazwa firmy", width: 150 },
  { field: "nip", headerName: "NIP", width: 150 },
];

const CompanyList = () => {
  const companies = useSelector((state) => state.company.companies);
  const error = useSelector((state) => state.ui.error);
  const isLoadingCompanies = useSelector((state) => state.company.isLoadingCompanies);
  const navigate = useNavigate();
  const logout = useLogout();
  const isMobile = useIsMobile();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCompaniesList());
  }, []);

  useEffect(() => {
    if (error.visible && error.message == "Nie znaleziono firmy") {
      navigate("/firmy");
    }
  }, [error]);

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
          // flexDirection: { xs: "column", sm: "row" },
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
            width: { xs: "100%", sm: "20%" },
            // paddingRight: { sm: 13.5 },
            paddingRight:  13.5 ,
            fontSize: 20,
            // width: "10%"
          }}
        >
          <ExitToApp sx={{ mr: 1 }} />
          Wyloguj
        </Button>
        {/* <DebugButton /> */}
      </Card>
      <Box
        sx={{
          height: 600,
          width: "100%",
          boxShadow: 5,
        }}
      >

        {isLoadingCompanies ? 
        
        (
          <Box 
            sx={{
              width: "100vw",
              height: "60vh",
              display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}
          >
            <LoadingEffect/>
          </Box>
          )
          : (
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
        )}

      </Box>
    </>
  );
};

export default CompanyList;
