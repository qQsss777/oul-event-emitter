/** Callback type fuction with Generic */
type CallbackType = <Type>(value?: Type) => void;

interface EventListenerProperties {
  /** callback function */
  callback: CallbackType;
  /** identify if listener must be execute once */
  once: boolean;
}

interface EventListenerManager {
  remove: () => void;
}

interface EventEmitterProperties {
  /** Event name and callback to execute */
  on: (eventName: string, callback: CallbackType) => EventListenerManager;
  /** Event name and callback to execute once time*/
  once: (eventName: string, callback: CallbackType) => EventListenerManager;
  /** Emit event with value (optionnal) */
  emit: <Type>(eventName: string, value?: Type) => void;
}

abstract class EventEmitter implements EventEmitterProperties {
  private eventsList: Record<string, EventListenerProperties[]> = {};

  /**
   * If event name exists, execute callback
   * @param eventName event name
   * @param value value
   */
  public emit<Type>(eventName: string, value: Type): void {
    if (this.eventsList[eventName]) {
      const newEventList: EventListenerProperties[] = [];
      this.eventsList[eventName].forEach((lst) => {
        lst.callback(value);
        if (!lst.once) {
          newEventList.push(lst);
        }
      });
      this.eventsList[eventName] = newEventList;
    }
  }

  /**
   * Create an entry to internal events list
   * @param eventName event name
   * @param callback callback for listener
   * Specify callback is executed all time
   */
  public on(eventName: string, callback: CallbackType): EventListenerManager {
    const internalListener = {
      callback,
      once: false,
    };
    return this.addListener(eventName, internalListener);
  }

  /**
   * Create an entry to internal events list
   * @param eventName event name
   * @param callback callback for listener
   * Specify callback is executed once then it is removed
   */
  public once(eventName: string, callback: CallbackType): EventListenerManager {
    const internalListener = {
      callback,
      once: true,
    };
    return this.addListener(eventName, internalListener);
  }

  /**
   * Add event listener to the internal list
   * @param eventName event name
   * @param listener listener object
   */
  private addListener(eventName: string, listener: EventListenerProperties): EventListenerManager {
    if (this.eventsList[eventName]) {
      this.eventsList[eventName].push(listener);
    } else {
      this.eventsList[eventName] = [listener];
    }
    const removeListener = () => {
      this.eventsList[eventName] = this.eventsList[eventName].filter((lst) => lst.callback !== listener.callback);
    };
    return {
      remove: removeListener,
    };
  }
}

export default EventEmitter;
