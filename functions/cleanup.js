const { supabase } = require('../lib/supabase');
const { Octokit } = require('@octokit/rest');

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

exports.handler = async () => {
  try {
    // Find expired portfolios
    const { data: portfolios } = await supabase
      .from('portfolios')
      .select('id, github_repo')
      .lte('expires_at', new Date().toISOString())
      .eq('payment_status', 'free_trial');

    if (!portfolios?.length) {
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'No portfolios to clean up' }),
      };
    }

    // Delete GitHub repositories
    for (const portfolio of portfolios) {
      const [owner, repo] = portfolio.github_repo.split('/').slice(-2);
      await octokit.repos.delete({ owner, repo });
    }

    // Delete from Supabase
    await supabase
      .from('portfolios')
      .delete()
      .in('id', portfolios.map(p => p.id));

    return {
      statusCode: 200,
      body: JSON.stringify({ message: `Cleaned up ${portfolios.length} portfolios` }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Cleanup failed: ' + error.message }),
    };
  }
};
