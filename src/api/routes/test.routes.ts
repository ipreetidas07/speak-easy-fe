export const TEST_ROUTES = {
  DaASHBOARD_OVERVIEW: "/v1/dashboard-overview", //GET
  PRODUCT_DETAILS: "/v1/products/:productId/details", // GET
  UPDATE_PITCH: "/v1/products/:productId/pitch", // PUT
  ADD_CONTACT: "/v1/products/:productId/contacts", // POST
  UPLOAD_CONTACTS: "/v1/products/:productId/contacts/upload", // POST (CSV)
  SESSIONS: "/v1/contacts/:contactId/sessions", // GET
};
