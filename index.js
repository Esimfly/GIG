export default function Home() {
  const checkData = async () => {
    const iccid = document.getElementById("iccid").value.trim();
    const resultDiv = document.getElementById("result");
    if (!iccid) {
      resultDiv.innerHTML = "<p style='color:red;'>Please enter ICCID.</p>";
      return;
    }
    try {
      const response = await fetch(`/api/giga?iccid=${iccid}`);
      const data = await response.json();
      if (data.success) {
        resultDiv.innerHTML = `<pre>${JSON.stringify(data.result, null, 2)}</pre>`;
      } else {
        resultDiv.innerHTML = `<p style='color:red;'>${data.message}</p>`;
      }
    } catch (err) {
      resultDiv.innerHTML = "<p style='color:red;'>Error fetching data.</p>";
    }
  };

  return (
    <div style={{ padding: 40, fontFamily: "Arial" }}>
      <h2>Check Giga Data Usage</h2>
      <input id="iccid" placeholder="Enter ICCID" style={{ padding: 10, width: "300px" }} />
      <button onClick={checkData} style={{ padding: 10, marginLeft: 10 }}>Check</button>
      <div id="result" style={{ marginTop: 20 }}></div>
    </div>
  );
}