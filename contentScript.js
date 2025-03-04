(function () {
    // 1) Select the table (adjust the selector to match your page’s table)
    const table = document.querySelector("table"); 
    if (!table) {
      alert("No table found on this page!");
      return;
    }
  
    // 2) Extract table rows
    const rows = table.querySelectorAll("tr");
    if (!rows.length) {
      alert("Table is empty!");
      return;
    }
  
    // 3) Build CSV lines
    const csvLines = [];
    rows.forEach((row) => {
      const cells = row.querySelectorAll("th, td");
      const cellValues = [];
      cells.forEach((cell) => {
        // Remove newlines and quotes, then wrap in quotes for CSV safety
        const text = cell.innerText.replace(/(\r\n|\n|\r)/gm, " ").replace(/"/g, '""');
        cellValues.push(`"${text}"`);
      });
      csvLines.push(cellValues.join(","));
    });
  
    // 4) Create CSV blob
    const csvContent = csvLines.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
  
    // 5) Create an object URL and trigger download
    const url = URL.createObjectURL(blob);
    const filename = "table_export.csv";
    chrome.runtime.sendMessage({ action: "download", url, filename });
  })();
  