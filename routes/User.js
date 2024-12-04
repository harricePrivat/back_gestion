const express= require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const User= require('../models/User')
const fs = require('fs');







// Configuration de Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Sous-dossier basé sur le nom, prénom et niveau
    const userFolder = path.join(__dirname, "../images",`${req.body.niveau}`, `${req.body.nom}_${req.body.prenom}_${req.body.niveau}`);
    if (!fs.existsSync(userFolder)) {
      fs.mkdirSync(userFolder, { recursive: true }); // Crée le dossier s'il n'existe pas
    }
    cb(null, userFolder); // Définit la destination
  },
  filename: (req, file, cb) => {

    const newFileName = `${req.body.nom}_${req.body.prenom}_${file.originalname}`; 
    cb(null, newFileName); // Retourne le nouveau nom de fichier
  },
});

const upload = multer({ storage });

// Route pour gérer plusieurs fichiers
router.post("/create-user", upload.fields([
  {name:"image_student", maxCount:1},
  {name:"image_note", maxCount:1},
  {name:"image_cin", maxCount:1}
]), async (req, res) => {
  const Req = req.body;
  const files = req.files; // Récupère les fichiers téléchargés

  try {
    if (Req.nom && Req.prenom && Req.naissance && Req.niveau) {
      const imageStudentFilename = files.image_student ? files.image_student[0].filename : null;
const imageNoteFilename = files.image_note ? files.image_note[0].filename : null;
const imageCinFilename = files.image_cin ? files.image_cin[0].filename : null;
      const pathNote=`http://192.168.43.223:3000/images/${Req.niveau}/${req.body.nom}_${req.body.prenom}_${req.body.niveau}/${imageNoteFilename}`;
      const pathCin=`http://192.168.43.223:3000/images/${Req.niveau}/${req.body.nom}_${req.body.prenom}_${req.body.niveau}/${imageCinFilename}`;
      const pathstudent=`http://192.168.43.223:3000/images/${Req.niveau}/${req.body.nom}_${req.body.prenom}_${req.body.niveau}/${imageStudentFilename}`

      // const filePaths = {
      //   image_student: files.image_student ? `http://192.168.43.223:3000/images/${Req.niveau}/${files.image_student[0].filename}` : null,
      //   image_note: files.image_note ? `http://192.168.43.223:3000/images/${Req.niveau}/${files.image_note[0].filename}` : null,
      //   image_cin: files.image_cin ? `http://192.168.43.223:3000/images/${Req.niveau}/${files.image_cin[0].filename}` : null,
      // };      console.log(filePaths)

      const result = await User.create({
        nom: Req.nom,
        prenom: Req.prenom,
        date_naissace: Req.naissance,
        niveau: Req.niveau,
        anneeBacc: Req.anneeBacc,
        numero_cin: Req.cin,
        path_images_student: pathstudent, // Enregistrer les chemins des fichiers (par exemple en JSON)
        path_images_note: pathNote, // Enregistrer les chemins des fichiers (par exemple en JSON)
        path_images_cin: pathCin, // Enregistrer les chemins des fichiers (par exemple en JSON)

       });

       res.status(200).json({ message: "Utilisateur créé avec succès"});
    } else {
      res.status(400).json({ error: "Champ vide, impossible de créer l'utilisateur" });
    }
  } catch (error) {
    console.error("Erreur lors de la création de l'utilisateur :", error);
    res.status(500).json({ error: error.message });
  }
});



  router.post('/get-student',async (req,res)=>{
    const Req=req.body
    console.log(req.body)
    const result= await User.findAll(
      {
        where:{
          niveau:Req.niveau
        }
      }
    )
    res.json(result)
  })
  

module.exports = router ;