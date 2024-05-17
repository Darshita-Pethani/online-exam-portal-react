import { CButton } from "@coreui/react";
import styled from 'styled-components';

const StyledFormButton = styled(CButton)`
    &:hover {
        background-color: ${({ hoverBgColor }) => hoverBgColor} !important;
        color: ${({ hoverFontColor }) => hoverFontColor} !important;
        border-color: ${({ hoverBorderColor }) => hoverBorderColor} !important;
    }
`;

const FormButton = ({ size = 'large', type = "submit", color = "secondary", label = "Button", hoverBgColor = 'transparent', hoverFontColor = 'transparent', hoverBorderColor = 'transparent', ...props }) => {

    return (
        <div>
            <StyledFormButton
                fullWidth={props?.fullWidth}
                size={size}
                type={type}
                onClick={props?.onClick}
                color={color}
                hoverFontColor={hoverFontColor}
                hoverBgColor={hoverBgColor}
                hoverBorderColor={hoverBorderColor}
                style={{ ...props?.style }}
            >
                {label}
            </StyledFormButton>
        </div>
    )

}
export default FormButton;
