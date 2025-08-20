const routeMap = {
  Dashboard: "/dashboard",
  Recommendations: "/recommendations",
  Weather: "/weather",
  Forum: "/community",
  Resources: "/resources",
  Profile: "/profile",
};

export function createPageUrl(base, params = {}) {
  // Map to lowercase route, fallback to given base
  const path = routeMap[base] || `/${base.toLowerCase()}`;

  // Handle query params if provided
  const query = new URLSearchParams(params).toString();

  return `${path}${query ? `?${query}` : ""}`;
}























// usage example
// createPageUrl("Dashboard", { userId: 123, filter: "active" });
// export function createPageUrlWithParams(base, params = {}) {
//   const query = new URLSearchParams(params).toString();
//   return `${base}${query ? `?${query}` : ""}`;
// }
