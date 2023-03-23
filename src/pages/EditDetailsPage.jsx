import EditCompanyDetails from "../components/EditCompanyDetails";

const EditDetailsPage = () => {

    return <EditCompanyDetails/>
}

export default EditDetailsPage;

export async function action({ request }) {
    const data = Object.fromEntries(await request.fromData());
    data.nip

    console.log(data.nip)
}