import {
  Button,
  Dialog,
  IconButton,
  DialogTitle,
  DialogContent,
  Slide,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { Box } from "@mui/system";
import { forwardRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeIcon from "../HomeIcon";
import { Home } from "@mui/icons-material";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ConfirmSlide = ({ canShowModal }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const openHandler = () => {
    if (canShowModal) {
      setIsOpen(true);
    } else {
      backHandler();
    }
  };

  const closeHandler = () => {
    setIsOpen(false);
  };

  const backHandler = () => {
    navigate(-1);
  };

  return (
    <Box>
      <IconButton onClick={openHandler}>
        <Home htmlColor="white" fontSize="large" />
      </IconButton>
      <Dialog
        open={isOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={closeHandler}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Napewno chcesz wyjść?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Wyjście spowoduje niezapisanie zmian edytowanej firmy. Czy napewno
            chcesz zakończyć edycje?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeHandler}>Anuluj</Button>
          <Button onClick={backHandler}>Wyjdź</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ConfirmSlide;
