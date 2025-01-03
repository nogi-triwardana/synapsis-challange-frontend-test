import { AtomButton } from "@/components/atoms";
import { Modal, ModalProps } from "antd";

const ConfirmationModal: React.FC<ModalProps> = ({
  open,
  title,
  onOk,
  onCancel,
  children,
  loading
}) => {
  return (
    <Modal
      open={open}
      title={title}
      onCancel={onCancel}
      data-test="confirmation-modal"
      footer={[null]}
    >
      {children}
      <div className="flex justify-end w-full gap-2 mt-8">
        <AtomButton
          onClick={onCancel}
        >
          Cancel
        </AtomButton>
        <AtomButton
          type="primary"
          onClick={onOk}
          data-test="submit-confirm-modal"
          loading={loading}
        >
          Yes
        </AtomButton>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;