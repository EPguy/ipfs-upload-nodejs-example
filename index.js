const ipfsClient = require('ipfs-http-client');
const express = require('express');
const fs = require('fs');
const app = express();
const ipfs = new ipfsClient({host: "localhost", port: "5001", protocol: "http"})
const multer = require('multer');
const filePath = "uploads/";
const upload = multer({ dest: filePath })

app.post('/uploadFile', upload.single('file'), async function(req, res) {
    let testFile = fs.readFileSync(filePath+req.file.filename);
    let testBuffer = Buffer.from(testFile)

    const ipfsResponse = await ipfs.add(testBuffer);
    const fileHash = String(ipfsResponse.cid);
    console.log("ipfs url : " + "https://ipfs.io/ipfs/" + fileHash);
    res.send();
})

app.listen(8000, () => console.log('App listening on port 8000!'))