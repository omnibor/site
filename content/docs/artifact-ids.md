---
title: Artifact IDs
---

NOTE: The following explanations are based on the latest version of the
OmniBOR specification. If any conflicts arise between the explanations given
here and the OmniBOR specification, the specification supersedes these
explanations.

Artifact IDs are how OmniBOR solves the challenge of reproducibly identifying
software artifacts. What we mean by "reproducible" is that anyone with access
to the artifact can produce an identifier for it, and that identifier will
always be the same.

OmniBOR Artifact IDs achieve this by choosing Git Object Identifiers (GitOIDs)
as their identification scheme. GitOIDs are how Git identifies objects it
tracks, and they're formed using a choice of a hash function, and then producing
hashes using what we'll call the "GitOID construction".

Today, Git supports three hash functions:

- SHA-1
- SHA-1CD
- SHA-256

SHA-1 is the hash function most people are familiar with in Git, and for a long
time it was the _only_ hash function Git supported. However, since the
discovery of the SHAttered attack against SHA-1, and Git project did two things:

1. Introduced SHA-1CD to mitigate the risk of collisions arising from attempts
   to exploit the SHAttered attack.
2. Began a process of transitioning to SHA-256 as the basis for all GitOIDs,
   which is still underway.

SHA-1CD is _almost_ equivalent to SHA-1. In essence, SHA-1CD attempts to
detect attempts to engineer collisions (hence the "CD," for "collision
detection") and modifies the output of the hash in those cases to break the
collision. For Git, this kind of modification is fine, and so Git in recent
versions usually uses SHA-1CD under the hood by default, though Git
documentation still just calls in SHA-1. In the context of a single Git
repository, the distinction doesn't generally matter.

However, for the purposes of achieving a universally reproducible identifier,
we do need to care about the distinction between SHA-1 and SHA-1CD, which is
why we list them separately here.

The SHA-256 transition in Git has been moving slowly, with successive versions
periodically adding more support to smooth the transition. Nonetheless, progress
is generally recognized as slow.
