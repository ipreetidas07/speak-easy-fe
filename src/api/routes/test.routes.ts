export const TEST_ROUTES = {
  DASHBOARD_OVERVIEW: "api/admin/dashboard", //GET
  ADD_CONTACT: "/api/phone-numbers", // POST
  UPLOAD_CONTACTS: "/api/products/:productId/contacts/upload", // POST (CSV)
  SESSIONS: "/api/contacts/:contactId/sessions", // GET
  MAKE_CALL: "/call/make-call", //POST
  CALL_STATUS: "/call/status", // GET
  ADD_TOPIC: "/api/companies", // POST
  PRODUCTS: "api/global", //GET
  UPDATE_PITCH: "/api/companies", //PUT
  GET_SESSIONS: "/api/sessions/", //GET
};
