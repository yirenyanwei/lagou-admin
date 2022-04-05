const {Positions} = require('../utils/db')

function add(data) {
    let position = new Positions(data)
    return position.save()
}

function list() {
    return Positions.find({}).sort({_id: -1})
}

function remove(id) {
    return Positions.deleteOne({_id: id})
}

function update(data) {
    return Positions.findByIdAndUpdate(data.id, data)
}

function findOne(id) {
    return Positions.findOne({_id: id})
}

module.exports = {
    add,
    list,
    remove,
    update,
    findOne
}