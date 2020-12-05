import {bootstrap} from "../core/bootstrap";
import {createServerParticle} from "../particles/server";
import {createTranslatorParticle} from "../particles/translator";
import {createLoggerParticle} from "../particles/logger";
import {createConfigParticle} from "../particles/config";

(async () => {
    process.on('unhandledRejection', (error) => {
        throw error;
    });
    const {run} = bootstrap({
        environmentVariables: process.env,
        particles: [
            createServerParticle(),
            createTranslatorParticle(),
            createLoggerParticle(),
            createConfigParticle(),
        ],
    });
    await run();
})();
