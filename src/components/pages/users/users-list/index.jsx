import React, { useEffect } from "react";

import { useTranslation } from "react-i18next";
import { useDate } from "../../../../utils/hooks";
import { useDispatch, useSelector } from "react-redux";
import { SelectUserdata, fetchUser } from "../../../../modules";
import { UserState } from "../../../../constants/user";
import { useNavigate } from "react-router-dom";
import { column } from "./Column";
import { Table } from "antd";

export const ListUsersPage = () => {
    const Usersdata = useSelector(SelectUserdata);
    const dispatch = useDispatch();
    const formatDate = useDate();
    const Navigate = useNavigate()

    useEffect(() => {
        dispatch(fetchUser());
    }, [dispatch]);

    const { t } = useTranslation();

    const UserRole = ["admin", "user", "superadmin"];

    const roleFilters = UserRole.map((el) => {
        return { text: String(el), value: String(el) };
    });
    const userFilters = Object.values(UserState).map((el) => {
        return { text: String(el), value: String(el) };
    })


    return (

        <Table
            bordered
            loading={false}
            dataSource={Usersdata}
            columns={column(t, roleFilters, userFilters, formatDate, Navigate)}
            rowKey="uid"

        />

    );
};
