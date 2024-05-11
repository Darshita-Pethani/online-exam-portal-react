import { CFormSelect } from '@coreui/react'


const SelectBox = ({ ariaLabel = 'select one', label = 'selectBox', value = '', disabled = false, feedbackInvalid = 'At least one record is required!', style = '', size = 'sm', id = 'validationSelect', required = false, ...props }) => {
    return (
        <CFormSelect
            aria-label={ariaLabel}
            label={label}
            value={value}
            onChange={props?.onChange}
            feedbackInvalid={feedbackInvalid}
            id={id}
            options={props?.options}
            disabled={disabled}
            required={required}
        >
            {/* {
                props?.options && props?.options.length > 0 ? 'aave che' : 'ny aavtu'
            } */}
        </CFormSelect>
    );
};


export default SelectBox;
