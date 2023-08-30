'use client'

import "../../lib/lexical/styles.css";
import ExampleTheme from "./themes/ExampleTheme";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import TreeViewPlugin from "./plugins/TreeViewPlugin";
import ToolbarPlugin from "./plugins/ToolbarPlugin";
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
import HtmlPlugin from "./plugins/HtmlPlugin";
import { useEffect } from "react";
import { fetchData } from "@/services/fetchData";

function Placeholder() {
  return <div className="editor-placeholder">Enter some rich text...</div>;
}

interface EditorProps {
  content?: HTMLElement;
  readOnly?: boolean
}

export default function Editor({ content, readOnly }: EditorProps) {
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
    editable: !readOnly,
  }

  return (
    <LexicalComposer
      initialConfig={editorConfig}
    >
      <div className="editor-container">
        { !readOnly && <ToolbarPlugin />}
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
          <HtmlPlugin
            onHtmlChanged={(html: any) => console.log('onChanged', html)}
            initialHtml={`${content?.innerHTML}`}
          />
          <HistoryPlugin />
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
