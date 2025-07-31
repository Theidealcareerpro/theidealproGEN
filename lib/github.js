const { Octokit } = require('@octokit/rest');

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

module.exports.createPortfolioRepo = async (userIp, portfolioId, content) => {
  try {
    const repoName = `portfolio-${portfolioId}`;
    const { data: repo } = await octokit.repos.createForAuthenticatedUser({
      name: repoName,
      private: false,
      auto_init: true,
    });

    await octokit.repos.createOrUpdateFileContents({
      owner: process.env.GITHUB_ORG,
      repo: repoName,
      path: 'index.html',
      message: 'Initial portfolio content',
      content: Buffer.from(content).toString('base64'),
    });

    return repo.html_url;
  } catch (error) {
    throw new Error('Failed to create GitHub repository');
  }
};
