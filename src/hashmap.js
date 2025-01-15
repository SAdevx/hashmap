import { Node } from "./node.js";

class HashMap {
    #buckets = [];
    #head = null;
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
              
        if(this.#buckets[index] !== undefined){
            this.#head = this.#buckets[index];
            
            while(this.#head !== null){
                if(this.#head.key === key ){
                    this.#head.value = value;
                    return;
                } 
                this.#head = this.#head.next;
            }
            this.#entriesCount++;
            this.handleHashMapGrowth();
            index = this.hash(key);
            let newNode = new Node(index, key, value, this.#buckets[index]);
            this.#buckets[index] = newNode;
        } else {
            this.#entriesCount++;
            this.handleHashMapGrowth();
            index = this.hash(key);
            this.#buckets[index] = new Node(index, key, value, null);
        }
    }

    get(key) {
        let index = this.hash(key);
        this.#head = this.#buckets[index];

        if(this.#head.key === key){
            return this.#head.value;
        } else {
            while(this.#head.next !== null){
                this.#head = this.#head.next;

                if(this.#head.key === key){
                    return this.#head.value;
                }
            }
            return null;
        }
    }

    has(key){
        let index = this.hash(key);
        this.#head = this.#buckets[index];

        if(this.#head.key === key){
            return true;
        } else {
            while(this.#head.next !== null){
                this.#head = this.#head.next;

                if(this.#head.key === key) {
                    return true;
                }
            }
            return false;
        }
    }
    
    length(){
        return this.#entriesCount;
    }

    clear() {
        this.#buckets = [];
        this.#capacity = 16;
    }

    keys(){
        let allKeys = [];

        for(let i = 0; i < this.#buckets.length; i++){
            let bucketInd = this.#buckets[i];

            if(bucketInd !== undefined){
                while(bucketInd.next !== null){
                    allKeys.push(bucketInd.key);
                    bucketInd = bucketInd.next;
                }
                allKeys.push(bucketInd.key);
            }
        }
        return allKeys;
    }

    values() {
        let allValues = [];

        for(let i = 0; i < this.#buckets.length; i++){
            let bucketInd = this.#buckets[i];

            if(bucketInd !== undefined){
                while(bucketInd.next !== null){
                    allValues.push(bucketInd.value);
                    bucketInd = bucketInd.next;
                }
                allValues.push(bucketInd.value);
            }
        }
        return allValues;
    }

    entries() {
        let allKeysAndValues = [];

        for(let i = 0; i < this.#buckets.length; i++){
            let bucketInd = this.#buckets[i];

            if(bucketInd !== undefined){
                while(bucketInd.next !== null){
                    allKeysAndValues.push([bucketInd.key, bucketInd.value]);
                    bucketInd = bucketInd.next;
                }
                allKeysAndValues.push([bucketInd.key, bucketInd.value]);
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
                    currNode = new Node(index,node.key,node.value,null);
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