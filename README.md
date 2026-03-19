# My Website

This site is built with Jekyll on top of the Minimal Mistakes theme.

For the full project write-up, see [my website - GitHub page](https://github.com/krisshen/mywebsite/blob/master/_projects/website.md)
or [my website](https://krisshen.com/projects/website/).

## Local Development

Install the Ruby dependencies locally into `vendor/bundle`:

```bash
BUNDLE_FORCE_RUBY_PLATFORM=true bundle install --path vendor/bundle
```

Start the local server:

```bash
bundle exec jekyll serve --host 127.0.0.1 --port 4000
```

Then open [http://127.0.0.1:4000](http://127.0.0.1:4000).

## Notes

- `BUNDLE_FORCE_RUBY_PLATFORM=true` helps older Ruby versions avoid incompatible prebuilt native gems.
- `vendor/` is ignored in git because it is only for local dependency installs.
- `bundle exec jekyll serve --livereload` may fail if the livereload port is already in use.
