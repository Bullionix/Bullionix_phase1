import React from 'react'
import NextStyledButton from '../components/NextStyledButton'


interface Props {
    inputType?: "text" | "password"
    inputLabel?: string | undefined
    placeHolderText: string
    buttonTitle?: string | JSX.Element
    buttonSubmittingTitle?: string | JSX.Element
    buttonStyles?: any

    errorText?: string | undefined
    value: string
    onChangeText: (text: string) => void
    onSubmit?: () => void
    onBlur?: () => void
    submitWithEnterKey?: boolean

    disabled?: boolean
    submitting?: boolean | undefined
    buttonDisabled?: boolean

    //Styles
    inputFieldStyles: string
    inputLabelStyles?: string
    buttonDisabledStyles?: string
    errorTextStyles?: string
}

const NextStyledInput = (props: Props) => {

    const {
        inputLabel,
        inputType,
        placeHolderText,
        buttonTitle,
        buttonSubmittingTitle,
        buttonStyles,

        // inputBackgroundColor?: string
        //className?: string
        errorText,
        value,
        onChangeText,
        onSubmit,
        onBlur,
        submitWithEnterKey,

        disabled,
        submitting,
        buttonDisabled,

        inputFieldStyles,
        inputLabelStyles,
        errorTextStyles,
    } = props

    const darkThemeColor = "#3d3d3d"
    const lightThemeColor = "whitesmoke"
    const themeColor = "#1370fb"
    const themeGray = "gray"


    function saveButton() {

        console.log('disabled?', props.buttonDisabled)

        return (
            <NextStyledButton
                title={buttonTitle}
                onClick={() => onSubmit()}
                submittingTitle={buttonSubmittingTitle}
                submitting={submitting}
                defaultStyle={buttonStyles}
                additionalStyles={`
                background:${themeColor};
                `}
                //isValidating={isValidating}
                // onSubmit={() => onSubmit ? onSubmit(value) : undefined}
                // style={"sl-buttonStyle"}
                // hoverStyle="sl-buttonStyle-hover"
                // submitStyle="sl-buttonStyle-submit"
                // customStyles={buttonStyles}
                disabled={props.buttonDisabled}
                disabledStyle={props.buttonDisabledStyles}

            />
        )
    }


    function didPressKey(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {

            if (submitWithEnterKey && onSubmit) {
                onSubmit()
            }

        }

    }

    return (

        <div className="sl-inputGroup">

            <style jsx>{`

                .sl-inputGroup {
                    width:100%;
                  
                }

                
                .sl-inputContainer {
                    display: flex;
                    flex-direction: row;
                }

                .sl-inputLabel {
                    background: none;
                    color: ${darkThemeColor};
                    font-size: 11pt;
                    margin-bottom: 10px;
                    margin-left: 10px;
                    text-align: left;
                    font-weight: bold;
                    ${inputLabelStyles}
                }


                input {
                    padding-left:15px;
                    flex:1;
                    display: flex;
                    border:none;
                    font-size: 16pt;
                    color:${darkThemeColor};
                    font-weight: 400;

                    ${inputFieldStyles}
                }

                input:disabled{
                    padding-left:15px;
                    flex:1;
                    display: flex;
                    border:none;
                    font-size: 16pt;
                    padding-top: 20px;
                    padding-bottom: 20px;
                    background: white;
                    height: 70px;
                    color:rgba(0,0,0,0.5);
                    font-weight: 400;
                }

                .sl-errorText {
                    margin-top: 10px;
                    margin-left: 10px;
                    color: red;
                    font-size: 11pt;
                    ${errorTextStyles}
                  
                    
                }

            `}</style>

            {inputLabel !== undefined &&
                <div className="sl-inputLabel">{inputLabel}</div>
            }

            <div className="sl-inputContainer">



                <input
                    type={inputType ? inputType : "text"}

                    onBlur={() => onBlur ? onBlur() : undefined}
                    onChange={(text) => onChangeText(text.currentTarget.value)}
                    onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => didPressKey(e)}
                    value={value}

                    disabled={disabled}
                    placeholder={placeHolderText}>
                </input>

                {buttonTitle !== undefined &&
                    saveButton()
                }


            </div>

            <div className="sl-errorText">{errorText}</div>

        </div>

    )


}

/*
function areEqual(prevProps, nextProps) {
    return prevProps.value === nextProps.value
}

const MemoInput = React.memo(ReusableSingleLineInput, areEqual)
*/

export default NextStyledInput