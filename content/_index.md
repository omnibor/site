---
title: Home
---
{{< home/section title="What?" iconclass="fas fa-2x fa-power-off">}}
<!-- 
GitBOM is an ultra simple scheme for [build tools](/resources/glossary/#build-tool) to embed into the artifact being built a
short simple verifiable reference to complete artifact tree of that artifact with absolute precision all the way down to the source code. -->

GitBOM is a minimalistic scheme for [build tools](/glossary/build_tool) to:

1. Build a compact [artifact tree](/glossary/artifact_tree), tracking every source code file incorporated into each built [artifact](/glossary/artifact).
2. Embed an id for that artifact tree, a [GitBOMId](/glossary/GitBOMId), into the artifact being built.

GitBOM is NOT:
- [Git](/glossary/git) 
- An [SBOM](/resources/glossary/#sbom)
- A version control system

GitBOM is designed to:
- Construct verifiable [artifact trees](/glossary/artifact_tree) in language-heterogenous environments, across packaging formats, with zero developer effort, involvement, or awareness
- Complement SBOMs, such as [SPDX](https://spdx.dev/), [CycloneDX](https://cyclonedx.org/), or [SWID](https://nvd.nist.gov/products/swid)
- Co-exist with, but not require, version control systems

GitBOM applies the [Unix Philosophy](https://en.wikipedia.org/wiki/Unix_philosophy) of "do one thing, and do it well."

<!-- GitBOM borrows the use of [merkle trees](/resources/glossary/#merkle-tree) and the [gitref](/resources/glossary/#merkle-tree) from [git](/resources/glossary/#git) to construct a [verifiable bare artifact tree](/resources/glossary/#verifiable-bare-artifact-tree) in a manner suitable for [build tools](/resources/glossary/#build-tool) to compute the GitBOM for an artifact and embed a unqiue, immutable, verifiable GitBOM id in the artifact being built. 
in language-heterogenuous environments with zero-end-user-effort. -->

{{< /home/section >}}
<!-- 
{{< home/section title="GitBOM is not:" iconclass="fas fa-2x fa-power-off">}}
1. Not a system for build reproducability, but it does provide information that is useful for that.
2. Not a version control system, though it is designed to co-exist with them.
3. Not an SBOM, though it is designed to complement them.
4. Not a globally unique software identifier (SWID).
5. Not reliant on any particular packaging or distribution mechanism, either for artifacts or for artifact identity graphs).
{{< /home/section >}} -->


{{< home/section title="Why?" >}}
By creating a unique, immutable, verifiable identifier (the [GitBOMId](/glossary/GitBOMId)) for each piece of software, GitBOM:
- enables any software artifact to be definitively linked to any metadata (SBOM, License, Support Info, etc.)
- solves component naming challenges which plague SBOM adoption

By correlating every piece of software to a verifiable, complete, and concise artifact tree, GitBOM enables: 
- Run-time detection of potential vulnerabilities in executables/containers by scanning a "fingerprint" rather than the contents
- Identifying license obligations across both open source and commercial software
- More reliable attestation
- Post-exploit forensics

<!-- There are many many many use cases that could use GitBOMs.  An incomplete list would include:

* Detecting potential vulnerabilities in executables/containers.
* Identifying Open Source License obligations
* Identifying commercial license obligations
* More reliable attestation
* Post exploit forensics -->
{{< /home/section >}}

{{< home/section title="How?">}}
Drawing on the version control system `git`, GitBOM observes that:

1. Every artifact is a [blob](/resources/glossary/#merkle-tree)
2. Every blob can be [hashed](/resources/glossary/#git)
3. Therefore the [git blob hash](https://git-scm.com/book/en/v2/Git-Internals-Git-Objects) may be used as an artifact id for an artifact
4. Most source code artifacts are already stored with their git commit as their id

GitBOM observes that for every artifact we can express its immediate children as a simple document consisting of new-line-separated records, in lexical order, one per child:

```
blob⎵${git blob hash of child}⎵bom⎵${git blob hash of child's GitBOM document}
```

The records for 'leaf artifacts' (child artifacts without their own child artifacts, e.g. source code files) should omit the `⎵bom⎵${git blob hash of child's GitBOM document}` because they have no GitBOM document.  They are expressed as:

```
blob⎵${git blob hash of child which is a leaf artifact}
```

Thus a GitBOM for an artifact with two child artifacts, one of which is a leaf artifact, would be expressed as:

```
blob⎵${git blob hash of child}⎵bom⎵${git blob hash of child's GitBOM document}
blob⎵${git blob hash of child which is a leaf artifact}
```

Note that the order of these records does not matter; they are sorted lexically for canonicalization.

Upon hashing this new GitBOM object one creates a [GitBOMId](/glossary/GitBOMId).

GitBOM advocates for [build tools](/resources/glossay/#build-tools) (compilers, linkers, docker build, etc) to embed metadata containing the artifact's GitBOMId into the artifact output. Possible examples:

- elf file section named '.bom' for executables, .o files, .so files
- @BOM annotation in java .class files
- 'dot.bom' annotation container images

Since git blob hashes are small (20 bytes), the increase in artifact size should also be small, e.g. ~89 bytes in the elf file example.
{{< /home/section >}}
