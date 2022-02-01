---
title: Home
---
{{< home/section title="What?" iconclass="fas fa-2x fa-power-off">}}
GitBOM is neither [git](/glossary/git) nor an [SBOM](/glossary/sbom).

GitBOM is a minimalistic scheme for [build tools](/glossary/build_tool) to:

1. Build a compact [artifact tree](/glossary/artifact_tree), tracking every source code file incorporated into each built [artifact](/glossary/artifact).
2. Embed an id for that artifact tree into the artifact being built.
3. In a language-heterogenous environment, across packaging formats, with zero developer effort, involvement, or awareness.

- GitBOM is not an SBOM. It is designed to complement SBOMs, such as [SPDX](https://spdx.dev/), [CycloneDX](https://cyclonedx.org/), or [SWID](https://nvd.nist.gov/products/swid).
- GitBOM is not a version control system. It is designed to co-exist with, but not require, them.

GitBOM applies the [Unix Philosophy](https://en.wikipedia.org/wiki/Unix_philosophy) of "do one thing, and do it well." GitBOM constructs [artifact trees](/glossary/artifact_tree).

{{< /home/section >}}

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
Drawing on the version control system [git](/glossary/git), GitBOM observes that:

1. Every artifact is a [blob](/glossary/git#blob)
2. Every blob has a [gitref](/glossary/git#git-ref)
3. Therefore the [gitref](/glossary/git#git-ref) may be used as an [artifact id](/glossary/artifact-identifier) for an [artifact](/glossary/artifact)
4. Most source code artifacts are stored already with their [gitref](/glossary/git#git-ref) as their id

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
