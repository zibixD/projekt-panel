import { DataGrid } from "@mui/x-data-grid"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { getAuthToken } from "../util/auth";

const columns = [
    { field: "name", headerName: "Nazwa firmy", width: 150},
    { field: "nip", headerName: "Numer nip firmy", width: 150},
    { field: "created", headerName: "Data utworzenia", width: 150},
]

const CompanyDetail = () => {
    const [details, setDetails] = useState([]);
    const params = useParams();

    useEffect(() => {
        fetch(`https://dev.pgitdev.pl/admin/companies/${params.companyName}`, {
            headers : { Authorization: `Bearer ${token}`}
        })
        .then((respone) => respone.json())
        .then((json) => setDetails(json))
    }, []);

    const token = getAuthToken()

    console.log(details)

    return (
        <>
            <h1>Szczegóły firmy</h1>
            <div style={{ height: 600, width: "100%" }}>
                <DataGrid rows={details} columns={columns} />
            </div>
        </>
    )
}

export default CompanyDetail