import React from "react";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import axios from 'axios';
import {
  FileOutlined,
  PieChartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  AiOutlinePicRight,
  AiOutlinePicLeft,
  AiOutlineLogout,
} from "react-icons/ai";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Button, Layout, Menu, theme } from "antd";
import {  useState, useEffect } from "react";
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}


const items = [
  getItem("Acceuil", "acceuil", <PieChartOutlined />),
  getItem("Mes Notes", "mesnotes", <UserOutlined />),
  getItem("Emploi de Temps", "Emploi", <UserOutlined />),
  getItem("Profile", "profile", <FileOutlined />),
  getItem("Quitter", "quité", <AiOutlineLogout />),
];

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const navigate = useNavigate();

  const handelLogout = ()=>{
        localStorage.removeItem('token')
        localStorage.removeItem('cin')
        localStorage.removeItem('role')
        navigate('/')
  }
  const [etudiantData, setEtudiantData] = useState({}); 
  useEffect(() => {
    
    const cin = localStorage.getItem('cin');

    if (cin) {
      // Faire une requête pour obtenir les données de l'étudiant
      axios
        .get(`/getEtudiant/etudiant/${cin}`)
        .then((response) => {
          setEtudiantData(response.data.etudiant);
        })
        .catch((error) => {
          console.error('Erreur lors de la récupération des données de l\'étudiant :', error);
        });
    }
  }, []); 
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="logo">
          <h4 className="text-white fs-5 text-center py-2 mb-0">
            <span className="sm-logo">ISSAT Mateur</span>
            <span className="lg-logo">Logitheque</span>
          </h4>
        </div>

        <Menu
          theme="dark"
          defaultSelectedKeys={[""]}
          mode="inline"
          onClick={({ key }) => {
            if (key === "signout") {
            } else {
              navigate(key);
            }
          }}
          items={items}
        />
      </Sider>
      <Layout>
        <Header
          className="d-flex justify-content-between ps-1 pe-5"
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          {React.createElement(
            collapsed ? AiOutlinePicRight : AiOutlinePicLeft,
            {
              className: "triger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
          <div className=" d-flex gap-3 align-items-center">
            <div></div>
            <div className="d-flex gap-3 align-items-center">
              <div>
                <img
                  width={32}
                  height={32}
                  src="https://stroyka-admin.html.themeforest.scompiler.ru/variants/ltr/images/customers/customer-4-64x64.jpg"
                  alt=""
                />
              </div>
              <div>
                <p className="mb-0">{etudiantData.Email}</p>
                <h5 className="mb-0">{etudiantData.statut}</h5>
              </div>
              <div>
                <div>
                  <Nav>
                    <NavDropdown
                      id="nav-dropdown-dark-example"
                      title=""
                      menuVariant="gary"
                    >
                      <NavDropdown.Item>
                        
                        <Link to="/acceuil/profile">Profile</Link>
                       
                      </NavDropdown.Item>
                      <NavDropdown.Item>
                        <Button type="primary" onClick={handelLogout}>
                                  Logout
                        </Button>
                      </NavDropdown.Item>
                    </NavDropdown>
                  </Nav>
                </div>
              </div>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            backgroundColor: colorBgContainer,
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          ISSAT Mateur ©2023 Created by Ghanmi Abdessattar
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
