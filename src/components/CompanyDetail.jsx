import { Card, Typography, Button, CircularProgress } from "@mui/material";
import { Tabs, Tab } from "@mui/material";
import { TabPanel, TabContext } from "@mui/lab";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/system";
import { useLogout } from "../hooks/useLogout";
import { useDispatch, useSelector } from "react-redux";
import { fetchCompanyUsers, fetchCompanyData } from "../store/panel-actions";
import HomeIcon from "../UI/HomeIcon";

const columns = [
  { field: "id", headerName: "Identyfikator", width: 150 },
  { field: "admin", headerName: "Admin", width: 150 },
  { field: "name", headerName: "Imię", width: 150 },
  { field: "email", headerName: "Email", width: 150 },
];

const CompanyDetail = () => {
  const details = useSelector((state) => state.company.details);
  const isLoadingDetails = useSelector(
    (state) => state.company.isLoadingDetails
  );
  const [value, setValue] = useState(0);
  const member = useSelector((state) => state.company.users);
  const error = useSelector((state) => state.ui.error);
  const params = useParams();
  const logout = useLogout();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCompanyData(params.id));
    dispatch(fetchCompanyUsers(params.id));
  }, [params]);

  useEffect(() => {
    if (error.visible && error.message == "Nie znaleziono firmy") {
      navigate("/firmy");
    }
  }, [error]);

  const changeHandler = (_event, newValue) => {
    setValue(newValue);
  };

  const backHandler = () => {
    navigate(-1);
  };

  const editHandler = () => {
    navigate(`/firmy/${params.id}/edit`)
  }

  return (
    <>
      {isLoadingDetails ? (
        <Box
          sx={{
            display: "flex",
            placeContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          {details && (
            <>
              <Card
                sx={{
                  display: "flex",
                  backgroundColor: "primary.light",
                  color: "white",
                  alignItems: "center"
                }}
              >
                <Box
                  onClick={backHandler}
                  sx={{
                    paddingLeft: 4,
                  }}
                >
                  <HomeIcon />
                </Box>
                <Typography
                  variant="h4"
                  sx={{
                    height: 50,
                    width: "100%",
                    padding: 6,
                  }}
                >
                  {details?.name ? details.name : "Nie podano"}
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
              </Card>
              <Tabs
                value={value}
                onChange={changeHandler}
                aria-label="basic tabs example"
              >
                <Tab label="Szczegóły firmy" />
                <Tab label="Pracownicy" />
              </Tabs>
              <TabContext value={value}>
                <Card
                  sx={{
                    padding: 5,
                    boxShadow: 5,
                  }}
                >
                  <TabPanel value={0}>
                    <Typography variant="h5">
                      Nazwa firmy: {details?.name ? details.name : "Brak"}
                    </Typography>
                    <Typography variant="body1">
                      NIP: {details?.nip ? details.nip : "Brak"}
                    </Typography>
                    <Typography variant="body1">
                      Miasto: {details?.city ? details.city : "Brak"}
                    </Typography>
                    <Typography variant="body1">
                      Ulica: {details?.street ? details.street : "Brak"}
                    </Typography>
                    <Typography variant="body1">
                      Numer domu:{" "}
                      {details?.houseNumber ? details.houseNumber : "Brak"}
                    </Typography>
                    <Typography variant="body1">
                      Numer lokalu:{" "}
                      {details?.apartmentNumber
                        ? details.apartmentNumber
                        : "Brak"}
                    </Typography>
                    <Typography variant="body1">
                      Kod pocztowy:{" "}
                      {details?.postalCode ? details.postalCode : "Brak"}
                    </Typography>
                    <Button variant="contained" size="medium" onClick={editHandler} sx={{
                      marginTop: 2 
                    }} >Edytuj
                    </Button>
                  </TabPanel>
                  <TabPanel value={1}>
                    <Box style={{ height: 500 }}>
                      <DataGrid rows={member} columns={columns} />
                    </Box>
                  </TabPanel>
                </Card>
              </TabContext>
            </>
          )}
        </>
      )}
    </>
  );
};

export default CompanyDetail;
