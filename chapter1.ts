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
