const express = require("express");
const app = express();
app.use(express.json());

const db = require('./db');
const Todo = require('./todo')
console.log(Todo);

app.get('/',(req,res)=>{
   res.json('GET / is working')
})

app.get('/tasks',(req,res)=>{
    Todo.find({},(err,data)=>{
        if(err){
            console.log("ERROR: ", err);
        }else{
             res.json(data);
        }
    })
 })


app.post('/tasks', (req,res)=>{
    console.log("24:", req.body)
     Todo.create(req.body, (err,newTask)=>{
     if (err){
         console.log('ERROR: ', err);
     }else{
         res.status(201).json(newTask);
     }
     })
})

app.delete('/tasks/:id',(req,res)=>{
    console.log('36: ', req.params.id)
   Todo.deleteOne({_id: req.params.id}, (err,deleteObj)=>{
       if(err){
           console.log("ERROR: ", err);  
       }else{
         deleteObj.deletedCount == 1 ?
         ("Delete one todo successfully") :
         res.status(400).json("this todo is not found");
       }
   })
})

app.delete("/tasks",(req,res)=>{
    //console.log('36: ', req.params.id)
   Todo.deleteMany({isCompleted: true }, (err,deleteObj)=>{
       if(err){
           console.log("ERROR: ", err);  
       }else{
         deleteObj.deletedCount === 0 ?
            res.status(400).json("There is no completed todo found"):
          res.json("Delete all todos successfully");
     
       }
   })
})

app.put('/tasks/:id', (req,res)=>{
  Todo.updateOne(
      {_id: req.params.id},
    {title: req.body.newTitle},
    (err, updateObj)=>{
        if(err){
        console.log('ERROR: ', err);
        res.status(400).json(err)
    }else{
        console.log(updateObj);
     updateObj.modifiedCount === 1 ?
     res.json("Update one todo successfully"):
     res.status(404).json("This todo is not found")
    }
})
})

app.put('/tasks/:id/:isComepleted', (req,res)=>{
    console.log('80',req.params);
  Todo.updateOne(
        {_id: req.params.id},
      {isCompleted: req.params.isCompleted },
      (err, updateObj)=>{
          if(err){
          console.log('ERROR: ', err);
          res.status(400).json(err)
      }else{
          console.log(updateObj);
       updateObj.modifiedCount === 1 ?
       res.json("Update one todo successfully"):
       res.status(404).json("This todo is not found")
      }
  })
  })

// app.get('/completed',(req,res)=>{
//     Todo.find({isCompleted: true},(err,data)=>{
//       if(err){
//           console.log('ERROR: ', err)
//       }else{
//           console.log(data);
//           res.json(data)
//       }
//     })
// })

// app.get('/not_completed',(req,res)=>{
//     Todo.find({isCompleted: false},(err,data)=>{
//       if(err){
//           console.log('ERROR: ', err)
//       }else{
//           console.log(data);
//           res.json(data)
//       }
//     })
// })

app.get('/filter',(req,res)=>{

    console.log(req.query);
    Todo.find({isCompleted: req.query.isCompleted },(err,data)=>{
      if(err){
          console.log('ERROR: ', err)
      }else{
        //   console.log(data);
          res.json(data);
      }
    })
})


app.listen(5000, ()=>{
    console.log('SERVER is working ...')
})