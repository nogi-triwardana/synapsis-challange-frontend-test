import { AtomButton, AtomInput } from "@/components/atoms";
import { FormModal } from "@/components/molecules";
import ThemeContext, { TDarkModeState } from "@/providers/ThemeProvider";
import { Form, FormProps, Layout, notification } from "antd";
import React, { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import CredentialContext, { TCredentialContext } from "@/providers/CredentialProvider";

const { Header: AntdHeader } = Layout;

const Header: React.FC = () => {
  const [credModal, setCredModal] = useState(false);
  const [formCredValues] = useState<FieldCredType>({
    name: '',
    token: ''
  });

  const [ api, contextHolder ] = notification.useNotification();
  const router = useRouter();
  const { accessToken, setIsAccessToken, name } = useContext(CredentialContext) as TCredentialContext;
  const { isDarkMode, setIsDarkMode } = useContext(ThemeContext) as TDarkModeState;
  const credForm = Form.useForm();

  const handleCloseModal = () => {
    setCredModal(false);
  };

  const handleSubmitCredential: FormProps<FieldCredType>["onFinish"] = (payload) => {
    handleCloseModal();

    api.success({
      message: 'Sign in success',
      placement: 'top'
    });

    Cookies.set('access_token', payload.token);
    Cookies.set('name', payload.name);
    setIsAccessToken(payload.token);
    router.reload();
  };

  const handleAuth = () => {
    if(accessToken !== "") {
      Cookies.remove('access_token');
      Cookies.remove('name');
      router.reload();
      return;
    } else {
      setCredModal(true);
    }
  }

  useEffect(() => {
    if(!!accessToken) {
      setCredModal(false);
      return;
    } else {
      setCredModal(true);
      return;
    }
  }, [accessToken]);

  return (
      <AntdHeader
        className='flex gap-4 !px-[20px] sm:!px-[50px] justify-end w-full items-center'
      >
        {contextHolder}
        {name && (
          <h1 className="text-semibold text-gray-200">
            Hi, {name}
          </h1>
        )}
        <AtomButton
          onClick={() => setIsDarkMode(curr => !curr)}
        >
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </AtomButton>
        <AtomButton
          color={accessToken ? "danger" : "primary"}
          variant="solid"
          onClick={handleAuth}
        >
          {accessToken ? 'Logout' : 'Login'}
        </AtomButton>
          {/** Credential Modal */}
          <FormModal
            open={credModal}
            title={'Welcome to blog app'}
            onCancel={handleCloseModal}
            onFinish={handleSubmitCredential}
            form={credForm[0]}
            initialValues={formCredValues}
          >
            <Form.Item<FieldCredType>
              label="Name"
              name="name"
              data-test="sign-in-by-name"
              rules={[{ required: true, message: 'Please input name' }]}
            >
              <AtomInput />
            </Form.Item>
            <Form.Item<FieldCredType>
              label="Go Rest Token"
              name="token"
              data-test="sign-in-by-token"
              rules={[{ required: true, message: 'Please input Go Rest Token' }]}
            >
              <AtomInput />
            </Form.Item>
          </FormModal>
      </AntdHeader>
  );
};

export default Header;