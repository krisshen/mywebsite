---
title: "[my website] How To Add Projects Page And Its Content"
header:
#   image: /images/header.jpg
tags: [myprojects, website, jekyll, minimal-mistakes]
categories: [project_website]
excerpt: Add new projects tab to my website as well as individial project pages.
last_modified_at: 2019-10-14
---

"Projects" page was added by me as I want to have a place to present my personal projects. 

1. Enable "Projects" link - First of all, I need to get that "Projects" link visible from header. Edit `/_data/navigation.yml` to add "Projects" title and url: 
   
    ```yaml
      main:
        - title: "Posts"
          url: "/posts/"
        - title: "Projects"  #<-- add this line
          url: "/projects/"  #<-- and this line
        - title: "About"
          url: "/about/"
    ```
    After this is done, I got a `Projects` link in the header:
    ![](/images/projectstab.jpg)

2. Enable "Projects" collection - Follow this [official document page](https://mmistakes.github.io/minimal-mistakes/docs/collections/) I learned that there're couple of things to do in `_config.yml`:
    - Create a new collection, [Collections](https://mmistakes.github.io/minimal-mistakes/docs/collections/) is like posts and pages (all posts in `_posts` folder, general pages in `_pages` folder), similarly, I can place all my projects related pages into `_projects` folder. Ok, let's add a new `projects` section in `collections` like this:
        ```yaml
        collections:
            projects:
                output: true
                permalink: /:collection/:path/
        ```
    - Define scope for `projects` collection in `_config.yml`:
        ```yaml
        defaults:
          - scope:
              page: ""
              type: projects
            values:                # for every project page:
              layout: single       #<-- make it single layout
              author_profile: true #<-- display author profile
              share: true          #<-- display share section
        ```

3. Create "_projects" folder - Once above is done, I can now create a `_projects` folder under my workspace's root and start adding MarkDown files for each project then.

4. Create "Projects" main page - Click `Projects` link it will go to a blank page, because there's no page to present all projects yet. Let me create this page first, go to `_pages` folder and create `projects.md` file. It's like a normal page but I used [splash-page-layout](https://mmistakes.github.io/minimal-mistakes/docs/layouts/#splash-page-layout) as I want to present each project with preview pictures. Please refer the source code: [projects.md](https://github.com/krisshen/mywebsite/blob/master/_pages/projects.md)

Result:
![](/images/projects_mainpage.jpg)
   