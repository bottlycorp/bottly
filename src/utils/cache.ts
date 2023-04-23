export type Dialog = {
  userId: string;
  context: string;
  expiresAt: number;
}

export const dialogs: Dialog[] = [];

export const getDialog = (userId: string): Dialog | undefined => {
  return dialogs.find(dialog => dialog.userId === userId);
};

export const createDialog = (userId: string, context: string, expiresAt: number): void => {
  dialogs.push({
    userId,
    context,
    expiresAt
  });
};

export const deleteDialog = (userId: string): void => {
  dialogs.splice(dialogs.findIndex(dialog => dialog.userId === userId), 1);
};