import { CFormCheck, CFormLabel, CInputGroup } from "@coreui/react";

const RadioButton = ({ type = 'radio', name = "flexRadioDefault", id = "flexRadioDefault1", label = "Default radio", radioButtonData = [], value = '0', ...props }) => {

    return (
        <>
            <CFormLabel ><strong>{label}</strong></CFormLabel>
            <CInputGroup
                style={props?.style}
                value={value}
            >
                {
                    radioButtonData &&
                    radioButtonData?.map((item, index) => (
                        <CFormCheck
                            key={item?.id}
                            type={type}
                            name={name}
                            id={item?.id}
                            label={item?.label}
                            value={item?.value}
                            onChange={props?.onChange}
                            // checked={parseInt(value) === item.value}
                            // defaultChecked={item?.defaultChecked}
                            checked={(parseInt(value) === item?.value) === true ? parseInt(value) === item?.value : item?.defaultChecked}
                        />
                    ))
                }
            </CInputGroup >
        </>
    )
}

export default RadioButton;