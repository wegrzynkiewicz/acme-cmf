const translator = {
    trans(key, args) {
        return key;
    },
};

export function createTranslatorParticle() {
    return {
        bootstrap({stageManager}) {
            stageManager.registerStageListener('service-creation', ({serviceRegistry}) => {
                serviceRegistry.registerService('translator', translator);
            });
        },
    };
}
