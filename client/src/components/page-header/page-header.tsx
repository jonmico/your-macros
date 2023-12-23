import styles from './page-header.module.css';

interface PageHeaderProps {
  children: React.ReactNode;
}

export default function PageHeader(props: PageHeaderProps) {
  return <h2 className={styles.pageHeader}>{props.children}</h2>;
}
