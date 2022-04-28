import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { v4 } from "uuid";
import contactService from "../../service";

export const getAllContacts = middyfy(
  async (): Promise<APIGatewayProxyResult> => {
    const contacts = await contactService.getAllContacts();
    return formatJSONResponse({
      statusCode: 200,
      contacts,
    });
  }
);

export const createContact = middyfy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
      const contact = JSON.parse(JSON.stringify(event.body));
      contact.contactId = v4();
      contact.createdAt = new Date().toISOString();
      const createdContact = await contactService.createContact(contact);
      return formatJSONResponse({
        statusCode: 201,
        createdContact,
      });
    } catch (error) {
      return formatJSONResponse({
        statusCode: 500,
        error: error.message,
      });
    }
  }
);

export const updateContact = middyfy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
      const contact = JSON.parse(JSON.stringify(event.body));
      const updatedContact = await contactService.updateContact(
        event.pathParameters.id,
        contact
      );
      return formatJSONResponse({
        statusCode: 200,
        updatedContact,
      });
    } catch (error) {
      return formatJSONResponse({
        statusCode: 500,
        error: error.message,
      });
    }
  }
);

export const deleteContact = middyfy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
      await contactService.deleteContact(event.pathParameters.id);
      return formatJSONResponse({
        statusCode: 204,
      });
    } catch (error) {
      return formatJSONResponse({
        statusCode: 500,
        error: error.message,
      });
    }
  }
);
