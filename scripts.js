'use strict'

const Car = function (make, year, plate, parkingTime) {
    this.make = make
    this.year = year
    this.plate = plate
    this.parkingTime = parkingTime
}

function randomCarArgs(makes, chars) {
    let make = makes[Math.floor(Math.random() * makes.length)]
    let millenium = '20'
    let decade = Math.floor(Math.random() * 3)
    if (decade == 2) {
        var lastYearDigit = Math.floor(Math.random() * 3)
    } else {
        var lastYearDigit = Math.floor(Math.random() * 10)
    }
    let year = millenium + decade + lastYearDigit
    let plate = ''
    for (let i = 0; i < 7; i++) {
        plate += chars[Math.floor(Math.random() * chars.length)]
    }
    let parkingTime = Math.floor(Math.random() * 5 + 1)

    return [make, year, plate, parkingTime]
}

const ParkingLot = function (capacity, timeLimit) {
    this.capacity = capacity
    this.timeLimit = timeLimit // in seconds
    this.parked = {}
    this.queue = new Map()
    this.visited = 0
    this.served = 0

    this.lotStatus = function () {
        console.log('Lot max capacity: ' + this.capacity)
        console.log('Maximum allowed parking time: ' + timeLimit + ' seconds')
        console.log(
            'Current filled parking spaces: ' + Object.keys(this.parked).length
        )
        console.log('Cars currently parked: ')
        console.dir(this.parked)
        console.log('Number of cars waiting to park: ' + this.queue.size)
        console.log('Cars who have visited the lot: ' + this.visited)
        console.log(
            'Cars who have been served (finished their visit): ' + this.served
        )
    }

    this.carArrives = function (car) {
        this.visited += 1
        let carId = 'car' + this.visited
        this.queue.set(carId, car)

        console.log(carId + ' arrived.')

        if (Object.keys(this.parked).length < this.capacity) {
            this.parkCar(carId)
        }
    }

    this.parkCar = function (carId) {
        console.log(carId + ' parked.')
        this.parked[carId] = this.queue.get(carId)
        this.queue.delete(carId)

        setTimeout(() => {
            this.carLeaves(carId)
        }, this.parked[carId].parkingTime * 1000)
    }

    this.carLeaves = function (carId) {
        this.served += 1
        console.log(carId + ' leaving.')
        delete this.parked[carId]

        if (this.queue.size !== 0) {
            let [nextCar] = this.queue.keys()
            this.parkCar(nextCar)
        }
    }
}

const myParkingLot = new ParkingLot(10, 5)

function startParking() {
    let makes = [
        'jeep',
        'tesla',
        'nissan',
        'toyota',
        'ford',
        'chevrolet',
        'volkswagen',
        'audi',
    ]
    const CHARS = 'abcdefghijklmnopqrstuvwxyz1234567890'

    for (let i = 0; i < 100; i++) {
        let newCar = new Car(...randomCarArgs(makes, CHARS))
        myParkingLot.carArrives(newCar)
    }
}

startParking()
