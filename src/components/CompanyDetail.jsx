import { Card, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Tabs, Tab } from "@mui/material";
import { TabPanel, TabContext } from "@mui/lab";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAuthToken } from "../util/auth";

const CompanyDetail = () => {
  const token = getAuthToken();
  const [details, setDetails] = useState(null);
  const [value, setValue] = useState(0);
  const params = useParams();

  useEffect(() => {
    fetch(`https://dev.pgitdev.pl/admin/companies/${params.id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((json) => setDetails(json));
  }, []);

  const changeHandler = (event, newValue) => {
    setValue(newValue);
  };

  console.log(value);

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
                <Typography variant="h1">Elo</Typography>
              </TabPanel>
            </Card>
          </TabContext>
        </>
      )}
    </>
  );
};

export default CompanyDetail;
