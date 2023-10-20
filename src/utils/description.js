import { EditorState, convertFromRaw } from 'draft-js';

export const getDescription = (description) => {
  let descriptionData = null;
  try {
    descriptionData = description
      ? EditorState.createWithContent(convertFromRaw(JSON.parse(description)))
      : EditorState.createEmpty();
  } catch (error) {
    descriptionData = EditorState.createEmpty();
  }

  return descriptionData;
};
