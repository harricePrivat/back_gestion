const express= require('express')
const router = express.Router()
const multer = require('multer')
const User= require('../models/User')


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      // Destination du fichier
      cb(null, path.join(__dirname, "../images"));
    },
    filename: (req, file, cb) => {
      // Utiliser Req.titre comme nom de fichier
      const fileName = req.body.titre; // Utilisation de Req.titre pour le nom
      const timestamp = new Date().toISOString().replace(/[-:.]/g, "");
      const fileExtension = path.extname(file.originalname); // Extension du fichier
      const newFileName = `${fileName}_${timestamp}${fileExtension}`; // Exemple : "Titre_20231124083000.jpg"
  
      cb(null, newFileName); // Retourner le nouveau nom de fichier
    },
  });
  
  const upload = multer({ storage });
  
  // Utiliser le middleware upload.single pour gérer un seul fichier
  router.post("/create-user", upload.single("image"), async (req, res) => {
     const Req = req.body;
    console.log(Req)
     // try {
    //   if (Req.nom && Req.prenom && Req.naissance && Req.niveau) {
    //     let result
    //     if(Req.cin=="no"){
    //         result = await User.create({
    //             nom: Req.nom,
    //             prenom: Req.prenom,
    //             date_naissace: Req.naissance,
    //             niveau: Req.niveau,
    //             numero_cin: Req.cin,
    //             path_images: `http://192.168.43.41:3000/Images/${req.file.filename}`,
    //           });
    //     }else{
    //         result = await User.create({
    //             nom: Req.nom,
    //             prenom: Req.prenom,
    //             naissance: Req.naissance,
    //             niveau: Req.niveau,
    //             path_images: `http://192.168.43.41:3000/Images/${req.file.filename}`,
    //           });
    //     }  
         
    //     res.status(200).json({ message: "Publication créée avec succès" });
    //   } else {
    //     res.status(400).json({ error: "Champ vide impossible de créer la publication" });
    //   }
    // } catch (error) {
    //   res.status(500).json({ error: error.message });
    // }
  });
  

module.exports = router ;