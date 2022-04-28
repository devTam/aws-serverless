import { FC } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";
import { DialogActions, DialogContentText } from "@mui/material";
import { useStore } from "../store";

interface Props {
  open: boolean;
  handleClose: () => void;
  firstName: string;
  contactId: string;
}

const ConfirmDialog: FC<Props> = ({
  open,
  handleClose,
  firstName,
  contactId,
}) => {

  const loading = useStore(state => state.loading);
  const deleteContact = useStore(state => state.deleteContact);
  const fetchContacts = useStore(state => state.fetchContacts);

  const handleContactDelete = async () => {
    await deleteContact(contactId);
    await fetchContacts();
    toast.success(`${firstName} was deleted.`);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Delete Contact</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete{" "}
          <Typography component="span" variant="h6" fontSize="1rem">
            {firstName}
          </Typography>
          ?
        </DialogContentText>
        <DialogActions>
          <Button size="small" variant="outlined" onClick={handleClose}>
            {loading ? (
              <CircularProgress size={30} sx={{ color: "white" }} />
            ) : (
              "No"
            )}
          </Button>
          <Button
            color="error"
            size="small"
            variant="outlined"
            onClick={handleContactDelete}
          >
            {loading ? (
              <CircularProgress size={30} sx={{ color: "white" }} />
            ) : (
              "Yes"
            )}
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmDialog;
