
import { PageHeader, Spin, Tabs } from "antd";
import { useLocation, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { UserDetailsBalances } from "./balances";
import { UserDetailsOpenOrders } from "./open-orders";
import { UserDetailsActivities } from "./activities";
import { UserDetailsMainInfo } from "./main";
//import KYCDetails from "../../applications/KYCDetails";
import { UserDetailsKYC } from "./kyc/s";
import { UserDetailsHistory } from "./history";


export const UserDetailsLayout = () => {

  const { t } = useTranslation();
  const { uid } = useParams()
   console.log(uid)
   

  const menuItems = [
    {

      content: t("setter.layouts.users.details.nav.main"),
      show: true,
      render : < UserDetailsMainInfo uid={ uid }/>
    },
    {

      content: t("setter.layouts.users.details.nav.kyc"),
      show: true,
      render : < UserDetailsKYC  uid={ uid }/>
    },
    {

      content: t("setter.layouts.users.details.nav.openOrders"),
      show: true,
      render : < UserDetailsOpenOrders  uid={ uid }/>
    },
    {

      content: t("setter.layouts.users.details.nav.balances"),
      show: true,
      render : < UserDetailsBalances  uid={ uid }/>
    },
    {

      content: t("setter.layouts.users.details.nav.history"),
      show: true,
      render : < UserDetailsHistory  uid={ uid }/>
    },
    {

      content: t("setter.layouts.users.details.nav.activities"),
      show: true,
      render : < UserDetailsActivities  uid={ uid }/>
    },{

      content: t("setter.layouts.users.details.nav.airdrop"),
      show: true,
      render : < UserDetailsActivities  uid={ uid }/>
    },
    {

      content: t("setter.layouts.users.details.nav.referral"),
      show: true,
      render : < UserDetailsActivities  uid={ uid }/>
    }

  ];


  return (
    <>

  <Tabs defaultActiveKey="0" style={{position : 'relative',left : '20px'}}>
        {menuItems.map((item, index) => (
          <Tabs.TabPane tab={item.content} key={index}>
               {item.render}
          </Tabs.TabPane>
        ))}
      </Tabs>

    </>
  );
}
