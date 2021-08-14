function randomValueGenerator(date) {
    return `${date - 0}_${Math.random()}_${Math.random()}`;
}

export {
    randomValueGenerator
};