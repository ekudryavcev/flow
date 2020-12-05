export default class BinaryHeap {

  constructor() {
    this.heap = [];
    this.size = this.heap.length;
  }

  push(value) {
    this.heap.push(value);
    this.bubbleUp();
    this.size = this.heap.length;
  }

  isEmpty() {
    return (this.heap.length === 0);
  }

  pop() {
    let min = this.heap[0];
    if (this.heap.length === 1) {
      this.heap = [];
    }
    else {
      this.heap[0] = this.heap.pop();
      this.sinkDown(0);
    }
    this.size = this.heap.length;
    return min;
  }

  bubbleUp() {
    let index = this.heap.length - 1;
    while (index > 0) {
      let element = this.heap[index];
      let parentIndex = Math.floor((index - 1) / 2);
      let parent = this.heap[parentIndex];
      if (parent <= element)
        break;
      this.heap[index] = parent;
      this.heap[parentIndex] = element;
      index = parentIndex;
    }
  }

  sinkDown(index) {
    let left = 2 * index + 1;
    let right = 2 * index + 2;
    let largest = index;
    const length = this.heap.length;

    // if left child is smaller than parent
    if (left <= length && this.heap[left] < this.heap[largest]) {
      largest = left;
    }
    // if right child is smaller than parent
    if (right <= length && this.heap[right] < this.heap[largest]) {
      largest = right;
    }
    // swap
    if (largest !== index) {
      [this.heap[largest], this.heap[index]] = [this.heap[index], this.heap[largest]];
      this.sinkDown(largest);
    }

  }
}
