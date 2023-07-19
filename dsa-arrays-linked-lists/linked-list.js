/** Node: node for a singly linked list. */

class Node {
  val = null;
  next = null;

  constructor(val) {
    this.val = val;
  }
}

/** LinkedList: chained together nodes. */

class LinkedList {
  head = null;
  tail = null;
  length = 0;

  constructor(vals = []) {
    for (let val of vals) this.push(val);
  }

  /**access a node at a given index, throw error if idx is out of bounds */
  get(index) {
    if (index < 0 || index > this.length)
      throw new Error("Index out of bounds");

    let currentNode = this.head;
    for (let i = 0; i < index; i++) {
      currentNode = currentNode.next;
    }

    return currentNode;
  }

  /** push(val): add new value to end of list. */

  push(val) {
    //create a new Node
    const newNode = new Node(val);

    //needs to account for an empty list
    if (this.length === 0) {
      this.head = newNode;
      this.tail = newNode;
      this.length += 1;
      return;
    }

    this.tail.next = newNode;
    this.tail = newNode;
    this.length++;
  }

  /** unshift(val): add new value to start of list. */

  unshift(val) {
    //create a new node

    if (this.length === 0) {
      this.push(val);
      return;
    }

    const newNode = new Node(val);

    newNode.next = this.head;
    this.head = newNode;
    this.length++;
  }

  /** pop(): return & remove last item. */

  pop() {
    //handle case of tempty list
    if (this.length === 0) throw new Error("cannot pop an empty list");

    //handle case of single item list
    if (this.length === 1) {
      const out = this.head.val;
      this.head = null;
      this.tail = null;
      this.length -= 1;
      return out;
    }

    const out = this.tail.val;
    const newTail = this.get(this.length - 2);
    this.tail = newTail;
    this.tail.next = null;
    this.length--;
    return out;
  }

  /** shift(): return & remove first item. */

  shift() {
    if (this.length === 0) throw new Error("cannot shift empty list");

    if (this.length === 1) {
      let out = this.head.val;
      this.head = null;
      this.tail = null;
      this.length--;
      return out;
    }

    let out = this.get(0).val;
    const newHead = this.head.next;
    newHead.next = this.head.next.next;
    this.head = newHead;

    this.length--;
    return out;
  }

  /** getAt(idx): get val at idx. */

  getAt(idx) {
    if (idx < 0 || idx >= this.length) throw new Error("index out of bounds");

    let currentNode = this.head;
    for (let i = 0; i < idx; i++) {
      currentNode = currentNode.next;
    }

    return currentNode.val;
  }

  /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) {
    let targetNode = this.get(idx);
    targetNode.val = val;
  }

  /** insertAt(idx, val): add node w/val before idx. */

  insertAt(idx, val) {
    //check that idx is valid
    if (idx < 0 || idx > this.length) throw new Error("index out of bounds");

    //handle cases of length being 0 or 1
    if (this.length <= 1) {
      this.unshift(val);
      return;
    }

    //handle case of adding a new head
    if (idx === 0) {
      this.unshift(val);
      return;
    }

    const targetNode = this.get(idx - 1);
    const newNode = new Node(val);

    if (idx !== this.length) {
      newNode.next = targetNode.next;
    } else {
      this.tail = newNode;
    }

    targetNode.next = newNode;
    this.length++;
  }

  /** removeAt(idx): return & remove item at idx, */

  removeAt(idx) {}

  /** average(): return an average of all values in the list */

  average() {}
}

module.exports = LinkedList;
