export const labels = [
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

export const codes = {
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

export function convertSeverityCodeToLabel(code) {
    return labels[parseInt(code)];
}

export function convertSeverityLabelToCode(label) {
    return codes[label.toString().toUpperCase()];
}
