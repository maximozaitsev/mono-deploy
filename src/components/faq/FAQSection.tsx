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
    const load = async () => {
      try {
        const manifestRes = await fetch("/content/languages.json", {
          cache: "no-cache",
        });
        const manifest = await manifestRes.json();
        const parts = window.location.pathname.split("/").filter(Boolean);
        const first = parts[0];
        const lang =
          first &&
          manifest.languages.includes(first) &&
          first !== manifest.defaultLang
            ? first
            : manifest.defaultLang;
        const res = await fetch(`/content/content.${lang}.json`, {
          cache: "no-cache",
        });
        const data = await res.json();

        const faqData = data.faq;
        if (!faqData) return;
        const faqEntries = Object.entries(faqData) as [string, any][];
        if (faqEntries.length === 0) return;

        const [title, faqContent] = faqEntries[0];
        setFaqTitle(title);

        const items: FAQItem[] = [];
        for (let i = 0; i < faqContent.length; i++) {
          if (faqContent[i].type === "heading" && faqContent[i].level === 3) {
            const question = faqContent[i].text;
            const answer =
              faqContent[i + 1]?.type === "paragraph"
                ? faqContent[i + 1].text
                : "";
            items.push({ question, answer });
          }
        }
        setFaqs(items);
      } catch (err) {
        console.error("Ошибка загрузки JSON:", err);
      }
    };
    load();
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
    <section className="faq-section section container">
      <h2 className="h2-heading">{faqTitle || "FAQ"}</h2>
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
