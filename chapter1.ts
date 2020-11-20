declare const Buffer;

// String buffer time
// wordlength: x
// words: n
// 4 word
// O(x + 2*x + 3*x + ... + n*x)
// reduces to = O( n * x * (n+1)/2 )
// reduces to = O(x * n^2)

function printNewChapter(chapter: string, text: string) {
    console.log("============================")
    console.log(chapter)
    console.log("---")
    console.log(text)
}


class StringBuffer {
    private newPointer: number; 
    private buffer: string[];

    constructor(initial: string) {
        this.newPointer = 1;
        this.buffer = new Array(2);
        this.buffer[0] = initial;
    }

    /**
     * Append the given string to the buffer 
     */
    public append(s: string) {
        if(this.exendeNeeded()) {
            this.copyOver();
        }
        this.buffer[this.newPointer] = s;
        ++this.newPointer;
    }

    /**
     * Returns the string
     */
    public toString(): string {
        let result = "";
        for (let index = 0; index < this.newPointer; index++) {
            result = result + this.buffer[index];
        }
        return result;
    }

    public lookInside(): string[] {
        return this.buffer;
    }

    private copyOver(): void {
        const newLength = 2 * this.buffer.length
        const newBuffer = new Array(newLength);
        for (let index = 0; index < this.buffer.length; index++) {
            newBuffer[index] = this.buffer[index]; 
        }
        this.buffer = newBuffer;
    }

    private exendeNeeded(): boolean {
        return this.newPointer === this.buffer.length;
    }
}

console.log("output");
const buffer = new StringBuffer("a");
for (let index = 0; index < 20; index++) {
    console.log(buffer.lookInside());
    buffer.append(index + "");
}
console.log(buffer.toString());


printNewChapter("Exercise 1.1", `
Implement an algorithm to determine if a string has all unique characters.
What if you cannot use additional data structures?
`);

// We start to iterate over the string and store each character into a hashmap.
// In case this hash value has already a value, we know it already exists.
const goodInput11 = "123456";
const badInput11 = "1234346";

function uniqueCharacters(input: string): boolean {
    const arr = new Array();
    for(let i = 0; i < input.length; i++) {
        const char = input[i];
        const hash = char.charCodeAt(0);
        if(arr[hash] === true) {
            return false;
        }
        arr[hash] = true;
    }
    return true;
}

console.log("Time complexity: O(n). Space complexity: O(1)");
console.log(uniqueCharacters(goodInput11));
console.log(uniqueCharacters(badInput11));

printNewChapter("Exercise 1.2", `
Reverse a string
`);

const input12 = "12345";
const expected12 = "54321";

function reverse(s: string): string {
    const tmp = new Array(s.length);
    for (let index = 0; index < s.length; index++) {
        const insertIndex = s.length - index - 1
        tmp[insertIndex] = s[index];
    }
    const result = tmp.join("");
    return result;
}

console.log(reverse(input12));
console.log(reverse(input12) === expected12);

function reverseInplace(s: string): string {
    const tmp = s.split("");
    for(let index = 0; index < s .length; index++) {
        const insertIndex = s.length - index - 1;
        const t = tmp[insertIndex]
        tmp[insertIndex] = tmp[index];
        tmp[index] = t;
    }
    const result = tmp.join("");
    return result;
}

console.log(reverse(input12));
console.log(reverse(input12) === expected12);

printNewChapter("Excercise  1.3", `
Given two strings, write a method to decide if one is a permutation of the other
`);

function isPermutation(a: string, b: string): boolean {
    if(a.length === 0 || b.length === 0) {
        return false;
    }
    if(a.length !== b.length) {
        return false;
    }
    for(let forward = 0; forward<a.length; forward++) {
        const backward = a.length - forward - 1;
        if(a[forward] !== b[backward]) {
            return false;
        }
    }
    return true;
}

function isPermutationSimple(a: string, b: string): boolean  {
    if(a.length === 0 || b.length === 0) {
        return false;
    }
    if(a.length !== b.length) {
        return false;
    }
    const sortedA = a.split("").sort();
    const sortedB = b.split("").sort();
    return arrayEquals(sortedA, sortedB);
}

function arrayEquals(a, b) {
    return Array.isArray(a) &&
      Array.isArray(b) &&
      a.length === b.length &&
      a.every((val, index) => val === b[index]);
}

console.log(isPermutation("", ""))
console.log(isPermutation("asdf", "asd"))
console.log(isPermutation("asdf", "fds"))
console.log(isPermutation("asdf", "dsaf"))
console.log(isPermutation("af", "dsaf"))
console.log(isPermutation("asdf", "fdsa"))
console.log("-");
console.log(isPermutationSimple("", ""))
console.log(isPermutationSimple("asdf", "asd"))
console.log(isPermutationSimple("asdf", "fdsa"))


