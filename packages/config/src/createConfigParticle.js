import {ConfigurationRegistry} from './ConfigurationRegistry';

export const createConfigParticle = ({environmentVariables}) => ({
    bootstrap({stageManager}) {
        stageManager.registerStageListener('system-start', ({serviceRegistry}) => {
            serviceRegistry.registerService('configRegistry', new ConfigurationRegistry());
        });
        stageManager.registerStageListener('service-creation', ({configRegistry, serviceRegistry}) => {
            const configuration = configRegistry.createConfiguration();
            serviceRegistry.registerService('config', configuration);
        });
    },
});
