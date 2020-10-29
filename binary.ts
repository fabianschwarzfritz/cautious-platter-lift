
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

type BNode = {
  value: number;
  left: BNode | null;
  right: BNode | null;
}

function search(node: BNode, find: number): number {
  if(!node) {
    return -1;
  }
  console.log('.');
  console.log(`Node: ${node.value}, find: ${find}`);
  if(node.value === find) {
    return node.value;
  }

  if(find < node.value) {
    console.log('go left');
    return search(node.left, find);
  }
  if(find > node.value) {
    console.log('go right');
    return search(node.right, find);
  }
}

console.log(search(head, 10));
console.log(search(head, 1));
console.log(search(head, 13));
console.log(search(head, 17));


console.log(`LIST BINARY SEARCH`);
const list = [1, 5, 7, 9, 11, 15, 17];
console.log(searchlist(list, 10));
console.log(searchlist(list, 1));
console.log(searchlist(list, 13));
console.log(searchlist(list, 17));
console.log(searchlist(list, 11));

function searchlist(list: number[], find: number): number {
  // TODO base case?
  
  let l = 0;
  let r = list.length - 1;
  while(l <= r) {
    const m = Math.floor((r-l)/2) + l;
    console.log(`find: ${find}`);
    console.log(`left idx: ${l}, middle idx: ${m}, right idx: ${r}`);
    console.log(`left val: ${list[l]}, middle val: ${list[m]}, right val: ${list[r]}`);
    if(list[m] === find) {
      console.log(`Found at index: ${m}, value: ${find}`);
      return m;
    }
    if(find < list[m]) {
      r = m-1;
    } else if(list[m] <= find) {
      l = m+1;
    }
  }
  console.log(`Not found`);
  return -1;
}

