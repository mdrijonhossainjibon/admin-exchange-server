
import { Row, Collapse, Col, Descriptions, Button, Space, Image, Typography, Card } from "antd";
import countryISO from "i18n-iso-countries";

import { useDate } from "../../../../../../utils/hooks";
import { ProfileState } from "../../../../../../constants/user";
import { LabelKey, LabelScope, LabelValue } from "../../../../../../constants/user";
import { useTranslation } from "react-i18next";


const profileStateColors = {
  [ProfileState.Verified]: "success",
  [ProfileState.Rejected]: "danger",
  [ProfileState.Submitted]: "warning",
  [ProfileState.Drafted]: undefined,
};


const user = {
  state: "Verified",
  first_name: "John",
  last_name: "Doe",
  address: "123 Main Street",
  city: "New York",
  country: "US",
  dob: "1990-01-01",
  nationality: "US",
  postcode: "10001",
  documents: [
    {
      doc_type: "Passport",
      doc_number: "A1234567",
      doc_expire: "2025-06-30",
      upload: {
        url: "https://example.com/passport.jpg",
      },
    },
    {
      doc_type: "Driver's License",
      doc_number: "B9876543",
      doc_expire: "2023-12-31",
      upload: {
        url: "https://example.com/license.jpg",
      },
    },
  ],
  
};

export const UserDetailsKYC =() =>{
 
    const { t } = useTranslation();

    const docActions = () => {
     
       return(
       <Space>
              <Button type="primary" danger >
                {t("setter.layouts.users.details.main.profile.reject")}
              </Button>
              <Button type="primary" >
               {t("setter.layouts.users.details.main.profile.approve")}
              </Button>
            </Space>
       )
       
    }
        

    const documents = () => {
       
          return (
            <Collapse accordion defaultActiveKey={["0"]}>
             {user.documents.map((el,index)=>(
              <Collapse.Panel
                  header={`${el.doc_type} #${el.doc_number} ${t("expired")} ${el.doc_expire}`}
                  key={String(index)}
                >
                  <Image width="100%" alt="doc" src={'el.upload.url'} />
                </Collapse.Panel>
             ))}
                
             
            </Collapse>
          );
        
      };





      const renderProfileValues = () => {
        
       
          const keys= [
            "state",
            "first_name",
            "last_name",
            "address",
            "city",
            "country",
            "dob",
            "nationality",
            "postcode",
          ];
    

          const data = {};

keys.forEach((key) => {
  if (user.hasOwnProperty(key)) {
    data[key] = user[key];
  }
});    


         
    
          return keys.map((key) => {
            let value = user[key];
            let label = t(`setter.layouts.users.details.main.profile.${key}`);
    
            
    
            if (key === "state") {
              value = (
                <Typography.Text strong type={profileStateColors[value]}>
                  {t(`setter.layouts.users.details.main.profile.state.${value}`)}
                </Typography.Text>
              );
              label = t(`setter.layouts.users.details.main.profile.state.title`);
            }
    
           
    
            return (
              <Descriptions.Item key={key} label={label}>
                {value}
              </Descriptions.Item>
            );
          });
       
      };      

  return (
    <>
    <Row>

    <Col span={12}>
        <Card title={t('setter.layouts.users.details.main.profile.title')}>
        <Descriptions>
            {renderProfileValues()}
        </Descriptions>
        
        </Card>
    </Col>
    <Col span={12}>
        <Card title={'documents'}  extra={docActions()}>
        {documents()}
        </Card>
    </Col>
    </Row>
    </>
  );

}