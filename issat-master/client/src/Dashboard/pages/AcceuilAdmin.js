import React from "react";
import "../../App.css";
import ListeAdmin from "../components/ListeAdmin";
import EtudiantListAttente from "../components/EtudiantListAttente";
import Enseignant from "../components/Enseignant";

const AcceuilAdmin = () => {
  return (
    <div>
      <div>
        <h4 className="mb-4"> Dashboard</h4>
        <div className="d-flex justify-content-between align-itmes-center gap-3">
          <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 roudned-3">
            <div>
              <p className="">Total Etudiant</p>
              <h4 className="mb-0">100$</h4>
            </div>
            <div className="d-flex flex-column align-items-end">
              <h6>32%</h6>
              <p className="mb-0">Juin</p>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 roudned-3">
            <div>
              <p className="">Total Admin</p>
              <h4 className="mb-0">100$</h4>
            </div>
            <div className="d-flex flex-column align-items-end">
              <h6>32%</h6>
              <p className="mb-0">Juin</p>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 roudned-3">
            <div>
              <p className="">Total </p>
              <h4 className="mb-0">100$</h4>
            </div>
            <div className="d-flex flex-column align-items-end">
              <h6>32%</h6>
              <p className="mb-0">Juin</p>
            </div>
          </div>
        </div>
      </div>{" "}
      <div className="mt-4">
        <h4 className="mb-4"> Liste des Etudiants en attente confirmation:</h4>
        <EtudiantListAttente />
      </div>
      <div className="my-4">
        <h4 className="mb-4"> Liste des Enseignants:</h4>
        <Enseignant />
      </div>
      <div className="my-4">
        <h4 className="mb-4"> Liste des Administrateurs:</h4>
        <ListeAdmin />
      </div>
    </div>
  );
};

export default AcceuilAdmin;
