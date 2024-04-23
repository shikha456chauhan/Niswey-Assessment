import express from "express"
import {Worker} from "worker_threads"
import fileUpload from "express-fileupload"

const app = express()
app.use(fileUpload())
const insertDataFunc = async(fileData) => {
    return new Promise((resolve, reject)=>{
        const worker = new Worker('./worker.js')
        worker.postMessage(fileData)

        worker.on('message',resolve)
        worker.on('error', reject)
        worker.on('exit',(code)=>{
            if (code !== 0)
                reject(new Error(`Worker stopped with exit code ${code}`))
        })  
   })
}

app.get('/', (req, res) => {
    res.send('Welcome to the file upload API! .To upload please try route `http://localhost:8000/upload` with POST method');
});

app.post("/upload",async (req, res)=>{
    try {
        let file = req.files?.file
        if(!file) throw new Error("Upload a file")

         // Validate file type
         if (file.mimetype !== 'application/xml') {
            throw new Error('Only XML files are allowed');
        }
        
        let result = await insertDataFunc(file.data)

        return res.status(200).json({
            status : true,
            data : result
        })
    } catch (error) {
        return res.status(400).json({
            status : false,
            message : error.message
        })
    }
})

app.listen("8000",()=>{
    console.log("app is listening on 8000")
})