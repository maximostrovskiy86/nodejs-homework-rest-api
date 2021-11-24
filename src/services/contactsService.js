import Contact from "../db/postModel.js"

export const getUsers = async () => {
    const contacts = await Contact.find({});
    return contacts;
};

export const getUserById = async (id) => {
    const contact = await Contact.findById(id)
    return contact;
};

export const addUser = async ({name, email, phone, favorite}) => {
    const contact = await Contact.create({name, email, phone, favorite})
    console.log(contact)
    return contact;
};

export const updateUserById = async (id, {name, email, phone}) => {
    const contactUpdate = await Contact.findOneAndUpdate(id, {$set: {name, email, phone}});
    return contactUpdate;
};

export const deleteUserById = async (id) => {
    const deleteContact = await Contact.findByIdAndRemove(id);
    return deleteContact;
};

export const updateStatusContact = async (id, favorite) => {
    const contactUpdateStatus = await Contact.findOneAndUpdate(id, {favorite}, {new: true});
    return contactUpdateStatus;
}
