import { DataGrid } from '@mui/x-data-grid';
import { useState, useCallback, useEffect } from 'react';
import { json, redirect, useNavigate, useParams, useRouteLoaderData } from 'react-router-dom'
import { getAuthToken} from '../util/auth';
import { Link } from 'react-router-dom';
// import { Params } from 'react-router-dom';

const columns = [
    
    // { field: 'id', headerName: 'id'},
    { field: 'name', headerName: 'name', width: 150},
        // renderCell: (params) => (
        // <Link to={`${params.value}`}>{params.value}</Link>)},
    { field: 'nip', headerName: 'NIP', width: 150},
];

const CompanyList = () => {
    const [company, setCompany] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("https://dev.pgitdev.pl/admin/companies",{
            headers: {"Authorization": `Bearer ${token}`}
        })

            .then((response) => response.json())
            .then((json) => setCompany(json))
    }, []);
    
    const token = getAuthToken();
    
    
    const doubleClickHandler = () => {
        const [ name, id] = company
        // navigate(`${companyData.name}`)
        console.log(id)
    } 


    return(
        <>
        <h1>Lista firm</h1>
        <div style={{ height: 600, width: '100%' }}>
            <DataGrid onCellDoubleClick={doubleClickHandler} onRowDoubleClick={doubleClickHandler} rows={company} columns={columns}/>
        </div>
        </>
    )

}

export default CompanyList;
