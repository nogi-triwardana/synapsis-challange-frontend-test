import { TButtonProps } from "@/@types/components/atoms";
import { Button } from "antd";
import React from "react";

const AtomButton: React.FC<TButtonProps> = ({
  ...props
}) => {
  return (
    <Button
      {...props}
    />
  );
};

export default AtomButton;