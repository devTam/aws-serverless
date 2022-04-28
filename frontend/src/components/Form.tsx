import { FC } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import CircularProgress from "@mui/material/CircularProgress";
import * as yup from "yup";
import { useFormik } from "formik";
import { useStore } from "../store";
import { toast } from "react-toastify";
import { IContactForm } from "../constants";

interface Props {
  type: "create" | "edit";
  openForm: boolean;
  closeForm: () => void;
  contactId?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  age?: number;
}

const validationSchema = yup.object({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phoneNumber: yup.string().required("Phone number is required"),
  age: yup.number().required("Age is required").positive().integer(),
});

const Form: FC<Props> = ({
  openForm,
  closeForm,
  type,
  contactId,
  firstName,
  lastName,
  email,
  phoneNumber,
  age,
}) => {

  const loading = useStore((state) => state.loading);
  const fetchContacts = useStore((state) => state.fetchContacts);
  const updateContact = useStore((state) => state.updateContact);
  const createContact = useStore((state) => state.createContact);


  const onSubmitContactForm = async (values: IContactForm) => {
    if (type === "create") {
      await createContact(values);
    } else {
      await updateContact(values, contactId as string);
    }
    
    closeForm();
    toast.success("Contact saved successfully");
    fetchContacts();
  };

  const formik = useFormik({
    initialValues: {
      firstName: firstName ? firstName : "",
      lastName: lastName ? lastName : "",
      email: email ? email : "",
      phoneNumber: phoneNumber ? phoneNumber : "",
      age: age ? age : 0,
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      onSubmitContactForm(values);
      resetForm();
    },
  });


  return (
    <Dialog open={openForm} onClose={closeForm}>
      <DialogTitle>
        {type === "create" ? "Add Contact" : "Update Contact"}
      </DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                value={formik.values.firstName}
                onChange={formik.handleChange}
                error={formik?.errors?.firstName ? Boolean(formik.errors.firstName) : false}
                helperText={formik?.errors?.firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                error={formik?.errors?.lastName ? Boolean(formik.errors.lastName) : false}
                helperText={formik?.errors?.lastName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="phone number"
                name="phoneNumber"
                type="tel"
                fullWidth
                id="phoneNumber"
                label="Phone Number"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                error={formik?.errors?.phoneNumber ? Boolean(formik.errors.phoneNumber) : false}
                helperText={formik?.errors?.phoneNumber}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="age"
                type="number"
                label="Age"
                name="age"
                autoComplete="age"
                value={formik.values.age}
                onChange={formik.handleChange}
                error={formik?.errors?.age ? Boolean(formik.errors.age) : false}
                helperText={formik?.errors?.age}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                type="email"
                autoComplete="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik?.errors?.email ? Boolean(formik.errors.email) : false}
                helperText={formik?.errors?.email}
              />
            </Grid>
          </Grid>
          <Button
            size="large"
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {loading ? (
              <CircularProgress size={30} sx={{ color: "white" }} />
            ) : type === "create" ? (
              "Add Contact"
            ) : (
              "Update Contact"
            )}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default Form;
