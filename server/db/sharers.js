const Joi=require('Joi');
const db=require('./connections');

const Schema =Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    weblink: Joi.string().uri({
        scheme: [
            /https?/
        ]
    })
});


const sharers=db.get('sharers');

function getAll() {
    return sharers.find();
}

function createSharer (sharer){
    const result=Joi.validate(sharer, Schema);
    if(result.error==null){
        sharer.created= new Date();
        sharer.posted_by='John';
        return sharers.insert(sharer);
    }
    else{
        return Promise.reject(result.error);
    }
}

module.exports={
    getAll,
    createSharer
};
