const { supabase } = require('../lib/supabase');
const { generatePDF } = require('../lib/pdf');
const { rateLimit } = require('../lib/rate-limit');

exports.handler = async (event, context) => {
  const { type } = event.pathParameters || {};
  const ip = event.headers['x-forwarded-for'] || 'unknown';
  const { content, templateId } = JSON.parse(event.body || '{}');

  try {
    // Check rate limit
    const { success, reset } = await rateLimit(ip, type);
    if (!success) {
      return {
        statusCode: 429,
        body: JSON.stringify({ error: 'Rate limit exceeded' }),
      };
    }

    // Get or create user
    let { data: user } = await supabase
      .from('users')
      .select('id')
      .eq('ip_address', ip)
      .single();

    if (!user) {
      const { data } = await supabase
        .from('users')
        .insert({ ip_address: ip })
        .select('id')
        .single();
      user = data;
    }

    // Store generation
    const { data: generation } = await supabase
      .from('document_generations')
      .insert({
        user_id: user.id,
        document_type: type,
        template_id: templateId,
        content,
        expires_at: type === 'portfolio' ? new Date(Date.now() + 21 * 24 * 60 * 60 * 1000) : null,
      })
      .select()
      .single();

    // Generate PDF
    const pdfBuffer = await generatePDF(content, templateId);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename=${type}-${generation.id}.pdf`,
      },
      body: pdfBuffer.toString('base64'),
      isBase64Encoded: true,
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Generation failed' }),
    };
  }
};
