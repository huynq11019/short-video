import * as Sentry from '@sentry/browser';
import { getCLS, getFID, getLCP, ReportHandler } from 'web-vitals';

export function initMonitoring() {
  Sentry.init({
    dsn: process.env.SENTRY_DSN || '',
    environment: process.env.NODE_ENV || 'development',
  });

  const report: ReportHandler = metric => {
    Sentry.captureMessage(`${metric.name}: ${metric.value}`);
  };

  getCLS(report);
  getFID(report);
  getLCP(report);
}

export function reportError(err: any) {
  Sentry.captureException(err);
}
