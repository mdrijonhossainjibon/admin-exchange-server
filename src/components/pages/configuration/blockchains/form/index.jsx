import React from "react";
import { Col, Row, Form, Input, Button, Checkbox, AutoComplete } from "antd";
import { useTranslation } from "react-i18next";

import { renderRows } from "../../../../../utils/component-utils";
import { SelectBlockchaindata } from "../../../../../modules";
import { useSelector } from "react-redux";

const { Item: FormItem } = Form;

export const BlockchainForm = (props) => {
  const { t } = useTranslation();
  const BlockchainData = useSelector(SelectBlockchaindata);

  


    const blockchainkeyOptions = [] 

    const blockchainserverOptions = [];
    const blockchainwsOptions = [];
    const blockchainexplorerTransactionOptions = [];
    const blockchainexplorerAddressOptions = []

    BlockchainData && BlockchainData.map((item)=>{
      blockchainkeyOptions.push({value : item.key});
      blockchainserverOptions.push({value : item.server});
      blockchainexplorerAddressOptions.push({value : item.explorer_transaction});
      blockchainwsOptions.push({value : item.Websoket})
    })
     
   
  
  const initialValues = BlockchainData && BlockchainData.find((item)=> item.key.includes(props?.id || ''));

  const formRows = [
    [
      <FormItem 
        name="name"
        label={t("setter.layouts.configurations.blockchains.modal.form.name")}
        rules={[
          {
            required: true,
            message: "Please enter a name",
          },
        ]}
      >
        <AutoComplete >
          <Input />
        </AutoComplete>
      </FormItem>,
      <FormItem
        name="height"
        label={t("setter.layouts.configurations.blockchains.modal.form.height")}
        rules={[
          {
            required: true,
            message: "Please enter a height",
          },
        ]}
      >
        <AutoComplete >
           <Input type='number'/>
        </AutoComplete>
      </FormItem>,
    ],
    [
      <FormItem
        name="client"
        label={t("setter.layouts.configurations.blockchains.modal.form.client")}
        rules={[
          {
            required: true,
            message: "Please enter a client",
          },
        ]}
      >
        <AutoComplete >
          <Input />
        </AutoComplete>
      </FormItem>,
      <FormItem
        name="min_confirmations"
        label={t("setter.layouts.configurations.blockchains.modal.form.min_confirmations")}
        rules={[
          {
            required: true,
            message: "Please enter the minimum confirmations",
          },
        ]}
      >
        <AutoComplete >
           <Input type='number' />
        </AutoComplete>
      </FormItem>,
    ],
    [
      <FormItem name="key" label={t("setter.layouts.configurations.blockchains.modal.form.key")}
       rules={[{
        required: true,
        message: "Please enter an key as blockchain",
      }]}
      >
        <AutoComplete options={blockchainkeyOptions}>
          <Input />
        </AutoComplete>
      </FormItem>,
      <FormItem
        name="explorer_address"
        label={t("setter.layouts.configurations.blockchains.modal.form.explorer_address")}
        rules={[
          {
            required: true,
            message: "Please enter an explorer address",
          },
        ]}
      >
        <AutoComplete  options={blockchainexplorerAddressOptions}>
          <Input />
        </AutoComplete>
      </FormItem>,
    ],
    [
      <FormItem
        name="server"
        label={t("setter.layouts.configurations.blockchains.modal.form.server")}
        rules={[
          {
            required: true,
            message: "Please enter a server",
          },
        ]}
      >
        <AutoComplete  options={blockchainserverOptions}>
          <Input />
        </AutoComplete>
      </FormItem>,
      <FormItem
        name={'Websoket'}
        label="Websoket"
        rules={[
          {
            required: false,
            message: "Please enter a Websoket musst be use ws:// or wss://",
          },
        ]}
      >
      <AutoComplete options={blockchainwsOptions || []}/>
      </FormItem>,
    ],
    [
      <FormItem
        name="explorer_transaction"
        label={t("setter.layouts.configurations.blockchains.modal.form.explorer_transaction")}
        rules={[
          {
            required: true,
            message: "Please enter an explorer transaction",
          },
        ]}
      >
        <AutoComplete value={2} options={blockchainexplorerTransactionOptions}>
          <Input />
        </AutoComplete>
      </FormItem>,
      <FormItem
      name={'chainid'}
      label="Chain Id"
      rules={[{
        required : true,
        message : 'Please enter an Chainid example 80001'
      }]}
      >
        <Input type='number' defaultValue={80001}/>
      </FormItem>
      
    ],
    [
      <FormItem name="enabled" valuePropName="checked">
        <Checkbox >{t("setter.layouts.configurations.blockchains.modal.form.enabled")}</Checkbox>
      </FormItem>,
    ],
  ];
  

  return (
    <Form className="setter-form" onFinish={props?.onSubmit} initialValues={initialValues}>
      <Row gutter={24}>
        <Col span={24}>{renderRows(formRows)}</Col>
      </Row>
      <FormItem>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </FormItem>
    </Form>
  );
};
