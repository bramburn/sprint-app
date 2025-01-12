declare function acquireVsCodeApi<StateType = unknown>(): WebviewApi<StateType>;
interface WebviewApi<StateType> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    postMessage(message: any): void;
    getState(): StateType | undefined;
    setState<T extends StateType | undefined>(newState: T): T;
}
