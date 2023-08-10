import React from "react";
import { Table, Typography } from "antd";
// import { Button, Table, Typography, DatePicker, Space } from "antd";
// import { FilterOutlined } from "@ant-design/icons";
import { useDate } from "../../../../../../utils/hooks";
import { useTranslation } from "react-i18next";
import { UAParser } from "ua-parser-js";

import { ActivityResult } from "../../../../../../constants/user";


const data = [
    {
      key: "1",
      created_at: "2023-06-01",
      action: "Action 1",
      topic: "Topic 1",
      result: "success",
      note: "Note 1",
      user_ip: "192.168.0.1",
      browser: "Chrome",
      os: "Windows",
    },
    {
      key: "2",
      created_at: "2023-06-02",
      action: "Action 2",
      topic: "Topic 2",
      result: "pending",
      note: "Note 2",
      user_ip: "192.168.0.2",
      browser: "Firefox",
      os: "Mac",
    },
    // Add more objects as needed
  ];

// import moment from "moment";

const activityColors = {
  [ActivityResult.Succeed]: "success",
  [ActivityResult.Denied]: "danger",
  [ActivityResult.Failed]: "danger",
};


export const UserDetailsActivities = ({ user, loading })=> {
  const { formatDate } = useDate();
  const { t: translate } = useTranslation();
 
  const [filterA, setFilterA] = React.useState();

  const t = (id) => translate(`setter.layouts.users.details.activities.${id}`);

  // const topicFilters = [
  //   {text: "password", value: "password"},
  //   {text: "session", value: "session"},
  //   {text: "otp", value: "otp"}
  // ]


  

  const columns = [
    {
      title: t("date"),
      dataIndex: "created_at",
      key: "created_at",
      render: (value) => formatDate(value),
      
    },
    {
      title: t("action"),
      dataIndex: "action",
      key: "action",
    },
    {
      title: "Topic",
      dataIndex: "topic",
      key: "topic",
      // filters: topicFilters,
      // filterMultiple: false,
      // filtered: filterA && filterA.topic ? true : false,
      // filteredValue: filterA && filterA.topic ? [filterA.topic] : [],
    },
    {
      title: t("result.title"),
      dataIndex: "result",
      key: "result",
      render: (value) => (
        <Typography.Text type={activityColors[value]}>{t(`result.${value}`)}</Typography.Text>
      ),
    },
    {
      title: t("note"),
      dataIndex: "note",
      key: "note",
    },
    {
      title: t("ip"),
      dataIndex: "user_ip",
      key: "user_ip",
    },
    {
      title: t("browser"),
      dataIndex: "browser",
      key: "browser",
    },
    {
      title: t("os"),
      dataIndex: "os",
      key: "os",
    },
  ];

  return (
    <>
      <Table
        dataSource={data}
        columns={columns}
        loading={loading}
        onChange={(p) => {
          const params= {
            page: String(p.current),
            limit: String(p.pageSize),
          };
          // if (f.topic && f.topic.length !== 0) {
          //   params.topic = f.topic[0];
          // }
          
          setFilterA(params);
        }}
        pagination={{
          position: ["bottomLeft"],
          total:  undefined,
          current:  undefined,
          pageSize: filterA ? Number(filterA.limit) : undefined,
          showQuickJumper: true,
          showSizeChanger: true,
        }}
      />
    </>
  );
}
