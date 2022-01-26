+++
title = "FAQ"
toc = "true"
+++

## A Note on all questions and answers

This FAQ is a good faith attempt by the GitBOM community to gather the questions that have been asked and answers to them.

This FAQ is intended to evolve and improve as more viewpoints from more community members are brought to bear.

Additional questions can and should be proposed (open an [issue](https://github.com/git-bom/site/issues)). 

Question answers pairs should improve (pushing a [PR](https://github.com/git-bom/site/pulls)).   

## Gitref's are based on sha1, isn't sha1 broken?

[shattered.io](https://shattered.io/) has broken sha1 in PDF files. Additional work has been done to create inexpensive [chosen prefix] collisions.


## Why isn't ${metadata} included in the GitBOM?

GitBOM seeks to have the following characteristics:
1. **Artifact Equivalence**: Two artifacts are equivalent IFF `[]byte(artifact1) == []byte(artifact2)`.
2. **Artifact Identity**: Independent parties, presented with equivalent artifacts, derive the same artifact identity.
3. **Immutability**: An identified artifact can not be modified without also changing its identity.
4. **Uniqueness**: An artifact can have precisely *one* artifact identity graph. All equivalent artifacts have the same graph.

The uniqueness requirement is what drives the exclusion of metadata from the GitBOM.

Metadata out of tree can always reference artifacts by their artifact ID or parent child relationships by the GitBOM id.

### Why isn't information about the compiler/linker included in the GitBOM?