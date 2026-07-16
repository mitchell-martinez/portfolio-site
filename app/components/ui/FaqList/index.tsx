import type { FrequentlyAskedQuestion } from '~/data/freelanceServices';
import styles from './FaqList.module.scss';

interface FaqListProps {
  eyebrow?: string;
  faqs: FrequentlyAskedQuestion[];
  heading?: string;
  id: string;
  introduction?: string;
}

const FaqList = ({
  eyebrow = 'Common questions',
  faqs,
  heading = 'Frequently asked questions',
  id,
  introduction,
}: FaqListProps) => (
  <section className={styles.section} aria-labelledby={`${id}-heading`}>
    <div className={styles.header}>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <h2 id={`${id}-heading`} className={styles.heading}>
        {heading}
      </h2>
      {introduction && <p className={styles.introduction}>{introduction}</p>}
    </div>

    <div className={styles.list}>
      {faqs.map((faq, index) => (
        <details key={faq.question} className={styles.item} open={index === 0}>
          <summary className={styles.question}>
            <span>{faq.question}</span>
            <span className={styles.icon} aria-hidden="true">
              +
            </span>
          </summary>
          <p className={styles.answer}>{faq.answer}</p>
        </details>
      ))}
    </div>
  </section>
);

export { FaqList };
