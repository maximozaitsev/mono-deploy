"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { content } from "@/content/content";
import "./FAQSection.scss";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQSection = ({ faqs }: { faqs: FAQItem[] }) => {
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
      <h2 className="h2-heading">{content.faq.title}</h2>
      {faqs.map((faq, index) => (
        <div key={index} className="faq-item">
          <div className="faq-question" onClick={() => toggleAccordion(index)}>
            <span className="icon">
              <Image
                src={
                  activeIndices.includes(index)
                    ? "/assets/minus.svg"
                    : "/assets/plus.svg"
                }
                alt={activeIndices.includes(index) ? "Collapse" : "Expand"}
                width={32}
                height={32}
                className="icon-svg"
              />
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
            <p>{faq.answer}</p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default FAQSection;
