const Joi=require('Joi');
const db=require('./connections');

const Schema =Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email({ minDomainAtoms: 2 }).required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
    
});


const users=db.get('users');

function getAllUsers() {
    return users.find();
}

function createUser (user){
    const result=Joi.validate(user, Schema);
    if(result.error==null){
        user.created= new Date();
        return users.insert(user);
    }
    else{
        return Promise.reject(result.error);
    }
}

module.exports={
    getAllUsers,
    createUser
};
