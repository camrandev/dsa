/** Node: node for a doubly linked list. */

class Node {
  val = null;
  next = null;
  prev = null;

  constructor(val) {
    this.val = val;
  }
}

class DoublyLinkedList {
  head = null;
  tail = null;
  length = 0;

  constructor(vals = []) {
    for (let val of vals) this.push(val);
  }

  /** get(idx) returns a node at the given index */

  /**
   * check if the index is OOB, if it is throw an error
   * OOB if less than 0 or greater than/equal to length
   *
   * traverse the list up to the idx
   * grab the node
   * return it
   */

  _get(idx) {
    if (idx < 0 || idx >= this.length) throw new Error("idx out of bounds");

    let curr = this.head;

    for (let i = 0; i < idx; i++) {
      curr = curr.next;
    }

    return curr;
  }

  /** push(val): add new value to end of list. */

  /**
   * what cases do we need to handle
   *
   * handle empty list -> need to update head/tail
   * create a new node
   * set head to new node
   * set tail to new node
   * single node, pointers are all null
   *
   * handle all other cases -> simply update tail
   * access the current tail
   *
   * set the current tails next property to the new node
   * set the new nodes prev to the current tail
   *
   * set the DLLs tail to the new node
   *
   *
   */

  push(val) {
    const newNode = new Node(val);

    //handle case of empty list
    if (this.length === 0) {
      this.head = newNode;
      this.tail = newNode;
      this.length++;
      return;
    }

    //handle other cases
    this.tail.next = newNode;
    newNode.prev = this.tail;
    this.tail = newNode;
    this.length++;
  }

  /** unshift(val): add new value to start of list. */

  /**
   * handle case of empty list using push
   *
   * handle other cases
   *   create a new node
   *   set the new nodes next to the current head
   *   set the current heads prev to the new node
   *   set the DLL head to the new node
   *   increment the length
   */

  unshift(val) {
    //handle case of empty list
    if (this.length === 0) {
      this.push(val);
      return;
    }

    const newNode = new Node(val);
    newNode.next = this.head;
    this.head.prev = newNode;
    this.head = newNode;
    this.length++;
  }

  /** pop(): remove last item & return its value */

  /**
   * handle case of empty list
   * if the length is 0, throw an error
   *
   * handle case of single item list
   *  check if the length is 1
   *  if it is
   *  save the value of the only node
   *  set the head, tail to null
   *  decrement the length
   *  return the saved value
   *
   * handle other cases
   *  save the tail
   *  set the previous nodes next to null
   *  set the DLL tail to the current tails prev pointer
   *  decrement the length
   *  returned the saved value
   *
   *
   */

  pop() {
    if (this.length === 0) throw new Error("cannot pop an empty list");

    if (this.length === 1) {
      const out = this.head.val;
      this.head = null;
      this.tail = null;
      this.length--;
      return out;
    }

    const prev = this.tail.prev;
    const out = this.tail.val;
    prev.next = null;
    this.tail = prev;
    this.length--;
    return out;
  }

  /** shift(): remove first item & return its value */

  /**
   * handle case of empty list -> raise an error
   *
   * handle case of single item list
   *  save the single value
   *  set the head + tail to null
   *  decerement the length
   *  return the saved value
   *
   * handle other cases
   *  save the heads next node
   *  save the current heads value
   *  set saved next values prev value to null
   *  set the DLL head to the saved next value
   *  decrement the length
   *  return the saved head
   *
   *
   */

  shift() {
    if (this.length === 0) throw new Error("cannot shift an empty list");

    if (this.length === 1) {
      return this.pop();
    }

    const secondNode = this.head.next;
    const out = this.head.val;
    secondNode.prev = null;
    this.head = secondNode;
    this.length--;
    return out;
  }

  /** getAt(idx): get val at idx.*/

  /**
   * access the node at the target target idx using _get
   * return the target nodes value
   */

  getAt(idx) {
    const targetNode = this._get(idx);
    return targetNode.val;
  }

  /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) {
    const targetNode = this._get(idx);
    return (targetNode.val = val);
  }

  /** insertAt(idx, val): add node w/val before idx. */

  /**
   * handle out of range
   *
   * handle empty
   *
   * handle adding new head
   *
   * handle adding new tail
   *
   * handle other cases
   * A -> B -> C
   *
   * insertAt(1,Z)
   *  create a new node
   *  access the target node -> (1) -> B
   *  access the prior node -> b.prev -> A
   *
   *  insert new node inbetween target + prior
   *  A -> Z -> B -> C
   *
   * set prior.next -> new
   * set new.next ->target
   * set target.prev->new
   * increment the length
   *
   */
  insertAt(idx, val) {
    //for the guard on insert, need to make it strictly greater than the length
    //otherwise cannot insert into an empty list
    if (idx < 0 || idx > this.length) throw new Error("index out of bounds");

    if (this.length <= 1) {
      this.unshift(val);
      return;
    }

    //handle new head
    if (idx === 0) {
      this.unshift(val);
      return;
    }

    // handle new tail
    // for the tail insertion
    if (idx === this.length) {
      this.push(val);
      return;
    }

    //handle other cases
    const newNode = new Node(val);
    const insertBefore = this._get(idx);
    const insertAfter = insertBefore.prev;

    insertAfter.next = newNode;
    newNode.prev = insertAfter;
    newNode.next = insertBefore;
    insertBefore.prev = newNode;
    this.length++;
    return;
  }

  /** removeAt(idx): remove node at idx and return its value*/

  /**
   * throw an error if idx is out of bounds
   *
   * handle case of single item list
   *  update head tail pointers
   *  update length
   *
   * handle case of removing current head
   * handle case of removing current tail
   *
   * handle all other cases
   *  access the target node
   *  access the target.prev
   *  access the target.next
   *  set prev ->next
   *  set prev<-next
   *  decrement length
   *
   */

  removeAt(idx) {
    //guard
    if (idx < 0 || idx >= this.length) {
      throw new Error("index out of bounds");
    }

    //handle case of single item list
    if (this.length === 1) {
      return this.shift();
    }

    //handle removing head
    if (idx === 0) {
      return this.shift();
    }

    //handle removing tail
    if (idx === this.length - 1) {
      return this.pop();
    }

    //handle other cases
    const target = this._get(idx);
    const prev = target.prev;
    const next = target.next;
    const out = target.val;

    prev.next = next;

    next.prev = prev;
    this.length--;
    return target.val;
  }

  /** return average (mean) of list values. */

  average() {
    if (this.length === 0) return 0;

    let count = 0;

    let curr = this.head;

    while (curr) {
      count += curr.val;
      curr = curr.next;
    }

    return count / this.length;
  }
}

module.exports = DoublyLinkedList;
