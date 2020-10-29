// String buffer time
// wordlength: x
// words: n
// 4 word
// O(x + 2*x + 3*x + ... + n*x)
// reduces to = O( n * x * (n+1)/2 )
// reduces to = O(x * n^2)

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