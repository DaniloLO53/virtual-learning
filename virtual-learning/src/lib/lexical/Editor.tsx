'use client'

import "../../lib/lexical/styles.css";
import ExampleTheme from "./themes/ExampleTheme";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin, HistoryState } from "@lexical/react/LexicalHistoryPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import TreeViewPlugin from "./plugins/TreeViewPlugin";
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import AddContentPlugin from "./plugins/AddContentPlugin"
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { TRANSFORMERS } from "@lexical/markdown";

import ListMaxIndentLevelPlugin from "./plugins/ListMaxIndentLevelPlugin";
import CodeHighlightPlugin from "./plugins/CodeHighlightPlugin";
import AutoLinkPlugin from "./plugins/AutoLinkPlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $createTextNode, $getRoot, $insertNodes, $isDecoratorNode, $isElementNode, EditorState } from "lexical";
import {$generateNodesFromDOM} from '@lexical/html';
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";

function Placeholder() {
  return <div className="editor-placeholder">Enter some rich text...</div>;
}

const onChange = (editorState: EditorState) => {
  editorState.read(() => {
    const json = editorState.toJSON();
    console.log('STRINGUIFADO', JSON.stringify(json));
  })
}


interface EditorProps {
  content?: HTMLElement;
}

export default function Editor({ content }: EditorProps) {
  console.log('CONTENT', content)
  const EMPTY_CONTENT =
  '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}';

  const editorConfig = {
    namespace: 'teste',
    // The editor theme
    theme: ExampleTheme,
    // Handling of errors during update
    onError(error: any) {
      throw error;
    },
    // Any custom nodes go here
    nodes: [
      HeadingNode,
      ListNode,
      ListItemNode,
      QuoteNode,
      CodeNode,
      CodeHighlightNode,
      TableNode,
      TableCellNode,
      TableRowNode,
      AutoLinkNode,
      LinkNode
    ],
    editorState: (editor: any) => {
      editor.update(() => {
        const parser = new DOMParser();
        const dom = parser.parseFromString(JSON.stringify(content), "text/html");
        const nodes = $generateNodesFromDOM(editor, dom)
        const root = $getRoot()
      //   nodes.forEach((node, i) => {
	    //   // if ($isElementNode(node) || $isDecoratorNode(node)) {
      //   // }
      // })
        $insertNodes(nodes);
    });

  return (
    <LexicalComposer
      initialConfig={editorConfig}
    >
      <div className="editor-container">
        <ToolbarPlugin />
        <div className="editor-inner">
          <RichTextPlugin
            contentEditable={
              <ContentEditable
                className="editor-input"
                id="editor-input"
              />
            }
            placeholder={<Placeholder />}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <OnChangePlugin onChange={onChange}/>
          {/* <TreeViewPlugin /> */}
          <AutoFocusPlugin />
          <CodeHighlightPlugin />
          <ListPlugin />
          <LinkPlugin />
          <AutoLinkPlugin />
          <ListMaxIndentLevelPlugin maxDepth={7} />
          <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
        </div>
      </div>
    </LexicalComposer>
  );
}
