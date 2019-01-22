import House from "../house";
import Junkyard from "../junkyard";
import Road from "../road";
import AStar from "../A-star/aStar";
import State from "../A-star/state";
import Truck from "../truck";

export default class RouteFinder {

    constructor(map, truck, numOfGenerations, populationSize, mutationRate) {
        this.map = map.getMap();
        this.roadMap = map.getRoadMap();
        this.truck = truck.createClone(truck);
        this.numOfGenerations = numOfGenerations;
        this.populationSize = populationSize;
        this.mutationRate = mutationRate;
        this.addresses = [];
        this.population = [];
        this.path = new AStar(map);
    }

    getAllAdresses() {
        console.log('mapa', this.map);
        this.map.forEach((row, y) => row.forEach((element, x) => {
            let address = { position: { x, y }, capacity: 0 };
            let valid = false;
            if (element instanceof Road) {
                if (this.map[y][x + 1] && (this.map[y][x + 1] instanceof House || this.map[y][x + 1] instanceof Junkyard) && !this.map[y][x + 1].registered) {
                    address.capacity = address.capacity + this.map[y][x + 1].getCapacity()
                    this.map[y][x + 1].registered = true;
                    element.id = this.addresses.length;
                    valid = true;
                }
                if (this.map[y][x - 1] && (this.map[y][x - 1] instanceof House || this.map[y][x - 1] instanceof Junkyard) && !this.map[y][x - 1].registered) {
                    address.capacity = address.capacity + this.map[y][x - 1].getCapacity()
                    this.map[y][x - 1].registered = true;
                    element.id = this.addresses.length;
                    valid = true;
                }
                if (this.map[y + 1] && (this.map[y + 1][x] instanceof House || this.map[y + 1][x] instanceof Junkyard) && !this.map[y + 1][x].registered) {
                    address.capacity = address.capacity + this.map[y + 1][x].getCapacity()
                    this.map[y + 1][x].registered = true;
                    element.id = this.addresses.length;
                    valid = true;
                }
                if (this.map[y - 1] && (this.map[y - 1][x] instanceof House || this.map[y - 1][x] instanceof Junkyard) && !this.map[y - 1][x].registered) {
                    address.capacity = address.capacity + this.map[y - 1][x].getCapacity()
                    this.map[y - 1][x].registered = true;
                    element.id = this.addresses.length;
                    valid = true;
                }
                if (valid) {
                    this.addresses.push(address);
                }
            }
        }));
    };

    generatePopulation() {
        for (let i = 0; i < this.populationSize; i++) {
            let entity = [], list = [];
            for (let j = 0; j < this.addresses.length; j++) {
                list.push(j);
            }
            let to = list.length;
            for (let i = 0; i < to; i++) {
                entity.push(list.splice(Math.floor(Math.random() * list.length), 1)[0]);

            }
            this.population.push(entity);
        }
    }

    testFitness(entity) {
        let addresses = this.cloneAddresses();
        let cost = 0;
        let dir = null;
        entity.forEach((e, i) => {
            if (i === entity.length - 1) {
                i = -1;
            }
            this.path.startState = new State(this.addresses[e].position.x, this.addresses[e].position.y, dir ? dir : this.truck.direction);
            this.path.goalState = new State(this.addresses[entity[i + 1]].position.x, this.addresses[entity[i + 1]].position.y, 1)
            let path = this.path.givePath(true);
            dir = path[path.length - 1].direction;
            cost += path.length;
        });
        return cost;
    }

    simulate() {
        this.getAllAdresses();
        this.generatePopulation();
        for (let i = 0; i < this.numOfGenerations; i++) {
            let scores = []
            this.population.forEach(e => { scores.push({ score: this.testFitness(e), id: scores.length }) })
            scores = scores.sort((a, b) => a.score - b.score);
            this.crossBreed(scores);
        }
        let trash = this.population[0].splice(0, this.population[0].findIndex(i => i === this.addresses.findIndex(e => e.capacity < 0)) + 1);
        this.population[0] = this.population[0].concat(trash);
        return this.population[0].map(e => this.addresses[e]);
    }

    crossBreed(scores) {
        function pickOne() {
            let newScores = scores.map(e => scores[scores.length - 1] - e.score + 1);
            let randomPoint = Math.floor(Math.random() * newScores.reduce((a, b) => a + b, 0))
            let index = 0;
            while (newScores[index] - randomPoint < 0) {
                randomPoint -= newScores[0];
                index
            }
            return { score: scores[index], index: index };
        };

        let newPopulation = [];
        for (let i = 0; i < this.populationSize; i++) {
            let first = pickOne();
            first = Array(0).concat(this.population[first.score.id]);

            let second = pickOne();
            second = Array(0).concat(this.population[second.score.id]);

            let splitPoint = Math.floor(first.length / 2);
            let firstSecondPart = first.splice(splitPoint)
            second.forEach(e => {
                if (first.indexOf(e) === -1) {
                    first.push(e);
                }
                if (firstSecondPart.indexOf(e) === -1) {
                    firstSecondPart.unshift(e);
                }
            });
            newPopulation.push(this.mutate(first));
            newPopulation.push(this.mutate(firstSecondPart));
        }
        this.population = newPopulation;
        console.log('new Population', newPopulation)
    }

    mutate(entity) {
        let firstIndex = Math.floor(Math.random() * entity.length);
        let secondIndex = Math.floor(Math.random() * entity.length);
        function swap() {
            [entity[firstIndex], entity[secondIndex]] = [entity[secondIndex], entity[firstIndex]];
            return entity;
        }
        for (let i = 0; i < entity.length; i++) {
            entity = Math.random() < this.mutationRate ? swap() : entity;
        }
        return entity;
    }

    cloneAddresses() {
        let returned = [];
        this.addresses.forEach(a => { returned.push(a.capacity) })
        return returned;
    }

}
