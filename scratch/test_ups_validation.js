const baseUrl = "http://localhost:5000/api/v1/shipping/validate-address";

async function runTests() {
  console.log("=================================================================");
  console.log("       UPS ADDRESS VALIDATION DEBUG TEST SUITE");
  console.log("=================================================================\n");

  // TEST 5: Missing street address
  console.log("--- TEST 5: Missing Street Address ---");
  try {
    const res = await fetch(baseUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ city: "Oakland", state: "CA", zip: "94601" })
    });
    const data = await res.json();
    console.log(`HTTP Status: ${res.status}`);
    console.log(`Response:`, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Fetch failed:", err);
  }

  // TEST 3: Missing city
  console.log("\n--- TEST 3: Missing City ---");
  try {
    const res = await fetch(baseUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ street: "5169 Trask St", state: "CA", zip: "94601" })
    });
    const data = await res.json();
    console.log(`HTTP Status: ${res.status}`);
    console.log(`Response:`, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Fetch failed:", err);
  }

  // TEST 4: Missing state
  console.log("\n--- TEST 4: Missing State ---");
  try {
    const res = await fetch(baseUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ street: "5169 Trask St", city: "Oakland", zip: "94601" })
    });
    const data = await res.json();
    console.log(`HTTP Status: ${res.status}`);
    console.log(`Response:`, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Fetch failed:", err);
  }

  // TEST 2: Invalid ZIP
  console.log("\n--- TEST 2: Invalid ZIP Format ---");
  try {
    const res = await fetch(baseUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ street: "5169 Trask St", city: "Oakland", state: "CA", zip: "INVALID" })
    });
    const data = await res.json();
    console.log(`HTTP Status: ${res.status}`);
    console.log(`Response:`, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Fetch failed:", err);
  }

  // TEST 1: Valid US address format (5169 Trask St, Oakland, CA 94601)
  console.log("\n--- TEST 1: Valid US Address (5169 Trask St, Oakland, CA 94601) ---");
  try {
    const res = await fetch(baseUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        street: "5169 Trask St",
        city: "Oakland",
        state: "CA",
        zip: "94601",
        country: "United States"
      })
    });
    const data = await res.json();
    console.log(`HTTP Status: ${res.status}`);
    console.log(`Response:`, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Fetch failed:", err);
  }
}

runTests();
