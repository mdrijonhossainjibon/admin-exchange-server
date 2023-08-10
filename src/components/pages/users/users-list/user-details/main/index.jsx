import { useEffect, useState } from "react";
import { EllipsisOutlined } from "@ant-design/icons";
import { Button, Card, Col, Descriptions, Empty, Row, List, Select, Modal, Switch, Space, Typography } from "antd";

import { useDate } from "../../../../../../utils/hooks";
import { ProfileState, UserRole, UserState } from "../../../../../../constants/user";
import { useTranslation } from "react-i18next";
import { ProfileForm } from "./form";
//import UserLabels from "../labels/UserLabels";
//import ProfileForm from "./form/ProfileForm";
import { KYCVerification }from "../kyc/KYCVerification";
import { useDispatch, useSelector } from "react-redux";
import { SelectUserdata , fetchUser,UserUpdate,updateUser} from "../../../../../../modules";
import { useNavigate } from "react-router-dom";
const profileStateColors = {
  [ProfileState.Verified]: "success",
  [ProfileState.Rejected]: "danger",
  [ProfileState.Submitted]: "warning",
  [ProfileState.Drafted]: undefined,
};

export const UserDetailsMainInfo =({ user,uid })=> {
  const history = useNavigate()

  const { formatDate } = useDate();
  const { t: translate } = useTranslation();

   const UsersInfo = useSelector(SelectUserdata); 
   const dispatch = useDispatch()

   const Userdata =  UsersInfo && UsersInfo.find((value)=> value.uid.includes(uid))


  const t = (id) => translate(`setter.layouts.users.details.main.${id}`);

   


  const handleUpdate =  (variables) => {
dispatch(UserUpdate(variables))



  };

  
 

  const tradingFeesArray = () => {
    const result = [];
  
    const freeGroupData = [
      { id: 1, group: "VIP 0", market_id: "BTC", maker: "1%", taker: "2%" },
      { id: 2, group: "VIP 1", market_id: "ASD", maker: "0.%", taker: "2%" },
    ];

    // Push free group data
    freeGroupData.forEach((group) => {
      result.push(group.group);
    });
  
    return result;
  };

  
  

const HandelUser = ()=>{

 history(`/users/details/${Userdata && Userdata.referralBy}`)
}
  const renderProfileValues = () => {
 
     

      const keys = [
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

      const onHandleState = (state) => {
       
      };

      return keys.map((key) => {
        let value = ''
        let label = t(`profile.${key}`);

        if (key === "dob") value = formatDate(value, "PP");

        if (key === "state") {
          if (value === "submitted") {
            value = (
              <List>
                <List.Item
                  actions={[
                    <Button type="primary" danger onClick={() => onHandleState("rejected")}>
                      {t("profile.reject")}
                    </Button>,
                    <Button type="primary" onClick={() => onHandleState("verified")}>
                      {t("profile.approve")}
                    </Button>,
                  ]}
                >
                  <List.Item.Meta
                    description={
                      <Typography.Text strong type={profileStateColors[value]}>
                        {t(`profile.state.${value}`)}
                      </Typography.Text>
                    }
                  />
                </List.Item>
              </List>
            );
          } else {
            value = (
              <Typography.Text strong type={profileStateColors[value]}>
                {t(`profile.state.${value}`)}
              </Typography.Text>
            );
          }
          label = t(`profile.state.title`);
        }

        return (
          <Descriptions.Item key={key} label={label}>
            {value}
          </Descriptions.Item>
        );
      });
    }



  

  return (
    <>
      <Card className="setter-details-card">
        <Descriptions column={2} bordered title={t("title")}>
          <Descriptions.Item label={t("uid")}>{Userdata && Userdata.uid}</Descriptions.Item>
          <Descriptions.Item label={t("level")}>{Userdata && Userdata.level}</Descriptions.Item>
          <Descriptions.Item label={t("email")}>{Userdata && Userdata.email}</Descriptions.Item>
          <Descriptions.Item label={t("role")}>
          <EditableItem  t={t} options={Object.values(UserRole)} value={Userdata && Userdata.role} onUpdate={handleUpdate} promise={'role'} uid={Userdata && Userdata.uid}/>

          </Descriptions.Item>
          <Descriptions.Item label={t("referral")}>
           
              <List>
                <List.Item
                  extra={
                    <Button
                      shape="circle"
                      icon={<EllipsisOutlined />}
                      onClick={HandelUser}
                    />
                  }
                >
                  <List.Item.Meta title={Userdata && Userdata.referralBy} />
                </List.Item>
              </List>
         
          </Descriptions.Item>
          <Descriptions.Item label={t("feeGroup")}>
          <EditableItem  t={t} options={tradingFeesArray()}  promise={'Fee-group'} value={Userdata && Userdata.group} onUpdate={handleUpdate}  uid={Userdata && Userdata.uid} />

          </Descriptions.Item>
          <Descriptions.Item label={t("2fa.label")}>
            <Space>
              <Switch   checked={Userdata && Userdata.auth}  onChange={()=>handleUpdate({promise : 'auth',uid :  Userdata && Userdata.uid })} />
              <span>{Userdata && Userdata.auth ? t("2fa.enabled") : t("2fa.disabled")}</span>
            </Space>
          </Descriptions.Item>

          
          <Descriptions.Item label={t("state")}>
            
          <EditableItem  t={t}  options={Object.values(UserState)} promise={'status'} value={Userdata && Userdata.Status} onUpdate={handleUpdate}  uid={Userdata && Userdata.uid}/>
          </Descriptions.Item>
        </Descriptions>


        <Row gutter={24} style={{marginTop : '14px'}}>
          <Col span={12}>
            <Descriptions
              title={
                <Space >
                  <div>{t("profile.title")}</div>
                  <EditProfile user={user} t={t}/>
                </Space>
              }
              column={1}
              bordered
            >
             
               
                { renderProfileValues() }
            </Descriptions>
          </Col>
          <Col span={12}>
            <KYCVerification user/>
          </Col>
        </Row>
      </Card>
      UserLabels user={user}
    </>
  );
}




const EditableItem = ({
    value,
    onUpdate,
    options,
    t,
    promise,
    uid
  }) => {
    const [isEditing, setEditing] = useState(false);
    const [loading, setLoading] = useState(false);
  
    const handleSelect =  (selectedValue) => {
      setLoading(true);
      selectedValue !== value &&  onUpdate({ promise  ,selectedValue,uid})
      setEditing(false);
      setLoading(false);
    };
  console.log(value)
    return (
      <>
      
        {isEditing ? (
          <Select loading={loading} defaultValue={value} onSelect={handleSelect} dropdownMatchSelectWidth={false}>
            {options.map((value) => (
              <Select.Option key={value} value={value}>
                {value}
              </Select.Option>
            ))}
          </Select>
        ) : (
          value
        )}
        <Button type="link" onClick={() => setEditing(!isEditing)}>
          {isEditing ? t("close") : t("edit")}
        </Button>
      </>
    );
  };
  



  const EditProfile = ({
    t,
    profile,
    user,
  }) => {
    const [isModalOpen, setModalOpen] = useState(false);
  
    const handleComplete = () => {
      setModalOpen(false);
    };
  
    return (
      <>
        <Button type="primary" onClick={() => setModalOpen(true)}>
          {t("profile.edit")}
        </Button>
        <Modal
          visible={isModalOpen}
          onCancel={() => setModalOpen(false)}
          title={t("profile.edit")}
          footer={null}
          destroyOnClose={true}
        >
       <ProfileForm/>
        </Modal>
      </>
    );
  };
  