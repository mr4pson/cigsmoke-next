import styles from './index.module.scss';

const TabPaneWrapper = ({ children }) => {
  return <div className={styles.dynamicChartContainer}>{children}</div>;
};

export default TabPaneWrapper;
