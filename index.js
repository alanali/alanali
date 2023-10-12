require("isomorphic-unfetch");
const { promises: fs } = require("fs");
const path = require("path");

async function main() {
    const readmeTemplate = (
        await fs.readFile(path.join(process.cwd(), "./README.template.md"))
    ).toString("utf-8");

    const office_quote = await (
        await fetch("https://officeapi.akashrajpurohit.com/quote/random")
    ).json();

    console.log(office_quote);

    const readme = readmeTemplate
        .replace("{office_quote}", office_quote.quote)
        .replace("{office_character}", `- ${office_quote.character}`);

    // Commit any local changes in README.md
    await execShellCommand('git add README.md && git commit -m "Committing local changes"');

    await fs.writeFile("README.md", readme);

    // Now you can proceed with the rest of your workflow
}

// Helper function to execute shell commands
function execShellCommand(cmd) {
    const exec = require('child_process').exec;
    return new Promise((resolve, reject) => {
        exec(cmd, (error, stdout, stderr) => {
            if (error) {
                console.warn(error);
            }
            resolve(stdout ? stdout : stderr);
        });
    });
}

main();
