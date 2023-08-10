
import { Button, Table } from "antd";
import { CurrencyType } from "../../../../constants/currencies";
import { WithdrawState } from "../../../../constants/withdraws";
import { useTranslation } from "react-i18next";
import { useDate } from "../../../../utils/hooks";
import { SelectBlockchaindata ,SelectCurrencisData} from '../../../../modules';
import { useSelector ,useDispatch } from "react-redux";
import { EllipsisOutlined, LinkOutlined } from "@ant-design/icons";

import { WithdrawalStatus } from "./WithdrawalStatus";
import { DepositType } from "../Deposits/DepositType";
import { useNavigate } from "react-router-dom";
/**
 * @typedef { Object } WithdrawalTableProps
 * @property { Array } data - WithdrawalTable  Array Data []
 */

/**
 * 
 * @param {  WithdrawalTableProps } props 
 * @returns 
 */

export const WithdrawalTable = (props) => {
    const { t: translate } = useTranslation();
    const t = (id) => translate(`setter.layouts.operations.withdrawals.table.${id}`);
    const history = useNavigate()
    const { formatDate } = useDate();
   
    const Blockchaindata = useSelector(SelectBlockchaindata);

    const currency =  useSelector(SelectCurrencisData)

    const currency_codeFilters = currency.map((el)=>{
      return { text: String(el.code), value: String(el.code) };
    })

    const stateFilters = Object.values(WithdrawState).map((el) => {
        return { text: String(el), value: String(el) };
    });
    const CurrencyTypeFlter = Object.values(CurrencyType).map((el)=>{
        return {  text : String(el) , value : String(el) }
    })

   

    const openWithdrawalDetails = (id) => {
     history('/operations/withdrawals/details/'+id)
    };

    const columns = [
        {
            title: t("id"),
            dataIndex: "id",
            key: "id",
            render: (id, record , index) => `${index}`
        },
        {
            title: t("email"),
            dataIndex: 'uid',
            key: "uid",
        },
        {
            title: t("txid.title"),
            dataIndex: "blockchain_txid",
            key: "txid",
            width: 250,
            render: (txid, row) => {
                const href = row.currency?.explorer_transaction?.replace("#{txid}", txid);

                function truncate(input) {
                    const l = 26;
                    if (input.length > l) {
                        return input.substring(0, l - 8) + "...";
                    }
                    return input;
                }
                return txid ? (
                    <>
                        <Button icon={<LinkOutlined />} type="link" target="_blank" href={href}>
                            {truncate(txid)}
                        </Button>
                    </>
                ) : null;
            },
        },
        {
            title : t("type"),
            dataIndex : 'type',
            align: "center",
            key: "type",
            filterMultiple: false,
            filters : CurrencyTypeFlter,
            render: (type) => {
                return <DepositType type={type} />;
              }
        },
        {
            title: t("created_at"),
            dataIndex: "timestamp",
            key: "timestamp",
            width : 250,
        
            // sorter: (a, b) => (moment(formatDate(a.created_at)).unix()) - moment(formatDate(b.created_at)).unix(),
            render: (dateString) => formatDate(dateString),
        },
        {
            title: t("amount"),
            dataIndex: "amount",
            sorter: (a, b) => a.amount - b.amount,
            key: "amount",
            render : (value)=>{
                return Number(value).toPrecision(6)
            }
        },
        {
            title: t("currency"),
            dataIndex: 'currency_code',
            key: "currency",
            filters : currency_codeFilters ,
            filterMultiple: false,
            onFilter : (value,record) => record.currency_code.toLocaleLowerCase().includes(value.toLocaleLowerCase()),
            render: (code) => code?.toUpperCase(),
        },

        {
            title: t("rid"),
            dataIndex: "rid",
            key: "rid",
            // width: 250,
            align: "center",
            render: (rid, row) => {
                const href = row.currency?.explorer_address?.replace("#{address}", rid);
                console.log(row.currency?.explorer_address, "row.currency row.currency row.currency");

                function truncate(input) {
                    const l = 26;
                    if (input.length > l) {
                        return input.substring(0, l - 8) + "...";
                    }
                    return input;
                }
                return rid ? row.type === 'fiat' ? (
                    <>
                        {rid}
                    </>
                ) :
                    (
                        <>
                            <Button icon={<LinkOutlined />} type="link" target="_blank" href={href}>
                                {truncate(rid)}
                            </Button>
                        </>
                    ) : null;
            },
        },
        {
            title: t("state.title"),
            dataIndex: "state",
            key: "state",
            align: "center",
            filters: stateFilters,
            filterMultiple: false,

            render: (_, row) => <WithdrawalStatus withdrawal={row}/>,
        },
        {
            title: "",
            dataIndex: "details",
            align: "center",
            // width: 75,
            render: (_, row) => {
                return <Button icon={<EllipsisOutlined />} shape="circle" onClick={() => openWithdrawalDetails(row.txid)} />;
            },
        },
    ];

    return (
        <Table
            bordered
            loading={props?.data?.length > 0 ? false : true}
            dataSource={props?.data || []}
            rowKey="id"
            columns={columns}
            pagination={{
                position: ["bottomLeft"],

            }}
          
        />
    );
}
