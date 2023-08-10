import { Descriptions, List, Button, Badge, Tag, Dropdown, Menu } from "antd";
import { EllipsisOutlined, DownOutlined } from "@ant-design/icons";

import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useDate } from "../../../../../../utils/hooks";
import { useSelector } from "react-redux";
import { SelectCurrencisData,SelectBlockchaindata } from "../../../../../../modules";
import { Filter } from "../../../../../../constants/Filters";


const currencyggg = {
  name: 'Bitcoin',
  code: 'BTC',
  symbol: '₿',
  type: 'Cryptocurrency',
  created_at: '2022-01-01',
  updated_at: '2022-02-15',
  wallets: [
    {
      id: 1,
      name: 'Wallet 1',
      address: '0x1234567890abcdef',
      enabled: true,
      kind: 'ethereum',
    },
    {
      id: 2,
      name: 'Wallet 2',
      address: '0xabcdef1234567890',
      enabled: false,
      kind: 'bitcoin',
    },
  ],
  withdraw: {
    enabled: true,
    fee: 0.001,
    min: 0.01,
    limit24h: 1,
    limit72h: 3,
  },
  deposit: {
    enabled: false,
    fee: 0.0,
    min: 0.0,
  },
  options: [
    { key: 'option1', value: 'Value 1' },
    { key: 'option2', value: 'Value 2' },
  ],
  blockchains: [
    { id: 1, name: 'Ethereum', key: 'ETH' },
    { id: 2, name: 'Bitcoin', key: 'BTC' },
  ],
  markets: [
    { id: 1, name: 'BTC/USDT' },
    { id: 2, name: 'BTC/LTC' },
    { id: 1, name: 'BTC/USDT' },
    { id: 2, name: 'BTC/LTC' },
  ],
};


export const CurrencyDetailsMain =(props)=> {
  const { t: translate } = useTranslation();
  const history = useNavigate();
  const { formatDate } = useDate();
  const CurrencisData = useSelector(SelectCurrencisData);
  const Currencis = CurrencisData.find((item)=> item?.code?.includes(props?.id || ''));
  const Blockchaindata = useSelector(SelectBlockchaindata)
  const Blockchain = Filter({maps : Blockchaindata || [],obj : Currencis?.blockchain_key});
  
  const onCompleted = () => {
    console.log("Created");
  };
  


  const goToMarketDetails = (marketId) => {
    //history.push(Routes.withParams.MarketsDetails({ id: marketId }));
    
  };

  const goToWalletDetails = (walletId) => {
    //history.push(Routes.withParams.WalletsDetails({ id: walletId }));
  };

  const goToBlockchainDetails = (id) => {
    //history.push(Routes.withParams.BlockchainsDetails({ id }));
    history('/configuration/blockchains/info/'+id)
  };
 

  const t = (id) => translate(`setter.layouts.configurations.currencies.details.${id}`);


  const createWallets = (e) => {
   
   
  };

  const menu = (
    <Menu key="walletsCurrency" onClick={createWallets}>
      
        <Menu.Item key={'code'}>{'name'}</Menu.Item>
      
    </Menu>
  );
  


  const wallets = [
    {
      id: 1,
      name: 'Wallet 1',
      address: '0x1234567890abcdef',
      enabled: true,
      kind: 'ethereum',
    },
    {
      id: 2,
      name: 'Wallet 2',
      address: '0xabcdef1234567890',
      enabled: false,
      kind: 'bitcoin',
    },
    // Add more wallet objects as needed
  ];
  

  return (
    <Descriptions bordered column={4}>
      <Descriptions.Item label={t("name")}>{Currencis?.name}</Descriptions.Item>
      <Descriptions.Item label={t("code")}>{Currencis?.code}</Descriptions.Item>
      <Descriptions.Item label={t("symbol")}>{Currencis?.symbol}</Descriptions.Item>
      <Descriptions.Item label={t("type")}>{Currencis?.type}</Descriptions.Item>

      <Descriptions.Item label={t("dates")}>
        <div>
          {t("createdAt")}: {formatDate(Currencis?.timestamp)}
        </div>
        <div>
          {t("updatedAt")}: {formatDate(Currencis?.updated)}
        </div>
      </Descriptions.Item>
      <Descriptions.Item label={t("wallets")} span={3}>
       
          <List
            itemLayout="horizontal"
            dataSource={wallets}
            renderItem={(wallet) => (
              <List.Item>
                <List.Item.Meta
                  title={
                    <>
                      <Badge status={wallet.enabled ? "success" : "default"} text={`${wallet.name}`} />
                    </>
                  }
                  description={wallet.address}
                />
                <Tag>{wallet.kind.toUpperCase()}</Tag>
                <Button shape="circle" icon={<EllipsisOutlined />} onClick={() => goToWalletDetails(wallet.id)} />
              </List.Item>
            )}
          />
       
      </Descriptions.Item>

      <Descriptions.Item label={t("withdraw.title")}>
        <Badge
          status={Currencis?.deposit_enabled  === 'active'?  'success': "error"}
          text={Currencis?.deposit_enabled  === 'active'? t("withdraw.enabled") : t('withdraw.disabled') }
        />
        <div>
          {t("withdraw.fee")}: {Currencis?.withdraw_fee}
        </div>
        <div>
          {t("withdraw.min")}: {Currencis?.min_withdraw_amount}
        </div>
        <div>
          {t("withdraw.limit24h")}: {Currencis?.withdraw_limit_24h}
        </div>
        <div>
          {t("withdraw.limit72h")}: {Currencis?.withdraw_limit_72h}
        </div>
      </Descriptions.Item>
      <Descriptions.Item label={t("deposit.title")} span={3}>
        <Badge
          status={ Currencis?.deposit_enabled  === 'active'?  'success': "error"}
          text={ Currencis?.deposit_enabled  === 'active'? t("deposit.enabled") :  t("deposit.disabled")} 
        />
        <div>
          {t("deposit.fee")}: {Currencis?.deposit_fee}
        </div>
        <div>
          {t("deposit.min")}: {Currencis?.min_deposit_amount}
        </div>
      </Descriptions.Item>

      
        <Descriptions.Item label={t("options")} span={1}>
          <List
            itemLayout="horizontal"
            dataSource={Currencis?.options}
            renderItem={(options) => (
              <List.Item>
                <List.Item.Meta description={Currencis?.options?.keys} />
                {options.value}
              </List.Item>
            )}
          />
        </Descriptions.Item>
      

      <Descriptions.Item label={t("blockchain.title")} span={3}>
        
          <List
            itemLayout="horizontal"
            
            dataSource={Blockchain}
            renderItem={(c) => (
              <List.Item>
                <List.Item.Meta
                  title={<Badge status={ c?.enabled ? 'success': "error" } text={`${c.name} (${c.key})`} />}
                />
                <Button shape="circle" icon={<EllipsisOutlined />} onClick={() => goToBlockchainDetails(c.key)} />
              </List.Item>
            )}
          />
       
        
      </Descriptions.Item>

      <Descriptions.Item label={t("markets")} span={3}>
        <List
          itemLayout="horizontal"
          dataSource={[]}
          loading={Currencis?.market?.length > 0 ? false : true}
          renderItem={(market) => (
            <List.Item>
              <List.Item.Meta
                title={<Badge status={"default"} text={`${market.name.toUpperCase()}`} />}
              />
              <Button shape="circle" icon={<EllipsisOutlined />} onClick={() => goToMarketDetails('market.id')} />
            </List.Item>
          )}
        />
      </Descriptions.Item>
    </Descriptions>
  );
}
