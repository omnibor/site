---
title: Frequently Asked Questions
---

This FAQ is a good-faith attempt by the OmniBOR community to answer common
OmniBOR questions. This document will evolve over time and as the community
grows.

To propose a new question, please open [an issue][site_issue].

To propose a question-answer pair, please open [a pull request][site_pr]
updating this file.

## GitOID's are based on SHA-1, isn't SHA-1 broken?

Git itself still uses SHA-1, and we'd like to be compatible with git and tools
that already use gitoids. We plan to update to another hashing algorithm
if/when git updates.

[shattered.io][shattered] has found an impressive attack on SHA-1 in PDF files.
There are [misconceptions about what that means][shattered_misconceptions].

GitHub has published some analysis of its [implications for git][shattered_git].

## Git has been considering moving to SHA-256 for some time. Why doesn't OmniBOR simply adopt that?

Great question. We might — when Git does.

## Why isn't information about the compiler or linker included in the OmniBOR?

Our view is that build environment information that does not affect the build
output should not be represented in the OmniBOR. Doing so would invalidate the
characteristics of **Uniqueness** and **Artifact Identity**.

## Why isn't metadata included in the OmniBOR?

OmniBOR seeks to have the following characteristics:

1. **Artifact Equivalence**: Two artifacts are equivalent if and only if they
   are bit-for-bit identical.
2. **Artifact Identity**: Independent parties derive the same artifact identity
   when presented with equivalent artifacts.
3. **Immutability**: An identified artifact can not be modified without changing
   its identity.
4. **Uniqueness**: An artifact can have precisely *one* artifact identity graph.
   All equivalent artifacts have the same graph.

The uniqueness requirement is what drives the exclusion of metadata from
OmniBOR.

## Will the generation of artifact dependency graphs slow down build processes? Will the graphs be very large?

We don't think so and would be delighted to receive data from very large
projects that would either challenge or validate this assumption.

## What about files with duplicate hashes?

We don't think this will be a problem because OmniBOR does not include any
metadata, such as provenance, timestamp, and licence — the domain of SBOMs.

While duplicate hashes of empty files and regularly copied files (such as
LICENSE files) are guaranteed to occur, this does not affect the security
properties of OmniBOR.

## How do [Software Heritage Foundation][swh] identifiers relate to OmniBOR Identifiers?

[Software Heritage Foundation Identifiers][swhid] use
[Git Object IDs][swhid_gitoid] as part of their
[core identifiers][swhid_coreids]:

> SWHIDs for contents, directories, revisions, and releases are, at present,
> compatible with the Git way of computing identifiers for its objects. The
> <object_id> part of a SWHID for a content object is the Git blob identifier
> of any file with the same content; for a revision it is the Git commit
> identifier for the same revision, etc.

OmniBOR uses Git Object IDs as the entire Artifact ID.

Whereas SWHIDs' core identifier includes additional metadata (see
[SWHID Syntax][swhid_metadata]):

```
<identifier_core> ::= "swh" ":" <scheme_version> ":" <object_type> ":" <object_id> ;
```

&hellip; the Git Object ID is the object's identifier in an Input Manifest.

```
<artifact_identifier> ::= <Git Object ID>
```

The scheme in which SWHIDs are used is also different from the scheme in which
OmniBOR Artifact IDs are used in an Input Manifest.

[site_issue]: https://github.com/omnibor/site/issues
[site_pr]: https://github.com/omnibor/site/pulls
[shattered]: https://shattered.io/
[shattered_misconceptions]: https://manishearth.github.io/blog/2017/02/26/clarifying-misconceptions-about-shattered/
[shattered_git]: https://github.blog/2017-03-20-sha-1-collision-detection-on-github-com/
[swh]: https://www.softwareheritage.org/
[swhid]: https://docs.softwareheritage.org/devel/swh-model/persistent-identifiers.html#persistent-identifiers
[swhid_gitoid]: https://docs.softwareheritage.org/devel/swh-model/persistent-identifiers.html#git-compatibility
[swhid_coreids]: https://docs.softwareheritage.org/devel/swh-model/persistent-identifiers.html#core-identifiers
[swhid_metadata]: https://docs.softwareheritage.org/devel/swh-model/persistent-identifiers.html#syntax
