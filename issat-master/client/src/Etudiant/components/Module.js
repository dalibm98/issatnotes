import React , { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import axios from "axios";

const Module = () => {

  const [notes, setNotes] = useState([]);
  const cin = localStorage.getItem("cin");

  useEffect(() => {
    if (cin) {
      axios.get(`http://localhost:3000/notes/${cin}`).then((response) => {
        setNotes(response.data.notes);
      });
    }
  }, [cin]);
  return (
    <div>
      <Table responsive="sm">
        <thead>
          <tr>
           
            <th>Code_Ue</th>
            <th>Module</th>
            <th>Credit</th>
            <th>Coef</th>
            <th>Nat</th>
            <th>Rg</th>
            <th>Moy</th>
            <th>Detail</th>
          </tr>
        </thead>
        <tbody>
        {notes.map((note, index) => (
          <tr key={index}>
            <td>{note.num_inscrit}</td>
            <td>{note.matiere}</td>
            <td>{note.credits}</td>
            <td>{note.note_expose}</td>
            <td>{note.note_oral}</td>
            <td>{note.note_oral}</td>
            <td>{note.moyenne}</td>
            <td>
              <Link to={`/acceuil/DetailModule `}>Detail</Link>
               {/*  ${note.module_id}   tawali tzid hathy fi lien detaail ki tekmel 5idma ama inty mouch 3amel rabet module w note maba3thoum fi base lazem ytrabtou twa bich injiblik mili table  notes w khaw  */}
            </td>
          </tr>
        ))}
       
        </tbody>
      </Table>
    </div>
  );
};

export default Module;
