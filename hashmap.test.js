const { describe } = require("node:test");

class HashMap {
  constructor(max) {
    this.data = [];
    this.max = max;
  }
  add(key, value) {
    const hashedKey = this.hash(key, this.max);
    if (this.data[hashedKey] == null) {
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

  find(key) {
    const hashedKey = this.hash(key, this.max);
    let value = undefined;
    if (this.data[hashedKey] == null) {
      return value;
    }
    this.data[hashedKey].forEach((item) => {
      if (item.key === key) {
        value = item.value;
      }
    });
    return value;
  }

  remove(key) {
    const hashedKey = this.hash(key, this.max);
    if (this.data[hashedKey] == null) {
      return "not found";
    }
    for (let i = 0; i < this.data[hashedKey].length; i++) {
      if (this.data[hashedKey][i].key === key) {
        return this.data[hashedKey].splice(i, 1)[0].value;
      }
    }
  }

  // simple hashing function
  hash(string, max) {
    let hash = 0;
    for (let i = 0; i < string.length; i++) {
      hash += string.charCodeAt(i);
    }
    return hash % max;
  }
}

describe("hashmap", () => {
  const map = new HashMap(2);
  map.add("Przemek", 21);
  map.add("Przek", 12);
  map.add("Ania", 20);
  map.add("Ania", 22);
  test("finding", () => {
    expect(map.find("Przek")).toBe(12);
    expect(map.find("Ania")).toBe(22);
  });
  test("deleting", () => {
    expect(map.remove("Przek")).toBe(12);
  });
});