printNewChapter("Excercise 1.4", `
Write a method to replace all spaces in a string with '%20'. You may assume that the string has sufficicent space at the end of the string to hold the additional characters, and that you are given the "true" lenght fo the string. (Note: if implementing in Java, please use a character array so that you can perform this operation in place.)
EXAMPLE
Input: 'Mr John Smith     ', 13
Output: 'Mr%20John%20Smith'
`)

// The trick here is:
// 1. we count he number of characters we want to replace in one run. We only
//    count with the wordlenth given to us.
// 2. Then iterate in reverse order through the string and replace the
//    occurrences of the char. We start backwards at the posistion (length)
//    that is given to us. With this, we don't overwrite more potential
//    whitespaces.
// --> The loop iterates with counter i on the original array
// --> we use the calculated newlength counter to write the replacements.
//
// this algorithm works, because there's enough space in the end of the string
// to work with and we can use two counters in the replacemnt: one pointing to the
// letters we want to replace, and the other one pointing to the position to write
// the letters to.

// Questions: in-place operation might be faster, we should do that.
function encodeSpaces(input: string, length: number) {
    let result: string[] = input.split('');

    let spaces = 0;
    for(let i = 0; i < length;  i++) {
        if(result[i]=== ' ') {
            spaces++;
        }
    }

    let newLength = length -  spaces + spaces * 3;

    for(let i = length - 1; i >=0; i--) {
        if(result[i] ===  ' ') {
            result[newLength - 1] = '0';
            result[newLength - 2] = '2';
            result[newLength - 3] = '%';
            newLength = newLength - 3;
        } else {
            result[newLength  - 1] = result[i];
            newLength = newLength - 1;
        }
    }
    return result.join('');

    // FIRST TRY. WRONG, as not possible in-place.
    // const removeSymbol = ' ';
    // const insertSymbol = '%20';
    // for(let i = 0; i < length; i++) {
    //     const char = result[i];
    //     if(char === removeSymbol) {
    //         result[i]. = 

    //         // We need to calculate the new position wherwe we want to continue to look into the string
    //         const left = i;
    //         const right = i +1;
    //         result = [result.slice(0, left), insertSymbol, result.slice(right)].join('');
    //         i = i + insertSymbol.length - removeSymbol.length;
    //     }
    // }
    // console.log(`'${result}'`);
    // return result;
}

console.log(encodeSpaces("Mr John Smith    ", 13));
console.log("Mr%20John%20Smith")
console.log(encodeSpaces("Mr John Smith    ", 13) === "Mr%20John%20Smith");


printNewChapter("1.5", `
Implement a method to perform basic  string compression using the counts of repeated characters. For example, the string aabcccccaaa would become a2b1c5a3. If the "compressed" string would not become smaller than the original string, your method should return the original string. You can assume the string hs only upper and  lower case letters  (a-z).
`);

// This method has a super bad runtime.
// The runtime  is pretty bad though.
// We have a runtime O(n^2)
// In Java we would now use a StringBuffer,
// and use append() method to modify the string.
function compressBad(input:  string): string {
    // Count if compression shortens the string
    let size: number = 0;
    let count = 1
    let last = input[0];
    for(let i = 1; i < input.length; i++) {
        if(input[i] === last) {
            ++count;
        } else {
            last = input[i];
            size += 1 + count.toString().length;
            count = 1;
        }
    }
    size += 1 + count.toString().length;
    if(size > input.length) {
        return input;
    }

    // Continue with compression
    let result = "";
    last = input[0];
    count = 1;

    for(let i = 1; i < input.length; i++) {
        if(input[i] === last) { // Found repeating char
            ++count;
        } else { // Insert char cound and update last char
            result += last + "" + count;
            last = input.charAt(i);
            count = 1;
        }
    }
    return result + last + count;
}

function compressInPlace(input: string): string {
    // We would have tto do the "worth it" check as well
    // like in the example above.


    let result: string[] = new Array(input.length);
    let resultIndex = 0;
    let last = input[0];
    let count = 1;

    function setChar() {
        result[resultIndex] = last;
        ++resultIndex;
        const numberChars = count.toString().split('');
        for(const char of numberChars) {
            result[resultIndex] = char;
            ++resultIndex;
        }
    }

    for(let i = 1; i < input.length; i++) {
        if(input[i] === last) {
            ++count;
        } else  {
            setChar();
            last = input.charAt(i);
            count = 1;
        }
    }
    setChar();
    return result.join('').toString();
}

console.log("abc", "\t\t", compressBad("abc"));
console.log("aabc", "\t\t",  compressBad("aabc"));
console.log("a2b1c5a3", "\t",  compressBad("aabcccccaaa"));

