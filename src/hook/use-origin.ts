export const useOrigin = () => {
  return (origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "");
};
