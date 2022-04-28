import create from "zustand";
import { API_ROOT, IContact, IContactForm } from "./constants";

interface StoreType {
  contacts: IContact[];
  loading: boolean;
  fetchContacts: () => void;
  createContact: (contact: IContactForm) => void;
  updateContact: (contact: IContactForm, contactId: string) => void;
  deleteContact: (contactId: string) => void;
  error: string;
}

export const useStore = create<StoreType>((set, get) => ({
  contacts: [],
  loading: false,
  error: "",
  createContact: async (contact: IContactForm) => {
    set({ loading: true });
    try {
      const response = await fetch(API_ROOT, {
        method: "POST",
        body: JSON.stringify(contact),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      set({
        contacts: [...get().contacts, json.createdContact],
        loading: false,
        error: ""
      });
    } catch (error) {
      set({
        loading: false,
      });
    }
  },
  fetchContacts: async () => {
    set({ loading: true });
    //   fetch data from API
    try {
      const response = await fetch(API_ROOT);
      const json = await response.json();
      if (json.statusCode === 200) {
        const sortedContacts = json.contacts.sort(
          (a: IContact, b: IContact) => {
            return (
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
            );
          }
        );
        set({ contacts: sortedContacts, loading: false, error: "" });
      }
    } catch (error: any) {
      set({ error: "Something went wrong, Please try again later.", loading: false });
      console.error(error);
    }
  },
  updateContact: async (contact, contactId: string) => {
    set({ loading: true });
    try {
      const response = await fetch(`${API_ROOT}/${contactId}`, {
        method: "PUT",
        body: JSON.stringify(contact),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      if (json.statusCode === 200) {
        const updatedContacts = get().contacts;

        const index = updatedContacts.findIndex(
          (contact) => contact.contactId === contactId
        );
        updatedContacts[index] = json.contact;
        set({ contacts: updatedContacts, loading: false, error: "" });
      }
    } catch (error) {
      set({
        loading: false,
      });
      console.error(error);
    }
  },
  deleteContact: async (contactId: string) => {
    set({ loading: true });
    try {
      const response = await fetch(`${API_ROOT}/${contactId}`, {
        method: "DELETE",
      });
      await response.json();
      set({ loading: false, error: "" });
    } catch (error) {
      set({
        loading: false,
      });
      console.error(error);
    }
  },
}));
