import './styles.css';
import { initMonitoring, reportError } from '@short-video/monitoring';

initMonitoring();
import('./bootstrap').catch(reportError);
