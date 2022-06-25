import classNames from 'classnames';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import styles from './header.module.scss';

const Header = (): JSX.Element => {
  const router = useRouter();

  useEffect(() => {
    console.log('On header init');
  }, [])

  return (
    <>
      <div className={styles["header"]}>
        <div className={classNames("container", styles["container"])}>
          <div
            className={styles['header__logo']}
            onClick={() => router.push('/')}
          >LOGO</div>
        </div>
      </div>
    </>
  );
};

export default Header;
