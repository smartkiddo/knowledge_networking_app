const monk=require ('monk');

const url = 'localhost:sharingproject';

const db = monk(url);

db.then(() => {
  console.log('Connected correctly to server')
})

module.exports=db;
