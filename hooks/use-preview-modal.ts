import { ProductSmall } from "@/lib/types";
import { create } from "zustand";

interface PreviewModalStore {
    isOpen: boolean;
    data?: ProductSmall; // Update type to ProductSmall
    onOpen: (data: ProductSmall) => void;
    onClose: () => void;
}

const usePreviewModal = create<PreviewModalStore>((set) => ({
    isOpen: false,
    data: undefined,
    onOpen: (data: ProductSmall) => set({ data, isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));

export default usePreviewModal;
