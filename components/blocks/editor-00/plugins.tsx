import { useState } from "react"
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary"
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin"

import { ContentEditable } from "@/components/editor/editor-ui/content-editable"
import { ActionsPlugin } from '@/components/editor/plugins/actions/actions-plugin';
import { CounterCharacterPlugin } from '@/components/editor/plugins/actions/counter-character-plugin';
import { ClearEditorActionPlugin } from '@/components/editor/plugins/actions/clear-editor-plugin';
import { ClearEditorPlugin } from '@lexical/react/LexicalClearEditorPlugin';
import { EditModeTogglePlugin } from '@/components/editor/plugins/actions/edit-mode-toggle-plugin';
import { ToolbarPlugin } from '@/components/editor/plugins/toolbar/toolbar-plugin';
import { BlockFormatDropDown } from '@/components/editor/plugins/toolbar/block-format-toolbar-plugin';
import { FormatParagraph } from '@/components/editor/plugins/toolbar/block-format/format-paragraph';
import { FormatHeading } from '@/components/editor/plugins/toolbar/block-format/format-heading';
import { FormatNumberedList } from '@/components/editor/plugins/toolbar/block-format/format-numbered-list';
import { FormatBulletedList } from '@/components/editor/plugins/toolbar/block-format/format-bulleted-list';
import { FormatCheckList } from '@/components/editor/plugins/toolbar/block-format/format-check-list';
import { FormatQuote } from '@/components/editor/plugins/toolbar/block-format/format-quote';
import { ClearFormattingToolbarPlugin } from '@/components/editor/plugins/toolbar/clear-formatting-toolbar-plugin';
import { ElementFormatToolbarPlugin } from '@/components/editor/plugins/toolbar/element-format-toolbar-plugin';
import { FontColorToolbarPlugin } from '@/components/editor/plugins/toolbar/font-color-toolbar-plugin';
import { FontBackgroundToolbarPlugin } from '@/components/editor/plugins/toolbar/font-background-toolbar-plugin';
import { FontFormatToolbarPlugin } from '@/components/editor/plugins/toolbar/font-format-toolbar-plugin';
import { FontSizeToolbarPlugin } from '@/components/editor/plugins/toolbar/font-size-toolbar-plugin';
import { HistoryToolbarPlugin } from '@/components/editor/plugins/toolbar/history-toolbar-plugin';
import { LinkToolbarPlugin } from '@/components/editor/plugins/toolbar/link-toolbar-plugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { CheckListPlugin } from '@lexical/react/LexicalCheckListPlugin';
import { TabIndentationPlugin } from '@lexical/react/LexicalTabIndentationPlugin';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { ClickableLinkPlugin } from '@lexical/react/LexicalClickableLinkPlugin';
import { AutoLinkPlugin } from '@/components/editor/plugins/auto-link-plugin';
import { LinkPlugin } from '@/components/editor/plugins/link-plugin';
import { FloatingLinkEditorPlugin } from '@/components/editor/plugins/floating-link-editor-plugin';
import { BlockInsertPlugin } from '@/components/editor/plugins/toolbar/block-insert-plugin';
import { InsertEmbeds } from '@/components/editor/plugins/toolbar/block-insert/insert-embeds';
import { AutoEmbedPlugin } from '@/components/editor/plugins/embeds/auto-embed-plugin';
import { TwitterPlugin } from '@/components/editor/plugins/embeds/twitter-plugin';
import { YouTubePlugin } from '@/components/editor/plugins/embeds/youtube-plugin';
import { ComponentPickerMenuPlugin } from '@/components/editor/plugins/component-picker-menu-plugin';
import { ParagraphPickerPlugin } from '@/components/editor/plugins/picker/paragraph-picker-plugin';
import { HeadingPickerPlugin } from '@/components/editor/plugins/picker/heading-picker-plugin';
import { QuotePickerPlugin } from '@/components/editor/plugins/picker/quote-picker-plugin';
import { AlignmentPickerPlugin } from '@/components/editor/plugins/picker/alignment-picker-plugin';
import { ContextMenuPlugin } from '@/components/editor/plugins/context-menu-plugin';
import { DraggableBlockPlugin } from '@/components/editor/plugins/draggable-block-plugin';
import { DragDropPastePlugin } from '@/components/editor/plugins/drag-drop-paste-plugin';
import { EmojisPlugin } from '@/components/editor/plugins/emojis-plugin';
import { EmojiPickerPlugin } from '@/components/editor/plugins/emoji-picker-plugin';
import { FloatingTextFormatToolbarPlugin } from '@/components/editor/plugins/floating-text-format-plugin';
import { HashtagPlugin } from '@lexical/react/LexicalHashtagPlugin';
import { ImagesPlugin } from '@/components/editor/plugins/images-plugin';
import { InsertColumnsLayout } from '@/components/editor/plugins/toolbar/block-insert/insert-columns-layout';
import { LayoutPlugin } from '@/components/editor/plugins/layout-plugin';
import { InsertTable } from '@/components/editor/plugins/toolbar/block-insert/insert-table';
import { TablePlugin } from '@lexical/react/LexicalTablePlugin';

