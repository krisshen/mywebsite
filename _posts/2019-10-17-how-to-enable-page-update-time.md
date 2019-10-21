---
title: "[my website] How To Enable Page Update Time"
tags: [myprojects, website, jekyll, minimal-mistakes]
categories: [project_website]
excerpt: Enable page update time and a workaround for GitHub Pages
last_modified_at: 
---

With `last_modified_at` in page's front matter it allows me to enable page's update time.

```yaml
---
title: "[my website] How To Enable Page Update Time"
tags: [myprojects, website, jekyll, minimal-mistakes]
categories: [project_website]
excerpt: Enable page update time and a workaround for GitHub Pages
last_modified_at: #<-- add this line
---
```

Actually `last_modified_at` is a Jekyll [plugin](https://github.com/gjtorikian/jekyll-last-modified-at) and I found out that I don't need to provide a date time for this field, if I leave it empty and host my site locally, when I visit this page in my local it can display the page's update time correctly:
![](/images/page_updatetime.jpg)

**Update:** this feature now works in GitHub Pages, above change is enough. Following content can be ignored.
{: .notice--success}




*So, I guess this is how it works - this Jekyll plugin can put this page's last modified time property into this `Updated` field when it renders this page.*

*It works like a charm right? Just add this field then everytime when I update a page, its `Updated` field will be updated automatically. As this is what it behaves in my local. That's how it's supposed to work everywhere.*

*BUT!!! Strange behaviour noticed - it works in my local, it doesn't work in my GitHub page after I pushed my code. If I enable this `last_modified_at` field in a page and leave it blank, in GitHub page there's no `Updated` section at all.*

![](/images/emotions/why/kid_why.jpg)


*Then I did some online search and got an answer from [here](https://talk.jekyllrb.com/t/trying-to-include-date-page-updated/1290/5), it clearly indicates that - this plugin doesn't work with GitHub Pages. Well, there's also a workaround - manually update that field. 😐 Hmmmm... I don't want to manually update that field, that's why it's a plugin feature.*

*For now I will take that suggested workaround by using a VS Code plugin to generate current date time and manually update this field. Will look into that "Travis CI" approach later.*