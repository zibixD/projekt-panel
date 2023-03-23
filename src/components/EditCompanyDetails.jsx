import { TextField, Button } from "@mui/material";
import { Box} from "@mui/system";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Form } from "react-router-dom";
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"

const shema = yup.object({
    nip: yup.string().required(),
    city: yup.string(),
    street: yup.string(),
    houseNumber: yup.string(),
    apartmentNumber: yup.string(),
    postalCode: yup.string(),
})

const EditCompanyDetails = () => {
    const { register, handleSubmit} = useForm({
        resolver: yupResolver(shema)
    });
    const editDetails = useSelector((state) => state.company.details)
 
    const onSubmit = data => {
        console.log(data)
    }


    return (
        <Box>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Box>
                    <TextField

                        label="NIP"
                        name="nip"

                        defaultValue={editDetails.nip}
                        {...register("NIP", { maxLength: 10, minLength: 10})}
                        // onChange={editHandler}        
                    />

                    </Box>
                    <Box>
                    <TextField

                        label="Miasto"
                        name="miasto"
                        defaultValue={editDetails.city}
                        // {...register}
                    />
                    </Box>
                    <Box>
                    <TextField
                        
                        label="Ulica"
                        name="ulica"
                        defaultValue={editDetails.street}
                        // {...register}
                    />
                    </Box>
                    <Box>
                    <TextField
                        
                        label="Numer domu"
                        name="numer-domu"
                        defaultValue={editDetails.houseNumber}
                        // {...register}
                    />
                    </Box>
                    <Box>
                    <TextField
                        
                        label="Numer lokalu"
                        name="numer-lokalu"
                        defaultValue={editDetails.apartmentNumber}
                        // {...register}
                    />
                    </Box>
                    <Box>
                    <TextField
                        
                        label="Kod pocztowy"
                        name="kod-pocztowy"
                        defaultValue={editDetails.postalCode}
                        // {...register}
                    />
                </Box>
                <Button type="submit" >Zapisz</Button>
            </Form>
        </Box>
    )
}

export default EditCompanyDetails;