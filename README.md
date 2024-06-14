# openela.org website

The openela.org website is managed using `Hugo`. You can install it using
your favorite package manager.

## Setup

Ensure you have the "Extended" version of Hugo, which includes features
required by this repository.

### Linux

Hugo is available in many package managers (but not EPEL, yet). Downloading
the latest release binary from github is an easy option.

### Mac

`brew install go`
`brew install hugo`
`brew install sass/sass/sass`

## Building locally

To build the static site to the `public/` folder (i.e., for release) run
`hugo`.

To run hugo in server mode and view the site in real time on your computer as
you make updates, run `hugo server`

By default this will run the service locally on http://localhost:1313/

## Adding Content

To add new content to the site, decide what type of content it is
(announcement, blog, news), and run

```
hugo new content content/<type>/Post-Title-Separated-By-Dashes.md
```

For example, to create a new Blog post titled "My First Blog" with the url
/blog/my-first-blog, you'd run

```
hugo new content content/blog/my-first-blog.md
```

Then, open the file and edit as required. Make sure to set the post to *not*
be a draft before publishing it.
