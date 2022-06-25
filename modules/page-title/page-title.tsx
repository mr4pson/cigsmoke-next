import styles from './page-title.module.scss';
import classNames from 'classnames';

type Props = {
  normalText: string;
  wrappedText?: string;
  className?: string | undefined;
}

const PageTitle = ({ normalText, wrappedText, className }: Props): JSX.Element => {
  return (
    <div className={classNames(styles["page-title"], className)}>
      <div className={styles["page-title__normal-text"]}>{normalText}</div>
      {
        wrappedText && <div className={classNames(styles["page-title__wrapped-text"], "page-title__wrapped-text")}>
          <span>{wrappedText}</span>
        </div>
      }
    </div>
  );
};

export default PageTitle;
