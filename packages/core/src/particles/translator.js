export function initialize({serviceRegistry}) {
    const translator = {
        trans(key, args) {
            return key;
        },
    };
    serviceRegistry.registerService('translator', translator);
}

function bootstrap({stageManager}) {
    stageManager.registerStageListener('service-creation', initialize);
}

export const createTranslatorParticle = () => ({bootstrap});
