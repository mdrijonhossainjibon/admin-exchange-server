//import { BlockchainsData } from "../BlockchainsBridge";
import { Modal } from "antd";
import { useTranslation } from "react-i18next";
import {BlockchainForm }from "../form";


export const BlockchainFormModal =({titleKey,onCancel,onSubmit,isModalVisible})=> {
  const { t } = useTranslation();

  return (
    <Modal
      title={t(titleKey)}
      visible={isModalVisible}
      onCancel={onCancel}
      okText={t("setter.layouts.configurations.blockchains.modal.save")}
      cancelText={t("setter.layouts.configurations.blockchains.modal.cancel")}
      footer={null}
      width="75%"
    >
      <BlockchainForm onSubmit={onSubmit}/>
    </Modal>
  );
}
