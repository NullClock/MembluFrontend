class Logger {
  constructor(name, color) {
    this.name = name;
    this.color = color;
  }

  log(message) {
    console.log(`%c${this.name}`, `color: ${this.color}; background: black; font-weight: 700; border-radius: 25px; padding-left: 3px; padding-right: 3px; padding-top: 2px; padding-bottom: 2px;`, `${message}`);
  }

  warn(message) {
    console.warn(`%c${this.name}`, `color: ${this.color}; background: black; font-weight: 700; border-radius: 25px; padding-left: 3px; padding-right: 3px; padding-top: 2px; padding-bottom: 2px;`, `${message}`);
  }

  error(message) {
    console.error(`%c${this.name}`, `color: ${this.color}; background: black; font-weight: 700; border-radius: 25px; padding-left: 3px; padding-right: 3px; padding-top: 2px; padding-bottom: 2px;`, `${message}`);
  }

  info(message) {
    console.info(`%c${this.name}`, `color: ${this.color}; background: black; font-weight: 700; border-radius: 25px; padding-left: 3px; padding-right: 3px; padding-top: 2px; padding-bottom: 2px;`, `${message}`);
  }

  debug(message) {
    console.debug(`%c${this.name}`, `color: ${this.color}; background: black; font-weight: 700; border-radius: 25px; padding-left: 3px; padding-right: 3px; padding-top: 2px; padding-bottom: 2px;`, `${message}`);
  }

  trace(message) {
    console.trace(`%c${this.name}`, `color: ${this.color}; background: black; font-weight: 700; border-radius: 25px; padding-left: 3px; padding-right: 3px; padding-top: 2px; padding-bottom: 2px;`, `${message}`);
  }

  assert(condition, message) {
    if (!condition) {
      console.assert(condition, message);
    }
  }

  clear() {
    console.clear();
  }
}