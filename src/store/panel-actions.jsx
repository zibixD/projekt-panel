export const fetchCompnayData = () => {
    return async (dispatch) => {
        const fetchData = async  () => {
            const response = await fetch("https://dev.pgitdev.pl/admin/companies", {
                headers: { Authorization: `Bearer ${token}` },
              })
            const CompanyData = await response.json()
        }
    }
}