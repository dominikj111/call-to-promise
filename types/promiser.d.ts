export function id(id: string): SimpleDeferred;
export function successfn(id: string): PromiseResolutionFn;
export function failfn(id: string): PromiseResolutionFn;
export function when(id: string): Promise<any>;
export function build(): {
    id: ((arg0: string) => SimpleDeferred);
    successfn: ((arg0: string) => PromiseResolutionFn);
    failfn: ((arg0: string) => PromiseResolutionFn);
    when: ((arg0: string) => Promise<any>);
};
export type SimpleDeferred = import('./simpledefer').SimpleDeferred;
export type Collection = {
    [x: string]: SimpleDeferred;
};
export type PromiseResolutionFn = Function;
//# sourceMappingURL=promiser.d.ts.map