import { Input } from "antd";
import { TTextAreaProps } from "@/@types/components/atoms";

const TextArea: React.FC<TTextAreaProps> = ({
  ...props
}) => {
  return (
    <Input.TextArea
      {...props}
    />
  );
};

export default TextArea;