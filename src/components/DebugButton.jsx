import { Button } from "@mui/material";
import apiService from "../services/apiService";

const DebugButton = () => {
  const handler = async () => {
    await apiService.get("/admin/companies", {
      headers: {
        Authorization: "Bearer test",
      },
    });
  };

  return (
    <Button variant="text" onClick={handler}>
      refreshuj token
    </Button>
  );
};

export default DebugButton;
