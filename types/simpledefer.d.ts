export function defer(): SimpleDeferred;
export type TypeFnIsSameObjectAs = Function;
/**
 * This type describes main object of this module.
 */
export type SimpleDeferred = {
    isPending: () => boolean;
    isSucceed: () => boolean;
    isFailed: () => boolean;
    isSameObjectAs: TypeFnIsSameObjectAs;
    promise: Promise<any>;
    resolve: (any: any) => void;
    reject: (any: any) => void;
};
/**
 * This callback type notify about the action and it's status/result.
 */
export type BooleanNotifierCallback = (result: boolean) => void;
//# sourceMappingURL=simpledefer.d.ts.map