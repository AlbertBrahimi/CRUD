import React, { useEffect } from 'react';
import { Modal, Form, Input } from 'antd';

interface UserModalProps {
  visible: boolean;
  onSave: (values: any) => void;
  onCancel: () => void;
  initialValues?: { [key: string]: any };
}

const UserModal: React.FC<UserModalProps> = ({ visible, onSave, onCancel, initialValues = {} }) => {
  const [form] = Form.useForm();


  useEffect(() => {
    if (visible) {
      form.setFieldsValue(initialValues); 
    } else {
      form.resetFields(); 
    }
  }, [initialValues, form, visible]);

  return (
    <Modal
      visible={visible}
      title={initialValues.id ? "Update User" : "Add New User"}
      okText="Save"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form.validateFields().then(values => {
          form.resetFields();
          onSave({ ...initialValues, ...values });
        });
      }}
    >
      <Form form={form} layout="vertical">
        <Form.Item name="name" label="Name">
          <Input />
        </Form.Item>
        <Form.Item name="last_name" label="Last Name"> 
          <Input />
        </Form.Item>
        <Form.Item name="email" label="Email">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserModal;
