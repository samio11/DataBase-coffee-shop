const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
// require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json())
app.use(cors())



const uri = `mongodb+srv://coffee-shop-web:2jG27mVlRXyYgGd7@cluster0.mmutbdd.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const database = client.db("Coffe-Shop");
    const coffee = database.collection("coffee");


    app.post('/viewcoffee',async(req,res)=>{
      const coffe = req.body;
      const result = await coffee.insertOne(coffe);
      res.send(result)
    })

    app.delete('/viewcoffee/:id',async(req,res)=>{
      const id = req.params.id;
      const query = {_id : new ObjectId(id)}
      const result = await coffee.deleteOne(query)
      res.send(result)
    })

    app.get('/viewcoffee/:id',async(req,res)=>{
      const id = req.params.id;
      const query = {_id : new ObjectId(id)}
      const corser = coffee.find(query)
      const result = await corser.toArray()
      res.send(result)
    })

    app.put('/viewcoffee/:id',async(req,res)=>{
      const id = req.params.id;
      const data = req.body;
      console.log(data)
      const filter = {_id : new ObjectId(id)}
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          name: data.name1,
          chef : data.chef1,
          supplier : data.supplier1,
          price : data.price1,
          category : data.category1,
          details : data.details1,
          photo : data.photo1
        },
      };
      const result = await coffee.updateOne(filter,updateDoc,options)
      res.send(result)
    })

    app.get('/viewcoffee',async(req,res)=>{
      const corser = coffee.find();
      const result = await corser.toArray();
      res.send(result)
    })
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.listen(port,()=>{
    console.log(`Port is awesome at :- ${port}`)
})