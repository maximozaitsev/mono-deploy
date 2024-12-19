import Image from "next/image";
// import licenceImage from "../../../public/block-images/licence.webp";
import TwoColumns from "../__common__/two-columns/TwoColumns";
import { content } from "@/content/content";
import List from "../__common__/list/List";
import styles from "./LicensesSection.module.scss";

export default function LicensesSection() {
  return (
    <section className={`${styles.licensesSection} section`}>
      <div className="container">
        <h2 className="h3-heading">{content.licenses.title}</h2>
        <div className={styles.licensesContent}>
          <div className={styles.leftContent}>
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
        <div>
          <h3 className="h3-heading" style={{ marginBottom: "24px" }}>
            {content.licenses.security}
          </h3>
          <p className="paragraph-text" style={{ marginBottom: "24px" }}>
            {content.licenses.securityText[0]}
          </p>
          <List items={content.licenses.list2} ordered />
          <p className="paragraph-text" style={{ marginTop: "24px" }}>
            {content.licenses.securityText[1]}
          </p>
        </div>
        {/* <TwoColumns
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
                // {
                //   type: "list",
                //   content: content.licenses.list,
                // },
                // {
                //   type: "text",
                //   content: content.licenses.softwareText[1] ,
                // },
              ],
            },
          ]}
          columnGap="48px"
        /> */}
      </div>
    </section>
  );
}
