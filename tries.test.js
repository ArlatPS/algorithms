const { CITY_NAMES } = require("./cities.js");
const _ = require("lodash"); // needed for unit tests

class Node {
  // node created with array of children, boolean end and first letter from passed string
  constructor(string) {
    this.children = [];
    this.end = false;
    this.value = string[0] || "";

    // if string is longer then one - add Node to children
    if (string.length > 1) {
      this.children.push(new Node(string.substr(1)));
      // otherwise set end as true
    } else {
      this.end = true;
    }
  }

  // adding
  add(string) {
    const value = string[0];
    const next = string.substr(1);
    // loop through children
    for (let i = 0; i < this.children.length; i++) {
      const child = this.children[i];
      // if letter is the same
      if (child.value === value) {
        // if still letters to add, call next add
        if (next) {
          child.add(next);
          // otherwise set end as true
        } else {
          child.end = true;
        }
        return;
      }
    }
    // if none of the children is the letter then add it to children (with end = true)
    this.children.push(new Node(string));
  }

  // look for completions with query
  complete(string) {
    let results = [];
    // loop through children
    for (let i = 0; i < this.children.length; i++) {
      const child = this.children[i];
      // call _complete on child and concat returned suggestions
      results = results.concat(child._complete(string, "", []));
    }

    // return completions
    return results;
  }

  // internal method for completing
  // built holds the word that is building
  _complete(search, built, suggestions) {
    // if suggestions list longer than 3 (max set by user)
    // or it is not hte right value (_complete called below on every child)
    // return current list
    if (suggestions.length >= 3 || (search && search[0] !== this.value)) {
      return suggestions;
    }

    // if end hit add whole word form built to results
    if (this.end) {
      suggestions.push(`${built}${this.value}`);
    }
    // call complete an every child and look for suggestions
    this.children.forEach((child) =>
      child._complete(search.substr(1), `${built}${this.value}`, suggestions)
    );

    return suggestions;
  }
}

// create Trie - add every word lowercased
const createTrie = (words) => {
  const root = new Node("");

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    root.add(word.toLowerCase());
  }

  return root;
};

// unit tests
// do not modify the below code
describe("tries", function () {
  test("dataset of 10 – san", () => {
    const root = createTrie(CITY_NAMES.slice(0, 10));
    const completions = root.complete("san");
    expect(completions.length).toBe(3);
    expect(
      _.intersection(completions, ["san antonio", "san diego", "san jose"])
        .length
    ).toBe(3);
  });

  test("dataset of 10 – philadelph", () => {
    const root = createTrie(CITY_NAMES.slice(0, 10));
    const completions = root.complete("philadelph");
    expect(completions.length).toBe(1);
    expect(_.intersection(completions, ["philadelphia"]).length).toBe(1);
  });

  test("dataset of 25 – d", () => {
    const root = createTrie(CITY_NAMES.slice(0, 25));
    const completions = root.complete("d");
    expect(completions.length).toBe(3);
    expect(
      _.intersection(completions, ["dallas", "detroit", "denver"]).length
    ).toBe(3);
  });

  test("dataset of 200 – new", () => {
    const root = createTrie(CITY_NAMES.slice(0, 200));
    const completions = root.complete("new");
    expect(completions.length).toBe(3);
    expect(
      _.intersection(completions, [
        "new york",
        "new orleans",
        "new haven",
        "newark",
        "newport news",
      ]).length
    ).toBe(3);
  });

  test("dataset of 200 – bo", () => {
    const root = createTrie(CITY_NAMES.slice(0, 200));
    const completions = root.complete("bo");
    expect(completions.length).toBe(2);
    expect(_.intersection(completions, ["boston", "boise city"]).length).toBe(
      2
    );
  });

  test("dataset of 500 – sal", () => {
    const root = createTrie(CITY_NAMES.slice(0, 500));
    const completions = root.complete("sal");
    expect(completions.length).toBe(3);
    expect(
      _.intersection(completions, ["salt lake city", "salem", "salinas"]).length
    ).toBe(3);
  });

  test("dataset of 925 – san", () => {
    const root = createTrie(CITY_NAMES);
    const completions = root.complete("san");
    expect(completions.length).toBe(3);
    expect(
      _.intersection(completions, [
        "san antonio",
        "san angelo",
        "san diego",
        "san jose",
        "san jacinto",
        "san francisco",
        "san bernardino",
        "san buenaventura",
        "san bruno",
        "san mateo",
        "san marcos",
        "san leandro",
        "san luis obispo",
        "san ramon",
        "san rafael",
        "san clemente",
        "san gabriel",
        "santa ana",
        "santa clarita",
        "santa clara",
        "santa cruz",
        "santa rosa",
        "santa maria",
        "santa monica",
        "santa barbara",
        "santa fe",
        "santee",
        "sandy",
        "sandy springs",
        "sanford",
      ]).length
    ).toBe(3);
  });
});

describe("edge cases", () => {
  test("handle whole words – seattle", () => {
    const root = createTrie(CITY_NAMES.slice(0, 30));
    const completions = root.complete("seattle");
    expect(completions.length).toBe(1);
    expect(_.intersection(completions, ["seattle"]).length).toBe(1);
  });

  test("handle no match", () => {
    const root = createTrie(CITY_NAMES.slice(0, 30));
    const completions = root.complete("no match");
    expect(completions.length).toBe(0);
  });

  test("handle words that are a subset of another string – salin", () => {
    const root = createTrie(CITY_NAMES.slice(0, 800));
    const completions = root.complete("salin");
    expect(completions.length).toBe(2);
    expect(_.intersection(completions, ["salina", "salinas"]).length).toBe(2);
  });
});
