import { Node } from "./node";

class HashMap {
    #buckets = [];
    #head = null;
    #loadFactor = 0.8;
    #capacity = 16;

    constructor() {
    }

    //done
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

        //done 
        if(this.#buckets[hashKey] !== undefined){
            this.#head = this.#buckets[hashKey];

            while(this.#head.next !== null){
                this.#head = this.#head.next;

                //if key already exist, update with new key
                if(this.#head.key === key) this.#head.value = value;
            }
            this.#head = new Node(hashKey, key, value, null);

        } else {
            this.#buckets[hashKey] = new Node(hashKey, key, value, null);
        }
        this.#head = null;
    }

    //done
    get(key) {
        let hashKey = this.hash(key);
        this.#head = this.#buckets[hashKey];

        if(this.#head.key === key){
            this.#head = null;
            return this.#head.value;
        } else {
            while(this.#head.next !== null){
                this.#head = this.#head.next;

                if(this.#head.key === key){
                    return this.#head.value;
                }
            }
            this.#head = null;
            return null;
        }
    }

    //done
    has(key){
        let hashKey = this.hashKey(key);
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

    //done
    clear() {
        this.#buckets = [];

        //check if i need to change anything with loadfactor
        this.#loadFactor = 0.8;
        this.#capacity = 16;
    }

    keys(){
        let allKeys = [];

        for(let i = 0; i < this.#buckets.length; i++){
            let bucketInd = this.#buckets[i];

            if(bucketInd !== undefined){
                //store the keys only
                while(bucketInd.next !== null){
                    //store key here;
                }
                //store the last key;
            }

        }
    }

    values() {

    }

    entries() {
        
    }
     
}