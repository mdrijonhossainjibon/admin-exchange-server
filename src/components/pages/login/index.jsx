import React, { useState, useRef } from 'react';
import { Form, Input, Button, Card, Popover, AutoComplete, Modal, Space } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './style.css'
import { PasscodeInput } from 'antd-mobile';
import { fetchAdmin } from '../../../modules';
import { useDispatch } from 'react-redux';
const { Option } = AutoComplete;

export const LoginPage = () => {
  const [form] = Form.useForm();
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isModelvisble, setisModelvisble] = useState(false)
  const [otp_code, setotp_code] = useState();
  const [values, setvalues] = useState({})
  const [Loading, setLoading] = useState(false);
  const [Loading1, setLoading1] = useState(false);
  const dispatch = useDispatch();
  const passcodeRef = useRef(null);

  const onFinish = (values) => {
    setisModelvisble(true);
    setvalues(values)
    setLoading1(true)
  };

  const handleEmailChange = (value) => {
    // Perform email validation or any other logic
    setShowSuggestions(value.length > 0);
  };

  const handleEmailSelect = (value) => {
    setShowSuggestions(false);
    form.setFieldsValue({ email: value });
  };

  const Handeloky = () => {
    if (otp_code && otp_code.length > 5) {
      console.log({ email: values.email, password: values.password, otp_code, setisModelvisble, setLoading });
      setLoading1(false)
      setLoading(true)
      dispatch(fetchAdmin({ email: values.email, password: values.password, otp_code, setisModelvisble, setLoading }));
    } else {
      setLoading1(false)
      setisModelvisble(false)
      setotp_code('')
    }
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
      <Card title="Login" style={{ width: 390 }} className='setter-container-row'>
        <Form form={form} onFinish={onFinish}>
          <Form.Item
            name="email"
            rules={[
              {
                type: 'email',
                message: 'Please enter a valid email address',
              },
              {
                required: true,
                message: 'Please enter your email address',
              },
            ]}
          >
            <AutoComplete
              onSelect={handleEmailSelect}
              onSearch={handleEmailChange}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Email"
                onBlur={() => setShowSuggestions(false)}
              />
            </AutoComplete>
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please enter your password',
              },
              {
                min: 8,
                message: 'Password must be at least 8 characters',
              },
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Modal
              visible={isModelvisble}
              maskClosable={true}
              onCancel={() => setisModelvisble(false)}
              footer={[<Space ><Button loading={Loading} onClick={Handeloky}>Oky</Button></Space>]}
              centered
            >
              <Input ref={passcodeRef} onChange={(e)=> setotp_code(e.target.value)} onKeyDown={(e)=> {
                if(e.key === 'Enter'){
                  Handeloky()
                }
              }}/>
            </Modal>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={Loading1}>
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
