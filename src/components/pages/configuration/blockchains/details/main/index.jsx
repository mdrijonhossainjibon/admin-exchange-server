import { Badge, Button, Descriptions, List, Skeleton } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";

import { useTranslation } from "react-i18next";
import { useDate } from "../../../../../../utils/hooks";
import { AlertPush, SelectBlockchaindata, Update_Blochain_Find ,SelectCurrencisData,Currency_Fecth,Fech_Blockchain} from "../../../../../../modules";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { Filter ,findObjectsByBlockchainKey} from "../../../../../../constants/Filters";


export const BlockchainDetailsMain = (props)=> {
  const { t: translate } = useTranslation();
  const { formatDate } = useDate();
  const Blockchainn = useSelector(SelectBlockchaindata);
  const t = (id) => translate(`setter.layouts.configurations.blockchains.details.${id}`);
  const { id } = useParams();
  const data = Blockchainn && Blockchainn.find((item)=> item.key.includes(id));
  const currencie = useSelector(SelectCurrencisData);
  const dispach = useDispatch();
  const Navigate = useNavigate()
  
   const filteredArray = findObjectsByBlockchainKey(currencie, data?.key);



  useEffect(()=>{
    dispach(Currency_Fecth());
    //dispach(Fech_Blockchain());

    //Blockchainn && dispach(Update_Blochain_Find({key : id,currencies : filteredArray}));
    if(!Blockchainn){
      dispach(AlertPush({message_type: 'msg' ,message : 'error sestion exprie retun Configuration',show : 'error'}))
      setTimeout(() => {
        Navigate('/configuration')
      }, 4000);
    }
  },[]);


  
  //const filteredArray = currencie.filter((item) => item.blockchain_key.some((bk) =>  Blockchainn.some((ex) => ex.key === bk.key)));
 
 






  const goToCurrencyDetails = (code) => {
    Navigate('/configuration/currencies/details/'+code)
  };

  if (props.loading) {
    return <Skeleton active paragraph={{ rows: 9 }} />;
  }

  return (
    <Descriptions bordered column={3}>
      <Descriptions.Item label={t("name")}>
        {data?.name} ({data?.key})<br />
        <Badge
          status={data?.enabled ? "success" : "error"}
          text={data?.enabled ? t("enabled") : t("disabled")}
        />
      </Descriptions.Item>

      <Descriptions.Item label={t("height")}>{data?.height}</Descriptions.Item>

      <Descriptions.Item label={t("client")}>{data?.client}</Descriptions.Item>
      <Descriptions.Item label={t("server")}>{data?.server}</Descriptions.Item>
      <Descriptions.Item label={t("minConfirmations")}>
        {data?.min_confirmations}
      </Descriptions.Item>

      <Descriptions.Item label={t("dates")}>
        {t("createdAt")}: {formatDate(data?.created_at)}
        <br />
        {t("updatedAt")}: {formatDate(data?.updated_at)}
      </Descriptions.Item>

      <Descriptions.Item label={t("explorer")}>
        {data?.explorer_address}
        <br />
        {data?.explorer_transaction}
      </Descriptions.Item>

      <Descriptions.Item label={t("currencies")} span={2}>
        <List
          itemLayout="horizontal"
          dataSource={filteredArray}
          loading={filteredArray.length > 0 ? false : true }
          renderItem={(c) => (
            <List.Item>
              <List.Item.Meta
                title={
                  <Badge status={c.visible  === 'active' ? "success" : 'error'} text={`${c.name} (${c.code?.toUpperCase()})`} />
                }
              />
              <Button shape="circle" icon={<EllipsisOutlined />}  onClick={()=>goToCurrencyDetails(c.code)}/>
            </List.Item>
          )}
        />
      </Descriptions.Item>
    </Descriptions>
  );
}
