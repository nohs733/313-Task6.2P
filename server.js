const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const Worker = require("./models/Worker")

const app = express();
app.use(express.json());

app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect("mongodb://localhost:27017/crowdWorkers", {useNewUrlParser: true, useUnifiedTopology: true})

app.route('/workers')
.get((req, res)=>{
    Worker.find((err, workerList)=>{
        if (err) {res.send(err)}
        else {res.send(workerList)}
    })
})
.post((req,res)=>{
    const worker = new Worker({
        worker_name : req.body.name,
        worker_password: req.body.password,
        worker_address: req.body.address,
        worker_mobile: req.body.mobile
    })
    worker.save((err) =>{
        if (err) {res.send(err)}
        else res.send ('Successfully added a new worker')
    })
})
.delete((req,res) =>{
    Worker.deleteMany((err) =>{
        if (err) {res.send(err)}
        else {res.send('Successfully deleted all workers')}
    })
})


app.route('/workers/:id')
.get((req, res)=>{
    Worker.findOne({worker_name: req.params.id},
        {worker_password: req.params.id},
        {worker_address: req.params.id},
        {worker_mobile: req.params.id}, (err, foundWorker)=>{
        if (foundWorker) (res.send(foundWorker))
        else res.send("No Matched Worker")
    })
})
.put((req,res)=>{
Worker.update(
    {worker_name: req.params.id},
    {worker_name: req.body.name},
    
    {overwrite:true},
    (err)=>{
        if (err) {res.send(err)}
        else {res.send('Successfully updated!')}
    },

    )
})

.patch((req, res)=>{
    Worker.update(
        {worker_name: req.params.id},      
        {$set: req.body},
        (err)=>{
            if (!err) {res.send('Successfully updated! ')}
            else res.send(err)
        }
    )
})



/*.patch(async (req, res) => {
    try {
        const post = await Worker.findByIdAndUpdate(req.params.id, req.body)
        if(!post) throw Error ('Something went wrong')

        res.status(200).json({success: true})
    } catch(err) {
        res.status(400).json({msg: err})
    }
})*/



app.listen(process.env.PORT || 8000, () => {
    console.log('server ready')
})