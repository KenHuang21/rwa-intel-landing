const fs = require('fs');
const path = require('path');

const PROJECTS_FILE = path.join(__dirname, '../data/projects.json');

const MISSING_PROJECTS = [
    {
        project_id: "sg_project_bloom",
        name: "Project BLOOM",
        issuer: "Monetary Authority of Singapore",
        jurisdiction: "Singapore",
        category: "Tokenised Securities Infrastructure",
        status: "Pilot",
        regulator: "MAS",
        announcement_date: "2025-01-15", // Estimated based on recent context
        url: "https://www.mas.gov.sg",
        key_participants: ["MAS", "Financial Industry Partners"],
        technical_stack: "Tokenised bank liabilities, Stablecoins, DLT",
        description: "Borderless, Liquid, Open, Online, Multi-currency (BLOOM) initiative to enhance settlement capabilities for tokenised assets.",
        notes: "Focuses on cross-border wholesale settlement using tokenised monies."
    },
    {
        project_id: "sg_project_orchid",
        name: "Project Orchid",
        issuer: "Monetary Authority of Singapore",
        jurisdiction: "Singapore",
        category: "Tokenised Money",
        status: "Live",
        regulator: "MAS",
        announcement_date: "2021-11-01",
        url: "https://www.mas.gov.sg/schemes-and-initiatives/project-orchid",
        key_participants: ["MAS", "DBS", "Grab", "Fazz", "UOB"],
        technical_stack: "Purpose Bound Money (PBM), Programmable Money",
        description: "Infrastructure for a digital Singapore Dollar, focusing on Purpose Bound Money (PBM) for programmable payments.",
        notes: "Foundational layer for future digital money initiatives like BLOOM."
    }
];

function addMissingProjects() {
    try {
        const rawData = fs.readFileSync(PROJECTS_FILE, 'utf8');
        let projects = JSON.parse(rawData);

        console.log(`Original project count: ${projects.length}`);

        let addedCount = 0;
        let updatedCount = 0;

        MISSING_PROJECTS.forEach(newP => {
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

addMissingProjects();
