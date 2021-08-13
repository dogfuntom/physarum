{
  "compress": {
    "dead_code": true,
    "drop_console": true,
    "drop_debugger": true,
    "keep_classnames": false,
    "keep_fargs": false,
    "keep_fnames": false,
    "keep_infinity": false,
    "passes": 5
  },
  "mangle": {
    "eval": true,
    "properties": true,
    "keep_classnames": false,
    "keep_fnames": "/^(setup|draw)$/",
    "toplevel": true
  },
  "module": false,
  "sourceMap": false,
  "output": {
    "comments": "some"
  }
}