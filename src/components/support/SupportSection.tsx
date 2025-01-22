import Image from "next/image";
import { content } from "@/content/content";
import support from "../../../public/block-images/support.webp";
import styles from "./SupportSection.module.scss";

export default function SupportSection() {
  return (
    <section className={`${styles.supportSection} section`}>
      <div className="container">
        <div className={styles.supportContent}>
          <div className={styles.leftContent}>
            <h2 className="h2-heading">{content.support.title}</h2>
            <p className="paragraph-text black">{content.support.text[0]}</p>
            
            {/* <p className="paragraph-text black">{content.support.text[1]}</p> */}
          </div>
          <div className={styles.rightImage}>
            <Image src={support} alt="Support" quality={100} />
          </div>
        </div>
      </div>
    </section>
  );
}
