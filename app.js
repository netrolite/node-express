// using an arrow function as an object method returns "undefined" instead of "hello" because (apparently) they have no access to "this" keyword

const obj = {
    x: "hello",
    getX: function () {
        return this.x
    }
}

const unbound = obj.getX;
const bound = unbound.bind(obj);

// returns "hello"
console.log(bound());

// returns "undefined"
console.log(unbound())