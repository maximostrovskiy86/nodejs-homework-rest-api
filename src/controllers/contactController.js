import {
    getUsers,
    getUserById,
    addUser,
    updateUserById,
    deleteUserById,
    updateStatusContact
} from "../services/contactsService.js";

export const getUsersController = async (req, res, next) => {
    const {id: owner} = req.user;

    const contacts = await getUsers(owner);
    console.log(req.user)
    res.json({contacts});
}

export const getUserByIdController = async (req, res, next) => {

    const {id} = req.params;
    const contact = await getUserById(id);

    if (contact) {
        res.json({
            status: 'success',
            code: 200,
            contact,
        })
    } else {
        return res.status(404).json({
            status: 'error',
            code: 404,
            message: `Not found task id: ${id}`,
            data: 'Not Found',
        });
    }

}

export const addUserController = async (req, res, next) => {
    const {name, email, phone, favorite} = req.body;
    const {id} = req.user;
    const contact = await addUser({name, email, phone, favorite}, id);
    console.log(contact)

    res.json({
        status: "success",
        contact: contact
    })
}

export const updateUserByIdController = async (req, res, next) => {
    const {id} = req.params;
    const {name, email, phone} = req.body;

    const contactUpdateUssr = await updateUserById(id, {name, email, phone});
    res.json({
        status: "success",
        contactUpdateUssr
    });
}

export const deleteUserByIdController = async (req, res, next) => {
    const {id} = req.params;
    const deleteContact = await deleteUserById(id);

    if (!deleteContact) {
        return res.json({
            code: 404,
            message: `Not found user with id ${id}`
        })
    }

    res.json({
        "message": "contact deleted",
        "code": 200
    })
}

export const updateStatusContactController = async (req, res, next) => {
    const {id} = req.params;
    const {favorite} = req.body;

    if (!req.body) {
        return res.status(400).json({"message": "missing field favorite"});
    }

    const contactUpdate = await updateStatusContact(id, {favorite});

    if (!contactUpdate) {
        return res.status(404).json({
            "message": "Not found"
        })
    }

    res.status(200).json({
        status: 'success',
        code: 200,
        contactUpdate
    })
}

