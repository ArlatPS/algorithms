// Binary Search Tree
class Node {
  // node has value and 2 children
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor() {
    this.root = new Node(null);
  }
  add(value) {
    const newNode = new Node(value);
    let currNode = this.root;
    while (true) {
      // if both left and right empty - add to right or left
      if (currNode.left == null && currNode.right == null) {
        if (currNode.value > value) {
          currNode.left = newNode;
        } else {
          currNode.right = newNode;
        }
        return value;
      }
      // if only left empty - add if its smaller
      if (currNode.left == null) {
        if (currNode.value > value) {
          currNode.left = newNode;
          return value;
        }
      }
      // if only right empty - add if its bigger
      if (currNode.right == null) {
        if (currNode.value < value) {
          currNode.right = newNode;
          return value;
        }
      }
      // if both right and left occupied or cant be added to one empty move to next node
      if (currNode.value > value) {
        currNode = currNode.left;
      } else {
        currNode = currNode.right;
      }
    }
  }
  // getting
  get(value) {
    let currNode = this.root;
    // traverse node by node
    while (true) {
      if (value == currNode.value) {
        return value;
      } else if (value < currNode.value) {
        currNode = currNode.left;
      } else {
        currNode = currNode.right;
      }
    }
  }
}

const tree = new Tree();
tree.add(5);
tree.add(6);
tree.add(3);
tree.add(4);
tree.add(10);
tree.add(12);
tree.add(1);
tree.add(98);

describe("binary tree", () => {
  test("get #1", () => {
    expect(tree.get(10)).toBe(10);
  });
  test("get #2", () => {
    expect(tree.get(98)).toBe(98);
  });

  test("get #3", () => {
    expect(tree.get(6)).toBe(6);
  });
});
