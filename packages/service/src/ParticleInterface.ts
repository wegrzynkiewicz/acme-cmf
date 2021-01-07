export interface ParticleInterface {

    onPreInitParticles?: (serviceLocator: Record<string, unknown>) => Promise<void>,
    onInitParticles?: (serviceLocator: Record<string, unknown>) => Promise<void>,
    onPostInitParticles?: (serviceLocator: Record<string, unknown>) => Promise<void>,

    onPreInitConfig?: (serviceLocator: Record<string, unknown>) => Promise<void>,
    onInitConfig?: (serviceLocator: Record<string, unknown>) => Promise<void>,
    onPostInitConfig?: (serviceLocator: Record<string, unknown>) => Promise<void>,

    onPreInitServices?: (serviceLocator: Record<string, unknown>) => Promise<void>,
    onInitServices?: (serviceLocator: Record<string, unknown>) => Promise<void>,
    onPostInitServices?: (serviceLocator: Record<string, unknown>) => Promise<void>,

    onPreInitCommands?: (serviceLocator: Record<string, unknown>) => Promise<void>,
    onInitCommands?: (serviceLocator: Record<string, unknown>) => Promise<void>,
    onPostInitCommands?: (serviceLocator: Record<string, unknown>) => Promise<void>,

    onPreInitSchemas?: (serviceLocator: Record<string, unknown>) => Promise<void>,
    onInitSchemas?: (serviceLocator: Record<string, unknown>) => Promise<void>,
    onPostInitSchemas?: (serviceLocator: Record<string, unknown>) => Promise<void>,

    onPreInitRouting?: (serviceLocator: Record<string, unknown>) => Promise<void>,
    onInitRouting?: (serviceLocator: Record<string, unknown>) => Promise<void>,
    onPostInitRouting?: (serviceLocator: Record<string, unknown>) => Promise<void>,

    onPreExecute?: (serviceLocator: Record<string, unknown>) => Promise<void>,
    onExecute?: (serviceLocator: Record<string, unknown>) => Promise<void>,
    onPostExecute?: (serviceLocator: Record<string, unknown>) => Promise<void>,

    onPreListening?: (serviceLocator: Record<string, unknown>) => Promise<void>,
    onListening?: (serviceLocator: Record<string, unknown>) => Promise<void>,
    onPostListening?: (serviceLocator: Record<string, unknown>) => Promise<void>,

    onPreFinalize?: (serviceLocator: Record<string, unknown>) => Promise<void>,
    onFinalize?: (serviceLocator: Record<string, unknown>) => Promise<void>,
    onPostFinalize?: (serviceLocator: Record<string, unknown>) => Promise<void>,
}
