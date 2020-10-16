interface Data {
  value: number
}
interface Stack {
  push(data: Data): void;
  pop(): Data | undefined
  size(): number;
}
interface Queue {
  enqueue(data: Data): void;
  dequeue(): Data | undefined;
  size(): number;
}
class QueueNode {
  public data: Data;
  public next: QueueNode;
}
class MyQueue implements Queue {
  private first: QueueNode | undefined;
  private last: QueueNode | undefined;
  size(): number {
    let number = 0;
    let t = this.first;
    while(t!== undefined) {
      ++number;
      t = t.next;
    }
    return number;
  }
  enqueue(data: Data): void {
    console.log(`Enqueue value ${data.value}`)
    const n = new QueueNode();
    n.data = data;
    if (!this.first && !this.last) {
      this.first = n;
      this.last = n;
      return;
    }
    n.next = this.first;
    this.first = n;
  }
  dequeue(): Data | undefined {
    console.log(`Dequeue value`);
    if (!this.first && !this.last) {
      return undefined;
    }
    const result = this.first
    this.first = this.first.next;
    if (!this.first) {
      this.last = undefined;
    }
    return result.data;
  }
  print(): void {
    if (!this.first) {
      console.log('[]');
      return
    }
    let string = `[`;
    let iterator = this.first;
    while (iterator !== undefined) {
      string += iterator.data.value + ","
      iterator = iterator.next;
    }
    string += `]`;
    console.log(string);
  }
}
class StackNode {
  public data: Data;
  public previous: StackNode;
}
class MyStack implements Stack {
  private top: StackNode | undefined;

  size(): number {
    let number = 0;
    let t = this.top;
    while(t!== undefined) {
      ++number;
      t = t.previous;
    }
    return number;
  }
  push(data: Data): void {
    console.log(`Push value: ${data.value}`)
    const n = new StackNode();
    n.data = data;
    if (this.top) {
      n.previous = this.top;
    }
    this.top = n;
  }
  pop(): Data {
    console.log(`Pop top`)
    if (!this.top) {
      return undefined;
    }
    const result = this.top;
    this.top = this.top.previous;
    return result.data;
  }

  print(): void {
    if (!this.top) {
      console.log('[]');
      return
    }
    let string = `[`;
    let iterator = this.top;
    while (iterator !== undefined) {
      string += iterator.data.value + ","
      iterator = iterator.previous;
    }
    string += `]`;
    console.log(string);
  }
}

console.log(`====== STACK`)
const stack = new MyStack();
stack.print();
stack.push({ value: 1 });
stack.push({ value: 2 });
stack.push({ value: 3 });
stack.print();

console.log(stack.pop());
console.log(stack.pop());
stack.print();

stack.push({ value: -1 });
stack.push({ value: -2 });
stack.print();
console.log(stack.size());

console.log(`====== QUEUE`);
const queue = new MyQueue();
queue.print();
queue.enqueue({ value: 1 });
queue.print();
queue.enqueue({ value: 2 });
queue.print();
queue.enqueue({ value: 3 });
queue.print();
console.log(queue.dequeue());
queue.print();
console.log(queue.dequeue());
queue.print();
console.log(queue.dequeue());
queue.print();
queue.enqueue({ value: -1 });
queue.enqueue({ value: -2 });
queue.enqueue({ value: -3 });
console.log(queue.dequeue());
queue.print();
queue.enqueue({ value: 10 })
queue.print();
console.log(queue.size());


console.log(`====== BINARY`);
type BNode = {
  value: number;
  left: BNode | null;
  right: BNode | null;
}
function binarySearchTree(curr: BNode, v:number): boolean {
  if(curr === null) {
    return false
  }
  if(curr.value === v) {
    return true;
  }
  if(curr.value > v) {
    return binarySearchTree(curr.left, v);
  }
  return binarySearchTree(curr.right, v);
}
function binarySearchList(arr: number[], v:number): number {
  let L = 0;
  let R = arr.length-1;

  while(L <= R) {
    const idx = L + Math.floor((R - L) / 2);
    const value = arr[idx];
    if(value === v) {
      return idx;
    }
    if(value > v) {
      R = idx - 1;
    }
    if(value < v) {
      L = idx + 1;
    }
  }

  return -1;
}

const list = [1, 5, 7, 9, 11, 15, 17];

console.log(binarySearchList(list, 1));
console.log(binarySearchList(list, 13));
console.log(binarySearchList(list, 17));

const head: BNode = {
  value: 10,
  left: {
      value: 8,
      left: {
          value: 3,
          right: null,
          left: {
              value: 1,
              right: null,
              left: null
          }
      },
      right: {
          value: 9,
          right: null,
          left: null,
      }
  },
  right: {
      value: 12,
      left: {
          value: 11,
          left: null,
          right: null,
      },
      right: {
          value: 15,
          left: {
              value: 14,
              left: {
                  value: 13,
                  left: null,
                  right: null,
              },
              right: null
          },
          right: null,
      }
  }
};
console.log(binarySearchTree(head, 1));
console.log(binarySearchTree(head, 13));
console.log(binarySearchTree(head, 17));


