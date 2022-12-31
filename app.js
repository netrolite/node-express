const EventEmitter = require("events");

const emitter = new EventEmitter();

emitter.on("log some data", (data) => {
    console.log(data);
});

emitter.emit(
    "log some data",
    {
        name: "John",
        age: 155,
        yearBorn: 2007
    }
);