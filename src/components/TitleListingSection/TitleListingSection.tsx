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

interface TitleListingSectionProps {
  sdk: EditorExtensionSDK;
}

class TitleListingSection extends React.Component<TitleListingSectionProps, any> {
  formRef = React.createRef<FormInstance>();

  constructor(props: TitleListingSectionProps) {
    super(props);

    this.state = {
      displayTitle: props.sdk.entry.fields.displayTitle,
      availableLocales: props.sdk.locales.available || [],
      visible: true,
    };

    console.log("props.sdk.entry.fields.displayTitle", props.sdk.entry.fields.displayTitle.getValue("de-DE"));

    // props.sdk.entry.fields.displayTitle.onValueChanged("en-US", locale => console.log("VALUE locale CHANGED", locale));
    // props.sdk.entry.onSysChanged(data => console.log("DATA CHANGED", data));

    // props.sdk.entry.fields.displayTitle.onIsDisabledChanged("de-DE", () => {
    //   console.log("onIsDisabledChanged");
    // });

    props.sdk.editor.onLocaleSettingsChanged(value => {
      console.log("onLocaleSettingsChanged", value);
    });
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    // this.setState({
    //   visible: false,
    // });
    console.log("ADD SECTION", this.formRef.current?.getFieldsValue(), e);
  };

  handleCancel = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleFinish = () => {
    console.log("FINISH", Row, Col);
  };

  handleInputChange = (locale: string) => async (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    await this.props.sdk.entry.fields.displayTitle.setValue(value, locale);
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
              displayTitle: {
                "en-US": this.state.displayTitle.getValue(),
                "de-DE": this.state.displayTitle.getValue("de-DE"),
              },
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
                {this.state.availableLocales.map((item: string) => (
                  <Form.Item
                    label={item}
                    name={["displayTitle", item]}
                    rules={[{ required: true, message: "Please input your username!" }]}
                  >
                    <Input onChange={this.handleInputChange(item)} />
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
