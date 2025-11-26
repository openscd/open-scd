export type Subscriber<T> = (value: T) => void;
export type Unsubscriber<T> = () => Subscriber<T>;

export class Subject<T> {
  private subscribers: Subscriber<T>[] = [];

  public next(value: T): void {
    this.subscribers.forEach(s => s(value));
  }

  public subscribe(subscriber: Subscriber<T>): Unsubscriber<T> {
    this.subscribers.push(subscriber);

    return () => {
      this.unsubscribe(subscriber);
      return subscriber;
    }
  }

  public unsubscribe(subscriber: Subscriber<T>): void {
    const indexToRemove = this.subscribers.findIndex(s => s === subscriber);
    if (indexToRemove > -1) {
      this.subscribers.splice(indexToRemove, 1);
    }
  }
}
