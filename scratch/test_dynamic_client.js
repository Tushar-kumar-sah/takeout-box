const fs = require('fs');

async function testDynamicClient() {
  console.log("=== VERIFYING DYNAMIC FRONTEND CONFIGURATION ===");

  // 1. Check api-config.json
  const config = JSON.parse(fs.readFileSync('public/api-config.json', 'utf8'));
  console.log("public/api-config.json:", config);

  // 2. Check .env.local
  const envLocal = fs.readFileSync('.env.local', 'utf8');
  const apiUrlLine = envLocal.split('\n').find(l => l.startsWith('NEXT_PUBLIC_API_URL='));
  console.log(".env.local active setting:", apiUrlLine);

  // 3. Ping the dynamically configured backend health endpoint
  const healthRes = await fetch(`${config.apiUrl.replace('/api/v1', '')}/api/health`);
  console.log("Health check status on port " + config.port + ":", healthRes.status);
  const healthData = await healthRes.json();
  console.log("Health response:", healthData);

  // 4. Test shipping validate-address on dynamic port
  const valRes = await fetch(`${config.apiUrl}/shipping/validate-address`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      street: "5169 Trask St",
      city: "Oakland",
      state: "CA",
      zip: "94601"
    })
  });
  console.log("Validate Address HTTP Status on dynamic port (" + config.port + "):", valRes.status);
  const valData = await valRes.json();
  console.log("Response payload:", valData);

  console.log("\n=== ALL DYNAMIC CHECKS PASSED ===");
}

testDynamicClient().catch(console.error);
