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

  removeAt(idx) {
    if (idx < 0 || idx >= this.length) {
      throw new Error("index out of bounds");
    }

    if (this.length === 1) {
      const out = this.head.val;
      this.head = null;
      this.tail = null;
      this.length--;
      return out;
    }

    if (idx === 0) {
      const out = this.head.val;
      this.head = this.head.next;
      this.length--;
      return out;
    }

    const prevNode = this.get(idx - 1);
    const targetNode = prevNode.next;

    const out = targetNode.val;
    prevNode.next = targetNode.next;
    this.length--;
    return out;
  }

  /** average(): return an average of all values in the list */

  average() {
    if (this.length === 0) {
      return 0;
    }

    let sum = 0;

    let curr = this.head;

    while (curr) {
      sum += curr.val;
      curr = curr.next;
    }

    return sum / this.length;
  }

  /** reverse a linkedList in place, does not return anything*/

  reverseInPlace() {
    if (this.length === 1) return;

    //initial the previous to null -> makes sense, as it will be the new head next
    //which when reversing will be null
    let prev = null;

    //access the current node -> starts as the head
    let curr = this.head;

    //while the curr node exists
    while (curr) {
      //save the NEXT node
      const next = curr.next;

      //set the current node next to the previous node
      curr.next = prev;

      //set the previous to the current
      prev = curr;

      //set the current to the next
      curr = next;
    }

    //swap the head and tail pointers on the LL class, if the class keeps track of them
    [this.head, this.tail] = [this.tail, this.head];
  }
}

module.exports = LinkedList;
