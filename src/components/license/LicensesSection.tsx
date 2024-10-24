import Image from "next/image";
import licenceImage from "../../../public/block-images/licence.webp";
import TwoColumns from "../__common__/two-columns/TwoColumns";
import { content } from "@/content/content";
import styles from "./LicensesSection.module.scss";

export default function LicensesSection() {
  return (
    <section className={`${styles.licensesSection} section`}>
      <div className="container">
        <h2 className="h3-heading">{content.licenses.title}</h2>
        <div className={styles.licensesContent}>
          <div className={styles.leftContent}>
            <p className="paragraph-text">{content.licenses.text[0]}</p>
          </div>
          <div className={styles.rightImage}>
            <Image
              src={licenceImage}
              alt="Licenses"
              width={240}
              height={240}
              quality={100}
            />
          </div>
        </div>
        <TwoColumns
          leftColumnContent={[
            {
              heading: content.licenses.security,
              items: [
                {
                  type: "text",
                  content: content.licenses.securityText[0],
                },
              ],
            },
          ]}
          rightColumnContent={[
            {
              heading: content.licenses.software,
              items: [
                {
                  type: "text",
                  content: content.licenses.softwareText[0],
                },
              ],
            },
          ]}
          columnGap="48px"
        />
      </div>
    </section>
  );
}
