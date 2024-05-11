import { CFormInput } from '@coreui/react'


const InputBox = ({ label = 'textBoxLabel', type = 'text', name = 'textBoxName', value = '', error, touched = '', disabled = false, margin = "normal", feedbackInvalid = 'Input is required!', style = '', size = 'sm', placeholder = 'Enter data', id = 'validationInput', ...props }) => {
    return (
        <CFormInput
            feedbackInvalid={feedbackInvalid}
            id={id}
            label={label}
            placeholder={placeholder}
            value={value}
            type={type}
            // size={size}
            onChange={props?.onChange}
            required={props?.required}
            disabled={disabled}

        />
    );
};


export default InputBox;
