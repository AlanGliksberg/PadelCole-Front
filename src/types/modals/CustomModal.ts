export type ModalParams = {
  title: string;
  message: string;
  primaryLabel?: string;
  primaryAction?: () => void;
  secondaryLabel?: string;
  secondaryAction?: () => void;
};

export interface ModalContextData {
  openModal: (params: ModalParams) => void;
  closeModal: () => void;
  openErrorModal: (t: string, m: string) => void;
  closeErrorModal: () => void;
}

export interface ModalProps {
  params: ModalParams | null;
  isOpen: boolean;
  closeModal: () => void;
}
