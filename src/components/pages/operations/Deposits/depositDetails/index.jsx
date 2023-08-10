import React, { useEffect, useState } from "react";
import { Badge, Button, Card, Descriptions, List, Skeleton } from "antd";

import { EllipsisOutlined, LinkOutlined, ReloadOutlined } from "@ant-design/icons";
import {DepositType }from "../DepositType";
import {DepositStateCell }from "../DepositState";
import {  useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import UserStatus from "../../../users/UserStatus/";
import { useDispatch, useSelector } from "react-redux";

import { Currency_Fecth, Fech_Blockchain ,SelectDepositData,fetchDeposit,
  SelectCurrencisData,SelectBlockchaindata,SelectUserdata,fetchUser,
   AlertPush, AlertRemove
  } from "../../../../../modules";

import { RPC_JSON_API } from "../../../../../api";
import { RPC_JSON_ETH } from "../../../../../api/rpc_json_eth";

export const DepositDetails =() =>{
  
  const { id } = useParams();
  const history = useNavigate();
  const dispach = useDispatch();
  const [rpccallback,setrpccallback] = useState({});

  useEffect(()=>{
    dispach(Fech_Blockchain());
    dispach(Currency_Fecth());
    dispach(fetchDeposit());
    dispach(fetchUser());
    CallRPC();
  },[dispach])

  const CallRPC = async () =>{
    try {
      const { blockNumber,blockHash}  = await RPC_JSON_API({method : RPC_JSON_ETH.getTransactionReceipt,params : [id]})
      setrpccallback({blockNumber,blockHash});
    } catch (error) {
      dispach(AlertPush({message_type : 'msg',message : error?.message,show : 'error'}));
      dispach(AlertRemove())
    }
  }



  const goToCurrencyDetails = (code) => {
    history('/configuration/currencies/details/'+code)
  };
  const goToBlockchainDetails = (id) => {
    history('/configuration/blockchains/info/'+id)
  };

  const goToUserDetails = (uid) => {
    history('/users/details/'+uid)
  };

  const { t: translate } = useTranslation();
  const t = (id) => translate(`setter.layouts.operations.deposits.${id}`);

  const DepositData = useSelector(SelectDepositData)
  const Deposit = DepositData && DepositData.find((item)=> item.txid.includes(id));
  const Blockchaindata = useSelector(SelectBlockchaindata);
  const Blockchain = Blockchaindata && Blockchaindata?.find((item)=> item?.key?.includes(Deposit?.key));
  const CurrencisData = useSelector(SelectCurrencisData);
  const Currencis = CurrencisData.find((item)=> item?.code?.includes(Deposit?.currency_code));
  const Userdata = useSelector(SelectUserdata);
  const User = Userdata && Userdata.find((item)=> item?.uid?.includes(Deposit?.uid))
  const [reload,setreload] = useState(false);

  const HandelReload = ()=>{
    setreload(true)
    dispach(fetchDeposit({setreload}));

    CallRPC();
  }

  const skeleton = (rows = 9) => <Skeleton paragraph={{ rows }} active={true} loading={DepositData.length > 0 ? false : true}/> 
    

  
  const isCoin = Deposit?.type === 'coin';

  const onReject = () => {
    
  };
  const onApprove = () => {
    
  };

  return (
    <Card
      ghost={false}
      
      title={t("details.title")}
      extra={[
        <Button
          key={1}
         loading={reload}
          icon={<ReloadOutlined />}
          onClick={ HandelReload}
        >
          {t("table.reload")}
        </Button>,
      ]}
    >
      
     


      {Deposit ? (
        <>
          
            <Descriptions bordered column={{ lg: 2, md: 1 }}>
              <Descriptions.Item label={"Type"}>
                <List>
                  <List.Item>
                    <List.Item.Meta  description={<DepositType type={Deposit.type} />} />
                  </List.Item>
                </List>
              </Descriptions.Item>
              <Descriptions.Item label={t("details.deposit.state")}>
                <List>
                  {Deposit.Status === "submitted" ? (
                    <List.Item
                      actions={[
                        <Button type="primary" danger onClick={() => onReject()}>
                          {t("details.deposit.reject")}
                        </Button>,
                        <Button type="primary" onClick={() => onApprove()}>
                          {t("details.deposit.approve")}
                        </Button>,
                      ]}
                    >
                      <List.Item.Meta title={<DepositStateCell deposit={Deposit}/>} />
                    </List.Item>
                  ) : (
                    <List.Item>
                      <List.Item.Meta title={<DepositStateCell deposit={Deposit}/> } />
                    </List.Item>
                  )}
                </List>
              </Descriptions.Item>

              <Descriptions.Item label={t("details.deposit.amount")}>{`${Number(Deposit?.amount).toFixed(
                Currencis?.precision || 0
              )} ${Deposit?.currency_code}`}</Descriptions.Item>
              <Descriptions.Item label={t("details.deposit.fee")}>{`${Number(Deposit?.fee).toFixed(
                 Currencis?.precision || 0
              )} ${Deposit?.currency_code}`}</Descriptions.Item>
              <Descriptions.Item label={t("details.user.title")}>
                <List
                  itemLayout="horizontal"
                  loading={User ? false : true}
                  dataSource={ User ? [User] : []}
                  renderItem={(c) => (
                    <List.Item
                      extra={
                        <Button
                          shape="circle"
                          icon={<EllipsisOutlined />}
                          onClick={() => goToUserDetails(c?.uid)}
                        />
                      }
                    >
                      <List.Item.Meta
                        title={`${c?.email} (${c?.uid})`}
                        description={<UserStatus state={c?.Status} />}
                      />
                    </List.Item>
                  )}
                />
              </Descriptions.Item>
              {Deposit && (
                <Descriptions.Item label={t("details.deposit.currency")}>
                  <List
                    itemLayout="horizontal"
                    loading={ Currencis ? false : true }
                    dataSource={ Currencis? [Currencis] : []}
                    renderItem={(c) => (
                      <List.Item
                        extra={
                          <Button
                            shape="circle"
                            icon={<EllipsisOutlined />}
                            onClick={() => goToCurrencyDetails(c.code)}
                          />
                        }
                      >
                        <List.Item.Meta
                          title={<Badge status={c.visible ? "success" : "error"} text={`${c.name} (${c.code})`} />}
                        />
                      </List.Item>
                    )}
                  />
                </Descriptions.Item>
              )}
              {isCoin && [
                <Descriptions.Item label={t("details.deposit.blockchain")}>
                  <List
                    itemLayout="horizontal"
                    dataSource={[Blockchain]}
                    renderItem={(c) => (
                      <List.Item
                        extra={
                          <Button
                            shape="circle"
                            icon={<EllipsisOutlined />}
                            onClick={() => goToBlockchainDetails(c.key)}
                          />
                        }
                      >
                        <List.Item.Meta
                          title={<Badge status={c.enabled ? "success" : "error"} text={`${c.name} (${c.key})`} />}
                        />
                      </List.Item>
                    )}
                  />
                </Descriptions.Item>,
                <Descriptions.Item label={t("details.deposit.txid")}>
                  <List
                    itemLayout="horizontal"
                    dataSource={[Deposit]}
                    renderItem={(c) => (
                      <List.Item>
                        <List.Item.Meta title={`${c.txid}`} />
                        <Button
                          shape="circle"
                          target="_blank"
                          icon={<LinkOutlined />}
                          href={Blockchain.explorer_transaction?.replace("#{tx}", c.txid)}
                        />
                      </List.Item>
                    )}
                  />
                </Descriptions.Item>,
                <Descriptions.Item  label={t("details.deposit.txout")}>{`${rpccallback?.blockHash?.substring(0,8) + '..........' + rpccallback?.blockHash?.substring(9,13)}`}</Descriptions.Item>,
                <Descriptions.Item
                  label={t("details.deposit.block_number")}
                >{`${rpccallback?.blockNumber}`}</Descriptions.Item>,
              ] }

              {/*<Descriptions.Item label={t("user.created")}>{formatDate(deposit?.user.created_at)}</Descriptions.Item>*/}
            </Descriptions>
         
        </>
      ) :  skeleton()}
    </Card>
  );
}
