import { Card } from "antd";
import React from "react";
import Moyenne from "./Moyenne";
import Module from "./Module";
import { Link } from "react-router-dom";

const DetailSemestre = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <nav aria-label="breadcrumb" className="bg-light rounded-3 p-3 mb-4">
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item">
                <Link to="/acceuil">Acceuil</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/acceuil/mesnotes">Mes Notes</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Module
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <Card>
        <Moyenne />
      </Card>
      <Card>
        <Module />
      </Card>
    </div>
  );
};

export default DetailSemestre;
