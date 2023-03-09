class LinkedList {
  // length, start and bottom tracked
  constructor() {
    this.length = 0;
    this.head = null;
    this.tail = null;
  }

  // pushing
  push(value) {
    // new Node and increment length
    const node = new Node(value);
    this.length++;
    // if first element both head and tail point at it
    if (this.head == null) {
      this.head = node;
      this.tail = node;
      // previous tail points to new node and new tail is new node
    } else {
      this.tail.next = node;
      this.tail = node;
    }
  }

  // getting - iteration through pointers
  get(pos) {
    let currNode = this.head;
    for (let i = 0; i < pos; i++) {
      if (currNode == undefined) {
        return undefined;
      }
      currNode = currNode.next;
    }
    return currNode.value;
  }

  //popping
  pop() {
    const valueToReturn = this.tail.value;
    // loop to get penultimate node
    let currNode = this.head;
    for (let i = 0; i < this.length - 2; i++) {
      if (currNode == undefined) {
        return undefined;
      }
      currNode = currNode.next;
    }
    // assign its value to object at tail and make it point to nothing
    this.tail.value = currNode.value;
    this.tail.next = null;
    this.length--;
    return valueToReturn;
  }

  // deleting
  delete(pos) {
    // check if in bounds
    if (pos < this.length) {
      // get to the node before pos by looping through nodes
      let currNode = this.head;
      for (let i = 0; i < pos - 1; i++) {
        currNode = currNode.next;
      }
      //reassign pointers to omit the one being deleted
      const prevNode = currNode;
      const deletedNode = currNode.next;
      const nextNode = deletedNode.next;
      prevNode.next = nextNode;
      this.length--;
      return deletedNode.value;
    } else {
      return null;
    }
  }
}

class Node {
  // nodes with value and pointer to next
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

const list = new LinkedList();
list.push(10);
list.push(20);
list.push(30);
list.push(40);
list.push(50);

describe("linked list", () => {
  test("deleting", () => {
    expect(list.delete(2)).toBe(30);
  });
  test("getting", () => {
    expect(list.get(2)).toBe(40);
  });
  test("popping", () => {
    expect(list.pop()).toBe(50);
  });
});
