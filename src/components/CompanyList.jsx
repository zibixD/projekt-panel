import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuthToken } from "../util/auth";

const columns = [
  { field: "name", headerName: "Nazwa firmy", width: 150 },
  { field: "nip", headerName: "NIP", width: 150 },
];

const CompanyList = () => {
  const [company, setCompany] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://dev.pgitdev.pl/admin/companies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((json) => setCompany(json));
  }, []);

  const token = getAuthToken();

  const doubleClickHandler = (idCompany) => {
    const foundCompany = company.find((c) => c.id == idCompany);
    const { id } = foundCompany;
    navigate(`${id}`)
  };

  return (
    <>
      <h1>Lista firm</h1>
      <div style={{ height: 600, width: "100%" }}>
        <DataGrid
          onRowDoubleClick={({ id }) => doubleClickHandler(id)}
          getRowId={(row) => row.id}
          rows={company}
          columns={columns}
        />
      </div>
    </>
  );
};

export default CompanyList;
