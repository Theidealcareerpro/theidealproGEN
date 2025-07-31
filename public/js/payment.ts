document.addEventListener('DOMContentLoaded', () => {
  const extendBtn = document.getElementById('extend-hosting') as HTMLButtonElement;
  if (extendBtn) {
    extendBtn.addEventListener('click', async () => {
      const portfolioId = prompt('Enter Portfolio ID:'); // Simplified; replace with actual ID
      if (!portfolioId) return;

      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ portfolioId }),
      });

      if (response.ok) {
        const { url } = await response.json();
        window.location.href = url; // Redirect to Stripe Checkout
      } else {
        alert('Payment initiation failed: ' + await response.text());
      }
    });
  }
});
