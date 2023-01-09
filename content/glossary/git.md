+++
title = "Git"
toc = "true"
+++

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

# Git Blob

A git [blob](https://git-scm.com/book/en/v2/Git-Internals-Git-Objects) (binary large object) is the type used for file contents in git:

![gitblob](/img/git_blob.svg)

- ${content} - []byte of the file contents
  - Does not include filename or path
  - Does not include mode information
  - Does not include *any* metadata
  - Just the contents
  - **Any file anywhere with the same contents will have the same ‘blob’ object**
  - **Any file anywhere with the same contents will have the same gitoid**


# Git Object Id (gitoid)

Git Blobs are identified by the sha1 of the blob object:
 ![gitoid](/img/gitoid.svg)

There is some nacent movement in git to [SHA-256](https://git-scm.com/docs/hash-function-transition/) for gitoids.
As the purpose of OmniBOR using gitoids for [artifact ids](/glossary/artifact#artifact-identifiers) is to match the indexing
of the [leaf artifacts](/glossary/artifact/#leaf-artifacts) (aka source files), it is anticipated that OmniBOR will follow
git's transition to SHA-256 at the rate it is adopted.