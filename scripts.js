'use strict'

const parkingLot = function (capacity, timeLimit) {
    this.capacity = capacity
    this.parked = {}
    this.timeLimit = timeLimit // in seconds
    this.queue = new Map()
    this.carCount = 0
    this.carArrives = function () {
        this.carCount += 1
        let carId = 'car' + this.carCount
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
