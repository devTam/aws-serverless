import { FC } from "react";
import Box from "@mui/material/Box";
import Contact from "./Contact";
import { useStore } from "../store";

interface Props {
}

const ContactList: FC<Props> = () => {
  const contacts = useStore((state) => state.contacts);
  
  return (
    <Box
      py={5}
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
        gap: "3rem",
      }}
    >
      {contacts.map((contact) => (
        <Contact
          key={contact.contactId}
          contactId={contact.contactId}
          firstName={contact.firstName}
          lastName={contact.lastName}
          email={contact.email}
          phoneNumber={contact.phoneNumber}
          age={contact.age}
        />
      ))}
    </Box>
  );
};

export default ContactList;
