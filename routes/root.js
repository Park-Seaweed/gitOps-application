'use strict'

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    reply.code(200).send({ server: "버전 3" })
  })
}
