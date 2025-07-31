const { rateLimit } = require('../lib/rate-limit');

exports.handler = async (event) => {
  const { type } = event.pathParameters || {};
  const ip = event.headers['x-forwarded-for'] || 'unknown';

  // Validate document type
  if (!['cv', 'cover_letter', 'portfolio'].includes(type)) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Invalid document type' }),
    };
  }

  try {
    const { success, reset } = await rateLimit(ip, type);
    return {
      statusCode: 200,
      body: JSON.stringify({
        success,
        reset: reset ? reset.toISOString() : null,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Rate limit check failed' }),
    };
  }
};
