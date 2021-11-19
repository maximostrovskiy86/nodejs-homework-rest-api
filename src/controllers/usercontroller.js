import {addContact, getContactById, listContacts, removeContact, updateContact} from "../model/index.js";

export const getUsers = async (req, res, next) => {
    try {
        const contacts = await listContacts();
        res.json({
            status: 'success',
            code: 200,
            contacts,
        })
    } catch (error) {
        next(error);
    }
}

export const getUserById =async (req, res, next) => {
    try {
        const {id} = req.params
        const contactId = await getContactById(id)

        if (!contactId) {
            res.json({
                code: 404,
                message: `Not found user with id ${id}`,
            })
        }
        res.json({
            status: 'success',
            code: 200,
            contact: contactId
        })
    } catch (error) {
        next(error);
    }
}

export const addUser = async (req, res, next) => {
    try {
        const {name, email, phone} = req.body
        const createContact = await addContact(name, email, phone)
        res.json({
            status: 'success',
            code: 201,
            createContact
        })
    } catch (error) {
        next(error);
    }
}

export const updateUserById = async (req, res, next) => {
    try {
         const {id} = req.params;
        const {name, email, phone} = req.body;
        const contact = await updateContact(id, req.body);

        res.status(200).json({
            status: 'success',
            code: 200,
            contact,
        });

    } catch (error) {
        next(error);
    }
}

export const deleteUserById = async (req, res, next) => {
    try {
        const {id} = req.params;
        console.log("id: ", id)
        const deleteContact = await removeContact(id);
        console.log('deleteContact: ', deleteContact)

        if (!deleteContact) {
            res.json({
                code: 404,
                message: `Not found user with id ${id}`
            })
        }

        res.json({
            "message": "contact deleted",
            "code": 200
        })

    } catch (error) {
        next(error);
    }
}

