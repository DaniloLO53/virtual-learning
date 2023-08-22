import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import OnChangePlugin from '@lexical/react/LexicalOnChangePlugin'
import { EditorState } from 'lexical'
import * as React from 'react'

export default function AddContentPlugin() {
  const [editor] = useLexicalComposerContext()
  const [isFirstRender, setIsFirstRender] = React.useState(true)
  const serializedEditorState = '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}';

  console.log('OI')

  React.useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false)

      if (serializedEditorState) {
        const initialEditorState = editor.parseEditorState(serializedEditorState)
        editor.setEditorState(initialEditorState)
      }
    }
  }, [isFirstRender, serializedEditorState, editor])

  // const onChange = React.useCallback(
  //   (editorState) => {
  //     setSerializedEditorState(JSON.stringify(editorState.toJSON()))
  //   },
  //   [setSerializedEditorState]
  // )

  // TODO: add ignoreSelectionChange
  // return <OnChangePlugin onChange={onChange} />
}