import type { NodeType } from '../tpye';
export function traverse(node: NodeType) {
  const tree: NodeType = { value: node.value, left: null, right: null };
  tree.left = node.left === null ? null : traverse(node.left);
  tree.right = node.right === null ? null : traverse(node.right);
  return tree;
}
