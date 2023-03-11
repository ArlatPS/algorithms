class Tree {
  constructor() {
    this.root = null;
  }

  add(value) {
    if (!this.root) {
      this.root = new Node(value);
    } else {
      this.root.add(value);
    }
  }
}

class Node {
  constructor(value) {
    this.value = value;
    this.right = null;
    this.left = null;
    this.height = 1;
  }
  add(value) {
    // if smaller go left
    if (value < this.value) {
      // if there is a left child, call add again, if not create there a new node
      if (this.left) {
        this.left.add(value);
      } else {
        this.left = new Node(value);
      }

      // if no right child or right has smaller height, add one to height
      if (!this.right || this.right.height < this.left.height) {
        this.height = this.left.height + 1;
      }

      // if bigger go right and exactly the same logic
    } else {
      if (this.right) {
        this.right.add(value);
      } else {
        this.right = new Node(value);
      }
      if (!this.left || this.right.height > this.left.height) {
        this.height = this.right.height + 1;
      }
    }
    // call balance after adding
    this.balance();
  }

  // balancing
  balance() {
    // get heights of child nodes - if no child set 0
    const rightHeight = this.right ? this.right.height : 0;
    const leftHeight = this.left ? this.left.height : 0;

    // if left is too tall
    if (leftHeight > rightHeight + 1) {
      // calculate heights of child nodes of left node - if no child set to 0
      const leftRightHeight = this.left.right ? this.left.right.height : 0;
      const leftLeftHeight = this.left.left ? this.left.left.height : 0;

      // if right child taller then left perform double rotation first RR then LL
      if (leftRightHeight > leftLeftHeight) {
        this.left.rotateRR();
      }
      // in both cases (double or single rotation) end with LL rotation
      this.rotateLL();

      //exactly the same logic if right is to tall
    } else if (rightHeight > leftHeight + 1) {
      const rightRightHeight = this.right.right ? this.right.right.height : 0;
      const rightLeftHeight = this.right.left ? this.right.left.height : 0;

      if (rightLeftHeight > rightRightHeight) {
        this.right.rotateLL();
      }

      this.rotateRR();
    }
    // if balanced do nothing
  }

  // right rotation
  rotateRR() {
    const valueBefore = this.value;
    const leftBefore = this.left;
    this.value = this.right.value;
    this.left = this.right;
    this.right = this.right.right;
    this.left.right = this.left.left;
    this.left.left = leftBefore;
    this.left.value = valueBefore;
    this.left.updateHeightInNewLocation();
    this.updateHeightInNewLocation();
  }
  // left rotation
  rotateLL() {
    const valueBefore = this.value;
    const rightBefore = this.right;
    this.value = this.left.value;
    this.right = this.left;
    this.left = this.left.left;
    this.right.left = this.right.right;
    this.right.right = rightBefore;
    this.right.value = valueBefore;
    this.right.updateHeightInNewLocation();
    this.updateHeightInNewLocation();
  }
  // updating heights after rotating
  updateHeightInNewLocation() {
    if (!this.right && !this.left) {
      this.height = 1;
    } else if (
      !this.right ||
      (this.left && this.right.height < this.left.height)
    ) {
      this.height = this.left.height + 1;
    } else {
      //if (!this.left || this.right.height > this.left.height)
      this.height = this.right.height + 1;
    }
  }
}

const correctAnswer = {
  root: {
    value: 8,
    right: {
      value: 10,
      right: { value: 11, right: null, left: null, height: 1 },
      left: { value: 9, right: null, left: null, height: 1 },
      height: 2,
    },
    left: {
      value: 6,
      right: { value: 7, right: null, left: null, height: 1 },
      left: { value: 5, right: null, left: null, height: 1 },
      height: 2,
    },
    height: 3,
  },
};

test("avl tree", () => {
  const tree = new Tree();
  tree.add(5);
  tree.add(6);
  tree.add(7);
  tree.add(8);
  tree.add(9);
  tree.add(10);
  tree.add(11);
  expect(tree.root.right.value).toBe(10);
  expect(tree.root.right.height).toBe(2);
});
