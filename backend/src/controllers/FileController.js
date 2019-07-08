const Box = require('../models/Box');
const File = require('../models/File');
const AuthGDrive = require("../config/gdrive-auth");
const fs = require("fs");
const {google} = require('googleapis');

class FileController {
    async store (req, res) {
     const box = Box.findById(req.params.id);

     const file = await File.create({
         title: req.file.originalname,
         path: req.file.key
     });    

     box.files.push(file);
     await box.save();

     //apos adicionar o arquivo, devera ser avisado para todos os usuarios dessa boxes (web, mobile) para receberem a informacao realtime
     req.io.sockets.in(box._id).emit('file', file);
     
     res.json(file);
    };

    async storeGDrive (req,res){        
        const box = await Box.findById(req.params.id);
        //adiciona no gdrive
        if(box!=null) {
            const fileMetadata = {name: req.file.originalname};
            const media = {            
                body: fs.createReadStream("tmp/"+req.file.key)
            }
    
            const drive = google.drive({version: 'v3', AuthGDrive});
            drive.files.create({
                resource: fileMetadata,
                media: media,
                fields: 'id'
                }, function (err, file) {
                if (err) {                
                    return res.status(400).send({error: "Nao foi possivel realizar upload do arquivo"});
                }
            });

            //cria o arquivo
            const file = await File.create({
                title: req.file.originalname,
                path: req.file.key
            });
            
            //salva o arquivo no box
            box.files.push(file);
            await box.save();
            req.io.sockets.in(box._id).emit('file', file);
            return res.status(200).send(file);                
        } else {
            return res.status(404).send({error: "Box nao existe"});
        }
    }
}

module.exports = new FileController();