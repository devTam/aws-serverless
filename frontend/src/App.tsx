import { useEffect } from "react";
import "./App.css";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navigation from "./components/Navigation";
import ContactList from "./components/ContactList";
import { useStore } from "./store";

function App() {
  const fetchContacts = useStore((state) => state.fetchContacts);
  const error = useStore((state) => state.error);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  return (
    <Container maxWidth="md" sx={{ minHeight: "100vh" }}>
      <ToastContainer autoClose={2500} />
      <Box py={10}>
        {error ? (
          <Box
            sx={{
              color: "red",
              fontSize: "1.5rem",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {error}
          </Box>
        ) : (
          <>
            <Navigation />
            <ContactList />
          </>
        )}
      </Box>
    </Container>
  );
}

export default App;
