import React from 'react';
import styles from './MyceliumAnimation.module.css';
import Mycelium1 from './icons/Mycelium1';
import Mycelium2 from './icons/Mycelium2';
import Mycelium3 from './icons/Mycelium3';
import Mycelium4 from './icons/Mycelium4';

const MyceliumAnimation: React.FC = () => {
  return (
    <div className={styles.animationWrapper}>
      <div className={styles.mycelium}>
        <Mycelium1 className={styles.mycelium1} />
        <Mycelium2 className={styles.mycelium2} />
        <Mycelium3 className={styles.mycelium3} />
        <Mycelium4 className={styles.mycelium4} />
      </div>
    </div>
  );
};

export default MyceliumAnimation; 