import FAQAccordion from "./FAQAccordion";
import "./FAQSection.scss";

// Импортируем контент напрямую
import content from "../../content/content.json";

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQSection() {
  // Обрабатываем данные на сервере
  const faqData = content.faq;
  
  let faqTitle = "FAQ";
  let faqs: FAQItem[] = [];

  if (faqData) {
    const faqEntries = Object.entries(faqData) as [string, any][];
    if (faqEntries.length > 0) {
      const [title, faqContent] = faqEntries[0];
      faqTitle = title;

      const faqItems: FAQItem[] = [];
      for (let i = 0; i < faqContent.length; i++) {
        if (faqContent[i].type === "heading" && faqContent[i].level === 3) {
          const question = faqContent[i].text;
          const answer =
            faqContent[i + 1]?.type === "paragraph"
              ? faqContent[i + 1].text
              : "";
          faqItems.push({ question, answer });
        }
      }
      faqs = faqItems;
    }
  }

  return (
    <section className="faq-section section container">
      <h2 className="h2-heading">{faqTitle}</h2>
      <FAQAccordion faqs={faqs} />
    </section>
  );
}
