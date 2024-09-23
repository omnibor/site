---
title: Artifact IDs
template: doc.html
---

NOTE: The following explanations are based on the latest version of the
OmniBOR specification. If any conflicts arise between the explanations given
here and the OmniBOR specification, the specification supersedes these
explanations.

## What are Artifact IDs?

Artifact IDs are how OmniBOR solves the challenge of reproducibly identifying
software artifacts. What we mean by "reproducible" is that anyone with access
to the artifact can produce an identifier for it, and that identifier will
always be the same.

## How are Artifact IDs Defined?

OmniBOR Artifact IDs achieve this by choosing Git Object Identifiers (GitOIDs)
as their identification scheme. GitOIDs are how Git identifies objects it
tracks, and they're formed using a choice of a hash function, and then producing
hashes using what we'll call the "GitOID construction".

### Choice of Hash Function

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

__OmniBOR Artifact IDs only support SHA-256 today.__

This is important. While SHA-1 (really, SHA-1CD) is in wide use in existing Git
data today, we expect that in the long run, it will be phased out. The Git
project itself continues its slow movement along the SHA-256 transition, and
(perhaps more importantly) we anticipate there will likely be government
standards in the future which mandate a move away from SHA-1, in a similar
fashion to prior widespread mandates to move away from MD5.

While we could in theory support multiple identifiers at the same time, even
just supporting two would double the complexity of OmniBOR operationally for
producers and consumers. Worse, given the SHA-1 / SHA-1CD split, we'd likely
need to support all three if we're going to support SHA-1.

The specification does reserve the right to add support for alternative hashes
in the future if, for example, SHA-256 is later found to be broken in a manner
similar to how SHA-1 can be broken today.

### The "GitOID Construction"

GitOIDs are constructed not just by hashing the data of the object itself.
Instead, a small "prefix string" is hashed in first, with the following
structure:

```
<git object type>⎵<length of the object in bytes>\0
```

Here `⎵` refers to the ASCII space character (`0x20`), replaced with a visual
character for clarity.

This prefix string has two purposes in Git. First, the object type (which can
be `blob`, `tree`, `commit`, or `tag`) indicates the type of the data being
stored based on Git's object model. This helps differentiate hashes for the
different types of objects. Second, the length being hashed in helps provide
additional protection against collisions. With this length included, an attacker
trying to engineer a collision in Git's object storage would need to account
for how the length of the colliding data impacts the hash as well. The
SHAttered attack specifically relies on extensions of the original data in
highly flexible formats like PDFs, which this is an effective protection
against.

For Artifact IDs, the object type is always `blob`, so for our purposes
the prefix string is

```
blob⎵<length of the object in bytes>\0
```

Thus, the "GitOID construction" for Artifact IDs is to:

1. Calculate the length of the object being identified, in bytes.
2. Provide this prefix string to the SHA-256 hasher.
3. Provide the bytes of the object to the hasher.
4. Generate the hash from the hasher.

## How are Artifact IDs represented?

The textual representation of an Artifact ID looks like this:

```
gitoid:blob:sha256:9f64df92367881be21e23567a31a8ce01994d98b69d28917b5c132ce32a8e6c8
```

This is a URI using the `gitoid` scheme, [registered with IANA][uri]. In this
scheme, the representation includes four parts, each separate by a colon (`:`).
The first is the string `gitoid`, indicating the URI scheme. The second is
the object type, which for Artifact IDs is always `blob`. Then it's the hash
algorithm, which for Artifact IDs is `sha256`. Finally, it's a lowercase
hexadecimal representation of the SHA-256 hash of the object made with the
GitOID construction.

## Why are Artifact IDs Useful?

Artifact IDs are used for uniquely and reproducibly identifying software
artifacts. Because the construction of an Artifact ID relies only on the
contents of an artifact itself, anyone who has access to the artifact can
derive its Artifact ID, and the Artifact ID they derive will be exactly
equal to one derived by anyone else with access to the same artifact.

This means that, as an identifier scheme, Artifact IDs can scale without
limits! Other identification systems, like
[Common Platform Enumerations (CPE)][cpe] or [Package URLs (pURLs)][purl],
rely on some form of centralization. CPEs are identifiers which rely on a
centralized dictionary, maintained by the United States' National
Institute of Standards and Technology (NIST). Package URLs rely on a central
list of known package hosts. In either case, while these identifier schemes
are _very_ useful (and we view OmniBOR's Artifact IDs as _complementary_ to
these other identifier schemes), they lack the property of independent
reproducibility that makes Artifact IDs so powerful!

## What's Next?

Of course, Artifact IDs by themselves are only one part of the equation. To
understand more, learn about [Input Manifests][input_manifests] next!

[uri]: https://www.iana.org/assignments/uri-schemes/prov/gitoid
[cpe]: https://nvd.nist.gov/products/cpe
[purl]: https://github.com/package-url/purl-spec
[input_manifests]: @/docs/input-manifests.md
