import React from "react";
import { Modal, Button, Form, Input, Row, Col } from "antd";
import s from "./TitleListingSection.module.scss";
import { FormInstance } from "antd/lib/form";

const layout = {
  layout: "vertical" as "vertical",
  // labelCol: { span: 8 },
  // wrapperCol: { span: 16 },
};

const SUPPORTED_LANGUAGES: { [key: string]: string } = {
  en: "English",
  ja: "Japanese",
};

class TitleListingSection extends React.Component {
  state = { visible: true };
  formRef = React.createRef<FormInstance>();

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    console.log(e);
    // this.setState({
    //   visible: false,
    // });
    console.log("ADD SECTION", this.formRef.current?.getFieldsValue());
  };

  handleCancel = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleFinish = () => {
    console.log("FINISH", Row, Col, SUPPORTED_LANGUAGES);
  };

  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          Open Modal
        </Button>

        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width={800}
        >
          <Form
            ref={this.formRef}
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={this.handleFinish}
          >
            {/* <Form.Item
              label="Display Title"
              name={["displayTitle"]}
              rules={[{ required: true }]}
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              className={s.displayTitleArea}
            >
              <Form.Item
                label="English"
                name={["displayTitle", "en"]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Input />
              </Form.Item>
            </Form.Item> */}

            <Row>
              <Col md={6} className={s.formColumnLeft}>
                <div className={s.required}>Display Title</div>
              </Col>
              <Col md={18} className={s.formColumnRight}>
                {Object.keys(SUPPORTED_LANGUAGES).map(item => (
                  <Form.Item
                    label={SUPPORTED_LANGUAGES[item]}
                    name={["displayTitle", item]}
                    rules={[{ required: true, message: "Please input your username!" }]}
                  >
                    <Input />
                  </Form.Item>
                ))}
              </Col>
            </Row>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default TitleListingSection;
