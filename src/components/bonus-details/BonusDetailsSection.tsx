"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Offer } from "../../types/offer";
import { fetchOffers } from "@/utils/fetchOffers";
import Button from "../__common__/button/Button";
import InfoIcon from "../__common__/InfoIcon";
import { PROJECT_NAME, PROJECT_GEO } from "@/config/projectConfig";
import "./BonusDetailsSection.scss";

const BonusDetailsSection: React.FC = () => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [openOffers, setOpenOffers] = useState<number[]>([]);
  const [displayedOffers, setDisplayedOffers] = useState<Offer[]>([]);

  useEffect(() => {
    const loadOffers = async () => {
      const { offers } = await fetchOffers();
      setOffers(offers);
      setDisplayedOffers(offers.slice(0, 6));
    };

    loadOffers();
  }, []);

  const toggleAccordion = (id: number) => {
    if (openOffers.includes(id)) {
      setOpenOffers(openOffers.filter((offerId) => offerId !== id));
    } else {
      setOpenOffers([...openOffers, id]);
    }
  };

  const renderValueOrDash = (value: string | number | null | undefined) =>
    value ? value : "—";

  const shuffleOffers = () => {
    const shuffled = [...offers].sort(() => Math.random() - 0.5);
    setDisplayedOffers(shuffled.slice(0, 6));
  };

  return (
    <section id="bonuses" className="bonus-details-section section container">
      <h2 className="h2-heading">Bonus details</h2>

      <div className="table">
        <div className="head-row row">
          <div className="headerCell">Casino</div>
          <div className="headerCell hide-1020">Bonuses</div>
          <div className="headerCell">Rate</div>
          <div className="headerCell">Free Spins</div>
          <div className="headerCell">More Info</div>
          <div className="headerCell hide-768">Get</div>
        </div>

        {displayedOffers.map((offer) => (
          <div key={offer.id} className="row">
            <div className="cell">
              <Image
                src={(offer as any).optimizedLogo || offer.logo}
                className="offerImage"
                alt={offer.name}
                title={offer.name + " in " + PROJECT_NAME + " " + PROJECT_GEO}
                width={140}
                height={56}
                style={{ maxWidth: "100%", height: "auto" }}
                quality={100}
              />
            </div>
            <div className="cell hide-1020">Welcome Bonus</div>
            <div className="cell">{renderValueOrDash(offer.bonuses.rate)}</div>
            <div className="cell">
              {offer.bonuses.free_spins > 0 && `${offer.bonuses.free_spins} FS`}
            </div>

            <div className="cell info-cell">
              <button
                onClick={() => toggleAccordion(offer.id)}
                className="icon-button"
                aria-label="Toggle information for offer"
              >
                <InfoIcon />
              </button>
            </div>
            <div className="cell hide-768 last-cell">
              <Button
                text="Get The Bonus"
                variant="secondary"
                useNavigation={true}
                url={`/casino/${offer.id}`}
                openInNewTab
              />
            </div>
            {openOffers.includes(offer.id) && (
              <div className="accordion">
                <div className="accordion-item">
                  <div className="accordion-title">Maximum Amount:</div>
                  <div className="accordion-value">
                    {renderValueOrDash(offer.bonuses.amount)}
                  </div>
                </div>
                <div className="accordion-item">
                  <div className="accordion-title">Wager:</div>
                  <div className="accordion-value">
                    {renderValueOrDash(offer.wager)}
                  </div>
                </div>
                <div className="accordion-item">
                  <div className="accordion-title">Bonus Code:</div>
                  <div className="accordion-value">
                    {renderValueOrDash(offer.bonus_code)}
                  </div>
                </div>

                <div className="accordion-item last-cell show-768">
                  <div className="accordion-title last-cell"></div>
                  <div className="accordion-value last-cell">
                    <Button
                      text="Get The Bonus"
                      variant="secondary"
                      useNavigation={true}
                      url={`/casino/${offer.id}`}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <Button
        text="Refresh"
        variant="primary"
        onClick={shuffleOffers}
        useNavigation={false}
      />
    </section>
  );
};

export default BonusDetailsSection;
