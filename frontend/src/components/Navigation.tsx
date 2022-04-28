import { FC, useState } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Form from "./Form";

interface Props {}

const Navigation: FC<Props> = () => {
  const [open, setOpen] = useState(false);

  const openAddContactForm = () => {
    setOpen(true);
  };

  const closeAddContactForm = () => {
    setOpen(false);
  };

  return (
    <Grid py={5} container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography
          color="primary"
          fontWeight={600}
          component="h1"
          variant="h4"
        >
          Contacts
        </Typography>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          startIcon={<PersonAddIcon />}
          onClick={openAddContactForm}
        >
          Add contact
        </Button>
      </Grid>
      <Form type="create" openForm={open} closeForm={closeAddContactForm} />
    </Grid>
  );
};

export default Navigation;
