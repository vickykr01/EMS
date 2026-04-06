export const tableStyles = {
  table: {
    style: {
      backgroundColor: "transparent",
    },
  },
  headRow: {
    style: {
      minHeight: "56px",
      borderBottomWidth: "1px",
      borderBottomColor: "var(--table-border)",
      backgroundColor: "var(--table-head-bg)",
    },
  },
  headCells: {
    style: {
      color: "var(--ink-soft)",
      fontSize: "12px",
      fontWeight: 700,
      letterSpacing: "0.14em",
      textTransform: "uppercase",
    },
  },
  rows: {
    style: {
      minHeight: "64px",
      backgroundColor: "var(--table-row-bg)",
      borderBottomColor: "var(--table-border)",
    },
    highlightOnHoverStyle: {
      backgroundColor: "var(--table-row-hover)",
      transitionDuration: "0.15s",
      transitionProperty: "background-color",
    },
  },
  cells: {
    style: {
      color: "var(--table-cell)",
      fontSize: "14px",
    },
  },
  pagination: {
    style: {
      backgroundColor: "transparent",
      borderTopColor: "var(--table-border)",
      color: "var(--ink-soft)",
      minHeight: "62px",
    },
  },
};
