const express=require ('express');
const cors=require('cors');
const morgan=require('morgan');
const bodyParser=require('body-parser');
const sharers=require('./db/sharers');
const blogs=require('./db/blogs');
const contacts=require('./db/contacts');
const users=require('./db/users');

const app=express();

app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());


app.get('/', (req, res)=>{
   sharers.getAll().then(sharers=>{
       res.json(sharers);
   });
});

app.post('/', (req, res)=>{
    console.log(req.body);
    sharers.createSharer(req.body).then((sharer)=>{
        res.json(sharer);
    }).catch((error)=>{
        res.status(500);
        res.json(error);
    });
    
});

app.post('/contact', (req, res)=>{
    console.log(req.body);
    contacts.createContact(req.body).then((contact)=>{
        res.json(contact);
    }).catch((error)=>{
        res.status(500);
        res.json(error);
    });
    
});

app.post('/blogs', (req, res)=>{
    console.log(req.body);
   blogs.createBlog(req.body).then((blog)=>{
        res.json(blog);
    }).catch((error)=>{
        res.status(500);
        res.json(error);
    });
    
});

app.post('/register', (req, res)=>{
    console.log(req.body);
   users.createUser(req.body).then((user)=>{
        res.json(user);
    }).catch((error)=>{
        res.status(500);
        res.json(error);
    });
    
});

app.get('/blogs', (req, res)=>{
    blogs.getAllBlogs().then(blogs=>{
        res.json(blogs);
    })
 });

app.get('/contact', (req, res)=>{
    contacts.getAllContacts().then(contact=>{
        res.json(contact);
    })
 });
 app.get('/register', (req, res)=>{
    users.getAllUsers().then(users=>{
        res.json(users);
    });
 });





const port=process.env.PORT=3000;
app.listen(port, ()=>{
    console.log(`Application listening on port ${port}`);
})
