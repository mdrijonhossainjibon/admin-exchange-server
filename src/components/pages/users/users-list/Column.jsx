import { Button, Input, Space } from "antd";
import UserStatus from "../UserStatus";
import { EllipsisOutlined, FilterOutlined } from "@ant-design/icons";



export const column = (t,roleFilters,userFilters,formatDate,Navigate)=>{

   return [
  {
      title: t("setter.layouts.users.table.userId"),
      dataIndex: 'uid',
      key: 'uid',
      width: 150,
      align: "center",
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
          <div style={{ padding: 8 }}>
              <Input
                  placeholder="Enter full UID"
                  value={selectedKeys[0]}
                  onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                  onPressEnter={confirm}
                  style={{ width: 188, marginBottom: 8, display: 'block' }}
              />
              <Space>
                  <Button size="small" icon={<FilterOutlined />} onClick={confirm} style={{ width: 90 }}>
                      Search
                  </Button>
                  <Button size="small" onClick={() => {
                      setSelectedKeys([]);
                      confirm()
                  }} style={{ width: 90 }}>
                      Reset
                  </Button>
              </Space>
          </div>
      ),
      filterIcon: filtered => <FilterOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
      onFilter: (value, record) => record.uid.includes(value),
  },
  {
      title: t("setter.layouts.users.table.role"),
      dataIndex: 'role',
      key: 'role',
      align: "center",
      width: 150,
      filters: roleFilters,
      onFilter: (value, record) =>record.role.includes(value) 
  },
  {
      title: t("setter.layouts.users.table.level"),
      dataIndex: 'level',
      align: "center",
      width: 150,

  },
  {
      title: t('setter.layouts.users.table.email'),
      dataIndex: 'email',
      key: 'email',
      align: "center",
      width: 150,
  },
  {
      title : t('setter.layouts.users.table.name'),
      dataIndex : 'name',
      key : 'name',
      align: "center",
      width: 150,
  },
  {
      title : t('setter.layouts.users.table.referralUid'),
      dataIndex : 'referral_uid',
      key : 'referral_uid',
      align: "center",
      width: 150,
  },
  {
      title : t('setter.layouts.users.table.country'),
      dataIndex : 'country',
      key : 'country',
      align: "center",
      width: 150,
  },{
      title : t('setter.layouts.users.table.created'),
      dataIndex : 'created_at',
      key : 'created_at',
      align: "center",
      width: 150,
      render : (_,row)=> formatDate.formatDate(row.created_at)
  },{
      title: t("setter.layouts.users.table.state"),
      dataIndex: "Status",
      align: "center",
      width: 150,
      filters: userFilters,
      onFilter: (value, record) =>{
          return record.Status.toLocaleLowerCase().includes(value.toLocaleLowerCase())
      },
      render : (Status)=>(
          <UserStatus Status={Status}/>
      )
  },{
      title: "",
      dataIndex: "uid",
      width: 75,
      align: "center",
      render: (_, row) => {
        
          return <Button icon={<EllipsisOutlined />} shape="circle" onClick={()=> Navigate('/users/details/'+row.uid)}/>;
      },
  }
];



}






