import pino from 'pino';
import fs from 'fs';
import path from 'path';

const logDir = path.resolve(process.cwd(), 'logs');
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
}

const logFilePath = path.join(logDir, 'test-execution.log');

const logLevel = process.env.LOG_LEVEL || (process.env.CI ? 'info' : 'debug');

const streams: pino.StreamEntry[] = [
    {
        level: logLevel as pino.Level,
        stream: process.env.CI
            ? process.stdout
            : (require('pino-pretty') as typeof import('pino-pretty'))({
                  colorize: true,
                  translateTime: 'SYS:yyyy-mm-dd HH:MM:ss.l',
                  ignore: 'pid,hostname',
              }),
    },
    {
        level: logLevel as pino.Level,
        stream: fs.createWriteStream(logFilePath, { flags: 'a' }),
    },
];

export const logger = pino(
    {
        level: logLevel,
        timestamp: pino.stdTimeFunctions.isoTime,
        redact: {
            paths: [
                'password',
                'confirmPassword',
                '*.password',
                '*.Password',
                '*.ConfirmPassword',
                'token',
                'authorization',
            ],
            censor: '***REDACTED***',
        },
    },
    pino.multistream(streams)
);

export type Logger = pino.Logger;
