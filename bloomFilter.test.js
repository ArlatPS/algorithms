const XXH = require("xxhashjs");
// size of array
const sizeOfArray = 100;
const h1 = (string) =>
  Math.abs(XXH.h32(0xabcd).update(string).digest().toNumber() % sizeOfArray);
const h2 = (string) =>
  Math.abs(XXH.h32(0x1234).update(string).digest().toNumber() % sizeOfArray);
const h3 = (string) =>
  Math.abs(XXH.h32(0x6789).update(string).digest().toNumber() % sizeOfArray);

class BloomFilter {
  // array of length sizeOfArray filled with 0
  constructor() {
    this._array = new Array(sizeOfArray).fill(0);
  }
  // adding flips 3 positions to 1
  add(string) {
    this._array[h1(string)] = 1;
    this._array[h2(string)] = 1;
    this._array[h3(string)] = 1;
  }
  // checking
  contains(string) {
    // if in any of the three positions 0 then it definitely wasn't seen
    if (
      this._array[h1(string)] == 0 ||
      this._array[h2(string)] == 0 ||
      this._array[h3(string)] == 0
    )
      return false;
    // otherwise it might have been seen
    return true;
  }
}

describe("bloom filter", function () {
  let bf;
  beforeEach(() => {
    bf = new BloomFilter();
  });
  test("returns false when empty", () => {
    expect(bf.contains("Brian")).toBe(false);
    expect(bf.contains("Sarah")).toBe(false);
    expect(bf.contains("Simona")).toBe(false);
  });
  test("adding", () => {
    bf.add("Brian");
    expect(bf.contains("Brian")).toBe(true);
    expect(bf.contains("Sarah")).toBe(false);
    expect(bf.contains("Simona")).toBe(false);
  });
  test("handles many items", () => {
    const names = [
      "Brian",
      "Simona",
      "Sarah",
      "Asim",
      "John",
      "Sean",
      "Jessie",
      "Paige",
      "Ashley",
    ];
    names.forEach((item) => bf.add(item));
    names.forEach((item) => expect(bf.contains(item)).toBe(true));
    ["Sam", "Chris", "Taylor", "Florence"].forEach((item) =>
      expect(bf.contains(item)).toBe(false)
    );
  });
});
