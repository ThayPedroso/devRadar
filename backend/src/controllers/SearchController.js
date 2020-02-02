const Dev = require('../models/Dev')
const parseStringAsArray = require('../utils/parseStringAsArray')

module.exports = {
    async index(request, response) {
        // search for all devs in 10Km
        // filter by technology
        //console.log(request.query)

        const { latitude, longitude, techs } = request.query

        const techsArray = parseStringAsArray(techs)

        const devs = await Dev.find({
            techs: {
                $in: techsArray,
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                    $maxDistance: 10000,
                }
            }
        })
        console.log(`> /search: ${devs.length} results`)

        //return response.json({ devs: []})
        response.json(devs)
    }
}