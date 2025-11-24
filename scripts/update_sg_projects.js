const fs = require('fs');
const path = require('path');

const PROJECTS_FILE = path.join(__dirname, '../data/projects.json');

// New data sourced from MAS announcements (2024-2025)
const NEW_SG_PROJECTS = [
    {
        project_id: "sg_guardian_wholesale_network_2024",
        name: "Guardian Wholesale Network",
        issuer: "Citi, HSBC, Schroders, Standard Chartered, UOB",
        jurisdiction: "Singapore",
        category: "Tokenised Securities Infrastructure",
        status: "Live",
        regulator: "MAS",
        announcement_date: "2024-11-04",
        url: "https://www.mas.gov.sg/news/media-releases/2024/mas-announces-plans-to-support-commercialisation-of-asset-tokenisation",
        key_participants: ["Citi", "HSBC", "Schroders", "Standard Chartered", "UOB"],
        technical_stack: "Commercial network for tokenised assets, focused on deepening liquidity and scaling usage.",
        description: "Industry group formed to commercialise asset tokenisation trials and scale usage across capital markets.",
        notes: "Part of MAS's move to commercialise asset tokenisation."
    },
    {
        project_id: "sg_sgd_testnet_2024",
        name: "SGD Testnet (Wholesale CBDC)",
        issuer: "Monetary Authority of Singapore",
        jurisdiction: "Singapore",
        category: "Tokenised Money",
        status: "Pilot",
        regulator: "MAS",
        announcement_date: "2024-11-04",
        url: "https://www.mas.gov.sg/news/media-releases/2024/mas-announces-plans-to-support-commercialisation-of-asset-tokenisation",
        key_participants: ["MAS", "DBS", "OCBC", "Standard Chartered", "UOB"],
        technical_stack: "Test network for wholesale CBDC settlement, featuring programmability and interoperability.",
        description: "MAS-facilitated test network for settling transactions with Singapore dollar (S$) wholesale central bank digital currency (CBDC).",
        notes: "Supports interbank payments and cross-border securities settlement."
    },
    {
        project_id: "sg_gl1_initiative_2024",
        name: "Global Layer One (GL1) Initiative",
        issuer: "GL1 Consortium",
        jurisdiction: "Singapore",
        category: "Tokenised Securities Infrastructure",
        status: "Pilot",
        regulator: "MAS",
        announcement_date: "2024-06-27",
        url: "https://www.mas.gov.sg/news/media-releases/2024/mas-partners-financial-industry-to-expand-asset-tokenisation-initiatives",
        key_participants: ["BNY", "Citi", "J.P. Morgan", "MUFG Bank", "Societe Generale-FORGE", "Euroclear", "HSBC"],
        technical_stack: "Multi-purpose shared ledger infrastructure based on DLT.",
        description: "Foundational digital infrastructure initiative to foster a seamless cross-border ecosystem for tokenised assets.",
        notes: "Expanded in 2024 with new market infrastructure working group."
    },
    {
        project_id: "sg_citi_fidelity_troweprice_trade_pilot",
        name: "Citi, T. Rowe Price, Fidelity Digital Asset Trades",
        issuer: "Citi, T. Rowe Price, Fidelity International",
        jurisdiction: "Singapore",
        category: "Tokenised Funds",
        status: "Pilot",
        regulator: "MAS",
        announcement_date: "2023-11-15",
        url: "https://www.mas.gov.sg/news/media-releases/2023/mas-partners-financial-industry-to-expand-asset-tokenisation-initiatives",
        key_participants: ["Citi", "T. Rowe Price", "Fidelity International"],
        technical_stack: "Institutional-grade mechanisms for pricing and executing bilateral digital asset trades.",
        description: "Testing real-time post-trade reporting and analytics for digital asset trades.",
        notes: "Continued pilot under Project Guardian."
    },
    {
        project_id: "sg_franklin_templeton_tokenised_fund",
        name: "Franklin Templeton Tokenised Money Market Fund",
        issuer: "Franklin Templeton",
        jurisdiction: "Singapore",
        category: "Tokenised Funds",
        status: "Pilot",
        regulator: "MAS",
        announcement_date: "2023-11-15",
        url: "https://www.mas.gov.sg/news/media-releases/2023/mas-partners-financial-industry-to-expand-asset-tokenisation-initiatives",
        key_participants: ["Franklin Templeton"],
        technical_stack: "Variable Capital Company (VCC) structure using digital asset networks.",
        description: "Issuance of a tokenised money market fund shares with transparent record-keeping.",
        notes: "Leverages VCC structure."
    },
    {
        project_id: "sg_ant_group_treasury",
        name: "Ant Group Treasury Management Pilot",
        issuer: "Ant Group",
        jurisdiction: "Singapore",
        category: "Tokenised Money",
        status: "Pilot",
        regulator: "MAS",
        announcement_date: "2023-11-15",
        url: "https://www.mas.gov.sg/news/media-releases/2023/mas-partners-financial-industry-to-expand-asset-tokenisation-initiatives",
        key_participants: ["Ant Group"],
        technical_stack: "Real-time multi-currency clearing and settlement solution.",
        description: "Enhancing global liquidity management funding through a treasury management solution.",
        notes: "Operated through Singapore global treasury centre."
    },
    {
        project_id: "sg_schroders_ils_pilot",
        name: "Schroders Tokenised Insurance-Linked Securities",
        issuer: "Schroders",
        jurisdiction: "Singapore",
        category: "Tokenised Structured Products",
        status: "Pilot",
        regulator: "MAS",
        announcement_date: "2024-01-01",
        url: "https://www.mas.gov.sg/news/media-releases/2023/mas-partners-financial-industry-to-expand-asset-tokenisation-initiatives",
        key_participants: ["Schroders"],
        technical_stack: "",
        description: "Experimenting with tokenised insurance-linked securities (ILS) and DeFi models.",
        notes: "Part of broader Project Guardian experiments."
    }
];

function updateProjects() {
    try {
        const rawData = fs.readFileSync(PROJECTS_FILE, 'utf8');
        let projects = JSON.parse(rawData);

        console.log(`Original project count: ${projects.length}`);

        // Filter out old SG projects if we want to replace them, OR just upsert.
        // Let's upsert based on project_id.

        let addedCount = 0;
        let updatedCount = 0;

        NEW_SG_PROJECTS.forEach(newP => {
            const idx = projects.findIndex(p => p.project_id === newP.project_id);
            if (idx >= 0) {
                projects[idx] = { ...projects[idx], ...newP };
                updatedCount++;
            } else {
                projects.push(newP);
                addedCount++;
            }
        });

        fs.writeFileSync(PROJECTS_FILE, JSON.stringify(projects, null, 2));
        console.log(`Success! Added ${addedCount} new projects, updated ${updatedCount} existing projects.`);
        console.log(`New project count: ${projects.length}`);

    } catch (err) {
        console.error("Error updating projects:", err);
    }
}

updateProjects();
