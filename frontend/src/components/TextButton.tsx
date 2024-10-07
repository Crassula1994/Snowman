import styled from "styled-components";

interface ButtonProps {
    width: string;
    type?: "button" | "submit" | "reset";
    text: string;
    onClick?: () => void;
}

const ButtonWrapper = styled("button")<Partial<ButtonProps>>`
    width: ${(props) => props.width};
    background-color: ${(props) => props.theme.color.accent};
    color: white;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 600;
    &:hover {
        background-color: ${(props) => props.theme.color.accent_content};
    }
`;

export default function TextButton(props: ButtonProps) {
    const { width, type = "button", text, onClick } = props;
    return (
        <ButtonWrapper width={width} type={type} onClick={onClick}>
            {text}
        </ButtonWrapper>
    );
}
