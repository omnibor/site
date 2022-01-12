+++
title = "Git"
toc = "true"
+++

# Git
[git](https://git-scm.com/) is an object store masquerading as a source code management system (SCM).



[git](https://git-scm.com/) is a simple object store used to store source code trees using a [merkle tree](#merkel-tree).

# Git Objects

Git Objects are represented as ![git object](/img/git_object.svg)

${type} - Git Object Type as a string
- blob - any []byte
- tree - represents a files system tree
- commit - represents a commit
- tag - represents a tag

${size} - size in bytes of ${content} represented as a string base 10.

${content} - []byte of the content
