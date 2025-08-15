"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Offer } from "../../types/offer";
import { fetchOffers } from "@/utils/fetchOffers";
import Button from "../__common__/button/Button";
import InfoIcon from "../__common__/InfoIcon";
import { PROJECT_NAME } from "@/config/projectConfig";
import { getProjectGeoForLang } from "@/utils/localeMap";
import "./BonusDetailsSection.scss";

import staticTranslations from "../../../public/content/static.json";
import manifestData from "../../../public/content/languages.json";
import { usePathname } from "next/navigation";

type LangManifest = { languages: string[]; defaultLang: string };
const manifest = manifestData as LangManifest;
type StaticTranslationsMap = Record<string, Record<string, string>>;
const ST = staticTranslations as StaticTranslationsMap;

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

  const pathname = usePathname();
  const firstSeg = pathname?.split("/").filter(Boolean)[0] || "";
  const currentLang = manifest.languages.includes(firstSeg)
    ? firstSeg
    : manifest.defaultLang;
  const t = ST[currentLang] || ST[manifest.defaultLang] || ST["en"] || {};

  return (
    <section id="bonuses" className="bonus-details-section section container">
      <h2 className="h2-heading">{t.bonusDetails}</h2>

      <div className="table">
        <div className="head-row row">
          <div className="headerCell">{t.casino}</div>
          <div className="headerCell hide-1020">{t.bonuses}</div>
          <div className="headerCell">{t.rate}</div>
          <div className="headerCell">{t.freeSpins}</div>
          <div className="headerCell">{t.moreInfo}</div>
          <div className="headerCell hide-768">{t.get}</div>
        </div>

        {displayedOffers.map((offer, idx) => {
          const logoSrc = (offer as any).optimizedLogo || offer.logo;
          const geo = getProjectGeoForLang(currentLang);

          return (
            <div key={offer.id} className="row">
              <div className="cell">
                <Image
                  src={logoSrc}
                  className="offerImage"
                  alt={offer.name}
                  title={`${offer.name} in ${PROJECT_NAME} ${geo}`}
                  width={140}
                  height={56}
                  sizes="(max-width: 768px) 40vw, 140px"
                  priority={idx < 2}
                  loading={idx < 2 ? "eager" : "lazy"}
                  decoding="async"
                  fetchPriority={idx < 2 ? "high" : "auto"}
                  style={{ maxWidth: "100%", height: "auto" }}
                />
              </div>

              <div className="cell hide-1020">{t.welcomeBonus}</div>
              <div className="cell">
                {renderValueOrDash(offer.bonuses.rate)}
              </div>
              <div className="cell">
                {offer.bonuses.free_spins > 0 &&
                  `${offer.bonuses.free_spins} FS`}
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
                  text={t.getTheBonus}
                  variant="secondary"
                  useNavigation={true}
                  url={`/casino/${offer.id}`}
                  openInNewTab
                />
              </div>

              {openOffers.includes(offer.id) && (
                <div className="accordion">
                  <div className="accordion-item">
                    <div className="accordion-title">{t.maximumAmount}:</div>
                    <div className="accordion-value">
                      {renderValueOrDash(offer.bonuses.amount)}
                    </div>
                  </div>
                  <div className="accordion-item">
                    <div className="accordion-title">{t.wager}:</div>
                    <div className="accordion-value">
                      {renderValueOrDash(offer.wager)}
                    </div>
                  </div>
                  <div className="accordion-item">
                    <div className="accordion-title">{t.bonusCode}:</div>
                    <div className="accordion-value">
                      {renderValueOrDash(offer.bonus_code)}
                    </div>
                  </div>

                  <div className="accordion-item last-cell show-768">
                    <div className="accordion-title last-cell"></div>
                    <div className="accordion-value last-cell">
                      <Button
                        text={t.getTheBonus}
                        variant="secondary"
                        useNavigation={true}
                        url={`/casino/${offer.id}`}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <Button
        text={t.refresh}
        variant="primary"
        onClick={shuffleOffers}
        useNavigation={false}
      />
    </section>
  );
};

export default BonusDetailsSection;
