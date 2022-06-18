'use strict'

const parkingLot = function (capacity, timeLimit) {
    this.capacity = capacity
    this.parked = {}
    this.timeLimit = timeLimit // in seconds
    this.queue = new Map()
    this.visited = 0
    this.served = 0
    this.lotStatus = function () {
        console.log('Lot max capacity: ' + this.capacity)
        console.log('Maximum allowed parking time: ' + timeLimit + ' seconds')
        console.log(
            'Current filled parking spaces: ' + Object.keys(this.parked).length
        )
        console.log('Number of cars waiting to park: ' + this.queue.size)
        console.log('Cars who have visited the lot: ' + this.visited)
        console.log(
            'Cars who have been served (finished their visit): ' + this.served
        )
    }
    this.carArrives = function () {
        this.visited += 1
        let carId = 'car' + this.visited
        this.queue.set(carId, Math.floor(Math.random() * this.timeLimit + 1))

        console.log(carId + ' arrived.')

        if (Object.keys(this.parked).length < this.capacity) {
            this.parkCar(carId)
        }
    }
    this.parkCar = function (car) {
        console.log(car + ' parked.')
        this.parked[car] = this.queue.get(car)
        this.queue.delete(car)

        setTimeout(() => {
            this.carLeaves(car)
        }, this.parked[car] * 1000)
    }
    this.carLeaves = function (car) {
        this.served += 1
        console.log(car + ' leaving.')
        delete this.parked[car]

        if (this.queue.size !== 0) {
            let [nextCar] = this.queue.keys()
            this.parkCar(nextCar)
        }
    }
}

const myParkingLot = new parkingLot(10, 5)

for (let i = 0; i < 100; i++) {
    myParkingLot.carArrives()
}
