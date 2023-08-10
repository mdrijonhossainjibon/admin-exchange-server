import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Badge, Button, Descriptions, Input, List, Card, Popover, Skeleton } from "antd";
import { EllipsisOutlined, LinkOutlined, ReloadOutlined, CopyOutlined } from "@ant-design/icons";
import { useDate } from "../../../../utils/hooks";
import { CurrencyType } from "../../../../constants/currencies";
import { useTranslation } from "react-i18next";
import  UserStatus from "../../users/UserStatus";
import {WithdrawalStatus }from "./WithdrawalStatus";
import { WithdrawState, WithdrawType } from "../../../../constants/withdraws";


export const  WithdrawalDetails =() => {
  //const history = useHistory();


  const goToCurrencyDetails = (code) => {
    ///history.push(Routes.withParams.CurrenciesDetails({ code }));
  };

  const goToUserDetails = (uid) => {
    //history.push(Routes.withParams.UsersDetails({ uid }));
  };

  const { formatDate } = useDate();
  const { t: translate } = useTranslation();

  const t = (id) => translate(`setter.layouts.operations.withdrawals.${id}`);

  const { id } = useParams();
  
  
 

  const withdraw = {
    id: 123,
    state: WithdrawState.Succeed,
    currency: {
      code: "USD",
      name: "United States Dollar",
      visible: true,
    },
    created_at: "2023-06-29T10:30:00Z",
    amount: 100,
    fee: 5,
    sum: 105,
    type: WithdrawType.Coin,
    blockchain_txid: "abc123",
    rid: "xyz456",
    beneficiary: {
      state: "active",
      name: "John Doe",
      data: {
        bank_name: "Bank of America",
        full_name: "John Doe",
        bank_swift_code: "BOFAUS3N",
        intermediary_bank_name: "Intermediary Bank",
        intermediary_bank_swift_code: "INTBANK",
        account_number: "1234567890",
      },
    },
    member: {
      user: {
        uid: "user123",
        email: "user@example.com",
        state: UserStatus.Active,
      },
    },
  };
  
  
  const accounts = [
    {
      currency: {
        code: "USD",
      },
      balance: 1000,
      locked: 500,
    },
  ];

  


  const refetchAll = () => {

  };



  
  const skeleton = (content, rows = 9) =>  content
     ///<Skeleton paragraph={{ rows }} active />


  const renderAccountsInfo = (accounts) => {
    const account = accounts.find((el) => el.currency.code === withdraw?.currency?.code);
    return (
      <>
        <List.Item>
          <List.Item.Meta
            title={<Badge status={"default"} text="Total:" />}
            description={`${account.balance + account.locked} ${account.currency.code.toUpperCase()}`}
          />
        </List.Item>
        <List.Item>
          <List.Item.Meta
            title={<Badge status={"warning"} text="Locked:" />}
            description={`${account.locked} ${account.currency.code.toUpperCase()}`}
          />
        </List.Item>
        <List.Item>
          <List.Item.Meta
            title={<Badge status={"success"} text="Available:" />}
            description={`${account.balance} ${account.currency.code.toUpperCase()}`}
          />
        </List.Item>
      </>
    );
  };

  

  const actions = Array();
  if (["accepted", "errored", "skipped"].includes(withdraw ? withdraw.state : "")) {
    actions.push(
      <Button type="primary" >
        {t("details.withdraw.process")}
      </Button>
    );
  }
  if (["accepted", "errored", "confirming"].includes(withdraw ? withdraw.state : "")) {
    actions.push(
      <Button type="primary" danger >
        {t("details.withdraw.reject")}
      </Button>
    );
  }

  const [txid, setTxid] = useState();

  const onLoad = () => {
    
  };

  return (
    <>
      <Card
        ghost={false}
        title={t("details.title")}
        extra={[
          <Button
            key={1}
            icon={<ReloadOutlined />}
            
            onClick={() => {
              
            }}
          >
            {t("table.reload")}
          </Button>,
        ]}
      >
        {withdraw &&
          skeleton(
            <Descriptions column={{ lg: 2, md: 1 }} bordered size="middle">
              {withdraw?.currency && (
                <Descriptions.Item label={t("details.withdraw.currency")}>
                  <List itemLayout="horizontal">
                    <List.Item
                      actions={[
                        <Button
                          shape="circle"
                          icon={<EllipsisOutlined />}
                          onClick={() => goToCurrencyDetails(withdraw?.currency.code)}
                        />,
                      ]}
                    >
                      <List.Item.Meta
                        title={
                          <Badge
                            status={withdraw?.currency.visible ? "success" : "error"}
                            text={`${withdraw?.currency.name} (${withdraw?.currency.code})`}
                          />
                        }
                      />
                    </List.Item>
                  </List>
                </Descriptions.Item>
              )}

              <Descriptions.Item label={t("details.withdraw.state")}>
                <List>
                  <List.Item actions={actions}>
                    <List.Item.Meta title={<WithdrawalStatus withdrawal={withdraw} />} />
                  </List.Item>
                </List>
              </Descriptions.Item>

              <Descriptions.Item label={t("details.user.title")}>
                <List>
                  <List.Item
                    actions={[
                      <Button
                        shape="circle"
                        icon={<EllipsisOutlined />}
                        onClick={() => goToUserDetails(withdraw.member.user.uid)}
                      />,
                    ]}
                  >
                    <List.Item.Meta
                      title={`${withdraw.member.user.email} (${withdraw.member.user.uid})`}
                      description={<UserStatus state={withdraw.member.user.state} />}
                    />
                  </List.Item>
                </List>
              </Descriptions.Item>
              <Descriptions.Item label={t("details.withdraw.date")}>
                {formatDate(String(withdraw?.created_at))}
              </Descriptions.Item>

              <Descriptions.Item label={t("details.user.balance")}>
                <List itemLayout="horizontal">{renderAccountsInfo(accounts)}</List>
              </Descriptions.Item>
              <Descriptions.Item label={t("details.withdraw.sum")}>
                <List itemLayout="horizontal">
                  <List.Item>
                    <List.Item.Meta
                      title={t("details.withdraw.amount")}
                      description={`${withdraw.amount} ${withdraw.currency.code.toUpperCase()}`}
                    />
                  </List.Item>
                  <List.Item>
                    <List.Item.Meta
                      title={t("details.withdraw.fee")}
                      description={`${withdraw.fee} ${withdraw.currency.code.toUpperCase()}`}
                    />
                  </List.Item>
                  <List.Item>
                    <List.Item.Meta
                      title={t("details.withdraw.total")}
                      description={`${withdraw.sum} ${withdraw.currency.code.toUpperCase()}`}
                    />
                  </List.Item>
                </List>
              </Descriptions.Item>
            
              {withdraw?.type === CurrencyType.Fiat && (
                <Descriptions.Item label="Beneficiary" span={2}>
                  <List itemLayout="horizontal">                  
                  <List.Item>
                    <List.Item.Meta
                      title={<Badge status={withdraw?.beneficiary.state  === "active"? "success" : "default"} 
                      text={`State:`+`${withdraw?.beneficiary.state}`} />}
                      
                    />                      
                  </List.Item>  
                  <List.Item>
                    <List.Item.Meta
                      title={t("details.recipient.name")}
                      description ={`${withdraw?.beneficiary.name}`}
                    />
                  </List.Item>

                  <List.Item>
                    <List.Item.Meta
                      title={t("details.recipient.bankName")}
                      description={`${withdraw?.beneficiary?.data?.bank_name}`}
                    />
                  </List.Item>
                  <List.Item>
                    <List.Item.Meta
                      title={t("details.recipient.fullName")}
                      description={`${withdraw?.beneficiary?.data?.full_name}`}
                    />
                  </List.Item>
                  <List.Item>
                    <List.Item.Meta
                      title={t("details.recipient.bankSwiftCode")}
                      description={`${withdraw?.beneficiary?.data?.bank_swift_code}`}
                    />
                  </List.Item>
                  <List.Item>
                    <List.Item.Meta
                      title={t("details.recipient.intermediaryBankName")}
                      description={`${withdraw?.beneficiary?.data?.intermediary_bank_name}`}
                    />
                  </List.Item> 
                  <List.Item>
                    <List.Item.Meta
                      title={t("details.recipient.intermediaryBankSwiftCode")}
                      description={`${withdraw?.beneficiary?.data?.intermediary_bank_swift_code}`}
                    />
                  </List.Item> 
                  
                  <List.Item>
                     <List.Item.Meta
                      title={t("details.recipient.accountNumber")}
                      description={`${withdraw?.beneficiary?.data?.account_number}`}
                    />
                  </List.Item>                       
                </List>
                  
                </Descriptions.Item>
              )}
            
              {withdraw?.type === CurrencyType.Coin && (
                <Descriptions.Item label={t("details.withdraw.txid")} span={2}>
                  <List itemLayout="horizontal">
                    {withdraw?.blockchain_txid ? (
                      <div>
                        {withdraw?.blockchain_txid}&nbsp;
                        <Button
                          shape="circle"
                          target="_blank"
                          icon={<LinkOutlined />}
                          href={withdraw.currency?.explorer_transaction?.replace("#{txid}", withdraw?.blockchain_txid)}
                        />
                      </div>
                    ) : withdraw.state === "accepted" ? (
                      <Input.Search
                        placeholder="TxID"
                        allowClear
                        enterButton="Load"
                        onChange={(e: any) => setTxid(e.target.value)}
                        size="large"
                        onSearch={onLoad}
                      />
                    ) : null}
                  </List>
                </Descriptions.Item>
              )}

              {withdraw?.type === CurrencyType.Coin && (
                <Descriptions.Item label={t("details.withdraw.rid")} span={2}>
                  <List itemLayout="horizontal">
                    {withdraw?.rid ? (
                      <div>
                        {withdraw?.rid}&nbsp;
                        <Button
                          shape="circle"
                          target="_blank"
                          icon={<LinkOutlined />}
                          href={withdraw.currency?.explorer_address?.replace("#{address}", withdraw?.rid)}
                          value={`${withdraw?.rid}`}
                        />
                        <Popover content="Copied" trigger="click">
                          <Button
                            shape="circle"
                            target="_blank"
                            icon={<CopyOutlined />}
                            style={{ marginLeft: "10px" }}
                            onClick={() => navigator.clipboard.writeText(withdraw?.rid)}
                          />
                        </Popover>
                      </div>
                    ) : withdraw.state === "accepted" ? (
                      <Input.Search placeholder="rid" allowClear enterButton="Load" size="large" onSearch={onLoad} />
                    ) : null}
                  </List>
                </Descriptions.Item>
              )}
            </Descriptions>
          )}
      </Card>
    </>
  );
}
