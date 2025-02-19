import Image from "next/image";
// import licenceImage from "../../../public/block-images/licence.webp";
// import TwoColumns from "../__common__/two-columns/TwoColumns";
import { content } from "@/content/content";

import styles from "./LicensesSection.module.scss";

export default function LicensesSection() {
  return (
    <section className={`${styles.licensesSection} section`}>
      <div className="container">
        <h2 className={`h3-heading ${styles.headingMobile}`}>
          {content.licenses.title[0]}
        </h2>
        <div className={styles.licensesContent}>
          <div className={styles.leftContent}>
            <h2 className={`h3-heading ${styles.headingDesktop}`}>
              {content.licenses.title[0]}
            </h2>
            <p className="paragraph-text">{content.licenses.text[0]}</p>
            <h3 className="h3-heading">{content.licenses.title[1]}</h3>
            <p className="paragraph-text">{content.licenses.text[1]}</p>
            <h3 className="h3-heading">{content.licenses.title[2]}</h3>
            <p className="paragraph-text">{content.licenses.text[2]}</p>
            <h3 className="h3-heading">{content.licenses.title[3]}</h3>
            <p className="paragraph-text">{content.licenses.text[3]}</p>
            <h3 className="h3-heading">{content.licenses.title[4]}</h3>
            <p className="paragraph-text">{content.licenses.text[4]}</p>
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
