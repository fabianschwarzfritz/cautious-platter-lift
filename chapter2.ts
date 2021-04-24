function printNewChapter(chapter: string, text: string) {
    console.log("============================")
    console.log(chapter)
    console.log("---")
    console.log(text)
}

// Singly Linked list basic implementation
class ListNode {
    next: ListNode;
    data: number;

    constructor(data: number) {
        this.data = data;
        this.next = undefined;
    }

    public append(data: number): void {
        const end = new ListNode(data);
        let n: ListNode = this;
        while(n.next !== undefined) {
            n = n.next;
        }
        n.next = end;
    }
}

function deleteNode(head: ListNode, data: number) {
    let n = head;

    if(n.data === data) {
        return head.next; // Removes the head
    }

    while(n.next !== undefined) {
        if(n.next.data === data) {
            n.next = n.next.next; // Skip element 
            return head; // Head did not change
        }
        n = n.next; // Iterate
    }
    return head; // Return original if not found
}

printNewChapter("2.1", `
Write code to remove duplicates from an unsorted linkd list
FOLLOW UP
How would you solve this problem if a temporary buffer is not allowed?
`)
function toLinkedList(arr: number[]) {
    if (arr.length === 0) {
        return undefined;
    }
    const head = new ListNode(arr[0]);
    for(let i = 1; i < arr.length; i++) {
        head.append(arr[i]);
    }
    return head;
}

function toArray(head: ListNode) {
    if(head === undefined) {
        return [];
    }
    let result = [head.data];
    let n = head;
    while(n.next !== undefined) {
        result = result.concat(n.next.data); // Append
        n = n.next; // Iterate
    }
    return result;
}


// O(n) where n is the number of elements
function removeDuplicatesWithBuffer(head: ListNode) {
    const unions = {};
    let previous: ListNode = undefined;
    let n: ListNode = head;
    while(n !== undefined) {
        if(unions[n.data]) {
            previous.next = n.next;
        } else {
            previous = n;
            unions[n.data] = true;
        }
        n = n.next;
    }
}

console.log("With buffer");
let noDuplicates = toLinkedList([1, 2, 3, 4, 5]);
let duplicates =  toLinkedList([1, 1, 2, 3, 2, 4, 2, 5]);
removeDuplicatesWithBuffer(noDuplicates)
console.log(toArray(noDuplicates));
removeDuplicatesWithBuffer(duplicates)
console.log(toArray(duplicates));

// TODO the solution here proposes to use iteration.
// currently, I am using recursion here.
function removeDuplicatesInPlace(head: ListNode) {
    if(!head.next) {
        return;
    }
    let iterator = head;
    while(iterator.next) {
        if(head.data === iterator.next.data) {
            iterator.next = iterator.next.next;
        }
        iterator = iterator.next;
    }
    if(head.data === head.next.data) {
        head.next = head.next.next;
    }
    removeDuplicatesInPlace(head.next);
}

console.log("Inplace");
noDuplicates = toLinkedList([1, 2, 3, 4, 5]);
duplicates =  toLinkedList([1, 1, 2, 3, 2, 4, 2, 5]);
removeDuplicatesInPlace(noDuplicates)
console.log(toArray(noDuplicates));
removeDuplicatesInPlace(duplicates)
console.log(toArray(duplicates));


printNewChapter("2.2", `
Implement an algorithm to find the kth to last element of a singly linked list.
`)

interface IntWrapper {
    value: number;
}

function kLastRecursive(head: ListNode, kth: number, i: IntWrapper = {value: 0}): ListNode {
    if(!head) {
        return null;
    }
    const node = kLastRecursive(head.next, kth, i)
    i.value = i.value + 1;
    if(i.value === kth + 1) {
        return head;
    }
    return node;
}

let list1 = toLinkedList([1,2,3,4,5,6,7,8,9]); // size 9
console.log(kLastRecursive(list1, 1).data); // 8
console.log(kLastRecursive(list1, 2).data); // 7
console.log(kLastRecursive(list1, 8).data); // 1
console.log(kLastRecursive(list1, 9)); // null
console.log(kLastRecursive(list1, 0).data); // 9


//function kLastIterative(head: ListNode, kth: number): void {
//    // Setup two pointers with the right distance from each other
//    let p1 = head;
//    let p2 = head;
//    let distancecounter = 0;
//    while(p2.next) {
//        if(distancecounter === kth) {
//            // WE have the right distance between the counters;
//            break;
//        }
//        ++distancecounter;
//        p2.next = p2.next.next;
//    }
//
//    if(distancecounter !== kth) {
//        throw new Error("The list is too small");
//    }
//
//    while(p2.next) {
//
//        
//    }
//}

//list1 = toLinkedList([1,2,3,4,5,6,7,8,9]); // size 9
//console.log(kLastIterative(list1, 1).data); // 8
//console.log(kLastIterative(list1, 2).data); // 7
//console.log(kLastIterative(list1, 8).data); // 1
//console.log(kLastIterative(list1, 9)); // null
//console.log(kLastIterative(list1, 0).data); // 9

printNewChapter("2.3", `
Implement an algorithm to delete a node in the middle of a singly linked list,
given only access to that node
EXAMPLE
Input: the node c from the linked list a->b->c->d->e
Result: nothing is returned, but the new linked list looks like a->b->d->e
`)
function deleteMiddle(node: ListNode, todelete: number): void {
  // Deleting the last node could be handled with a dummy
  // node. Currently we can't delete these nodes.
  if(node === undefined || node.next === undefined) {
    throw new Error("Can't delete the last node with this function");
  }
  // We're only getting in the node itself to delete.
  // Hence we can't change the reference of the previous node
  // pointing to that node.
  // Therefore we copy over the data of the node next to the
  // one to be deleted and then change the reference.
  const next = node.next;
  node.data = next.data;
  node.next = next.next;
}

