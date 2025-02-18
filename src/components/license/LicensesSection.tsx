import Image from "next/image";
// import licenceImage from "../../../public/block-images/licence.webp";
// import TwoColumns from "../__common__/two-columns/TwoColumns";
import { content } from "@/content/content";

import styles from "./LicensesSection.module.scss";
import List from "../__common__/list/List";

export default function LicensesSection() {
  return (
    <section className={`${styles.licensesSection} section`}>
      <div className="container">
        <h2 className={`h3-heading ${styles.headingMobile}`}>
          {content.licenses.title}
        </h2>
        <div className={styles.licensesContent}>
          <div className={styles.leftContent}>
            <h2 className={`h3-heading ${styles.headingDesktop}`}>
              {content.licenses.title}
            </h2>
            <p className="paragraph-text">{content.licenses.text[0]}</p>
            <List items={content.licenses.list} />
            <p className="paragraph-text">{content.licenses.text[1]}</p>
          </div>
          {/* <div className={styles.rightImage}>
            <Image
              src={licenceImage}
              alt="Licenses"
              width={240}
              height={240}
              quality={100}
            />
          </div> */}
        </div>
      </div>
    </section>
  );
}
