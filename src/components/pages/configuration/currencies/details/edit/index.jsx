import { useState } from "react";
import { CurrenciesForm }from "../../form";
import { SelectCurrencisData, Update_Currency_Fecth } from "../../../../../../modules";
import { useDispatch, useSelector } from "react-redux";


export const CurrencyDetailsEdit =(props)=> {
  const CurrencisData = useSelector(SelectCurrencisData);
  const Currencis = CurrencisData.find((item)=> item?.code?.includes(props?.id || ''))
  
  const [optionFields, setOptionFields] = useState(Currencis?.options  || [])
  const [loading,setloading] = useState(false)
  const dispach = useDispatch()
  const redirectToInfo = (value) => {
  setTimeout(() => {
    setloading(false)
    //console.log({value,options : optionFields})
     dispach(Update_Currency_Fecth({code : props?.id,updated : 'full',value,options : optionFields}))
     
  }, 3000);
  };

  return <CurrenciesForm propatisdata={optionFields} propatis={setOptionFields} onCompleted={redirectToInfo}  loading={loading} setloading={setloading} id={props?.id}  type={'updated'}/>;
}
