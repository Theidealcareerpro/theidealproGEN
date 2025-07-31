const { createPortfolioRepo } = require('../lib/github');
const { supabase } = require('../lib/supabase');

exports.handler = async (event) => {
  const { portfolioId } = event.pathParameters || {};
  const ip = event.headers['x-forwarded-for'] || 'unknown';
  const { content } = JSON.parse(event.body || '{}');

  try {
    // Get user
    const { data: user } = await supabase
      .from('users')
      .select('id')
      .eq('ip_address', ip)
      .single();

    if (!user) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'User not found' }),
      };
    }

    // Create GitHub repository
    const repoUrl = await createPortfolioRepo(ip, portfolioId, content);

    // Store portfolio in Supabase
    const { data: portfolio } = await supabase
      .from('portfolios')
      .insert({
        id: portfolioId,
        user_id: user.id,
        github_repo: repoUrl,
        expires_at: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
      })
      .select()
      .single();

    return {
      statusCode: 200,
      body: JSON.stringify({ url: repoUrl }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to create portfolio: ' + error.message }),
    };
  }
};
