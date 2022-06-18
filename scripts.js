'use strict'

// Car object constructor.
const Car = function (make, year, plate, parkingTime) {
    this.make = make
    this.year = year
    this.plate = plate
    this.parkingTime = parkingTime
}

// Creates random arguments to set properties for Car.
// Takes an array of makes (str) and array of alphanumeric chars
// to give a 7 digit license plate.
// Gives a random year between 2000 and 2022 and planned parking time
// between 1 and 5 seconds.
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

// Takes number to set max capacity and time limit in seconds (currently
// unused). Automatically handles parking and removing cars when one is
// passed with carArrives().
// Does not save details of cars which have parked once they've left.
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

    // Starts process of queuing, parking and having cars leave.
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

// Creates random cars equal to the numOfCars arg and sends them
// to the parking lot.
function startParking(numOfCars) {
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

    for (let i = 0; i < numOfCars; i++) {
        let newCar = new Car(...randomCarArgs(makes, CHARS))
        myParkingLot.carArrives(newCar)
    }
}

startParking(100)

setTimeout(() => startParking(10), 25000)
