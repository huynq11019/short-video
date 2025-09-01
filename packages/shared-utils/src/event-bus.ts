import { Subject, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

interface BusEvent<T> {
  name: string;
  payload: T;
}

class EventBus {
  private subject = new Subject<BusEvent<any>>();

  emit<T>(event: string, payload: T): void {
    this.subject.next({ name: event, payload });
  }

  on<T>(event: string): Observable<T> {
    return this.subject.asObservable().pipe(
      filter(e => e.name === event),
      map(e => e.payload as T)
    );
  }
}

export const eventBus = new EventBus();
