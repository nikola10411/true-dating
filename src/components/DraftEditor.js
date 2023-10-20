import React, { useCallback, useState, memo } from 'react';
import { Box } from '@mui/material';
import dynamic from 'next/dynamic';
const Editor = dynamic(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  { ssr: false }
)
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { convertToRaw } from 'draft-js';

const toolbar = {
  options: [
    'inline',
    'blockType',
    'fontSize',
    'list',
    'textAlign',
    'colorPicker',
    'link',
    // 'image',
    'history',
  ],
}


function DraftEditor({ description, onChange, readOnly, toolbarHidden, placeholder }) {
  const [state, setState] = useState(null);

  const handleBlur = useCallback(() => {
    if (state && onChange) {
      onChange(JSON.stringify(convertToRaw(state.getCurrentContent())));
    }
  }, [onChange, state]);

  return (
    <Box sx={(theme) => ({
      '& .editorWrapper': {
        '& .public-DraftStyleDefault-ltr': {
          textAlign: 'inherit !important',
        },
      },
      '& .editorToolbar': {
        borderRadius: theme.shape.borderRadius / 4,
        border: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.secondary.main,
      },
      '& .editorContent': {
        border: readOnly ? 'none' : `1px solid ${theme.palette.divider}`,
        borderRadius: theme.shape.borderRadius / 4,
        overflow: readOnly ? 'hidden' : 'auto',
        '&:hover': {
          border: readOnly ? 'none' : `1px solid ${theme.palette.secondary.main}`,
        },
        '& a': {
          color: readOnly ? theme.palette.primary.main : 'default',
        },
      }
    })}>
      <Editor
        editorState={state || description}
        wrapperClassName='editorWrapper'
        toolbarClassName='editorToolbar'
        editorClassName='editorContent'
        onEditorStateChange={setState}
        toolbar={toolbar}
        onBlur={handleBlur}
        readOnly={readOnly}
        toolbarHidden={toolbarHidden}
        placeholder={placeholder}
      />
    </Box>
  );
}

export default memo(DraftEditor)