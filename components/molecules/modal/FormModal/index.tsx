import { Form, Modal } from "antd";
import { TModalProps } from "@/@types/components/molecules";
import { AtomButton } from "@/components/atoms";
import { useEffect, useState } from "react";

const FormModal: React.FC<TModalProps> = ({
  open,
  title,
  onCancel,
  children,
  form,
  initialValues,
  loading,
  ...formProps
}) => {
  const [submittable, setSubmittable] = useState(false);
  const values = Form.useWatch([], form);

  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => setSubmittable(true))
      .catch(() => setSubmittable(false))
    }, [form, values]);

  return (
    <Modal
      open={open}
      title={title}
      onCancel={onCancel}
      footer={null}
    >
      <Form
        form={form}
        name="validateOnly"
        layout={'vertical'}
        initialValues={initialValues}
        {...formProps}
      >
        {children}
        <Form.Item label={null} className="flex justify-end w-full">
          <AtomButton
            type="primary"
            htmlType="submit"
            disabled={!submittable}
            data-test="submit-form-modal"
            loading={loading}
          >
            Submit
          </AtomButton>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default FormModal;