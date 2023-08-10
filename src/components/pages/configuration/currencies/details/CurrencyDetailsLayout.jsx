import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Card, Tabs, Skeleton, Space } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import {CurrencyDetailsEdit }from "./edit";
import{ CurrencyDetailsMain }from "./main";
import { Fech_Blockchain,Currency_Fecth } from "../../../../../modules";
import { useDispatch } from "react-redux";

export const CurrencyDetailsLayout = ()=> {
  const { t } = useTranslation();

  const { id } = useParams();
  const location = useLocation();
  const history = useNavigate();

  const [selectedTab, setSelectedTab] = useState(1);
  const [from,setfrom] = useState(true);
  const [from1,setfrom1] = useState(true);
  const dispach = useDispatch();
  const [loading,setloading] = useState(false);
  

    setTimeout(() => {
      setfrom(false);
      setfrom1(false)
    }, 2000);

  const handleTabChange = (key) => {
     setSelectedTab(key);
  };

  useEffect(()=>{
   dispach(Fech_Blockchain());
   dispach(Currency_Fecth())
  },[dispach])

  const HandelReload =()=>{
    dispach(Fech_Blockchain());
    dispach(Currency_Fecth(setloading))
    setloading(true)
  }

  return (
    <>
      <Card
        className="setter-page-header"
        ghost={false}
        
        title={id?.toUpperCase()}
        
        extra={[
          <Button icon={<ReloadOutlined />} 
            onClick={HandelReload}
            loading={loading}
          >
            {t("setter.layouts.configurations.currencies.table.reload")}
          </Button>,
        ]}
      >
        <Space direction="vertical" style={{ width: "100%" }}>
          <Tabs onChange={handleTabChange}  defaultActiveKey={selectedTab}>
            <Tabs.TabPane
              tab={t("setter.layouts.configurations.currencies.details.nav.main")}
              key={1}
            >
              <Skeleton loading={from} active paragraph={{ rows: 24 }}>
                <CurrencyDetailsMain id={id}/>
                </Skeleton>
            </Tabs.TabPane>
            <Tabs.TabPane
              tab={t("setter.layouts.configurations.currencies.details.nav.edit")}
              key={2}
            >
                <Skeleton loading={from1} active paragraph={{ rows: 9 }}>
                <CurrencyDetailsEdit  id={id}/>
                </Skeleton>
            </Tabs.TabPane>
          </Tabs>
         

        </Space>
      </Card>
    </>
  );
}
