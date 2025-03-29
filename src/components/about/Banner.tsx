import styles from '@/components/about/Banner.module.scss';

export default function Banner() {
  return (
    <>
      <div className={styles.root}>
        <div className={styles.b1}>
          <img src={'images/uiuc-group.jpg'} alt="UIUC chapter group" />
        </div>
        <div className={styles.b2}>
          <img
            src={'images/bog-medshare.jpg'}
            alt="Bits of Good (Georgia Tech chapter) members volunteering at Medshare"
          />
        </div>
      </div>
    </>
  );
};
