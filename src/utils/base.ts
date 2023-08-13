export const copyToClipboard = (data: string) => {
  navigator.clipboard.writeText(data);
};

export const converObjectIdToString = (objectId: any) => JSON.parse(JSON.stringify(objectId));
