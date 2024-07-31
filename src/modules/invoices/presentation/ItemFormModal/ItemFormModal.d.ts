export interface ItemFormModalProps {
    data?: any;
    opened: boolean;
    onClose: () => void;
    onSave: (data: any) => void
}