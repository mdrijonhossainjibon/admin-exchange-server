import React, { useEffect } from "react";
import { Button, Layout, Menu, Space, Switch } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import './style.css'
import {
  ApiOutlined,
  PoweroffOutlined,
  SwapOutlined,
  TeamOutlined,
  SettingOutlined,
  DashboardOutlined,
  FireOutlined,
  BulbOutlined,
  LoginOutlined,
  ContactsFilled,
  CustomerServiceOutlined,
  RedEnvelopeOutlined,
  SoundOutlined,
  CloudServerOutlined
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useDispatch ,useSelector} from "react-redux";

import { Login, fetchAdminToken} from "../modules";


export default function MainLayout({ children }) {
  const { Footer, Header } = Layout;
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(Login);
  const token = sessionStorage.getItem('token');
  
  const isLogin = sessionStorage.getItem('login');
   

  useEffect(() => {
    if (token) {
      dispatch(fetchAdminToken());
    }

  }, [dispatch, isLoggedIn, token]);
  
  const menuItems = [
    { key: '/', icon: <DashboardOutlined />, text: t("setter.header.tabs.dashboard") },
    { key: '/users', icon: <TeamOutlined />, text: t("setter.header.tabs.users") },
    { key: '/operations', icon: <SwapOutlined />, text: t("setter.header.tabs.operations") },
    { key: '/configuration', icon: <SettingOutlined />, text: t("setter.header.tabs.configuration") },
    { key: '/devops', icon: <ApiOutlined />, text: t("setter.header.tabs.devops") },
    { key : '/Contacts',icon : <CustomerServiceOutlined /> ,text : 'Customer'},
    {key : '' , icon : <RedEnvelopeOutlined />,text : 'Red Envelope'},
    { key : '', icon : <SoundOutlined />,text : 'annoument'},
    {key :'' ,icon : <CloudServerOutlined />, text : 'SMTP '},
    {key : '', icon : null, text : (
      <Space style={{position : 'relative',right: window.screen.width > 361 ? '-35%' : null}}>
         <Button   type="primary"  danger={isLogin} size='small' icon={isLogin ? <PoweroffOutlined /> : <LoginOutlined/>}>{isLogin ? 'Logout' : 'Login'}</Button>
         <Switch
              checkedChildren={<FireOutlined />}
              unCheckedChildren={<BulbOutlined />}
              defaultChecked={"dark"}
              onChange={(v) => {
              //setTheme(v ? "" : "dark");
              }}
            />
      </Space>
    )
    }
  ];

  const menuItemOnClick = (e) => {
    navigate(String(e.key));
  };

  const activeRoute = menuItems.find((item) => location.pathname.includes(item.key))?.key;

  const handleLogout = () => {
    if (isLogin) {
      // Perform logout actions
      sessionStorage.clear();
     window.location.href = '/'
    } else {
      navigate('/login');
    }
  };

  return (
    <Layout className="">
      {(
        <Header className="">

          <Menu
            theme="dark"
            className="setter-main-container-header-nav"
            mode="horizontal"
            onClick={menuItemOnClick}
            selectedKeys={activeRoute ? [activeRoute] : undefined}
          >
            {menuItems.map(({ key, icon, text }) => (
              <Menu.Item key={key} icon={icon}>
                {text}
              </Menu.Item>
            ))}
          </Menu>
        </Header>
      )}
      <Layout>{children}</Layout>
      <Footer className="setter-main-footer">
        Powered by <a href="https://www.tunex.io">TuneX LLC</a> and{" "}
        <a href="https://digital-magic.io">Digital Magic Ltd</a>
      </Footer>
    </Layout>
  );
}
