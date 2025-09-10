import React from "react";
import { Offer } from "../../types/offer";
import BonusAccordion from "./BonusAccordion";
import { PROJECT_NAME, PROJECT_GEO } from "@/config/projectConfig";
import "./BonusDetailsSection.scss";

interface BonusDetailsSectionProps {
  offers?: Offer[];
}

const BonusDetailsSection: React.FC<BonusDetailsSectionProps> = ({ offers }) => {
  return (
    <section id="bonuses" className="bonus-details-section section container">
      <h2 className="h2-heading">Bonus details</h2>
      <BonusAccordion offers={offers} />
    </section>
  );
};

export default BonusDetailsSection;
