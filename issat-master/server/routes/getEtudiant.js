import express from "express"
//import { etudiant } from "../controllers/getEtudiant.js";
import { getUser, verifyToken ,getNotesByCIN, getAllStudents, getAlluser} from "../controllers/auth.js";



const router = express.Router()

router.get("/etudiant/:cin", getUser)
//router.get("/logout", logout)

router.get("/etudiant/", getAllStudents)
router.get("/alluser", getAlluser);
router.get("/:cin", getNotesByCIN);
export default router