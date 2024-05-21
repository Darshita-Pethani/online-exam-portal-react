import { CFormSelect, CFormLabel } from '@coreui/react'


const SelectBox = ({ ariaLabel = 'select one', label = 'selectBox', value = '', disabled = false, feedbackInvalid = 'At least one record is required!', style = '', size = 'sm', id = 'validationSelect', required = false, options = [], ...props }) => {
    return (
        <>
            <CFormLabel ><strong>{label}</strong></CFormLabel>
            <CFormSelect
                value={value} // this value set the data in the select box in edit mode
                onChange={props?.onChange}
                feedbackInvalid={feedbackInvalid}
                id={id}
                disabled={disabled}
                required={required}
            >
                <option value=''>{ariaLabel}</option>
                {
                    options &&
                    options.map((item, index) => (
                        <option key={index} value={item?.value}>{item?.label}</option>
                    ))
                }
            </CFormSelect>
        </>
    );
};


export default SelectBox;
