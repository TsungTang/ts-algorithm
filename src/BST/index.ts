import type { NodeType } from './tpye';

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

  remove(value: number) {
    if (!this.root) {
      return null;
    }
    let parentNode: NodeType | null = null;
    let currentNode: NodeType | null = this.root;

    while (currentNode) {
      if (value > currentNode.value) {
        // go right
        parentNode = currentNode;
        currentNode = currentNode.right;
      } else if (value < currentNode.value) {
        // go left
        parentNode = currentNode;
        currentNode = currentNode.left;
      } else {
        // found the same value
        // last child
        if (parentNode !== null && !currentNode.right && !currentNode.left) {
          if (currentNode.value > parentNode.value) {
            parentNode.right = null;
          } else {
            parentNode.left = null;
          }
          return this;
        }

        // no right child
        else if (!currentNode.right) {
          if (parentNode === null) {
            this.root = currentNode.left;
          } else {
            if (currentNode.value > parentNode.value) {
              parentNode.right = currentNode.left;
            } else {
              parentNode.left = currentNode.left;
            }
          }

          return this;
        } else {
          if (parentNode === null) {
            this.root = currentNode.right;
            return;
          }

          // no left child in the right child
          if (!currentNode.right.left) {
            if (currentNode.value > parentNode.value) {
              currentNode.right.left = currentNode.left;
              parentNode.right = currentNode.right;
            } else {
              currentNode.right.left = currentNode.left;
              parentNode.left = currentNode.right;
            }
          }
          // find the most left child in the right child
          else {
            let parentMostLeft = currentNode.right;
            const mostMinNode = this.getMinNode(currentNode.right.left);

            mostMinNode.right = currentNode.right;
            mostMinNode.left = currentNode.left;
            parentNode.right = mostMinNode;
            parentMostLeft.left = null;
          }
          return this;
        }
      }
    }

    return null;
  }
}
