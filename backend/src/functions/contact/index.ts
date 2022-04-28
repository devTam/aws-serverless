import { handlerPath } from '@libs/handler-resolver';

export const getAllContacts = {
    handler: `${handlerPath(__dirname)}/handler.getAllContacts`,
    events: [
        {
            http: {
                method: 'get',
                path: 'contact/',
            },
        },
    ],
};

export const createContact = {
    handler: `${handlerPath(__dirname)}/handler.createContact`,
    events: [
        {
            http: {
                method: 'post',
                path: 'contact',
            },
        },
    ],
};

export const updateContact = {
    handler: `${handlerPath(__dirname)}/handler.updateContact`,
    events: [
        {
            http: {
                method: 'put',
                path: 'contact/{id}',
            },
        },
    ],
};

export const deleteContact = {
    handler: `${handlerPath(__dirname)}/handler.deleteContact`,
    events: [
        {
            http: {
                method: 'delete',
                path: 'contact/{id}',
            },
        },
    ],
};