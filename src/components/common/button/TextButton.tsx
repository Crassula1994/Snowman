import { ButtonProps } from "@customTypes/commonProps";

interface TextButtonProps extends ButtonProps {
    text: string;
}

export default function TextButton(props: TextButtonProps) {
    const { block = false, colorType, onClick, outline = false, text } = props;

    const handleButtonStyle = (
        block: boolean,
        colorType: string,
        outline: boolean,
    ): string => {
        let buttonStyle = "btn";

        buttonStyle += ` btn-${colorType}`;

        if (block) {
            buttonStyle += " btn-block";
        }

        if (outline) {
            buttonStyle += " btn-outline";
        }

        return buttonStyle;
    };

    return (
        <button
            className={handleButtonStyle(block, colorType, outline)}
            onClick={onClick}
        >
            {text}
        </button>
    );
}
