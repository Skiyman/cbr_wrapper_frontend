import "./Button.scss"

const Button = (props) => {

    return (
        <button class="custom__button">{props.label}</button>
    )
}

export default Button;