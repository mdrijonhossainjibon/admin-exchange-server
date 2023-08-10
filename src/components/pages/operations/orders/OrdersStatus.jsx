import { Tag } from "antd";
import { CheckCircleOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { OrderState } from "../../../../constants/orders";

export default function OrderStatus({state}) {
  
  return state === OrderState.Done ? (
    <Tag icon={<CheckCircleOutlined />} color="success">
      {state}
    </Tag>
  ) : (
    <Tag icon={<ExclamationCircleOutlined />} color="warning">
      {state}
    </Tag>
  );
}
