import { DocumentClient } from "aws-sdk/clients/dynamodb";
import Contact from "../model/contact";

export default class ContactService {

    private Tablename: string = "ContactTable";

    constructor(private docClient: DocumentClient) { }

    async getAllContacts(): Promise<Contact[]> {
        const contacts = await this.docClient.scan({
            TableName: this.Tablename,
        }).promise()
        return contacts.Items as Contact[];
    }

    async createContact(contact: Contact): Promise<Contact> {
        await this.docClient.put({
            TableName: this.Tablename,
            Item: contact
        }).promise()
        return contact as Contact;
    }

    async getContact(id: string): Promise<any> {
        const contact = await this.docClient.get({
            TableName: this.Tablename,
            Key: {
                contactId: id
            }
        }).promise()
        if (!contact.Item) {
            throw new Error("Id does not exit");
        }
        return contact.Item as Contact;
    }

    async updateContact(id: string, contact: Partial<Contact>): Promise<Contact> {
        const updated = await this.docClient
            .update({
                TableName: this.Tablename,
                Key: { contactId: id },
                UpdateExpression:
                    "set firstName = :firstName, lastName = :lastName, email = :email, phoneNumber = :phoneNumber, age = :age",
                ExpressionAttributeValues: {
                    ":firstName": contact.firstName,
                    ":lastName": contact.lastName,
                    ":email": contact.email,
                    ":phoneNumber": contact.phoneNumber,
                    ":age": contact.age
                },
                ReturnValues: "UPDATED_NEW"
            })
            .promise();
        return updated.Attributes as Contact;
    }

    async deleteContact(id: string): Promise<void> {
        await this.docClient.delete({
            TableName: this.Tablename,
            Key: {
                contactId: id
            }
        }).promise()
    }
}