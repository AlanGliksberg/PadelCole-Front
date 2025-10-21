import { useEffect, useState } from "react";
import { ModalProps } from "react-native";
import { ModalView } from "react-native-multiple-modals";

const CustomModalView: React.FC<ModalProps> = ({
  children,
  visible,
  ...props
}) => {
  const [isVisible, setVisibility] = useState<boolean>();

  useEffect(() => {
    setVisibility(visible);
  }, [visible]);

  const onClose = () => {
    // @ts-expect-error No queremos pasarle parámetro
    props.onRequestClose?.();
    setVisibility(false);
  };

  return (
    isVisible && (
      <ModalView
        animationType={props.animationType || "none"}
        onRequestDismiss={onClose}
        contentContainerStyle={props.style}
      >
        {children}
      </ModalView>
    )
  );
};

export default CustomModalView;
