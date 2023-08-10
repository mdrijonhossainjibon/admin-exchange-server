import { useState } from "react";
import TweenOne from "rc-tween-one";
import { Card, Statistic, Row, Col, Divider } from "antd";

import {
  ArrowUpOutlined,
  FieldTimeOutlined,
  TeamOutlined,
  DownloadOutlined,
  UploadOutlined,
  CheckCircleOutlined,
  AuditOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";




export const  Dashboard = () => {
  const { t: translate } = useTranslation();
  const t = (id) => translate(`setter.layouts.dashboard.${id}`);
  
 
  const [old, setOld] = useState('');

 
  return (
    <>
      <Divider>{t("General")}</Divider>
      <Row gutter={[8, 8]} style={{ margin: 1 }}>
        <Col xs={24} sm={12} md={8} lg={6}>
          <TweenOne animation={{ scale:  0.9  }}>
            <Card>
              <Statistic
                title={`${t("usersTotal")}: ${'50m'}`}
                prefix={<TeamOutlined />}
                value={'30m'}
                suffix={
                  <>
                    <FieldTimeOutlined />
                    24
                  </>
                }
              />
            </Card>
          </TweenOne>
        </Col>

        <Col xs={24} sm={12} md={8} lg={6}>
          <TweenOne
            animation={{ scale:  0.9  }}
          >
            <Card>
              <Statistic
                title={`${t("depositsTotal")}: ${'9000k'}`}
                prefix={<DownloadOutlined />}
                value={'2k'}
                suffix={
                  <>
                    <FieldTimeOutlined />
                    24
                  </>
                }
              />
            </Card>
          </TweenOne>
        </Col>

        <Col xs={24} sm={12} md={8} lg={6}>
          <TweenOne
            animation={{ scale:  0.9  }}
          >
            <Card>
              <Statistic
                title={`${t("withdrawsTotal")}: ${'90'}`}
                prefix={<UploadOutlined />}
                value={'23'}
                suffix={
                  <>
                    <FieldTimeOutlined />
                    24
                  </>
                }
              />
            </Card>
          </TweenOne>
        </Col>

        <Col xs={24} sm={12} md={8} lg={6}>
          <TweenOne animation={{ scale: 1}}>
            <Card>
              <Statistic
                title={`${t("tradesTotal")}: ${'4000'}`}
                prefix={<ArrowUpOutlined />}
                value={'30'}
                suffix={
                  <>
                    <FieldTimeOutlined />
                    24
                  </>
                }
              />
            </Card>
          </TweenOne>
        </Col>
      </Row>

      <Divider>{t("Orders")}</Divider>

      <Row gutter={[8, 8]} style={{ margin: 1 }}>
        <Col xs={24} sm={12} md={8} lg={6}>
          <TweenOne
            animation={{ scale: 1}}
          >
            <Card>
              <Statistic
                title={`${t("ordersTotalPending")}`}
                value={'22'}
                suffix={
                  <>
                    <AuditOutlined />
                    {'1'}
                  </>
                }
              />
            </Card>
          </TweenOne>
        </Col>

        <Col xs={24} sm={12} md={8} lg={6}>
          <TweenOne animation={{ scale: 1 }}>
            <Card>
              <Statistic title={`${t("orders24H")}`} value={'1'} suffix={<AuditOutlined />} />
            </Card>
          </TweenOne>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <TweenOne animation={{ scale:  0.9  }}>
            <Card>
              <Statistic
                title={`${t("orders24HPartialFilled")}`}
                value={'1'}
                suffix={<CheckOutlined />}
              />
            </Card>
          </TweenOne>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <TweenOne animation={{ scale: 1}}>
            <Card>
              <Statistic
                title={`${t("orders24HFilled")}`}
                value={'1'}
                suffix={<CheckCircleOutlined />}
              />
            </Card>
          </TweenOne>
        </Col>
      </Row>
    </>
  );
}
