async function testUpsFlow() {
  const baseUrl = "http://localhost:5000/api/v1";
  console.log("=== STARTING UPS INTEGRATION TEST SUITE ===");

  // 1. Test Address Validation - Missing Field
  console.log("\n[Test 1] Missing Address Fields:");
  const res1 = await fetch(`${baseUrl}/shipping/validate-address`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ street: "123 Main St", city: "Dallas" }), // missing state & zip
  });
  const data1 = await res1.json();
  console.log("Status:", res1.status, "Response:", data1);

  // 2. Test Address Validation - Invalid ZIP
  console.log("\n[Test 2] Invalid US ZIP Code (non 5-digit):");
  const res2 = await fetch(`${baseUrl}/shipping/validate-address`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ street: "123 Main St", city: "Dallas", state: "TX", zip: "123" }),
  });
  const data2 = await res2.json();
  console.log("Status:", res2.status, "Response:", data2);

  // 3. Test Address Validation - Valid US Address Format
  console.log("\n[Test 3] Valid US Address Format:");
  const res3 = await fetch(`${baseUrl}/shipping/validate-address`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      street: "5880 District Blvd. Suite 17",
      city: "Bakersfield",
      state: "CA",
      zip: "93313",
    }),
  });
  const data3 = await res3.json();
  console.log("Status:", res3.status, "Response:", data3);

  // 4. Test Rates - Empty Cart
  console.log("\n[Test 4] Rate Calculation with Empty Cart:");
  const res4 = await fetch(`${baseUrl}/shipping/rates`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      destination: {
        street: "5880 District Blvd. Suite 17",
        city: "Bakersfield",
        state: "CA",
        zip: "93313",
      },
      items: [],
    }),
  });
  const data4 = await res4.json();
  console.log("Status:", res4.status, "Response:", data4);

  // 5. Test Rates - Valid Cart Items
  console.log("\n[Test 5] Rate Calculation with Valid Cart Items:");
  const res5 = await fetch(`${baseUrl}/shipping/rates`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      destination: {
        street: "5880 District Blvd. Suite 17",
        city: "Bakersfield",
        state: "CA",
        zip: "93313",
      },
      items: [
        {
          productId: "500ml",
          quantity: 2,
        },
      ],
    }),
  });
  const data5 = await res5.json();
  console.log("Status:", res5.status, "Response:", data5);

  // 6. Test Tracking Endpoint - Truthful Non-Existent Tracking
  console.log("\n[Test 6] Order Tracking (No Fake Tracking Numbers):");
  const res6 = await fetch(`${baseUrl}/shipping/orders/TB-NONEXISTENT/tracking`);
  const data6 = await res6.json();
  console.log("Status:", res6.status, "Response:", data6);

  // 7. Test Admin Orders Endpoint
  console.log("\n[Test 7] Admin Orders List with Shipping Details:");
  const res7 = await fetch(`${baseUrl}/orders/admin/all`);
  const data7 = await res7.json();
  console.log("Status:", res7.status, "Total Orders:", data7.orders?.length);
  if (data7.orders?.length > 0) {
    const first = data7.orders[0];
    console.log("Sample Order Shipping Fields:", {
      id: first.id,
      shippingCarrier: first.shippingCarrier,
      shippingService: first.shippingService,
      shippingAmount: first.shippingAmount,
      shippingAddressSnapshot: first.shippingAddressSnapshot,
      shipment: first.shipment,
    });
  }

  console.log("\n=== TEST SUITE COMPLETE ===");
}

testUpsFlow().catch(console.error);
