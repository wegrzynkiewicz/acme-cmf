/* eslint-disable @typescript-eslint/naming-convention */

export const labels: string[] = [
    'EMERGENCY',
    'ALERT',
    'CRITICAL',
    'ERROR',
    'WARNING',
    'NOTICE',
    'INFO',
    'DEBUG',
    'SILLY',
];

export const codes: Record<string, number> = {
    ALERT: 1,
    CRITICAL: 2,
    DEBUG: 7,
    EMERGENCY: 0,
    ERROR: 3,
    INFO: 6,
    NOTICE: 5,
    SILLY: 8,
    WARNING: 4,
};

export function convertSeverityCodeToLabel(code: number): string {
    return labels[code];
}

export function convertSeverityLabelToCode(label: string): number {
    return codes[label.toUpperCase()];
}
