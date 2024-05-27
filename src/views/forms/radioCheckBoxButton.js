import { CFormCheck, CFormLabel, CInputGroup } from "@coreui/react";

const RadioCheckBoxButton = ({ type = '', name = "flexRadioDefault", id = "flexRadioDefault1", label = "Default radio", radioCheckBoxButtonData = [], value = '', ...props }) => {

    let checkedId = props?.checked?.map((checked) => {
        return parseInt(checked?.question_type_id)
    });

    return (
        <>
            <CFormLabel ><strong>{label}</strong></CFormLabel>
            <CInputGroup
                style={props?.style}
                value={value}
            >
                {
                    radioCheckBoxButtonData &&
                    radioCheckBoxButtonData?.map((item, index) => (
                        <CFormCheck
                            key={item?.id}
                            type={type}
                            name={name}
                            id={item?.id}
                            label={item?.label}
                            value={item?.value}
                            onChange={props?.onChange}
                            checked={
                                props?.checked && props?.checked.length > 0 ?
                                    checkedId.includes(parseInt(item?.id))
                                    : (parseInt(value) === item?.value) === true ? parseInt(value) === item?.value : item?.defaultChecked
                            }
                        />
                    ))
                }
            </CInputGroup >
        </>
    )
}

export default RadioCheckBoxButton;