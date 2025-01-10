class Node {
    #hashCode;
    #key;
    #value
    #next;

    constructor(hashCode, key, value, next){
        this.#hashCode = hashCode;
        this.key = key;
        this.value = value;
        this.#next = next;
    }
}
