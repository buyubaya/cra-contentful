export const _debounce = <T>(fn: Function, time: number) => {
  let _timeout: NodeJS.Timeout;

  return (args: T) => {
    if (_timeout) {
      clearTimeout(_timeout);
    }

    _timeout = setTimeout(() => {
      fn(args);
    }, time);

    return args;
  };
};

export const _onlyCallWhen = <T>(checker: Function) => {
  let _prevValue: T;

  return (nextFn: Function) => (value: T) => {
    if (checker(value) !== checker(_prevValue)) {
      _prevValue = value;
      nextFn(value);
    }
  };
};

type SubscribeFunction = (nextFn: Function) => Function | void | null;

type NextFn<T> = (value: T) => void;

type ProjectionFn<T> = (value: T) => T;

type PredicateFn<T> = (value: T) => boolean;

type DistinctCheckerFn<T> = (value: T) => T;

export default class MiniSubject<SValue> {
  private _subscribe: SubscribeFunction;
  private _observers: Function[] = [];

  constructor(
    subscribeFn: SubscribeFunction = (nextFn: Function) => {
      this._observers.push(nextFn);
    },
  ) {
    this._subscribe = subscribeFn;
  }

  map = (projection: ProjectionFn<SValue>) => {
    return new MiniSubject<SValue>(nextFn => {
      this.subscribe((value: SValue) => {
        nextFn(projection(value));
      });
    });
  };

  filter = (predicate: PredicateFn<SValue>) => {
    return new MiniSubject<SValue>(nextFn => {
      this.subscribe((value: SValue) => {
        if (predicate(value)) {
          nextFn(value);
        }
      });
    });
  };

  debounceTime = (time: number) => {
    return new MiniSubject<SValue>(nextFn => {
      const dbFn = _debounce(nextFn, time);
      this.subscribe(dbFn);
    });
  };

  distinctUntilChange = (checker: DistinctCheckerFn<SValue> = value => value) => {
    return new MiniSubject<SValue>(nextFn => {
      const newNextFn = _onlyCallWhen(checker)(nextFn);
      this.subscribe(newNextFn);
    });
  };

  subscribe = (nextFn: NextFn<SValue>) => {
    this._subscribe(nextFn);
  };

  next = (value: SValue) => {
    this._observers.forEach(observer => observer(value));
  };
}
