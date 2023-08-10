import { useState } from "react";
import {  Tabs, Button, Space, Card } from "antd";
import './style.css';
import { ReloadOutlined } from "@ant-design/icons";

import { useTranslation } from "react-i18next";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {BlockchainDetailsEdit} from "./edit/";
import {BlockchainDetailsMain }from "./main/";
import { Fech_Blockchain } from "../../../../../modules";
import { useDispatch } from "react-redux";


export const BlockchainDetailsLayout =() =>{
  const location = useLocation();
  const dispach = useDispatch();
 
  const { t } = useTranslation();
  const { id } = useParams();
  const { TabPane } = Tabs;
  const [selectedMenuItem, setSelectedMenuItem] = useState(location.pathname);
  const [reload,setreload] = useState(false);
  const [loading,setloading] = useState(true)

  const onChange = (key) => {
    setSelectedMenuItem(key);
    setTimeout(() => {
      setloading(false)
    }, 2000);
  };

setInterval(() => {
  setloading(false)
}, 5000);

  return (
    <>
    
      <Card
        ghost={false}
        className="setter-page-header"
        
        extra={
          <Button icon={<ReloadOutlined />} loading={reload}  onClick={()=>{ dispach(Fech_Blockchain({t,setreload})); setreload(true) }}>
            {t("setter.layouts.configurations.blockchains.table.reload")}
          </Button>
        }
      >
        <Space direction="vertical" style={{ width: "100%" }}>
          <Tabs defaultActiveKey={1} onChange={onChange} >
            <TabPane
              tab={t("setter.layouts.configurations.blockchains.details.nav.main")}
              key={0}
              >
                <BlockchainDetailsMain loading={loading} />
              </TabPane>
            <TabPane
              tab={t("setter.layouts.configurations.blockchains.details.nav.edit")}
              key={1}
              onClick={()=>setloading(true)}
              >
              <BlockchainDetailsEdit loading={loading} id={id}/>
              </TabPane>
          </Tabs>

          
        </Space>
      </Card>
    </>
  );
}
