// src/utils/jsonUtils.js
export const exportJsonFile = (jsonArray) => {
    const jsonContent = JSON.stringify(jsonArray, null, 2);
    const timestamp = new Date().toLocaleString('da-DK', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });
    const formattedTimestamp = timestamp.replace(/[\/:]/g, '_');
    const fileName = `exported_data_${formattedTimestamp}.json`;
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  