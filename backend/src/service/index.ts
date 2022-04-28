import dynamoDBClient from "../model";
import ContactService from "./service"

const contactService = new ContactService(dynamoDBClient());
export default contactService;