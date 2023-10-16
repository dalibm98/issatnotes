import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
//import multer from "multer";
//import XLSX from 'xlsx';
import bodyParser from "body-parser"
import { response } from "express";
import { json } from "sequelize";
import { etudiant } from "./GetEtudiant.js";

export const register = (req, res) => {
    const cin = req.body.cin;
    const numinscription = req.body.numinscription;
    const email = req.body.email;
    const password = req.body.password;
    


    //find user and hash password

    if (cin.length > 0 && numinscription.length > 0 && email.length > 0 && password.length > 0  ){
        
        const sql = 'SELECT * FROM issat2.etudiant WHERE Num_inscription=? AND mat_cin=? AND statut_etud=? ';
        db.query(sql, [numinscription,cin,"passif"], (err, result) => {
            
            if(result ==""){
               
                return res.status(200).json({ Message: "Merci de vérifier vos données", result });
            }
            if(result){
               
               
                 //hash password
                 const salt = bcrypt.genSaltSync(10);
                 const hash = bcrypt.hashSync(req.body.password, salt);
                //insertion d'un etudiant dans la table utilisateur
                 db.query('INSERT INTO issat2.utilisateur SET cin=?, email=?, role=?, statut=?, password=?' , [cin, email, "etudiant", "actif",  hash], (err, result) => {
                  
                     if (result) {
                      //update le statut de l'tudiant de passif vers actif
                        db.query('UPDATE issat2.etudiant SET statut_etud=? WHERE  mat_cin = ?' , ["actif", cin], (err, result) => {})
                        const id = numinscription+cin; 
                       console.log(response)
                        console.log("id pour token:",id)
                         const token = jwt.sign({ id }, "jwt-secret-key", { expiresIn: '20s' });
                         console.log("votre token", token)
                         //result.cookie('token', token);
                         //result.cookie('token', token);
                         return res.status(200).json({ Message: "User ajouter avec Success",token:token });
                     }

                     if (err) {
                         return res.status(400).json({ Message: "error in node" });
                     }
                 })
            }else{
                return res.status(401).json({ Message: "verifier" });
            }

        })
    }else {
        //console.log(res)
       // return res.send({ Message: "vérifier vos données" });
        return res.status(200).json({ Message: "vous devez vérifier vos données" });

    }
   

};


export const login = (req, result) => {

    const email = req.body.email;
    const password = req.body.password;
    let existEtudiant;

    if (email === "" && password === "") {
        return result.status(200).json({ Message: "vérifier votre login" });
    }


    const sql = 'SELECT * FROM issat2.utilisateur WHERE email = ?';
    db.query(sql, [email], (err, res) => {
        console.log("email is:", email);
        if ((res.length <= 0)) {
            console.log(res)
            return result.json({ Message: "Etudiant doesn't exist" });
        }

        if (res) {
            console.log("password in base is:", res[0].password);
            const isPassworsCoorect = bcrypt.compareSync(password, res[0].password);
            console.log("password is:", isPassworsCoorect)
            if ((email === res[0].email) && isPassworsCoorect) {
                existEtudiant = res[0];
                console.log("existe:",existEtudiant);
                console.log("password base", res[0].password)
                console.log("votre password:", password)
                console.log((email === res[0].email))
                const id = res[0].id
                const cin = res[0].cin;
                const role = res[0].role;
                const statut = res[0].statut;
                console.log("votre id", id)
                console.log("votre role:", role)
                console.log("votre statut:", statut)
                const token = jwt.sign({ id }, "jwt-secret-key", { expiresIn: '30s' });
                console.log("votre token:", token)
               
                result.cookie(String("mytoken"), token,{ path:'/', expires: new Date(Date.now() + 1000 * 30), httpOnly:true, sameSite:'lax'});
                const etudiant  = [id,cin,role, statut];
                console.log("etudiant:",etudiant)
        
                result.status(200).json({ Message: "Success" , token:token, etudiant});
               

            } else {
                console.log("password base", res[0].password)
                console.log("votre password:", password)
                console.log((email === res[0].email))
                result.status(200).json({ Message: "Wrong email and Password Combination" });
            }

        }

    })


}

export const logout = (req, res) => {
    res.clearCookie('mytoken')
    cookie.remove("mytoken")
    localStorage.remove("token")
    console.log(res)
    return res.json({ Status: "Success" });

}




export const listetudiant = (req, res) => {

}


export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
  
    if (!token) {
      return res.status(404).json({ message: "No token found" });
    }
  
    jwt.verify(token.replace("Bearer ", ""), "jwt-secret-key", (err, decoded) => {
      if (err) {
        console.log("Token est expiré à", err.expiredAt);
        return res.status(400).json({ message: "Token invalide", expirer: err.expiredAt });
      }
  
    
      const etudiantData = getUser(decoded.id); 
  
      // Renvoyer les informations de l'étudiant.
      return res.status(200).json({ message: "Token valide", etudiant: etudiantData });
    });
  };
  

export const getUser = async (req, res) => {
    const cin = req.params.cin;
    console.log(cin);
    try {
      const sql = 'SELECT * FROM issat2.etudiant WHERE mat_cin = ?';
      db.query(sql, [cin], (err, results) => {
        if (err) {
          console.error('Erreur lors de la récupération des données de l\'étudiant :', err);
          return res.status(500).json({ Message: 'Erreur lors de la récupération des données de l\'étudiant' });
        } else {
          const etudiant = results[0];
          console.log("etudiant :", etudiant);
          return res.status(200).json({ Message: "Étudiant récupéré avec succès", etudiant });
        }
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ Message: 'Erreur interne du serveur' });
    }
  };


export const getAllStudents = async (req, res) => {
    try {
        const sql = 'SELECT * FROM etudiant';
        db.query(sql, (err, results) => {
            if (err) {
                console.error('Erreur lors de la récupération des données des étudiants :', err);
                return res.status(500).json({ Message: 'Erreur lors de la récupération des données des étudiants' });
            } else {
                const etudiants = results;
                return res.status(200).json({ Message: "Étudiants récupérés avec succès", etudiants });
            }
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ Message: 'Erreur interne du serveur' });
    }
};
export const getNotesByCIN = async (req, res) => {
  const cin = req.params.cin;
  try {
      const sql = 'SELECT * FROM note WHERE cin = ?';
      db.query(sql, [cin], (err, results) => {
          if (err) {
              console.error('Erreur lors de la récupération des notes de l\'étudiant :', err);
              return res.status(500).json({ Message: 'Erreur lors de la récupération des notes de l\'étudiant' });
          } else {
              const notes = results;
              return res.status(200).json({ Message: "Notes de l'étudiant récupérées avec succès", notes });
          }
      });
  } catch (err) {
      console.error(err);
      return res.status(500).json({ Message: 'Erreur interne du serveur' });
  }
};



export const getAlluser = async (req, res) => {
    try {
        const sql = 'SELECT * FROM utilisateur';
        db.query(sql, (err, results) => {
            if (err) {
                console.error('Erreur lors de la récupération des données des utilisateur :', err);
                return res.status(500).json({ Message: 'Erreur lors de la récupération des données des utilisateur' });
            } else {
                const utilisateurs = results;
                return res.status(200).json({ Message: "Étudiants récupérés avec succès", utilisateurs });
            }
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ Message: 'Erreur interne du serveur' });
    }
};