const placeholder = "Start typing...";

export function Plugins() {
  const [floatingAnchorElem, setFloatingAnchorElem] =
    useState<HTMLDivElement | null>(null)

  const [isLinkEditMode, setIsLinkEditMode] = useState<boolean>(false)

  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem)
    }
  }

  return (
    <div className="relative">
      {/* toolbar plugins */}
      <ToolbarPlugin>
        {({ blockType }) => (
          <div className="vertical-align-middle sticky top-0 z-10 flex gap-2 overflow-auto border-b p-1">
            <BlockFormatDropDown>
              <FormatParagraph />
              <FormatHeading levels={["h1", "h2", "h3"]} />
              <FormatNumberedList />
              <FormatBulletedList />
              <FormatCheckList />
              <FormatQuote />
            </BlockFormatDropDown>
            <ElementFormatToolbarPlugin />
            <FontColorToolbarPlugin />
            <FontBackgroundToolbarPlugin />
            <FontFormatToolbarPlugin />
            <FontSizeToolbarPlugin />
            <ClearFormattingToolbarPlugin />
            <HistoryToolbarPlugin />
            <LinkToolbarPlugin setIsLinkEditMode={setIsLinkEditMode} />
            <BlockInsertPlugin>
              <InsertColumnsLayout />
              <InsertEmbeds />
              <InsertTable />
            </BlockInsertPlugin>
          </div>
        )}
      </ToolbarPlugin>

      <div className="relative">
        <RichTextPlugin
          contentEditable={
            <div className="">
              <div className="" ref={onRef}>
                <ContentEditable
                  placeholder={placeholder}
                  className="ContentEditable__root relative block h-72 min-h-72 min-h-full overflow-auto px-8 py-4 focus:outline-none"
                />
              </div>
            </div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <ListPlugin />
        <CheckListPlugin />
        <TabIndentationPlugin />
        <HistoryPlugin />
        <ClickableLinkPlugin />
        <AutoLinkPlugin />
        <LinkPlugin />
        <FloatingLinkEditorPlugin
          anchorElem={floatingAnchorElem}
          isLinkEditMode={isLinkEditMode}
          setIsLinkEditMode={setIsLinkEditMode}
        />
        <ComponentPickerMenuPlugin
          baseOptions={[
            ParagraphPickerPlugin(),
            HeadingPickerPlugin({ n: 1 }),
            HeadingPickerPlugin({ n: 2 }),
            HeadingPickerPlugin({ n: 3 }),
            QuotePickerPlugin(),
            AlignmentPickerPlugin({ alignment: "left" }),
            AlignmentPickerPlugin({ alignment: "right" }),
            AlignmentPickerPlugin({ alignment: "center" }),
            AlignmentPickerPlugin({ alignment: "justify" }),
          ]}
        />
        <ContextMenuPlugin />
        <DraggableBlockPlugin anchorElem={floatingAnchorElem} />
        <DragDropPastePlugin />
        <EmojisPlugin />
        <EmojiPickerPlugin />
        <FloatingTextFormatToolbarPlugin
          anchorElem={floatingAnchorElem}
          setIsLinkEditMode={setIsLinkEditMode}
        />
        <HashtagPlugin />
        <ImagesPlugin />
        <LayoutPlugin />
        <TablePlugin />
        {/* editor plugins */}
      </div>
      {/* actions plugins */}
      <ActionsPlugin>
        <div className="clear-both flex items-center justify-between gap-2 overflow-auto border-t p-1">
          <div className="flex flex-1 justify-start">
            {/* left side action buttons */}
          </div>
          <div>
            <CounterCharacterPlugin charset="UTF-16" />
            {/* center action buttons */}
          </div>
          <div className="flex flex-1 justify-end">
            {/* right side action buttons */}
            <>
              <ClearEditorActionPlugin />
              <ClearEditorPlugin />
            </>
            <EditModeTogglePlugin />
            <AutoEmbedPlugin />
            <TwitterPlugin />
            <YouTubePlugin />
          </div>
        </div>
      </ActionsPlugin>
    </div>
  )
}
