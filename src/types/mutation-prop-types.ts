export type MutationProps = {
  onSuccess(_val: unknown): void;
  onError?: (_val: string, _err?: unknown) => void;
};
