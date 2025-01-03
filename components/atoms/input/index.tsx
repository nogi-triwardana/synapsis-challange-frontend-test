import { Input } from "antd";
import { TInputProps } from "@/@types/components/atoms";

const AtomInput: React.FC<TInputProps> = ({
  ...props
}) => {
  return (
    <Input
      {...props}
      className="w-full"
    />
  );
};

export default AtomInput;