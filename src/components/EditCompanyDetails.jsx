import { TextField, Button, Typography, Card } from "@mui/material";
import { Box } from "@mui/system";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { companyService } from "../services/companyService";
import { useNavigate } from "react-router-dom";
import { showErrorSnack, showSuccessSnack } from "../store/ui-actions";
import ConfirmSlide from "../UI/Alerts/ConfirmAlert";
import { useIsAuthenticated } from "../hooks/useIsAuthenticated";
import { useEffect, useState } from "react";
import CardBaner from "../UI/CardBaner";

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
    formState: { errors, isDirty },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const editDetails = useSelector((state) => state.company.details);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuth = useIsAuthenticated();
  const [canShowModal, setCanShowModal] = useState(false);

  useEffect(() => {
    if (!isAuth) {
      navigate("/");
    }
  }, [isAuth]);

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

  useEffect(() => {
    if (isDirty) {
      setCanShowModal(true);
    }
  }, [isDirty]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <CardBaner title={editDetails.name} info={"Edytuj dane firmy"}>
        <ConfirmSlide canShowModal={canShowModal}/>
      </CardBaner>
      <Card
        sx={{
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "column",
          alignItems: "center",
          paddingX: 8,
          paddingY: 7,
          boxShadow: 5,
          width: { xs: "100%", sm: 600 },
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box>
            <TextField
              sx={{
                mb: 5,
                mx: 5,
                width: { xs: "100%", sm: 500 },
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
                width: { xs: "100%", sm: 500 },
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
                width: { xs: "100%", sm: 500 },
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
                width: { xs: "100%", sm: 500 },
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
                width: { xs: "100%", sm: 500 },
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
                width: { xs: "100%", sm: 500 },
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
                width: { xs: "100%", sm: 500 },
              }}
              label="Kod pocztowy"
              name="postalCode"
              error={!!errors.postalCode}
              defaultValue={editDetails.postalCode}
              {...register("postalCode")}
            />
          </Box>
          <Button
            type="submit"
            sx={{
              width: { xs: "100%", sm: 500 },
              mx: 5,
            }}
          >
            Zapisz
          </Button>
        </form>
      </Card>
    </Box>
  );
};

export default EditCompanyDetails;