console.log("abc", "\t\t", compressInPlace("abc"));
console.log("aabc", "\t\t",  compressInPlace("aabc"));
console.log("a2b1c5a3", "\t",  compressInPlace("aabcccccaaa"));

printNewChapter('1.6',`
Given an image represented by an NxN matrix, where each pixel in the image is 4 bytes
, write a method to rotate the image by 90 degrees. Can you do this in place?
`)

// FAIL! Wrong solution. This is mirroring the matrix - we want to rotate it!!!
function myWrongRotate(input: string[][]): void {
    // We could add validation/input checks here, but we just assume it's right for now.
    const maxLength = input.length;
    // Idea: iterate over x and y at the same time and change
    for(let x = 0; x < maxLength; x++) {
        for(let y = x; y < maxLength; y++) {
            if(x === y) { continue } // No need to rotate the diagonal
            console.log(`x: ${x}, y: ${y}, input[x][y]: ${input[x][y]}, input[y][x]: ${input[y][x]}` )
            const tmp = input[x][y];
            input[x][y] = input[y][x];
            input[y][x] = tmp;
        }
    }
}

function myRotate(input: string[][]): void {
    // We start with swapping the outer most layer
    for(let layer = 0; layer < input.length/2; ++layer) {
        const first = layer;
        const last = input.length - 1 - first;
        for(let i = first; i < last; ++i) {
            const offset = i - first;
            // save top
            const top = input[first][i];
            // left -> top
            input[first][i] = input[last-offset][first];
            // bottom -> left
            input[last-offset][first] = input[last][last-offset]
            // right -> bottom
            input[last][last-offset] = input[i][last];
            // top -> right
            input[i][last] = top;
        }
    }
}

const input = [
    ["1", "2", "3", "4"], 
    ["a", "b", "c", "d"], 
    ["!", "@", "#", "$"], 
    ["w", "x", "y", "z"], 
];
console.log("input:")
console.log(input);
console.log("Actual:")
myRotate(input);
console.log(input)
console.log("Desired:")
console.log([
    ["w", "!", "a", "1"], 
    ["x", "@", "b", "2"], 
    ["y", "#", "c", "3"], 
    ["z", "$", "d", "4"]
]);

printNewChapter("1.7", `
Write an algorithm such that if an element in an MxN matrix is 0, it's entire row and column are set to 0
`);

function setMatrixZero(matrix: number[][]) {
    function setRowZero(row: number) {
        for (let i = 0; i < matrix[0].length; i++) {
            matrix[row][i] = 0;
        }
    }
    function setColumnZero(column: number) {
        for (let i = 0; i < matrix.length; i++) {
            console.log(column);
            matrix[i][column] = 0;
        }
    }

    const zeroColumns = [];
    const zeroRows = [];
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[0].length; j++) {
           if(matrix[i][j] === 0) {
               zeroRows.push(i);
               zeroColumns.push(j);
           }
        }
    }

    zeroColumns.forEach((j) => {
        setColumnZero(j);
    });
    zeroRows.forEach((i) => {
        setRowZero(i);
    });

}

let input17 = [
    [1, 2, 3, 4, 5],
    [1, 2, 3, 4, 5],
    [1, 2, 3, 4, 5],
];
console.log("Input:");
console.log(input17);
console.log("Actual:");
setMatrixZero(input17);
console.log(input17);
console.log("Expected:");
console.log([
    [1, 2, 3, 4, 5],
    [1, 2, 3, 4, 5],
    [1, 2, 3, 4, 5],
]);

input17 = [
    [1, 2, 3, 4, 5],
    [1, 2, 3, 4, 5],
    [1, 0, 3, 4, 5],
];
console.log("Input:");
console.log(input17);
console.log("Actual:");
setMatrixZero(input17);
console.log(input17);
console.log("Expected:");
console.log([
    [1, 0, 3, 4, 5],
    [1, 0, 3, 4, 5],
    [0, 0, 0, 0, 0],
]);

printNewChapter("1.8",`
Assume you have a method isSubstring which checks if one word is a substring of another. given two strings, s1 and s2, write code to check if s2 is a rotation of s1 using only one call to isSubstring (e.g. "watterbottle" is a rotation of "erbottlewat").
`)

function isSubstring(original: string, includeds: string): boolean {
    return original.indexOf(includeds) !== -1;
}


function isRotation(original: string, rotate: string): boolean {
    if(original.length !== rotate.length) {
        return false;
    }
    const doubleoriginal = original + original;
    return isSubstring(doubleoriginal, rotate);
}

console.log(isRotation("waterbottle", "erbottlewat"), true);
console.log(isRotation("waterbottle", "rbottlewat"), false);
console.log(isRotation("waterbottle", "erbottelwat"), false);
