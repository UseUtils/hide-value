export class HideValue {
  private default: any = null;

  private parseWithDefault(object: any): any {
    return Object.values(object).reduce(
      (prev: any, curr: any, index: number) => {
        const key = Object.keys(object)[index];

        if (typeof curr === "object" && !curr?.length) {
          return { ...prev, [key]: this.parseWithDefault(curr) };
        } else if (typeof curr === "object" && !!curr?.length) {
          return {
            ...prev,
            [key]: curr.map((element: any) => this.parseWithDefault(element)),
          };
        }

        return { ...prev, [key]: this.default };
      },
      {}
    );
  }

  private parseWithBoolean(object: any): any {
    return Object.values(object).reduce(
      (prev: any, curr: any, index: number) => {
        const key = Object.keys(object)[index];

        if (typeof curr === "object" && !curr?.length) {
          return { ...prev, [key]: this.parseWithBoolean(curr) };
        } else if (typeof curr === "object" && !!curr?.length) {
          return {
            ...prev,
            [key]: curr.map((element: any) => this.parseWithBoolean(element)),
          };
        }

        return { ...prev, [key]: !!curr };
      },
      {}
    );
  }

  private setDefault(value: string) {
    this.default = value;
  }

  static from(
    object: any,
    options?: { default?: string; useBoolean?: boolean }
  ) {
    const hideValue = new HideValue();
    options?.default && hideValue.setDefault(options?.default);

    if (options?.useBoolean === true) {
      return hideValue.parseWithBoolean(object);
    }

    return hideValue.parseWithDefault(object);
  }
}
