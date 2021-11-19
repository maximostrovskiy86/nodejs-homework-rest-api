import path from "path";
import fs from "fs/promises";
import shortid from 'shortid';

const contactsPath = path.resolve("./src/model/contacts.json");

export const listContacts = async () => {
    try {
        const data = await fs.readFile(contactsPath, "utf-8");
        return JSON.parse(data)
    } catch (error) {
        error.message = "listContacts error list";
        throw new Error(error.message)
    }
}


export const getContactById = async (contactId) => {
    try {
        const data = await fs.readFile(contactsPath, "utf-8");
        return JSON.parse(data).find(user => String(user.id) === String(contactId));
    } catch (error) {
        error.message = "listContacts error";
        throw new Error(error.message)
    }
}

export const removeContact = async (contactId) => {
    console.log('contactId: ', contactId)
    try {
        const data = await fs.readFile(contactsPath, "utf-8");
        const isDelete = JSON.parse(data).some(user => user.id === contactId);
        const result = JSON.parse(data).filter(user => String(user.id) !== String(contactId));
        const newJson = JSON.stringify(result, null, '\t');

        await fs.writeFile(contactsPath, newJson, (err) => {
            if (err) console.error(err)
        })

        console.log('deleteID: ', isDelete)

        return isDelete;

    } catch (error) {
        error.message = "listContacts error";
        throw new Error(error.message);
    }
}

export const addContact = async (name, email, phone) => {
    const newContact = {
        id: shortid.generate(),
        name,
        email,
        phone,
    }

    try {
        const data = await fs.readFile(contactsPath, "utf-8");
        const result = JSON.parse(data);
        const contactsList = JSON.stringify([newContact, ...result], null, '\t')

        await fs.writeFile(contactsPath, contactsList, (err) => {
            if (err) console.error(err)
        })

        return newContact;

    } catch (error) {
        error.message = "listContacts error";

        throw new Error(error.message)
    }
}

export const updateContact = async (contactId, {name, email, phone}) => {
    // console.log('contactId: ', contactId, 'body: ', body)
    try {
        // const contacts = await listContacts();
        const data = await fs.readFile(contactsPath, "utf-8");
        let contacts = JSON.parse(data);

        const contact = contacts.find(user => user.id.toString() === contactId);
        contacts.forEach(contact => {
            if (contact.id.toString() === contactId) {
                contact.name = name;
                contact.email = email;
                contact.phone = phone;
            }
        })

        console.log('contact: ', contact)
        const updateContact = {...contact, name, email, phone}

        console.log('updateContact: ', updateContact)

        const contactsList = JSON.stringify([...contacts], null, '\t')
        await fs.writeFile(contactsPath, contactsList, (err) => {
            if (err) console.error(err)
        })

        return updateContact;
    } catch (error) {

        console.log(error)
    }
}