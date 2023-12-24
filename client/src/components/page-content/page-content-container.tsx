import styles from './page-content-container.module.css';

interface PageContentProps {
  children: React.ReactNode;
}

export default function PageContentContainer(props: PageContentProps) {
  return <div className={styles.pageContentContainer}>{props.children}</div>;
}
