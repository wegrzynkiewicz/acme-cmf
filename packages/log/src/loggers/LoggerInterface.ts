export interface LoggerInterface {
    emergency: (message: string, parameters: Record<string, unknown> | undefined) => void,
    alert: (message: string, parameters: Record<string, unknown> | undefined) => void,
    critical: (message: string, parameters: Record<string, unknown> | undefined) => void,
    error: (message: string, parameters: Record<string, unknown> | undefined) => void,
    warning: (message: string, parameters: Record<string, unknown> | undefined) => void,
    notice: (message: string, parameters: Record<string, unknown> | undefined) => void,
    info: (message: string, parameters: Record<string, unknown> | undefined) => void,
    debug: (message: string, parameters: Record<string, unknown> | undefined) => void,
    silly: (message: string, parameters: Record<string, unknown> | undefined) => void,
}
