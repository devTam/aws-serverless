import { FC, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import Form from "./Form";
import ConfirmDialog from "./ConfirmDialog";

interface Props {
  key: string;
  contactId: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  age: number;
}

const Contact: FC<Props> = ({
  firstName,
  lastName,
  email,
  phoneNumber,
  age,
  contactId,
}) => {
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card sx={{ padding: "1rem" }}>
      <CardContent>
        <Typography gutterBottom variant="body2" component="div">
          First name: {firstName}
        </Typography>
        <Typography gutterBottom variant="body2" component="div">
          Last name: {lastName}
        </Typography>
        <Typography gutterBottom variant="body2" component="div">
          Email: {email}
        </Typography>
        <Typography gutterBottom variant="body2" component="div">
          Phone number: {phoneNumber}
        </Typography>
        <Typography gutterBottom variant="body2" component="div">
          Age: {age}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "space-between" }}>
        <Button
          size="small"
          variant="outlined"
          startIcon={<ManageAccountsIcon />}
          onClick={handleClickOpen}
        >
          Edit
        </Button>
        <Button
          color="error"
          size="small"
          variant="outlined"
          startIcon={<DeleteIcon />}
          onClick={() => setOpenDelete(true)}
        >
          Delete
        </Button>
      </CardActions>
      <Form
        type="edit"
        contactId={contactId}
        closeForm={handleClose}
        openForm={open}
        firstName={firstName}
        lastName={lastName}
        email={email}
        phoneNumber={phoneNumber}
        age={age}
      />
      <ConfirmDialog
        open={openDelete}
        handleClose={() => setOpenDelete(false)}
        contactId={contactId}
        firstName={firstName}
      />
    </Card>
  );
};

export default Contact;
