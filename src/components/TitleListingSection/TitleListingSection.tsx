import React from "react";
import { Modal, Button, Form, Input, Row, Col } from "antd";
import { EditorExtensionSDK } from "contentful-ui-extensions-sdk";
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

interface TitleListingSectionProps {
  sdk: EditorExtensionSDK;
}

class TitleListingSection extends React.Component<TitleListingSectionProps, any> {
  formRef = React.createRef<FormInstance>();

  constructor(props: TitleListingSectionProps) {
    super(props);

    this.state = {
      displayTitle: props.sdk.entry.fields.displayTitle.getValue(),
      visible: true,
    };

    console.log("props.sdk.entry.fields.displayTitle.getValue()", props.sdk.entry.fields.displayTitle.getValue());
  }

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

  handleInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    await this.props.sdk.entry.fields.displayTitle.setValue({
      en: value,
    });
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
            initialValues={{
              ...this.state,
            }}
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
                    <Input onChange={this.handleInputChange} />
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
