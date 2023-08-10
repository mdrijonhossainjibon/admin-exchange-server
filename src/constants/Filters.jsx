export const Filter = ({obj,maps})=>{
    const filteredBlok = maps?.filter(item => {
        return obj?.some(keyItem => keyItem.key === item.key);
      });

      return filteredBlok;
}



  // Function to find objects with blockchain_key value of "bsc-testnet"
 export const findObjectsByBlockchainKey = (arr, key)=> {
    return arr?.filter(obj => {
      const blockchainKeys = obj.blockchain_key.map(item => item.key);
      return blockchainKeys.includes(key);
    });
  }