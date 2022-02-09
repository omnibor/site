+++
title = "FAQ"
toc = "true"
+++

## A Note on all questions and answers

This FAQ is a good-faith attempt by the GitBOM community to answer common GitBOM questions. This document will evolve over time and as the community grows.

To propose a new question, please open [an issue](https://github.com/git-bom/site/issues).

To propose a question-answer pair, please open [a pull request](https://github.com/git-bom/site/pulls) updating this file.

## Gitref's are based on sha1, isn't sha1 broken?

Git itself still uses sha1, and we'd like to be compatible with git and tools that already use gitrefs. We plan to update to another hashing algorithm if/when git updates.

[shattered.io](https://shattered.io/) has found an impressive attack on SHA-1 in PDF files. There are [misconceptions about what that means](https://manishearth.github.io/blog/2017/02/26/clarifying-misconceptions-about-shattered/).
GitHub has published some analysis of its [implications for git](https://github.blog/2017-03-20-sha-1-collision-detection-on-github-com/).

## Git has been considering moving to sha256 for some time. Why doesn't GitBOM simply adopt that?

Great question. We might - when git does.

## Why isn't information about the compiler/linker included in the GitBOM?

Our view is that build environment information that does not affect the build output should not be represented in the GitBOM. Doing so would invalidate the characteristics of **Uniqueness** and **Artifact Identity**.

## Why isn't ${metadata} included in the GitBOM?

GitBOM seeks to have the following characteristics:

1. **Artifact Equivalence**: Two artifacts are equivalent IFF `[]byte(artifact1) == []byte(artifact2)`.
2. **Artifact Identity**: Independent parties derive the same artifact identity when presented with equivalent artifacts.
3. **Immutability**: An identified artifact can not be modified without changing its identity.
4. **Uniqueness**: An artifact can have precisely *one* artifact identity graph. All equivalent artifacts have the same graph.

The uniqueness requirement is what drives the exclusion of metadata from GitBOM.

Metadata, stored outside of the GitBOM [artifact tree](/glossary/artifact_tree), may reference any [artifact](/glossary/artifact) within the tree by a unique id -- its [gitref](/glossary/git/#git-ref). Similarly, the tree itself can be referenced by its [gitref](/glossary/git/#git-ref).

## Will the generation of artifact trees slow down build processes? Will the tree be very large?

We don't think so and would be delighted to receive data from very large projects that would either challenge or validate this assumption.

## What about files with duplicate hashes?

We don't think this will be a problem because GitBOM does not include any metadata, such as provenance, timestamp, and licence -- the domain of [SBOM](/glossary/sbom)s.

While duplicate hashes of empty files and regularly copied files (such as LICENSE files) are guaranteed to occur, this does not affect the security properties of GitBOM.

## How do [Software Heritage Foundation](https://www.softwareheritage.org/) identifiers relate to GitBOM Identifiers?

[Software Heritage Foundation Identifiers](https://docs.softwareheritage.org/devel/swh-model/persistent-identifiers.html#persistent-identifiers) use [git object ids](https://docs.softwareheritage.org/devel/swh-model/persistent-identifiers.html#git-compatibility) as part of their [core identifiers](https://docs.softwareheritage.org/devel/swh-model/persistent-identifiers.html#core-identifiers):

> SWHIDs for contents, directories, revisions, and releases are, at present, compatible with the Git way of computing identifiers for its objects. The <object_id> part of a SWHID for a content object is the Git blob identifier of any file with the same content; for a revision it is the Git commit identifier for the same revision, etc.

GitBOM uses git object ids as the entire [artifact id](/glossary/artifact/#artifact-identifers).

Whereas SWHIDs' core identifier includes additional metadata (see [SWHID Syntax](https://docs.softwareheritage.org/devel/swh-model/persistent-identifiers.html#syntax)):
```<identifier_core> ::= "swh" ":" <scheme_version> ":" <object_type> ":" <object_id> ;``` 
...the git object id is the object's identifier in a [GitBOM document](https://gitbom.dev/glossary/gitbom/#gitbom-document):
```<gitbom_identifier> ::= <git object id>```
The scheme in which SWHIDs are used is also different from the scheme in which GitBOM identifiers are used in a [GitBOM document](https://gitbom.dev/glossary/gitbom/#gitbom-document). 

