import { AutoComplete, Form, Button, Row, Col, Typography, Input } from "antd"
import { useTranslation } from "react-i18next";
import { renderRows } from "../../../../../utils/component-utils";
import { CurrencyType } from "../../../../../constants/currencies";
import { CurrencyOptionForm } from "./CurrencyOptionForm";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Fech_Blockchain,SelectBlockchaindata, SelectCurrencisData } from "../../../../../modules";
export const CurrenciesForm = ({onCompleted,propatis,propatisdata,loading,setloading,id,type}) => {
  
  const { t: translate } = useTranslation();
  const t = (id) => translate(`setter.layouts.configurations.currencies.${id}`);

const dispach = useDispatch();
const Blockchaindata = useSelector(SelectBlockchaindata)
const CurrencisData = useSelector(SelectCurrencisData);
  const Currencis = CurrencisData.find((item)=> item?.code?.includes(id || ''))

const blockchainkeyOptions = []
Blockchaindata && Blockchaindata?.map((item)=>{
  blockchainkeyOptions.push({value : item.key});
})

useEffect(()=>{
 dispach(Fech_Blockchain());

},[])




  const generalRows = [
    [
      <Form.Item name="visible" label={t("form.visible")}>
        <AutoComplete options={[{ text: 'enable', value: 'active', }, { text: 'suspend', value: 'suspend', }]} size='middle' />
      </Form.Item>
    ],
    [
      <Form.Item name="name" label={t("form.name")}>
        <AutoComplete />
      </Form.Item>,
      <Form.Item
        name="type"
        label={t("form.type")}
        rules={[{ required: true }]}
      >
        <AutoComplete
          options={Object.values(CurrencyType).map((value) => ({ value }))}

        />
      </Form.Item>
    ],
    [
      <Form.Item name="code" label={t("form.code")} >
        <AutoComplete />
      </Form.Item>,
      <Form.Item name="symbol" label={t("form.symbol")}>
        <AutoComplete />
      </Form.Item>
    ],
    [
      <Form.Item name="blockchain_key" label={t("form.blockchain_key")}>
        <AutoComplete  options={blockchainkeyOptions}/>
      </Form.Item>,
      <Form.Item name="position" label={t("form.position")}>
        <AutoComplete >
          <Input type='number' />
        </AutoComplete>
      </Form.Item>
    ],
    [
      <Form.Item name="precision" label={t("form.precision")}>
        <AutoComplete >
          <Input type='number' />
        </AutoComplete>
      </Form.Item>,
      <Form.Item name="subunits" label={t("form.subunits")} rules={[{ required: 'isCoin' }]}>
        <AutoComplete >
          <Input type='number' />
        </AutoComplete>
      </Form.Item>
    ],
    [
      <Form.Item name="icon_url" label={t("form.icon_url")}>
        <AutoComplete />
      </Form.Item>
    ],
    [
      <Form.Item name="details" label={'details'}>
        <AutoComplete >
        <Input.TextArea rows={5}/>
        </AutoComplete>
      </Form.Item>
    ]
  ]


  const depositRows = [
    [
      <Form.Item name="deposit_enabled" label={t("form.deposit_enabled")}>
        <AutoComplete/>
      </Form.Item>
    ],
    [
      <Form.Item name="deposit_fee" label={t("form.deposit_fee")}>
       <AutoComplete >
          <Input type='number' />
        </AutoComplete>
      </Form.Item>
    ],
    [
      <Form.Item name="min_deposit_amount" label={t("form.min_deposit_amount")}>
        <AutoComplete >
          <Input type='number' />
        </AutoComplete>
      </Form.Item>
    ],
    [
      <Form.Item name="min_collection_amount" label={t("form.min_collection_amount")}>
        <AutoComplete >
          <Input type='number' />
        </AutoComplete>
      </Form.Item>
    ],
    

  ]



  const withdrawRows = [
    [
      <Form.Item name="withdrawal_enabled" label={t("form.withdrawal_enabled")}>
        <AutoComplete options={[{ text: 'enable', value: 'active', }, { text: 'suspend', value: 'suspend', }]} />
      </Form.Item>
    ],
    [
      <Form.Item name="withdraw_fee" label={t("form.withdraw_fee")}>
        <AutoComplete />
      </Form.Item>
    ],
    [
      <Form.Item name="min_withdraw_amount" label={t("form.min_withdraw_amount")}>
        <AutoComplete  >
          <Input type='number' />
        </AutoComplete>
      </Form.Item>
    ],
    [
      <Form.Item name="withdraw_limit_24h" label={t("form.withdraw_limit_24h")}>
        <AutoComplete  >
          <Input type='number' />
        </AutoComplete>
      </Form.Item>
    ],
    [
      <Form.Item name="withdraw_limit_72h" label={t("form.withdraw_limit_72h")}>
        <AutoComplete  >
          <Input type='number' />
        </AutoComplete>
      </Form.Item>
    ]

  ]


  return (
    <>
      <Form onFinish={onCompleted}
        className="setter-form"
       initialValues={Currencis}
      >

        <Row gutter={24}>
          <Col span={12} className="form-section">
            <Typography.Title level={5}>General</Typography.Title>
            {renderRows(generalRows)}
          </Col>
          <Col span={6} className="form-section">
            <Typography.Title level={5}>Deposit</Typography.Title>
            {renderRows(depositRows)}
          </Col>
          <Col span={6} className="form-section">
            <Typography.Title level={5}>Withdraw</Typography.Title>
            {renderRows(withdrawRows)}
          </Col>
        </Row>

        <Row>
          <Col span={24} className="form-section">
            <CurrencyOptionForm fields={propatisdata} setFields={propatis} />
          </Col>
        </Row>


        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} onClick={()=> setloading ? setloading(true) : null}>
           {type === 'updated'? t("form.update"):  t("form.create")}
          </Button>
        </Form.Item>
      </Form>
    </>
  )

}