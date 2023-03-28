import { Box } from "@mui/system";
import { Card, 
    Button,
    TextField, 
    Select, 
    MenuItem, 
    FormControl, 
    InputLabel} from "@mui/material";
import ConfirmSlide from "../UI/Alerts/ConfirmAlert";
import { useSelector } from "react-redux";
import CardBaner from "../UI/CardBaner";
import { useState, useEffect } from "react";
import {useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams } from "react-router-dom";
import { boolean, string } from "yup";

const schema = yup.object({
    id: yup.number().required().min(1).max(200),
    name: yup.string().required(),
    type: yup.string().required(),
    isAdmin: yup
    .boolean()
    .required()
    .test({ name: "isAdmin", test: (val) => {
        
        console.log(val)
    } }),
    email: yup.string().required(),
    password: yup.string().required(),
    confirmPassword: yup
    .string()
    .required()
    // .test({ name: "confirmPassword", test: (cp) => cp.match(password) })
})

const AddUsersForm = () => {
    const editDetails = useSelector((state) => state.company.details)
    const [canShowModal, setCanShowModal] = useState(false)
    const [userType, setUserType] = useState('')
    const [userRole, setUserRole] = useState('')
    const params = useParams()
    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors, isDirty },
      } = useForm({
        mode: "onChange",
        resolver: yupResolver(schema),
        defaultValues: {
            companyId: params.id,
            id: 0,
            name: "",
            type: "n",
            isAdmin: boolean,
            email: "",
            password: "",
            confirmPassword: "",
        }
      });
    
//   useEffect(() => {
//     if (isDirty) {
//       setCanShowModal(true);
//     }
//   }, [isDirty]);

    const changeTypeHandler = event => {
        setUserType(event.target.value)
    };

    // const changeRoleHandler = event => {
    //     setUserRole(event.target.value)
    // };

    // console.log(userRole)



    return (
        <Box
        sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
            <CardBaner title={editDetails.name} info={"Dodaj użytkownika firmy"}>
            <ConfirmSlide canShowModal={canShowModal}/>
            </CardBaner>
            <Card
            sx={{
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "column",
                alignItems: "center",
                padding: 8,
                boxShadow: 5,
                width: { sx: "100%", sm: 600 },
            }}
            >
                <form>
                    <Box>
                        <TextField
                            sx={{
                                mb: 5,
                                mx: 5,
                                width: { sx: "100%", sm: 500 },
                            }}
                            label="Id użytkownika"
                            name="id"
                            error={!!errors.id}
                            {...register("id")}
                        />
                    </Box>
                    <Box>
                        <TextField
                            sx={{
                                mb: 5,
                                mx: 5,
                                width: { sx: "100%", sm: 500 },
                            }}
                            label="Nazwa użytkownika"
                            name="name"
                            error={!!errors.name}
                            {...register("name")}
                        />
                    </Box>
                    <Box sx={{minWidth: 120}}>
                        <FormControl fullWidth>
                            <InputLabel id="userType"
                                sx={{
                                    mb: 5,
                                    mx: 5,
                            }}>Typ użytkownika</InputLabel>
                            <Select
                                sx={{
                                    mb: 5,
                                    mx: 5,
                                    width: { sx: "100%", sm: 500 },
                                }}
                                labelId="userType"
                                name="admin"
                                value={userType}
                                onChange={changeTypeHandler}
                                error={!!errors.type}
                                {...register("type")}
                            >
                                <MenuItem value={"n"}>n</MenuItem>
                                <MenuItem value={"s"}>s</MenuItem>
                                <MenuItem value={"p"}>p</MenuItem>
                            </Select>  
                        </FormControl>
                    </Box>
                    <Box sx={{ minWidth: 120}}>
                        <FormControl fullWidth>
                            <InputLabel id="userRole"
                            sx={{
                                mb: 5,
                                mx: 5,
                            }}
                            >Rola użytkownika</InputLabel>
                            <Select
                                sx={{
                                    mb: 5,
                                    mx: 5,
                                    width: { sx: "100%", sm: 500 },
                                }}
                                labelId="userRole"  
                                name="admin"
                                value={userRole}
                                error={!!errors.isAdmin}
                                {...register("isAdmin")}
                                onChange={(e) => setValue('isAdmin', setUserRole(e.target.value), { shouldValidate: true} )}
                            >
                                {/* isAdmin */}
                                <MenuItem value={"Pracownik"}>Pracownik</MenuItem>
                                <MenuItem value={"Admin"}>Admin</MenuItem>
                            </Select>  
                        </FormControl>
                    </Box>
                    <Box>
                        <TextField
                            sx={{
                                mb: 5,
                                mx: 5,
                                width: { sx: "100%", sm: 500 },
                            }}
                            label="Email użytkownika"
                            name="email"
                        />
                    </Box>
                    <Box>
                        <TextField
                            sx={{
                                mb: 5,
                                mx: 5,
                                width: { sx: "100%", sm: 500 },
                            }}
                            label="Hasło użytkownika"
                            name="password"
                        />
                    </Box>
                    <Box>
                        <TextField
                            sx={{
                                mb: 5,
                                mx: 5,
                                width: { sx: "100%", sm: 500 },
                            }}
                            label="Powtórz hasło użytkownika"
                            name="password"
                        />
                    </Box>
                    <Button
                        type="submit"
                        sx={{
                        height: 50,
                        width: { sx: "100%", sm: 500 },
                        mx: 5,
                        }}
                    >
                        Dodaj użytkownika
                    </Button>
                </form>
            </Card>
        </Box>
    )
}

export default AddUsersForm;