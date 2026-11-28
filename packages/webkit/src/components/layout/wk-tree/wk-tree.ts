import { html, nothing, type TemplateResult } from "lit";
import { cssText } from "../../../styles/css.js";
import wkStyles from "../../../styles/components/wk-tree.css";
import { WkElement } from "../../../base/index.js";
import { defineElement } from "../../../registry/index.js";

export type WkTreeNode = { id: string; label: string; children?: WkTreeNode[] };

export class WkTree extends WkElement {
  static properties = {
    label: { type: String },
    nodes: { attribute: false },
    expanded: { attribute: false },
  };

  declare label: string;
  declare nodes: WkTreeNode[];
  declare expanded: string[];

  constructor() {
    super();
    this.label = "Tree";
    this.nodes = [];
    this.expanded = [];
  }

  static styles = [WkElement.styles, cssText(wkStyles)];

  private toggleNode(id: string): void {
    this.expanded = this.expanded.includes(id)
      ? this.expanded.filter((item) => item !== id)
      : [...this.expanded, id];
    this.dispatchEvent(new CustomEvent("wk-change", { detail: { expanded: [...this.expanded] }, bubbles: true, composed: true }));
  }

  private branch(node: WkTreeNode): TemplateResult {
    const open = this.expanded.includes(node.id);
    const hasChildren = Boolean(node.children?.length);
    return html`
      <li role="treeitem" aria-expanded=${hasChildren ? (open ? "true" : "false") : nothing}>
        <button type="button" @click=${() => hasChildren && this.toggleNode(node.id)}>${hasChildren ? (open ? "▾" : "▸") : "•"} ${node.label}</button>
        ${hasChildren && open ? html`<ul role="group">${node.children!.map((child) => this.branch(child))}</ul>` : null}
      </li>
    `;
  }

  render() {
    return html`<ul role="tree" aria-label=${this.label} part="tree">${this.nodes.map((node) => this.branch(node))}</ul>`;
  }
}

defineElement("wk-tree", WkTree);

declare global {
  interface HTMLElementTagNameMap {
    "wk-tree": WkTree;
  }
}
