/** Node: node for a queue. */

class Node {
  val = null;
  next = null;

  constructor(val) {
    this.val = val;
  }
}

/** Queue: chained-together nodes where you can
 *  remove from the front or add to the back. */

class Queue {
  first = null;
  last = null;
  size = 0;

  /** enqueue(val): add new value to end of the queue. Returns undefined. */

  /**
   * create a new node
   *
   * handle case of en empty list
   *
   * handle other cases
   */

  enqueue(val) {
    const newNode = new Node(val);

    if (this.size === 0) {
      this.first = newNode;
      this.last = newNode;
      this.size++;
      return;
    }

    this.last.next = newNode;
    this.last = newNode;
    this.size++;
    return;
  }

  /** dequeue(): remove the node from the start of the queue
   * and return its value. Should throw an error if the queue is empty. */

  dequeue() {}

  /** peek(): return the value of the first node in the queue. */

  peek() {}

  /** isEmpty(): return true if the queue is empty, otherwise false */

  isEmpty() {}
}

module.exports = Queue;
