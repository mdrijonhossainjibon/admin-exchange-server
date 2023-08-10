import { Form, Input, Select, Button, AutoComplete } from 'antd';
///import { CurrencyType } from "../../../../../constants/currencies";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from 'react-redux';
import { SelectBlockchaindata, SelectCurrencisData } from '../../../../../modules';
import { DepositState, DepositTypes } from '../../../../../constants/deposits';
import { useState } from 'react';

export const DepositForm = () => {
  const { t: translate } = useTranslation();
  const t = (id) => translate(`setter.layouts.operations.deposits.form.${id}`);
  const dispach = useDispatch();
  const currencyOptions = useSelector(SelectCurrencisData);
  const Blockchaindata = useSelector(SelectBlockchaindata)

  const [iscoin,setiscoin] = useState('coin');
  const handleSubmit = (values) => {
 console.log(values)
  };

  const BlockchainFilters = [] 
  
  Blockchaindata?.map((item)=>{
    BlockchainFilters?.push({ text: String(item.key), value: String(item.key) })
  })


  const stateFilters = Object.values(DepositState).map((el) => {
    return { text: String(el), value: String(el) };
  });
  const typeFilters = Object.values(DepositTypes).map((el) => {
    return { text: String(el), value: String(el) };
  });

  return (
    <Form className="setter-form" onFinish={handleSubmit}>
      <Form.Item label={t("uid")} name="uid">
        <Input />
      </Form.Item>
      <Form.Item label={t("currency")} name="currency">
        <Select>
          {currencyOptions.map((currency) => (
            <Select.Option key={currency.code} value={currency.code}>
              {currency.code}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label={t("amount")} name="amount" >
        <Input />
      </Form.Item>
      <Form.Item label={t("txid")} name="txid">
        <Input />
      </Form.Item>
      
      <Form.Item label={t("type")} name="type">
      <AutoComplete options={typeFilters} onSelect={(value)=> setiscoin(value)} defaultValue={'coin'}/>
      </Form.Item>
      {
        iscoin === 'coin' ? (

       <Form.Item label={t("blockchain")} name="blockchain">
        <AutoComplete options={BlockchainFilters}/>
      </Form.Item>

        ) : null
      }
      

      <Form.Item label={t("confirmations")} name="confirmations">
        <Input type='number'/>
      </Form.Item>
      <Form.Item label={t("deposit_fee")} name="deposit_fee">
        <Input type='number'/>
      </Form.Item>
      <Form.Item label={t("state")} name="state">
      <AutoComplete options={stateFilters}/>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          {t("submit")}
        </Button>
      </Form.Item>
    </Form>
  );
};
