import { createContext, ReactNode, useState } from "react";
import { CustomErrorModal } from "../components";
import CustomModal from "../components/Modals/CustomModal";
import { ModalContextData, ModalParams } from "../types";

export const ModalContext = createContext<ModalContextData>({
  openModal: (p: ModalParams) => {},
  closeModal: () => {},
  openErrorModal: (t: string, m: string) => {},
  closeErrorModal: () => {},
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

  const [errorModalOpen, setErrorModalOpen] = useState<boolean>(false);
  const [errorModalParams, setErrorModalParams] = useState<ModalParams | null>(
    null
  );

  const openErrorModal = (title: string, message: string) => {
    setErrorModalParams({ title, message });
    setErrorModalOpen(true);
  };
  const closeErrorModal = () => setErrorModalOpen(false);

  return (
    <ModalContext.Provider
      value={{
        openModal,
        closeModal,
        openErrorModal,
        closeErrorModal,
      }}
    >
      {children}
      <CustomModal
        closeModal={closeModal}
        isOpen={modalOpen}
        params={modalParams}
      />
      <CustomErrorModal
        closeModal={closeErrorModal}
        isOpen={errorModalOpen}
        params={errorModalParams}
      />
    </ModalContext.Provider>
  );
};
