import axios from "axios";
import { API_CALL_ENDPOINT } from "./confing";

axios.interceptors.request.use(config => {
  // Add headers or modify the config as needed
  config.headers['Access-Control-Allow-Origin'] = '*'; // Replace '*' with the desired domain or whitelist of domains
  return config;
});


const apiserver = axios.create({
  baseURL: API_CALL_ENDPOINT.serverurl,
});

const apiadmin = axios.create({
    baseURL: API_CALL_ENDPOINT.adminserver,
  });
  

 
/** 
 * @prop method => Sting  => get || post || more
 * @prop url => String 
 * @prop token =>  Sting  => Authorization 
 * @prop body = > Object = > { }
 * @example const{ data } = await APIREQ.({ methed :  POST || GET ,  url : '/'/,body : { } token : Sting , ));
 */

export const APIREQ = async (props) => {
  
  switch (props.api) {
    case 'server':
        try {
            const response = await apiserver[props && props.method ? props.method : 'get'](props && props.url ? props.url : '/', props && props.body ? props.body : {},{
               headers: {
                Authorization: props && props.token? props.token : '',
              }
            })
            return { data: response.data, status: response.status };
          } catch (error) {
            if(error.message === 'Request failed with status code 429'){
               throw new Error('API LIMIT OVER')
            }else{
              throw new Error(error.message);
            }
           
          }
  
    default:
        try {
            const response = await apiadmin[props && props.method ? props.method : 'get'](props && props.url ? props.url : '/', props && props.body ? props.body : {},{
               headers: {
                Authorization: props && props.token? props.token : '',
              }
            })
            return { data: response.data, status: response.status };
          } catch (error) {
            if(error.message === 'Request failed with status code 429'){
               throw new Error('API LIMIT OVER')
            }else{
              throw new Error(error.message);
            }
           
          }
  }

};

const RPC_default = 'methodical-boldest-yard.matic-testnet.discover.quiknode.pro/fa80a57d4c09a33873d54ef4122637ad6a2c743e/'

const RPC_JSON = axios.create({
  baseURL : 'https://'
})


export const RPC_JSON_API = async (props)=>{
   try {
    const data = JSON.stringify({
      "method": props?.method || "eth_blockNumber",
      "params": props?.params || [],
      "id": props?.id || 1,
      "jsonrpc": "2.0"
  })
     const  response = await RPC_JSON.post(props?.url || RPC_default,data)
     return {
      object: response.data?.result,
      jsonrpc: response.data?.jsonrpc,
      id: response.data?.id,
      blockHash: response.data?.result?.blockHash,
      blockNumber: parseInt(response.data?.result?.blockNumber) || parseInt(response.data?.result) || Number,
      contractAddress: response.data?.result?.contractAddress,
      cumulativeGasUsed: response.data?.result?.cumulativeGasUsed,
      effectiveGasPrice: response.data?.result?.effectiveGasPrice,
      from: response.data?.result?.from,
      gasUsed: response.data?.result?.gasUsed || String,
      logs: response.data?.result?.logs || [],
      logsBloom: response.data?.result?.logsBloom,
      status: response.data?.result?.status,
      to: response.data?.result?.to,
      transactionHash: response.data?.result?.transactionHash,
      transactionIndex: response.data?.result?.transactionIndex,
      type: response.data?.result?.type
  };

   } catch (error) {
    if(error.message === 'Request failed with status code 429'){
      throw new Error('API LIMIT OVER')
   }else{
     throw new Error(error.message);
   }
   }
}