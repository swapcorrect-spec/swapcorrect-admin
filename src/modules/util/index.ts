interface StatusStyles {
  borderColor: string;
  bg: string;
  textColor: string;
}

export const getStatusStyles = (status: string): StatusStyles => {
  switch (status) {
    case "pending":
      return {
        borderColor: "#FFE1A5",
        bg: "#FFF9EC",
        textColor: "#BB7E05",
      };
    case "completed":
      return {
        borderColor: "#007AFF1A",
        bg: "#007AFF1A",
        textColor: "#007AFF",
      };
    case "active":
      return {
        borderColor: "#C5FFBC",
        bg: "#EDFFEA",
        textColor: "#106104",
      };
    case "flagged":
      return {
        borderColor: "#FFC4C4",
        bg: "#FFE5E58F",
        textColor: "#E42222",
      };
    default:
      return {
        borderColor: "#FFE1A5",
        bg: "#FFF9EC",
        textColor: "#BB7E05",
      };
  }
};
