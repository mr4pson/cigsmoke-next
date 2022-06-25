import styles from './button.module.scss';
import classNames from 'classnames';
import { ButtonTypes } from './types';

type Props = {
  className?: string;
  children?: React.ReactNode;
  icon?: JSX.Element;
  type?: ButtonTypes;
  onClick?: React.MouseEventHandler<HTMLElement>;
}

const Button = ({
  className,
  children,
  icon,
  type,
  onClick,
}: Props): JSX.Element => {
  return (
    <button type={type} onClick={onClick} className={classNames(className, styles['button'])}>
      <div>{children}</div>
      <div>
        {
          icon && <div className={styles['button__icon']}>{icon}</div>
        }
      </div>
    </button>
  );
};

export default Button;
