import { useState } from "react";
import { ReloadOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Tooltip, Button, Space, Modal, Popconfirm, Card } from "antd";
import { useTranslation } from "react-i18next";

import { PermissionForm } from "./form";
import { Tag, Table } from "antd";

export const UserPermissions = () => {
    const { t: translate } = useTranslation();
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalData, setModalData] = useState(undefined);
    const [loading,setlogin] = useState(false)

    const t = (id) => translate(`setter.layouts.devops.userPermissions.${id}`);




    const handleModal = (isOpen, data) => {
        setModalOpen(isOpen);
        setModalData(data);
    };

    const closeModal = () => {
        handleModal(false);
    };



    //t("form.deletedSuccess");


    const columns = [
        {
            title: t("table.role"),
            dataIndex: "role",
            key: "role",
        },
        {
            title: t("table.verb"),
            dataIndex: "verb",
            key: "verb",
            render: (verb) => {
                return <Tag>{verb.toUpperCase()}</Tag>;
            },
        },
        {
            title: t("table.path"),
            dataIndex: "path",
            key: "path",
        },
        {
            title: t("table.topic"),
            dataIndex: "topic",
            key: "topic",
        },
        {
            title: t("table.action"),
            dataIndex: "action",
            key: "action",
            render: (action) => {
                const colorTag = action === "ACCEPT" ? "success" : action === "DROP" ? "error" : "default";
                return <Tag color={colorTag}>{action.toUpperCase()}</Tag>;
            },
        },
        {
            title: "",
            align: "center",
            width: 100,
            dataIndex: "actions",
            key: "actions",
            className: "actions-cell",
            render: (_, row) => (
                <Space size="middle" className="actions-container">
                    <Tooltip title={t("table.edit")}>
                        <Button shape="circle" icon={<EditOutlined />} onClick={() => handleModal(true, row)} />
                    </Tooltip>
                    <Tooltip title={t("table.delete")}>
                        <Popconfirm
                            placement="topRight"
                            title={t("delete.title")}
                            onConfirm={() => {
                                const variables = {
                                    id: row.id,
                                };
                                //deletePermission({ variables });
                            }}
                            okText={t("delete.confirm")}
                            cancelText={t("delete.cancel")}
                        >
                            <Button danger shape="circle" icon={<DeleteOutlined />} />
                        </Popconfirm>
                    </Tooltip>
                </Space>
            ),
        },
    ];

    const data = [
        {
            id: 1,
            role: "superadmin",
            verb: "ALL",
            path: "Path 1",
            topic: "Topic 1",
            action: "ACCEPT",
        },
        {
            id: 2,
            role: "Role 2",
            verb: "Verb 2",
            path: "Path 2",
            topic: "Topic 2",
            action: "AUDIT",
        },
        // Add more data objects as needed
    ];

    return (
        <>
            <Card
                ghost={false}
                title={translate("setter.layouts.devops.nav.userPermissions")}
                extra={<Space>
                    <Button icon={<ReloadOutlined />}  loading={loading} disabled={loading } onClick={()=> setlogin(true)}>
                        {t("table.reload")}
                    </Button>
                    <Button type="primary"  loading={loading}   disabled={loading } onClick={() => setModalOpen(true)}   >
                        + {t("table.new")}
                    </Button>
                </Space>}
            />
            <Table

                dataSource={data}
                rowKey="id"
                columns={columns}

            />
            <Modal
                title={t("form.title")}
                visible={isModalOpen}
                onCancel={() => handleModal(false)}
                footer={null}
                destroyOnClose={true}
            >
                <PermissionForm initialData={modalData} />
            </Modal>
        </>
    );
}
