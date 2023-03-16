import { Card, Typography } from "@mui/material";
import { Tabs, Tab } from "@mui/material";
import { TabPanel, TabContext } from "@mui/lab";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAuthToken } from "../util/auth";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/system";

const columns = [
    { field: "id", headerName: "Identyfikator", width: 150 },
    { field: "admin", headerName: "Admin", width: 150 },
    { field: "name", headerName: "Imię", width: 150 },
    { field: "email", headerName: "Email", width: 150 },
]

const CompanyDetail = () => {
  const token = getAuthToken();
  const [details, setDetails] = useState(null);
  const [value, setValue] = useState(0);
  const [member, setMember ] = useState([]);
  const params = useParams();

  // fetch danych
  
  useEffect(() => {
    fetch(`https://dev.pgitdev.pl/admin/companies/${params.id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((json) => setDetails(json));
  }, []);

    // fetch pracowników

    useEffect(() => {
        fetch(`https://dev.pgitdev.pl/admin/companies/${params.id}/users`, {
            headers: { Authorization: `Bearer ${token}`},
        })
        .then((response) => response.json())
        .then((json) => setMember(json))

    }, [])

  const changeHandler = (event, newValue) => {
    setValue(newValue);
  };
  
  return (
    <>
      {details && (
        <>
          <Typography sx={{ fontSize: 40 }}>
            Szczegóły firmy - {details?.name ? details.name : "Nie podano"}
          </Typography>
          <Tabs
            value={value}
            onChange={changeHandler}
            aria-label="basic tabs example"
          >
            <Tab label="Szczegóły firmy" />
            <Tab label="Pracownicy" />
          </Tabs>
          <TabContext value={value}>
            <Card sx={{ padding: 5 }}>
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
                <Box style={{ height: 500}}>
                <DataGrid rows={member} columns={columns}   />
                </Box>
              </TabPanel>
            </Card>
          </TabContext>
        </>
      )}
    </>
  );
};

export default CompanyDetail;
