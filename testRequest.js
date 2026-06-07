const url = 'http://localhost:3001/api/evaluate-risk';
const payload = {
  order_id: '123',
  customer_name: 'Test User',
  phone_number: '9999999999'
};

(async () => {
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const text = await res.text();
    console.log('Status:', res.status);
    console.log('Response:', text);
  } catch (err) {
    console.error('Request failed:', err);
  }
})();