import { Card } from "antd";
import React, { useState} from 'react';
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import axios from 'axios';
import Parcours from "../components/Parcours";


const ListeMatieres = () => {
  const acceptablefile = ["xlsx", "xls"];
  const checkFile = (name)=>{
    return acceptablefile.includes(name?.split(".").pop().toLowerCase());
  }

  const [uploadedFile, setUploadedFile]= useState('');
  const [file, setFile] = useState('');
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    const datafile = e.target.files[0];
    if (!datafile){
      console.log("merci de vérifier le fichier")
    }
   
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append('excelFile', file);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    }

    if (!checkFile(file.name)) {
      console.log("invalid file type")
      setError("invalid file type")
    }else{
          await axios.post('/ajout/ajoutetudiant', formData, config).then((response) => {
            setUploadedFile("Données importées avec succès")
            console.log(response.data)
          }).catch((error) => {
            setError(error)
            console.log("Erreur lors de du l'upload du fichier, merci de verifier le fichier selectionnée: ", error);
          });
    }
  };
  const handleReset = async (e) => {
    e.preventDefault();
    setUploadedFile('');
    setFile('')

  }




  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <nav aria-label="breadcrumb" className="bg-light rounded-3 p-3 mb-4">
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item">
                <Link to="/admin/acceuil">Acceuil</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Ajout Matieres
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <Card>
        <Form>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>
            Selectionné le fichier Excel contenant la liste des Matieres:
          </Form.Label>
          <Form.Control type="file"  accept=".xls, .xlsx" name='file' onChange={handleFileChange} />
        </Form.Group>
        <Stack gap={2} className="col-md-5 mx-auto">
          <Button type="submit"  onClick={handleSubmit} variant="secondary">Ajouter</Button>
          <Button type="submit" onClick={handleReset} variant="secondary">Retour</Button>
        </Stack>
        </Form>
        {uploadedFile && <label>uploadedFile: {uploadedFile}</label>}
         {error && <p>Error uploading file: {error}</p>}
      </Card>
      <Card>
      <div className="mt-4">
               <h4 className="mb-4"> Liste des Matieres:</h4>
               <Parcours/>
      </div>
      </Card>
    </div>
  );
};

export default ListeMatieres;
