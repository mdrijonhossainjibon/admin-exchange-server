import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Button, Card, Descriptions, Empty, Skeleton, Space } from "antd";
import { useDate } from "../../../../utils/hooks";
import { useTranslation } from "react-i18next";
import { AdjustmentAction, AdjustmentState } from "../../../../constants/adjustments";


export const AdjustmentDetails = () => {
    const { formatDate } = useDate();
    const { id } = useParams();
    const { t: translate } = useTranslation();
    const history = useNavigate();

    const t = (id) => translate(`setter.layouts.operations.adjustments.${id}`);


    const adjustment = {
         reason : 'Adjustment 1',
         currency : { code : 'BTC'},
         category : 'refund',
         amount : 0.0034,
         asset_account_code : 'ABC121',
         receiving_member : { uid : 'ABC123',email : 'bd@fg',role : 'user'},
         creator : { uid : 'ABC123',email : 'bd@fg',role : 'admin'},
         state: 'pending' 
        };

    return (
        <>
            <Card className="setter-details-card"
                ghost={false}

                title={t("details.title")}
                style={{ padding: "1.5rem 0" }}
                extra={<Space><Button type='primary' >  {t("state.accept")}</Button> <Button type='primary' danger> {t("state.reject")}</Button></Space>}
            >

                {adjustment ? (
                    <>
                        <Skeleton paragraph={{ rows: 9 }} loading={false} active>
                            <Descriptions column={1} bordered>
                                <Descriptions.Item label={t("details.reason")}>{adjustment?.reason}</Descriptions.Item>
                                <Descriptions.Item label={t("details.state")}>{t(`state.${adjustment?.state}`)}</Descriptions.Item>
                                <Descriptions.Item label={t("details.created")}>{formatDate(adjustment?.created_at)}</Descriptions.Item>
                                <Descriptions.Item label={t("details.updated")}>{formatDate(adjustment?.updated_at)}</Descriptions.Item>
                                <Descriptions.Item label={t("details.currency")}>
                                    {adjustment?.currency?.code?.toUpperCase()}
                                </Descriptions.Item>
                                <Descriptions.Item label={t("details.category")}>
                                    {t(`category.${adjustment?.category}`)}
                                </Descriptions.Item>
                                <Descriptions.Item label={t("details.amount")}>{adjustment?.amount}</Descriptions.Item>
                                <Descriptions.Item label={t("details.assetAccountCode")}>
                                    {adjustment?.asset_account_code}
                                </Descriptions.Item>
                            </Descriptions>
                        </Skeleton>
                        <Skeleton paragraph={{ rows: 3 }} loading={false} active>
                            <Descriptions title={t("details.receiver.title")} column={3} bordered>
                                <Descriptions.Item label={t("details.receiver.uid")}>
                                    {adjustment?.receiving_member?.uid}
                                </Descriptions.Item>
                                <Descriptions.Item label={t("details.receiver.email")}>
                                    {adjustment?.receiving_member?.email}
                                </Descriptions.Item>
                                <Descriptions.Item label={t("details.receiver.role")}>
                                    {adjustment?.receiving_member?.role}
                                </Descriptions.Item>
                                <Descriptions.Item label={t("details.receiver.accountCode")}>
                                    {adjustment?.receiving_account_code}
                                </Descriptions.Item>
                            </Descriptions>
                        </Skeleton>
                       
                        <Skeleton paragraph={{ rows: 3 }} loading={false} active>
                            <Descriptions title={t("details.creator.title")} column={3} bordered>
                                <Descriptions.Item label={t("details.creator.uid")}>{adjustment?.creator?.uid}</Descriptions.Item>
                                <Descriptions.Item label={t("details.creator.email")}>{adjustment?.creator?.email}</Descriptions.Item>
                                <Descriptions.Item label={t("details.creator.role")}>{adjustment?.creator?.role}</Descriptions.Item>
                            </Descriptions>
                        </Skeleton>
                    </>
                ) : (
                    <Empty />
                )}
            </Card>
        </>
    );
}

