import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAuthToken } from "../util/auth";

const CompanyDetail = () => {
  const token = getAuthToken();
  const [details, setDetails] = useState(null);
  const params = useParams();

  useEffect(() => {
    fetch(`https://dev.pgitdev.pl/admin/companies/${params.id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((json) => setDetails(json));
  }, []);

  return (
    <>
      <h1>Szczegóły firmy</h1>
      <div style={{ height: 600, width: "100%" }}></div>
    </>
  );
};

export default CompanyDetail;
