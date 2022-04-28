export const API_ROOT = "http://localhost:3000/dev/contact";

export interface IContact {
  contactId: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  age: number;
  createdAt: string;
}

export interface IContactForm {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  age: number;
}
