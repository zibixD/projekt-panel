import { TextField, Button, Typography, Card } from "@mui/material";
import { Box } from "@mui/system";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { companyService } from "../services/companyService";
import { useNavigate } from "react-router-dom";
import { showErrorSnack, showSuccessSnack } from "../store/ui-actions";
import HomeIcon from "../UI/HomeIcon";
import ConfirmSlide from "../UI/Alerts/ConfirmAlert";
import { useIsAuthenticated } from "../hooks/useIsAuthenticated";
import { useEffect, useState } from "react";

const schema = yup.object({
  name: yup.string().required(),
  nip: yup.string().required().max(10).min(10),
  city: yup.string().required(),
  street: yup.string().required(),
  houseNumber: yup.string().required(),
  apartmentNumber: yup.string().required(),
  postalCode: yup
    .string()
    .required()
    .test({ name: "validPostalCode", test: (v) => v.match(/^\d{2}-\d{3}$/g) }),
});

const EditCompanyDetails = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const editDetails = useSelector((state) => state.company.details);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuth = useIsAuthenticated()
  const [isChanged, setIsChanged] = useState(false)

  useEffect(() => {
    if(!isAuth) {
      navigate("/")
    }
  }, [isAuth])
  

  const onSubmit = async (data) => {
    await companyService
      .putDetails(editDetails.id, data)
      .then(async (res) => {
        if (res.status === 200) {
          await dispatch(showSuccessSnack("Pomyślnie edytowano firmę"));
          navigate(-1);
        }
      })
      .catch(async () => {
        await dispatch(showErrorSnack("Wystąpił błąd podczas edycji firmy"));
      });
    };

    let editedData = editDetails;
    // console.log(editedData)
    const changeHandler = event => {
      if(editedData !== event.target.value ) {
        console.log("zmiana")
      
      } else if(editedData === event.target.value){
        setIsChanged(true)
        console.log(isC)
        
      }   
      console.log(event.target.value)
  }


  return (
    <Box sx={{
      display: "flex",
         flexDirection: "column",
         alignItems: "center",
      }}>
      <Card sx={{
        backgroundColor: "primary.light",
        width: "100%",
        color: "white",
        textAlign: "center",
        boxShadow: 5,
        marginBottom: 0.3,
        display: "flex",
          alignItems: "center",
          justifyContent: "center"
      }}>
       <Box>
        <ConfirmSlide>
          <HomeIcon/>
        </ConfirmSlide>
      </Box>
      <Box sx={{
          display: "flex",
            flexDirection: "column",
            alignItems: "center",
          width: "90%"
         }}>
        <Typography variant="h3" sx={{
          height: 50,
          padding: 4
        }}>{editDetails.name}</Typography>
        <Typography variant="subtitle1" sx={{
          paddingBottom: 0.5
        }}>edytuj dane firmy </Typography>
      </Box>
      </Card>
      <Card sx={{
         display: "flex",
            flexWrap: "wrap",
            flexDirection: "column",
            alignItems: "center",
        padding: 8,
        boxShadow: 5,
        width: { sx: "100%", sm: 600}
      }}
      >
      
      <form onChange={changeHandler} onSubmit={handleSubmit(onSubmit)}>
        <Box>
          <TextField
            sx={{
              mb: 5,
              mt: 5,
              mx: 5,
              width: { sx: "100%", sm: 500 }
            }}
            label="Nazwa firmy"
            name="name"
            defaultValue={editDetails.name}
            error={!!errors.name}
            {...register("name")}
          />
        </Box>
        <Box>
          <TextField
          sx={{
            mb: 5,
            mx: 5,
            width: { sx: "100%", sm: 500 }
          }}
            label="NIP"
            name="nip"
            defaultValue={editDetails.nip}
            error={!!errors.nip}
            {...register("nip")}
          />
        </Box>
        <Box>
          <TextField
          sx={{
            mb: 5,
            mx: 5,
            width: { sx: "100%", sm: 500 }
          }}
            label="Miasto"
            name="city"
            defaultValue={editDetails.city}
            error={!!errors.city}
            {...register("city")}
          />
        </Box>
        <Box>
          <TextField
          sx={{
            mb: 5,
            mx: 5,
            width: { sx: "100%", sm: 500 }
          }}
            label="Ulica"
            name="street"
            defaultValue={editDetails.street}
            error={!!errors.street}
            {...register("street")}
          />
        </Box>
        <Box>
          <TextField
          sx={{
            mb: 5,
            mx: 5,
            width: { sx: "100%", sm: 500 }
          }}
            label="Numer domu"
            name="houseNumber"
            defaultValue={editDetails.houseNumber}
            error={!!errors.houseNumber}
            {...register("houseNumber")}
          />
        </Box>
        <Box>
          <TextField
          sx={{
            mb: 5,
            mx: 5,
            width: { sx: "100%", sm: 500 }
          }}
            label="Numer lokalu"
            name="apartmentNumber"
            defaultValue={editDetails.apartmentNumber}
            error={!!errors.apartmentNumber}
            {...register("apartmentNumber")}
          />
        </Box>
        <Box>
          <TextField
          sx={{
            mb: 4.3,
            mx: 5,
            width: { sx: "100%", sm: 500 }
          }}
            label="Kod pocztowy"
            name="postalCode"
            error={!!errors.postalCode}
            defaultValue={editDetails.postalCode}
            {...register("postalCode")}
          />
        </Box>
        <Button type="submit"
        sx={{
          height: 50,
          width: { sx: "100%", sm: 500 },
          mx: 5,
        }}>Zapisz</Button>
      </form>
      </Card>
    </Box>
  );
};

export default EditCompanyDetails;
