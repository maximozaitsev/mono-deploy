"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { PaymentMethod } from "@/types/payment";
import { fetchPayments } from "@/utils/fetchPayments";
import Button from "../__common__/button/Button";
import { PROJECT_NAME } from "@/config/projectConfig";
import { getProjectGeoForLang } from "@/utils/localeMap";
import "./PaymentMethodsSection.scss";
import translations from "../../../public/content/static.json";
import manifest from "../../../public/content/languages.json";
import { usePathname } from "next/navigation";

interface PaymentMethodsSectionProps {
  initialPaymentMethods: PaymentMethod[];
}

const PaymentMethodsSection: React.FC<PaymentMethodsSectionProps> = ({
  initialPaymentMethods,
}) => {
  const pathname = usePathname();
  const currentLang = pathname?.split("/")[1] || manifest.defaultLang;
  const t = translations[currentLang as keyof typeof translations];

  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(
    initialPaymentMethods
  );
  const [isMobileView, setIsMobileView] = useState<boolean>(false);

  useEffect(() => {
    async function updatePaymentMethods() {
      const updatedMethods = await fetchPayments();
      setPaymentMethods(updatedMethods);
    }

    if (!initialPaymentMethods.length) {
      updatePaymentMethods();
    }
  }, [initialPaymentMethods]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 850);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="payment-methods-section section container">
      <h2 className="h2-heading">{t.paymentMethods}</h2>
      {isMobileView ? (
        <div className="mobile-payment-methods">
          {paymentMethods.map((method) => (
            <div key={method.payment_id} className="payment-method-card">
              <div className="payment-method-header">
                <Image
                  src={method.image}
                  alt={method.name}
                  title={
                    method.name +
                    " in " +
                    PROJECT_NAME +
                    " " +
                    getProjectGeoForLang(currentLang)
                  }
                  width={84}
                  height={64}
                />
                <Button text={t.deposit} variant="secondary" openInNewTab />
              </div>
              <div className="payment-method-details">
                <p>
                  <strong>{t.type}:</strong> {method.type}
                </p>
                <p>
                  <strong>{t.country}:</strong> {method.country}
                </p>
                <p>
                  <strong>{t.commission}:</strong> {method.commission}
                </p>
                <p>
                  <strong>{t.processingTime}:</strong> {method.processing_time}
                </p>
                <p>
                  <strong>{t.minimumDeposit}:</strong> {method.min_dep}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <table className="payment-methods-table">
          <thead className="payment-methods-table-header">
            <tr>
              <th>{t.paymentMethods}</th>
              <th>{t.type}</th>
              <th>{t.country}</th>
              <th>{t.commission}</th>
              <th>{t.processingTime}</th>
              <th>{t.minimumDeposit}</th>
              <th>{t.deposit}</th>
            </tr>
          </thead>
          <tbody>
            {paymentMethods.map((method) => (
              <tr className="paragraph-text black" key={method.payment_id}>
                <td>
                  <Image
                    src={method.image}
                    alt={method.name}
                    title={
                      method.name +
                      " in " +
                      PROJECT_NAME +
                      " " +
                      getProjectGeoForLang(currentLang)
                    }
                    width={120}
                    height={70}
                  />
                </td>
                <td>{method.type}</td>
                <td>{method.country}</td>
                <td>{method.commission}</td>
                <td>{method.processing_time}</td>
                <td>{method.min_dep}</td>
                <td>
                  <Button text={t.deposit} variant="secondary" openInNewTab />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
};

export default PaymentMethodsSection;
