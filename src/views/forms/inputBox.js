import { CFormInput, CFormTextarea, CFormLabel } from '@coreui/react'


export const InputBox = ({ label = 'textBoxLabel', type = 'text', name = 'textBoxName', value = '', error, touched = '', disabled = false, margin = "normal", feedbackInvalid = 'Input is required!', style = '', size = 'sm', placeholder = 'Enter data', id = 'validationInput', ...props }) => {
    return (
        <>
            <CFormLabel><strong>{label}</strong></CFormLabel>
            <CFormInput
                feedbackInvalid={feedbackInvalid}
                id={id}
                placeholder={placeholder}
                value={value}
                type={type}
                // size={size}
                onChange={props?.onChange}
                required={props?.required}
                disabled={disabled}
            />
        </>
    );
};

export const InputTextArea = ({ id = 'exampleFormControlTextarea1', label = 'Example textarea', rows = '3', value = '', feedbackInvalid = 'Input is required!', placeholder = 'Enter data', ...props }) => {
    return (
        <>
            <CFormLabel><strong>{label}</strong></CFormLabel>
            <CFormTextarea
                feedbackInvalid={feedbackInvalid}
                id={id}
                rows={rows}
                placeholder={placeholder}
                required={props?.required}
                value={value}
                onChange={props?.onChange}
            />
        </>
    )
}
