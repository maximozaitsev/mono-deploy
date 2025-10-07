"use client";

import { useState, useRef, useEffect } from "react";
import PlusIcon from "../__common__/PlusIcon";
import MinusIcon from "../__common__/MinusIcon";
import { getContentData, parseFAQContent } from "../../utils/serverContent";
import "./FAQSection.scss";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  content: any;
}

export default function FAQSection({ content }: FAQSectionProps) {
  const [activeIndices, setActiveIndices] = useState<number[]>([]);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

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
    <section className="faq-section section container">
      <h2 className="h2-heading">{content.faqTitle || "FAQ"}</h2>
      {content.faqs.map((faq, index) => (
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
