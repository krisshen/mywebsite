---
title: "[my website] How To Make Header Sticky"
tags: [myprojects, website, jekyll, minimal-mistakes]
categories: [project_website]
excerpt: Make page header sticky (fix its position)
last_modified_at: 
---

The original behaviour of my site's header was not like what it looks like now. It was moveable, when I scroll up and down it would also go upwards and downwards. While I wanted to make its position fixed, so I did some online research and found this is called "*Sticky*" header.

The major change here is to set header's `position` property to `fixed` in css, here's my changes in `_sass\minimal-mistakes\_masthead.css` file:

```css
.masthead {
  position: fixed;                //<-- set position property to fixed
  top: 0;                         //<-- 
  ...
  ...
  width: 100%;                    //<-- set header's width
  background: $background-color;  //<-- set header's background color
                                  //this variable will be set per layout
  height: 85px;                   //<-- set header's height
  ...
}
```

After above change, all pages' header now become sticky, but there's an overlap between header and the rest of page body, in order to fix it, I made this change in `_sass\minimal-mistakes\_base.css` file:

```css
body {
  ...
  padding: 65px 0 0; //<-- set page body's top padding to 65
                     //and set 0 padding for left and right sides
  ...
}
```

Several times tweak needed to get the best look for above properties.

Done.