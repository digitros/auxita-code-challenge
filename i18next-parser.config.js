module.exports = {
  createOldCatalogs: false,
  indentation: 2,
  keepRemoved: false,
  lexers: {
    js: ['JsxLexer'],
    jsx: ['JsxLexer'],
    ts: ['JsxLexer'],
    tsx: ['JsxLexer'],
    default: ['JsxLexer'],
  },
  locales: ['en', 'es'],
  output: 'public/locales/$LOCALE/$NAMESPACE.json',
  input: ['src/**/*.{js,jsx,ts,tsx}'],
  sort: true,
  verbose: true,
};
