import { CFormCheck, CFormLabel, CInputGroup } from "@coreui/react";

const RadioButton = ({ type = 'radio', name = "flexRadioDefault", id = "flexRadioDefault1", label = "Default radio", radioButtonData = [], value = '0', ...props }) => {
    console.log('props: ', value);

    return (
        <>
            <CFormLabel >{label}</CFormLabel>
            <CInputGroup
                style={props?.style}
            >
                {
                    radioButtonData?.map((item, index) => (
                        <CFormCheck
                            type={type}
                            name={name}
                            id={item?.id}
                            label={item?.label}
                            defaultChecked={item?.defaultChecked}
                            // onChange={props?.onChange}

                        />
                    ))
                }
            </CInputGroup >
        </>
    )
}

export default RadioButton;