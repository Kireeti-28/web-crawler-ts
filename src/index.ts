
function main() {
    const args = process.argv;

    if (args.length !== 3) {
        console.error("invalid args no of args");
        process.exit(1);
    }

    const baseURL = args[2];
    console.log(`starting crawl of: ${baseURL}`);

    process.exit(0);
}

main();