import {bootstrap} from "@acme/core";
import {createTranslatorParticle} from "@acme/translator";

(async () => {
    process.on('unhandledRejection', (error) => {
        throw error;
    });
    const {run} = bootstrap({
        environmentVariables: process.env,
        particles: [
            createTranslatorParticle(),
        ],
    });
    await run();
})();
