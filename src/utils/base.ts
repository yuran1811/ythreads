export const copyToClipboard = (data: string) => navigator.clipboard.writeText(data);

export const converObjectIdToString = (objectId: any) => JSON.parse(JSON.stringify(objectId));

export const isBase64Image = (imageData: string) =>
  /^data:image\/(png|jpe?g|gif|webp);base64,/.test(imageData);

export const getParamString = <T extends Record<string, any> = Record<string, any>>(params?: T) => {
  const paramString = !params
    ? ''
    : Object.keys(params).reduce((prev, cur, idx) => {
        if (params?.[cur] !== null && params[cur] !== undefined) {
          if (idx === 0) {
            prev = '?';
          }

          prev += (idx === 0 ? '' : '&') + cur + '=' + params[cur];
        }

        return prev;
      }, '');

  return paramString;
};

interface KeyEventProps {
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

export const generateVCardToDownload = ({
  name,
  phone,
  email,
}: Record<'name' | 'phone' | 'email', string>) => {
  const vCardData = `BEGIN:VCARD
    VERSION:4.0
    FN:${name}
    N:${name}
    TEL;TYPE=work:${phone}
    EMAIL;TYPE=work:${email}
  END:VCARD`.replace(/ /gm, '');

  const blob = new Blob([vCardData], { type: 'text/vcard' });
  const url = URL.createObjectURL(blob);

  const newLink = document.createElement('a');
  Object.assign(newLink, {
    download: name + '.vcf',
    textContent: name,
    href: url,
  });

  newLink.click();
};
