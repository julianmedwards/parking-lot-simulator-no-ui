'use strict'

const parkingLot = function (capacity, timeLimit) {
    this.capacity = capacity
    this.timeLimit = timeLimit // in milliseconds
    this.queue = {}
    this.carCount = 0
    this.carArrives = function () {
        this.carCount += 1
        let carId = this.carCount
        this.queue[carId] = 'car' + carId
    }
    this.parkCar = function () {}
    this.carLeaves = function () {}
}

const myParkingLot = new parkingLot(10, 5000)

for (let i = 0; i < 100; i++) {
    myParkingLot.carArrives()
}
