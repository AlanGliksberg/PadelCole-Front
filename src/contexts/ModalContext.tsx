import { createContext, ReactNode, useState } from "react";
import CustomModal from "../components/Modals/CustomModal";
import { ModalContextData, ModalParams } from "../types";

export const ModalContext = createContext<ModalContextData>({
  openModal: (p: ModalParams) => {},
  closeModal: () => {},
});

export const ModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalParams, setModalParams] = useState<ModalParams | null>(null);

  const openModal = (params: ModalParams) => {
    setModalParams(params);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <CustomModal
        closeModal={closeModal}
        isOpen={modalOpen}
        params={modalParams}
      />
    </ModalContext.Provider>
  );
};
