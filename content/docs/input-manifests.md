---
title: Input Manifests
template: doc.html
---

Input Manifests, alongside [Artifact IDs][artifact_ids], are one half of the
equation for OmniBOR. Input Manifests are how OmniBOR records the inputs used
to build software artifacts, and form the basis for how OmniBOR can allow
consumers of software to build fine-grained _Artifact Dependency Graphs_ (ADGs)
that enable rapid discovery of vulnerable components and much more.

## What is an Input Manifest?

An Input Manifests is a small text file format which records information about
the inputs used to build a software artifacts. By "inputs" we mean anything
provided to a build tool in order to produce the artifact. For example, when
building a project written in the C programming language, the Input Manifest
for a `.o` file (an object file) built from an associated `.c` file (a
source file) would have an Input Manifest recording the Artifact ID of the
`.c` file.

## What do Input Manifests Look Like?

Input Manifests look something like this:

```
gitoid:blob:sha256\n
09c825ac02df9150e4f93d12ba1da5d1ff5846c3e62503c814aa3a300c535772\n
230f3515d1306690815bd9c3da0d15d8b6fcf43894d17100eb44b6d329a92f61\n
2f4a51b16b76bbc87c4c27af8ae062b1b50b280f1ab78e3eec155334588dc88e manifest 4f3a822f776412c049dda53c3277bf2225b51b805ce8a99222af23a7d9f55636\n
c71d239df91726fc519c6eb72d318ec65820627232b2f796219e87dcf35d0ab4\n
f47ffb3518f236eea6525fd29f057ddd5cda1bb803ccc662e6bc5925afd1e4af\n
```

Every Input Manifest starts with a header that provides some information about
the Artifact IDs used throughout the rest of the manifest. Every Artifact ID
includes `blob` as its object type, and `sha256` as its hash type, and _all_
Artifact IDs in a single Input Manifest must have the same hash type as all
others. This is to ensure in the future, if Artifact IDs are ever updated to
support more hash algorithms, that a single Input Manifest only uses one hash
algorithm at a time.

Then we have Artifact IDs for each input artifact used to build the "target
artifact" being described. These Artifact IDs are listed in lexical order.

Each line is separated by a single newline character (`\n`) regardless of
the user's current platform. This is because we need these Input Manifests to
always be bit-for-bit identical regardless of where they're derived.

The one additional wrinkle is that if an input artifact itself has an Input
Manifest, we can include the Artifact ID of the input artifact's Input Manifest
as well.

_This_ is a key part of the secret sauce of OmniBOR, which we'll explain in
the next section.

## From Input Manifests to Artifact Dependency Graphs

There are two key ideas that we've not discussed yet which turn OmniBOR from
a lightweight method for listing IDs of input files and turn it into a
Merkle tree for a software artifact's complete dependency tree:

- Input Manifests record Artifact IDs of their inputs and (if available) their
  inputs' own Input Manifests
- The Artifact ID of an Input Manifest should be embedded in the artifact
  itself at build time.

These two details, when implemented in tooling, mean that artifacts become
cryptographically tied to a description of their own inputs, which can't be
modified without detection. Because an Artifact ID is based on the contents of
an artifact, if the artifact's contents include the Artifact ID of its own
Input Manifest, any change to that manifest results in a change in the
artifact's own Artifact ID.

Thinking this through, this means changes in a dependency anywhere in the
dependency graph results in changes of Artifact IDs for _anything_ derived from
it, no matter how many steps removed it is!

For some people, you may already be thinking this sounds like a form of Merkel
tree, and you're right! OmniBOR's Artifact IDs and Input Manifests come
together to form a Merkel tree of all dependencies used to construct an
artifact. If a software consumer receives all the Input Manifests for an
artifact and its dependencies, they can not just detect changes in the
Artifact ID of the artifact itself, but they can use the manifests to drill
down to exactly what changed and where.

## How Should Input Manifests be Produced?

Our dream as a project is to get changes upstreamed into popular software build
tools like compilers, containerization tools, linkers, archivers, and more to
be able to automatically produce Input Manifests and, whenever possible, to
embed their Artifact IDs into the artifacts being constructed.

We're also working on tooling to enable users of these tools to wrap them so
they produce Artifact IDs today, though this is not yet ready.

## What's Next?

We're still working to develop the implementations of OmniBOR to fruition that
will enable others to start integrating it and producing Artifact IDs and
Input Manifests. If that sounds interesting to you, [come help us][contribute]!

[artifact_ids]: @/docs/artifact-ids.md
[contribute]: @/contribute.md
