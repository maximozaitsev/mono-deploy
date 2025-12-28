"use client";

import { useState, useRef, useEffect } from "react";
import PlusIcon from "../__common__/PlusIcon";
import MinusIcon from "../__common__/MinusIcon";
import { replaceCurrentYear } from "../../utils/yearReplacer";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQClientProps {
  faqTitle: string;
  faqs: FAQItem[];
}

export default function FAQClient({ faqTitle, faqs }: FAQClientProps) {
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
    <section className="faq-section section">
      <div className="container">
        <h2 className="h2-heading white">{replaceCurrentYear(faqTitle || "FAQ")}</h2>
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <div className="faq-question" onClick={() => toggleAccordion(index)}>
              <span className="icon">
                {activeIndices.includes(index) ? <MinusIcon /> : <PlusIcon />}
              </span>
              {replaceCurrentYear(faq.question)}
            </div>
            <div
              ref={(el) => {
                contentRefs.current[index] = el;
              }}
              className={`faq-answer ${
                activeIndices.includes(index) ? "active" : ""
              }`}
            >
              <p dangerouslySetInnerHTML={{ __html: replaceCurrentYear(faq.answer) }} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
