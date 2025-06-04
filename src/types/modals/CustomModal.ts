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
}

export interface ModalProps {
  params: ModalParams | null;
  isOpen: boolean;
  closeModal: () => void;
}
