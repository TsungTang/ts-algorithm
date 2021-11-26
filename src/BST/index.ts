interface NodeType {
  value: number;
  left: NodeType | null;
  right: NodeType | null;
}

class TreeNode {
  value: number;
  left: NodeType | null;
  right: NodeType | null;
  constructor(value: number) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}
/**10
  9
6  12

   9
 10 12
6
*/

export default class BST {
  root: NodeType | null;
  constructor() {
    this.root = null;
  }
  public insert(value: number) {
    if (this.root === null) {
      this.root = new TreeNode(value);
      return this;
    }
    let currentNode = this.root;
    while (true) {
      if (value > currentNode.value) {
        if (!currentNode.right) {
          currentNode.right = new TreeNode(value);
          return this;
        }
        currentNode = currentNode.right;
      } else if (value < currentNode.value) {
        if (!currentNode.left) {
          currentNode.left = new TreeNode(value);
          return this;
        }
        currentNode = currentNode.left;
      }
    }
  }
  public lookup(value: number) {
    if (!this.root) return;
    let currentNode = this.root;
    const checkNode = (
      currNode: NodeType,
      value: number
    ): NodeType | undefined => {
      if (value === currNode.value) {
        return currNode;
      } else if (value > currNode.value) {
        if (!currNode.right) return;
        return checkNode(currNode.right, value);
      } else if (value < currNode.value) {
        if (!currNode.left) return;
        return checkNode(currNode.left, value);
      }
    };
    const result = checkNode(currentNode, value);
    return result;
  }
}
