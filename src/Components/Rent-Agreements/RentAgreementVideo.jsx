import React from 'react';
import styles from './RentAgreementHowTo.module.css';

const RentAgreementVideo = () => (
  <video
    className={styles['rentagmtXyz-video']}
    controls
    poster="https://townamnor.ai/static/rent_agreement_tutorial_poster.png"
    style={{ width: '100%', height: 'auto', borderRadius: '1.1rem', background: '#000' }}
  >
    <source src="https://s3.ap-south-1.amazonaws.com/townamnor.ai/owner-images/1749121321965-rent+agreement+with+hindi+audio.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
);

export default RentAgreementVideo;
