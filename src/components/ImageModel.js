import { CButton, CModal } from "@coreui/react";

export const ImageModel = (({ visible, setVisible, ...props }) => {
    return (
        <>
            <CModal
                alignment="center"
                visible={visible}
                onClose={() => setVisible(false)}
            >
                <img
                    src={props?.src}
                    alt={props?.alt}
                    style={props?.style}
                />
            </CModal>
        </>
    )
});