const translator = {
    trans(key, args) {
        return key;
    },
};

export const createTranslatorParticle = () => ({
    bootstrap({stageManager}) {
        stageManager.registerStageListener('service-creation', ({serviceRegistry}) => {
            serviceRegistry.registerService('translator', translator);
        });
    },
});
