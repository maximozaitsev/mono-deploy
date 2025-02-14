"use client";

import { useState, useRef, useEffect } from "react";
import PlusIcon from "../__common__/PlusIcon";
import MinusIcon from "../__common__/MinusIcon";
import "./FAQSection.scss";

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQSection() {
  const [faqTitle, setFaqTitle] = useState<string>("");
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [activeIndices, setActiveIndices] = useState<number[]>([]);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    import("../../content/content.json")
      .then((data) => {
        const faqData = data.default.faq;

        if (!faqData) {
          console.error("Ошибка: FAQ не найден в JSON");
          return;
        }

        const faqEntries = Object.entries(faqData) as [string, any][];
        if (faqEntries.length === 0) return;

        const [faqTitle, faqContent] = faqEntries[0];
        setFaqTitle(faqTitle);

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

        setFaqs(faqItems);
      })
      .catch((error) => console.error("Ошибка загрузки JSON:", error));
  }, []);

  const toggleAccordion = (index: number) => {
    setActiveIndices((prevIndices) =>
      prevIndices.includes(index)
        ? prevIndices.filter((i) => i !== index)
        : [...prevIndices, index]
    );
  };

  useEffect(() => {
    contentRefs.current.forEach((content, index) => {
      if (content) {
        if (activeIndices.includes(index)) {
          content.style.maxHeight = content.scrollHeight + "px";
        } else {
          content.style.maxHeight = "0px";
        }
      }
    });
  }, [activeIndices]);

  return (
    <section
      className="faq-section section container"
      aria-labelledby="faq-title"
    >
      {faqTitle && (
        <h2 id="faq-title" className="h2-heading">
          {faqTitle}
        </h2>
      )}
      {faqs.map((faq, index) => (
        <div key={index} className="faq-item">
          <div className="faq-question" onClick={() => toggleAccordion(index)}>
            <span className="icon">
              {activeIndices.includes(index) ? (
                <MinusIcon size={32} />
              ) : (
                <PlusIcon size={32} />
              )}
            </span>
            {faq.question}
          </div>
          <div
            ref={(el) => {
              contentRefs.current[index] = el;
            }}
            className={`faq-answer ${
              activeIndices.includes(index) ? "active" : ""
            }`}
          >
            <p dangerouslySetInnerHTML={{ __html: faq.answer }} />
          </div>
        </div>
      ))}
    </section>
  );
}
