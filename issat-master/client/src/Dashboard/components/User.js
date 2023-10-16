import Table from "react-bootstrap/Table";
import React , { useEffect, useState }  from "react";
import { Modal, Space } from "antd";
import { ExclamationCircleFilled } from '@ant-design/icons';
import { Button } from 'antd';
import UserDetail from "./UserDetail";

const User = () => {
  const { confirm } = Modal;
  const [userData, setUserData] = useState([]);
  const showConfirm = () => {
    confirm({
      title: 'Modifier Utilisateur',
      icon: <ExclamationCircleFilled />,
      content: <UserDetail />,
      
 
      width:'1000px',
      onOk() {
        console.log('OK');
      },
      
    });
  };

 const showDeleteConfirm = () => {
  
  confirm({
    title: 'Confirmer la suppression !!',
    icon: <ExclamationCircleFilled />,
    content:  <UserDetail />,
    okText: 'Confirmer',
    okType: 'danger',
    cancelText: 'Retour',
    width:'1000px',
    onOk() {
      console.log('OK');
    },
    onCancel() {
      console.log('Cancel');
    },
  });
};

useEffect(() => {
  fetch('http://localhost:3000/getEtudiant/alluser')
    .then((response) => response.json())
    .then((data) => {
      if (data.utilisateurs && Array.isArray(data.utilisateurs)) {
        setUserData(data.utilisateurs);
      } else {
        console.error('Invalid data format: "utilisateurs" array not found or not an array.');
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
            <th>Email</th>
            <th>Cin</th>
            <th>Role</th>
            <th>statut</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.email}</td>
              <td>{user.cin}</td>
              <td>{user.role}</td>
              <td>{user.statut}</td>
              <td>
                <div className="d-flex">
                  <Space wrap>
                    <Button size={"small"} onClick={() => showConfirm(user)}>Modifier</Button>
                  </Space>
                  <Space wrap>
                    <Button danger size={"small"} onClick={() => showDeleteConfirm(user)}>Supprimer</Button>
                  </Space>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default User;
