const generateTableItems = () => {
  const rows = [];
  for (let r = 0; r < 1000; r++) {
    const cols = [];
    for (let c = 0; c < 1000; c++) {
      cols.push(`Row: ${r}, Col: ${c}`);
    }
    rows.push(cols);
  }
  return rows;
};

const tableItems = generateTableItems();

export default tableItems;
