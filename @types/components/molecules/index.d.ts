import { FormProps, ModalProps } from "antd";

type TModalProps = {
  children?: React.ReactNode;
  form?: any;
  initialValues?: any;
  // formProps?: FormProps;
} & ModalProps & FormProps;