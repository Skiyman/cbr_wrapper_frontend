import "./Button.scss";

const Button = (props) => {
  return <button className="custom__button">{props.label}</button>;
};

export default Button;
