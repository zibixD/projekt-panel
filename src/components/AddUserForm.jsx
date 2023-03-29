import { Box } from "@mui/system";
import {
  Card,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import ConfirmSlide from "../UI/Alerts/ConfirmAlert";
import { useSelector } from "react-redux";
import CardBaner from "../UI/CardBaner";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";
import { companyService } from "../services/companyService";
import { dispatch } from "../store/storeMain";
import { showErrorSnack, showSuccessSnack } from "../store/ui-actions";
import { useIsMobile } from "../hooks/useIsMobile";

const schema = yup.object({
  name: yup.string().required(),
  type: yup.string().required(),
  role: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref("password"), null]),
});

const AddUsersForm = () => {
  const editDetails = useSelector((state) => state.company.details);
  const userId = useSelector((state) => state.auth.userId);
  const [canShowModal, setCanShowModal] = useState(false);
  const isMobile = useIsMobile();
  const params = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      companyId: params.id,
      name: "",
      type: "n",
      role: null,
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const submitHandler = async (data) => {
    const newData = {
      companyId: data.companyId,
      type: data.type,
      isAdmin: data.role === "Admin" ? true : false,
      name: data.name,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
      createdBy: userId,
    };

    await companyService
      .addUser(newData)
      .then(async (res) => {
        if (res.status === 200) {
          await dispatch(showSuccessSnack("Pomyślnie utworzono użytkownika"));
          navigate(-1);
        }
      })
      .catch(async () => {
        await dispatch(
          showErrorSnack("Napotkano błąd podczas tworzenia użytkownika")
        );
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
      <CardBaner title={editDetails.name} info={"Dodaj użytkownika firmy"}>
        <ConfirmSlide canShowModal={canShowModal} />
      </CardBaner>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingY: 8,
          boxShadow: 5,
          width: { xs: "100%", sm: 600 },
        }}
      >
        <form
          style={{ width: isMobile ? "80%" : "100%" }}
          onSubmit={handleSubmit(submitHandler)}
        >
          <input hidden {...register("companyId")} />

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <TextField
              sx={{
                mb: 5,
                width: { xs: "100%", sm: 500 },
              }}
              label="Nazwa użytkownika"
              autoComplete="off"
              inputProps={{
                form: {
                  autocomplete: "off",
                },
              }}
              error={!!errors.name}
              {...register("name")}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <FormControl fullWidth={isMobile}>
              <InputLabel
                id="userType"
                sx={{
                  mb: 5,
                }}
              >
                Typ użytkownika
              </InputLabel>
              <Select
                sx={{
                  mb: 5,
                  width: { xs: "100%", sm: 500 },
                }}
                labelId="userType"
                defaultValue="n"
                error={!!errors.type}
                {...register("type")}
              >
                <MenuItem value="n">n</MenuItem>
                <MenuItem value="s">s</MenuItem>
                <MenuItem value="p">p</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              flex: 1,
            }}
          >
            <FormControl fullWidth={isMobile}>
              <InputLabel
                id="userRole"
                sx={{
                  mb: 5,
                }}
              >
                Rola użytkownika
              </InputLabel>
              <Select
                sx={{
                  mb: 5,
                  width: { xs: "100%", sm: 500 },
                }}
                labelId="userRole"
                error={!!errors.role}
                {...register("role")}
              >
                <MenuItem value={"Pracownik"}>Pracownik</MenuItem>
                <MenuItem value={"Admin"}>Admin</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <TextField
              sx={{
                mb: 5,
                width: { xs: "100%", sm: 500 },
              }}
              type="email"
              label="Email użytkownika"
              error={!!errors.email}
              {...register("email")}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <TextField
              sx={{
                mb: 5,
                width: { xs: "100%", sm: 500 },
              }}
              type="password"
              autoComplete="off"
              inputProps={{
                form: {
                  autocomplete: "off",
                },
              }}
              label="Hasło użytkownika"
              error={!!errors.password}
              {...register("password")}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <TextField
              sx={{
                mb: 5,
                width: { xs: "100%", sm: 500 },
              }}
              type="password"
              autoComplete="off"
              label="Powtórz hasło użytkownika"
              inputProps={{
                form: {
                  autocomplete: "off",
                },
              }}
              error={!!errors.confirmPassword}
              {...register("confirmPassword")}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Button
              type="submit"
              sx={{
                height: 50,
              }}
            >
              Dodaj użytkownika
            </Button>
          </Box>
        </form>
      </Card>
    </Box>
  );
};

export default AddUsersForm;
