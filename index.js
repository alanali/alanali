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
        .replace("{office_character}", `- ${office_quote.character}`)

    await fs.writeFile("README.md", readme);
}

main();
