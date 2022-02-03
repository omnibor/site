+++
title = "FAQ"
toc = "true"
+++

## A Note on all questions and answers

This FAQ is a good-faith attempt by the GitBOM community to answer common questions that we have been asked. It is intended to evolve over time and as the community grows.

To propose a new question, please open [an issue](https://github.com/git-bom/site/issues).

To propose a question-answer pair, please open [a pull request](https://github.com/git-bom/site/pulls) updating this file.

## Gitref's are based on sha1, isn't sha1 broken?

Git itself still uses sha1, and we'd like to be compatible with git and tools that already use gitrefs. We plan to update to another hashing algorithm if/when git updates.

[shattered.io](https://shattered.io/) has found an impressive attack on SHA-1 in PDF files.  There are [misconceptions about what that means](https://manishearth.github.io/blog/2017/02/26/clarifying-misconceptions-about-shattered/).
GitHub has published some analysis of its [implications for git](https://github.blog/2017-03-20-sha-1-collision-detection-on-github-com/).

## Git has been considering moving to sha256 for some time. Why doesn't GitBOM simply adopt that?

Great question. We might - when git does.

## Why isn't information about the compiler/linker included in the GitBOM?

Our view is that build environment information which does not affect the build output should not be represented in the GitBOM, as doing so would invalidate the characteristics of **Uniqueness** and **Artifact Identity**.

## Why isn't ${metadata} included in the GitBOM?

GitBOM seeks to have the following characteristics:
1. **Artifact Equivalence**: Two artifacts are equivalent IFF `[]byte(artifact1) == []byte(artifact2)`.
2. **Artifact Identity**: Independent parties, presented with equivalent artifacts, derive the same artifact identity.
3. **Immutability**: An identified artifact can not be modified without also changing its identity.
4. **Uniqueness**: An artifact can have precisely *one* artifact identity graph. All equivalent artifacts have the same graph.

The uniqueness requirement is what drives the exclusion of metadata from the GitBOM.

Metadata, stored outside of the GitBOM [artifact tree](/glossary/artifact_tree), may reference any [artifact](/glossary/artifact) within the tree by a unique id -- its [gitref](/glossary/git/#git-ref). Similarly, the tree itself can be referenced by its [gitref](/glossary/git/#git-ref).

## Will the generation of artifact trees slow down build processes? Will the tree be very large?

We don't think so, and would be delighted to receive data from any very large projects which would either challenge or validate this assumption.

## What about files with duplicate hashes?

We don't think this will be a problem because GitBOM does not include any metadata, such as provenance, timestamp, and licence -- the domain of [SBOM](/glossary/sbom)s.

While duplicate hashes of empty files, and files which are regularly copied (such as LICENSE files), are guaranteed to occur, this does not affect the security properties of GitBOM.