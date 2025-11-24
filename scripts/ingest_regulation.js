const fs = require('fs');
const path = require('path');

const REGULATION_FILE = path.join(__dirname, '../data/regulation.json');

// 2025 Regulatory Updates sourced from research
const NEW_REGULATION_ITEMS = [
    // HONG KONG
    {
        regulation_id: "hk_stablecoin_regime_2025",
        title: "HKMA Stablecoin Issuer Regime",
        jurisdiction: "Hong Kong",
        regulator: "HKMA",
        category: "Stablecoin",
        status: "Active",
        reference_code: "HKMA-2025-SC",
        announcement_date: "2025-08-01",
        url: "https://www.hkma.gov.hk",
        summary: "Comprehensive licensing regime for stablecoin issuers. Requires full backing, segregation of assets, and no interest payments. First batch of licenses expected early 2026.",
        notes: "Came into effect Aug 1, 2025. Includes a sandbox phase."
    },
    {
        regulation_id: "hk_ensemble_tx_pilot_2025",
        title: "Project EnsembleTX Pilot",
        jurisdiction: "Hong Kong",
        regulator: "HKMA",
        category: "Tokenisation",
        status: "Pilot",
        reference_code: "HKMA-2025-ENS",
        announcement_date: "2025-11-01",
        url: "https://www.hkma.gov.hk",
        summary: "Pilot to test tokenized bank deposits in real-value transactions, aiming to integrate into banking infrastructure by 2026.",
        notes: "Focus on interbank settlement and tokenised deposits."
    },

    // SINGAPORE
    {
        regulation_id: "sg_mas_stablecoin_framework_2025",
        title: "MAS Stablecoin Regulatory Framework Formalization",
        jurisdiction: "Singapore",
        regulator: "MAS",
        category: "Stablecoin",
        status: "Proposed",
        reference_code: "MAS-2025-SC",
        announcement_date: "2025-11-13",
        url: "https://www.mas.gov.sg",
        summary: "Formalization of the stablecoin regime. Introduces 'MAS-Regulated Stablecoin' label for SCS pegged to SGD or G10 currencies. Requires 100% backing and 5-day redemption.",
        notes: "Legislative amendments expected in 2025."
    },

    // UAE
    {
        regulation_id: "uae_vara_issuance_rulebook_2025",
        title: "VARA Virtual Asset Issuance Rulebook (Fiat-Referenced)",
        jurisdiction: "UAE",
        regulator: "VARA",
        category: "Stablecoin",
        status: "Active",
        reference_code: "VARA-2025-FRVA",
        announcement_date: "2025-06-19",
        url: "https://www.vara.ae",
        summary: "Regulations for Fiat-Referenced Virtual Assets (FRVA). Requires 100% backing in segregated UAE bank accounts and daily attestations.",
        notes: "Effective June 19, 2025."
    },
    {
        regulation_id: "uae_adgm_frt_framework_2025",
        title: "ADGM Fiat-Referenced Token (FRT) Framework",
        jurisdiction: "UAE",
        regulator: "ADGM",
        category: "Stablecoin",
        status: "Finalised",
        reference_code: "ADGM-2025-FRT",
        announcement_date: "2025-09-09",
        url: "https://www.adgm.com",
        summary: "Comprehensive framework for FRTs including issuance, custody, and payments. Amendments effective Jan 1, 2026.",
        notes: "Consultation Paper No. 9 of 2025."
    },
    {
        regulation_id: "uae_ae_coin_approval",
        title: "Approval of AE Coin (Dirham Stablecoin)",
        jurisdiction: "UAE",
        regulator: "CBUAE",
        category: "Stablecoin",
        status: "Active",
        reference_code: "CBUAE-2025-AE",
        announcement_date: "2025-10-01",
        url: "https://www.centralbank.ae",
        summary: "Approval of the first Dirham-pegged stablecoin under the Payment Token Services Framework.",
        notes: "Paves way for Digital Dirham CBDC."
    },

    // EU
    {
        regulation_id: "eu_mica_full_implementation_2025",
        title: "MiCA Full Implementation & Enforcement",
        jurisdiction: "EU",
        regulator: "ESMA/EBA",
        category: "Stablecoin",
        status: "Active",
        reference_code: "EU-MiCA-2025",
        announcement_date: "2025-01-01",
        url: "https://www.esma.europa.eu",
        summary: "Full enforcement of MiCA rules for stablecoins (ARTs/EMTs). Strict reserve requirements, ban on interest, and EU presence required.",
        notes: "2025 is the key year for national enforcement and CASP authorization."
    }
];

function updateRegulation() {
    try {
        let regulations = [];
        if (fs.existsSync(REGULATION_FILE)) {
            const rawData = fs.readFileSync(REGULATION_FILE, 'utf8');
            regulations = JSON.parse(rawData);
        }

        console.log(`Original regulation count: ${regulations.length}`);

        let addedCount = 0;
        let updatedCount = 0;

        NEW_REGULATION_ITEMS.forEach(newItem => {
            const idx = regulations.findIndex(r => r.regulation_id === newItem.regulation_id);
            if (idx >= 0) {
                regulations[idx] = { ...regulations[idx], ...newItem };
                updatedCount++;
            } else {
                regulations.push(newItem);
                addedCount++;
            }
        });

        fs.writeFileSync(REGULATION_FILE, JSON.stringify(regulations, null, 2));
        console.log(`Success! Added ${addedCount} new items, updated ${updatedCount} existing items.`);
        console.log(`New regulation count: ${regulations.length}`);

    } catch (err) {
        console.error("Error updating regulation:", err);
    }
}

updateRegulation();
