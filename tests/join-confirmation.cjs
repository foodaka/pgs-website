/* eslint-disable @typescript-eslint/no-require-imports -- CommonJS loader for server TypeScript tests. */
const { test } = require('node:test');
const assert = require('node:assert/strict');
const ts = require('typescript');
const fs = require('node:fs');

// Load the TypeScript server modules without invoking Next or real providers.
require.extensions['.ts'] = (module, filename) => {
  const source = fs.readFileSync(filename, 'utf8').replaceAll('"@/lib/', '"../lib/');
  module._compile(ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText, filename);
};
const { joinSociety } = require('../src/app/actions.ts');
const form = (email = 'golfer@example.com', company = '') => {
  const data = new FormData();
  data.set('name', '<Golfer & friend>');
  data.set('email', email);
  data.set('company', company);
  return data;
};

test('signup confirmation integration', async (t) => {
  const savedFetch = global.fetch;
  const savedEnv = { ...process.env };
  t.after(() => { global.fetch = savedFetch; process.env = savedEnv; });
  process.env.TELEGRAM_BOT_TOKEN = 'test';
  process.env.TELEGRAM_CHAT_ID = 'test';
  process.env.POSTMARK_SERVER_TOKEN = 'test';
  process.env.POSTMARK_FROM_EMAIL = 'hello@example.com';
  let calls;
  let telegramOK;
  let postmarkOK;
  global.fetch = async (url, options) => {
    calls.push({ url, ...options });
    if (url.includes('telegram')) return { ok: telegramOK, status: telegramOK ? 200 : 500, text: async () => 'test failure' };
    return { ok: postmarkOK, status: postmarkOK ? 200 : 422, json: async () => ({ ErrorCode: postmarkOK ? 0 : 300 }) };
  };
  const reset = () => { calls = []; telegramOK = true; postmarkOK = true; };
  await t.test('successful signup sends a single branded email after Telegram', async () => {
    reset();
    assert.equal((await joinSociety({}, form())).status, 'ok');
    assert.equal(calls.length, 2);
    assert.match(calls[0].url, /telegram/);
    assert.equal(calls[1].url, 'https://api.postmarkapp.com/email');
    const body = JSON.parse(calls[1].body);
    assert.equal(body.To, 'golfer@example.com');
    assert.equal(body.MessageStream, 'outbound');
    assert.match(body.Subject, /You're on the list/);
    assert.match(body.HtmlBody, /&lt;Golfer &amp; friend&gt;/);
    assert.match(body.HtmlBody, /\/brand\/crest.png/);
    assert.match(body.TextBody, /received your request/);
  });
  await t.test('honeypots and invalid or multi-recipient emails never send', async () => {
    for (const email of ['bad', 'a@b.com,c@d.com', 'a@b.com;c@d.com']) {
      reset();
      assert.equal((await joinSociety({}, form(email))).status, 'error');
      assert.equal(calls.length, 0);
    }
    reset();
    assert.equal((await joinSociety({}, form('a@b.com', 'bot'))).status, 'ok');
    assert.equal(calls.length, 0);
  });
  await t.test('Telegram failure never sends confirmation', async () => {
    reset(); telegramOK = false;
    assert.equal((await joinSociety({}, form())).status, 'error');
    assert.equal(calls.length, 1);
  });
  await t.test('Postmark rejection preserves successful signup', async () => {
    reset(); postmarkOK = false;
    assert.equal((await joinSociety({}, form())).status, 'ok');
    assert.equal(calls.length, 2);
  });
  await t.test('missing email configuration preserves successful signup', async () => {
    reset(); delete process.env.POSTMARK_SERVER_TOKEN;
    assert.equal((await joinSociety({}, form())).status, 'ok');
    assert.equal(calls.length, 1);
  });
});
