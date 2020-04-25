import React, { useState } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import "./Test.scss";
import MiniSubject from "monads/MiniSubject";

// const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const aa = new MiniSubject<string>();
aa
  // .map(x => `${x.length}_${x}_${x.length}`)
  .filter(x => x.length > 10)
  .debounceTime(1000)
  .distinctUntilChange(x => (x || "").trim())
  .map(x => `${x.length}_${x}_${x.length}`)
  .filter(x => x.length > 20)
  .subscribe(x => console.log("Subscribe", x));

const TestComponent = () => {
  const [value, setValue] = useState<string>("");

  // const onFinish = (values: Store) => {
  //   console.log("Success:", values);
  // };

  // const onFinishFailed = errorInfo => {
  //   console.log("Failed:", errorInfo);
  // };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue(value);
    aa.next(value);
  };

  return (
    <div className="wrapper">
      <Input placeholder="Basic usage" value={value} onChange={handleChange} />

      <Form {...layout} name="basic" initialValues={{ remember: true }}>
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default TestComponent;
