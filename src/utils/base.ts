export const copyToClipboard = (data: string) => {
  navigator.clipboard.writeText(data);
};

export const converObjectIdToString = (objectId: any) => JSON.parse(JSON.stringify(objectId));

export interface KeyEventProps {
  key: string;
  control?: boolean;
  shift?: boolean;
  action?: () => void;
  callbacks?: CallableFunction[];
}

export const getKeyEventActions = (props: KeyEventProps[]) => {
  return (e: KeyboardEvent) => {
    props.forEach((_) => {
      if (e.key.toLowerCase() === _.key.toLowerCase()) {
        if (_?.control && _.control === true && !(e.metaKey || e.ctrlKey)) return;
        if (_?.shift && _.shift === true && !e.shiftKey) return;

        e.preventDefault();
        _?.action && _.action();
        _?.callbacks && _.callbacks.forEach((callback) => callback());
      }
    });
  };
};
