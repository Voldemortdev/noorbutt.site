/**
 * Project Access Guard
 * Paste into the <head> of any /brand-slug/index.html
 * Redirects visitors back to / if no valid authenticated session exists.
 */
(function() {
  try {
    var rawSession = sessionStorage.getItem('client_session');
    if (!rawSession) {
      window.location.replace('/');
      return;
    }
    var session = JSON.parse(rawSession);
    if (!session || !session.authenticated || !session.token) {
      window.location.replace('/');
      return;
    }
  } catch (err) {
    window.location.replace('/');
  }
})();
