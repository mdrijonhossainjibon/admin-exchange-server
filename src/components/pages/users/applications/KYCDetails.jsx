import { Row, Col, Image, Collapse, Descriptions } from "antd";
import countryISO from "i18n-iso-countries";
import { useTranslation } from "react-i18next";

/**
 
 * @param record   type any  Arry ||  []
  
 */


export default function KYCDetails({ record }) {
  const { i18n, t: translate } = useTranslation();
  const lang = i18n.language.split("-")[0];

  const t = (id) => translate(`setter.layouts.users.applications.${id}`);
 
  const data = () => {
    return (
      <Collapse accordion defaultActiveKey={["0"]}>
        {record.documents.map((el, ind) => (
          <Collapse.Panel
            header={`${el.doc_type} #${el.doc_number} ${t("expired")} ${el.doc_expire}`}
            key={String(ind)}
          >
            <Image width="100%" alt="doc" src={el.upload.url} />
          </Collapse.Panel>
        ))}
      </Collapse>
    );
  };

  const nationality = ''
  if (nationality) {
    
  }

  const renderMetadata = () => {
    return Object.keys(record.documents).map((el) => {
      return <Descriptions.Item label={t(el)}></Descriptions.Item>;
    });
  };
  


  const address = `${record.profile.address} ${record.profile.city} ${record.profile.postcode} `;

  return (
    <Row>
      <Col span={16}>
        <Descriptions bordered size="small" column={2}>
          <Descriptions.Item label={t("name")}>
          {'record.profile.name'}
          </Descriptions.Item>
          <Descriptions.Item label={t("birthDate")}>{'record.profile.dob'}</Descriptions.Item>
          <Descriptions.Item label={t("nationality")}>{nationality}</Descriptions.Item>
          <Descriptions.Item label={t("address")}>{address}</Descriptions.Item>
          {record.profile ? renderMetadata() : ""}
        </Descriptions>
      </Col>
      <Col span={8}>{data()}</Col>
    </Row>
  );
}
