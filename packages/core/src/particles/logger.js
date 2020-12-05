export class Logger {

    log() {
        console.log(...arguments);
    }
}

export const createLoggerParticle = () => ({
    bootstrap({stageManager}) {
        stageManager.registerStageListener('service-creation', ({serviceRegistry}) => {
            serviceRegistry.registerService('logger', new Logger());
        });
    },
});
