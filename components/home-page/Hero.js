import Image from 'next/image';
import styles from './Hero.module.css';

function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.image}>
        <Image
          src="/images/site/mark-njoroge.png"
          alt="An image showing Mark Njoroge"
          width={1568 / 3}
          height={655}
          placeholder="blur"
        />
      </div>

      <h1>Hi, I'm Mark Njoroge</h1>

      <div>
        <p>
          I blog about web development - especially about vanilla javascript and
          it's environs like library like React, NextJs framework, and NodeJs
        </p>
        <p>
          <small>
            Currently I am fixated towards microservices and everything it has
            on the table i.e. Docker and Kubernetes.
          </small>
        </p>
      </div>
    </section>
  );
}

export default Hero;
