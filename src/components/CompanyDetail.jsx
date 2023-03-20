import { Card, Typography, Button } from "@mui/material";
import { Tabs, Tab } from "@mui/material";
import { TabPanel, TabContext } from "@mui/lab";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/system";
import { useLogout } from "../hooks/useLogout";

const columns = [
  { field: "id", headerName: "Identyfikator", width: 150 },
  { field: "admin", headerName: "Admin", width: 150 },
  { field: "name", headerName: "Imię", width: 150 },
  { field: "email", headerName: "Email", width: 150 },
];

const CompanyDetail = () => {
  const token = getAuthToken();
  const [details, setDetails] = useState(null);
  const [value, setValue] = useState(0);
  const [member, setMember] = useState([]);
  const params = useParams();
  const logout = useLogout();
  const navigate = useNavigate();

  // fetch danych

  useEffect(() => {
    fetch(`https://dev.pgitdev.pl/admin/companies/${params.id}`, {
      headers: { Authorization: `Bearer ` },
    })
      .then((response) => response.json())
      .then((json) => setDetails(json));
  }, []);

  // fetch pracowników

  useEffect(() => {
    fetch(`https://dev.pgitdev.pl/admin/companies/${params.id}/users`, {
      headers: { Authorization: `Bearer ` },
    })
      .then((response) => response.json())
      .then((json) => setMember(json));
  }, []);

  const changeHandler = (event, newValue) => {
    setValue(newValue);
  };

  const backHandler = () => {
    navigate(-1);
  };

  return (
    <>
      {details && (
        <>
          <Card
            sx={{
              display: "flex",
              backgroundColor: "primary.light",
              color: "white",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                height: 70,
                width: "100%",
                padding: 4,
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
                  {details?.apartmentNumber ? details.apartmentNumber : "Brak"}
                </Typography>
                <Typography variant="body1">
                  Kod pocztowy:{" "}
                  {details?.postalCode ? details.postalCode : "Brak"}
                </Typography>
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
      <Button
        sx={{
          display: "flex",
        }}
        onClick={backHandler}
      >
        Cofnij
      </Button>
    </>
  );
};

export default CompanyDetail;
