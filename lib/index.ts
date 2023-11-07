export class HideValue {
  private static default: any = null;

  private static parseWithDefault(object: any): any {
    return Object.values(object).reduce((prev: any, curr: any, index: number) => {
      const key = Object.keys(object)[index];

      if (typeof curr === 'object' && !curr?.length) {
        return { ...prev, [key]: this.parseWithDefault(curr) };
      } else if (typeof curr === 'object' && !!curr?.length) {
        return {
          ...prev,
          [key]: curr.map((element: any) => this.parseWithDefault(element)),
        };
      }

      return { ...prev, [key]: this.default };
    }, {});
  }

  private static parseWithBoolean(object: any): any {
    return Object.values(object).reduce((prev: any, curr: any, index: number) => {
      const key = Object.keys(object)[index];

      if (typeof curr === 'object' && !curr?.length) {
        return { ...prev, [key]: this.parseWithBoolean(curr) };
      } else if (typeof curr === 'object' && !!curr?.length) {
        return {
          ...prev,
          [key]: curr.map((element: any) => this.parseWithBoolean(element)),
        };
      }

      return { ...prev, [key]: !!curr };
    }, {});
  }

  private static setDefault(value: string) {
    this.default = value;
  }

  static from<T = any>(object: T, options?: { default?: string; useBoolean?: boolean }): T {
    options?.default && HideValue.setDefault(options?.default);

    if (options?.useBoolean === true) {
      return HideValue.parseWithBoolean(object);
    }

    return HideValue.parseWithDefault(object);
  }
}
