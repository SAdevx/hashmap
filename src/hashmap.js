import { Node } from "./node.js";

class HashMap {
    #buckets = [];
    #loadFactor = 0.75;
    #capacity = 16;
    #entriesCount = 0; 

    constructor() {
    }

    hash(key) {
        let hashCode = 0;
           
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
          hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.#capacity;
        }
        return hashCode;
    }

    set(key, value) {
        let index = this.hash(key);

        if(index < 0 || index >= this.#capacity){
            throw new Error("Trying to access index out of bounds");
        } 
              
        if(this.#buckets[index] != undefined){
            let head = this.#buckets[index];
            
            while(head != null){
                if(head.key === key ){
                    head.value = value;
                    return;
                } 
                head = head.next;
            }
            this.#entriesCount++;
            this.handleHashMapGrowth();
            index = this.hash(key);
            let newNode = new Node(key, value, this.#buckets[index]);
            this.#buckets[index] = newNode;
        } else {
            this.#entriesCount++;
            this.handleHashMapGrowth();
            index = this.hash(key);
            this.#buckets[index] = new Node(key, value, null);
        }
    }

    get(key) {
        let index = this.hash(key);
        let head = this.#buckets[index];

        while(head != null){
            if(head.key === key){
                return head.value;
            }
            head = head.next;
        }
        return null;
    }

    has(key){
        let index = this.hash(key);
        let head = this.#buckets[index];

        while(head != null){
            if(head.key === key) {
                return true;
            }
            head = head.next;
        }
        return false;
    }

    remove(key){
        let index = this.hash(key);
        let currNode = this.#buckets[index];

        if(currNode === undefined) return false;

        if(currNode.key === key){
            this.#buckets[index] = currNode.next;
            this.#entriesCount--;
            return true;
        } else {
            let prevNode = currNode;
            currNode = currNode.next;

            while(currNode != null){
                if(currNode.key === key){
                    prevNode.next = currNode.next;
                    this.#entriesCount--;
                    return true;
                }
                prevNode = currNode;
                currNode = currNode.next;
            }
        }
        return false
    }
    
    length(){
        return this.#entriesCount;
    }

    clear() {
        this.#buckets = [];
        this.#capacity = 16;
        this.#entriesCount = 0;
    }

    keys(){
        let allKeys = [];

        for(let i = 0; i < this.#buckets.length; i++){
            let currNode = this.#buckets[i];

            while(currNode != null){
                allKeys.push(currNode.key);
                currNode = currNode.next;
            }
        }
        return allKeys;
    }

    values() {
        let allValues = [];

        for(let i = 0; i < this.#buckets.length; i++){
            let currNode = this.#buckets[i];

            while(currNode != null){
                allValues.push(currNode.value);
                currNode = currNode.next;
            }
        }
        return allValues;
    }

    entries() {
        let allKeysAndValues = [];

        for(let i = 0; i < this.#buckets.length; i++){
            let currNode = this.#buckets[i];

            while(currNode != null){
                allKeysAndValues.push([currNode.key, currNode.value]);
                currNode = currNode.next;
            }
        } 
        return allKeysAndValues;
    }

    handleHashMapGrowth(){
        let loadLevel = this.#loadFactor * this.#capacity;

        if(loadLevel < this.#entriesCount){
            this.#capacity *= 2;
            let tmpBucketArr = [];
            let index = undefined;

            for(let i = 0; i < this.#buckets.length; i++){
                let node = this.#buckets[i];
                let head = null;
                
                while(node != null){
                    let currNode = null;
                
                    index = this.hash(node.key);
                    head = node.next;
                    currNode = new Node(node.key,node.value,null);
                    currNode.next = tmpBucketArr[index];
                    tmpBucketArr[index] = currNode;

                    node = head;
                }
            }
            this.#buckets = tmpBucketArr;
        }
    }
}

export {HashMap};