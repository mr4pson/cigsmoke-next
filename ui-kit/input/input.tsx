import styles from './input.module.scss';
import classNames from 'classnames';

type Props = {
  className?: string;
  placeholder?: string;
  name?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
}

const Input = ({
  className,
  placeholder,
  name,
  onClick,
}: Props): JSX.Element => {
  return (
    <input
      className={classNames(className, styles['input'])}
      onClick={onClick}
      placeholder={placeholder}
      name={name}
    />
  );
};

export default Input;
