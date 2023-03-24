import { TextField, Button } from "@mui/material";
import { Box } from "@mui/system";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { companyService } from "../services/companyService";
import { useNavigate } from "react-router-dom";
import { showErrorSnack, showSuccessSnack } from "../store/ui-actions";

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
    .test({ name: "validPostalCode", test: (v) => v.match(/\d{2}-\d{3}/g) }),
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

  const onSubmit = async (data) => {
    await companyService.putDetails(editDetails.id, data).then(async (res) => {
      if (res.status === 200) {
        await dispatch(showSuccessSnack("Pomyślnie edytowano firmę"));
        navigate(-1);
      } else {
        await dispatch(showErrorSnack("Wystąpił błąd podczas edycji firmy"));
      }
    });
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box>
          <TextField
            label="Nazwa firmy"
            name="name"
            defaultValue={editDetails.name}
            error={!!errors.name}
            {...register("name")}
          />
        </Box>
        <Box>
          <TextField
            label="NIP"
            name="nip"
            defaultValue={editDetails.nip}
            error={!!errors.nip}
            {...register("nip")}
          />
        </Box>
        <Box>
          <TextField
            label="Miasto"
            name="city"
            defaultValue={editDetails.city}
            error={!!errors.city}
            {...register("city")}
          />
        </Box>
        <Box>
          <TextField
            label="Ulica"
            name="street"
            defaultValue={editDetails.street}
            error={!!errors.street}
            {...register("street")}
          />
        </Box>
        <Box>
          <TextField
            label="Numer domu"
            name="houseNumber"
            defaultValue={editDetails.houseNumber}
            error={!!errors.houseNumber}
            {...register("houseNumber")}
          />
        </Box>
        <Box>
          <TextField
            label="Numer lokalu"
            name="apartmentNumber"
            defaultValue={editDetails.apartmentNumber}
            error={!!errors.apartmentNumber}
            {...register("apartmentNumber")}
          />
        </Box>
        <Box>
          <TextField
            label="Kod pocztowy"
            name="postalCode"
            error={!!errors.postalCode}
            defaultValue={editDetails.postalCode}
            {...register("postalCode")}
          />
        </Box>
        <Button type="submit">Zapisz</Button>
      </form>
    </Box>
  );
};

export default EditCompanyDetails;
