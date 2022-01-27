---
title: Home
---
{{< home/section title="What?" iconclass="fas fa-2x fa-power-off">}}
GitBOM is neither [git](/glossary/git) nor an [SBOM](/resources/glossay/#sbom).
<!-- 
GitBOM is an ultra simple scheme for [primary build tools](/resources/glossay/#primary-build-tools) to embed into the artifact being built a
short simple verifiable reference to complete artifact tree of that artifact with absolute precision all the way down to the source code. -->

GitBOM is a minimalistic scheme for [build tools](/glossary/build_tool) to:

1. Build a compact [artifact tree](/glossary/artifact_tree), tracking every source code file incorporated into each built [artifact](/glossary/artifact).
2. Embed an id for that artifact tree into the artifact being built.
3. In a language-heterogenous environment, across packaging formats, with zero developer effort, involvement, or awareness.

- GitBOM is not an SBOM. It is designed to complement SBOMs, such as [SPDX](https://spdx.dev/), [CycloneDX](https://cyclonedx.org/), or [SWID](https://nvd.nist.gov/products/swid).
- GitBOM is not a version control system. It is designed to co-exist with, but not require, them.

GitBOM applies the [Unix Philosophy](https://en.wikipedia.org/wiki/Unix_philosophy) of "do one thing, and do it well." GitBOM constructs [artifact trees](/glossary/artifact_tree).

<!-- GitBOM borrows the use of [merkle tree](/resources/glossay/#merkle-tree) and the [gitref](/resources/glossay/#merkle-tree) from [git](/resources/glossay/#mgit) to construct a [verifiable bare artifact tree](/resources/glossay/#verifiable-bare-artifact-tree) in a manner suitable for [primary build tools](/resources/glossay/#primary-build-tools) to compute the GitBOM for an artifact and embed a unqiue, immutable, verifiable GitBOM id in the artifact being built. 
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
By correlating every piece of software to a verifiable, complete, and concise artifact tree, GitBOM enables: 

- Run-time detection of potential vulnerabilities in executables/containers by scanning a "fingerprint" rather than the contents.
- Identifying license obligations across both open source and commercial software
- More reliable attestation
- Post exploit forensics

<!-- There are many many many use cases that could use GitBOMs.  An incomplete list would include:

* Detecting potential vulnerabilities in executables/containers.
* Identifying Open Source License obligations
* Identifying commercial license obligations
* More reliable attestation
* Post exploit forensics -->
{{< /home/section >}}

{{< home/section title="How?">}}
Drawing on the version control system `git`, GitBOM observes that:

1. Every artifact is a [blob](/resources/glossay/#merkle-tree)
2. Every blob has a [gitref](/resources/glossay/#merkle-tree)
3. Therefore the gitref may be used as an artifact id for an artifact
4. Most source code artifacts are stored already with their gitref as their id

GitBOM likewise observes that for every artifact we can express its immediate children as a simple document consisting of new line seperated records, in lexical order, one per child:

```
blob⎵${git ref of child}⎵bom⎵${gitref of child's GitBOM document}
```

where 'leaf' artifacts like source code files should omit the `⎵bom⎵${gitref of child's GitBOM document}` as leaf artifacts gave no children themselves and thus no GitBOM document:

```
blob⎵${git ref of child which is a leaf artifact}
```

GitBOM advocates for [build tools](/resources/glossay/#primary-build-tools) (compilers, linkers, docker build, etc) to embed metadata containing the gitref of the artifacts GitBOM document into the artifact output by those tools. 

Examples:

- elf file section named '.bom' for executables, .o files, .so files
- @BOM annotation in java .class files
- 'dot.bom' annotatoin container images

Since gitrefs are small (20 bytes) the increase in artifact size should also be small ( ~89 bytes in the elf file example)
{{< /home/section >}}
