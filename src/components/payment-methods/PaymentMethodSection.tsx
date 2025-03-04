"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { PaymentMethod } from "@/types/payment";
import { fetchPayments } from "@/utils/fetchPayments";
import "./PaymentMethodsSection.scss";
import Button from "../__common__/button/Button";

interface PaymentMethodsSectionProps {
  initialPaymentMethods: PaymentMethod[];
}

const PaymentMethodsSection: React.FC<PaymentMethodsSectionProps> = ({
  initialPaymentMethods,
}) => {
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
      setIsMobileView(window.innerWidth <= 880);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="payment-methods-section section container">
      <h2 className="h2-heading">Payment methods</h2>
      {isMobileView ? (
        <div className="mobile-payment-methods">
          {paymentMethods.map((method) => (
            <div key={method.payment_id} className="payment-method-card">
              <div className="payment-method-header">
                <Image
                  src={method.image}
                  alt={method.name}
                  width={84}
                  height={64}
                />
                <Button text="Deposit" variant="secondary" />
              </div>
              <div className="payment-method-details">
                <p>
                  <strong>Type:</strong> {method.type}
                </p>
                <p>
                  <strong>Country:</strong> {method.country}
                </p>
                <p>
                  <strong>Commission:</strong> {method.commission}
                </p>
                <p>
                  <strong>Processing time:</strong> {method.processing_time}
                </p>
                <p>
                  <strong>Minimum deposit:</strong> {method.min_dep}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <table className="payment-methods-table">
          <thead className="payment-methods-table-header">
            <tr>
              <th>Method</th>
              <th>Type</th>
              <th>Country</th>
              <th>Commission</th>
              <th>Processing time</th>
              <th>Minimum deposit</th>
              <th>Deposit</th>
            </tr>
          </thead>
          <tbody>
            {paymentMethods.map((method) => (
              <tr className="paragraph-text black" key={method.payment_id}>
                <td>
                  <Image
                    src={method.image}
                    alt={method.name}
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
                  <Button text="Deposit" variant="secondary" />
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
