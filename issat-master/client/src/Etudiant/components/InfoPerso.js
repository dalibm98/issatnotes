import React, { useEffect } from "react";
import { Card, Descriptions } from "antd";
import  { useState } from "react";
import axios from "../../utils/axiosConfig";

const InfoPerso = (req, res) => {


  const [etudiantData, setEtudiantData] = useState({});

  useEffect(() => {
    const cin = localStorage.getItem("cin");
    console.log("userCin:",cin);
    if (cin) {
      axios.get(`/getEtudiant/etudiant/${cin}`)
        .then((res) => {
          setEtudiantData(res.data.etudiant);
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération des données de l'étudiant :", error);
        });
    }
  }, []);
  
  return (
    <div>
      <Card>
      
        <Descriptions title="Informations Personnelles:">
          <Descriptions.Item label="Nom et Prénom">
          {etudiantData.id}
            
          </Descriptions.Item>
          <Descriptions.Item label="Numéro CIN">
          {etudiantData.mat_cin}
          </Descriptions.Item>
          <Descriptions.Item label="Num Inscription">
          {etudiantData.Num_inscription}
          </Descriptions.Item>
          <Descriptions.Item label="Diplôme">
            MP-EN-Réseaux et Télécommunication
          </Descriptions.Item>
          <Descriptions.Item label="Date de naissance">
          {etudiantData.date_naissance}
          </Descriptions.Item>
          <Descriptions.Item label="Sexe">
            {etudiantData.sexe}
          </Descriptions.Item>
          <Descriptions.Item label="Cycle">3</Descriptions.Item>
          <Descriptions.Item label="Niveau d'études">1</Descriptions.Item>
          <Descriptions.Item label="Spécialité">
            1 ère MP RT(Nouveaux)
          </Descriptions.Item>
          <Descriptions.Item label="Email">
          {etudiantData.Email}
          </Descriptions.Item>
          <Descriptions.Item label="Telephone">
          {etudiantData.Telephone_Portable}
          </Descriptions.Item>
          <Descriptions.Item label="Année Universitaire">
            2022/2023
          </Descriptions.Item>
           
        </Descriptions>
      
      </Card>
    </div>
  );
};

export default InfoPerso;
