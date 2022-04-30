const fastify = require('fastify')({ logger: true });

// fastify.get('/', async (req, res) => {
//   return { hello: 'world' };
// });

fastify.route({
  method: 'POST',
  url: '/test',
  schema: {
    body: {
      type: 'object',
      required: ['id', 'username'],
      properties: {
        id: { type: 'number' },
        username: { type: 'string' },
      },
    },
  },
  handler: (request, reply) => {
    console.log('body', request.body);
    return { success: true };
  },
});

fastify.route({
  method: 'POST',
  url: '/dd/:id',
  schema: {
    querystring: {
      name: { type: 'string' },
      excitement: { type: 'integer' },
    },
    response: {
      200: {
        type: 'object',
        properties: {
          hello: { type: 'string' },
        },
      },
    },
  },
  handler: function (request, reply) {
    console.log('headers', request.headers);
    console.log('params', request.params);
    console.log('query', request.query);
    console.log('body', request.body);
    reply.send({ hello: 'world' });
  },
});

const start = async () => {
  try {
    await fastify.listen(5555);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
