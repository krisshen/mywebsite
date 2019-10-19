---
title: "[my website] How To Enable Table Contents"
tags: [myprojects, website, jekyll, minimal-mistakes]
categories: [project_website]
excerpt: Enable table contents in side bar and fix a small problem
last_modified_at: 
---

Enabling table contents to a page is easy, this is a very cool feature in Jekyll, just add `toc` property to front matter, and `toc_sticky` to make it sticky, in my website project page I enabled table contents like this:

```yaml
---
title: "Project - My Website"
toc: true           #<-- enable table of contents
toc_sticky: true    #<-- make it sticky
last_modified_at: 2019-10-11
---
```

After this is done, I can see this field generated successfully:
{% include figure image_path="/images/toc.jpg" caption="Contents table shown in right side bar." %} 

But, a small problem found, due to my [changes](/project_website/how-to-make-header-sticky) to fix header position, now when I click any link in this contents table, it moves the relevant anchor of current page to the top - which is covered by page header, a more detailed easy-to-understand description is [here](https://stackoverflow.com/questions/4086107/fixed-page-header-overlaps-in-page-anchors?page=1&tab=votes#tab-top).

I tried couple of solutions and found the simplest one to me, only CSS change needed, edit `_sass\minimal-mistakes\_base.css` file:
```css
h1[id],
h2[id],
h3[id],
h4[id],
h5[id],
h6[id] {
  padding-top: 70px;  //<-- for h1 to h6 tags whose have id property
  margin-top: -70px;  //<-- to avoid a blank area between paragraphs
}
```

This is a very tricky fix but it works nicely.

Done.