import BST from '../index';

describe('testing binary serach tree', () => {
  const tree = new BST();
  tree.insert(9);
  tree.insert(4);
  tree.insert(6);
  tree.insert(20);
  tree.insert(170);
  const res = tree.insert(15);
  test('testing insert', () => {
    // Arrange

    /**
     {
      root: {
        value: 9,
        left: {
          value: 4,
          left: null,
          right: { value: 6, left: null, right: null },
        },
        right: {
          value: 20,
          left: { value: 15, left: null, right: null },
          right: { value: 170, left: null, right: null },
        },
      },
    }
     */
    // Assert
    expect(res?.root?.value).toBe(9);
    expect(res?.root?.left?.value).toBe(4);
    expect(res?.root?.left?.left?.value == undefined).toBe(true);
    expect(res?.root?.left?.right?.value).toBe(6);
    expect(res?.root?.right?.value).toBe(20);
    expect(res?.root?.right?.left?.value).toBe(15);
    expect(res?.root?.right?.left?.right == undefined).toBe(true);
    expect(res?.root?.right?.right?.value).toBe(170);
  });

  test('testing lookup', () => {
    const t1 = tree.lookup(20);
    expect(t1?.value).toBe(20);
    expect(t1?.left?.value).toBe(15);
    expect(t1?.right?.value).toBe(170);

    const t2 = tree.lookup(4);
    expect(t2?.value).toBe(4);
    expect(t2?.left == undefined).toBe(true);
    expect(t2?.right?.value).toBe(6);

    const t3 = tree.lookup(999);
    expect(t3 == undefined).toBe(true);
  });
});
