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

