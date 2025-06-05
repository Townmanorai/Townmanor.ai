import React, { Suspense } from 'react';
import styles from './RentAgreementHowTo.module.css';

const RentAgreementVideo = React.lazy(() => import('./RentAgreementVideo'));

const RentAgreementHowTo = () => {
  return (
    <div className={styles['rentagmtXyz-container']}>
      <h1 className={styles['rentagmtXyz-title']}>
        How to Use Our Rent Agreement Service
      </h1>
      <p className={styles['rentagmtXyz-subtitle']}>
        Watch our comprehensive tutorial to learn how to create, customize, and finalize your rental agreement in minutes.
      </p>
      <div className={styles['rentagmtXyz-videoWrapper']}>
        <Suspense fallback={<div className={styles['rentagmtXyz-loading']}>Loading video...</div>}>
          <RentAgreementVideo />
        </Suspense>
      </div>
    </div>
  );
};

export default RentAgreementHowTo;
