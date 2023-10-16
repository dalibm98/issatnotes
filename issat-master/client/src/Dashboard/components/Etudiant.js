import Table from "react-bootstrap/Table";
import React, { useEffect, useState } from 'react';


const Etudiant = () => {
  const [studentData, setStudentData] = useState([]);

  useEffect(() => {
   
    fetch('http://localhost:3000/getEtudiant/etudiant')
      .then((response) => response.json())
      .then((data) => {
     
        if (data.etudiants && Array.isArray(data.etudiants)) {
         
          const filteredStudents = data.etudiants.filter((student) => student.statut_etud.trim().toLowerCase() === 'actif');
          setStudentData(filteredStudents);
          console.log(filteredStudents)
        } else {
          console.error('Invalid data format: "etudiants" array not found or not an array.');
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <Table responsive="xl">
        <thead>
          <tr>
            <th>N°</th>
            <th>N°_Inscription</th>
            <th>CIN</th>
            <th>Nom_et_prénom</th>
            <th>Diplôme</th>
            <th>Niveau</th>
            <th>Spécialité</th>
        
          </tr>
        </thead>
        <tbody>
          {studentData.map((student, index) => (
            <tr key={student.id}>
              <td>{index + 1}</td>
              <td>{student.mat_cin}</td>
              <td>{student.nom_ar + ' ' + student.prenom_ar}</td>
              <td>{student.passeport}</td>
              <td>{student.passeport}</td>
              <td>{student.passeport}</td>
              <td>{student.statut_etud}</td>
            
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Etudiant;