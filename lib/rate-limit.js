const { supabase } = require('./supabase');

module.exports.rateLimit = async (ip, documentType) => {
  const { data: user } = await supabase
    .from('users')
    .select('id')
    .eq('ip_address', ip)
    .single();

  if (!user) {
    return { success: false, reset: null };
  }

  const { data: limit } = await supabase
    .from('usage_limits')
    .select('*')
    .eq('user_id', user.id)
    .eq('document_type', documentType)
    .single();

  const now = new Date();
  const reset = limit?.last_reset ? new Date(limit.last_reset) : now;

  if (reset.getDate() !== now.getDate()) {
    await supabase
      .from('usage_limits')
      .upsert({
        user_id: user.id,
        document_type: documentType,
        attempts: 1,
        last_reset: now,
      });
    return { success: true, reset: now };
  }

  if (limit?.attempts >= 2) {
    return { success: false, reset: new Date(reset.setDate(reset.getDate() + 1)) };
  }

  await supabase
    .from('usage_limits')
    .update({ attempts: limit.attempts + 1 })
    .eq('user_id', user.id)
    .eq('document_type', documentType);

  return { success: true, reset };
};
