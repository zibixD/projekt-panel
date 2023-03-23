import { TextField, Button } from "@mui/material";
import { Box} from "@mui/system";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Form } from "react-router-dom";
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"

const shema = yup.object({
    nip: yup.number().required().integer().positive(),
    city: yup.string(),
    street: yup.string(),
    // houseNumber:
    apartmentNumber: yup.number().integer().positive(),
    postalCode: yup.number().positive(),
})

const EditCompanyDetails = () => {
    const { register, handleSubmit} = useForm({
        resolver: yupResolver(shema)
    });
    const editDetails = useSelector((state) => state.company.details)
 
    const onSubmit = data => {
        console.log(data)
    }

    console.log(shema)

    return (
        <Box>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Box>
                    <TextField

                        label="NIP"
                        id="nip"
                        defaultValue={editDetails.nip}
                        {...register("NIP", { maxLength: 10, minLength: 10})}        
                    />

                    </Box>
                    <Box>
                    <TextField

                        label="Miasto"
                        id="miasto"
                        defaultValue={editDetails.city}
                        // {...register}
                    />
                    </Box>
                    <Box>
                    <TextField
                        
                        label="Ulica"
                        id="ulica"
                        defaultValue={editDetails.street}
                        // {...register}
                    />
                    </Box>
                    <Box>
                    <TextField
                        
                        label="Numer domu"
                        id="numer domu"
                        defaultValue={editDetails.houseNumber}
                        // {...register}
                    />
                    </Box>
                    <Box>
                    <TextField
                        
                        label="Numer lokalu"
                        id="numer lokalu"
                        defaultValue={editDetails.apartmentNumber}
                        // {...register}
                    />
                    </Box>
                    <Box>
                    <TextField
                        
                        label="Kod pocztowy"
                        id="kod pocztowy"
                        defaultValue={editDetails.postalCode}
                        // {...register}
                    />
                </Box>
                <Button>Zapisz</Button>
            </Form>
        </Box>
    )
}

export default EditCompanyDetails;