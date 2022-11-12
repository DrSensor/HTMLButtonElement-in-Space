declare namespace JSX {
  interface IntrinsicAttributes<T = Element> {
    /** assign element to variable */
    let?: Ref<T>;
  }
  interface Ref<T> {
    do?: T;
  }
  interface State<T> {
    val: T;
  }
}

declare namespace NodeJS {
  //@ts-ignore reserved for Environment Variable
  interface ProcessEnv {}
}

declare module "*" {
  const url: string;
  export default url;
}
