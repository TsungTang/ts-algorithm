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

export default class BST {
  root: NodeType | null;
  constructor() {
    this.root = null;
  }

  public show() {
    return this;
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

  private findValueEqualNode(
    currNode: NodeType,
    value: number,
    parentNode?: NodeType,
    leafDir?: 'left' | 'right'
  ):
    | { currNode: NodeType; parentNode?: NodeType; leafDir?: 'left' | 'right' }
    | undefined {
    if (value === currNode.value) {
      return { currNode, parentNode, leafDir };
    } else if (value > currNode.value) {
      if (!currNode.right) return;
      return this.findValueEqualNode(currNode.right, value, currNode, 'right');
    } else if (value < currNode.value) {
      if (!currNode.left) return;
      return this.findValueEqualNode(currNode.left, value, currNode, 'left');
    }
  }
  public lookup(value: number) {
    if (!this.root) return;
    let currentNode = this.root;
    const findingResult = this.findValueEqualNode(currentNode, value);
    if (!findingResult) return;
    return findingResult.currNode;
  }
  private getMinNode(currentNode: TreeNode): TreeNode {
    if (!currentNode.left) return currentNode;
    return this.getMinNode(currentNode.left);
  }
}
