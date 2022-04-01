const {Positions} = require('../utils/db')

function add(data) {
    let position = new Positions(data)
    return position.save()
}

function list() {
    return Positions.find({}).sort({_id: -1})
}

module.exports = {
    add,
    list
}