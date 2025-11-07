import { HeadingNode, QuoteNode } from "@lexical/rich-text"
import {
  Klass,
  LexicalNode,
  LexicalNodeReplacement,
  ParagraphNode,
  TextNode,
} from "lexical"
import { ListItemNode, ListNode } from '@lexical/list';
import { AutoLinkNode, LinkNode } from '@lexical/link';
import { TweetNode } from '@/components/editor/nodes/embeds/tweet-node';
import { YouTubeNode } from '@/components/editor/nodes/embeds/youtube-node';
import { EmojiNode } from '@/components/editor/nodes/emoji-node';
import { HashtagNode } from '@lexical/hashtag';
import { ImageNode } from '@/components/editor/nodes/image-node';
import { LayoutContainerNode } from '@/components/editor/nodes/layout-container-node';
import { LayoutItemNode } from '@/components/editor/nodes/layout-item-node';
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table';

export const nodes: ReadonlyArray<Klass<LexicalNode> | LexicalNodeReplacement> =
  [
    HeadingNode,
    ParagraphNode,
    TextNode,
    QuoteNode,
    ListNode,
    ListItemNode,
    LinkNode,
    AutoLinkNode,
    TweetNode,
    YouTubeNode,
    EmojiNode,
    HashtagNode,
    ImageNode,
    LayoutContainerNode,
    LayoutItemNode,
    TableNode,
    TableRowNode,
    TableCellNode,
  ]
