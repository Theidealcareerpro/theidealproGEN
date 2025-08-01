const { supabase } = require('../lib/supabase');

exports.handler = async (event) => {
  const { name, email, feedback } = JSON.parse(event.body || '{}');
  const ip = event.headers['x-forwarded-for'] || 'unknown';

  if (!name || !email || !feedback) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Missing required fields: name, email, feedback' }),
    };
  }

  try {
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

    // Store feedback
    const { error } = await supabase
      .from('feedback')
      .insert({
        user_id: user.id,
        name,
        email,
        feedback,
        created_at: new Date().toISOString(),
      });

    if (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Failed to save feedback' }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Feedback submitted successfully' }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Server error: ' + error.message }),
    };
  }
};
