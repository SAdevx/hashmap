import { Node } from "./node.js";

class HashMap {
    #buckets = [];
    #head = null;
    #loadFactor = 0.75;
    #capacity = 16;

    constructor() {
    }

    hash(key) {
        let hashCode = 0;
           
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
          hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % key.length;
        }
     
        return hashCode;
      } 

      set(key, value) {
        let hashKey = this.hash(key);

        //check load levels and keys already existing 
        if(this.#buckets[hashKey] !== undefined){
            this.#head = this.#buckets[hashKey];
            
            while(this.#head.next !== null){
                //update if the key/value pair is not the first occurence in the bucket
                if(this.#head.key === key){
                    this.#head.value = value;
                    return;
                } 
                this.#head = this.#head.next;
            }
            //update if there's only one key/value pair in the bucket
            if(this.#head.key === key){
                this.#head.value = value;
                return;
            }
            this.#head.next = new Node(hashKey, key, value, null);

        } else {
            this.#buckets[hashKey] = new Node(hashKey, key, value, null);
        }
        this.#head = null;
    }

    get(key) {
        let hashKey = this.hash(key);
        this.#head = this.#buckets[hashKey];

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
        let hashKey = this.hash(key);
        this.#head = this.#buckets[hashKey];

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
        let keyCount = 0;

        for(let i = 0; i < this.#buckets.length; i++){
            let bucketInd = this.#buckets[i];
            if(bucketInd !== undefined){
                while(bucketInd.next !== null){
                   keyCount++;
                   bucketInd = bucketInd.next;
                }
                keyCount++;
            }
        }
        return keyCount;
    }

    clear() {
        this.#buckets = [];
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
}

export {HashMap};