import * as iassign from 'immutable-assign';

iassign.setOption({freeze: true});

it('renders without crashing', () => {
    let nest1 = { a: { b: { c: [3, 4, 'sample'] } } };
    let nest2 = iassign(
        nest1,
        n => n.a.b.c[2],
        ci => 5,
    );
    // nest2.a.b.c[1] = 12;

    console.log('nest2', nest2);
    
    expect(nest2.a.b.c[2]).toBe(5);
});

it('iasgin test', () => {
    let nest1 = { a: {} , b: {}, c: {}, d: 'sample'};
    let nest2 = iassign(
        nest1,
        n => n.b,
        b => 5
    );
    console.log(nest2);
    expect(nest2.b).toBe(5);
});
