const Joi=require('Joi');
const db=require('./connections');

const Schema =Joi.object().keys({
    title: Joi.string().required(),
   
    message: Joi.string().required()
    
});


const blogs=db.get('blogs');

function getAllBlogs() {
    return blogs.find();
}

function createBlog (blog){
    const result=Joi.validate(blog, Schema);
    if(result.error==null){
        blog.created= new Date();
        blog.created="admin";
        return blogs.insert(blog);
    }
    else{
        return Promise.reject(result.error);
    }
}

module.exports={
    getAllBlogs,
    createBlog
};
