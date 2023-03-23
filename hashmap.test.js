// simple hashing function
function hash(string, max) {
  let hash = 0;
  for (let i = 0; i < string.length; i++) {
    hash += string.charCodeAt(i);
  }
  return hash % max;
}

class HashMap {
  constructor(max) {
    this.data = new Array(max);
    this.max = max;
  }
  add(key, value) {
    const hashedKey = hash(key, this.max);
    if (this.data[hashedKey] == undefined) {
      this.data[hashedKey] = [{ key, value }];
    } else {
      // variable to see if for each changed value
      let done = false;
      this.data[hashedKey].forEach((item, index) => {
        if (item.key === key) {
          this.data[hashedKey][index] = { key, value };
          done = true;
        }
      });
      if (!done) {
        this.data[hashedKey].push({ key, value });
      }
    }
  }
}

const map = new HashMap(2);
map.add("Przemek", 21);
map.add("Przek", 21);
map.add("Ania", 20);
map.add("Ania", 22);
console.log(JSON.stringify(map));
