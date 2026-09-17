/**
 * Startup file for Passenger, which is what cPanel's "Setup Node.js App" runs.
 *
 * Passenger will not run `next start` — it boots one file and expects it to
 * listen on the port it hands over in process.env.PORT. This is that file, and
 * it is the whole of the difference between this app on Vercel and this app on
 * a cPanel VPS. Nothing else about the build changes.
 *
 * Unused on Vercel and unused by `npm run start`; it costs nothing to keep.
 *
 * Requires `npm run build` to have run first — this serves .next, it does not
 * create it.
 */
const { createServer } = require("http");
const next = require("next");

const port = Number(process.env.PORT) || 3000;
const app = next({ dev: false });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => handle(req, res)).listen(port, () => {
    console.log(`ready on :${port}`);
  });
});
