const Joi=require('Joi');
const db=require('./connections');

const Schema =Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email({ minDomainAtoms: 2 }).required(),
    title: Joi.string().required(),
    message: Joi.string().required()
    
});


const contacts=db.get('contacts');

function getAllContacts() {
    return contacts.find();
}

function createContact (contact){
    const result=Joi.validate(contact, Schema);
    if(result.error==null){
        contact.created= new Date();
        return contacts.insert(contact);
    }
    else{
        return Promise.reject(result.error);
    }
}

module.exports={
    getAllContacts,
    createContact
};
